from flexweb.repository.base.recommendation_repository import (
    RecommendationRepository as BaseRecommendationRepository,
)
from flexweb.types.recommendation import (
    RecommendationList,
    Recommendation,
    RecommendationType,
)
from flexweb.types.scenario import Scenario
from .scenario_repository import ScenarioRepository
from .energy_repository import EnergyRepository
import pandas as pd
import copy


class RecommendationRepository(BaseRecommendationRepository):
    __scenario_repository: ScenarioRepository
    __energy_repository: EnergyRepository

    def __init__(self, db) -> None:
        self.__db = db
        self.__scenario_repository = ScenarioRepository(db)
        self.__energy_repository = EnergyRepository(db)

    def get_recommendation_by_id(self, id: int, sems: bool) -> RecommendationList:
        scenario = self.__scenario_repository.get_scenario_by_id(id)
        return self.get_recommendation(id, scenario, sems)

    def get_recommendation_by_scenario(
        self, scenario: Scenario, sems: bool
    ) -> RecommendationList:
        id = self.__scenario_repository.get_id_by_scenario(scenario)
        return self.get_recommendation(id, scenario, sems)

    def get_recommendation(
        self, id: int, scenario: Scenario, sems: bool
    ) -> RecommendationList:
        finder = _CandidateFinder(self.__db, id)
        yearly_bill: int = self.__energy_repository.get_energy_cost_by_id(
            id, sems
        ).get_yearly_bill()
        improvements = []
        candidates = finder.get_candidates()
        for id in candidates:
            candidate_scenario = self.__scenario_repository.get_scenario_by_id(id)
            print(candidate_scenario.to_dict())
            improvements.append(
                _Improvement(
                    self.__db,
                    id,
                    candidate_scenario,
                    self.__energy_repository.get_energy_cost_by_id(
                        id, sems
                    ).get_yearly_bill(),
                    sems,
                    scenario,
                    yearly_bill,
                )
            )
            if sems == False:
                improvements.append(
                    _Improvement(
                        self.__db,
                        id,
                        candidate_scenario,
                        self.__energy_repository.get_energy_cost_by_id(
                            id, True
                        ).get_yearly_bill(),
                        True,
                        scenario,
                        yearly_bill,
                    )
                )
        
        # Remove impromments with no benefit
        improvements = list(filter(lambda x: x.get_benefit() > 0, improvements))
        if len(improvements) == 0:
            return RecommendationList([])

        recommendations = {}

        # Get best Cost Benefit
        improvements.sort(key=lambda x: x.get_benefit(), reverse=True)
        best: _Improvement = improvements[0]
        recommendations[best.get_scenario_id()] = Recommendation(
            best.get_scenario(),
            best.get_sems(),
            RecommendationType.COST_BENEFIT,
            best.get_energy_cost(),
            best.get_investment_cost(),
        )

        # Get Lowest energy bill
        improvements.sort(key=lambda x: x.get_value(), reverse=True)
        best = improvements[0]
        recommendations[best.get_scenario_id()] = Recommendation(
            best.get_scenario(),
            best.get_sems(),
            RecommendationType.LOWEST_ENERGY_BILL,
            best.get_energy_cost(),
            best.get_investment_cost(),
        )

        # Get Lowest investment
        improvements.sort(key=lambda x: x.get_investment_cost())
        best = improvements[0]
        recommendations[best.get_scenario_id()] = Recommendation(
            best.get_scenario(),
            best.get_sems(),
            RecommendationType.LOWEST_INVESTMENT,
            best.get_energy_cost(),
            best.get_investment_cost(),
        )

        return RecommendationList([x for x in recommendations.values()])


class _CandidateFinder:
    def __init__(self, db, scenario_id) -> None:
        self.db = db
        self.scenario_id = scenario_id
        self.candidates = []
        self.init()

    def init(self) -> None:
        current = pd.read_sql(
            "select "
            "*"
            "from "
            "OperationScenario "
            "where ID_Scenario=" + str(self.scenario_id),
            con=self.db,
        ).iloc[0]

        constraint = copy.copy(current)
        constraint.pop("ID_Scenario")
        degradingImpr = {}
        stagedImpr = {}
        fixedImpr = {}
        if current["ID_Building"] % 2 == 0:
            degradingImpr["ID_Building"] = current["ID_Building"]
            constraint.pop("ID_Building")
        if current["ID_Boiler"] > 1:
            fixedImpr["ID_Boiler"] = current["ID_Boiler"]
            constraint.pop("ID_Boiler")
        if current["ID_PV"] > 1:
            stagedImpr["ID_PV"] = current["ID_PV"]
            constraint.pop("ID_PV")
        if current["ID_Battery"] > 1:
            stagedImpr["ID_Battery"] = current["ID_Battery"]
            constraint.pop("ID_Battery")
        # if current["ID_HotWaterTank"] > 1:
        #    stagedImpr["ID_HotWaterTank"] = current["ID_HotWaterTank"]
        #    constraint.pop("ID_HotWaterTank")

        query = "select ID_Scenario from OperationScenario where "
        for key, value in constraint.items():
            query += key + "=" + str(value) + " and "
        for key, value in degradingImpr.items():
            query += (
                "("
                + key
                + "="
                + str(value - 1)
                + " or "
                + key
                + "="
                + str(value)
                + ") and "
            )
        for key, value in fixedImpr.items():
            query += "(" + key + "=1 or " + key + "=" + str(value) + ") and "
        for key, value in stagedImpr.items():
            query += key + "<=" + str(value) + " and "
        query = query[:-5]
        print(query)
        self.canditates = pd.read_sql(query, con=self.db)["ID_Scenario"].values

    def get_candidates(self) -> list:
        return self.canditates


class _Improvement:
    def __init__(
        self,
        db,
        scenario_id: int,
        scenario: Scenario,
        energy_cost: int,
        sems: bool,
        current_scenario: Scenario,
        current_cost: int,
    ) -> None:
        self.__scenario_id = scenario_id
        self.__scenario = scenario
        self.__current_scenario = current_scenario
        self.__current_cost = current_cost
        self.__sems = sems
        self.__energy_cost = energy_cost
        self.__value = 0
        self.__investment_cost = 0
        self.init()

    def init(self) -> None:
        for key, value in self.__scenario.get_components().items():
            comp = self.__current_scenario.get_components()[key]
            if value.equals(comp):
                self.__investment_cost += comp.get_cost()
        self.__value = self.__current_cost - self.__energy_cost

    def get_value(self) -> int:
        return self.__value

    def get_benefit(self) -> int:
        return self.get_value() - self.get_investment_cost()

    def get_investment_cost(self) -> int:
        return self.__investment_cost

    def get_energy_cost(self) -> int:
        return self.__energy_cost

    def get_sems(self) -> int:
        return self.__sems

    def get_scenario_id(self) -> int:
        return self.__scenario_id

    def get_scenario(self) -> Scenario:
        return self.__scenario

from .scenario import Scenario
from enum import StrEnum


class RecommendationType(StrEnum):
    COST_BENEFIT = "Cost Benefit"
    LOWEST_ENERGY_BILL = "Lowest Energy Bill"
    LOWEST_INVESTMENT = "Lowest Investment"


class Recommendation:
    def __init__(
        self,
        scenario: Scenario,
        sems: bool,
        type: RecommendationType,
        energy_bill_year: int,
        investment_cost: int,
    ):
        self.__scenario = scenario
        self.__sems = sems
        self.__type = type
        self.__energy_bill_year = energy_bill_year
        self.__investment_cost = investment_cost

    def get_scenario(self) -> Scenario:
        return self.__scenario

    def get_sems(self) -> bool:
        return self.__sems
    
    def get_type(self) -> RecommendationType:
        return self.__type

    def get_energy_bill_year(self) -> int:
        return self.__energy_bill_year

    def get_investment_cost(self) -> int:
        return self.__investment_cost

    def to_dict(self) -> dict:
        return {
            "config": self.__scenario.to_dict() | {"sems": self.__sems},
            "type": self.__type.value,
            "yearly_bill": self.__energy_bill_year,
            "investment_cost": self.__investment_cost,
        }


class RecommendationList:
    def __init__(self, recommendations: list[Recommendation]):
        self.__recommendations = recommendations

    def get_recommendations(self) -> list[Recommendation]:
        return self.__recommendations

    def to_dict(self) -> dict:
        return {
            "list": [
                r.to_dict() for r in self.__recommendations
            ],
        }

import copy
import pandas as pd
from collections import OrderedDict


class Result:
    def __init__(self, db, scenario_id, sems) -> None:
        self.db = db
        self.scenario_id = scenario_id
        self.sems = sems
        self.data = {}
        self.init()

    def init(self) -> None:
        self.data["profile"] = Profile(self.db, self.scenario_id).get_data()
        self.data["current"] = Current(self.db, self.scenario_id, self.sems).get_data()
        currentCost = int(self.data["current"]["energy_data"]["energy_bill_year"])
        self.data["recommendation"] = RecommendationList(
            self.db, self.scenario_id, self.sems, currentCost
        ).get_data()

    def get_data(self) -> any:
        return self.data


class Config:
    def __init__(self, db, scenario_id, sems) -> None:
        self.db = db
        self.scenario_id = scenario_id
        self.sems = sems
        self.data = {}
        self.init()

    def init(self) -> None:
        rows = pd.read_sql(
            "select "
            "scenario.ID_Scenario as scenario_id, "
            "pv.ID_PV as pv_id, pv.size as pv_size, "
            "battery.ID_Battery as battery_id, battery.capacity as battery_capacity, "
            "hs.ID_Boiler as hs_id, hs.type as hs_type, "
            "building.ID_Building as building_id "
            "from "
            "(OperationScenario scenario "
            "inner join OperationScenario_Component_PV pv "
            "on scenario.ID_PV = pv.ID_PV "
            "inner join OperationScenario_Component_Battery battery "
            "on scenario.ID_Battery = battery.ID_Battery "
            "inner join OperationScenario_Component_Boiler hs "
            "on scenario.ID_Boiler = hs.ID_Boiler "
            "inner join OperationScenario_Component_Building building "
            "on scenario.ID_Building = building.ID_Building) "
            "where scenario.ID_Scenario=" + str(self.scenario_id),
            con=self.db,
        )
        self.data["pv_size"] = int(rows["pv_size"].values[0])
        self.data["battery_capacity"] = int(rows["battery_capacity"].values[0] / 1000)
        self.data["heating_system_type"] = rows["hs_type"].values[0]
        self.data["building_renovation"] = bool(rows["building_id"].values[0] % 2 != 0)
        self.data["sems"] = self.sems

    def get_data(self) -> any:
        return self.data


class Profile:
    def __init__(self, db, scenario_id) -> None:
        self.db = db
        self.scenario_id = scenario_id
        self.data = {}
        self.init()

    def init(self) -> None:
        rows = pd.read_sql(
            "select "
            "building.person_num as person, "
            "region_.code as region "
            "from "
            "(OperationScenario scenario "
            "inner join OperationScenario_Component_Region region_ "
            "on scenario.ID_Region = region_.ID_Region "
            "inner join OperationScenario_Component_Building building "
            "on scenario.ID_Building = building.ID_Building) "
            "where scenario.ID_Scenario=" + str(self.scenario_id),
            con=self.db,
        )
        self.data["person"] = int(rows["person"].values[0])
        self.data["region"] = rows["region"].values[0]

    def get_data(self) -> any:
        return self.data


class MonthlyComponentEnergyData:
    def __init__(self, db, scenario_id, sems, component) -> None:
        self.db = db
        self.scenario_id = scenario_id
        self.sems = sems
        self.component = component
        self.data = []
        self.init()

    def init(self) -> None:
        table = "EnergyData_ReferenceMonth"
        if self.sems:
            table = "EnergyData_OptimizationMonth"
        data = pd.read_sql(
            "select "
            + self.component
            + " from "
            + table
            + " where ID_Scenario="
            + str(self.scenario_id)
            + " order by Month",
            con=self.db,
        )
        for i in range(12):
            self.data.append(int(data[self.component].values[i] / 1000))

    def sum(self) -> int:
        return sum(self.data)

    def get_data(self) -> any:
        return self.data


class EnergyData:
    def __init__(self, db, scenario_id, sems) -> None:
        self.db = db
        self.scenario_id = scenario_id
        self.sems = sems
        self.data = {}
        self.total_cost = 0
        self.init()

    def init(self) -> None:
        table = "OperationResult_ReferenceYear"
        if self.sems:
            table = "OperationResult_OptimizationYear"

        rows = pd.read_sql(
            "select "
            "TotalCost "
            "from " + table + " where ID_Scenario=" + str(self.scenario_id),
            con=self.db,
        )
        self.data["energy_bill_year"] = int(rows["TotalCost"].values[0] / 100)
        heating = MonthlyComponentEnergyData(
            self.db, self.scenario_id, self.sems, "Heating"
        ).get_data()
        cooling = MonthlyComponentEnergyData(
            self.db, self.scenario_id, self.sems, "Cooling"
        ).get_data()
        appliance = MonthlyComponentEnergyData(
            self.db, self.scenario_id, self.sems, "Appliance"
        ).get_data()
        hotwater = MonthlyComponentEnergyData(
            self.db, self.scenario_id, self.sems, "Hotwater"
        ).get_data()
        pv = MonthlyComponentEnergyData(
            self.db, self.scenario_id, self.sems, "PV"
        ).get_data()
        self.data["energy_demand"] = sum(
            [heating[i] + cooling[i] + appliance[i] + hotwater[i] for i in range(12)]
        )
        self.data["energy_generate"] = sum(pv)
        self.data["heating"] = heating
        self.data["cooling"] = cooling
        self.data["appliance"] = appliance
        self.data["hotwater"] = hotwater
        self.data["pv"] = pv

    def get_data(self) -> any:
        return self.data


class Current:
    def __init__(self, db, scenario_id, sems) -> None:
        self.db = db
        self.scenario_id = scenario_id
        self.sems = sems
        self.data = {}
        self.init()

    def init(self) -> None:
        self.data["config"] = Config(self.db, self.scenario_id, self.sems).get_data()
        self.data["energy_data"] = EnergyData(
            self.db, self.scenario_id, self.sems
        ).get_data()

    def get_data(self) -> any:
        return self.data


class Recommendation:
    def __init__(self, db, scenario_id, sems, investmentCost: int) -> None:
        self.db = db
        self.scenario_id = scenario_id
        self.sems = sems
        self.investmentCost = investmentCost
        self.data = {}
        self.init()

    def init(self) -> None:
        self.data["config"] = Config(self.db, self.scenario_id, self.sems).get_data()
        self.data["energy_data"] = EnergyData(
            self.db, self.scenario_id, self.sems
        ).get_data()
        self.data["investment_cost"] = self.investmentCost

    def get_data(self) -> any:
        return self.data


class CandidateFinder:
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

        possibleImpr = {}
        constraints = copy.copy(current)
        constraints.pop("ID_Scenario")
        if current["ID_Building"] % 2 == 0:
            constraints["ID_Building"] = current["ID_Building"] - 1
        if current["ID_Boiler"] > 1:
            constraints["ID_Boiler"] = 1
        if current["ID_PV"] > 1:
            possibleImpr["ID_PV"] = current["ID_PV"]
            constraints.pop("ID_PV")
        if current["ID_Battery"] > 1:
            possibleImpr["ID_Battery"] = current["ID_Battery"]
            constraints.pop("ID_Battery")

        query = "select ID_Scenario from OperationScenario where "
        for key, value in constraints.items():
            query += key + "=" + str(value) + " and "
        for key, value in possibleImpr.items():
            query += key + "<" + str(value) + " and "
        query = query[:-5]
        self.canditates = pd.read_sql(query, con=self.db)["ID_Scenario"].values

    def getCandidates(self) -> list:
        return self.canditates


class Improvement:
    def __init__(self, db, scenario_id, sems, currentCost, currentConfig) -> None:
        self.db = db
        self.scenario_id = scenario_id
        self.sems = sems
        self.currentCost = currentCost
        self.currentConfig = currentConfig
        self.value = 0
        self.cost = 0
        self.init()

    def init(self) -> None:
        energyData = EnergyData(self.db, self.scenario_id, self.sems).get_data()
        config = Config(self.db, self.scenario_id, self.sems).get_data()
        configCost = {
            "building_renovation": 2000,
            "heating_system_type": 900,
            "pv_size": 116 * int(config["pv_size"]),
            "battery_capacity": 41 * int(config["battery_capacity"] / 1000),
            "sems": 96,
        }
        for key, value in config.items():
            print(key, value)
            if value != self.currentConfig[key]:
                self.cost += configCost[key]
        self.value = self.currentCost - energyData["energy_bill_year"]

    def getValue(self) -> int:
        return self.value

    def getCost(self) -> int:
        return self.cost

    def getSems(self) -> int:
        return self.sems

    def getScenarioId(self) -> int:
        return self.scenario_id


class RecommendationList:
    def __init__(self, db, scenario_id, sems, currentCost) -> None:
        self.db = db
        self.scenario_id = scenario_id
        self.sems = sems
        self.data = []
        self.currentCost = currentCost
        self.init()

    def init(self) -> None:
        canditates = CandidateFinder(self.db, self.scenario_id).getCandidates()

        improvements = []
        currentConfig = Config(self.db, self.scenario_id, self.sems).get_data()
        for id in canditates:
            improvements.append(
                Improvement(self.db, id, self.sems, self.currentCost, currentConfig)
            )
            if self.sems == False:
                improvements.append(
                    Improvement(self.db, id, True, self.currentCost, currentConfig)
                ) 
        # Simply adding a smartphone system to the current system
        # is also a possible improvement
        if self.sems == False:
            improvements.append(
                Improvement(
                    self.db, self.scenario_id, True, self.currentCost, currentConfig
                )
            )
        improvements.sort(key=lambda x: x.getValue(), reverse=True)
        for improvement in improvements:
            self.data.append(
                Recommendation(
                    self.db,
                    improvement.getScenarioId(),
                    improvement.getSems(),
                    improvement.getCost(),
                ).get_data()
            )

    def get_data(self) -> OrderedDict:
        return self.data

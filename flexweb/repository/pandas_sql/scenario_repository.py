from flexweb.types.scenario import Scenario
from flexweb.types.component import *
from .investment_cost import InvestmentCost
from typing import Optional
import pandas as pd


class ScenarioRepository:
    def __init__(self, db: any, handlers: dict) -> None:
        self.__db = db
        handlers["scenario_by_id"] = self.get_scenario_dict_by_id
        handlers["id_by_scenario"] = self.get_id_by_scenario
        handlers["investment_cost_by_id"] = self.get_investment_cost_by_id

    def get_scenario_by_id(self, param: dict) -> Scenario:
        id: int = param["id"]
        rows = pd.read_sql(
            "select "
            "pv.size as pv_size, "
            "battery.capacity as battery_capacity, "
            "boiler.type as boiler_type, "
            "building.person_num as building_person_num, "
            "building.construction_period_start as building_construction_period_start, "
            "building.construction_period_end as building_construction_period_end, "
            "scenario.ID_Building as building_id, "
            "region.code as region_code, "
            "hot_water_tank.size as hot_water_tank_size, "
            "cooling.power as cooling_power "
            "from "
            "(OperationScenario scenario "
            "inner join OperationScenario_Component_PV pv "
            "on scenario.ID_PV = pv.ID_PV "
            "inner join OperationScenario_Component_Battery battery "
            "on scenario.ID_Battery = battery.ID_Battery "
            "inner join OperationScenario_Component_Boiler boiler "
            "on scenario.ID_Boiler = boiler.ID_Boiler "
            "inner join OperationScenario_Component_Building building "
            "on scenario.ID_Building = building.ID_Building "
            "inner join OperationScenario_Component_Region region "
            "on scenario.ID_Region = region.ID_Region "
            "inner join OperationScenario_Component_HotWaterTank hot_water_tank "
            "on scenario.ID_HotWaterTank = hot_water_tank.ID_HotWaterTank "
            "inner join OperationScenario_Component_SpaceCoolingTechnology cooling "
            "on scenario.ID_SpaceCoolingTechnology = cooling.ID_SpaceCoolingTechnology) "
            "where scenario.ID_Scenario=" + str(id),
            con=self.__db,
        )
        if len(rows) == 0:
            return None
        row = rows.iloc[0]
        return Scenario(
            pv=PV(size=int(row["pv_size"])),
            battery=Battery(capacity=int(row["battery_capacity"] / 1000)),
            boiler=Boiler(type=row["boiler_type"]),
            building=Building(
                renovated=bool(row["building_id"] % 2 != 0),
                construction_period=(
                    int(row["building_construction_period_start"]),
                    int(row["building_construction_period_end"]),
                ),
                person_num=int(row["building_person_num"]),
            ),
            region=Region(code=row["region_code"]),
            hot_water_tank=HotWaterTank(size=int(row["hot_water_tank_size"])),
            cooling=Cooling(power=int(row["cooling_power"])),
        )
    
    def get_scenario_dict_by_id(self, param: dict) -> dict:
        return self.get_scenario_by_id(param).to_dict()

    def get_id_by_scenario(self, param: dict) -> dict:
        scenario: Scenario = Scenario.from_dict(param)
        battery_capacity: int = int(scenario.get_battery().get_capacity()) * 1000
        rows = pd.read_sql(
            "select "
            "scenario.ID_Scenario as id "
            "from "
            "(OperationScenario scenario "
            "inner join OperationScenario_Component_PV pv "
            "on scenario.ID_PV = pv.ID_PV "
            "inner join OperationScenario_Component_Battery battery "
            "on scenario.ID_Battery = battery.ID_Battery "
            "inner join OperationScenario_Component_Boiler boiler "
            "on scenario.ID_Boiler = boiler.ID_Boiler "
            "inner join OperationScenario_Component_Building building "
            "on scenario.ID_Building = building.ID_Building "
            "inner join OperationScenario_Component_Region region "
            "on scenario.ID_Region = region.ID_Region "
            "inner join OperationScenario_Component_HotWaterTank hot_water_tank "
            "on scenario.ID_HotWaterTank = hot_water_tank.ID_HotWaterTank "
            "inner join OperationScenario_Component_SpaceCoolingTechnology cooling "
            "on scenario.ID_SpaceCoolingTechnology = cooling.ID_SpaceCoolingTechnology) "
            "where "
            "pv.size=" + str(scenario.get_pv().get_size()) + " and "
            "battery.capacity=" + str(battery_capacity) + " and "
            "boiler.type='" + str(scenario.get_boiler().get_type()) + "' and "
            "building.person_num="
            + str(scenario.get_building().get_person_num())
            + " and "
            "building.construction_period_start="
            + str(scenario.get_building().get_construction_period()[0])
            + " and "
            "building.construction_period_end="
            + str(scenario.get_building().get_construction_period()[1])
            + " and "
            + "scenario.ID_Building%2="
            + str(1 if scenario.get_building().get_renovated() else 0)
            + " and "
            "region.code='"
            + str(scenario.get_region().get_code())
            + "'"
            + " and "
            + "hot_water_tank.size="
            + str(scenario.get_hot_water_tank().get_capacity())
            + " and "
            + "cooling.power="
            + str(scenario.get_cooling().get_power()),
            con=self.__db,
        )
        if len(rows) == 0:
            return None
        row = rows.iloc[0]
        return {"id": int(row["id"])}

    def get_investment_cost_by_id(self, param: dict) -> dict:
        old_id: int = param["old_id"]
        new_id: int = param["new_id"]
        old_scenario = self.get_scenario_by_id({"id": old_id})
        new_scenario = self.get_scenario_by_id({"id": new_id})
        return {
            "investment_cost": InvestmentCost(
                old_scenario, new_scenario, param["sems"]
            ).to_int()
        }

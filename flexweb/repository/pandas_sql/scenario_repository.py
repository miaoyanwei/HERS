from flexweb.repository.base.repository import (
    ScenarioRepository as BaseScenarioRepository,
)
from flexweb.types.scenario import Scenario
from flexweb.types.component import *
from typing import Optional
import pandas as pd


class ScenarioRepository(BaseScenarioRepository):
    def __init__(self, db: any) -> None:
        self.__db = db

    def get_scenario_by_id(self, id: int) -> Optional[Scenario]:
        rows = pd.read_sql(
            "select "
            "pv.size as pv_size, "
            "battery.capacity as battery_capacity, "
            "boiler.type as boiler_type, "
            "building.person_num as building_person_num, "
            "building.construction_period_start as building_construction_period_start, "
            "building.construction_period_end as building_construction_period_end, "
            "scenario.ID_Building as building_id, "
            "region.code as region_code "
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
            "on scenario.ID_Region = region.ID_Region) "
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
        )

    def get_id_by_scenario(self, scenario: Scenario) -> Optional[int]:
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
            "on scenario.ID_Region = region.ID_Region) "
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
            "region.code='" + str(scenario.get_region().get_code()) + "'",
            con=self.__db,
        )
        if len(rows) == 0:
            return None
        row = rows.iloc[0]
        return int(row["id"])

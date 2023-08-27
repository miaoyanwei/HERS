from flexweb.types.energy import EnergyData, CostData, MonthlyData
import pandas as pd


class EnergyRepository:
    def __init__(self, db, handlers: dict) -> None:
        self.__db = db
        handlers["energy_data_by_id"] = self.get_energy_data_by_id
        handlers["energy_cost_by_id"] = self.get_energy_cost_by_id

    def get_energy_data_by_id(self, param: dict) -> dict:
        id: int = param["id"]
        sems: bool = param["sems"]
        table = "OperationResult_ReferenceMonth"
        if sems == True:
            table = "OperationResult_OptimizationMonth"
        rows = (
            pd.read_sql(
                "select "
                + "(E_Heating_HP_out + Q_HeatingElement) as Heating, "
                + "E_RoomCooling as Cooling, "
                + "BaseLoadProfile as Appliance, "
                + "E_DHW_HP_out as Hotwater, "
                + "PhotovoltaicProfile as PV "
                + " from "
                + table
                + " where ID_Scenario="
                + str(id)
                + " order by Month",
                con=self.__db,
            )
            / 1000
        )
        if len(rows) == 0:
            return None

        total_generate: int = 0
        total_demand: int = 0
        for idx in range(len(rows)):
            row = rows.iloc[idx]
            total_generate += row["PV"]
            total_demand += (
                row["Heating"] + row["Cooling"] + row["Appliance"] + row["Hotwater"]
            )

        return EnergyData(
            total_generate=int(total_generate),
            total_demand=int(total_demand),
            boiler=MonthlyData(
                [int(rows.iloc[idx]["Heating"]) for idx in range(len(rows))]
            ),
            cooling=MonthlyData(
                [int(rows.iloc[idx]["Cooling"]) for idx in range(len(rows))]
            ),
            appliance=MonthlyData(
                [int(rows.iloc[idx]["Appliance"]) for idx in range(len(rows))]
            ),
            hotwater=MonthlyData(
                [int(rows.iloc[idx]["Hotwater"]) for idx in range(len(rows))]
            ),
            pv=MonthlyData([int(rows.iloc[idx]["PV"]) for idx in range(len(rows))]),
        ).to_dict()

    def get_energy_cost_by_id(self, param: dict) -> dict:
        id: int = param["id"]
        sems: bool = param["sems"]
        table = "OperationResult_ReferenceYear"
        if sems == True:
            table = "OperationResult_OptimizationYear"
        rows = pd.read_sql(
            "select "
            + "TotalCost "
            + " from "
            + table
            + " where ID_Scenario="
            + str(id),
            con=self.__db,
        )
        if len(rows) == 0:
            return None
        return CostData(yearly_bill=int(rows.iloc[0]["TotalCost"] / 100)).to_dict()

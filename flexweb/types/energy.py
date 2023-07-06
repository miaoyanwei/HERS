class MonthlyData:
    def __init__(self, data: list[int]):
        if len(data) != 12:
            raise ValueError("Invalid data length")
        self.__data = data

    def at(self, month: int) -> int:
        if month < 0 or month > 11:
            raise ValueError("Invalid month")
        return self.__data[month]

    def to_list(self) -> list[int]:
        return self.__data

class CostData:
    def __init__(self, yearly_bill : int):
        self.__yearly_bill = yearly_bill
    
    def get_yearly_bill(self) -> int:
        return self.__yearly_bill
    
    def to_dict(self) -> dict:
        return {"yearly_bill": self.__yearly_bill}

class EnergyData:
    def __init__(
        self,
        total_demand: int,
        total_generate: int,
        boiler: MonthlyData,
        cooling: MonthlyData,
        appliance: MonthlyData,
        hotwater: MonthlyData,
        pv: MonthlyData,
    ):
        self.__total_demand = total_demand
        self.__total_generate = total_generate
        self.__boiler = boiler
        self.__cooling = cooling
        self.__appliance = appliance
        self.__hotwater = hotwater
        self.__pv = pv

    def get_total_demand(self) -> MonthlyData:
        return self.__total_demand

    def get_total_generate(self) -> MonthlyData:
        return self.__total_generate

    def get_boiler(self) -> MonthlyData:
        return self.__boiler

    def get_cooling(self) -> MonthlyData:
        return self.__cooling

    def get_appliance(self) -> MonthlyData:
        return self.__appliance

    def get_hotwater(self) -> MonthlyData:
        return self.__hotwater

    def get_pv(self) -> MonthlyData:
        return self.__pv

    def to_dict(self) -> dict:
        return {
            "total_demand": self.__total_demand,
            "total_generate": self.__total_generate,
            "boiler": self.__boiler.to_list(),
            "cooling": self.__cooling.to_list(),
            "appliance": self.__appliance.to_list(),
            "hotwater": self.__hotwater.to_list(),
            "pv": self.__pv.to_list(),
        }

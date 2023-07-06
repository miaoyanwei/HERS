from strenum import StrEnum


class BoilerType(StrEnum):
    AIR_HP = "Air_HP"
    GASES = "gases"
    SOLIDS = "solids"
    DISTRICT_HEATING = "district_heating"
    LIQUIDS = "liquids"


class Boiler:
    __cost = {
        BoilerType.AIR_HP: 900,
        BoilerType.GASES: 400,
        BoilerType.SOLIDS: 400,
        BoilerType.DISTRICT_HEATING: 400,
        BoilerType.LIQUIDS: 400,
    }

    def __init__(self, type: BoilerType) -> None:
        self.__type = type

    def get_type(self) -> BoilerType:
        return self.__type

    def get_cost(self) -> int:
        return self.__cost[self.__type]

    def equals(self, other) -> bool:
        if not isinstance(other, Boiler):
            return False
        return self.__type == other.__type

    def to_dict(self) -> dict:
        return {"type": str(self.__type)}

    @staticmethod
    def from_dict(dict: dict):
        return Boiler(type=BoilerType(dict["type"]))


class Battery:
    def __init__(self, capacity: int) -> None:
        self.__capacity = capacity

    def get_capacity(self) -> int:
        return self.__capacity

    def get_cost(self) -> int:
        return self.__capacity * 41

    def equals(self, other) -> bool:
        if not isinstance(other, Battery):
            return False
        return self.__capacity == other.__capacity

    def to_dict(self) -> dict:
        return {"capacity": self.__capacity}

    @staticmethod
    def from_dict(dict: dict):
        return Battery(dict.get("capacity", 0))


class Building:
    def __init__(
        self, construction_period: tuple[int, int], renovated: bool, person_num: int
    ) -> None:
        self.__construction_period = construction_period
        self.__renovated = renovated
        self.__person_num = person_num

    def get_cost(self) -> int:
        return 2000

    def get_construction_period(self) -> tuple[int, int]:
        return self.__construction_period

    def get_renovated(self) -> bool:
        return self.__renovated

    def get_person_num(self) -> int:
        return self.__person_num

    def equals(self, other) -> bool:
        if not isinstance(other, Building):
            return False
        return (
            self.__construction_period == other.__construction_period
            and self.__renovated == other.__renovated
            and self.__person_num == other.__person_num
        )

    def to_dict(self) -> dict:
        return {
            "construction_period_start": self.__construction_period[0],
            "construction_period_end": self.__construction_period[1],
            "renovated": self.__renovated,
            "person_num": self.__person_num,
        }

    @staticmethod
    def from_dict(dict: dict):
        return Building(
            construction_period=(
                dict["construction_period_start"],
                dict["construction_period_end"],
            ),
            renovated=dict["renovated"],
            person_num=dict["person_num"],
        )


class PV:
    def __init__(self, size: int) -> None:
        self.__size = size

    def get_size(self) -> int:
        return self.__size

    def get_cost(self) -> int:
        return self.__size * 116

    def equals(self, other) -> bool:
        if not isinstance(other, PV):
            return False
        return self.__size == other.__size

    def to_dict(self) -> dict:
        return {"size": self.__size}

    @staticmethod
    def from_dict(dict: dict):
        return PV(size=dict.get("size", 0))


class Region:
    def __init__(self, code: str):
        self.__code = code

    def get_cost(self) -> int:
        return 0

    def get_code(self) -> str:
        return self.__code

    def equals(self, other) -> bool:
        if not isinstance(other, Region):
            return False
        return self.__code == other.__code

    def to_dict(self) -> dict:
        return {"code": self.__code}

    @staticmethod
    def from_dict(dict: dict):
        return Region(code=dict["code"])

class HotWaterTank:
    def __init__(self, size: int) -> None:
        self.__size = size

    def get_capacity(self) -> int:
        return self.__size

    def get_cost(self) -> int:
        return self.__size * 41

    def equals(self, other) -> bool:
        if not isinstance(other, HotWaterTank):
            return False
        return self.__size == other.__size

    def to_dict(self) -> dict:
        return {"size": self.__size}

    @staticmethod
    def from_dict(dict: dict):
        return HotWaterTank(dict.get("size", 0))

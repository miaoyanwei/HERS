from flexweb.api.base.endpoint import Endpoint
from flexweb.repository.base.repository import Repository

from typing import Optional


def _str_to_bool(s: str) -> bool:
    if s == "true":
        return True
    elif s == "false":
        return False
    else:
        raise ValueError("String is not a boolean")


class EnergyData(Endpoint):
    __repository: Repository

    def __init__(self, repository: Repository):
        self.__repository = repository

    def get(self, data: dict) -> Optional[dict]:
        # Returns the energy data of the scenario id
        data = self.__repository.get_energy_repository().get_energy_data_by_id(
            data["id"], _str_to_bool(data["sems"])
        )
        if data is None:
            return None
        return data.to_dict()

    def post(self, data: dict) -> Optional[dict]:
        return None


class EnergyCost(Endpoint):
    __repository: Repository

    def __init__(self, repository: Repository):
        self.__repository = repository

    def get(self, data: dict) -> Optional[dict]:
        # Returns the energy data of the scenario id
        print(data)
        data = self.__repository.get_energy_repository().get_energy_cost_by_id(
            data["id"], _str_to_bool(data["sems"])
        )
        if data is None:
            return None
        return data.to_dict()

    def post(self, data: dict) -> Optional[dict]:
        return None

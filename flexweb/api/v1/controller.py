from flexweb.api.base.controller import Controller as BaseController
from flexweb.api.base.endpoint import Endpoint
from .scenario import Scenario
from .energy import EnergyData, EnergyCost
from .recommendation import Recommendation

from flexweb.repository.base.repository import Repository


class Controller(BaseController):
    __dict__: dict[Endpoint]

    def __init__(self, respository: Repository):
        self.__dict__ = {}
        self.__dict__["scenario"] = Scenario(respository)
        self.__dict__["energy_data"] = EnergyData(respository)
        self.__dict__["energy_cost"] = EnergyCost(respository)
        self.__dict__["recommendation"] = Recommendation(respository)

    def handle(self, method: str, endpoint: str, data: dict) -> dict:
        ep = self.__dict__[endpoint]
        if ep is None:
            return None
        if method == "GET":
            return ep.get(data)
        elif method == "POST":
            return ep.post(data)

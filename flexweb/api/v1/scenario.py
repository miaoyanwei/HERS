from flexweb.api.base.endpoint import Endpoint
from flexweb.repository.base.repository import Repository
from flexweb.types.scenario import Scenario as ScenarioType

from typing import Optional


class Scenario(Endpoint):
    # This class is used to get and post the configuration of a scenario
    # The post argument and get return value is a json object with the following structure:
    # {
    #    "region": {
    #        "country": "DE"
    #    },
    #    "pv": {
    #        "size": 0
    #    },
    #    "battery": {
    #        "capacity": 0
    #    },
    #    "building": {
    #        "range_begin": 1880,
    #        "range_end": 1949,
    #        "renovate": false
    #    },
    #    "person": {
    #        "no": 5
    #    }
    # }

    # The post argument and get return value is a json object with the following structure:
    # {
    #    "scenario_id": 0
    # }
    __repository: Repository

    def __init__(self, repository: Repository):
        self.__repository = repository

    def get(self, data: dict) -> Optional[dict]:
        # Returns the configuration of the scenario id
        scenario = self.__repository.get_scenario_repository().get_scenario_by_id(
            data["id"]
        )
        if scenario is None:
            return None
        return scenario.to_dict()

    def post(self, data: dict) -> Optional[dict]:
        # Returns the scenario id of the configuration
        id = self.__repository.get_scenario_repository().get_id_by_scenario(
            ScenarioType.from_dict(data)
        )
        if id is None:
            return None
        return {"id": id}

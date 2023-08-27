from flexweb.repository.base.repository import Repository
from flexweb.types.scenario import Scenario
from typing import Optional
import json


def _str_to_bool(s: str) -> bool:
    if s == "true":
        return True
    elif s == "false":
        return False
    else:
        raise ValueError("String is not a boolean")


class V1:
    __repository: Repository
    __handlers: dict

    def __init__(self, respository: Repository):
        self.__repository = respository
        self.__handlers = {
            "energy_data": self.energy_data,
            "energy_cost": self.energy_cost,
            "recommendation": self.recommendation,
            "scenario": self.scenario,
            "survey_scenario": self.survey_scenario,
        }

    def endpoint(self, endpoint: str) -> Optional[dict]:
        return self.__handlers[endpoint]

    def energy_data(self, method: str, data: dict) -> Optional[dict]:
        if method == "GET":
            data = self.__repository.query(
                "energy_data_by_id",
                {"id": data["id"], "sems": _str_to_bool(data["sems"])},
            )
            if data is None:
                return "Not Found", 404
            return data
        else:
            return "Method Not Allowed", 405

    def energy_cost(self, method: str, data: dict) -> Optional[dict]:
        # Returns the energy cost of the scenario id
        if method == "GET":
            data = self.__repository.query(
                "energy_cost_by_id",
                {"id": data["id"], "sems": _str_to_bool(data["sems"])},
            )
            if data is None:
                return "Not Found", 404
            return data.to_dict()
        else:
            return "Method Not Allowed", 405

    def recommendation(self, method: str, data: dict) -> Optional[dict]:
        if method == "GET":
            recommendation = self.__repository.query(
                "recommendation_by_id",
                {"id": data["id"], "sems": _str_to_bool(data["sems"])},
            )
            if recommendation is None:
                return "Not Found", 404
            return recommendation
        else:
            return "Method Not Allowed", 405

    def scenario(self, method: str, data: dict) -> Optional[dict]:
        if method == "GET":
            scenario = self.__repository.query("scenario_by_id", {"id": data["id"]})
            if scenario is None:
                return "Not Found", 404
            return scenario
        elif method == "POST":
            data = self.__repository.query("id_by_scenario", data)
            if id is None:
                return "Not Found", 404
            return data
        else:
            return "Method Not Allowed", 405

    def survey_scenario(self, method: str, data: dict) -> Optional[dict]:
        if method == "POST":
            return self.scenario(method, _map_json(data))
        else:
            return "Method Not Allowed", 405


def _map_json(data):
    new_json = json.loads("{}")
    # Iterate through the key-value pairs
    for key, value in data.items():
        fields = key.split("_")
        category = fields[0]
        variable = fields[1]
        if variable == "exist":
            if (value == True) and new_json.get(category) is None:
                new_json[category] = json.loads("{}")
        else:
            if new_json.get(category) is None:
                new_json[category] = json.loads("{}")
            if (category == "region") and (variable != "country"):
                variable = fields[-1]
                new_json[category][variable] = value
            elif variable == "construction":
                years = value.split("-")
                new_json[category]["construction_period_start"] = years[0]
                new_json[category]["construction_period_end"] = years[1]
            elif variable == "person":
                new_json[category]["person_num"] = value
            else:
                new_json[category][variable] = value
    if new_json.get("cooling") is not None:
        new_json["cooling"]["power"] = 10000

    return new_json

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


class Recommendation(Endpoint):
    __repository: Repository

    def __init__(self, repository: Repository):
        self.__repository = repository

    def get(self, data: dict) -> Optional[dict]:
        # Returns the configuration of the scenario id
        recommendation = (
            self.__repository.get_recommendation_repository().get_recommendation_by_id(
                data["id"], _str_to_bool(data["sems"])
            )
        )
        if recommendation is None:
            return None
        return recommendation.to_dict()

    def post(self, data: dict) -> Optional[dict]:
        return None

from abc import ABC, abstractmethod
from flexweb.types.recommendation import RecommendationList
from flexweb.types.scenario import Scenario

class RecommendationRepository(ABC):
    @abstractmethod
    def get_recommendation_by_id(self, id: int, sems: bool) -> RecommendationList:
        pass

    @abstractmethod
    def get_recommendation_by_scenario(self, scenario: Scenario, sems: bool) -> RecommendationList:
        pass

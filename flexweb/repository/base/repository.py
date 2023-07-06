from abc import ABC, abstractmethod
from .scenario_repository import ScenarioRepository
from .energy_repository import EnergyRepository
from .recommendation_repository import RecommendationRepository


class Repository(ABC):
    @abstractmethod
    def get_scenario_repository(self) -> ScenarioRepository:
        pass

    def get_energy_repository(self) -> EnergyRepository:
        pass

    def get_recommendation_repository(self) -> RecommendationRepository:
        pass

from flexweb.repository.base.repository import Repository as BaseRepository
from .scenario_repository import ScenarioRepository
from .energy_repository import EnergyRepository
from .recommendation_repository import RecommendationRepository


class Repository(BaseRepository):
    def __init__(self, db) -> None:
        self.__scenario_repository = ScenarioRepository(db)
        self.__energy_repository = EnergyRepository(db)
        self.__recommendation_repository = RecommendationRepository(db)

    def get_scenario_repository(self) -> ScenarioRepository:
        return self.__scenario_repository

    def get_energy_repository(self) -> EnergyRepository:
        return self.__energy_repository

    def get_recommendation_repository(self) -> RecommendationRepository:
        return self.__recommendation_repository

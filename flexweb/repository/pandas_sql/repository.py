from flexweb.repository.base.repository import Repository as BaseRepository
from .scenario_repository import ScenarioRepository
from .energy_repository import EnergyRepository
from .recommendation_repository import RecommendationRepository


class Repository(BaseRepository):
    __handlers: dict

    def __init__(self, db) -> None:
        self.__handlers = {}
        self.__scenario_repository = ScenarioRepository(db, self.__handlers)
        self.__energy_repository = EnergyRepository(db, self.__handlers)
        self.__recommendation_repository = RecommendationRepository(
            db, self.__scenario_repository, self.__energy_repository, self.__handlers
        )

    def query(self, command: str, param: dict) -> dict:
        return self.__handlers[command](param)

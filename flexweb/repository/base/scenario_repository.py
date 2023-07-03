from abc import ABC, abstractmethod
from flexweb.types.scenario import *

class ScenarioRepository(ABC):
    @abstractmethod
    def get_scenario_by_id(self, id: int) -> Scenario:
        pass

    @abstractmethod
    def get_id_by_scenario(self, scenario: Scenario) -> int:
        pass

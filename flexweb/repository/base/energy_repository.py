from abc import ABC, abstractmethod
from flexweb.types.energy import EnergyData, CostData


class EnergyRepository(ABC):
    @abstractmethod
    def get_energy_data_by_id(self, id: int, sems: bool) -> EnergyData:
        pass

    @abstractmethod
    def get_energy_cost_by_id(self, id: int, sems: bool) -> CostData:
        pass

from abc import ABC, abstractmethod


class Repository(ABC):
    @abstractmethod
    def query(self, command: str, param: dict) -> dict:
        pass

from abc import ABC, abstractmethod


class Controller(ABC):
    @abstractmethod
    def handle(self, method: str, endpoint: str, data: dict) -> dict:
        pass

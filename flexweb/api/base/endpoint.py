from abc import ABC, abstractmethod
from typing import Optional


class Endpoint(ABC):
    @abstractmethod
    def get(self, data: dict) -> Optional[dict]:
        pass

    @abstractmethod
    def post(self, data: dict) -> Optional[dict]:
        pass

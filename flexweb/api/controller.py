from flexweb.repository.base.repository import Repository
from flexweb.api.base.controller import Controller as BaseController
from flexweb.api.v1.controller import Controller as V1Controller


class Controller:
    __repository: Repository
    __dict__: dict[BaseController]

    def __init__(self, repository: Repository):
        self.__dict__ = {}
        self.__dict__["v1"] = V1Controller(repository)

    def handle(self, version: str, method: str, endpoint: str, data: dict) -> dict:
        v = self.__dict__[version]
        if v is None:
            return None
        return v.handle(method, endpoint, data)

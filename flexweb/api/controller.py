from flexweb.repository.base.repository import Repository
from flexweb.api.v1 import V1


class Controller:
    __versions: dict

    def __init__(self, repository: Repository):
        self.__versions = {"v1": V1(repository)}

    def version(self, ver: str) -> V1:
        return self.__versions[ver]

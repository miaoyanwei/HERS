from flexweb.storage.manager import Manager as StorageManager
from flexweb.api.v1 import V1


class Controller:
    __versions: dict

    def __init__(self, storage: StorageManager):
        self.__versions = {"v1": V1(storage)}

    def version(self, ver: str) -> V1:
        return self.__versions[ver]

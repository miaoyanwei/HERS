from enum import Enum
from flexweb.repository.base.repository import Repository
from flexweb.repository.pandas_sql.repository import Repository as PandasRepository
import os
import sqlite3


class SqlApi(Enum):
    PANDAS = 1


class Store:
    __repositories: dict
    __creator: dict

    def __init__(self, path: str, connector: SqlApi):
        self.__repositories = {}
        self.__creator = {SqlApi.PANDAS: PandasRepository}
        # Find all sql files in the path
        for file in os.listdir(path):
            if file.endswith(".sqlite"):
                print("Found database file: " + file)
                self.__repositories[os.path.splitext(file)[0]] = self.__creator[
                    connector
                ](sqlite3.connect(os.path.join(path, file)))

    def repository(self, name: str) -> Repository:
        return self.__repositories.get(name)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from flexweb.storage.db import UserDBInterface
import os

class Manager:
    __connector = {}

    def __init__(self, path: str):

        # Find all sql files in the path
        for file in os.listdir(path):
            if file.endswith(".sqlite"):
                print("Found database file: " + file)
                self.__connector[os.path.splitext(file)[0]] = sessionmaker(create_engine(
                    "sqlite:///" + os.path.join(path, file)
                ))

    def user_db_interface(self, country : str) -> UserDBInterface:
        return UserDBInterface(self.__connector[country]())
    
    def list_db(self) -> list:
        return list(self.__connector.keys())



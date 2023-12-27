from typing import Optional
import json
from flexweb.storage.manager import Manager as StorageManager
from operator import methodcaller

def _str_to_bool(s: str) -> bool:
    if s == "true":
        return True
    elif s == "false":
        return False
    else:
        raise ValueError("String is not a boolean")


class V1:
    __storage: StorageManager
    __handlers: dict

    def __init__(self, storage: StorageManager):
        self.__storage = storage

    def endpoint(self, endpoint: str):
        routes = endpoint.split("/")
        if len(routes) == 0:
            return None
        if len(routes) == 1 and routes[0] == "db":
            return self.db
        if len(routes) >= 2:
            return CountryHandler(self.__storage.db(routes[0])).endpoint(routes[1:])
        return None

    def db(self,  data: dict) -> Optional[dict]:
        return self.__storage.list_db()

class CountryHandler:
    def __init__(self, storage):
        self.__storage = storage

    def endpoint(self, routes):
        print(routes)
        if len(routes) == 0:
            return None
        if len(routes) == 1:
            handlers = {
                "scenario": self.scenario
            }

            return handlers.get(routes[0], None)
        elif len(routes) == 2 and routes[0] == "component":
            handlers = {
                "battery": self.battery,
                "boiler": self.boiler,
                "building": self.building,
                "cooling": self.cooling,
                "hot_water_tank": self.hot_water_tank,
                "pv": self.pv,
                "region": self.region
            }
            return handlers.get(routes[1], None)
        elif len(routes) == 2 and routes[0] == "result":
            handlers = {
                "optimization_year": self.optimization_year,
                "reference_year": self.reference_year
            }
            return handlers.get(routes[1], None)
        else:
            return None

    def battery(self, data: dict) -> Optional[dict]:
        return [e.to_dict() for e in self.__storage.component().battery().match(data)]
        
    def boiler(self, data: dict) -> Optional[dict]:
        return [e.to_dict() for e in self.__storage.component().boiler().match(data)]
    
    def building(self, data: dict) -> Optional[dict]:
        return [e.to_dict() for e in self.__storage.component().building().match(data)]
        
    def cooling(self, data: dict) -> Optional[dict]:
        return [e.to_dict() for e in self.__storage.component().space_cooling_technology().match(data)]
    
    def hot_water_tank(self, data: dict) -> Optional[dict]:
        return [e.to_dict() for e in self.__storage.component().hot_water_tank().match(data)]
    
    def pv(self, data: dict) -> Optional[dict]:
        return [e.to_dict() for e in self.__storage.component().pv().match(data)]
    
    def region(self, data: dict) -> Optional[dict]:
        return [e.to_dict() for e in self.__storage.component().region().match(data)]
    
    def scenario(self, data: dict) -> Optional[dict]:
        return [e.to_dict() for e in self.__storage.scenario().match(data)]
    
    def optimization_year(self, data: dict) -> Optional[dict]:
        return [e.to_dict() for e in self.__storage.result().optimization_year().match(data)]

    def reference_year(self, data: dict) -> Optional[dict]:
        return [e.to_dict() for e in self.__storage.result().reference_year().match(data)]

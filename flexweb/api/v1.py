from typing import Optional
import json
from flexweb.storage.manager import Manager as StorageManager
from operator import methodcaller


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
            return CountryHandler(self.__storage.user_db_interface(routes[0])).endpoint(
                routes[1:]
            )
        return None

    def db(self, data: dict) -> Optional[dict]:
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
                "scenario": self.scenario,
                "recommendation": self.recommendation,
                "upgrade_cost": self.upgrade_cost,
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
                "region": self.region,
            }
            return handlers.get(routes[1], None)
        elif len(routes) == 2 and routes[0] == "result":
            handlers = {
                "optimization_year": self.optimization_year,
                "reference_year": self.reference_year,
                "optimization_month": self.optimization_month,
                "reference_month": self.reference_month,
            }
            return handlers.get(routes[1], None)
        else:
            return None

    def battery(self, data: dict) -> Optional[dict]:
        return [e.to_dict() for e in self.__storage.get_battery(data)]

    def boiler(self, data: dict) -> Optional[dict]:
        return [e.to_dict() for e in self.__storage.get_boiler(data)]

    def building(self, data: dict) -> Optional[dict]:
        return [e.to_dict() for e in self.__storage.get_building(data)]

    def cooling(self, data: dict) -> Optional[dict]:
        return [e.to_dict() for e in self.__storage.get_space_cooling_technology(data)]

    def hot_water_tank(self, data: dict) -> Optional[dict]:
        return [e.to_dict() for e in self.__storage.get_hot_water_tank(data)]

    def pv(self, data: dict) -> Optional[dict]:
        return [e.to_dict() for e in self.__storage.get_pv(data)]

    def region(self, data: dict) -> Optional[dict]:
        return [e.to_dict() for e in self.__storage.get_region(data)]

    def scenario(self, data: dict) -> Optional[dict]:
        result = self.__storage.get_scenario(data)
        if result.count() == 0:
            return None
        return result[0].to_dict()

    def recommendation(self, data: dict) -> Optional[dict]:
        return self.__storage.get_recommendation(data)

    def upgrade_cost(self, data: dict) -> Optional[dict]:
        return self.__storage.get_upgrade_cost(data)

    def optimization_year(self, data: dict) -> Optional[dict]:
        result = self.__storage.get_optimization_year(data)
        if result.count() == 0:
            return None
        return result[0].to_dict()

    def reference_year(self, data: dict) -> Optional[dict]:
        result = self.__storage.get_reference_year(data)
        if result.count() == 0:
            return None
        return result[0].to_dict()

    def optimization_month(self, data: dict) -> Optional[dict]:
        result = self.__storage.get_optimization_month(data)
        if result.count() == 0:
            return None
        return [e.to_dict() for e in result]

    def reference_month(self, data: dict) -> Optional[dict]:
        result = self.__storage.get_reference_month(data)
        if result.count() == 0:
            return None
        return [e.to_dict() for e in result]

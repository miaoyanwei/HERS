import flexweb.storage.mapping as mapping

def _str_to_bool(s: str) -> bool:
    if s == "True":
        return True
    elif s == "False":
        return False
    else:
        raise ValueError("String is not a boolean")

class Request:
    def __init__(self, type, session, query, allow_empty_constraint=True):
        self.__type = type
        self.__session = session
        self.__query = query
        self.__allow_empty_contraint = allow_empty_constraint

    def execute(self):
        if not self.__allow_empty_contraint and len(self.__query) == 0:
            return []
        return self.__session.query(self.__type).filter_by(**self.__query)

# UserDBInterface
class UserDBInterface:
    def __init__(self, session):
        self.__session = session

    def get_battery(self, query: dict):
        return Request(mapping.Battery, self.__session, query).execute()

    def get_boiler(self, query: dict):
        return Request(mapping.Boiler, self.__session, query).execute()

    def get_building(self, query: dict):
        return Request(mapping.Building, self.__session, query).execute()

    def get_pv(self, query: dict):
        return Request(mapping.PV, self.__session, query).execute()

    def get_hot_water_tank(self, query: dict):
        return Request(mapping.HotWaterTank, self.__session, query).execute()

    def get_region(self, query: dict):
        return Request(mapping.Region, self.__session, query).execute()

    def get_space_cooling_technology(self, query: dict):
        return Request(mapping.SpaceCoolingTechnology, self.__session, query).execute()

    def get_scenario(self, query: dict):
        return Request(
            mapping.Scenario, self.__session, query, allow_empty_constraint=False
        ).execute()

    def get_optimization_year(self, query: dict):
        return Request(
            mapping.OptimizationYear, self.__session, query, allow_empty_constraint=True
        ).execute()

    def get_reference_year(self, query: dict):
        return Request(
            mapping.ReferenceYear, self.__session, query, allow_empty_constraint=True
        ).execute()
    
    def get_recommendation(self, query: dict):
        id = query.pop("ID_Scenario")
        sems =  _str_to_bool(query.pop("SEMS"))
        scenario = Request(
            mapping.Scenario, self.__session, {"ID_Scenario": id}, allow_empty_constraint=False
        ).execute().first()
        return scenario.get_recommendation(self.__session, sems)

import flexweb.storage.mapping as mapping

class SqlRequest:
    def __init__(self, type, session):
        self.__type = type
        self.__session = session
    
    def match(self, constraints : dict):
        return self.__session.query(self.__type).filter_by(**constraints)

class Component:
    def __init__(self, session):
        self.__session = session
    
    def battery(self):
        return SqlRequest(mapping.Battery, self.__session)

    def boiler(self):
        return SqlRequest(mapping.Boiler, self.__session)

    def building(self):
        return SqlRequest(mapping.Building, self.__session)

    def pv(self):
        return SqlRequest(mapping.PV, self.__session)
    
    def hot_water_tank(self):
        return SqlRequest(mapping.HotWaterTank, self.__session)

    def region(self):
        return SqlRequest(mapping.Region, self.__session)
    
    def space_cooling_technology(self):
        return SqlRequest(mapping.SpaceCoolingTechnology, self.__session)

class Scenario:
    def __init__(self, session):
        self.__session = session

    def match(self, constraints : dict):
        return self.__session.query(mapping.Scenario).filter_by(**constraints)

class Result:
    def __init__(self, session):
        self.__session = session
    
    def optimization_year(self):
        return SqlRequest(mapping.OptimizationYear, self.__session)
    
    def reference_year(self):
        return SqlRequest(mapping.ReferenceYear, self.__session)

class DB:
    def __init__(self, session):
        self.__session = session
    
    def component(self) -> Component:
        return Component(self.__session)

    def scenario(self) -> Scenario:
        return Scenario(self.__session)

    def result(self) -> Result:
        return Result(self.__session)

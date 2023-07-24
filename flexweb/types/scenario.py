from .component import *


class Scenario:
    def __init__(
        self,
        battery: Battery,
        building: Building,
        pv: PV,
        boiler: Boiler,
        region: Region,
        hot_water_tank: HotWaterTank,
        cooling: Cooling,
    ) -> None:
        self.__battery = battery
        self.__building = building
        self.__pv = pv
        self.__boiler = boiler
        self.__region = region
        self.__hot_water_tank = hot_water_tank
        self.__cooling = cooling

    def get_battery(self) -> Battery:
        return self.__battery

    def get_building(self) -> Building:
        return self.__building

    def get_pv(self) -> PV:
        return self.__pv

    def get_boiler(self) -> Boiler:
        return self.__boiler

    def get_region(self) -> Region:
        return self.__region
    
    def get_hot_water_tank(self) -> HotWaterTank:
        return self.__hot_water_tank
    
    def get_cooling(self) -> Cooling:
        return self.__cooling

    def equals(self, other) -> bool:
        if not isinstance(other, Scenario):
            return False
        return (
            self.__battery.equals(other.__battery)
            and self.__building.equals(other.__building)
            and self.__pv.equals(other.__pv)
            and self.__boiler.equals(other.__boiler)
            and self.__region.equals(other.__region)
            and self.__hot_water_tank.equals(other.__hot_water_tank)
            and self.__cooling.equals(other.__cooling)
        )

    def to_dict(self) -> dict:
        return {
            "battery": self.__battery.to_dict(),
            "building": self.__building.to_dict(),
            "pv": self.__pv.to_dict(),
            "boiler": self.__boiler.to_dict(),
            "region": self.__region.to_dict(),
            "hot_water_tank": self.__hot_water_tank.to_dict(),
            "cooling": self.__cooling.to_dict(),
        }

    def get_component_by_name(self, name: str):
        if name == "battery":
            return self.__battery
        elif name == "building":
            return self.__building
        elif name == "pv":
            return self.__pv
        elif name == "boiler":
            return self.__boiler
        elif name == "region":
            return self.__region
        elif name == "hot_water_tank":
            return self.__hot_water_tank
        elif name == "cooling":
            return self.__cooling
        else:
            return None

    def get_components(self) -> dict:
        return {
            "battery": self.__battery,
            "building": self.__building,
            "pv": self.__pv,
            "boiler": self.__boiler,
            "region": self.__region,
            "hot_water_tank": self.__hot_water_tank,
            "cooling": self.__cooling
        }

    @staticmethod
    def from_dict(dict: dict):
        return Scenario(
            battery=Battery.from_dict(dict.get("battery", {})),
            building=Building.from_dict(dict["building"]),
            pv=PV.from_dict(dict.get("pv", {})),
            boiler=Boiler.from_dict(dict["boiler"]),
            region=Region.from_dict(dict["region"]),
            hot_water_tank=HotWaterTank.from_dict(dict.get("hot_water_tank", {})),
            cooling=Cooling.from_dict(dict.get("cooling", {}))
        )

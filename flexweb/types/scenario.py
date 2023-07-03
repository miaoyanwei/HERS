from .component import Battery, Building, PV, Boiler, Region


class Scenario:
    def __init__(
        self,
        battery: Battery,
        building: Building,
        pv: PV,
        boiler: Boiler,
        region: Region,
    ) -> None:
        self.__battery = battery
        self.__building = building
        self.__pv = pv
        self.__boiler = boiler
        self.__region = region

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

    def equals(self, other) -> bool:
        if not isinstance(other, Scenario):
            return False
        return (
            self.__battery.equals(other.__battery)
            and self.__building.equals(other.__building)
            and self.__pv.equals(other.__pv)
            and self.__boiler.equals(other.__boiler)
            and self.__region.equals(other.__region)
        )

    def to_dict(self) -> dict:
        return {
            "battery": self.__battery.to_dict(),
            "building": self.__building.to_dict(),
            "pv": self.__pv.to_dict(),
            "boiler": self.__boiler.to_dict(),
            "region": self.__region.to_dict(),
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
        else:
            return None

    def get_components(self) -> dict:
        return {
            "battery": self.__battery,
            "building": self.__building,
            "pv": self.__pv,
            "boiler": self.__boiler,
            "region": self.__region,
        }

    @staticmethod
    def from_dict(dict: dict):
        return Scenario(
            battery=Battery.from_dict(dict.get("battery", {})),
            building=Building.from_dict(dict["building"]),
            pv=PV.from_dict(dict.get("pv", {})),
            boiler=Boiler.from_dict(dict["boiler"]),
            region=Region.from_dict(dict["region"]),
        )

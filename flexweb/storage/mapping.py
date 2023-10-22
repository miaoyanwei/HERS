from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, Text, Float

Base = declarative_base()

# Serializable Components

class Battery(Base):
    __tablename__ = "OperationScenario_Component_Battery"
    ID_Battery = Column(Integer, primary_key=True)
    capacity = Column(Integer)

    def to_dict(self) -> dict:
        return {"ID_Battery": self.ID_Battery, "capacity": self.capacity}


class Boiler(Base):
    __tablename__ = "OperationScenario_Component_Boiler"
    ID_Boiler = Column(Integer, primary_key=True)
    type = Column(Text)

    def to_dict(self) -> dict:
        return {"ID_Boiler": self.ID_Boiler, "type": self.type}


class Building(Base):
    __tablename__ = "OperationScenario_Component_Building"
    ID_Building = Column(Integer, primary_key=True)
    person_num = Column(Integer)
    construction_period_start = Column(Integer)
    construction_period_end = Column(Integer)

    def to_dict(self) -> dict:
        return {
            "ID_Building": self.ID_Building,
            "person_num": self.person_num,
            "construction_period_start": self.construction_period_start,
            "construction_period_end": self.construction_period_end,
        }


class PV(Base):
    __tablename__ = "OperationScenario_Component_PV"
    ID_PV = Column(Integer, primary_key=True)
    size = Column(Integer)

    def to_dict(self) -> dict:
        return {"ID_PV": self.ID_PV, "size": self.size}


class Region(Base):
    __tablename__ = "OperationScenario_Component_Region"
    ID_Region = Column(Integer, primary_key=True)
    code = Column(Text)

    def to_dict(self) -> dict:
        return {"ID_Region": self.ID_Region, "code": self.code}


class SpaceCoolingTechnology(Base):
    __tablename__ = "OperationScenario_Component_SpaceCoolingTechnology"
    ID_SpaceCoolingTechnology = Column(Integer, primary_key=True)
    power = Column(Integer)

    def to_dict(self) -> dict:
        return {
            "ID_SpaceCoolingTechnology": self.ID_SpaceCoolingTechnology,
            "power": self.power,
        }


class HotWaterTank(Base):
    __tablename__ = "OperationScenario_Component_HotWaterTank"
    ID_HotWaterTank = Column(Integer, primary_key=True)
    size = Column(Integer)

    def to_dict(self) -> dict:
        return {"ID_HotWaterTank": self.ID_HotWaterTank, "size": self.size}


class OptimizationYear(Base):
    __tablename__ = "OperationResult_OptimizationYear"
    ID_Scenario = Column(Integer, primary_key=True)
    TotalCost = Column(Float)

    def to_dict(self) -> dict:
        return {"ID_Scenario": self.ID_Scenario, "TotalCost": self.TotalCost}


class ReferenceYear(Base):
    __tablename__ = "OperationResult_ReferenceYear"
    ID_Scenario = Column(Integer, primary_key=True)
    TotalCost = Column(Float)

    def to_dict(self) -> dict:
        return {"ID_Scenario": self.ID_Scenario, "TotalCost": self.TotalCost}


class Scenario(Base):
    __tablename__ = "OperationScenario"
    ID_Scenario = Column(Integer, primary_key=True)
    ID_Building = Column(Integer)
    ID_PV = Column(Integer)
    ID_Battery = Column(Integer)
    ID_Boiler = Column(Integer)
    ID_Region = Column(Integer)
    ID_HotWaterTank = Column(Integer)
    ID_SpaceCoolingTechnology = Column(Integer)

    def to_dict(self) -> dict:
        return {
            "ID_Scenario": self.ID_Scenario,
            "ID_Building": self.ID_Building,
            "ID_PV": self.ID_PV,
            "ID_Battery": self.ID_Battery,
            "ID_Boiler": self.ID_Boiler,
            "ID_Region": self.ID_Region,
            "ID_HotWaterTank": self.ID_HotWaterTank,
            "ID_SpaceCoolingTechnology": self.ID_SpaceCoolingTechnology,
        }


# Non Serializable Components, only for internal use


class OptimizationMonth(Base):
    __tablename__ = "OperationResult_OptimizationMonth"
    ID_Scenario = Column(Integer, primary_key=True)
    Month = Column(Integer)
    E_Heating_HP_out = Column(Float)
    Q_HeatingElement = Column(Float)
    E_RoomCooling = Column(Float)
    BaseLoadProfile = Column(Float)
    E_DHW_HP_out = Column(Float)
    PhotovoltaicProfile = Column(Float)


class ReferenceMonth(Base):
    __tablename__ = "OperationResult_ReferenceMonth"
    ID_Scenario = Column(Integer, primary_key=True)
    E_Heating_HP_out = Column(Float)
    Q_HeatingElement = Column(Float)
    E_RoomCooling = Column(Float)
    BaseLoadProfile = Column(Float)
    E_DHW_HP_out = Column(Float)
    PhotovoltaicProfile = Column(Float)

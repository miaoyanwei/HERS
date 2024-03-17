from sqlalchemy.orm import (
    declarative_base,
    column_property,
    # relationship,
    # mapped_column,
)
from sqlalchemy import Column, Integer, String, Float, or_, and_, table

Base = declarative_base()


class MixinToDict:
    def to_dict(self) -> dict:
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


# Components


class Battery(Base, MixinToDict):
    __tablename__ = "OperationScenario_Component_Battery"
    ID_Battery = Column(Integer, primary_key=True)
    capacity = Column(Integer)
    cost = column_property(capacity / 1000 * 41)


class Boiler(Base, MixinToDict):
    __boilerCosts = {
        "Air_HP": 900,
        "gases": 400,
        "solids": 400,
        "district_heating": 400,
        "liquids": 400,
    }
    __tablename__ = "OperationScenario_Component_Boiler"
    ID_Boiler = Column(Integer, primary_key=True)
    type = Column(String(64))
    cost = column_property(__boilerCosts.get(type, 0))


class Building(Base, MixinToDict):
    __tablename__ = "OperationScenario_Component_Building"
    ID_Building = Column(Integer, primary_key=True)
    person_num = Column(Integer)
    construction_period_start = Column(Integer)
    construction_period_end = Column(Integer)
    cost = column_property(2000)


class PV(Base, MixinToDict):
    __tablename__ = "OperationScenario_Component_PV"
    ID_PV = Column(Integer, primary_key=True)
    size = Column(Integer)
    cost = column_property(size * 116)


class Region(Base, MixinToDict):
    __tablename__ = "OperationScenario_Component_Region"
    ID_Region = Column(Integer, primary_key=True)
    code = Column(String)


class SpaceCoolingTechnology(Base, MixinToDict):
    __tablename__ = "OperationScenario_Component_SpaceCoolingTechnology"
    ID_SpaceCoolingTechnology = Column(Integer, primary_key=True)
    power = Column(Integer)
    cost = column_property(power * 100)


class HotWaterTank(Base, MixinToDict):
    __tablename__ = "OperationScenario_Component_HotWaterTank"
    ID_HotWaterTank = Column(Integer, primary_key=True)
    size = Column(Integer)
    cost = column_property(size * 41)


class SpaceHeatingTank(Base, MixinToDict):
    __tablename__ = "OperationScenario_Component_SpaceHeatingTank"
    ID_SpaceHeatingTank = Column(Integer, primary_key=True)
    size = Column(Integer)
    cost = column_property(size * 100)


class OptimizationYear(Base):
    __tablename__ = "OperationResult_OptimizationYear"
    ID_Scenario = Column(Integer, primary_key=True)
    TotalCost = Column(Float)
    E_Heating_HP_out = Column(Float)
    Q_HeatingElement = Column(Float)
    E_RoomCooling = Column(Float)
    BaseLoadProfile = Column(Float)
    E_DHW_HP_out = Column(Float)
    PhotovoltaicProfile = Column(Float)
    TotalDemand = column_property(
        E_Heating_HP_out
        + Q_HeatingElement
        + E_RoomCooling
        + BaseLoadProfile
        + E_DHW_HP_out
    )
    TotalGenerate = column_property(PhotovoltaicProfile)
    PV = column_property(PhotovoltaicProfile)
    Boiler = column_property(E_Heating_HP_out + Q_HeatingElement)
    Cooling = column_property(E_RoomCooling)
    Appliance = column_property(BaseLoadProfile)
    HotWaterTank = column_property(E_DHW_HP_out)

    def to_dict(self) -> dict:
        return {
            "ID_Scenario": self.ID_Scenario,
            "TotalCost": int(self.TotalCost/100),
            "TotalDemand": int(self.TotalDemand),
            "TotalGenerate": int(self.PV),
            "PV": int(self.PV),
            "Boiler": int(self.Boiler),
            "Cooling": int(self.Cooling),
            "Appliance": int(self.Appliance),
            "HotWaterTank": int(self.HotWaterTank),
        }


class ReferenceYear(Base):
    __tablename__ = "OperationResult_ReferenceYear"
    ID_Scenario = Column(Integer, primary_key=True)
    TotalCost = Column(Float)
    E_Heating_HP_out = Column(Float)
    Q_HeatingElement = Column(Float)
    E_RoomCooling = Column(Float)
    BaseLoadProfile = Column(Float)
    E_DHW_HP_out = Column(Float)
    PhotovoltaicProfile = Column(Float)
    TotalDemand = column_property(
        E_Heating_HP_out
        + Q_HeatingElement
        + E_RoomCooling
        + BaseLoadProfile
        + E_DHW_HP_out
    )
    TotalGenerate = column_property(PhotovoltaicProfile)
    PV = column_property(PhotovoltaicProfile)
    Boiler = column_property(E_Heating_HP_out + Q_HeatingElement)
    Cooling = column_property(E_RoomCooling)
    Appliance = column_property(BaseLoadProfile)
    HotWaterTank = column_property(E_DHW_HP_out)

    def to_dict(self) -> dict:
        return {
            "ID_Scenario": self.ID_Scenario,
            "TotalCost": int(self.TotalCost/100),
            "TotalDemand": int(self.TotalDemand),
            "TotalGenerate": int(self.PV),
            "PV": int(self.PV),
            "Boiler": int(self.Boiler),
            "Cooling": int(self.Cooling),
            "Appliance": int(self.Appliance),
            "HotWaterTank": int(self.HotWaterTank),
        }


class Scenario(Base, MixinToDict):
    __tablename__ = "OperationScenario"
    ID_Scenario = Column(Integer, primary_key=True)
    ID_Building = Column(Integer)
    ID_PV = Column(Integer)
    ID_Battery = Column(Integer)
    ID_Boiler = Column(Integer)
    ID_Region = Column(Integer)
    ID_HotWaterTank = Column(Integer)
    ID_SpaceHeatingTank = Column(Integer)
    ID_SpaceCoolingTechnology = Column(Integer)
    ID_Behavior = Column(Integer)
    ID_EnergyPrice = Column(Integer)
    ID_Vehicle = Column(Integer)
    ID_HeatingElement = Column(Integer)

    @staticmethod
    def get_upgrades(session, scenario_id: int):
        scenario: Scenario = (
            session.query(Scenario).filter_by(ID_Scenario=scenario_id).first()
        )
        query = session.query(Scenario)

        if (scenario.ID_Building % 2) == 0:  # The building is not renovated
            query = query.filter(
                or_(
                    Scenario.ID_Building == scenario.ID_Building,
                    Scenario.ID_Building == scenario.ID_Building - 1,
                )
            )
        else:  # The building is already renovated
            query = query.filter(Scenario.ID_Building == scenario.ID_Building)
        query = query.filter(
            or_(Scenario.ID_Boiler == 1, Scenario.ID_Boiler == scenario.ID_Boiler)
        )

        # All other possible improvements
        query = query.filter(
            and_(
                Scenario.ID_PV <= scenario.ID_PV,
                Scenario.ID_Battery <= scenario.ID_Battery,
            )
        )

        # All fixed values
        query = query.filter(
            and_(
                Scenario.ID_Region == scenario.ID_Region,
                Scenario.ID_SpaceCoolingTechnology
                == scenario.ID_SpaceCoolingTechnology,
                Scenario.ID_Behavior == scenario.ID_Behavior,
                Scenario.ID_EnergyPrice == scenario.ID_EnergyPrice,
                Scenario.ID_Vehicle == scenario.ID_Vehicle,
                Scenario.ID_HeatingElement == scenario.ID_HeatingElement,
                Scenario.ID_HotWaterTank == scenario.ID_HotWaterTank,
                Scenario.ID_SpaceHeatingTank == scenario.ID_SpaceHeatingTank,
            )
        )
        return query.all()

    def get_upgrade_cost(self, session, upgraded, sems: bool):
        cost = 0
        if self.ID_Building != upgraded.ID_Building:
            cost += (
                session.query(Building)
                .filter(Building.ID_Building == upgraded.ID_Building)
                .first()
                .cost
            )
        if self.ID_Boiler != upgraded.ID_Boiler:
            cost += (
                session.query(Boiler)
                .filter(Boiler.ID_Boiler == upgraded.ID_Boiler)
                .first()
                .cost
            )
        if self.ID_Battery != upgraded.ID_Battery:
            cost += (
                session.query(Battery)
                .filter(Battery.ID_Battery == upgraded.ID_Battery)
                .first()
                .cost
            )
        if self.ID_PV != upgraded.ID_PV:
            cost += session.query(PV).filter(PV.ID_PV == upgraded.ID_PV).first().cost
        if self.ID_HotWaterTank != upgraded.ID_HotWaterTank:
            cost += (
                session.query(HotWaterTank)
                .filter(HotWaterTank.ID_HotWaterTank == upgraded.ID_HotWaterTank)
                .first()
                .cost
            )
        if self.ID_SpaceHeatingTank != upgraded.ID_SpaceHeatingTank:
            cost += (
                session.query(SpaceHeatingTank)
                .filter(
                    SpaceHeatingTank.ID_SpaceHeatingTank == upgraded.ID_SpaceHeatingTank
                )
                .first()
                .cost
            )
        if sems:
            cost += 96
        return int(cost)

    def get_total_cost(self, session, sems):
        year_type = OptimizationYear if sems else ReferenceYear
        return int(
            session.query(year_type)
            .filter(year_type.ID_Scenario == self.ID_Scenario)
            .first()
            .TotalCost
        )

    def get_savings(self, session, sems, upgraded, upgraded_sems):
        self_year_type = OptimizationYear if sems else ReferenceYear
        upgraded_year_type = OptimizationYear if upgraded_sems else ReferenceYear

        return self.get_total_cost(session, self_year_type) - upgraded.get_total_cost(
            session, upgraded_year_type
        )

    def get_recommendation(self, session, sems: bool):
        recommendations = {}

        improvements = []
        candidates = Scenario.get_upgrades(session, self.ID_Scenario)
        for candidate in candidates:
            saving = int(self.get_savings(session, sems, candidate, sems)/100)
            upgrade_cost = self.get_upgrade_cost(session, candidate, False)
            improvements.append(
                {
                    "ID_Scenario": candidate.ID_Scenario,
                    "TotalCost": int(candidate.get_total_cost(session, False)/100),
                    "UpgradeCost": upgrade_cost,
                    "Savings": saving,
                    "Benefit": saving - upgrade_cost,
                    "SEMS": sems,
                }
            )

            if sems == False:
                saving = int(self.get_savings(session, False, candidate, True)/100)
                upgrade_cost = self.get_upgrade_cost(session, candidate, True)
                improvements.append(
                    {
                        "ID_Scenario": candidate.ID_Scenario,
                        "TotalCost": int(candidate.get_total_cost(session, True)/100),
                        "UpgradeCost": upgrade_cost,
                        "Savings": saving,
                        "Benefit": saving - upgrade_cost,
                        "SEMS": True,
                    }
                )

        # Remove impromments with no benefit
        improvements = list(filter(lambda x: x["Savings"] > 0, improvements))

        # Get best Cost Benefit
        if len(improvements) == 0:
            return recommendations
        cost_benefit = max(improvements, key=lambda x: x["Benefit"])
        recommendations["CostBenefit"] = cost_benefit

        # Get lowest energy bill
        lowest_energy_bill = max(improvements, key=lambda x: x["Savings"])
        if lowest_energy_bill not in recommendations.values():
            recommendations["LowestEnergyBill"] = lowest_energy_bill

        # Get lowest investment
        lowest_investment = min(improvements, key=lambda x: x["UpgradeCost"])
        if lowest_investment not in recommendations.values():
            recommendations["LowestInvestment"] = lowest_investment

        return recommendations


class OptimizationMonth(Base):
    __tablename__ = "OperationResult_OptimizationMonth"
    ID_Scenario = Column(Integer)
    Month = Column(Integer, primary_key=True)
    E_Heating_HP_out = Column(Float)
    Q_HeatingElement = Column(Float)
    E_RoomCooling = Column(Float)
    BaseLoadProfile = Column(Float)
    E_DHW_HP_out = Column(Float)
    PhotovoltaicProfile = Column(Float)
    TotalDemand = column_property(
        E_Heating_HP_out
        + Q_HeatingElement
        + E_RoomCooling
        + BaseLoadProfile
        + E_DHW_HP_out
    )
    TotalGenerate = column_property(PhotovoltaicProfile)
    PV = column_property(PhotovoltaicProfile)
    Boiler = column_property(E_Heating_HP_out + Q_HeatingElement)
    Cooling = column_property(E_RoomCooling)
    Appliance = column_property(BaseLoadProfile)
    HotWaterTank = column_property(E_DHW_HP_out)

    def to_dict(self) -> dict:
        return {
            "ID_Scenario": self.ID_Scenario,
            "Month": self.Month,
            "TotalDemand": int(self.TotalDemand),
            "TotalGenerate": int(self.PV),
            "PV": int(self.PV),
            "Boiler": int(self.Boiler),
            "Cooling": int(self.Cooling),
            "Appliance": int(self.Appliance),
            "HotWaterTank": int(self.HotWaterTank),
        }


class ReferenceMonth(Base):
    __tablename__ = "OperationResult_ReferenceMonth"
    ID_Scenario = Column(Integer)
    Month = Column(Integer, primary_key=True)
    E_Heating_HP_out = Column(Float)
    Q_HeatingElement = Column(Float)
    E_RoomCooling = Column(Float)
    BaseLoadProfile = Column(Float)
    E_DHW_HP_out = Column(Float)
    PhotovoltaicProfile = Column(Float)
    TotalDemand = column_property(
        E_Heating_HP_out
        + Q_HeatingElement
        + E_RoomCooling
        + BaseLoadProfile
        + E_DHW_HP_out
    )
    TotalGenerate = column_property(PhotovoltaicProfile)
    PV = column_property(PhotovoltaicProfile)
    Boiler = column_property(E_Heating_HP_out + Q_HeatingElement)
    Cooling = column_property(E_RoomCooling)
    Appliance = column_property(BaseLoadProfile)
    HotWaterTank = column_property(E_DHW_HP_out)

    def to_dict(self) -> dict:
        return {
            "ID_Scenario": self.ID_Scenario,
            "Month": self.Month,
            "TotalDemand": int(self.TotalDemand),
            "TotalGenerate": int(self.PV),
            "PV": int(self.PV),
            "Boiler": int(self.Boiler),
            "Cooling": int(self.Cooling),
            "Appliance": int(self.Appliance),
            "HotWaterTank": int(self.HotWaterTank),
        }

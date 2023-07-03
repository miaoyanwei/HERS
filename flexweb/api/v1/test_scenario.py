import unittest
from flexweb.api.v1.scenario import Scenario as ScenarioEndpoint
from flexweb.types.component import *
from flexweb.types.scenario import Scenario
from flexweb.repository.base.repository import Repository as BaseRepository
from flexweb.repository.base.scenario_repository import (
    ScenarioRepository as BaseScenarioRepository,
)
from typing import Optional


class TestScenario(unittest.TestCase):
    """Tests for `flexweb/api/v1/config.py`."""

    def setUp(self):
        self.__repository = MockRepository()
        pass

    def tearDown(self):
        pass

    def test_scenario_get(self):
        scenario = ScenarioEndpoint(self.__repository)
        dict = scenario.get({"scenario_id": 0})
        self.assertEqual(dict["pv"]["size"], 10)
        self.assertEqual(dict["battery"]["capacity"], 20000)
        self.assertEqual(dict["boiler"]["type"], "gases")
        self.assertEqual(dict["building"]["renovated"], True)
        self.assertEqual(dict["building"]["construction_period_start"], 1995)
        self.assertEqual(dict["building"]["construction_period_end"], 2022)
        self.assertEqual(dict["building"]["person_num"], 1)
        self.assertEqual(dict["region"]["code"], "DE")

    def test_scenario_post(self):
        scenario = ScenarioEndpoint(self.__repository)
        dict = {
            "pv": {
                "size": 10,
            },
            "battery": {
                "capacity": 20000,
            },
            "boiler": {
                "type": "gases",
            },
            "building": {
                "renovated": True,
                "construction_period_start": 1995,
                "construction_period_end": 2022,
                "person_num": 1,
            },
            "region": {
                "code": "DE",
            },
        }
        id = scenario.post(dict)
        self.assertEqual(id, {"scenario_id": 0})


class MockRepository(BaseRepository):
    def __init__(self) -> None:
        self.__scenario_repository = MockScenarioRepository()

    def get_scenario_repository(self) -> BaseScenarioRepository:
        return self.__scenario_repository


class MockScenarioRepository(BaseScenarioRepository):
    def __init__(self) -> None:
        self.__list = [
            Scenario(
                pv=PV(size=10),
                battery=Battery(capacity=20000),
                boiler=Boiler(type=BoilerType.GASES),
                building=Building(
                    renovated=True,
                    construction_period=(1995, 2022),
                    person_num=1,
                ),
                region=Region(code="DE"),
            ),
            Scenario(
                pv=PV(size=10),
                battery=Battery(capacity=10000),
                boiler=Boiler(type=BoilerType.GASES),
                building=Building(
                    renovated=False,
                    construction_period=(1995, 2022),
                    person_num=1,
                ),
                region=Region(code="DE"),
            ),
            Scenario(
                pv=PV(size=5),
                battery=Battery(capacity=0),
                boiler=Boiler(type=BoilerType.GASES),
                building=Building(
                    renovated=False,
                    construction_period=(1979, 1994),
                    person_num=5,
                ),
                region=Region(code="DE"),
            ),
        ]

    def get_scenario_by_id(self, id: int) -> Optional[Scenario]:
        if id < 0 or id >= len(self.__list):
            return None
        return self.__list[id]

    def get_id_by_scenario(self, scenario: Scenario) -> Optional[int]:
        for i in range(len(self.__list)):
            if self.__list[i].equals(scenario):
                return i
        return None


if __name__ == "__main__":
    unittest.main()

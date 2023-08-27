from flexweb.types.scenario import Scenario


class InvestmentCost:
    def __init__(self, current_scenario: Scenario, new_scenario: Scenario, sems: bool):
        self.__current_scenario = current_scenario
        self.__new_scenario = new_scenario
        self.__sems = sems

    def to_int(self) -> int:
        investment_cost = 0
        for key, value in self.__new_scenario.get_components().items():
            comp = self.__current_scenario.get_components()[key]
            if not value.equals(comp):
                investment_cost += value.get_cost()
        if self.__sems:
            investment_cost += 96
        return investment_cost

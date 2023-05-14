from django.http import HttpResponse
from django.views import View

import pandas as pd
import json
import sys
sys.path.insert(0, 'external/FLEX')

from external.FLEX.config import cfg
from external.FLEX.flex_operation.run import run_operation_model
from external.FLEX.flex.db import create_db_conn

def map_json(data):
    new_json = json.loads('{}')
    # Iterate through the key-value pairs
    for key, value in data.items():
        fields = key.split("_")
        category = fields[0]
        variable = fields[1]
        if (variable == "exist"):
            if (value == True) and new_json.get(category) is None:
                new_json[category] = json.loads('{}')
        else:
            if new_json.get(category) is None:
                new_json[category] = json.loads('{}')
            if (category == "region") and (variable != "country"):
                variable = fields[-1]
                new_json[category][variable] = value
            elif (variable == "construction"):
                years = value.split("-")
                new_json[category]["range_begin"] = years[0]
                new_json[category]["range_end"] = years[1]
            else:
                new_json[category][variable] = value
    return new_json


class FlexView(View):
    db = create_db_conn(cfg)

    def post(self, request):
        print("body: " + request.body.decode('utf-8'))
            # Miao: JSON data structure from frontend
        data = json.loads(request.body.decode('utf-8'))
        new_json = map_json(data)
        print(new_json)
        scenario_id = self.get_scenario_id(new_json)

        print("scenario_id: {}".format(scenario_id))
        request.session['scenario_id'] = scenario_id.item()
        return HttpResponse(status=200)

    def get(self, request):
        df = self.db.read_dataframe(
            "OperationResult_OptimizationYear",
            filter={"ID_Scenario": request.session['scenario_id']},
        )
        out_json = json.loads('{}')
        out_json["total_cost"] = round(df["TotalCost"].values[0]/100)
        return HttpResponse(json.dumps(out_json), content_type="application/json", status=200)

    def get_scenario_id(self, json):
        # Battey ID
        battery_capacity = 0
        if json.get("battery") is not None:
            battery_capacity = json["battery"]["capacity"] * 1000
        battery = self.db.read_dataframe(
            "OperationScenario_Component_Battery",
            filter={"capacity": battery_capacity},
        )
        battery_id =  battery["ID_Battery"].values[0] if battery.shape[0] > 0 else 1

        # Building ID
        building = pd.read_sql('select * from OperationScenario_Component_Building where construction_period_start>='
                    + json["building"]["range_begin"] + ' and construction_period_start<=' + json["building"]["range_end"] , con=self.db.connection)
        building_id = building["ID_Building"].values[0] if building.shape[0] > 0 else 1

        # PV ID
        pv_size = 0
        if json.get("pv") is not None:
            pv_size = json["pv"]["size"]
        pv = self.db.read_dataframe(
            "OperationScenario_Component_PV",
            filter={"size": pv_size},
        )
        pv_id = pv["ID_PV"].values[0] if pv.shape[0] > 0 else 1

        # Scenario ID
        scenario = self.db.read_dataframe(
            "OperationScenario",
            filter={
                "ID_Battery": battery_id,
                "ID_Building": building_id,
                "ID_PV": pv_id,
            }
        )
        return scenario["ID_Scenario"].values[0]

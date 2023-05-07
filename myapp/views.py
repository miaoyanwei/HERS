from django.http import HttpResponse

import json
import sys
sys.path.insert(0, 'external/FLEX')

from external.FLEX.config import cfg
from external.FLEX.flex_operation.run import run_operation_model
from external.FLEX.flex.db import create_db_conn

# Miao: Post method
def flex(request):
    if (request.method == 'POST'):
        print("body: " + request.body.decode('utf-8'))
            # Miao: JSON data structure from frontend
        data = json.loads(request.body.decode('utf-8'))
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
                    new_json[category]["construction_period_start"] = years[0]
                    new_json[category]["construction_period_end"] = years[1]
                else:
                    new_json[category][variable] = value

        print(new_json)
            #operation_scenario_ids = [id_scenario for id_scenario in range(1, 2)]
            #run_operation_model(operation_scenario_ids, cfg)
        id = 1
        request.session['scenario_id'] = id
        return HttpResponse(status=200)
    elif (request.method == 'GET'):
        db = create_db_conn(cfg)
        df = db.read_dataframe(
            "OperationResult_OptimizationYear",
            filter={"ID_Scenario": request.session['scenario_id']},
        )
        out_json = json.loads('{}')
        out_json["total_cost"] = round(df["TotalCost"].values[0]/100)
        return HttpResponse(json.dumps(out_json), content_type="application/json", status=200)

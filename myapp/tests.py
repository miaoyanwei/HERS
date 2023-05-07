from django.test import TestCase
import json


# Miao: Communicate with frontend (HTTP)
from django.http import HttpResponse


# test data
json_data = '{"pv_size":5,"battery_capacity":7,"region_country":"Deutschland","region_de_nut1":"Niedersachsen","region_de_niedersachsen_nut2":"Hannover","region_de_niedersachsen_hannover_nut3":"Nienburg (Weser)","building_construction":"2020-2023","building_renovate":true,"building_renovate_options":["Basement","Roof","Window","Wall"],"behavior_adult":2,"behavior_children":2,"behavior_wfh1":"0","behavior_wfh2":"5","SpaceCoolingTechnology_exist":false,"boiler_type":"District heating","pv_exist":true,"battery_exist":true,"sems_exist":false}'

# Miao: Load the JSON data into a Python dictionary
data = json.loads(json_data)
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
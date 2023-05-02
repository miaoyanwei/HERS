from django.shortcuts import render
import json


# Miao: Communicate with frontend (HTTP)
from django.http import HttpResponse
import datetime


# Miao: Post method
def flex(request):
    if (request.method != 'POST'):
        return HttpResponse("", status=405) #only POST methods are sent
    print("body: " + request.body.decode('utf-8'))
    return HttpResponse()


# Miao: JSON data structure from frontend
json_data = '{"cat_region_country":"Deutschland", "cat_region_state":"Hessen"}' #test

# Miao: Load the JSON data into a Python dictionary
data = json.loads(json_data)
new_json = json.loads('{}')

# Miao: Iterate through the key-value pairs
for key, value in data.items():
    category = key.split("_")[1]
    field = key.split("_")[2]
    if new_json.get(category) is None:
        new_json[category] = json.loads('{}')
    new_json[category][field] = value
        
print(new_json)
import os

from flask import Flask, session, request, g, send_from_directory
import json
import pandas as pd
import sqlite3
from copy import copy
from flexweb.result import Result

DATABASE = "FLEX.sqlite"


def get_db():
    db = getattr(g, "db", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


def close_db(exception):
    db = getattr(g, "db", None)
    if db is not None:
        db.close()


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY="dev",
        DATABASE=os.path.join(app.instance_path, "flaskr.sqlite"),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile("config.py", silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.teardown_appcontext
    def teardown_db(exception):
        close_db(exception)

    @app.route("/", methods=["GET"])
    def index():
        return send_from_directory("../static", "index.html")

    @app.route("/<path:path>", methods=["GET"])
    def html(path):
        return send_from_directory("../static", path)

    @app.route("/api/v1/my_scenario", methods=["POST"])
    def my_scenario():
        print("body: " + request.json.__str__())
        new_json = map_json(request.json)
        print(new_json)
        scenario_id = get_scenario_id(new_json)
        sems = get_sems(new_json)

        print("scenario_id: {}".format(scenario_id))
        session["scenario_id"] = scenario_id.item()
        session["sems"] = sems
        return "OK"

    @app.route("/api/v1/result", methods=["GET"])
    def result():
        doc = Result(get_db(), session["scenario_id"], session["sems"]).get_data()
        print(doc)
        return json.dumps(doc)

    @app.route("/hello")
    def hello():
        return "Hello, World!"

    return app


def map_json(data):
    new_json = json.loads("{}")
    # Iterate through the key-value pairs
    for key, value in data.items():
        fields = key.split("_")
        category = fields[0]
        variable = fields[1]
        if variable == "exist":
            if (value == True) and new_json.get(category) is None:
                new_json[category] = json.loads("{}")
        else:
            if new_json.get(category) is None:
                new_json[category] = json.loads("{}")
            if (category == "region") and (variable != "country"):
                variable = fields[-1]
                new_json[category][variable] = value
            elif variable == "construction":
                years = value.split("-")
                new_json[category]["range_begin"] = years[0]
                new_json[category]["range_end"] = years[1]
            else:
                new_json[category][variable] = value
    return new_json


def get_scenario_id(json):
    db = get_db()

    # Battey ID
    battery_capacity = 0
    if json.get("battery") is not None:
        battery_capacity = int(json["battery"]["capacity"]) * 1000
    battery = pd.read_sql(
        "select * from OperationScenario_Component_Battery where capacity="
        + str(battery_capacity),
        con=db,
    )
    battery_id = battery["ID_Battery"].values[0]

    # Building ID
    range_begin = 1880
    range_end = 1949
    person_no = 5
    if json.get("building") is not None:
        range_begin = json["building"]["range_begin"]
        range_end = json["building"]["range_end"]
    if json.get("person") is not None:
        person_no = json["person"]["no"]

    building = pd.read_sql(
        "select * from OperationScenario_Component_Building where construction_period_start>="
        + json["building"]["range_begin"]
        + " and construction_period_end<="
        + json["building"]["range_end"]
        + " and person_num="
        + json["person"]["no"]
        + " order by ID_Building",
        con=db,
    )
    building_id = building["ID_Building"].values[
        int(json["building"]["renovate"] == False)
    ]

    # PV ID
    pv_size = 0
    if json.get("pv") is not None:
        pv_size = json["pv"]["size"]
    pv = pd.read_sql(
        "select * from OperationScenario_Component_PV where size=" + str(pv_size),
        con=db,
    )
    pv_id = pv["ID_PV"].values[0]

    # Boiler ID
    boiler_type = "liquids"
    if json.get("boiler_type") is not None:
        boiler_type = json["boiler_type"]
    boiler_id = pd.read_sql(
        "select * from OperationScenario_Component_Boiler where type='"
        + boiler_type
        + "'",
        con=db,
    )["ID_Boiler"].values[0]
    print("Boiler ID: {}".format(boiler_id))

    # Hot water tank ID
    tank_size = 0
    if json.get("tank") is not None:
        tank_size = 450
    tank_id = pd.read_sql(
        "select * from OperationScenario_Component_HotWaterTank where size="
        + str(tank_size),
        con=db,
    )["ID_HotWaterTank"].values[0]

    # Scenario ID
    scenario_id = pd.read_sql(
        "select * from OperationScenario where ID_Battery="
        + str(battery_id)
        + " and ID_Building="
        + str(building_id)
        + " and ID_PV="
        + str(pv_id)
        + " and ID_Boiler="
        + str(boiler_id)
        + " and ID_HotWaterTank="
        + str(tank_id),
        con=db,
    )["ID_Scenario"].values[0]
    return scenario_id


def get_sems(json) -> bool:
    # Sems ID
    db = get_db()
    return json.get("sems") is not None

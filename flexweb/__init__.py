import os

from flask import Flask, session, request, g, send_from_directory
import json
import pandas as pd
import sqlite3
from copy import copy
from flexweb.repository.pandas_sql.repository import Repository
from flexweb.api.controller import Controller as ApiController

DATABASE = "FLEX.sqlite"


def get_api():
    api = getattr(g, "api", None)
    if api is None:
        api = ApiController(Repository(sqlite3.connect(DATABASE)))
    return api


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

    @app.route("/", methods=["GET"])
    def index():
        return send_from_directory("../static", "index.html")

    @app.route("/<path:path>", methods=["GET"])
    def html(path):
        return send_from_directory("../static", path)

    @app.route("/api/<version>/<endpoint>", methods=["GET", "POST"])
    def api(version, endpoint):
        print("Method is", request.method)
        doc = get_api().version(version).endpoint(endpoint)(request.method, get_request_payload(request))
        print(doc)
        return doc

    return app

def get_request_payload(request) -> dict:
    if request.method == "GET":
        return {k: v for k, v in request.args.items()}
    elif request.method == "POST":
        return request.json
    else:
        return {}

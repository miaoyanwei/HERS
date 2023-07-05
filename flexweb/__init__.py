import os
import logging
import json
import pandas as pd
import sqlite3

from flask import Flask, request, g, send_from_directory
from logging.handlers import RotatingFileHandler
from flexweb.repository.pandas_sql.repository import Repository
from flexweb.api.controller import Controller as ApiController

DATABASE = "FLEX.sqlite"


def get_api():
    api = getattr(g, "api", None)
    if api is None:
        api = ApiController(Repository(sqlite3.connect(DATABASE)))
    return api


def create_app():
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY="dev",
        DATABASE=os.path.join(app.instance_path, "flaskr.sqlite"),
    )
    app.logger.addHandler(
        RotatingFileHandler(
            filename="flexweb.log",
            encoding="utf-8",
            maxBytes=4 * 1000 * 1000,
            backupCount=2,
        )
    )
    app.logger.setLevel(logging.DEBUG)
    app.logger.info("Flexweb started")

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
        app.logger.debug(f"API request: {version}/{endpoint}")
        app.logger.debug(f"Method: {request.method}")
        app.logger.debug(f"Payload: {get_request_payload(request)}")
        app.logger.debug(f"--------------------------")

        doc = (
            get_api()
            .version(version)
            .endpoint(endpoint)(request.method, get_request_payload(request))
        )

        app.logger.debug(f"Response: {doc}")
        return json.dumps(doc)

    return app


def get_request_payload(request) -> dict:
    if request.method == "GET":
        return {k: v for k, v in request.args.items()}
    elif request.method == "POST":
        return request.json
    else:
        return {}

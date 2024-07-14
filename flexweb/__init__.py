import os
import logging
import json

from flask import Flask, request, g, send_from_directory
from logging.handlers import RotatingFileHandler
from flexweb.api.controller import Controller as ApiController
from flexweb.storage.manager import Manager as StorageManager
DATABASE = "db/"


def get_api():
    api = getattr(g, "api", None)
    if api is None:
        api = ApiController(StorageManager(DATABASE))
    return api


def create_app():
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY="dev",
        DATABASE=os.path.join(app.instance_path, "flaskr.sqlite"),
    )
    #app.logger.addHandler(
    #    RotatingFileHandler(
    #        filename="flexweb.log",
    #        encoding="utf-8",
    #        maxBytes=4 * 1000 * 1000,
    #        backupCount=2,
    #    )
    #)
    app.logger.addHandler(logging.StreamHandler())
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

    @app.route("/api/<version>/<path:endpoint>", methods=["GET"])
    def api(version, endpoint):
        app.logger.debug(f"API request: {version}/{endpoint}")
        app.logger.debug(f"Payload: {get_request_payload(request)}")
        app.logger.debug(f"--------------------------")

        handler = get_api().version(version).endpoint(endpoint)
        if handler is None:
            return json.dumps({"Not found": 404})
        result = handler(get_request_payload(request))
        if result is None:
            return json.dumps({"Not found": 404})
        doc = (result)
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

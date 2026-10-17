from flask import Blueprint, render_template
import json
from data.home import global_data
from flask import jsonify
import math
import numpy as np

bp = Blueprint("pages", __name__, url_prefix="/")

#@bp.before_request
#def before_request():
    #set_global_vars()


def clean_json(value):
    if isinstance(value, dict):
        return {k: clean_json(v) for k, v in value.items()}

    if isinstance(value, (list, tuple)):
        return [clean_json(v) for v in value]

    if isinstance(value, (float, np.floating)):
        return float(value) if math.isfinite(value) else None

    if isinstance(value, np.integer):
        return int(value)

    return value

@bp.route('/chart_data')
def chart_data():
    return jsonify(global_data['chart_data'])


@bp.route("/")
def home():
    return render_template("pages/home.html", global_data=global_data, zip=zip, segment='/')

@bp.route("/customers")
def customers():
    return render_template("pages/Customers.html", global_data=global_data, zip=zip, segment='/')

@bp.route("/tables/customers")
def tab_customers():
    return render_template("pages/tables_customers.html", global_data=global_data, zip=zip, enumerate=enumerate, segment='tables')

@bp.route("/tables")
def tables():
    return render_template("pages/tables.html", global_data=global_data, zip=zip, segment='tables')

@bp.route("/analysis")
def analysis():
    return render_template("pages/analysis.html", global_data = global_data, segment='analysis')

@bp.route('/notifications')
def notifications():
    return render_template("pages/notifications.html", global_data=global_data, segment='notifications')
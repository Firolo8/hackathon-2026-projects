from flask import Flask, jsonify, request
from flask_cors import CORS
from drug_check import check_interactions
from fhir_utils import load_patient

app = Flask(__name__)
CORS(app)


@app.route("/api/patient/<patient_id>")
def get_patient(patient_id):
    try:
        return jsonify(load_patient(patient_id))
    except FileNotFoundError:
        return jsonify({"error": "patient data file not found"}), 404
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/api/brief", methods=["POST"])
def get_brief():
    return jsonify({"message": "brief endpoint ready"})


@app.route("/api/drugs/interactions")
def get_interactions():
    meds = [med.strip() for med in request.args.get("meds", "").split(",") if med.strip()]
    if not meds:
        return jsonify({"error": "Provide medications with ?meds=med1,med2"}), 400
    return jsonify(check_interactions(meds))


@app.route("/api/ner", methods=["POST"])
def get_entities():
    return jsonify({"message": "NER endpoint ready"})


@app.route("/api/qr/<patient_id>")
def get_qr(patient_id):
    return jsonify({"message": "QR endpoint ready"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)

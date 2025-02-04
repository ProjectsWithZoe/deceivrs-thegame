from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Facebook API details
URL = "https://graph.facebook.com/v21.0/592123890649380/messages"
ACCESS_TOKEN = "EAATNZAuyMaGoBO4L2efDmMkXakGqhXVSIkro5PLgK3wLHJ2iMlZCwlZAu9kdZA3BYhE4xyRohlfoWrIrzgrRWoZAbkq2ZBQ0rPviIt3i68CvBCNAUN61bIy7YvtT2eSpcdKvgmwRptry64NWNoD5BF4mgWlWIDLGZA794WVpUZBNNtxFSKzLdchQRmv9HsvTcswl1AkuWOKIO0lZADNUuZAsoWZCxwXWAZDZD"

HEADERS = {
    "Authorization": f"Bearer {ACCESS_TOKEN}",
    "Content-Type": "application/json"
}


@app.route('/send-message', methods=['POST'])
def send_message():
    try:
        data = request.json
        phone_number = data.get("phone_number")
        message_template = data.get("template_name", "hello_world")
        language_code = data.get("language_code", "en_US")

        if not phone_number:
            return jsonify({"error": "Phone number is required"}), 400

        payload = {
            "messaging_product": "whatsapp",
            "to": phone_number,
            "type": "template",
            "template": {
                "name": message_template,
                "language": {
                    "code": language_code
                }
            }
        }

        response = requests.post(URL, headers=HEADERS, json=payload)

        if response.status_code == 200:
            return jsonify({"status": "Message sent successfully!", "response": response.json()})
        else:
            return jsonify({"error": "Failed to send message", "details": response.json()}), response.status_code

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5000, debug=True)

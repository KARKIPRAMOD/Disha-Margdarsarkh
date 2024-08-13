from flask import Flask, request, jsonify
import json

app = Flask(__name__)

data_file = 'location_data.json'

@app.route('/')
def index():
    return 'Location Server is running!'

@app.route('/location', methods=['POST'])
def save_location():
    # Check if the request contains JSON data
    if request.is_json:
        location_data = request.get_json()

        # Ensure that both latitude and longitude are provided
        if 'latitude' in location_data and 'longitude' in location_data:
            with open(data_file, 'w') as file:
                json.dump(location_data, file)

            return jsonify({'status': 'success', 'latitude': location_data['latitude'], 'longitude': location_data['longitude']})
        else:
            return jsonify({'status': 'error', 'message': 'Latitude and longitude are required'}), 400
    else:
        return jsonify({'status': 'error', 'message': 'Request must be JSON'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

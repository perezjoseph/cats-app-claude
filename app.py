from flask import Flask, render_template, jsonify
import requests
import os
import time
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# This would normally use Instagram's API, but since direct Instagram API access
# requires approval and user authentication, we'll use a cat API instead
CAT_API_URL = "https://api.thecatapi.com/v1/images/search"
CAT_API_KEY = os.getenv("CAT_API_KEY", "")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/cats', methods=['GET'])
def get_cats():
    # Get cat images
    headers = {}
    if CAT_API_KEY:
        headers["x-api-key"] = CAT_API_KEY
    
    try:
        # Add a random parameter to prevent CloudFront caching
        timestamp = int(time.time())
        response = requests.get(f"{CAT_API_URL}?limit=9&timestamp={timestamp}", headers=headers)
        if response.status_code == 200:
            resp = jsonify(response.json())
            # Set cache control headers to prevent caching
            resp.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
            resp.headers['Pragma'] = 'no-cache'
            resp.headers['Expires'] = '0'
            return resp
        else:
            return jsonify({"error": "Failed to fetch cat images"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
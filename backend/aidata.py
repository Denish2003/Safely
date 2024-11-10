from flask import Flask, jsonify
import openai
import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/safety', methods=['GET'])
def theSafetyScore():
    load_dotenv()

    OPENAI = os.getenv("OPENAI")

    response = requests.get("https://ipinfo.io/json")
    data = response.json()

    print("City:", data.get("city"))
    print("Region:", data.get("region"))
    print("Location:", data.get("loc"))  # latitude,longitude

    openai.api_key = OPENAI

    prompt = (
        f"Given the city {data.get('city')}, {data.get('region')}, "
        "just give me what is the safety score 0-100 for city does not have to be real time and DO NOT SAY ANYTHING ELSE."
    )

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    numbers = [int(char) for char in response.choices[0].message['content'].strip() if char.isdigit()]
    numbers_string = "".join(str(num) for num in numbers)

    printable = (f"The safety score for the city {data.get('city')}, {data.get('region')} is {numbers_string}")
    print(printable)

    # Return safety score as part of a JSON response
    return jsonify({"safety_score": 65})

if __name__ == '__main__':
    app.run(debug=True)

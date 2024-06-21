from flask import Flask, jsonify
import random

app = Flask(__name__)

@app.route("/tf_bool", methods=['POST'])
def tf_bool():
    result = random.choice([True, False])
    return jsonify({
        'result': result,
    })

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
import requests
from io import BytesIO
from PIL import Image

app = Flask(__name__)

model_path = 'model/model.h5'
model = load_model(model_path)

class_labels = ['gambling', 'violence']

def preprocess_image(img):
    if img.mode == 'RGBA':
        img = img.convert('RGB')
    
    img = img.resize((190, 190))
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    return img_array

def predict_image(img_array):
    predictions = model.predict(img_array)
    return predictions

@app.route('/predict', methods=['POST'])
def predict():
    if 'image_url' not in request.json:
        return jsonify({'error': 'No image URL part'}), 400

    image_url = request.json['image_url']
    if not image_url:
        return jsonify({'error': 'No selected image URL'}), 400

    try:
        response = requests.get(image_url)
        response.raise_for_status()
        img = Image.open(BytesIO(response.content))
        img_array = preprocess_image(img)

        predictions = predict_image(img_array)

        predicted_class_index = np.argmax(predictions)
        predicted_class = class_labels[predicted_class_index]
        confidence = predictions[0][predicted_class_index]

        confidence = float(confidence)
        is_confident = confidence >= 0.9999

        return jsonify({
            'predicted_class': predicted_class,
            'confidence': confidence,
            'is_confident': not(is_confident)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

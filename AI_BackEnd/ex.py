import requests

def send_image_request(image_url):
    url = 'http://127.0.0.1:5000/predict'
    data = {
        'image_url': image_url
    }

    try:
        response = requests.post(url, json=data)
        
        if response.status_code == 200:
            print("Prediction response:", response.json())
        else:
            print(f"Error: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    test_image_url = 'violence_test/violence_1.jpg'  
    send_image_request(test_image_url)

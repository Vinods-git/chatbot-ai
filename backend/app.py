from flask import Flask, request, jsonify
from flask_cors import CORS
from helper import generate_response

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/')
def index():
    return 'Index Page'
    
@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    user_message = request.json['message']
    # Process the user message and generate a bot response
    # You'll implement this part based on your chatbot logic
    response = {
        'reply': generate_response(user_message)
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run()
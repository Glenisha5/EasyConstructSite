from flask import Flask, request, jsonify, send_from_directory
from langchain_groq import ChatGroq
from dotenv import load_dotenv
from flask_cors import CORS
import os

# Load .env variables
load_dotenv()

# Initialize Flask
app = Flask(__name__)
# NOTE: CORS is no longer strictly necessary since the backend now serves the frontend,
# but it's good practice to keep it for flexibility.
CORS(app)

# Initialize Groq LLM
llm = ChatGroq(
    temperature=0.8,
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama-3.3-70b-versatile"
)

# Route to serve the HTML frontend
@app.route("/")
def serve_index():
    """Serves the frontend HTML file."""
    return send_from_directory(os.getcwd(), 'index.html')

# API route for chat
@app.route("/chat", methods=["POST"])
def chat():
    """
    Handles chat requests by taking a message from the user,
    invoking the Groq LLM, and returning the reply.
    """
    data = request.get_json()
    user_input = data.get("message", "")

    if not user_input:
        return jsonify({"error": "Message is required"}), 400

    prompt = f"Reply in the same language as the user. User said: {user_input}"
    try:
        response = llm.invoke(prompt)
        reply = response.content
    except Exception as e:
        print(f"Error from LLM: {e}")
        return jsonify({"error": "Failed to get a response from the LLM"}), 500

    return jsonify({"reply": reply})

if __name__ == "_main_":
    if not os.getenv("GROQ_API_KEY"):
        print("Error: GROQ_API_KEY environment variable is not set.")
    else:
        app.run(host="0.0.0.0", port=5000, debug=True)
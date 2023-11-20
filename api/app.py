from flask import Flask, request, jsonify
from model_deconstructed import Chain
from pymongo.mongo_client import MongoClient

print('Fetching pinecone vs and initalizing llm ...')
llm = Chain()
app = Flask(__name__)

uri = "mongodb+srv://u1:u1@cluster0.4cpubm9.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client.get_database('LOR')
records = db.get_collection('item-data')    

@app.route("/get-response/<user_query>", methods=['GET'])
def get_response(user_query):
    print("does this work??")
    user_query = user_query.replace("%20", " ")
    history = request.args.get('history')

    input = {
        "question": user_query,
        "chat_history": history
    }

    r, hist, side_bar = llm.get_response(input, records)

    user_data = {
        "user_query": user_query,
        "bot_response": r,
        "history": hist,
        "side_bar": side_bar
    }

    j = jsonify(user_data)
    allowed_origin = request.headers.get('Origin')
    j.headers.add('Access-Control-Allow-Origin', allowed_origin)
    j.headers.add('Access-Control-Allow-Credentials', 'true')
    print("Successfully retrieved response")
    return j, 200 # json, response code

if __name__ == "__main__":
    app.run(debug=True)
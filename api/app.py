from flask import Flask, request, jsonify
from model_deconstructed import Chain
from pymongo.mongo_client import MongoClient
# import certifi

print('Fetching pinecone vs and initalizing llm ...')
llm = Chain()
app = Flask(__name__)

uri = "mongodb+srv://u1:u1@cluster0.4cpubm9.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri)
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client.get_database('LOR')
records = db.get_collection('item-data')

def parse_conversation(history):
    # history needs to be a list of tuples: [(question, answer), (question, answer), (question, answer), ...]
    return []


# @app.route("/search-item/<item>", methods=['GET'])
# def search_item(item):
#     item = item.replace("%20", " ")
#     print("finding " + item + "...")
#     try:
#         r = records.find_one({"name": item})
#         if r == None:
#             return jsonify({
#                 "user_query": item,
#                 "item": "not found",
#             }), 200

#         user_data = {
#             "user_query": item,
#             "item": r["name"],
#             "img-url": r["img-url"]
#         }
#         return jsonify(user_data), 200
#     except Exception as e:
#         print(e)
    
#     return jsonify({}), 500
    

@app.route("/get-response/<user_query>", methods=['GET'])
def get_response(user_query):
    user_query = user_query.replace("%20", " ")
    history = request.args.get('history')
    # history = history.replace("%20", " ")

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
    return j, 200 # json, response code


if __name__ == "__main__":

    app.run(debug=True)
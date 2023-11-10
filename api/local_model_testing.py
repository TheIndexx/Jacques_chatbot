from model_deconstructed import Chain
from pymongo import MongoClient

def main():
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

    llm = Chain()
    convo  = "Welcome to the League of Rebels store ~ I'm Jacques, an AI suit connoisseur. What are you looking for today?+$+"
    conj = "+$+"
    response = ""

    while (True):
        # print(response)
        print("\n")

        q = input("> ")
        print("\n")

        i = {
            "question": q,
            "chat_history": convo[:-3]
        }

        print('-----------')
        print()
        response, hist, side_bar = llm.get_response(i, records)
        # print(hist)
        print(response)
        convo = convo + q + "+$+" + response + "+$+"




if __name__ == "__main__":
    main()

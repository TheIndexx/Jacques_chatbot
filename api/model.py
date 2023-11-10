import os
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.prompts.prompt import PromptTemplate
from langchain.vectorstores import Pinecone
import pinecone

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
PINECONE_API_ENV = os.getenv('PINECONE_API_ENV')

class Vectorbase():

    def __init__(self) -> None:
        
        pinecone.init(
            api_key=PINECONE_API_KEY,
            environment=PINECONE_API_ENV,
            )
        
        index_name = "store-data"
        index = pinecone.Index(index_name)

        # print(pinecone.list_indexes())
        # print(index.describe_index_stats())

        embedding = OpenAIEmbeddings(
            model='text-embedding-ada-002',
            openai_api_key=OPENAI_API_KEY
        )

        text_field = "text"
        self.vectorstore = Pinecone(
            index, embedding, text_field
        )
    
    def get_retriever(self):
        return self.vectorstore.as_retriever()

class Chain():
    
    def __init__(self):

        retriever = Vectorbase().get_retriever()
        
        # At the end of standalone question add this 'Respond to the question like a conversational suit-store employee would and, when appropriate or necessary, ask informational questions or provide information to add to the conversation.'
        custom_template = """Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question. 
            If you do not know the answer reply with 'I am sorry, I dont understand'. 
            Chat History:
            {chat_history}
            Follow Up Input: {question}
            Standalone question:"""

        CUSTOM_QUESTION_PROMPT = PromptTemplate.from_template(custom_template)

        self.chat_history = []

        self.chain = ConversationalRetrievalChain.from_llm(
            llm = ChatOpenAI(
                temperature=0.0,
                model_name='gpt-3.5-turbo', verbose=True),
            retriever=retriever,
            condense_question_prompt=CUSTOM_QUESTION_PROMPT,
            verbose=True
        )

    def response(self, x, history):
        input = {
            "question": x,
            "chat_history": history
        }
        answer = self.chain(input)["answer"]
        self.chat_history.append((x, answer))
        return answer
        

# def main():
#     # products = '/Users/michaelpasala/Projects/Stylist/app-starter-kit/SampleProducts.csv'
#     # general_info = '/Users/michaelpasala/Projects/Stylist/app-starter-kit/store_info.txt'
#     a = Chain()
#     # a.response("I am looking for a blazer.")
#     print(a.response("What suits do you have in black?", []))

#     # print(a.response("What is the phone number of the store?"))

#     # V = Vectorbase()
#     # print(V.search())


# if __name__ == "__main__":
#     main()

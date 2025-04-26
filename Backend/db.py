import os
from pymongo import MongoClient
import certifi


DB_URI = os.getenv('DB_URI')

if not DB_URI:
    raise EnvironmentError("Missing 'DB_URI' in environment variables")

client = MongoClient(DB_URI, tlsCAFile=certifi.where())


def db_create_element(db_name: str, collection_name: str, data: dict):
    db = client[db_name]
    collection = db[collection_name]
    return collection.insert_one(data)


def db_find_element(db_name: str, collection_name: str, query: dict):
    db = client[db_name]
    collection = db[collection_name]
    return collection.find_one(query)



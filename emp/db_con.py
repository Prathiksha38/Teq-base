import pymongo
# from pymongo import MongoClient
con = pymongo.MongoClient("mongodb://localhost:27017/")
db = con ['project'] 

# import mongoengine

# db=mongoengine.connect('project')  

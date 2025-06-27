# import pymongo
# # from pymongo import MongoClient
# con = pymongo.MongoClient("mongodb+srv://prathiksha383:OibBzIDTvnI2XIk8@cluster3.gqobdtx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3")
# db = con ['project'] 

# # import mongoengine

# # db=mongoengine.connect('project')  

import pymongo

# ✅ MongoDB Atlas connection string with TLS fixes for Render
con = pymongo.MongoClient(
    "mongodb+srv://prathiksha383:prathiksha383@cluster0.khqiya2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/project"
)

# ✅ Connect to the 'project' database
db = con['project']


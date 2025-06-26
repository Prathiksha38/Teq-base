# import pymongo
# # from pymongo import MongoClient
# con = pymongo.MongoClient("mongodb+srv://prathiksha383:OibBzIDTvnI2XIk8@cluster3.gqobdtx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3")
# db = con ['project'] 

# # import mongoengine

# # db=mongoengine.connect('project')  

import pymongo

# ✅ Updated connection string with tls=true to fix Render SSL error
con = pymongo.MongoClient(
    "mongodb+srv://prathiksha383:OibBzIDTvnI2XIk8@cluster3.gqobdtx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3&tls=true"
)

# ✅ Connect to the 'project' database
db = con['project']


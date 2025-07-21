# db_con.py
import pymongo
import certifi

# ✅ MongoDB Atlas connection string
MONGO_URI = "mongodb+srv://prathiksha383:prathiksha383@cluster0.khqiya2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# ✅ Connect using certificate
con = pymongo.MongoClient(MONGO_URI, tlsCAFile=certifi.where())

# ✅ Use the 'project' database
db = con['project']


const express = require("express");
const app = express();
const path = require("path");
const { MongoClient } = require("mongodb");

const PORT = 5050;
const MONGO_URL = "mongodb://admin:secret@localhost:27017/?authSource=admin";
const client = new MongoClient(MONGO_URL);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// GET all users
app.get("/getUsers", async (req, res) => {
  try {
    await client.connect(MONGO_URL);
    console.log("Connected successfully to server");

    const db = client.db("testapp-db");
    const data = await db.collection("users").find({}).toArray();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  } finally {
    await client.close();
  }
    console.log("Hiii");

});

// POST new user
app.post("/addUser", async (req, res) => {
  try {
    await client.connect(MONGO_URL);
    console.log("Connected successfully to server");

    const db = client.db("testapp-db");
    const result = await db.collection("users").insertOne(req.body);

    res.json({ message: "User added", result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting user");
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



// docker compose -f mongodb.yaml up -d      // RUN THIS command when u have removed 
//                                                          conatiners and images to run it back as usual 

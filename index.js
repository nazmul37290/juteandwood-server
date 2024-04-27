const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 4000;
// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Assignment server is running");
});

// AacWizo72QLDQdtx
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://nazmulnjm:AacWizo72QLDQdtx@cluster0.0kf8y7n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    const database = client.db("juteAndWood");
    const allItems = database.collection("allItems");
    app.post("/items", async (req, res) => {
      const item = req.body;

      console.log("server hitting");
      console.log(item);
      const result = await allItems.insertOne(item);
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

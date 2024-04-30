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
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.0kf8y7n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // await client.db("admin").command({ ping: 1 });
    // f
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    const database = client.db("juteAndWood");
    const allItems = database.collection("allItems");
    const categories = database.collection("subCategory");
    app.get("/items", async (req, res) => {
      const cursor = allItems.find();
      const result = await cursor.toArray();

      res.send(result);
    });
    app.post("/items", async (req, res) => {
      const item = req.body;

      console.log("server hitting");
      console.log(item);
      const result = await allItems.insertOne(item);
      res.send(result);
    });

    app.get("/items/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const result = await allItems.findOne(query);
      res.send(result);
    });

    app.put("/items/update/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const item = req.body;
      const {
        name,
        email,
        item_name,
        photo,
        subcategory_Name,
        description,
        price,
        rating,
        customization,
        processing_time,
        stockStatus,
      } = item;

      const filter = { _id: new ObjectId(id) };
      const updatedItem = {
        $set: {
          name,
          email,
          item_name,
          photo,
          subcategory_Name,
          description,
          price,
          rating,
          customization,
          processing_time,
          stockStatus,
        },
      };

      const result = await allItems.updateOne(filter, updatedItem);
      res.send(result);
    });

    app.delete("/items/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await allItems.deleteOne(query);
      res.send(result);
    });
    app.get("/items/email/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const cursor = allItems.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/categories", async (req, res) => {
      const cursor = categories.find();
      const result = await cursor.toArray();
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

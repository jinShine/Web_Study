const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://seungjin429:whis!34679@cluster0.vwhgqi6.mongodb.net/?retryWrites=true&w=majority";

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
    await client.connect();
    // Send a ping to confirm a successful connection
    const adminDB = await client.db("admin").admin();
    const listDatabases = await adminDB.listDatabases();

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
      listDatabases
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().then(console.log).catch(console.dir);

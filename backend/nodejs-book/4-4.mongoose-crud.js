const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./4-3.mongoose-pserson-model");

mongoose.set("strictQuery", false); // 설정해줘야 경고가 뜨지 않음.

const app = express();
app.use(bodyParser.json());
app.listen(5001, async () => {
  console.log("Server started on port 3000");
  const mongodbURI =
    "mongodb+srv://seungjin429:whis!34679@cluster0.vwhgqi6.mongodb.net/?retryWrites=true&w=majority";

  mongoose.connect(mongodbURI).then(() => console.log("MongoDB Connected..."));
});

app.get("/person", async (req, res) => {
  const person = await Person.find();
  console.log("person: ", person);
  res.send(person);
});

app.get("/person/:email", async (req, res) => {
  const person = await Person.findOne({ email: req.params.email });
  res.send(person);
});

app.post("/person", async (req, res) => {
  console.log("req body", req.body);
  const person = await Person.create(req.body);
  console.log("@@@@@@@@@@@@@@", person);
  await person.save();
  res.send(person);
});

app.put("/person/:email", async (req, res) => {
  const person = await Person.findOneAndUpdate(
    { email: req.params.email },
    { $set: req.body },
    { new: true }
  );

  console.log("put", person);
  res.send(person);
});

app.delete("/person/:email", async (req, res) => {
  await Person.deleteMany({ email: req.params.email });
  res.send({ success: true });
});

const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://seungjin429:whis!34679@cluster0.vwhgqi6.mongodb.net/";

module.exports = function (callback) {
  return MongoClient.connect(uri, callback);
};

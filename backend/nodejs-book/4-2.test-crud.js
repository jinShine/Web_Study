const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://seungjin429:whis!34679@cluster0.vwhgqi6.mongodb.net/?retryWrites=true&w=majority";

// MongoClient 생성
const client = new MongoClient(uri, { useNewUrlParser: true });

async function main() {
  try {
    // 커넥션 생성
    await client.connect();
    console.log("MongoDB 접속 성공");

    // test 데이터베이스의 person 컬렉션 가져오기
    const collection = client.db("test").collection("person");

    // 문서 하나 추가
    await collection.insertOne({ name: "버즈", age: 33 });
    console.log("데이터 추가 성공");

    // 문서 찾기
    const documents = await collection.find({ name: "버즈" }).toArray();
    console.log("찾은 문서 : ", documents);

    // 문서 갱신하기
    await collection.updateOne({ name: "버즈" }, { $set: { age: 100 } });
    console.log("문서 업데이트 성공");

    // 갱신된 문서 확인하기
    const updatedDocuments = await collection.find({ name: "버즈" }).toArray();
    console.log("업데이트된 문서 : ", updatedDocuments);

    // 연결 끊기
    await client.close();
  } catch (error) {
    console.log(error);
  }
}

main();

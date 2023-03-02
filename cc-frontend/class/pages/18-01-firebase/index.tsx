import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { db } from "../_app";

export default function FirebasePage() {
  const onClickSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "board"), {
        writer: "버즈",
        title: "제목입니다1",
        contents: "내용입니다1",
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error(e);
    }
  };

  const onClickFetch = async () => {
    const board = collection(db, "board");
    const result = await getDocs(board);
    result.docs.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data());
    });
  };

  return (
    <>
      <button onClick={onClickSubmit}>등록하기</button>
      <button onClick={onClickFetch}>조회하기</button>
    </>
  );
}

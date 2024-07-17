import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, get, child } from "firebase/database";
import MoveButton from "../components/MoveButton";

function Home() {
  const navigate = useNavigate();

  function goAdd() {
    navigate("/addText");
  }

  const db = getDatabase();
  const dbRef = ref(db);

  let texts;

  get(child(dbRef, `text`)).then((snapshot) => {
    texts = { text: Object.values(snapshot.val()) };
    const TextDB = texts?.text;

    function shuffle(arr) {
      arr.sort(() => Math.random() - 0.5);
    }

    shuffle(TextDB);

    document.querySelector("#text").innerHTML = TextDB[0];
  });

  const countRef = useRef(0);

  function next() {
    const TextDB = texts?.text;

    if (countRef.current === TextDB.length - 1) {
      countRef.current = 0;
    } else {
      countRef.current = countRef.current + 1;
    }

    document.getElementById("text").innerHTML = TextDB[countRef.current];
    console.log(TextDB[countRef.current]);
  }

  function prev() {
    const TextDB = texts.text;

    if (countRef.current === 0) {
      countRef.current = TextDB.length - 1;
    } else {
      countRef.current = countRef.current - 1;
    }

    document.getElementById("text").innerHTML = TextDB[countRef.current];
    console.log(TextDB[countRef.current]);
  }

  return (
    <div className="home">
      <div className="content">
        <div className="circle bs-primary">
          <div id="text"></div>
        </div>
      </div>
      <div className="footer">
        <MoveButton text="이전" move={prev} />
        <button className="move-page-btn bs-primary" onClick={goAdd}>
          글귀 추가하기
        </button>
        <MoveButton text="다음" move={next} />
      </div>
    </div>
  );
}

export default Home;

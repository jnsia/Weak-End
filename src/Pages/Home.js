import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, child } from 'firebase/database';

function Home() {
  const navigate = useNavigate();

  function goAdd() {
    navigate('/addText');
  }

  const db = getDatabase();
  const dbRef = ref(db);

  let texts;

  get(child(dbRef, `text`)).then((snapshot) => {
    texts = { text: Object.values(snapshot.val()) };
    const TextDB = texts.text;

    function shuffle(arr) {
      arr.sort(() => Math.random() - 0.5);
    }

    shuffle(TextDB);

    document.querySelector('#text').innerHTML = TextDB[0];
  });

  const countRef = useRef(0);

  function Next() {
    const TextDB = texts.text;

    if (countRef.current === TextDB.length - 1) {
      countRef.current = 0;
    } else {
      countRef.current = countRef.current + 1;
    }

    document.getElementById('text').innerHTML = TextDB[countRef.current];
    console.log(TextDB[countRef.current]);
  }

  function Prev() {
    const TextDB = texts.text;

    if (countRef.current === 0) {
      countRef.current = TextDB.length - 1;
    } else {
      countRef.current = countRef.current - 1;
    }

    document.getElementById('text').innerHTML = TextDB[countRef.current];
    console.log(TextDB[countRef.current]);
  }

  return (
    <div className="home">
      <div className="content">
        <div className="textarea">
          <div id="text"></div>
        </div>
      </div>
      <div className="footer">
        <button className="move-btn" onClick={Prev}>
          이전
        </button>
        <button className="move-page-btn" onClick={goAdd}>
          글귀 추가하기
        </button>
        <button className="move-btn" onClick={Next}>
          다음
        </button>
      </div>
    </div>
  );
}

export default Home;

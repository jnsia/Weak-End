import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, push } from 'firebase/database';
// import Header from '../components/Header';

function AddText() {
  const navigate = useNavigate();

  function GoHome() {
    navigate('/home');
  }

  const autoResizeTextarea = () => {
    let texts = document.querySelector('#input-text');

    if (texts) {
      texts.style.height = 'auto';
      let height = texts.scrollHeight;
      texts.style.height = `${height}px`;
    }
  };

  // const textDB = DB.text;

  function Submit() {
    const text = document.querySelector('#input-text');
    const db = getDatabase();

    let data = text.value;

    if (data !== '') {
      navigate('/home');

      console.log(data);
      alert('감사합니다!');
      // textDB.push(data);

      push(ref(db, 'text'), data);

      // document.addText.submit();
    }
  }

  return (
    <div className="home">
      {/* <Header /> */}
      <form className="content" name="addText" action="/Texts" method="post">
        <div className="textarea">
          <textarea
            name="text"
            type="text"
            id="input-text"
            rows="1"
            placeholder="응원 글귀를 적어주세요."
            onKeyUp={autoResizeTextarea}
          ></textarea>
        </div>
      </form>
      <div className="footer">
        <button className="move-btn" onClick={GoHome}>
          뒤로
        </button>
        <button className="move-page-btn" type="submit" onClick={Submit}>
          저장하기
        </button>
        <button className="none"></button>
      </div>
    </div>
  );
}

export default AddText;

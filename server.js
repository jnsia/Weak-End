// 실패의 흔적

const express = require('express');
const path = require('path');

const app = express();
const port = 5460;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let Texts = {
  text: [
    '너 지금 멋지게 헤엄치려고\n숨 참는 것부터 하고 있다고 생각해',
    '오늘도 너의 하루는\n 반짝반짝 빛이 날거야',
    '그래, 우리 함께.',
    '날 보고 웃는 너 좋아',
    '괜찮아, 잘 해온 거야.',
    '삶은 뜨거운 것이고\n살아봐야 삶이 되는 거라고\n\n그러니\n페이지를 넘기라고',
  ],
};

// CORS 이슈 해결
const cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, '/build')));

app.get('/', (res, req) => {
  req.sendFile(path.join(__dirname, '/build/index.html'));
});

app.get('/Texts', (req, res) => {
  res.json(Texts);

  // db.collection('text').get();
});

app.post('/Texts', (req, res) => {
  console.log('text: ', req.body.text);

  Texts.text.push(req.body.text);
  res.send(Texts.text);

  // db.collection('text')
  //   .add(req.body.text)
  //   .then(console.log(req.body.text))
  //   .catch(console.error('Error'));
});

app.get('*', (res, req) => {
  req.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(port, () => console.log(`${port}번 포트!`));

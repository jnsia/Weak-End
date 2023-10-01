import React from 'react';

function test() {
  fetch('http://localhost:5460/sendText')
    .then((res) => res.json)
    .then((data) => console.log(data));

  return <div>test</div>;
}

export default test;

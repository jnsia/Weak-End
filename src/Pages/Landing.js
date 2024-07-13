import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  function GoHome() {
    navigate('/home');
  }

  return (
    <div className="landing">
      <div className="circle bs-primary" onClick={GoHome}>
        <br />
        <div>Weak? End.</div>
        <div>We Can Do!</div>
      </div>
    </div>
  );
}

export default Landing;

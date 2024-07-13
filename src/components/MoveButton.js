import React from "react";

function MoveButton(props) {
  const { text, move } = props;

  return (
    <button className="move-btn bs-primary" onClick={move}>
      {text}
    </button>
  );
}

export default MoveButton;

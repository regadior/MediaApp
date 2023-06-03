import React from "react";

export default function PrevButton({ onClick }) {
  return (
    <button onClick={onClick} className="prev_button">
      Prev
    </button>
  );
}

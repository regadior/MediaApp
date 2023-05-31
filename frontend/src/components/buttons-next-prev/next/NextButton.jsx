import React from "react";
import '../Nextprev.css'
export default function NextButton({ onClick }) {
  return (
    <button onClick={onClick} className="next_button">
      Next
    </button>
  );
}

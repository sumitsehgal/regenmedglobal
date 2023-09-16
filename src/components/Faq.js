import React, { useState } from "react";
import Collapse from "react-collapse";

const Faq = ({ questions }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <button onClick={() => handleToggle(index)}>
            {question.question}
          </button>
          <Collapse isOpened={activeIndex === index}>
            {question.answer}
          </Collapse>
        </div>
      ))}
    </div>
  );
};

export default Faq;
import React from "react";

import Kana from '../Kana';

export default ({ items, currentIndex, results }) => {
  return (
    <section className="flex flex-wrap">
      {items.map((kana, index) =>
        <Kana
          key={index}
          char={kana.char}
          isCurrent={currentIndex === index}
          answerResult={results[index]}
        />
      )}
    </section>
  );
}

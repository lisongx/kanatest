import React from "react";

import Kana from '../Kana';

export default ({ items, currentIndex, results }) => {
  return (
    <section className="flex flex-wrap">
      {items.slice(0, currentIndex).map((kana, index) =>
        <Kana
          key={index}
          char={kana.char}
          romanji={kana.romanji}
          answerResult={results[index]}
        />
      )}
    </section>
  );
}

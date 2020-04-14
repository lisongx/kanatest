import React from "react";

import Kana from '../Kana';

export default ({items}) => {

    return (
      <section className="flex flex-wrap pa5">
        {items.map((kana, index) =>
            <Kana key={index} char={kana.char} />
        )}
      </section>
    );
  }

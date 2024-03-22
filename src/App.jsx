import React from "react";
import { useEffect, useState } from "react";

const degiskenler = ["deve", "cuce"];

function App() {
  // rastgele seç
  const [randomDegisken, setRandomDegisken] = useState(
    degiskenler[Math.floor(Math.random() * degiskenler.length)]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const yeniDegisken =
        degiskenler[Math.floor(Math.random() * degiskenler.length)];
      setRandomDegisken(yeniDegisken);

      setTimeout(() => {
        setRandomDegisken("");
      }, 1880);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // buton tıkla ve puan hesapla

  const [puan, setPuan] = useState(0);

  const handleButtonClick = (clickedWord) => {
    if (clickedWord === randomDegisken) {
      setPuan((oncekiPuan) => oncekiPuan + 1);
    } else {
      setPuan((oncekiPuan) => Math.max(0, oncekiPuan - 1));
    }
  };

  return (
    <div>
      <p>{randomDegisken}</p>
      <div className="container">
        <div className="row">
          <div className="col">
            <button
              type="button"
              onClick={() => handleButtonClick("deve")}
              className="btn btn-primary"
            >
              Deve
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              onClick={() => handleButtonClick("cuce")}
              className="btn btn-secondary"
            >
              Cüce
            </button>
          </div>
        </div>
      </div>
      <p>Puan: {puan}</p>
    </div>
  );
}

export default App;

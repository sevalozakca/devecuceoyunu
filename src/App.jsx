import React from "react";
import { useEffect, useState } from "react";
import "./style.css";

const degiskenler = ["DEVE", "CÜCE"];

 // kod kalabalıklığı önlemek için;
let RandomSec=()=>{
let secilen= degiskenler[Math.floor(Math.random() * degiskenler.length)];
return secilen;
 };

function App() {
  // randomDegisken = rastgele bir kelime seç
  const [randomDegisken, setRandomDegisken] = useState(
    // degiskenler[Math.floor(Math.random() * degiskenler.length)]
    RandomSec()
  );

  useEffect(() => {
  const interval = setInterval(() => {
    // 
    const yeniDegisken = RandomSec();
    setRandomDegisken(yeniDegisken);
    setButonDurum(true);
  }, 2800); // her 2.8 sn de bir butonları aktifleştir,  yeni rastgele kelime oluştur ve ekrana yansıt

  return () => clearInterval(interval);
}, []); // useEffect sadece bir kez çalışacak, boş bağımlılık dizisi

// randomDegisken değiştiğinde çalışacak useEffect
useEffect(() => {
  const timeout = setTimeout(() => {
    setRandomDegisken("");
  }, 2000); // her iki saniyede bir kelimeyi temizler

  return () => clearTimeout(timeout);
}, [randomDegisken]);

  

  // buton tıkla ve puan hesapla

  const [puan, setPuan] = useState(0);

  // butona 2sn içinde sadece 1 kez tıklanabilsin.
  const [butonEtkin, setButonDurum] = useState(true);

  const handleButtonClick = (clickedWord) => {
    // eğer buton etkin değilse döngüden çık.
    if (!butonEtkin) return;

    if (clickedWord === randomDegisken) {
      setPuan((oncekiPuan) => oncekiPuan + 1);
    } else {
      setPuan((oncekiPuan) => Math.max(0, oncekiPuan - 1));
    }

    // butonları deaktifleştir
    setButonDurum(false);
  };

  return (
    <div>
      <p className={"random kaisei-decol-regular"}>
        {randomDegisken ? randomDegisken : <span>🔄</span>}
      </p>
      <div className="container">
        <div className="row">
          <div className="col">
            <button
              type="button"
              onClick={() => handleButtonClick("DEVE")}
              className={"btn deve kaisei-decol-regular"}
              disabled={!butonEtkin}
            >
              Deve
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              onClick={() => handleButtonClick("CÜCE")}
              className={"btn cuce kaisei-decol-regular"}
              disabled={!butonEtkin}
            >
              Cüce
            </button>
          </div>
        </div>
      </div>
      <p className={"puan kaisei-decol-regular"}>Puan: {puan}</p>
    </div>
  );
}

export default App;

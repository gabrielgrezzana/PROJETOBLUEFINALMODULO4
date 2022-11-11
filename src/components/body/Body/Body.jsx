import { useState, useEffect } from "react";
import axios from "axios";
import "../Body/Body.css";
import Modal from "react-modal";

export function Body() {
  const [characters, setCharacters] = useState([]);
  const [charactersModal, setCharactersModal] = useState([]);
  const [changeModal, setChangeModal] = useState(false);
  let a = 0;
  let b = 0;
  let c = 0;

  function changeModalOne() {
    setChangeModal(!changeModal);
  }

  useEffect(() => {
    axios.get("https://api.disneyapi.dev/characters").then((response) => {
      let data2 = response.data.data;
      let carinhas = [];
      //console.log(response);

      data2.forEach((f) => {
        //console.log(f);
        carinhas.push({
          image: f.imageUrl,
          Nome: f.name,
          longas: f.films,
          curtas: f.shortFilms,
          TVs: f.tvShows,
        });
      });
      setCharacters(carinhas);
    });
  }, []);

  function getbyId(nome) {
    let selecionado = [];
    characters.forEach((i) => {
      if (i.Nome === nome) {
        selecionado.push({
          image: i.image,
          nome: i.Nome,
          longas: i.longas,
          curtas: i.curtas,
          Tvs: i.TVs,
        });

        setCharactersModal(selecionado);
        console.log(charactersModal);
      }
    });
  }

  return (
    <>
      <div>
        <Modal
          className="Modal"
          isOpen={changeModal}
          onRequestClose={changeModalOne}
          contentLabel="nafen"
          ariaHideApp={false}
        >
          {charactersModal.length == 0 ? (
            <></>
          ) : (
            <div className="modalchefe">
              <img className="imagemdofigurante" src={charactersModal[0].image}></img>
              <p>Nome: {charactersModal[0].nome}</p>
              <p>Qnt Longas: {charactersModal[0].longas}</p>
              <p>Qnt Curtas: {charactersModal[0].curtas}</p>
              <p>Qnt Filmes: {charactersModal[0].Tvs}</p>
            </div>
          )}
        </Modal>

        <div className="bodyCharacters">
          {characters.map((f) => {
            if (f.longas.length > 0) {
              f.longas.forEach((e, index) => {
                a = index + 1;
              });
            } else {
              a = 0;
            }

            if (f.TVs.length > 0) {
              f.TVs.forEach((e, index) => {
                b = index + 1;
              });
            } else {
              b = 0;
            }

            if (f.curtas.length > 0) {
              f.curtas.forEach((e, index) => {
                c = index + 1;
              });
            } else {
              c = 0;
            }

            return (
              <>
                <div
                  className="card"
                  onClick={() => {
                    changeModalOne();
                    getbyId(f.Nome);
                  }}
                >
                  <img className="imagemdofigurante" src={f.image}></img>
                  <p>Nome: {f.Nome}</p>
                  <p>Qnt Longas: {a}</p>
                  <p>Qnt Curtas: {c}</p>
                  <p>Qnt Filmes: {b}</p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

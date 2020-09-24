import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Results.css";
import { Payment } from "./Payment"

import NewModal from "./NewModal";
import PilotCard from "./PilotCard";

function Results({ info }) {
  const userType = sessionStorage.getItem("userType");
  const [pilotsDb, setPilotsDb] = useState([]);
  const [solicitudesDb, setSolicitudesDb] = useState([]);
  const [modelToggle, setModelToggle] = useState(false);
  const [pilotCard, setPilotCard] = useState("");
  const pilotId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (userType === "pilot") {
      setSolicitudesDb([]);
      const solicitudes = async () => {
        try {
          const result = await axios.post(
            "http://localhost:8000/solicitudes/filtrar",
            { info, pilotId }
          );
          setSolicitudesDb(result.data);
        } catch (error) {
          alert(error);
        }
      };
      solicitudes();
    } else {
      setPilotsDb([]);
      const filterPilots = async () => {
        try {
          const result = await axios.post(
            "http://localhost:8000/pilot/filtrar",
            { info }
          );
          setPilotsDb(result.data);
        } catch (error) {
          alert(error);
        }
      };
      filterPilots();
    }
  }, [info]);

  const handleClose = () => {
    setModelToggle(false);
  };

  return (
    <>
      {userType === "pilot" && <h2>Solicitudes</h2>}
      {userType === "pilot"
        ? solicitudesDb
          ? solicitudesDb.map((element) => {
              return (
                <div className="solicitude" key={element._id}>
                  <div>
                    {element.images.map((image, index) => {
                      if (index < 1) {
                        return (
                          <img
                            className="image__solicitude"
                            src={image.url}
                            alt=""
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="solicitude-right">
                    <p>{element.description}</p>
                    {element.phone.includes("X")?<Payment element={element}/>:null}
                    <h2>{`Teléfono: ${element.phone}`}</h2>
                  </div>
                </div>
              );
            })
          : null
        : pilotsDb
        ? pilotsDb.map((element) => {
            return (
              <div className="solicitude" key={element._id}>
                <div>
                  {element.media.map((image, index) => {
                    if (index < 1) {
                      return (
                        <img
                          className="image__solicitude"
                          src={image.url}
                          alt=""
                        />
                      );
                    }
                  })}
                </div>
                <div className="solicitude-right">
                  <h2 className="solicitude-title">{element.name}</h2>
                  <h3>{element.description}</h3>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptas sunt ducimus incidunt dolor totam, beatae id
                    officia alias eaque explicabo, quas distinctio pariatur est
                    tempora temporibus laudantium quae asperiores neque.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptas sunt ducimus incidunt dolor totam, beatae id
                    officia alias eaque explicabo, quas distinctio pariatur est
                    tempora temporibus laudantium quae asperiores neque.
                  </p>

                  <div className="buttons">
                    <button
                      onClick={(event) => {
                        setPilotCard(element);
                        setModelToggle(true);
                      }}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        : null}
      <NewModal show={modelToggle} modalClosed={handleClose}>
        <PilotCard pilot={pilotCard} />
      </NewModal>
    </>
  );
}

export default Results;

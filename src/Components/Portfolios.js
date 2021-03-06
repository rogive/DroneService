import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { storage } from '../firebase';
import axios from 'axios';
import FileButton from './FileButton'

const IconContainer = styled.div`
  width: 100%;
  text-align:center;
  padding-top: 3rem;
  img{
    width: 15rem;
    height: 15rem;
    border-radius: 3rem;
    filter: grayscale(100%);
  }
`

const AttachContainer = styled.div`
  padding-top:2rem;
  padding-bottom:2rem;
  progress {
    width: 100%;
  }
`

const ComponentContainer = styled.div`
  p{
    padding-top: 2rem;
    text-align: justify;
    font-size: 1.2rem;
  }
  h2{
    font-size: 2rem;
  }
`

const PortfolioImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`

const ImageContainer = styled.div`
  border-radius: 1rem;
  margin-top: 2rem;
  margin-right: 2rem;
  margin-left: 2rem;
  img{
    width: 10rem;
    height: 10rem;
    border-radius: 3rem;
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.4);
  }
`

function PortfoliosComponent({
  portfolios
}) {
  return portfolios.map((portfolio) => {
    return(
        <ImageContainer>
              <img src={portfolio.url} alt="images"/>
        </ImageContainer>
    );
  });
}
  
function Portfolios() {
  const [portfolios, setPortfolios] = useState([])
  const [name, setName] = useState("")
  const pilotId = (sessionStorage.getItem("userId"))
  const [selectedFile, setSelectfile] = useState(null)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState('')

  useEffect( () => {
    axios({
      url: `http://localhost:8000/media/listar/piloto/${pilotId}`,
      method: 'GET',
    })
      .then(({ data }) => setPortfolios( data ))
      .catch((error) => setError({ error }))
    }, [pilotId])

  function handleChange(event) {
    if(!event.target.files[0]) return
    setName(event.target.files[0].name)
    setSelectfile(event.target.files[0])
  }

  function handleSubmit(event) {
    event.preventDefault();
    const uploadImage = storage.ref(`Pilots/Pilot-${pilotId}/Portfolio/` + name).put(selectedFile);
    uploadImage.on('state_changed',
      (snap) =>  {
        const progress = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
        setProgress(progress);
      }, 
      (error) => {alert(error)},
      () => {
        storage.ref(`Pilots/Pilot-${pilotId}/Portfolio/`).child(name).getDownloadURL().then(url => {
          axios({
            url: 'http://localhost:8000/media/crear',
            method: 'POST',
            data: {
              pilotId: pilotId,
              url: url,
              type: "image",
            }
          }).then(({ data }) => {
            setPortfolios( portfolios.concat(data) )
            setProgress(0);
          })
          .catch((error) => setError(error));
        });
      }
    )
  }
    return(
      <ComponentContainer>
        <h2>Portafolio</h2>
        <IconContainer>
          <img src="https://image.flaticon.com/icons/svg/1096/1096090.svg" alt=""></img>
        </IconContainer>
        <p>Este espacio corresponde al material que te gustaria mostrar a
            los clientes. Relaciona todas tus mejores trabajos en fotos o
            pequeños videos que le den una idea de tu calidad al cliente.
        </p>
        <AttachContainer>
          <FileButton onChange={handleChange} onSubmit={handleSubmit} name={name} number={2} type="image"/>
        </AttachContainer>
        <PortfolioImageContainer>
          <PortfoliosComponent portfolios = {portfolios}/>
        </PortfolioImageContainer>
      </ComponentContainer>
    )
}

export default Portfolios
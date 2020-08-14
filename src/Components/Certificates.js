import React from 'react';
import styled from 'styled-components';



const CertificatesContainer = styled.div`

  justify-content: space-between;

`
const AddContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;

`

const CertificatesBar = styled.label`
  margin-right: 40vw;

`


function Certificates(){
  return(
    <CertificatesContainer>
      <h2>Certificaciones</h2>
      <h6>Piloto certificado en UAS con especialidades en fotogrametria
          y seguridad aerea. Piloto certificado en UAS con especialidades
          en fotogrametria y seguridad aerea. 
      </h6>
      <AddContainer>
        <CertificatesBar>Curso_Especializacion_Fotogrametria.pdf</CertificatesBar>
        <button>Examinar</button>
        <button>Adjuntar</button>
      </AddContainer>
    </CertificatesContainer>
  )
}


export default Certificates
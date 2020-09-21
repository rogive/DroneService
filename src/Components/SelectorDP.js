import React from 'react';
import styled from 'styled-components';
import UserProfile from './UserProfile';
import Certificates from '../Components/Certificates';
import FlightLogs from '../Components/FlightLogs';
import FlightLogsApp from '../Components/FlightLogsApp';
import Equipments from '../Components/Equipments';
import Services from '../Components/Services';
import Others from '../Components/Others';
import Portfolios from '../Components/Portfolios';
import './SelectorDP.css'

const SecondaryContainer = styled.div`
  display: flex;
  justify-content: space-around;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.2);
  padding: 40px 0px;
`

const LateralContainer = styled.div`
  width: 30%;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.2);
  padding-left: 2rem;
  padding-right: 1rem;
  .Indicador{
    padding-top: 1rem;
    padding-bottom: 1rem;
    .TuPerfil{
      padding-top: 1rem;
      padding-bottom: 1rem;
      font-size: 1.2vw;
    }
  }
  .Bienvenido{
    padding-top: 2rem;
    h2{
      font-size: 1.5vw;
    }
  }
`

const BarBoxContainer = styled.div`
  display: flex;
  width: 100%;
  .LabelBar{
    margin-left: 1rem;
    width: 10%;
  }
`

const BarBackgroundContainer = styled.div`
  width: 80%;
  border-radius: 1rem;
  background-color: #ddd;
`

const BarStateContainer = styled.div`
  width: 80%;
  border-radius: 1rem;
  background-color: rgb(0, 23, 105);
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
`

const ComponentBodyContainer = styled.div`
  width: 60%;
  padding: 4rem 0rem;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  .component-pilot{
  width: 80%;
  text-align: center;
  }
`

const TabsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  button {
    background-color: white;
    border: none;
    color: black;
    padding: 1rem;
    text-align: left;
    text-decoration: none;
    display: inline-block;
    font-size: 1.5vw;
    &:hover {
    background-color: rgba(237, 237, 237, 1);
    color: black;
    border-style: none;
    border: none;
    }
  }
`

class SelectorDP extends React.Component{

  state = { value: "Profile", pilotName:"" }

  componentDidMount() {
    const pilotName = sessionStorage.getItem("userName")
    this.setState({ pilotName })
  }

  handleClick = (event) => {
    this.setState({ value: event.target.value });
  }

  render(){
    return(
      <SecondaryContainer>
        <LateralContainer>
          <div className="Bienvenido">
            <h2> ¡Bienvenido {this.state.pilotName}!</h2>
          </div>
          <div className="Indicador"> 
            <p className="TuPerfil"> Tu perfil esta al:</p>
              <BarBoxContainer>
                  <BarBackgroundContainer>
                      <BarStateContainer>80%</BarStateContainer>
                  </BarBackgroundContainer>
                  <span className="LabelBar">80%</span>
              </BarBoxContainer>
          </div>
          <TabsContainer>
            <button value="Profile" onClick={this.handleClick}> Perfil </button>
            <button value="Certificates" onClick={this.handleClick}> Certificaciones </button>
            <button value="FlightLogs" onClick={this.handleClick}> Bitacoras de Vuelo </button>
            <button value="FlightLogsApp" onClick={this.handleClick}> Horas de Vuelo App </button>
            <button value="Services" onClick={this.handleClick}> Servicios </button>
            <button value="Equipments" onClick={this.handleClick}> Equipos </button>
            <button value="Others" onClick={this.handleClick}> Otros </button>
            <button value="Portfolios" onClick={this.handleClick}> Portafolío </button>
          </TabsContainer>
        </LateralContainer>
        <ComponentBodyContainer>
              {
                this.state.value === "Profile" ?
                <div className="component-pilot">
                  <UserProfile />
                </div> :
                this.state.value === "Certificates" ?
                  <div className="component-pilot">
                    <Certificates/>
                  </div> :
                this.state.value === "FlightLogs" ?
                  <div className="component-pilot">
                    <FlightLogs/>
                  </div> :
                this.state.value === "FlightLogsApp" ?
                  <div className="component-pilot">
                    <FlightLogsApp/> 
                  </div> :
                this.state.value === "Services" ?
                  <div className="component-pilot">
                    <Services/>
                  </div> :
                this.state.value === "Equipments" ?
                  <div className="component-pilot">
                    <Equipments/>
                  </div> :
                this.state.value === "Others"?
                  <div className="component-pilot">
                    <Others/>
                  </div> :
                this.state.value === "Portfolios" ?
                  <div className="component-pilot">
                    <Portfolios/>
                  </div> :
                <span></span>
              }
        </ComponentBodyContainer>
      </SecondaryContainer>
    )
  }
}

export default SelectorDP
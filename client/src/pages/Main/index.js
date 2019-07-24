import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, } from 'mdbreact';
import Start from '../../components/Start'
import End from '../../components/End'
import API from '../../utils/API'
import WalkButtonWaitButton from '../../components/walkWaitBtn'
import '../pageStyle.css'


class Main extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      latitude: "",
      longitude: "",
      departOptions: [],
      arrivalOptions: [],
      depart: {},
      arrival: {},
      receivedResult: false,
      travelMode: null,
      error: null,
      nextBus: null,
      walkTime: null,
    };
  }

  geolocate = (e) => {
    e.preventDefault()
    let geoOptions = {
       enableHighAccuracy: true
    };

    if ("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(this.geoSucess, this.geoError, geoOptions)
    }else {
      alert("Geolocation needs to be turned on for this application.")
    }
  }

  geoSucess = (position) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    let {latitude, longitude} = this.state
    this.getBusAtLocation(latitude, longitude)
  }

  geoError = (err) => {
    console.log(`GEOLOCATE ERROR(${err.code}): ${err.message}`);
  }

  getBusAtLocation = (lat, lon) => {
    API.getAllBuses(lat, lon)
    .then(res => {
      let buses = res.data
      let departOptions = []
      buses.forEach(bus => {
        let thisBus = {}
        thisBus.route = bus.route.id
        thisBus.id = bus.stop.id
        let fullTitle = bus.values[0].direction.title.split("To: ")[1]
        let direction = fullTitle.split(" - ")[0].charAt(0)
        let title = bus.route.title.split("-")[1]
        let stop = bus.stop.title.split(" ").slice(1).join(" ")
        thisBus.title = bus.route.id + direction + " - " + title + " / " + stop
        thisBus.direction = direction
        departOptions.push(thisBus)
      });
      this.setState({departOptions})
    })
  }

  handleDepartInput = async (e) => {
    e.preventDefault()
    let index = e.target.selectedIndex
    let selectedBus = e.target.childNodes[index]
    let depart = {
      route: selectedBus.getAttribute('data-route'),
      stopId: e.target.value,
      direction: selectedBus.getAttribute('data-direction')
    }
    await this.setState({depart})
    this.listDestinations()

  }

  listDestinations = () => {
    let {route, direction, stopId} = this.state.depart
    API.getNextStops(route, direction, stopId)
      .then(res => {
      this.setState({arrivalOptions: res.data})
      })
  }

  handleDestinationInput = (e) => {
    e.preventDefault()
    let index = e.target.selectedIndex
    // let selectedBus = e.target.childNodes[index]
    let terminal = false    
    if (index === e.target.childNodes.length - 1){
      terminal = true
    }
    let previousStop = e.target.childNodes[index - 1].getAttribute("value")
    if (index === 1){
      previousStop = this.state.depart.stopId    
    }
    let arrival = {
      stopId: e.target.value,
      terminal: terminal,
      previous: previousStop
    }

    this.setState({arrival})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let route = parseInt(this.state.depart.route)
    let origin = this.state.depart.stopId
    let destination = this.state.arrival.stopId
    let terminal = this.state.arrival.terminal
    let previous = this.state.arrival.previous

    API.search(route, origin, destination, terminal, previous)
      .then(res => {
        this.setState({ 
          receivedResult: true,
          travelMode: res.data.travelMode,
          nextBus: res.data.bus.nextBus,
          walkTime: res.data.walk
         })
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
        this.setState({error})
      })
  }

  handleClickForDisplay = (e) => {
    e.preventDefault()
    this.setState({receivedResult: false})
  }

  render() {
    if (this.state.error) {
      return(
        <MDBContainer className="text-center mt-5 pt-5 mainContainer">
            <MDBRow className="justify-content-center">
                <MDBCol md="5" sm="12">
                  <MDBBtn href="/" color="yellow accent-3" className="black-text">TTC is unable provide bus info at this time.<br />Click here to try again.</MDBBtn>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
      );
    } else {
      return(
        <MDBContainer className="text-center mt-5 pt-5 mainContainer">

          {this.state.receivedResult ?
          (<WalkButtonWaitButton
          className='test'
            result={this.state.receivedResult}
            travelMode={this.state.travelMode}
            onClick={this.handleClickForDisplay}
            nextBus={this.state.nextBus}
            walkTime={this.state.walkTime}
          />) : 
          (<form style={{maxWidth: "400px"}} className="mx-auto">
            <MDBRow className="row justify-content-center">
                <p className="white-text mb-3">Please press the "target icon" to find your current location. Then select your bus form the "Start..." dropdown menu.</p>
                <MDBCol sm="12" className="mb-4">
                    <Start departOptions={this.state.departOptions} geolocate={this.geolocate} latitude={this.state.latitude} longitude={this.state.longitude} handleChange={this.handleDepartInput}/>
                </MDBCol>
                <MDBCol sm="12" className="mb-4">
                    <End arrivalOptions={this.state.arrivalOptions} route={this.state.depart.route} handleChange={this.handleDestinationInput}/> 
                </MDBCol>
                <MDBCol className="p-0 mx-auto">
                  <MDBBtn color="yellow accent-3" className="black-text" size="lg" onClick={(e) => this.handleSubmit(e)}>Submit</MDBBtn>
                </MDBCol>
            </MDBRow>
          </form>)
        }
        </MDBContainer>
      );
    }
  };
};

export default Main
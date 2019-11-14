import React from "react";
import cracow from "../assets/cracow-map.png";
import {Pane, Text, Heading, Button} from "evergreen-ui";
import imageMapResize from 'image-map-resizer'

class Visualization extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pointsOfInterests: [],
            xMouseCoordinate: 0,
            yMouseCoordinate: 0,
            selectedPoi: ''
        }
    }


    componentDidMount() {
        this.fetchPointsOfInterests().then((pois) => this.setState({pointsOfInterests: pois}))
    }

    // TODO: Move to separate file and rework xd
    fetchPointsOfInterests = () => {
        return fetch('http://localhost:3000/points-of-interests').then((resp) => resp.json())
    };

    createControlSection = () => {
        return (
            <React.Fragment>
                <Heading size={800} paddingBottom={'0.5em'}> Control </Heading>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", paddingBottom: "4em"}}>
                    <Button
                        appearance="primary"
                        marginRight={16}
                        intent="warning"
                    >
                        Pause
                    </Button>
                    <Button marginRight={16} appearance="primary" intent="danger">
                        Stop
                    </Button>
                </div>
            </React.Fragment>
        );
    };

    createOverviewSection = () => {
        return (
            <React.Fragment>
                <Heading size={800} paddingBottom={'0.5em'}> Overview </Heading>
                <div style={{display: "flex", flexDirection: "column", textAlign: "center", paddingBottom: "4em"}}>
                    <Text size={500}><strong>Simulation duration:</strong> 31 minutes 21 seconds </Text>
                    <Text size={500}><strong>Date:</strong> 13-12-2019 </Text>
                    <Text size={500}><strong>Time:</strong> 21:37:12 </Text>
                    <Text size={500}><strong>Active agents:</strong> 13 </Text>
                </div>
            </React.Fragment>
        );
    };

    createPlaceIndicatorSection = () => {
        return (
            <React.Fragment>
                <Heading size={800} paddingBottom={'0.5em'}> Coordinates </Heading>
                <div style={{display: "flex", flexDirection: "column", textAlign: "center", paddingBottom: "4em"}}>
                    <Text size={500}><strong>X Coordinate:</strong> {this.state.xMouseCoordinate} </Text>
                    <Text size={500}><strong>Y Coordinate:</strong> {this.state.yMouseCoordinate} </Text>
                    <Text size={500}><strong>POI:</strong> {this.state.selectedPoi} </Text>
                </div>
            </React.Fragment>
        );
    }

    render() {
        imageMapResize();
        const mapName = 'cracow-map';
        return (
            <Pane display="flex" flexDirection="row">
                <Pane marginLeft="2em" marginRight="2em" width="100%" maxHeight="100%" overflow="auto" flexGrow={1}>
                    <img width="100%" src={cracow} alt="logo" useMap={`#${mapName}`} onMouseMove={(e) => {this.setState({xMouseCoordinate: e.clientX, yMouseCoordinate: e.clientY})}}/>
                    <map name={mapName}>
                        {this.state.pointsOfInterests.map(poi => {
                            return <area key={poi.name}
                                         alt={poi.name}
                                         title={poi.name}
                                         coords={poi.coordinates}
                                         shape={poi.shape}
                                         onMouseEnter={() => {this.setState({selectedPoi: poi.name})}}
                                         onMouseLeave={() => {this.setState({selectedPoi: ""})}}
                            />
                        })}
                    </map>
                </Pane>
                <Pane width={'50%'} marginRight="2em">
                    <div style={{position: "fixed", transform: "translate(-50%,0)", left: "82.5%"}}>
                        {this.createOverviewSection()}
                        {this.createControlSection()}
                        {this.createPlaceIndicatorSection()}
                    </div>
                </Pane>
            </Pane>
        );
    }

}


export default Visualization;
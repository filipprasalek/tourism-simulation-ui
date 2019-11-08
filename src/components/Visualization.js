import React from "react";
import cracow from "../assets/cracow-map.png";
import {Pane, Text, Heading, Button} from "evergreen-ui";

function createOverviewSection() {
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
}

function createControlSection() {
    return (
        <React.Fragment>
            <Heading size={800} paddingBottom={'0.5em'}> Control </Heading>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
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
}

function Visualization() {
    return (
        <Pane display="flex" flexDirection="row">
            <Pane maxHeight="100%" overflow="auto" flexGrow={2}>
                <img style={{width: '90%'}} src={cracow} alt="logo"/>
            </Pane>
            <Pane width={'30%'}>
                <div style={{position: "fixed"}}>
                    {createOverviewSection()}
                    {createControlSection()}
                </div>
            </Pane>
        </Pane>
    );
}

export default Visualization;
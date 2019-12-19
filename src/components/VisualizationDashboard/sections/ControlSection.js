import React from "react";
import {Button, Heading} from "evergreen-ui";

function ControlSection() {
    // TODO: Pass via props
    const startSimulation = () => {
        fetch("http://localhost:5000/simulation/start")
    };
    // TODO: Pass via props
    const stopSimulation = () => {
        fetch("http://localhost:5000/simulation/stop")
    };

    return (
        <React.Fragment>
            <Heading size={800} paddingBottom={'0.5em'}> Control </Heading>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", paddingBottom: "4em"}}>
                <Button appearance="primary" marginRight={16} onClick={startSimulation}>
                    Start
                </Button>
                <Button marginRight={16} appearance="primary" intent="danger" onClick={stopSimulation}>
                    Stop
                </Button>
            </div>
        </React.Fragment>
    );
}

export default ControlSection;
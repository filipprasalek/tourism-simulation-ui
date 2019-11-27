import React from "react";
import {Heading, Text} from "evergreen-ui";

function OverviewSection() {
    return(
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

export default OverviewSection;
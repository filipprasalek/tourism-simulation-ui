import React from "react";
import {Button, Heading} from "evergreen-ui";

function ControlSection() {
    return(
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
}

export default ControlSection;
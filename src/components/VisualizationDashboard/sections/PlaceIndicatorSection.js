import React from "react";
import {Heading, Text} from "evergreen-ui";

function PlaceIndicatorSection(props) {
    return(
        <React.Fragment>
            <Heading size={800} paddingBottom={'0.5em'}> Coordinates </Heading>
            <div style={{display: "flex", flexDirection: "column", textAlign: "center", paddingBottom: "4em"}}>
                <Text size={500}><strong>X Coordinate:</strong> {props.xMouseCoordinate} </Text>
                <Text size={500}><strong>Y Coordinate:</strong> {props.yMouseCoordinate} </Text>
                <Text size={500}><strong>POI:</strong> {props.selectedPoi} </Text>
            </div>
        </React.Fragment>
    );
}

export default PlaceIndicatorSection;
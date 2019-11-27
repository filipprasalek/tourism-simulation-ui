import React from "react";
import {Switch, Route} from "react-router-dom";
import Visualization from "./components/VisualizationDashboard/Visualization";
import Statistics from "./components/Statistics";

function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Visualization}/>
            <Route path="/statistics" component={Statistics}/>
        </Switch>
    );
}

export default Routes;
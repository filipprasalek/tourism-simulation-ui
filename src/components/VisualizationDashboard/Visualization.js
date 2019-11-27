import React from "react";
import cracow from "../../assets/cracow-map.png";
import {Pane} from "evergreen-ui";
import imageMapResize from 'image-map-resizer'
import OverviewSection from "./sections/OverviewSection";
import PlaceIndicatorSection from "./sections/PlaceIndicatorSection";
import ControlSection from "./sections/ControlSection";
import "./styles.css"

class Visualization extends React.Component {

    constructor(props) {
        super(props);
        this.mapName = 'cracow';
        this.state = {
            pointsOfInterests: [],
            xMouseCoordinate: '-',
            yMouseCoordinate: '-',
            selectedPoi: ''
        }
    }

    // TODO: Parametrize
    componentDidMount() {
        fetch('http://localhost:5000/points-of-interests')
            .then((resp) => resp.json())
            .then((pois) => this.setState({pointsOfInterests: pois}, imageMapResize));
        this.initCanvas();
    }

    initCanvas = () => {
        this.canvas.width = this.img.clientWidth;
        this.canvas.height = this.img.clientHeight;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeRect(10, 530, 100, 100);
        this.ctx.fillRect(10, 530, 100, 100);
    };

    renderAreas = () => {
        return this.state.pointsOfInterests.map(poi => {
            return <area key={poi.name}
                         alt={poi.name}
                         title={poi.name}
                         coords={poi.coordinates}
                         shape={poi.shape}
                         onMouseMove={(e) => {
                             this.setState({
                                 selectedPoi: poi.name,
                                 xMouseCoordinate: e.clientX,
                                 yMouseCoordinate: e.clientY
                             })
                         }}
                         onMouseLeave={() => {
                             this.setState({selectedPoi: ""})
                         }}
            />
        });
    };

    render() {
        return (
            <Pane display="flex" flexDirection="row">
                <Pane marginLeft="2em" marginRight="2em" width="100%" maxHeight="100%" overflow="hidden" flexGrow={1}>
                    <div className="container" >
                        <img className="image"
                             width="100%"
                             ref={node => (this.img = node)}
                             src={cracow}
                             alt="logo"
                             useMap={`#${this.mapName}`}
                             onLoad={this.initCanvas}
                             onMouseMove={(e) => this.setState({xMouseCoordinate: e.clientX, yMouseCoordinate: e.clientY})}
                             onMouseLeave={() => this.setState({xMouseCoordinate: '-', yMouseCoordinate: '-'})}
                        />
                        <canvas className="canvas" ref={node => (this.canvas = node)}/>
                        <map name={this.mapName}>
                            {this.renderAreas()}
                        </map>
                    </div>
                </Pane>
                <Pane width={'50%'} marginRight="2em">
                    <div style={{position: "fixed", transform: "translate(-50%,0)", left: "82.5%"}}>
                        <OverviewSection/>
                        <ControlSection/>
                        <PlaceIndicatorSection xMouseCoordinate={this.state.xMouseCoordinate}
                                               yMouseCoordinate={this.state.yMouseCoordinate}
                                               selectedPoi={this.state.selectedPoi}
                        />
                    </div>
                </Pane>
            </Pane>
        );
    }

}


export default Visualization;
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
            pedestriants: [
                {x: 947, y: 759},
                {x: 947, y: 600},
                {x: 947, y: 800},
                {x: 500, y: 480},
                {x: 680, y: 800}
            ],
            xMouseCoordinate: '-',
            yMouseCoordinate: '-',
            selectedPoi: '',
            redrawActivePoi: () => {
            }
        }
    }

    // TODO: Parametrize
    componentDidMount() {
        fetch('http://localhost:5000/points-of-interests')
            .then((resp) => resp.json())
            .then((pois) => this.setState({pointsOfInterests: pois}, imageMapResize));
        this.initCanvas();
        window.addEventListener('resize', this.initCanvas);
        // TODO: Maybe replace with proper componentShouldUpdate
        setInterval(this.initCanvas, 2000)
    }

    drawRect = (coordinates) => {
        let [left, top, right, bot] = coordinates.split(',');
        this.ctx.fillStyle = 'black';
        this.ctx.globalAlpha = 0.4;
        this.ctx.strokeRect(left, top, right - left, bot - top);
        this.ctx.fillRect(left, top, right - left, bot - top);
    };

    drawPoly = (coordinates) => {
        const parsedCoordinates = coordinates.match(/\d+,\d+/g)
        this.ctx.fillStyle = 'black';
        this.ctx.globalAlpha = 0.4;
        this.ctx.beginPath();
        parsedCoordinates.forEach(coords => {
            const [x, y] = coords.split(',');
            this.ctx.lineTo(x, y);
        });
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    };


    drawPedestrians = () => {
        const pedestrianSize = this.img.width / this.img.naturalWidth * 7;
        this.ctx.fillStyle = 'red';
        this.ctx.globalAlpha = 1;
        this.state.pedestriants.forEach(pedestrian => {
            const width = (this.img.width / this.img.naturalWidth) * pedestrian.x;
            const height = (this.img.height / this.img.naturalHeight) * pedestrian.y;
            this.ctx.strokeRect(width, height, pedestrianSize, pedestrianSize);
            this.ctx.fillRect(width, height, pedestrianSize, pedestrianSize);
        });
    };

    onAreaHover = (e, poiName) => {
        this.setState({selectedPoi: poiName});
        let shape = e.target.getAttribute('shape');
        if (shape === 'circle') {
            return;
        }
        shape = shape.substr(0, 1).toUpperCase() + shape.substr(1);
        const coordinates = e.target.getAttribute('coords');
        this.setState({redrawActivePoi: () => this[`draw${shape}`](coordinates)});
        this[`draw${shape}`](coordinates);
    };

    offAreaHover = (e, poiName) => {
        this.setState({
            selectedPoi: '-', redrawActivePoi: () => {
            }
        });
        // TODO: Widen down rectangle
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawPedestrians();
    };

    initCanvas = () => {
        this.canvas.width = this.img.clientWidth;
        this.canvas.height = this.img.clientHeight;
        this.ctx = this.canvas.getContext('2d');
        this.setState({
            pedestriants: this.state.pedestriants.map(it => {
                return {
                    x: (it.x + Math.floor(Math.random() * 10) - 5),
                    y: (it.y + Math.floor(Math.random() * 10) - 5)
                }
            })
        }, this.drawPedestrians);
        // this.drawPedestrians();
        this.state.redrawActivePoi();
    };

    renderAreas = () => {
        return this.state.pointsOfInterests.map(poi => {
            return <area key={poi.name}
                         alt={poi.name}
                         title={poi.name}
                         coords={poi.coordinates}
                         shape={poi.shape}
                         onMouseEnter={(e) => this.onAreaHover(e, poi.name)}
                         onMouseMove={(e) => {
                             this.setState({
                                 xMouseCoordinate: e.clientX,
                                 yMouseCoordinate: e.clientY
                             })
                         }}
                         onMouseLeave={(e) => this.offAreaHover(e, poi.name)}
            />
        });
    };

    render() {
        return (
            <Pane display="flex" flexDirection="row">
                <Pane marginLeft="2em" marginRight="2em" width="100%" maxHeight="100%" overflow="hidden" flexGrow={1}>
                    <div className="container">
                        <img className="image"
                             width="100%"
                             ref={node => (this.img = node)}
                             src={cracow}
                             alt="logo"
                             useMap={`#${this.mapName}`}
                             onLoad={this.initCanvas}
                             onMouseMove={(e) => this.setState({
                                 xMouseCoordinate: e.clientX,
                                 yMouseCoordinate: e.clientY
                             })}
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
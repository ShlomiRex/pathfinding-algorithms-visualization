import React from "react";
import "./ControlPane.css";
class ControlPane extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            delay: 500,
        };
    }
    render() {
        return <div className="controlPaneWrapper">
            <div className="controlPane">
                <button onClick={this.props.app.clearGrid}>Clear Grid</button>
                <div>
                    <span>Select algorithm: </span>
                    <select id="algo_select">
                        <option value="dfs">DFS</option>
                        <option value="bfs">BFS</option>
                        <option value="dijkstra">Dijkstra</option>
                        <option value="a_star">A*</option>
                    </select>
                </div>
                <button onClick={this.props.app.runAlgo}>Run Algorithm</button>
                <div>
                    Delay (ms):
                    <input type="range"
                           id="slider_algo_delay"
                           min="1"
                           max="1000"
                           defaultValue="500"
                           onChange={(event) => {this.setState({delay: event.target.value});}} />
                    <output>{this.state.delay}</output>
                </div>
            </div>
        </div>
    }
}

export default ControlPane;
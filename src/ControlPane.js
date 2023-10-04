import React from "react";
import "./ControlPane.css";
class ControlPane extends React.Component {
    render() {
        return <div className="controlPaneWrapper">
            <div className="controlPane">
                <button onClick={this.props.app.clearGrid}>Clear Grid</button>
                <span>Select algorithm:</span>
                <select id="algo_select">
                    <option value="dfs">DFS</option>
                    <option value="bfs">BFS</option>
                    <option value="dijkstra">Dijkstra</option>
                    <option value="a_star">A*</option>
                </select>
                <button onClick={this.props.app.runAlgo}>Run Algorithm</button>
                <input type="range" id="slider_algo_delay" min="1" max="1000" defaultValue="500" />
                <output>500</output>
            </div>
        </div>
    }
}

export default ControlPane;
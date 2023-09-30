import React, { Component } from 'react';
import Grid from './Grid';
import ContextMenu from './ContextMenu';
import findPathDFS from './algo/DFS';
import './App.css';

const ROWS_COLS = 10;

class App extends Component {
    constructor(props) {
        super(props);

        this.gridRef = React.createRef(); // Create a ref for the Grid component

        this.state = {
            is_running_algo: false
        };
    }

    clearGrid = () => {
        if (this.gridRef.current) {
            this.gridRef.current.clear_grid();
        }
    }

    setStartingPoint = (index) => {
        if (this.gridRef.current) {
            this.gridRef.current.setStartingPoint(index);
        }
    }

    setFinishPoint = (index) => {
        if (this.gridRef.current) {
            this.gridRef.current.setFinishPoint(index);
        }
    }

    runAlgo = () => {
        const algo = document.getElementById("algo_select").value;
        const state = this.gridRef.current.state;
        if (algo === "dfs") {
            this.setState( {is_running_algo: true} , async () => {
                await findPathDFS(
                    state.grid,
                    ROWS_COLS,
                    ROWS_COLS,
                    state.start_index,
                    state.finish_index,
                    this.gridRef.current.algoAccessRequest,
                );
                console.log("Finished");
                this.setState({is_running_algo: false});
            } );
        } else {
            console.log("Unknown algorithm");
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Pathfinding Algorithms Visualizer</h1>
                <p>
                    Made by: Shlomi Domnenko
                    <br></br>
                    Source code: <a href="https://github.com/ShlomiRex/pathfinding-algorithms-visualization">github repo</a>
                </p>
                <div className="buttonPane">
                    <button onClick={this.clearGrid}>Clear grid</button>
                    <div>
                        Select algorithm:
                        <select id="algo_select">
                            <option value="dfs">DFS</option>
                            <option value="bfs">BFS</option>
                            <option value="dijkstra">Dijkstra</option>
                            <option value="a_star">A*</option>
                        </select>
                        <button onClick={this.runAlgo} disabled={this.state.is_running_algo}>Run</button>
                        <button disabled={!this.state.is_running_algo}>Stop</button>
                    </div>
                </div>
                <div className='wrapper'>
                    <div id='customContextmenuArea1' className='customContextmenuArea1' >
                        <ContextMenu
                            targetId='customContextmenuArea1'
                            options={['Set starting point', 'Set finish point']}
                            classes={{
                                listWrapper: 'customContextmenuArea1ListWrapper',
                                listItem: 'customContextmenuArea1ListItem'
                            }}
                            gridSetStartingPoint={this.setStartingPoint}
                            gridSetFinishPoint={this.setFinishPoint}
                        />
                        <Grid ref={this.gridRef} rows_cols={ROWS_COLS} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

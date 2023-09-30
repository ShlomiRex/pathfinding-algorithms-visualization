import React from 'react';
import Grid from './Grid';
import ContextMenu from './ContextMenu';
import findPathDFS from './algo/DFS';
import styled from 'styled-components';
import './App.css';

const ROWS_COLS = 5;

function App() {
    const gridRef = React.createRef();

    function clear_grid() {
        if (gridRef.current) {
            gridRef.current.clear_grid();
        }
    }

    function set_starting_point(index) {
        if (gridRef.current) {
            gridRef.current.setStartingPoint(index);
        }
    }

    function set_finish_point(index) {
        if (gridRef.current) {
            gridRef.current.setFinishPoint(index);
        }
    }

    function run_algo() {
        const algo = document.getElementById("algo_select").value;
        const state = gridRef.current.state;
        if (algo === "dfs") {
            findPathDFS(
                state.grid,
                ROWS_COLS,
                ROWS_COLS,
                state.start_index,
                state.finish_index,
                gridRef.current.algo_accessRequest);
        } else {
            console.log("Unknown algorithm");
        }
    }

    return (
        <div className="App">
            <h1>Pathfinding Algorithms Visualizer</h1>
            <p>
                Made by: Shlomi Domnenko
                <br></br>
                Source code: <a href="https://github.com/ShlomiRex/pathfinding-algorithms-visualization">github repo</a>
            </p>
            <div className="button_pane">
                <button onClick={clear_grid}>Clear grid</button>
                <div>
                     Select algorithm:
                    <select id="algo_select">
                        <option value="dfs">DFS</option>
                        <option value="bfs">BFS</option>
                        <option value="dijakstra">Dijakstra</option>
                        <option value="a_star">A*</option>
                    </select>
                    <button onClick={run_algo}>Run</button>
                    <button disabled={true}>Stop</button>
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
                        gridSetStartingPoint = {set_starting_point}
                        gridSetFinishPoint = {set_finish_point}
                    />
                    <Grid ref={gridRef} rows_cols={ROWS_COLS} />
                </div>
            </div>

        </div>
    );
}

export default App;

import React from 'react';
import Grid from './Grid';
import ContextMenu from './ContextMenu';

import './App.css';


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
                    <select>
                        <option value="bfs">BFS</option>
                        <option value="dfs">DFS</option>
                        <option value="dijakstra">Dijakstra</option>
                        <option value="a_star">A*</option>
                    </select>
                    <button>Run</button>
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
                    <Grid ref={gridRef} />
                </div>
            </div>

        </div>
    );
}

export default App;

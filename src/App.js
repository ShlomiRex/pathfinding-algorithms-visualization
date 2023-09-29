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
            <h1>Color the Grid</h1>
            <div className="button_pane" onClick={clear_grid}>
                <button>Clear grid</button>
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

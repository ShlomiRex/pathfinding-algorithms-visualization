import React from 'react';
import Grid from './Grid';

import './App.css';


function App() {
    // const gridRef = React.createRef();
    //
    // function clear_grid() {
    //     if (gridRef.current) {
    //         gridRef.current.clear();
    //     }
    // }

    return (
        <div className="App">
            <h1>Color the Grid</h1>
            {/*<div className="button_pane" onClick={clear_grid}>*/}
            {/*    <button>Clear grid</button>*/}
            {/*</div>*/}
            {/*<Grid  ref={gridRef} />*/}
            <Grid  />
        </div>
    );
}

export default App;

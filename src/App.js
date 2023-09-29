import React from 'react';
import Grid from './Grid';
import ContextMenu from './ContextMenu';

import './App.css';


function App() {
    const gridRef = React.createRef();

    const handleMenuItemClick = (menuItem) => {
        alert(`Clicked on "${menuItem}"`);
    };

    const menuItems = [
        { label: 'Item 1', onClick: () => handleMenuItemClick('Item 1') },
        { label: 'Item 2', onClick: () => handleMenuItemClick('Item 2') },
        { label: 'Item 3', onClick: () => handleMenuItemClick('Item 3') },
    ];

    function clear_grid() {
        if (gridRef.current) {
            gridRef.current.clear_grid();
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
                    />
                    <Grid  ref={gridRef} />
                </div>
            </div>

        </div>
    );
}

export default App;

import React, { useState } from 'react';
import Tile from './Tile';

var last_tile_mouse_down = -1;
var last_tile_mouse_up = -1;
var is_pressing = false;
var is_coloring_or_erasing = true; // true = coloring, false = erasing

function Grid() {
    const [grid, setGrid] = useState(
        Array(100)
            .fill(false)
            .map((_, index) => ({
                is_colored: false,
                is_start: index === 0,
                is_finish: index === 99,
            }))
    );

    const handleMouseDown = (index) => {
        last_tile_mouse_down = index;
        is_pressing = true;
        is_coloring_or_erasing = !grid[index].is_colored;

        if (grid[index].is_start || grid[index].is_finish) return;

        const newGrid = [...grid];
        newGrid[index].is_colored = is_coloring_or_erasing;
        setGrid(newGrid);
    };

    const handleMouseUp = (index) => {
        last_tile_mouse_up = index;
        is_pressing = false;
    };

    const handleMouseEnter = (index) => {
        if (is_pressing) {
            if (grid[index].is_start || grid[index].is_finish) return;

            const newGrid = [...grid];
            newGrid[index].is_colored = is_coloring_or_erasing;
            setGrid(newGrid);
        }
    }

    return (
        <div className="grid_container">
            {
                grid.map((tile, index) => (
                <Tile
                    key={index}
                    index={index}
                    is_colored={tile.is_colored.toString()}
                    is_start={tile.is_start.toString()}
                    is_finish={tile.is_finish.toString()}
                    onMouseDown={() => handleMouseDown(index)}
                    onMouseUp={() => handleMouseUp(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                />
            ))}
        </div>
    );
}

export default Grid;

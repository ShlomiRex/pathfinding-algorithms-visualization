import React, { useState } from 'react';
import Tile from './Tile';
import styled from 'styled-components';

var last_tile_mouse_down = -1;
var last_tile_mouse_up = -1;
var is_pressing = false;
var already_colored= [];
var is_coloring_or_erasing = true; // true = coloring, false = erasing

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 50px);
  //gap: 2px;
`;

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
        <GridContainer>
            {grid.map((tile, index) => (
                <Tile
                    key={index}
                    is_colored={tile.is_colored}
                    is_start={tile.is_start}
                    is_finish={tile.is_finish}
                    onMouseDown={() => handleMouseDown(index)}
                    onMouseUp={() => handleMouseUp(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                />
            ))}
        </GridContainer>
    );
}

export default Grid;

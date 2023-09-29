import React, { useState } from 'react';
import Tile from './Tile';

var last_tile_mouse_down = -1;
var last_tile_mouse_up = -1;
var is_pressing = false;
var is_coloring_or_erasing = true; // true = coloring, false = erasing


class Grid extends React.Component {
    constructor() {
        super();
        this.state = {
            grid: Array(100)
                .fill(false)
                .map((_, index) => ({
                    is_colored: false,
                    is_start: index === 0,
                    is_finish: index === 99,
                })),
        };
        this.grid = this.state.grid;
    }

    handleMouseDown = (eventData, index) => {
        // Button 0: Left mouse, Button 1: Middle click, Button 2: Right click
        if (eventData.button === 2) {
            return;
        }
        last_tile_mouse_down = index;
        is_pressing = true;
        is_coloring_or_erasing = !this.grid[index].is_colored;

        if (this.grid[index].is_start || this.grid[index].is_finish) return;

        const newGrid = [...this.grid];
        newGrid[index].is_colored = is_coloring_or_erasing;
        this.setState({ grid: newGrid });
    };

    handleMouseUp = (index) => {
        last_tile_mouse_up = index;
        is_pressing = false;
    };

    handleMouseEnter = (index) => {
        if (is_pressing) {
            if (this.grid[index].is_start || this.grid[index].is_finish) return;

            const newGrid = [...this.grid];
            newGrid[index].is_colored = is_coloring_or_erasing;
            this.setState({ grid: newGrid });
        }
    };

    clear_grid = () => {
        // Clear the grid by setting all tiles to uncolored
        const clearedGrid = this.state.grid.map((tile) => ({
            ...tile,
            is_colored: false,
        }));
        this.grid = clearedGrid;
        this.setState({ grid: clearedGrid });
    };

    render() {
        return (
            <div className="grid_container">
                {this.state.grid.map((tile, index) => (
                    <Tile
                        key={index}
                        index={index}
                        is_colored={tile.is_colored.toString()}
                        is_start={tile.is_start.toString()}
                        is_finish={tile.is_finish.toString()}
                        onMouseDown={(eventData) => this.handleMouseDown(eventData, index)}
                        onMouseUp={() => this.handleMouseUp(index)}
                        onMouseEnter={() => this.handleMouseEnter(index)}
                    />
                ))}
            </div>
        );
    }
}



export default Grid;

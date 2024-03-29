import React from 'react';
import Tile from './Tile';

let is_pressing = false;
let is_coloring_or_erasing = true; // true = coloring, false = erasing

class Grid extends React.Component {
    constructor(props) {
        super(props);
        // When we go outside grid with mouseup, it doesn't trigger.
        // So we need to listen to mouseup on window.
        window.addEventListener('mouseup', () => {
            is_pressing = false;
        });

        const rows = this.props.rows_cols;
        const cols = this.props.rows_cols;
        const size = rows * cols;

        // Initialize grid of size 100
        const grid = Array(size)
            .fill(false)
            .map((_, index) => ({
                is_wall: false,
                is_start: index === 0,
                is_finish: index === (size-1),
                is_path: false,
                is_discovered: false,
            }));

        this.state ={
            grid: grid,
            start_index: 0,
            finish_index: (size-1),
            rows_cols: this.props.rows_cols,
            grid_refs: Array(size).fill(React.createRef()),
        };

        // console.log(this.state);
    }

    handleMouseDown = (eventData, index) => {
        // Button 0: Left mouse, Button 1: Middle click, Button 2: Right click
        if (eventData.button === 2) {
            return;
        }

        const tile = this.state.grid[index];

        is_pressing = true;
        is_coloring_or_erasing = !tile.is_wall;

        if (tile.is_start || tile.is_finish || tile.is_path) return;

        tile.is_wall = is_coloring_or_erasing;
        this.setState({ grid: this.state.grid });
    };

    handleTileMouseUp = (index) => {
        is_pressing = false;
    };

    handleTileMouseEnter = (index) => {
        const tile = this.state.grid[index];
        if (is_pressing) {
            if (tile.is_start || tile.is_finish || tile.is_path) return;

            tile.is_wall = is_coloring_or_erasing;
            this.setState({ grid: this.state.grid });
        }
    };

    clear_grid = () => {
        //this.setStartingPoint(0);
        //this.setFinishPoint((this.props.rows_cols*this.props.rows_cols)-1);

        // Clear the grid by setting all tiles to uncolored
        const clearedGrid = this.state.grid.map((tile) => ({
            ...tile,
            is_wall: false,
            is_path: false,
            is_discovered: false,
        }));

        this.setState({ grid: clearedGrid });
    };

    setStartingPoint = (index) => {
        if (this.state.grid[index].is_finish) return;
        this.state.grid[this.state.start_index].is_start = false;
        this.state.start_index = index;
        this.state.grid[index].is_start = true;
        this.setState({ grid: this.state.grid });
    }

    setFinishPoint = (index) => {
        if (this.state.grid[index].is_start) return;
        this.state.grid[this.state.finish_index].is_finish = false;
        this.state.finish_index = index;
        this.state.grid[index].is_finish = true;
        this.setState({ grid: this.state.grid });
    }

    algoAccessRequest = (index) => {
        /**
         * This function is called for each tile that the algorithm wants to access.
         * This function will just color the tile in a different color.
         */
        const tile = this.state.grid[index];
        // const tile_ref = this.state.grid_refs[index];
        // console.log("tile: ", tile);
        // console.log("tile ref: ", tile_ref);
        if (tile.is_start || tile.is_finish) return;

        tile.is_path = true;
        this.setState({ grid: this.state.grid });
    }

    setTileDiscovered = (index) => {
        /**
         * This function is called for each tile that the algorithm discovered (neighbor).
         * This function will just color the tile in a different color.
         */
        const tile = this.state.grid[index];
        if (tile.is_start || tile.is_finish) return;

        tile.is_discovered = true;
        this.setState({ grid: this.state.grid });
    }

    render() {
        return (
            <div
                className="grid_container"
                onMouseLeave={this.handleGridMouseLeave}
                style={{ gridTemplateColumns: `repeat(${this.props.rows_cols}, 1fr)` }}
            >
                {this.state.grid.map((tile, index) => (
                    <Tile
                        key={index}
                        index={index}
                        ref={input => (this.state.grid_refs[index] = input)}
                        is_wall={tile.is_wall.toString()}
                        is_start={tile.is_start.toString()}
                        is_finish={tile.is_finish.toString()}
                        is_path={tile.is_path.toString()}
                        is_discovered={tile.is_discovered.toString()}
                        onMouseDown={(eventData) => this.handleMouseDown(eventData, index)}
                        onMouseUp={() => this.handleTileMouseUp(index)}
                        onMouseEnter={() => this.handleTileMouseEnter(index)}
                    />
                ))}
            </div>
        );
    }
}



export default Grid;

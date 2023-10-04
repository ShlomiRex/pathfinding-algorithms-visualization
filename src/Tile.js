import React, {Component } from 'react';

class Tile extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            index,
            is_wall,
            is_start,
            is_finish,
            is_path,
            is_discovered,
            onMouseDown,
            onMouseUp,
            onMouseEnter,
        } = this.props;

        return (
            <div
                className="Tile"
                index={index}
                // rows_cols={rows_cols}
                is_wall={is_wall}
                is_start={is_start}
                is_finish={is_finish}
                is_path={is_path}
                is_discovered={is_discovered}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseEnter={onMouseEnter}
            >
                {/*TODO: Remove after debugging algos*/}
                <span>
                    {index}
                </span>
            </div>
        );
    }
}

export default Tile;

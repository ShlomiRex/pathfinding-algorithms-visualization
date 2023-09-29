import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const TileContainer = styled.div`
  ${(props) =>
          props.index < 90 &&
          css`
            border-bottom: none;
          `}
`;

class Tile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: props.index,
        }
    }

    render() {
        const {
            index,
            is_colored,
            is_start,
            is_finish,
            onMouseDown,
            onMouseUp,
            onMouseEnter,
        } = this.props;

        return (
            <TileContainer
                className="Tile"
                index={index}
                is_colored={is_colored}
                is_start={is_start}
                is_finish={is_finish}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseEnter={onMouseEnter}
            >
                {/*TODO: Remove after debugging algos*/}
                <span>
                    {index}
                </span>
            </TileContainer>
        );
    }
}

export default Tile;

import React from 'react';
import styled, { css } from 'styled-components';

const TileContainer = styled.div`
  ${(props) =>
          props.index < 90 &&
          css`
            border-bottom: none;
  `}
`;

function Tile({index, is_colored, is_start, is_finish, onMouseDown, onMouseUp, onMouseEnter}) {
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
        />
    );
}

export default Tile;

import React from 'react';
import styled, { css } from 'styled-components';

const TileContainer = styled.div`
  ${(props) =>
          props.is_start === "true" &&
          css`
            background-color: green;
          `}

  ${(props) =>
          props.is_finish === "true" &&
          css`
            background-color: red;
          `}
`;

function Tile({ is_colored, is_start, is_finish, onMouseDown, onMouseUp, onMouseEnter }) {
    return (
        <TileContainer
            className="Tile"
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

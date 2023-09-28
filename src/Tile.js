import React from 'react';
import styled, { css } from 'styled-components';

const TileContainer = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${(props) => (props.is_colored ? 'blue' : 'white')};
  border: 1px solid black;
  cursor: pointer;
  user-select: none;
  -webkit-user-drag: none;
  
  ${(props) =>
          props.is_start &&
          css`
            background-color: green;
          `}

  ${(props) =>
          props.is_finish &&
          css`
            background-color: red;
          `}
`;

function Tile({ is_colored, is_start, is_finish, onMouseDown, onMouseUp, onMouseEnter }) {
    return (
        <TileContainer
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

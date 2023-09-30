const SLEEP_TIME = 50;

function getNeighbors(grid, index, rows, columns) {
    /**
     * Get the neighbors of the given index
     * @param {Array} grid The grid
     * @param {number} index The index to get the neighbors of
     * @param {number} rows The number of rows in the grid
     * @param {number} columns The number of columns in the grid
     */

    // Initialize the neighbors array
    let neighbors = [];

    // Get the row and column of the index
    const row = Math.floor(index / columns);
    const column = index % columns;

    // Check if the index has a neighbor above
    if (row > 0) {
        neighbors.push(index - columns);
    }

    // Check if the index has a neighbor below
    if (row < rows - 1) {
        neighbors.push(index + columns);
    }

    // Check if the index has a neighbor to the left
    if (column > 0) {
        neighbors.push(index - 1);
    }

    // Check if the index has a neighbor to the right
    if (column < columns - 1) {
        neighbors.push(index + 1);
    }

    return neighbors;
}

function is_valid(grid, index, rows, columns, visited) {
    /**
     * Check if the given index is valid
     * @param {Array} grid The grid
     * @param {number} index The index to check
     * @param {number} rows The number of rows in the grid
     * @param {number} columns The number of columns in the grid
     * @param {Array} visited An array of booleans that represent if a tile was visited or not
     */

    // Check if within bounds
    if (index < 0 || index >= rows * columns) {
        return false;
    }

    // If visited this is not valid
    if (visited[index]) {
        return false;
    }

    // If wall, not valid
    if (grid[index].is_colored === true) {
        return false;
    }

    // If start or finish, not valid
    if (grid[index].is_start === true || grid[index].is_finish === true) {
        return false;
    }

    return true;
}

export default async function findDFSPath(grid,
                                    rows,
                                    columns,
                                    start_index,
                                    finish_index,
                                    grid_accessRequest_callback) {
    // Implement DFS algorithm
    // Return an array of indexes that represent the path
    // If no path exists, return an empty array

    // Initialize the stack
    let stack = [];
    stack.push(start_index);

    // Initialize the visited array (auxiliary array)
    let visited = [];
    for (let i = 0; i < rows * columns; i++) {
        visited.push(false);
    }

    // Initialize the path array
    let path = [];

    // Initialize the found variable
    let found = false;

    // Run the algorithm
    while (stack.length > 0 && !found) {
        // Get the current index
        let current_index = stack.pop();
        grid_accessRequest_callback(current_index);
        await new Promise(r => setTimeout(r, SLEEP_TIME));

        // console.log("Current index: ", current_index);

        // Check if the current index is the finish index
        if (current_index === finish_index) {
            found = true;
            break;
        }

        // Get cells adjacent to the current cell
        const neighbors = getNeighbors(grid, current_index, rows, columns);

        const valid_neighbors = [];
        for (let i = 0; i < neighbors.length; i++) {
            // Check each neighbor
            const neighbor = neighbors[i];

            // Check if finish
            if (neighbor === finish_index) {
                path.push(neighbor);
                found = true;
                break;
            }

            // Check valid
            const isValid = is_valid(grid, neighbor, rows, columns, visited);

            if (isValid) {
                // Add the neighbor index to the path
                path.push(neighbor);
                stack.push(neighbor);
                valid_neighbors.push(neighbor);
            }

            // Mark the current index as visited
            visited[current_index] = true;
        }
        // console.log("Valid neighbors: ", valid_neighbors);
    }

    if (found) {
        console.log("Path found");
        // Show path
        // for (let i = 0; i < path.length; i++) {
        //     const index = path[i];
        //     console.log(index);
        //     grid_accessRequest_callback(index);
        //     await new Promise(r => setTimeout(r, SLEEP_TIME));
        // }
    } else {
        console.log("No path found");
    }

    return path;
}
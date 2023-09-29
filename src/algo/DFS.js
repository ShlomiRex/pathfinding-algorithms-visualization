// Implement getNeighbors function
function getNeighbors(grid, index, rows, columns) {
    // Return an array of indexes that represent the neighbors of the given index
    // The neighbors are the indexes of the tiles that are above, below, left and right of the given index
    // If the given index is on the edge of the grid, the neighbors that are outside of the grid are not included in the array
    // If the given index is on the corner of the grid, the neighbors that are outside of the grid are not included in the array

    let neighbors = [];

    // Check if the index is on the top edge of the grid
    if (index >= 0 && index < columns) {
        // The index is on the top edge of the grid
        // Do not include the top neighbor

        // Check if the index is on the left edge of the grid
        if (index % columns === 0) {

        }
    }
}

export default function findDFSPath(grid, rows, columns, start_index, finish_index) {
    // Implement DFS algorithm
    // Return an array of indexes that represent the path
    // If no path exists, return an empty array

    // Initialize the stack
    let stack = [];
    stack.push(start_index);

    // Initialize the visited array
    let visited = [];
    for (let i = 0; i < rows * columns; i++) {
        visited.push(false);
    }

    // Initialize the parent array
    let parent = [];
    for (let i = 0; i < rows * columns; i++) {
        parent.push(-1);
    }

    // Initialize the path array
    let path = [];

    // Initialize the found variable
    let found = false;

    // Run the algorithm
    while (stack.length > 0) {
        // Get the current index
        let current_index = stack.pop();

        // Check if the current index is the finish index
        if (current_index === finish_index) {
            found = true;
            break;
        }

        // Check if the current index is already visited
        if (visited[current_index]) {
            continue;
        }

        // Mark the current index as visited
        visited[current_index] = true;

        // Get the neighbors of the current index
        let neighbors = getNeighbors(current_index, rows, columns);

        // Add the neighbors to the stack
        for (let i = 0; i < neighbors.length; i++) {
            if (visited[neighbors[i]]) {
                continue;
            }
            stack.push(neighbors[i]);
            parent[neighbors[i]] = current_index;
        }
    }

    // If a path was found, reconstruct the path
    if (found) {
        let current_index = finish_index;
        while (current_index !== -1) {
            path.push(current_index);
            current_index = parent[current_index];
        }
        path.reverse();
    }

    return path;
}
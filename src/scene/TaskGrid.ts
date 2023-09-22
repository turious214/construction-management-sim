/*The final version of this document must include:
- Task class (Test version Done)
- function returning the size of the grid given a list of tasks (Done pending function for number of rows)
- function returning a 2 dimensional array specifying where each task should be placed in the grid (Done)
*/

import Task from "../gameobject/Task.ts";

/************************UTILITY FUNCTIONS********************************/

//function that returns the size of the longest chain of tasks using recursion
function longestChain(tasks: Task[]): number {
    let longestChainSize = 0;
    tasks.forEach((task: Task) => {
        const chainSize = longestChainHelper(task);
        longestChainSize = Math.max(longestChainSize, chainSize);
    });
    return longestChainSize;
}

//helper function that returns the size of the longest chain of tasks using recursion
function longestChainHelper(task: Task): number {
    let longestChainSize = 0;
    task.nextTasks.forEach((nextTask: Task) => {
        const chainSize = longestChainHelper(nextTask);
        longestChainSize = Math.max(longestChainSize, chainSize);
    });
    return 1 + longestChainSize;
}

//Consider the degree of a task to be the number of previous tasks of a task. 

//HARD CODED - Function that return the max number of tasks that have the same degree given a list of tasks of degree 0
// @ts-ignore
function maxNumOfTheSameDegree(tasks: Task[]): number {
    return 6;

}

/**********************************************************************/

/***************FUNCTION RETURNING THE SIZE OF THE GRID ******************/

function getGridSize(tasks: Task[]) {
    const gridSize = {
        x: longestChain(tasks),
        y: maxNumOfTheSameDegree(tasks)
    };
    return gridSize;
}

/**********************************************************************/

/***************FUNCTION RETURNING THE GRID ITSELF****************************/

class Row { 
    value: number;
    constructor(value: number) {
        this.value = value;
    }
};

function getGrid(tasks: Task[]) {
    const gridSize = getGridSize(tasks);
    let grid: number[][] = Array(gridSize.y).fill(null).map(() => Array(gridSize.x).fill(-1));
    
    let current_x = 0;
    let current_y = new Row(0)

    allocateTasks(tasks, current_x, current_y, grid);
    return grid;
}

function allocateTasks(tasks: Task[], current_x: number, current_y: Row, grid: number[][]) {
    // @ts-ignore
    let i = 0
    let saved_y = current_y.value
    tasks.forEach((task: Task) => {
        console.log(current_y.value, current_x , '--->' + task.taskID);
        grid[current_y.value][current_x] = task.taskID;
        if (task.nextTasks.length > 0) {
            allocateTasks(task.nextTasks, current_x + 1, current_y, grid);
        }
        current_y.value ++
    });
    current_y.value = saved_y + tasks.length - 1
}

/**************************************************************************/


/************************ SIMPLE TEST **********************************/

const task1 = new Task(1, "dummy task", null);
const task2 = new Task(2, "dummy task", null);
const task3 = new Task(3, "dummy task", null);
const task4 = new Task(4, "dummy task", null);
const task5 = new Task(5, "dummy task", null);
const task6 = new Task(6, "dummy task", null);
const task7 = new Task(7, "dummy task", null);
const task8 = new Task(8, "dummy task", null);
const task9 = new Task(9, "dummy task", null);
const task10 = new Task(10, "dummy task", null);
const task11 = new Task(11, "dummy task", null);
const task12 = new Task(12, "dummy task", null);

task1.nextTasks = task1.nextTasks.concat(task2);
task1.nextTasks = task1.nextTasks.concat(task3);
task2.nextTasks = task2.nextTasks.concat(task4);
task2.nextTasks = task2.nextTasks.concat(task5);
task3.nextTasks = task3.nextTasks.concat(task6);
task3.nextTasks = task3.nextTasks.concat(task8);
task3.nextTasks = task3.nextTasks.concat(task9);
task4.nextTasks = task4.nextTasks.concat(task7);
task7.nextTasks = task7.nextTasks.concat(task10);
task6.nextTasks = task6.nextTasks.concat(task11);
task3.nextTasks = task3.nextTasks.concat(task12);

const tasks = [task1];
console.log(getGridSize(tasks)) //Should return 5, 6

//const gridSize = getGridSize(tasks);
//let grid: number[][] = Array(gridSize.y).fill(null).map(() => Array(gridSize.x).fill(-1));

let grid = getGrid(tasks);

grid.forEach((row: number[]) => {
    console.log(row + '\n');
});

/************************************************************************************/
/*The final version of this document must include:
- Task class (Test version Done)
- function returning the size of the grid given a list of tasks (Done pending function for number of rows)
- function returning a 2 dimensional array specifying where each task should be placed in the grid (Done)
*/

/************************ TASK CLASS ********************************/
//Task class with int id and a list of next tasks
class Task {
    id: number;
    nextTasks: Task[];

    constructor(id: number) {
        this.id = id;
        this.nextTasks = [];
    }

    addNextTask(task: Task) {
        this.nextTasks.push(task);
    }
}
/**********************************************************************/

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
        console.log(current_y.value, current_x , '--->' + task.id);
        grid[current_y.value][current_x] = task.id;
        if (task.nextTasks.length > 0) {
            allocateTasks(task.nextTasks, current_x + 1, current_y, grid);
        }
        current_y.value ++
    });
    current_y.value = saved_y + tasks.length - 1
}

/**************************************************************************/


/************************ SIMPLE TEST **********************************/

const task1 = new Task(1);
const task2 = new Task(2);
const task3 = new Task(3);
const task4 = new Task(4);
const task5 = new Task(5);
const task6 = new Task(6);
const task7 = new Task(7);
const task8 = new Task(8);
const task9 = new Task(9);
const task10 = new Task(10);
const task11 = new Task(11);
const task12 = new Task(12);

task1.addNextTask(task2);
task1.addNextTask(task3);
task2.addNextTask(task4);
task2.addNextTask(task5);
task3.addNextTask(task6);
task3.addNextTask(task8);
task3.addNextTask(task9);
task4.addNextTask(task7);
task7.addNextTask(task10);
task6.addNextTask(task11);
task3.addNextTask(task12);

const tasks = [task1];
console.log(getGridSize(tasks)) //Should return 5, 6

//const gridSize = getGridSize(tasks);
//let grid: number[][] = Array(gridSize.y).fill(null).map(() => Array(gridSize.x).fill(-1));

let grid = getGrid(tasks);

grid.forEach((row: number[]) => {
    console.log(row + '\n');
});

/************************************************************************************/
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
  
  //Consider the degree of a task the number of previous tasks of a task. Code a function that return the max number of tasks that have the same degree. For example if there are 1 task of degree 0, 2 tasks of degree 1, 5 tasks of degree 2 and 1 task of degree 1 it should return 5;
  function maxNumOfTheSameDegree(tasks: Task[]): number {
    let maxNumOfTheSameDegree = 0;
    const degrees: number[] = [];
    tasks.forEach((task: Task) => {
      const degree = maxNumOfTheSameDegreeHelper(task);
      degrees[degree] = degrees[degree] ? degrees[degree] + 1 : 1;
      maxNumOfTheSameDegree = Math.max(maxNumOfTheSameDegree, degrees[degree]);
    });
    return maxNumOfTheSameDegree;
  }
  
  //helper function that returns the degree of a task using recursion
  function maxNumOfTheSameDegreeHelper(task: Task): number {
    let maxNumOfTheSameDegree = 0;
    task.nextTasks.forEach((nextTask: Task) => {
      const degree = maxNumOfTheSameDegreeHelper(nextTask);
      maxNumOfTheSameDegree = Math.max(maxNumOfTheSameDegree, degree);
    });
    return 1 + maxNumOfTheSameDegree;
  }

  function getGridSize(tasks: Task[]) {
    const gridSize = {
      x: longestChain(tasks),
      y: maxNumOfTheSameDegree(tasks)
    };
    return gridSize;
  }
  
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
  
  
  const tasks = [task1, task2, task3, task4, task5, task6, task7, task8, task9, task10, task11, task12];

  console.log(getGridSize(tasks)) //Should return 5, 6  
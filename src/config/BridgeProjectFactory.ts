import ProjectFactory from "./ProjectFactory.js";
// import Project from "../gameobject/project/Project.js";
// import Weather from "../gameobject/Weather.js";
// import Task from "../gameobject/Task.js";
// import RiskManagementTool from "../gameobject/RiskManagementTool.js";
// import Material from "../gameobject/material/Material.js";
// import Contractor from "../gameobject/contractor/Contractor.js";
// import Week from "../gameobject/Week.js";
import Project from "../gameobject/project/Project.ts";
import Task from "../gameobject/Task.ts";

export default class BridgeProjectFactory implements ProjectFactory {

    constructor() {}



    // @ts-ignore
    manufactureProject(path: string): Project {
        // @ts-ignore
        const data = require('../../assets/project/bridge1.json');

        // TEST ONLY - START //
        // console.log(data.tasks);
        // TEST ONLY - END //
        return null;

    }

    createTasks(data: any): Map<number, Task> {
        const jsonTasks = data.tasks;
        const tasks: Map<number, Task> = new Map();


        // read JSON array backwards as next depends on previous task in specified JSON file
        for (let i: number = jsonTasks.length - 1; i >= 0; i--) {
            const jsonTask = jsonTasks[i];


            // connect task to existing task
            const linkedTasks: Task[] = [];

            // find tasks that are linked to this one
            for (const tID of jsonTask.nextTasks) {
                // add task to linkedTasks
                if (tasks.get(tID)) {
                    linkedTasks.push(tasks.get(tID));
                }
                // console.log(tID);
            }

            const task: Task = new Task(jsonTask.taskID, jsonTask.description, linkedTasks);
            tasks.set(task.taskID, task);

        }
        return tasks;

    };
    // createContractors(data): Map<number, Contractor> {}
    // createMaterials(data): Map<string, Material> {}
    // createWeeks(data): Week[] {
    //
    // }
    // createRiskMitigationTools(data): Map<string, RiskManagementTool> {}
    // createEvents(data): Map<number, Event> {}


}
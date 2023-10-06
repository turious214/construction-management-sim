import ProjectFactory from "./ProjectFactory.ts";
import Week from "../gameobject/Week.ts";
import Project from "../gameobject/project/Project.ts";
import Task from "../gameobject/Task.ts";
import Contractor from "../gameobject/contractor/Contractor.ts";
import {ContractorType} from "../gameobject/contractor/ContractorType.ts";
import Material from "../gameobject/material/Material.ts";
import RiskManagementTool from "../gameobject/RiskManagementTool.ts";
import Event from "../gameobject/event/Event.ts"
import BridgeProject from "../gameobject/project/BridgeProject.ts";
import BridgeData from "../../assets/project/Bridge.ts";



export default class BridgeProjectFactory implements ProjectFactory {

    constructor() {}

    // @ts-ignore
    manufactureProject(projectName: string): Project {
        // @ts-ignore
        // const data = require(projectName);
        let data;
        try {
            data = JSON.parse(BridgeData)[`${projectName}`];
        } catch (error) {
            if (error instanceof SyntaxError) {
                console.log('SyntaxError: Detected invalid JSON syntax');
            }

        }

        // console.log(data);


        // create tasks
        const tasks: Map<number, Task> = this.createTasks(data);

        // create contractors
        const contractors: Map<number, Contractor> = this.createContractors(data);

        // create materials
        const materials: Map<string, Material> = this.createMaterials(data);

        // create Events
        const events: Map<number, Event> = this.createEvents(data);

        // create RiskManagementTools
        const riskManagementTools: Map<string, RiskManagementTool> = this.createRiskManagementTools(data, events);

        // create Weeks
        const weeks: Week[] = this.createWeeks(data, events);

        // INTERNAL TESTING ONLY - START //

        // console.log(tasks);

        // console.log(contractors);

        // console.log(materials);

        // console.log(events);

        // console.log(riskManagementTools);

        // console.log(weeks);

        // INTERNAL TESTING ONLY - END //

        const project: Project = new BridgeProject(data.funds, tasks, weeks,
            contractors, materials, events, riskManagementTools);

        return project;

    }

    createTasks(data: any): Map<number, Task> {
        const jsonTasks = data.tasks;
        const tasks: Map<number, Task> = new Map();


        // read JSON array backwards as next depends on previous task in specified JSON file
        for (let i: number = jsonTasks.length - 1; i >= 0; i--) {
            const jsonTask = jsonTasks[i];

            const nextTasks = jsonTask.nextTasks;


            // connect task to existing task
            const linkedTasks: Task[] | null = [];

            // find tasks that are linked to this one
            for (let j: number = 0; j < nextTasks.length; j++) {
                const tID = jsonTasks[j]

                const task: Task | undefined = tasks.get(tID)

                // add task to linkedTasks
                if (task) {
                    linkedTasks.push(task);
                }
                // console.log(tID);
            }

            const task: Task = new Task(jsonTask.taskID, jsonTask.description, linkedTasks);
            tasks.set(task.taskID, task);

        }
        return tasks;

    };
    createContractors(data: any): Map<number, Contractor> {
        const jsonContractors = data.contractors;
        const contractors: Map<number, Contractor> = new Map();

        for (let i: number = 0; i < jsonContractors.length; i++) {
            const jsonContractor = jsonContractors[i];

            // error finding - do later
            // match contractortype to enums
            // if (contractorTypes.find(jsonContractorType.toUpperCase())) {
            //     return
            // }

            const contractor: Contractor = new Contractor(jsonContractor.contractorID, jsonContractor.type, jsonContractor.rate,
                jsonContractor.performance, jsonContractor.experience, jsonContractor.safety, jsonContractor.discipline);

            contractors.set(contractor.contractorID, contractor);

        }

        return contractors;

    }

    createMaterials(data: any): Map<string, Material> {
        const jsonMaterials = data.materials;
        const materials: Map<string, Material> = new Map();

        const materialTypes: string[] = Object.keys(ContractorType).filter((entry) => {
            return isNaN(Number(entry));
        });

        for (let i: number = 0; i < jsonMaterials.length; i++) {
            const jsonMaterial = jsonMaterials[i];

            // error finding - do later
            // match contractortype to enums
            // if (contractorTypes.find(jsonContractorType.toUpperCase())) {
            //     return
            // }

            const material: Material = new Material(jsonMaterial.name, jsonMaterial.category, jsonMaterial.price, jsonMaterial.quantity);
            materials.set(material.name, material)

        }

        return materials;
    }


    createEvents(data: any): Map<number, Event> {
        const jsonEvents = data.events;
        const events: Map<number, Event> = new Map();

        for (let i: number = 0; i < jsonEvents.length; i++) {
            const jsonEvent = jsonEvents[i];

            const event: Event = new Event(jsonEvent.eventID, jsonEvent.description, jsonEvent.occurrenceRate, jsonEvent.fundsMod, jsonEvent.timeMod)
            events.set(event.eventID, event);
        }

        return events;
    }

    createRiskManagementTools(data: any, events: Map<number, Event>): Map<string, RiskManagementTool> {
        const jsonRiskManagementTools = data.riskManagementTools;
        const riskManagementTools: Map<string, RiskManagementTool> = new Map();

        for (let i: number = 0; i < jsonRiskManagementTools.length; i++) {
            const jsonRMT = jsonRiskManagementTools[i];

            // find corresponding events
            const event: Event | undefined = events.get(jsonRMT.event);
            if (event) {
                const riskManagementTool: RiskManagementTool = new RiskManagementTool(jsonRMT.name, jsonRMT.price, jsonRMT.uses, event, jsonRMT.rateMod, jsonRMT.fundsMod, jsonRMT.timeMod)
                riskManagementTools.set(riskManagementTool.name, riskManagementTool);
            }
        }
        return riskManagementTools;

    }

    createWeeks(data: any, allEvents: Map<number, Event>): Week[] {
        const jsonWeeks = data.weeks;
        const weeks: Week[] = [];

        for (let i: number = 0; i < jsonWeeks.length; i++) {
            const jsonWeek = jsonWeeks[i];
            const weekEvents: Map<number, Event> = new Map();

            // add events from allEvents
            for (const eID of jsonWeek.events) {
                const event: Event | undefined = allEvents.get(eID);
                if (event) {
                    weekEvents.set(eID, event);
                }
            }

            // @ts-ignore
            // potential issue
            const week: Week = new Week(jsonWeek.weekID, jsonWeek.weatherForecast, jsonWeek.narration, weekEvents);
            weeks.push(week);


        }

        return weeks;

    }

}
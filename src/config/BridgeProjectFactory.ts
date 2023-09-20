import ProjectFactory from "./ProjectFactory.ts";
import Week from "../gameobject/Week.ts";
import Project from "../gameobject/project/Project.ts";
import Task from "../gameobject/Task.ts";
import Contractor from "../gameobject/contractor/Contractor.ts";
import {ContractorType, stringToEnumContractorType} from "../gameobject/contractor/ContractorType.ts";
import Material from "../gameobject/material/Material.ts";
import {MaterialCategory, stringToEnumMaterialCategory} from "../gameobject/material/MaterialCategory.ts";
import RiskManagementTool from "../gameobject/RiskManagementTool.ts";
import Event from "../gameobject/event/Event.ts"
import {stringToEnumWeather, Weather} from "../gameobject/Weather.ts";


export default class BridgeProjectFactory implements ProjectFactory {

    constructor() {}



    // @ts-ignore
    manufactureProject(path: string): Project {
        // @ts-ignore
        const data = require('../../assets/project/bridge1.json');

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
    createContractors(data: any): Map<number, Contractor> {
        const jsonContractors = data.contractors;
        const contractors: Map<number, Contractor> = new Map();

        const contractorTypes: string[] = Object.keys(ContractorType).filter((entry) => {
            return isNaN(Number(entry));
        });

        for (let i: number = 0; i < jsonContractors.length; i++) {
            const jsonContractor = jsonContractors[i];

            const jsonContractorType = jsonContractor.type;

            // retrieve corresponding ContractorType enum
            const cTypeEnum: ContractorType = stringToEnumContractorType(jsonContractorType);



            // error finding - do later
            // match contractortype to enums
            // if (contractorTypes.find(jsonContractorType.toUpperCase())) {
            //     return
            // }

            const contractor: Contractor = new Contractor(jsonContractor.contractorID, cTypeEnum, jsonContractor.rate,
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

            const jsonMaterialCategory = jsonMaterial.category;

            // retrieve corresponding ContractorType enum
            const mTypeEnum: MaterialCategory = stringToEnumMaterialCategory(jsonMaterialCategory);



            // error finding - do later
            // match contractortype to enums
            // if (contractorTypes.find(jsonContractorType.toUpperCase())) {
            //     return
            // }

            const material: Material = new Material(jsonMaterial.name, mTypeEnum, jsonMaterial.price, jsonMaterial.quantity);
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
            jsonEvent.set(event.eventID, event);
        }

        return events;
    }

    createRiskManagementTools(data: any, events: Map<number, Event>): Map<string, RiskManagementTool> {
        const jsonRiskManagementTools = data.contractors;
        const riskManagementTools: Map<string, RiskManagementTool> = new Map();

        for (let i: number = 0; i < jsonRiskManagementTools.length; i++) {
            const jsonRMT = jsonRiskManagementTools[i];

            // find corresponding events
            const riskManagementTool: RiskManagementTool = new RiskManagementTool(jsonRMT.name, jsonRMT.price, jsonRMT.uses , events.get(jsonRMT.event) ,jsonRMT.rateMod, jsonRMT.fundsMod, jsonRMT.timeMod)
        }
        return riskManagementTools;

    }

    createWeeks(data: any, allEvents: Map<number, Event>): Week[] {
        const jsonWeeks = data.weeks;
        const weeks: Week[] = [];

        for (let i: number = 0; i < jsonWeeks.length; i++) {
            const jsonWeek = jsonWeeks[i];
            const weekEvents: Map<number, Event> = new Map();

            const weatherForecast: Weather[] = [];

            // match weather string to enum
            for (const weather in jsonWeek.weatherForecast) {
                const wEnum: Weather = stringToEnumWeather(weather);
                weatherForecast.push(wEnum);
            }


            // add events from allEvents
            for (const eID of jsonWeek.events) {
                weekEvents.set(eID, allEvents.get(eID));
            }

            // @ts-ignore
            // potential issue
            const week: Week = new Week(jsonWeek.weekID, weatherForecast, jsonWeek.narration, weekEvents);
            weeks.push(week);


        }

        return weeks;

    }

}
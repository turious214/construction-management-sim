import ProjectFactory from "./ProjectFactory.js";
import Project from "../gameobject/project/Project.js";
import Weather from "../gameobject/Weather.js";
import Task from "../gameobject/Task.js";
import RiskMitigationTool from "../gameobject/RiskMitigationTool.js";
import Material from "../gameobject/material/Material.js";
import Contractor from "../gameobject/contractor/Contractor.js";

export default class BridgeProjectFactory implements ProjectFactory {

    constructor() {}

    manufactureProject(path: string): Project {

    }
    createWeather(): Weather[] {
    }
    createTasks(): Map<number, Task> {};
    createContractors(): Map<number, Contractor> {}
    createMaterials(): Map<string, Material> {}
    createWeeks(): Week[] {}
    createRiskMitigationTools(): Map<string, RiskMitigationTool> {}
    createEvents(): Map<number, Event> {}














}
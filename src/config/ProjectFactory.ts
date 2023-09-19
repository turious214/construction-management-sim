import Project from "../gameobject/project/Project.js";

export default interface ProjectFactory {
    manufactureProject(path: string): Project;


}
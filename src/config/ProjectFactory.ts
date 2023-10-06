import Project from "../gameobject/project/Project.ts";

export default interface ProjectFactory {
    manufactureProject(projectName: string): Project;


}
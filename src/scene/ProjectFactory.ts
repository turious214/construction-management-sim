//Create a interface called project factory with one method called manufacture project
import { Project } from './Project.js';

export interface ProjectFactory {
    manufactureProject(): Project;
}
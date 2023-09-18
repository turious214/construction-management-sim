//class that implements a project factory
import { ProjectFactory } from './scene/ProjectFactory';

export class BridgeFactory implements ProjectFactory {
    
    //private variable of class bridge project
    private bridgeProject: BridgeProject;
    
    //method that returns a project
    manufactureProject(): Project {
        return new Bridge();
    }
}
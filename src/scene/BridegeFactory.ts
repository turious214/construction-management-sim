//class that implements a project factory

export class BridgeFactory implements ProjectFactory {
    
    //private variable of class bridge project
    private bridgeProject: BridgeProject;
    
    //method that returns a project
    manufactureProject(): Project {
        return new Bridge();
    }
}
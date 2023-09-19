import Task from "../Task.js";
import Week from "../Week.js";
import Contractor from "../contractor/Contractor.js";
import Material from "../material/Material.js";
import Event from "../event/Event.js";
import RiskMitigationTool from "../RiskMitigationTool.js";

export default interface Project {
    get funds();

    set funds(value: number);

    get tasks(): Map<number, Task>;

    set tasks(value: Map<number, Task>)

    get weeks(): Week[];

    set weeks(value: Week[]);

    get contractors(): Map<number, Contractor>;

    set contractors(value: Map<number, Contractor>);

    get materials(): Map<string, Material>;

    set materials(value: Map<string, Material>);

    get events(): Map<number, Event>;

    set events(value: Map<number, Event>);

    get riskMitigationTools(): Map<string, RiskMitigationTool>;

    set riskMitigationTools(value: Map<string, RiskMitigationTool>);
}
/*
interface with all of these methods:
+ getFunds(): double
+ getTasks(): Map<taskID: int, task: Task>
+ getWeeks(): Map<weekNumber: int, week: Week>
+ getContractors(): Map<contractorID: int, contractor: Contractor>
+ getMaterials: Map<materialID: int, material: Material>
+ getRiskMitigationTools: Map<riskMitigationToolID: int, riskMitigationTool: RiskMitigationTool>

*/

export default interface Project {
    getFunds(): number;
    getTasks(): Map<number, Task>;
    getWeeks(): Map<number, Week>;
    getContractors(): Map<number, Contractor>;
    getMaterials(): Map<number, Material>;
    getRiskMitigationTools(): Map<number, RiskMitigationTool>;
}

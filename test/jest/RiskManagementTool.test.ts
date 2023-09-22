import {expect} from '@jest/globals';
import {fc, test} from '@fast-check/jest';
import RiskManagementTool from "../../src/gameobject/RiskManagementTool";

// describe ('', () => {
//     test('', () => {
//         const material: Material = new Material(null, null, null, null);
//
//         fc.assert(
//             fc.property(fc.asciiString(), s => {
//
//                 // recast to String
//                 const testName: string = String(s)
//                 material.name = testName;
//                 expect(material.name).toEqual(testName);
//             })
//         );
//     });
// });

describe ('RiskManagementTool PBT', () => {
    test('valid string name', () => {
        const rmt: RiskManagementTool = new RiskManagementTool(null, null, null, null, null, null, null);

        fc.assert(
            fc.property(fc.asciiString(), s => {

                // recast to String
                const testName: string = String(s)
                rmt.name = testName;
                expect(rmt.name).toEqual(testName);
            })
        );
    });
});
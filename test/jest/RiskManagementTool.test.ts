import {expect} from '@jest/globals';
import {fc, test} from '@fast-check/jest';
import RiskManagementTool from "../../src/gameobject/RiskManagementTool";
import Event from "../../src/gameobject/event/Event";

// describe ('', () => {
//     test('', () => {
//         const material: Material = new Material(undefined, undefined, undefined, undefined);
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

describe ('RiskManagementTool name PBT', () => {
    test('valid string name', () => {
        const rmt: RiskManagementTool = new RiskManagementTool('insurance', 1, 1, new Event(1, 'a', 0.7, 1, 1), 1, 1, 1);

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

describe ('RiskManagementTool price PBT', () => {
    test('valid price range >= 0', () => {
        const rmt: RiskManagementTool = new RiskManagementTool('insurance', 1, 1, new Event(1, 'a', 0.7, 1, 1), 1, 1, 1);

        fc.assert(
            fc.property(fc.double({min: 0, noNaN: true}), x => {

                const testPrice: number = Number(x);
                rmt.price = testPrice;
                expect(rmt.price).toEqual(testPrice);
            })
        );
    });

    test('invalid price range < 0', () => {
        const rmt: RiskManagementTool = new RiskManagementTool('insurance', 1, 1, new Event(1, 'a', 0.7, 1, 1), 1, 1, 1);

        fc.assert(
            fc.property(fc.double({max: -1, noNaN: true}), x => {

                const testValue: number = Number(x);

                expect(() => {
                    rmt.price = testValue;
                }).toThrow(RangeError("price must be non-negative"));

            })
        );
    });

    test('price range Number.MAX_VALUE + 1', () => {
        const rmt: RiskManagementTool = new RiskManagementTool('insurance', 1, 1, new Event(1, 'a', 0.7, 1, 1), 1, 1, 1);
        const testValue: number = Number.MAX_VALUE + 1;
        rmt.price = testValue;
        expect(rmt.price).toEqual(testValue);
    });
    
});

describe ('RiskManagementTool uses PBT', () => {
    test('valid uses range >= 0', () => {
        const rmt: RiskManagementTool = new RiskManagementTool('insurance', 1, 1, new Event(1, 'a', 0.7, 1, 1), 1, 1, 1);

        fc.assert(
            fc.property(fc.double({min: 0, noNaN: true}), x => {

                const testValue: number = Number(x);
                rmt.uses = testValue;
                expect(rmt.uses).toEqual(testValue);
            })
        );
    });

    test('invalid uses range < 0', () => {
        const rmt: RiskManagementTool = new RiskManagementTool('insurance', 1, 1, new Event(1, 'a', 0.7, 1, 1), 1, 1, 1);

        fc.assert(
            fc.property(fc.double({max: -1, noNaN: true}), x => {

                const testValue: number = Number(x);

                expect(() => {
                    rmt.uses = testValue;
                }).toThrow(RangeError("uses must be non-negative"));

            })
        );
    });

    test('uses range Number.MAX_VALUE + 1', () => {
        const rmt: RiskManagementTool = new RiskManagementTool('insurance', 1, 1, new Event(1, 'a', 0.7, 1, 1), 1, 1, 1);
        const testValue: number = Number.MAX_VALUE + 1;
        rmt.uses = testValue;
        expect(rmt.uses).toEqual(testValue);
    });

});

describe ('RiskManagementTool rateMod PBT', () => {
    test('valid rateMod range', () => {
        const rmt: RiskManagementTool = new RiskManagementTool('insurance', 1, 1, new Event(1, 'a', 0.7, 1, 1), 1, 1, 1);

        fc.assert(
            fc.property(fc.double(), x => {

                const testValue: number = Number(x);
                rmt.rateMod = testValue;
                expect(rmt.rateMod).toEqual(testValue);
            })
        );
    });

    test('rateMod range Number.MAX_VALUE + 1', () => {
        const rmt: RiskManagementTool = new RiskManagementTool('insurance', 1, 1, new Event(1, 'a', 0.7, 1, 1), 1, 1, 1);
        const testValue: number = Number.MAX_VALUE + 1;
        rmt.rateMod = testValue;
        expect(rmt.rateMod).toEqual(testValue);
    });

    test('rateMod range Number.MIN_VALUE - 1', () => {
        const rmt: RiskManagementTool = new RiskManagementTool('insurance', 1, 1, new Event(1, 'a', 0.7, 1, 1), 1, 1, 1);
        const testValue: number = Number.MIN_VALUE - 1;
        rmt.rateMod = testValue;
        expect(rmt.rateMod).toEqual(testValue);
    });

});

describe ('RiskManagementTool event Test', () => {
    test('RMT valid event', () => {
        const rmt: RiskManagementTool = new RiskManagementTool('insurance', 1, 1, new Event(1, 'a', 0.7, 1, 1), 1, 1, 1);
        rmt.event = new Event(1, 'a', 0.7, 1, 1)
        expect(rmt.event !== undefined);
    });

});




describe ('RiskManagementTool fundsMod PBT', () => {
    test('valid fundsMod range', () => {
        const rmt: RiskManagementTool = new RiskManagementTool('insurance', 1, 1, new Event(1, 'a', 0.7, 1, 1), 1, 1, 1);

        fc.assert(
            fc.property(fc.double(), x => {

                const testValue: number = Number(x);
                rmt.fundsMod = testValue;
                expect(rmt.fundsMod).toEqual(testValue);
            })
        );
    });

    test('fundsMod range Number.MAX_VALUE + 1', () => {
        const rmt: RiskManagementTool = new RiskManagementTool('insurance', 1, 1, new Event(1, 'a', 0.7, 1, 1), 1, 1, 1);
        const testValue: number = Number.MAX_VALUE + 1;
        rmt.fundsMod = testValue;
        expect(rmt.fundsMod).toEqual(testValue);
    });

    test('fundsMod range Number.MIN_VALUE - 1', () => {
        const rmt: RiskManagementTool = new RiskManagementTool('insurance', 1, 1, new Event(1, 'a', 0.7, 1, 1), 1, 1, 1);
        const testValue: number = Number.MIN_VALUE - 1;
        rmt.fundsMod = testValue;
        expect(rmt.fundsMod).toEqual(testValue);
    });

});

describe ('RiskManagementTool timeMod PBT', () => {
    test('valid timeMod range', () => {
        const rmt: RiskManagementTool = new RiskManagementTool('insurance', 1, 1, new Event(1, 'a', 0.7, 1, 1), 1, 1, 1);

        fc.assert(
            fc.property(fc.double(), x => {

                const testValue: number = Number(x);
                rmt.timeMod = testValue;
                expect(rmt.timeMod).toEqual(testValue);
            })
        );
    });

    test('timeMod range Number.MAX_VALUE + 1', () => {
        const rmt: RiskManagementTool = new RiskManagementTool('insurance', 1, 1, new Event(1, 'a', 0.7, 1, 1), 1, 1, 1);
        const testValue: number = Number.MAX_VALUE + 1;
        rmt.timeMod = testValue;
        expect(rmt.timeMod).toEqual(testValue);
    });

    test('timeMod range Number.MIN_VALUE - 1', () => {
        const rmt: RiskManagementTool = new RiskManagementTool('insurance', 1, 1, new Event(1, 'a', 0.7, 1, 1), 1, 1, 1);
        const testValue: number = Number.MIN_VALUE - 1;
        rmt.timeMod = testValue;
        expect(rmt.timeMod).toEqual(testValue);
    });

});



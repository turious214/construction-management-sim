import {expect} from '@jest/globals';
import {fc, test} from '@fast-check/jest';
import Contractor from "../../../../src/gameobject/contractor/Contractor";
import {ContractorType} from "../../../../src/gameobject/contractor/ContractorType";

// describe ('', () => {
//     test('', () => {
//         const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);
//
//         fc.assert(
//             fc.property(fc.asciiString(), s => {
//
//                 // recast to String
//                 const testName: string = String(s)
//                 contractor.name = testName;
//                 expect(contractor.name).toEqual(testName);
//             })
//         );
//     });
// });

describe ('Contractor constructor PBT', () => {
    test('instantiate valid contractorID range', () => {

        fc.assert(
            fc.property(fc.double({min: 0, noNaN: true}), x => {
                const testContractorID: number = Number(x);
                const contractor: Contractor = new Contractor(testContractorID, ContractorType.HVAC, 1, 1, 1, 1, 1);
                expect(contractor.contractorID).toEqual(testContractorID);
            })
        );
    });
    test('instantiate invalid contractorID range < 0', () => {

        fc.assert(
            fc.property(fc.double({max: -1, noNaN: true}), x => {

                const testContractorID: number = Number(x);

                expect(() => {
                    const contractor: Contractor = new Contractor(testContractorID, ContractorType.HVAC, 1, 1, 1, 1, 1);
                }).toThrow(RangeError("contractorID must be non-negative"));
            })
        );
    });
    test('instantiate contractorID Number.MAX_VALUE + 1', () => {

        const testContractorID: number = Number.MAX_VALUE + 1;
        const contractor: Contractor = new Contractor(testContractorID, ContractorType.HVAC, 1, 1, 1, 1, 1);
        expect(contractor.contractorID).toEqual(testContractorID);
    });

    test('instantiate invalid contractorID Number.MIN_VALUE - 1', () => {
        const testContractorID: number = Number.MIN_VALUE - 1;

        expect(() => {
            const contractor: Contractor = new Contractor(testContractorID, ContractorType.HVAC, 1, 1, 1, 1, 1);
        }).toThrow(RangeError("contractorID must be non-negative"));

    });

    test('instantiate valid rate range', () => {

        fc.assert(
            fc.property(fc.double({min: 0, noNaN: true}), x => {
                const testValue: number = Number(x);
                const contractor: Contractor = new Contractor(1, ContractorType.HVAC, testValue, 1, 1, 1, 1);
                expect(contractor.rate).toEqual(testValue);
            })
        );
    });
    test('instantiate invalid rate range < 0', () => {

        fc.assert(
            fc.property(fc.double({max: -1, noNaN: true}), x => {

                const testValue: number = Number(x);

                expect(() => {
                    const contractor: Contractor = new Contractor(1, ContractorType.HVAC, testValue, 1, 1, 1, 1);
                }).toThrow(RangeError("rate must be non-negative"));
            })
        );
    });
    test('instantiate rate Number.MAX_VALUE + 1', () => {

        const testValue: number = Number.MAX_VALUE + 1;
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, testValue, 1, 1, 1, 1);
        expect(contractor.rate).toEqual(testValue);
    });

    test('instantiate invalid rate Number.MIN_VALUE - 1', () => {
        const testValue: number = Number.MIN_VALUE - 1;

        expect(() => {
            const contractor: Contractor = new Contractor(1, ContractorType.HVAC, testValue, 1, 1, 1, 1);
        }).toThrow(RangeError("rate must be non-negative"));

    });
});

describe ('Contractor contractorID PBT', () => {
    test('valid contractorID range', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({min: 0, noNaN: true}), x => {

                // recast to number
                const testContractorID: number = Number(x);
                contractor.contractorID = testContractorID;
                expect(contractor.contractorID).toEqual(testContractorID);
            })
        );
    });
    test('invalid contractorID range < 0', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({max: -1, noNaN: true}), x => {

                // recast to number
                const testContractorID: number = Number(x);

                expect(() => {
                    contractor.contractorID = testContractorID;
                }).toThrow(RangeError("contractorID must be non-negative"));
            })
        );
    });
    test('contractorID Number.MAX_VALUE + 1', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        const testContractorID: number = Number.MAX_VALUE + 1;
        contractor.contractorID = testContractorID;
        expect(contractor.contractorID).toEqual(testContractorID);
    });

    test('invalid contractorID Number.MIN_VALUE - 1', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        const testContractorID: number = Number.MIN_VALUE - 1;

        expect(() => {
            contractor.contractorID = testContractorID;
        }).toThrow(RangeError("contractorID must be non-negative"));

    });
});

describe ('Contractor type', () => {
    test('ContractorType EXCAVATOR', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);
        const testType = ContractorType.EXCAVATOR;
        contractor.type = testType;
        expect(contractor.type).toEqual(testType)
    });
    test('ContractorType PAINTER', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);
        const testType = ContractorType.PAINTER;
        contractor.type = testType;
        expect(contractor.type).toEqual(testType)
    });
    test('ContractorType CONCRETER', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);
        const testType = ContractorType.CONCRETER;
        contractor.type = testType;
        expect(contractor.type).toEqual(testType)
    });
    test('ContractorType ELECTRICIAN', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);
        const testType = ContractorType.ELECTRICIAN;
        contractor.type = testType;
        expect(contractor.type).toEqual(testType)
    });
    test('ContractorType PLUMBER', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);
        const testType = ContractorType.PLUMBER;
        contractor.type = testType;
        expect(contractor.type).toEqual(testType)
    });
    test('ContractorType HVAC', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);
        const testType = ContractorType.HVAC;
        contractor.type = testType;
        expect(contractor.type).toEqual(testType)
    });
    test('ContractorType MASON', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);
        const testType = ContractorType.MASON;
        contractor.type = testType;
        expect(contractor.type).toEqual(testType)
    });
    test('ContractorType LANDSCAPER', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);
        const testType = ContractorType.LANDSCAPER;
        contractor.type = testType;
        expect(contractor.type).toEqual(testType)
    });
});

describe ('Contractor rate PBT', () => {
    test('valid rate range', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({min: 0, noNaN: true}), x => {

                // recast to number
                const testRate: number = Number(x)
                contractor.rate = testRate;
                expect(contractor.rate).toEqual(testRate);
            })
        );
    });

    test('invalid rate range', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({max: -1, noNaN: true}), x => {

                // recast to number
                const testRate: number = Number(x)

                expect(() => {
                    contractor.rate = testRate;
                }).toThrow(RangeError("rate must be non-negative"));
            })
        );
    });

    test('rate Number.MAX_VALUE + 1', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

            const testRate: number = Number.MAX_VALUE + 1
            contractor.rate = testRate;
            expect(contractor.rate).toEqual(testRate);

    });

    test('invalid rate Number.MIN_VALUE - 1', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        const testrate: number = Number.MIN_VALUE - 1;

        expect(() => {
            contractor.rate = testrate;
        }).toThrow(RangeError("rate must be non-negative"));

    });



});

describe ('Contractor performance PBT', () => {
    test('valid performance range', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({min: 1, max: 5}), x => {

                // recast to number
                const testNum: number = Number(x);
                contractor.performance = testNum;
                expect(contractor.performance).toEqual(testNum);
            })
        );
    });

    test('invalid performance range <= 0', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({max: 0, noNaN: true}), x => {

                // recast to number
                const testNum: number = Number(x);

                expect(() => {
                    contractor.performance = testNum;
                }).toThrow(RangeError("field must be between 1-5"));
            })
        );
    });

    test('invalid performance range > 5', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({min: 6, noNaN: true}), x => {

                // recast to number
                const testNum: number = Number(x);

                expect(() => {
                    contractor.performance = testNum;
                }).toThrow(RangeError("field must be between 1-5"));
            })
        );
    });
});


describe ('Contractor experience PBT', () => {
    test('valid experience range', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({min: 1, max: 5}), x => {

                // recast to number
                const testNum: number = Number(x);
                contractor.experience = testNum;
                expect(contractor.experience).toEqual(testNum);
            })
        );
    });

    test('invalid experience range <= 0', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({max: 0, noNaN: true}), x => {

                // recast to number
                const testNum: number = Number(x);

                expect(() => {
                    contractor.experience = testNum;
                }).toThrow(RangeError("field must be between 1-5"));
            })
        );
    });

    test('invalid experience range > 5', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({min: 6, noNaN: true}), x => {

                // recast to number
                const testNum: number = Number(x);

                expect(() => {
                    contractor.experience = testNum;
                }).toThrow(RangeError("field must be between 1-5"));
            })
        );
    });
});

describe ('Contractor safety PBT', () => {
    test('valid safety range', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({min: 1, max: 5}), x => {

                // recast to number
                const testNum: number = Number(x);
                contractor.safety = testNum;
                expect(contractor.safety).toEqual(testNum);
            })
        );
    });

    test('invalid safety range <= 0', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({max: 0, noNaN: true}), x => {

                // recast to number
                const testNum: number = Number(x);

                expect(() => {
                    contractor.safety = testNum;
                }).toThrow(RangeError("field must be between 1-5"));
            })
        );
    });

    test('invalid safety range > 5', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({min: 6, noNaN: true}), x => {

                // recast to number
                const testNum: number = Number(x);

                expect(() => {
                    contractor.safety = testNum;
                }).toThrow(RangeError("field must be between 1-5"));
            })
        );
    });
});


describe ('Contractor discipline PBT', () => {
    test('valid discipline range', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({min: 1, max: 5}), x => {

                // recast to number
                const testNum: number = Number(x);
                contractor.discipline = testNum;
                expect(contractor.discipline).toEqual(testNum);
            })
        );
    });

    test('invalid discipline range <= 0', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({max: 0, noNaN: true}), x => {

                // recast to number
                const testNum: number = Number(x);

                expect(() => {
                    contractor.discipline = testNum;
                }).toThrow(RangeError("field must be between 1-5"));
            })
        );
    });

    test('invalid discipline range > 5', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({min: 6, noNaN: true}), x => {

                // recast to number
                const testNum: number = Number(x);

                expect(() => {
                    contractor.discipline = testNum;
                }).toThrow(RangeError("field must be between 1-5"));
            })
        );
    });
});


describe ('Contractor rating PBT', () => {
    test('valid rating range', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({min: 1, max: 5}), x => {

                // recast to number
                const testNum: number = Number(x);
                contractor.rating = testNum;
                expect(contractor.rating).toEqual(testNum);
            })
        );
    });

    test('invalid rating range <= 0', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({max: 0, noNaN: true}), x => {

                // recast to number
                const testNum: number = Number(x);

                expect(() => {
                    contractor.rating = testNum;
                }).toThrow(RangeError("field must be between 1-5"));
            })
        );
    });

    test('invalid rating range > 5', () => {
        const contractor: Contractor = new Contractor(1, ContractorType.HVAC, 1, 1, 1, 1, 1);

        fc.assert(
            fc.property(fc.double({min: 6, noNaN: true}), x => {

                // recast to number
                const testNum: number = Number(x);

                expect(() => {
                    contractor.rating = testNum;
                }).toThrow(RangeError("field must be between 1-5"));
            })
        );
    });
});





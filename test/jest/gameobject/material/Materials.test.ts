import {expect} from '@jest/globals';
import Material from '../../../../src/gameobject/material/Material';
import {fc, test} from '@fast-check/jest';
import { MaterialCategory } from "../../../../src/gameobject/material/MaterialCategory";
import RiskManagementTool from "../../../../src/gameobject/RiskManagementTool";

describe ('Material name PBT', () => {
    test('valid string name', () => {
        const material: Material = new Material(undefined, undefined, undefined, undefined);

        fc.assert(
            fc.property(fc.asciiString(), s => {

                // recast to String
                const testName: string = String(s)
                material.name = testName;
                expect(material.name).toEqual(testName);
            })
        );
    });

});

describe ('Material category', () => {
    test('MaterialCategory CONSTRUCTION', () => {
        const material: Material = new Material(undefined, undefined, undefined, undefined);
        const cat = MaterialCategory.CONSTRUCTION;
        material.category = cat;
        expect(material.category).toEqual(cat);
    });
    test('MaterialCategory ELECTRICAL', () => {
        const material: Material = new Material(undefined, undefined, undefined, undefined);
        const cat = MaterialCategory.ELECTRICAL;
        material.category = cat;
        expect(material.category).toEqual(cat);
    });
    test('MaterialCategory PLUMBING', () => {
        const material: Material = new Material(undefined, undefined, undefined, undefined);
        const cat = MaterialCategory.PLUMBING;
        material.category = cat;
        expect(material.category).toEqual(cat);
    });
    test('MaterialCategory LANDSCAPING', () => {
        const material: Material = new Material(undefined, undefined, undefined, undefined);
        const cat = MaterialCategory.LANDSCAPING;
        material.category = cat;
        expect(material.category).toEqual(cat);
    });
    test('MaterialCategory HVAC', () => {
        const material: Material = new Material(undefined, undefined, undefined, undefined);
        const cat = MaterialCategory.HVAC;
        material.category = cat;
        expect(material.category).toEqual(cat);
    });
});


describe ('Material price PBT', () => {
    test('valid price range >= 0', () => {
        const material: Material = new Material(undefined, undefined, undefined, undefined);

        fc.assert(
            fc.property(fc.double({min: 0}), x => {

                const testValue: number = Number(x)
                material.price = testValue;
                expect(material.price).toEqual(testValue);
            })
        );
    });

    test('invalid price range < 0', () => {
        const material: Material = new Material(undefined, undefined, undefined, undefined);

        fc.assert(
            fc.property(fc.double({max: -1}), x => {

                const testValue: number = Number(x);

                expect(() => {
                    material.price = testValue;
                }).toThrow(RangeError("price must be non-negative"));

            })
        );
    });

    test('price range Number.MAX_VALUE + 1', () => {
        const material: Material = new Material(undefined, undefined, undefined, undefined);
        const testValue: number = Number.MAX_VALUE + 1;
        material.price = testValue;
        expect(material.price).toEqual(testValue);
    });

   
});


describe ('Material quantity PBT', () => {
    test('valid quantity range >= 0', () => {
        const material: Material = new Material(undefined, undefined, undefined, undefined);

        fc.assert(
            fc.property(fc.double({min: 0}), x => {

                const testValue: number = Number(x)
                material.quantity = testValue;
                expect(material.quantity).toEqual(testValue);
            })
        );
    });

    test('invalid quantity range < 0', () => {
        const material: Material = new Material(undefined, undefined, undefined, undefined);

        fc.assert(
            fc.property(fc.double({max: -1}), x => {

                const testValue: number = Number(x);

                expect(() => {
                    material.quantity = testValue;
                }).toThrow(RangeError("quantity must be non-negative"));

            })
        );
    });

    test('quantity range Number.MAX_VALUE + 1', () => {
        const material: Material = new Material(undefined, undefined, undefined, undefined);
        const testValue: number = Number.MAX_VALUE + 1;
        material.quantity = testValue;
        expect(material.quantity).toEqual(testValue);
    });


});





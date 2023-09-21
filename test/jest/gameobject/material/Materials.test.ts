import {expect} from '@jest/globals';
import Material from '../../../../src/gameobject/material/Material';
import {fc, test} from '@fast-check/jest';
import { MaterialCategory } from "../../../../src/gameobject/material/MaterialCategory";

describe ('Material name PBT', () => {
    test('valid string name', () => {
        const material: Material = new Material(null, null, null, null);

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
    const material: Material = new Material(null, null, null, null);
    test('MaterialCategory CONSTRUCTION', () => {
        const cat = MaterialCategory.CONSTRUCTION;
        material.category = cat;
        expect(material.category).toEqual(cat);
    });
    test('MaterialCategory ELECTRICAL', () => {
        const cat = MaterialCategory.ELECTRICAL;
        material.category = cat;
        expect(material.category).toEqual(cat);
    });
    test('MaterialCategory PLUMBING', () => {
        const cat = MaterialCategory.PLUMBING;
        material.category = cat;
        expect(material.category).toEqual(cat);
    });
    test('MaterialCategory LANDSCAPING', () => {
        const cat = MaterialCategory.LANDSCAPING;
        material.category = cat;
        expect(material.category).toEqual(cat);
    });
    test('MaterialCategory HVAC', () => {
        const cat = MaterialCategory.HVAC;
        material.category = cat;
        expect(material.category).toEqual(cat);
    });
});


describe ('Material price PBT', () => {
    test('valid price range', () => {
        const material: Material = new Material(null, null, null, null);

        fc.assert(
            fc.property(fc.double(), x => {

                // recast to Number
                const testPrice: number = Number(x)
                material.price = testPrice;
                expect(material.price).toEqual(testPrice);
            })
        );
    });
});




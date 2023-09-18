import Material from "../../src/gameobject/material/Material";
import * as fc from 'fast-check';


describe ('Material price PBT', () => {
    it('valid range', () => {
        const material: Material = new Material();

        material.price(fc.integer(Phaser.Min))


        fc.assert(fc.property())
        
    });

});
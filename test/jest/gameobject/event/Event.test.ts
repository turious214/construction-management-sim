import { expect } from '@jest/globals';
import {fc} from "@fast-check/jest";
import Event from "../../../../src/gameobject/event/Event";

describe ('Event eventID PBT', () =>  {
    test('valid eventID range', () => {

        const event = new Event(undefined, undefined, undefined, undefined, undefined);
        fc.assert(
            fc.property(fc.double(), x => {

                // recast to Number
                const testEventID: number = Number(x)
                event.eventID = testEventID;
                expect(event.eventID).toEqual(testEventID);
            })
        );
    });

});

describe('Event description PBT', () => {
    test('valid string description', () => {

        const event = new Event(undefined, undefined, undefined, undefined, undefined);
        fc.assert(
            fc.property(fc.asciiString(), s => {

                // recast to String
                const testDescription: string = String(s)
                event.description = testDescription;
                expect(event.description).toEqual(testDescription);
            })
        );
    });
});

describe('Event occurrenceRate PBT', () => {
    test('valid occurenceRate range', () => {

        const event = new Event(undefined, undefined, undefined, undefined, undefined);
        fc.assert(
            fc.property(fc.double(), x => {

                // recast to Number
                const testOccurrenceRate: number = Number(x)
                event.occurrenceRate = testOccurrenceRate;
                expect(event.occurrenceRate).toEqual(testOccurrenceRate);
            })
        );

    });
});

describe('Event fundsMod PBT', () => {
    test('valid fundsMod range', () => {

        const event = new Event(undefined, undefined, undefined, undefined, undefined);
        fc.assert(
            fc.property(fc.double(), x => {

                // recast to Number
                const testFundsMod: number = Number(x)
                event.fundsMod = testFundsMod;
                expect(event.fundsMod).toEqual(testFundsMod);
            })
        );

    });
});

describe('Event timeMod PBT', () => {
    test('valid timeMod range', () => {

        const event = new Event(undefined, undefined, undefined, undefined, undefined);
        fc.assert(
            fc.property(fc.double(), x => {

                // recast to Number
                const testTimeMod: number = Number(x)
                event.timeMod = testTimeMod;
                expect(event.timeMod).toEqual(testTimeMod);
            })
        );

    });
});


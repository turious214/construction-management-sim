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

    test('occurenceRate range Number.MAX_VALUE + 1', () => {

        const event = new Event(undefined, undefined, undefined, undefined, undefined);

        // recast to Number
        const testOccurrenceRate: number = Number.MAX_VALUE + 1;
        event.occurrenceRate = testOccurrenceRate;
        expect(event.occurrenceRate).toEqual(testOccurrenceRate);
    });

    test('occurenceRate range Number.MIN_VALUE - 1', () => {

        const event = new Event(undefined, undefined, undefined, undefined, undefined);

        // recast to Number
        const testOccurrenceRate: number = Number.MIN_VALUE - 1;
        event.occurrenceRate = testOccurrenceRate;
        expect(event.occurrenceRate).toEqual(testOccurrenceRate);
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

    test('occurenceRate range Number.MAX_VALUE + 1', () => {

        const event = new Event(undefined, undefined, undefined, undefined, undefined);

        // recast to Number
        const testfundsMod: number = Number.MAX_VALUE + 1;
        event.fundsMod = testfundsMod;
        expect(event.fundsMod).toEqual(testfundsMod);
    });

    test('occurenceRate range Number.MIN_VALUE - 1', () => {

        const event = new Event(undefined, undefined, undefined, undefined, undefined);

        // recast to Number
        const testfundsMod: number = Number.MIN_VALUE - 1;
        event.fundsMod = testfundsMod;
        expect(event.fundsMod).toEqual(testfundsMod);
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

    test('occurenceRate range Number.MAX_VALUE + 1', () => {

        const event = new Event(undefined, undefined, undefined, undefined, undefined);

        // recast to Number
        const testtimeMod: number = Number.MAX_VALUE + 1;
        event.timeMod = testtimeMod;
        expect(event.timeMod).toEqual(testtimeMod);
    });

    test('occurenceRate range Number.MIN_VALUE - 1', () => {

        const event = new Event(undefined, undefined, undefined, undefined, undefined);

        // recast to Number
        const testtimeMod: number = Number.MIN_VALUE - 1;
        event.timeMod = testtimeMod;
        expect(event.timeMod).toEqual(testtimeMod);
    });
});


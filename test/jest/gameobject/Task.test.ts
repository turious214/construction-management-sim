import {expect} from '@jest/globals';
import {fc, test} from '@fast-check/jest';
import Task from "../../../src/gameobject/Task";
import Contractor from "../../../src/gameobject/contractor/Contractor";
import Personnel from "../../../src/scene/Personnel";

// describe ('', () => {
//     test('', () => {
//         const task: Task = new Task(undefined, undefined, undefined);
//
//         fc.assert(
//             fc.property(fc.asciiString(), s => {
//
//
//                 const testValue: string = String(s)
//                 task.name = testValue;
//                 expect(task.name).toEqual(testValue);
//             })
//         );
//     });
// });

describe ('Task constructor test PBT', () => {
    test('instantiate valid taskID range >= 0', () => {
        const task: Task = new Task(undefined, undefined, undefined);

        fc.assert(
            fc.property(fc.double({min: 0, noNaN: true}), x => {
                const testValue: number = Number(x);
                const task: Task = new Task(testValue, undefined, undefined);

                expect(task.taskID).toEqual(testValue);
            })
        );
    });

    test('invalid taskID < 0', () => {

        fc.assert(
            fc.property(fc.double({max: -1, noNaN: true}), x => {
                const testValue: number = Number(x);

                expect(() => {
                    const task: Task = new Task(testValue, undefined, undefined);
                }).toThrow(RangeError("taskID must be non-negative"));
            })
        );
    });

    test('instantiate taskID Number.MAX_VALUE + 1', () => {
        const task: Task = new Task(Number.MAX_VALUE + 1, undefined, undefined);

        expect(task.taskID).toEqual(Number.MAX_VALUE + 1);
    });

    test('instantiate invalid taskID Number.MIN_VALUE - 1', () => {

        expect(() => {
            const task: Task = new Task(Number.MIN_VALUE - 1, undefined, undefined);
        }).toThrow(RangeError("taskID must be non-negative"));

    });

});


describe ('Task taskID PBT', () => {
    test('valid taskID range >= 0', () => {
        const task: Task = new Task(undefined, undefined, undefined);

        fc.assert(
            fc.property(fc.double({min: 0, noNaN: true}), x => {


                const testValue: number = Number(x);
                task.taskID = testValue;
                expect(task.taskID).toEqual(testValue);
            })
        );
    });

    test('invalid taskID < 0', () => {
        const task: Task = new Task(undefined, undefined, undefined);

        fc.assert(
            fc.property(fc.double({max: -1, noNaN: true}), x => {

                const testValue: number = Number(x);

                expect(() => {
                    task.taskID = testValue;
                }).toThrow(RangeError("taskID must be non-negative"));
            })
        );
    });

    test('taskID Number.MAX_VALUE + 1', () => {
        const task: Task = new Task(undefined, undefined, undefined);

            task.taskID = Number.MAX_VALUE + 1;

            expect(task.taskID).toEqual(Number.MAX_VALUE + 1);
    });

    test('invalid taskID Number.MIN_VALUE - 1', () => {
        const task: Task = new Task(undefined, undefined, undefined);

        const testValue: number = Number.MIN_VALUE - 1;

        expect(() => {
            task.taskID = testValue;
        }).toThrow(RangeError("taskID must be non-negative"));

    });

});

describe ('Task complete boolean values', () => {
    test('task complete true', () => {
        const task: Task = new Task(undefined, undefined, undefined);

            const testValue: boolean = true;
            task.complete = testValue;
            expect(task.complete).toEqual(testValue);

    });

    test('task complete false', () => {
        const task: Task = new Task(undefined, undefined, undefined);

        const testValue: boolean = false;
        task.complete = testValue;
        expect(task.complete).toEqual(testValue);

    });
});

describe ('Task description PBT', () => {
    test('valid string description', () => {
        const task: Task = new Task(undefined, undefined, undefined);

        fc.assert(
            fc.property(fc.asciiString(), s => {

                // recast to String
                const testValue: string = String(s)
                task.description = testValue;
                expect(task.description).toEqual(testValue);
            })
        );
    });
});

describe ('Task nextTasks', () => {
    test('nextTasks empty list', () => {
        const task: Task = new Task(undefined, undefined, undefined);

        const testValue: Task[] = []
        task.nextTasks = testValue;
        expect(task.nextTasks).toEqual(testValue);
        expect(task.nextTasks.length).toEqual(0);

    });
    test('nextTasks 1 task', () => {
        const task: Task = new Task(undefined, undefined, undefined);

        const testValue: Task[] = [];
        testValue.push(new Task(1, undefined, undefined));
        task.nextTasks = testValue;
        expect(task.nextTasks).toEqual(testValue);
        expect(task.nextTasks.length).toEqual(1);

    });

    test('nextTasks mutliple tasks', () => {
        const task: Task = new Task(undefined, undefined, undefined);

        const testValue: Task[] = [];
        const totalTasks: number = 10;
        for (let i: number = 0; i < totalTasks; i++) {
            testValue.push(new Task(i, undefined, undefined));
        }

        task.nextTasks = testValue;
        expect(task.nextTasks).toEqual(testValue);
        expect(task.nextTasks.length).toEqual(totalTasks);

    });
});


describe ('Task set personnel', () => {
    test('personnel set 0 entries', () => {
        const task: Task = new Task(undefined, undefined, undefined);
        const testValue: Map<number, Contractor> = new Map<number, Contractor>;
        task.personnel = testValue;
        expect(task.personnel).toEqual(testValue);
        expect(task.personnel.size).toEqual(0);
    });

    test('personnel set 1 entries', () => {
        const task: Task = new Task(undefined, undefined, undefined);
        const testValue: Map<number, Contractor> = new Map<number, Contractor>;

        testValue.set(1, new Contractor(1, undefined, undefined, undefined, undefined, undefined, undefined))

        task.personnel = testValue;
        expect(task.personnel).toEqual(testValue);
        expect(task.personnel.size).toEqual(1);
    });

    test('personnel set multiple entries', () => {
        const task: Task = new Task(undefined, undefined, undefined);
        const testValue: Map<number, Contractor> = new Map<number, Contractor>;

        const totalPersonnel: number = 10;
        for (let i: number = 0; i < totalPersonnel; i++) {
            testValue.set(i, new Contractor(i, undefined, undefined, undefined, undefined, undefined, undefined));
        }

        task.personnel = testValue;
        expect(task.personnel).toEqual(testValue);
        expect(task.personnel.size).toEqual(totalPersonnel);
    });

});


describe ('Task add personnel', () => {
    test('personnel add 0 entries', () => {
        const task: Task = new Task(undefined, undefined, undefined);
        const totalPersonnel: number = 0;

        for (let i: number = 0; i < totalPersonnel; i++) {
            task.addPersonnel(new Contractor(i, undefined, undefined, undefined, undefined, undefined, undefined))
        }

        expect(task.personnel.size).toEqual(0);
    });

    test('personnel add 1 entries', () => {
        const task: Task = new Task(undefined, undefined, undefined);
        const totalPersonnel: number = 1;

        for (let i: number = 0; i < totalPersonnel; i++) {
            task.addPersonnel(new Contractor(i, undefined, undefined, undefined, undefined, undefined, undefined))
        }

        expect(task.personnel.size).toEqual(1);
    });

    test('personnel add multiple entries', () => {
        const task: Task = new Task(undefined, undefined, undefined);
        const totalPersonnel: number = 10;

        for (let i: number = 0; i < totalPersonnel; i++) {
            task.addPersonnel(new Contractor(i, undefined, undefined, undefined, undefined, undefined, undefined))
        }

        expect(task.personnel.size).toEqual(totalPersonnel);
    });

});




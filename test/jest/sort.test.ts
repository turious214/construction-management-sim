import { expect } from '@jest/globals';
import { fc, test} from '@fast-check/jest';
import Sort from '../../src/classes/Sort';

describe('Sort class test suite', () => {
    describe('getText function suite', () => {
        test('simple getter test', () => {
            const test_string = "testing";
            const sort: Sort = new Sort(test_string, undefined);
            const spy = jest.spyOn(sort, 'getText');
            expect(sort.getText()).toEqual(test_string);
            expect(spy).toHaveBeenCalled();
        })

        test('undefined getter test', () => {
            const sort: Sort = new Sort(undefined, undefined);
            const spy = jest.spyOn(sort, 'getText');
            expect(sort.getText()).toEqual(undefined);
            expect(spy).toHaveBeenCalled();
        })
    })

    describe('sort function suite', () => {
        test('basic functionality test', () => {
            const callback = jest.fn();
            const mockFn = jest.fn(() => callback);
            expect(callback).not.toHaveBeenCalled();
            expect(mockFn).not.toHaveBeenCalled();

            const sort: Sort = new Sort("testing", mockFn());
            expect(mockFn).toHaveBeenCalled();

            const spy = jest.spyOn(sort, 'filter');
            expect(spy).not.toHaveBeenCalled();
            expect(callback).not.toHaveBeenCalled();

            sort.filter();
            expect(spy).toHaveBeenCalled();
            expect(callback).toHaveBeenCalled();
        })

        test('undefined method test', () => {
            const sort: Sort = new Sort(undefined, undefined);
            const spy = jest.spyOn(sort, 'filter');

            expect(spy).not.toHaveBeenCalled();

            try {
                sort.filter();
                fail("does not fail at undefined method parameter");
            } catch (e) {
                if(e instanceof TypeError) {
                } else {
                    fail("getting another error");
                }
            }

            expect(spy).toHaveBeenCalled();
        })
    })
})

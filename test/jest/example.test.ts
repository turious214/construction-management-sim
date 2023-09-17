import { expect } from '@jest/globals';
function sum(a: number, b: number): number {
    return a + b;
  }
  
  test('Add 2 positive integers', () => {
    expect(sum(1, 2)).toBe(3);
  });
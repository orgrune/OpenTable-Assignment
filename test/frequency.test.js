const { calculateNumberFrequency, renderFrequencyGraph } = require('../src/frequency');

describe('calculateNumberFrequency', () => {
  it('should calculate the frequency and numbers in the list (example from prompt)', () => {
    const input = [1, 4, 1, 5, 8, 1, 3, 5, 1, 4, 1, 3, 7, 2];
    const expected = {
      frequency: [5, 1, 2, 2, 2, 0, 1, 1],
      numbers:   [1, 2, 3, 4, 5, 6, 7, 8]
    };
    expect(calculateNumberFrequency(input)).toEqual(expected);
  });

  it('should handle a list with only one number', () => {
    const input = [3, 3, 3];
    const expected = {
      frequency: [3],
      numbers: [3]
    };
    expect(calculateNumberFrequency(input)).toEqual(expected);
  });

  it('should handle a list with consecutive numbers', () => {
    const input = [1, 2, 3, 4, 5];
    const expected = {
      frequency: [1, 1, 1, 1, 1],
      numbers: [1, 2, 3, 4, 5]
    };
    expect(calculateNumberFrequency(input)).toEqual(expected);
  });

  it('should handle a list with missing numbers in the range', () => {
    const input = [2, 4, 4, 6];
    const expected = {
      frequency: [1, 0, 2, 0, 1],
      numbers: [2, 3, 4, 5, 6]
    };
    expect(calculateNumberFrequency(input)).toEqual(expected);
  });

  it('should return empty arrays for an empty input', () => {
    expect(calculateNumberFrequency([])).toEqual({ frequency: [], numbers: [] });
  });
});

describe('renderFrequencyGraph', () => {
  it('should render the graph for the example from the prompt', () => {
    const frequency = [5, 1, 2, 2, 2, 0, 1, 1];
    const numbers =   [1, 2, 3, 4, 5, 6, 7, 8];
    const expected =
` *              
 *              
 *              
 *   * * *      
 * * * * *   * *
 1 2 3 4 5 6 7 8`;
    expect(renderFrequencyGraph({ frequency, numbers })).toBe(expected);
  });

  it('should render a single column for one number', () => {
    const frequency = [3];
    const numbers = [3];
    const expected =
` *
 *
 *
 3`;
    expect(renderFrequencyGraph({ frequency, numbers })).toBe(expected);
  });

  it('should render empty string for empty input', () => {
    expect(renderFrequencyGraph({ frequency: [], numbers: [] })).toBe('');
  });
}); 
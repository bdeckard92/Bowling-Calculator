const { bowlingScoreCalculator } = require('./bowlingCalculator');

describe('Bowling score calculator acceptance criteria', () => {
  test('calculates running score for open frames from a partial (live) game', () => {
    expect(bowlingScoreCalculator([1, 2, 3, 4])).toEqual([3, 7]);
  });

  test('displays X when a strike occurs in a frame', () => {
    expect(bowlingScoreCalculator([10, null])).toEqual(['nil']);
  });

  test('displays spare character for remainder pins on second roll', () => {
    expect(bowlingScoreCalculator([7, "/"])).toEqual(['nil']);
  });

  test('returns nil for strike frame until the next frame is completed', () => {
    expect(bowlingScoreCalculator([3, 4, 'X', 3])).toEqual([7, 'nil', 'nil']);
    expect(bowlingScoreCalculator([3, 4, 'X', 3, 5])).toEqual([7, 18, 8]);
  });

  test('returns nil for spare frame until the first roll of next frame exists', () => {
    expect(bowlingScoreCalculator([7, 1, '/'])).toEqual([8, 'nil']);
    expect(bowlingScoreCalculator([7, 1,  '/', 5 ])).toEqual([8, 15, 'nil']);
     expect(bowlingScoreCalculator([7, 1,  '/', 5, 1 ])).toEqual([8, 15, 6]);
  });
});

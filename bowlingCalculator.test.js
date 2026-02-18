const { bowlingScoreCalculator } = require('./bowlingCalculator');

describe('Bowling score calculator acceptance criteria', () => {
  test('calculates running score for open frames from a partial (live) game', () => {
    expect(bowlingScoreCalculator([1, 2, 3, 4])).toEqual([3, 7]);
  });

  test('displays X when a strike occurs in a frame', () => {
    expect(bowlingScoreCalculator([10, null])).toEqual(['X']);
  });

  test('displays spare character for remainder pins on second roll', () => {
    expect(bowlingScoreCalculator([7, "/"])).toEqual(['/']);
  });

  test('returns nil for strike frame until the next frame is completed', () => {
    expect(bowlingScoreCalculator([10, null, 3, null])).toEqual([null, null]);
    expect(bowlingScoreCalculator([10, null, 3, 4])).toEqual([null, 7]);
  });

  test('returns nil for spare frame until the first roll of next frame exists', () => {
    expect(bowlingScoreCalculator([7, '/', null, null])).toEqual([null, null]);
    expect(bowlingScoreCalculator([7, '/', 5, null])).toEqual([15, null]);
  });
});

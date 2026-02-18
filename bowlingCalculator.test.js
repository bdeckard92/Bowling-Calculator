const { bowlingScoreCalculator } = require("./bowlingCalculator");

describe("Bowling score calculator acceptance criteria", () => {
  test("calculates running score for open frames from a partial (live) game", () => {
    expect(bowlingScoreCalculator([1, 2, 3, 4])).toEqual([3, 7]);
  });

  test("returns nil for strike frame until the next frame is completed", () => {
    expect(bowlingScoreCalculator(["X"])).toEqual(["nil"]);
    expect(bowlingScoreCalculator([3, 4, "X", 3])).toEqual([7, "nil", "nil"]);
    expect(bowlingScoreCalculator([3, 4, "X", 3, 5])).toEqual([7, 18, 8]);
    expect(bowlingScoreCalculator([3, 4, "X", "X"])).toEqual([7, 20, "nil"]);
  });

  test("returns nil for spare frame until the first roll of next frame exists", () => {
    expect(bowlingScoreCalculator(["/"])).toEqual(["nil"]);
    expect(bowlingScoreCalculator([7, 1, "/"])).toEqual([8, "nil"]);
    expect(bowlingScoreCalculator([7, 1, "/", 5])).toEqual([8, 15, "nil"]);
    expect(bowlingScoreCalculator([7, 1, "/", 5, 1])).toEqual([8, 15, 6]);
  });
});

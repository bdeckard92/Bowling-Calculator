# Bowling Calculator

A small Node.js function that calculates **running frame scores** for a live bowling game.

## Purpose

`bowlingScoreCalculator(frameArray)` is designed to accept a partial or complete game state and return the current score per frame according to the project acceptance criteria.

It supports:
- Open frames (two numeric rolls)
- Strikes (`"X"`)
- Spares (`"/"`)
- Incomplete live-game frames by returning `"nil"` when a score cannot be resolved yet

## What the Function Does

The function takes an array of frame/roll markers and returns an array of frame scores.

### Input conventions
- Open frame: two numbers, e.g. `[3, 4]`
- Strike frame: `"X"` (single index)
- Spare frame: `"/"` (single index, scored with next roll bonus)

### Output conventions
- Open frame score is immediate (sum of two rolls)
- Strike score is `10 + next two rolls` when available, otherwise `"nil"`
- Spare score is `10 + next roll` when available, otherwise `"nil"`
- In-progress live game may include multiple `"nil"` values in the running score

### Example

```js
const { bowlingScoreCalculator } = require("./bowlingCalculator");

console.log(bowlingScoreCalculator([1, 2, 3, 4]));
// [3, 7]

console.log(bowlingScoreCalculator([3, 4, "X", 3]));
// [7, "nil", "nil"]

console.log(bowlingScoreCalculator([7, 1, "/", 5]));
// [8, 15]
```

## Install Dependencies

From the project root:

```bash
npm install
```

This installs Jest from `devDependencies`.

## Run Tests

```bash
npm test
```

To run tests in-band:

```bash
npm test -- --runInBand
```

## Project Files

- `bowlingCalculator.js` – scoring function implementation
- `bowlingCalculator.test.js` – Jest acceptance-style test coverage

## Known Limitations / Assumptions

- The function is designed around the current acceptance tests and live-score behavior, not a full official 10-frame engine.
- Frames are interpreted from a flat array where open frames are two numbers and strike/spare frames are single markers (`"X"`, `"/"`).
- Unresolved bonus scenarios return the string `"nil"` (not JavaScript `null`).
- The current test suite validates partial-game scoring paths; final-frame bonus roll edge cases are not comprehensively covered.

## Next Steps

- Refactor conditional scoring flow into a `switch`/dispatch-style structure to reduce branching complexity.
- At minimum, abstract repeated index access (for example `frameArray[i + 1]`, `frameArray[i + 2]`) into named variables/helpers to reduce code surface area.
- The current implementation intentionally keeps explicit index-based logic to make the scoring rules easy to trace during this phase.



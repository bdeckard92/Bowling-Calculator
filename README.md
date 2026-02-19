# Bowling Calculator

A small Node.js scoring function that calculates running frame scores for a live bowling game.

## Why there are two versions

The original implementation in bowlingCalculator.js assumed a spare could appear as a standalone marker, like "/".

During refinement, the key realization was that a spare is normally represented as a two-roll frame, for example [3, "/"]. That misunderstanding was the main source of edge-case behavior around frame parsing and bonus lookahead.

The refined implementation in refinedCalculator.js was introduced to fix that frame-shape assumption and make the scoring logic easier to reason about.

## What changed in the refined version

- Added explicit spare-pair handling for number + "/" frame patterns.
- Split complex branching into smaller helper functions for strike, spare, and open-frame scoring.
- Preserved live-game behavior where unresolved frames return "nil".
- Kept compatibility with strike markers ("X") and partial/in-progress game states.

## Test updates

The test cases were updated to reflect proper frame understanding, specifically that a spare is interpreted as a two-roll frame (for example [3, "/"]) rather than only a standalone marker.

This ensures assertions align with bowling frame structure and validates the refined scoring behavior against the corrected frame model.

## Input conventions

- Open frame: [3, 4]
- Strike frame: "X"
- Spare frame (refined model): [3, "/"]
- Legacy standalone spare markers may still appear in partial streams, but the refined logic is centered on spare as a two-roll frame.

## Output conventions

- Open frame score is immediate (sum of two rolls).
- Strike score is 10 + next two rolls when available, otherwise "nil".
- Spare score is 10 + next roll when available, otherwise "nil".
- In-progress live games can return one or more "nil" values while bonuses are unresolved.

## Project files

- bowlingCalculator.js: original implementation
- refinedCalculator.js: refined implementation with spare-pair frame handling
- bowlingCalculator.test.js: Jest acceptance tests (currently targeting refinedCalculator.js)

## Install dependencies

From the project root:

npm install

## Run tests for the refined file

Current tests import refinedCalculator.js from bowlingCalculator.test.js, so either command validates the refined implementation:

- npm test
- npx jest bowlingCalculator.test.js

Optional (run in-band):

- npm test -- --runInBand

## Current scope / limitations

- The project is focused on running-score behavior for partial live games.
- Unresolved scoring states return the string "nil".
- Full 10th-frame and complete official 10-frame validation rules are not fully modeled yet.



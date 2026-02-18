// Acceptance Criteria
// Must track score for live game
// Score per role will be array of number or character 0-9
//    'X' will display for all ten pins
//    '/' will disply for getting remainder of pins on second roll
// Calculating and display  running score following bowling rules:
//    sum of each roll of frame (2 rolls) tallied and displayed in return
//    display should follow strike or spare characters
//    Sum of score should reflect bowling rules: not updated after a strike until both rolls for frame are finished.
//    If a strike occurs score tally returns nil until the next frame is finished. on first roll of next frame it will also return nill since no calculation can be made until after frame is finished.
//    If a spare occurs score tally returns nil for that frame until the first role of next frame following bowling rules.
// Assumptions: This could take in an array indicating a portion of the game or the entire game.
//



const bowlingScoreCalculator = (frameArray) => {
  let len = frameArray.length;
  let increment = 1;
  let currentScore = [];
  let strike = 10;
  for (let i = 0; i < len; i += increment) {
    if (
      frameArray[i] === "X" &&
      typeof frameArray[i + 1] === "number" &&
      typeof frameArray[i + 1] === "number"
    ) {
      currentScore.push(strike + frameArray[i + 1] + frameArray[i + 2]);
      increment = 1;
    } else if (frameArray[i] === "X" && !(frameArray[i + 1]) ) {
        currentScore.push('nil')
    } else {
      currentScore.push(frameArray[i] + frameArray[i + 1]);
      increment = 2;
    }
  }
  return currentScore;
};
module.exports = { bowlingScoreCalculator };

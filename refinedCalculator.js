const STRIKE_VALUE = 10;
const NIL = "nil";

const isNumber = (value) => typeof value === "number";
const isStrike = (value) => value === "X";
const isSpare = (value) => value === "/";
const isSparePair = (firstRoll, secondRoll) =>
  isNumber(firstRoll) && isSpare(secondRoll);

const scoreStrikeFrame = (nextRoll, lookaheadRoll) => {
  // If the next roll after a strike is not tallied yet return nil
  if (nextRoll === undefined) {
    return [NIL];
  }
  // If the next roll after a strike is tallied but the second roll of that frame is not return nil, nil
  if (isNumber(nextRoll) && lookaheadRoll === undefined) {
    return [NIL, NIL];
  }
  // If the next frame after a strike is tallied then return the strike value added to  the sum of the next frame
  if (isNumber(nextRoll) && isNumber(lookaheadRoll)) {
    return [STRIKE_VALUE + nextRoll + lookaheadRoll];
  }
  // If the frame following a strike results in a spare return sum of strike value plus itself
  if (isNumber(nextRoll) && isSpare(lookaheadRoll)) {
    return [STRIKE_VALUE + STRIKE_VALUE];
  }
  // If strike follows strike return strike value plus itself
  if (isStrike(nextRoll)) {
    return [STRIKE_VALUE + STRIKE_VALUE];
  }

  return [];
};

const scoreSpareFrame = (nextRoll) => {
  // If no roll is tallied after a spare return nil
  if (nextRoll === undefined) {
    return [NIL];
  }
  // If the next roll is tallied after a spare return sum of strike value plus next roll
  if (isNumber(nextRoll)) {
    return [STRIKE_VALUE + nextRoll];
  }
  // If the next roll after a spare is a strike return strike value plus strick value (could update to strike value times 2 but... )
  if (isStrike(nextRoll)) {
    return [STRIKE_VALUE + STRIKE_VALUE];
  }

  return [];
};

// This provides logic to interpret if 2 numbers are in a frame to create proper score
const scoreOpenFrame = (firstRoll, secondRoll) => {
  // Check that both rolls in one frame are numbers
  if (isNumber(firstRoll) && isNumber(secondRoll)) {
    // if true return  object of scores that sums each role in an array scores, and provides increment count in step to move forware 2 indecies in array (to get to next frame)
    return { scores: [firstRoll + secondRoll], step: 2 };
  }

  return { scores: [], step: 1 };
};

const bowlingScoreCalculator = (frameArray) => {
  const runningScores = [];

  for (let i = 0; i < frameArray.length; ) {
    const currentRoll = frameArray[i];
    const nextRoll = frameArray[i + 1];
    const lookaheadRoll = frameArray[i + 2];

    if (isStrike(currentRoll)) {
      runningScores.push(...scoreStrikeFrame(nextRoll, lookaheadRoll));
      i += 1;
      continue;
    }

    if (isSparePair(currentRoll, nextRoll)) {
      runningScores.push(...scoreSpareFrame(lookaheadRoll));
      i += 2;
      continue;
    }

    if (isSpare(currentRoll)) {
      runningScores.push(...scoreSpareFrame(nextRoll));
      i += 1;
      continue;
    }

    const openFrame = scoreOpenFrame(currentRoll, nextRoll);
    runningScores.push(...openFrame.scores);
    i += openFrame.step;
  }

  return runningScores;
};

module.exports = { bowlingScoreCalculator };

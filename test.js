const STRIKE_VALUE = 10;
const NIL = "nil";

const isNumber = (value) => typeof value === "number";
const isStrike = (value) => value === "X";
const isSpare = (value) => value === "/";

const scoreStrikeOrSpare = (nextRoll, lookaheadRoll) => {
  if (nextRoll === undefined) {
    return [NIL];
  }

  if (isNumber(nextRoll) && !isNumber(lookaheadRoll)) {
   
    return [NIL, NIL];
  }

  if (isNumber(nextRoll) && isNumber(lookaheadRoll)) {
    return [STRIKE_VALUE + nextRoll + lookaheadRoll];
  }

  if (isStrike(nextRoll) || isSpare(nextRoll)) {
    return [STRIKE_VALUE + STRIKE_VALUE];
  }

  return [];
};

const scoreOpenFrame = (firstRoll, secondRoll) => {
  if (isNumber(firstRoll) && isNumber(secondRoll)) {
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

    if (isStrike(currentRoll) || isSpare(currentRoll)) {
      runningScores.push(...scoreStrikeOrSpare(nextRoll, lookaheadRoll));
      i += 1;
      continue;
    }

    const openFrame = scoreOpenFrame(currentRoll, nextRoll);
    runningScores.push(...openFrame.scores);
    i += openFrame.step;
  }

  return runningScores;
};

console.log(bowlingScoreCalculator(['X', 3, 1, 2, 1]));
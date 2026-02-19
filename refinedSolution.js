const STRIKE_SPARE_VALUE = 10;
const NIL = "nil";
const isNumber = (num) => typeof num === "number";
const isStrike = (bowl) => bowl === "X";
const isSpare = (bowl) => bowl === "/";

const scoreStrike = (next, nextNext) => {
  if (next === undefined) {
    return [NIL];
  }
  
  if (isNumber(next) && !isNumber(nextNext)) {
    return [NIL, NIL];
  } 
  
  if (isNumber(next) && isNumber(nextNext)) {
    return [STRIKE_SPARE_VALUE + next + nextNext];
  }

  if (isNumber(next) && isSpare(nextNext)){
    return [STRIKE_SPARE_VALUE + STRIKE_SPARE_VALUE]
  }
  
  if(isStrike(next)) {
    return [STRIKE_SPARE_VALUE + STRIKE_SPARE_VALUE];
  } 
  return [];
};

const scoreSpare = (next) => {
  if (next === undefined) {
    return [NIL];
  }
  else if (isNumber(next)) {
    return [STRIKE_SPARE_VALUE + next];
  }
  else if (isStrike(next)) {
    return [STRIKE_SPARE_VALUE + STRIKE_SPARE_VALUE];
  } else { return [];}
};

const scoreFrame = (bowl, nextBowl) =>{
 if (isNumber(bowl) && isNumber(nextBowl)) {
   return  [bowl + nextBowl];
}
return [];
}

const bowlingScoreRefactor = (frameArray) => {
  const currentScore = [];
  let step = 1;
  let len = frameArray.length;

  for (let i = 0; i < len; i += step) {
    const currentBowl = frameArray[i];
    const next = frameArray[i + 1];
    const nextNext = frameArray[i + 2];

    if (currentBowl === 'X') {
      currentScore.push(...scoreStrike(next, nextNext));
      step += 1;
      continue;
    } else if (isSpare(currentBowl)) {
      currentScore.push(...scoreSpare(next, nextNext));
      step += 1;
      continue;
    } else {
      currentScore.push(...scoreFrame(currentBowl, next));
      step += 2;
    }
  }

  return currentScore;
};

console.log(bowlingScoreRefactor(['/', 3, 1, 2, 1]));

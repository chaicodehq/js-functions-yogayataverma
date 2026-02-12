export const calcStrikeRate = (runs, balls) => {
  if (balls <= 0 || runs < 0) return 0;
  return Math.round(((runs / balls) * 100) * 100) / 100;
};

export const calcEconomy = (runsConceded, overs) => {
  if (overs <= 0 || runsConceded < 0) return 0;
  return Math.round((runsConceded / overs) * 100) / 100;
};

export const calcBattingAvg = (totalRuns, innings, notOuts = 0) => {
  if (innings - notOuts <= 0) return 0;
  return Math.round((totalRuns / (innings - notOuts)) * 100) / 100;
};

export const isAllRounder = (battingAvg, economy) => {
  return battingAvg > 30 && economy < 8;
};

export const getPlayerCard = (player) => {
  if (!player || !player.name) return null;
  const strikeRate = calcStrikeRate(player.runs, player.balls);
  const economy = calcEconomy(player.runsConceded, player.overs);
  const battingAvg = calcBattingAvg(player.totalRuns, player.innings, player.notOuts);
  return { name: player.name, strikeRate, economy, battingAvg, isAllRounder: isAllRounder(battingAvg, economy) };
};

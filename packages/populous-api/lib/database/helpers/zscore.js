
export const getZScoreForCompanyYear = (zScore, year) => {
  if (!zScore) {
    return 0
  }
  let zScoreData = zScore[year]
  if (!zScoreData) {
    return 0
  }
  let z_score = 0

  if (typeof zScoreData === 'object' && Object.keys(zScoreData).length > 0) {
    for(let code in zScoreData) {
      if (isFinite(zScoreData[code])) {
        z_score += zScoreData[code];
      }
    }
    z_score /= Object.keys(zScoreData).length;
  }
  if (!z_score) {
    return 0
  }
  return z_score
}

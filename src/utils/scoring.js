import { getAllPredictions } from './storage';
import { getAllActualResults } from './actualResults';
import { friends, matches } from '../data/matches';

const KNOCKOUT_POINTS = {
  'Round of 32': { outcome: 2,   score: 1   },
  'Round of 16': { outcome: 3,   score: 1.5 },
  'Quarterfinal': { outcome: 4,  score: 2   },
  'Semifinal':    { outcome: 5,  score: 2.5 },
  'Third Place':  { outcome: 5,  score: 2.5 },
  'Final':        { outcome: 6,  score: 3   },
};

const getStage = (matchId) => matches.find(m => m.id === matchId)?.stage ?? '';

export const calculateMatchPoints = (prediction, actualResult, stage) => {
  if (!prediction || !actualResult) return { points: 0, correctOutcome: false, correctScore: false };

  let points = 0;
  let correctOutcome = false;
  let correctScore = false;

  if (stage.startsWith('Group')) {
    // Group stage: 1pt correct outcome, 0.5pt bonus exact score
    if (prediction.result === actualResult.result) {
      points += 1;
      correctOutcome = true;
    }
    if (prediction.score.team1 === actualResult.score.team1 &&
        prediction.score.team2 === actualResult.score.team2) {
      points += 0.5;
      correctScore = true;
    }
  } else {
    // Knockout: outcome points for correct winner (pens irrelevant for outcome)
    // Score bonus requires matching scoreline AND matching pens flag
    const { outcome: outcomePoints, score: scorePoints } = KNOCKOUT_POINTS[stage] ?? { outcome: 2, score: 1 };

    if (prediction.result === actualResult.result) {
      points += outcomePoints;
      correctOutcome = true;
    }

    const pensMatch = (prediction.extraTime ?? false) === (actualResult.extraTime ?? false);
    if (prediction.score.team1 === actualResult.score.team1 &&
        prediction.score.team2 === actualResult.score.team2 &&
        pensMatch) {
      points += scorePoints;
      correctScore = true;
    }
  }

  return { points, correctOutcome, correctScore };
};

export const calculateUserScore = async (username) => {
  const allPredictions = await getAllPredictions();
  const allResults = await getAllActualResults();

  let totalPoints = 0;
  let matchesScored = 0;
  let correctOutcomes = 0;
  let correctScores = 0;

  Object.values(allPredictions).forEach((prediction) => {
    if (prediction.user === username) {
      const actualResult = allResults[prediction.matchId];
      if (actualResult) {
        const stage = getStage(prediction.matchId);
        const result = calculateMatchPoints(prediction, actualResult, stage);
        totalPoints += result.points;
        if (result.correctOutcome) correctOutcomes++;
        if (result.correctScore) correctScores++;
        matchesScored++;
      }
    }
  });

  return { totalPoints, matchesScored, correctOutcomes, correctScores };
};

export const getLeaderboard = async () => {
  const leaderboardPromises = friends.map(async (friend) => {
    const { totalPoints, matchesScored, correctOutcomes, correctScores } = await calculateUserScore(friend);
    return { username: friend, totalPoints, matchesScored, correctOutcomes, correctScores };
  });

  const leaderboard = await Promise.all(leaderboardPromises);
  leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
  return leaderboard;
};

export const getUserScoreBreakdown = async (username) => {
  const allPredictions = await getAllPredictions();
  const allResults = await getAllActualResults();

  const breakdown = [];

  Object.values(allPredictions).forEach((prediction) => {
    if (prediction.user === username) {
      const actualResult = allResults[prediction.matchId];
      if (actualResult) {
        const stage = getStage(prediction.matchId);
        const result = calculateMatchPoints(prediction, actualResult, stage);
        breakdown.push({
          matchId: prediction.matchId,
          prediction,
          actualResult,
          points: result.points,
          correctOutcome: result.correctOutcome,
          correctScore: result.correctScore,
        });
      }
    }
  });

  return breakdown;
};

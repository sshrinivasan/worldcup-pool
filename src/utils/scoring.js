// Scoring calculation utilities

import { getAllPredictions } from './storage';
import { getAllActualResults } from './actualResults';
import { friends } from '../data/matches';

// Calculate points for a single prediction vs actual result
// This is a placeholder - you'll provide the exact logic later
export const calculateMatchPoints = (prediction, actualResult) => {
  if (!prediction || !actualResult) return { points: 0, correctOutcome: false, correctScore: false };

  let points = 0;
  let correctOutcome = false;
  let correctScore = false;

  // PLACEHOLDER SCORING LOGIC
  // Example: 1 point for correct outcome, 1 bonus point for exact score

  // Check if outcome is correct (home win, draw, or away win)
  if (prediction.result === actualResult.result) {
    points += 1; // Correct outcome
    correctOutcome = true;
  }

  // Check if exact score is correct
  if (
    prediction.score.team1 === actualResult.score.team1 &&
    prediction.score.team2 === actualResult.score.team2
  ) {
    points += 1; // Exact score bonus
    correctScore = true;
  }

  return { points, correctOutcome, correctScore };
};

// Calculate total score for a specific user
export const calculateUserScore = async (username) => {
  const allPredictions = await getAllPredictions();
  const allResults = await getAllActualResults();

  let totalPoints = 0;
  let matchesScored = 0;
  let correctOutcomes = 0;
  let correctScores = 0;

  // Get all predictions for this user
  Object.values(allPredictions).forEach((prediction) => {
    if (prediction.user === username) {
      const actualResult = allResults[prediction.matchId];
      if (actualResult) {
        const result = calculateMatchPoints(prediction, actualResult);
        totalPoints += result.points;
        if (result.correctOutcome) correctOutcomes++;
        if (result.correctScore) correctScores++;
        matchesScored++;
      }
    }
  });

  return {
    totalPoints,
    matchesScored,
    correctOutcomes,
    correctScores
  };
};

// Get leaderboard with all users and their scores
export const getLeaderboard = async () => {
  const leaderboardPromises = friends.map(async (friend) => {
    const { totalPoints, matchesScored, correctOutcomes, correctScores } = await calculateUserScore(friend);
    return {
      username: friend,
      totalPoints,
      matchesScored,
      correctOutcomes,
      correctScores
    };
  });

  const leaderboard = await Promise.all(leaderboardPromises);

  // Sort by total points (descending)
  leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);

  return leaderboard;
};

// Get detailed breakdown for a specific user (including matches with 0 points)
export const getUserScoreBreakdown = async (username) => {
  const allPredictions = await getAllPredictions();
  const allResults = await getAllActualResults();

  const breakdown = [];

  Object.values(allPredictions).forEach((prediction) => {
    if (prediction.user === username) {
      const actualResult = allResults[prediction.matchId];
      if (actualResult) {
        const result = calculateMatchPoints(prediction, actualResult);
        breakdown.push({
          matchId: prediction.matchId,
          prediction,
          actualResult,
          points: result.points,
          correctOutcome: result.correctOutcome,
          correctScore: result.correctScore
        });
      }
    }
  });

  return breakdown;
};

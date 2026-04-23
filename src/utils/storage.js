// Supabase utility functions for managing predictions
import { supabase } from './supabaseClient';

export const savePrediction = async (matchId, user, prediction) => {
  try {
    const { data, error } = await supabase
      .from('predictions')
      .upsert({
        match_id: matchId,
        user_name: user,
        result: prediction.result,
        team1_score: prediction.score.team1,
        team2_score: prediction.score.team2,
        extra_time: prediction.extraTime ?? false,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'match_id,user_name'
      })
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving prediction:', error);
    throw error;
  }
};

export const getPrediction = async (matchId, user) => {
  try {
    const { data, error } = await supabase
      .from('predictions')
      .select('*')
      .eq('match_id', matchId)
      .eq('user_name', user)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found

    if (!data) return null;

    // Convert database format to app format
    return {
      matchId: data.match_id,
      user: data.user_name,
      result: data.result,
      score: {
        team1: data.team1_score,
        team2: data.team2_score
      },
      extraTime: data.extra_time ?? false,
      timestamp: data.created_at
    };
  } catch (error) {
    console.error('Error getting prediction:', error);
    return null;
  }
};

export const getAllPredictions = async () => {
  try {
    const { data, error } = await supabase
      .from('predictions')
      .select('*');

    if (error) throw error;

    // Convert to object format for compatibility
    const predictions = {};
    data.forEach(row => {
      const key = `${row.user_name}-${row.match_id}`;
      predictions[key] = {
        matchId: row.match_id,
        user: row.user_name,
        result: row.result,
        score: {
          team1: row.team1_score,
          team2: row.team2_score
        },
        extraTime: row.extra_time ?? false,
        timestamp: row.created_at
      };
    });

    return predictions;
  } catch (error) {
    console.error('Error getting all predictions:', error);
    return {};
  }
};

export const getPredictionsByMatch = async (matchId) => {
  try {
    const { data, error } = await supabase
      .from('predictions')
      .select('*')
      .eq('match_id', matchId);

    if (error) throw error;

    return data.map(row => ({
      matchId: row.match_id,
      user: row.user_name,
      result: row.result,
      score: {
        team1: row.team1_score,
        team2: row.team2_score
      },
      extraTime: row.extra_time ?? false,
      timestamp: row.created_at
    }));
  } catch (error) {
    console.error('Error getting predictions by match:', error);
    return [];
  }
};

export const getPredictionsByUser = async (user) => {
  try {
    const { data, error } = await supabase
      .from('predictions')
      .select('*')
      .eq('user_name', user);

    if (error) throw error;

    return data.map(row => ({
      matchId: row.match_id,
      user: row.user_name,
      result: row.result,
      score: {
        team1: row.team1_score,
        team2: row.team2_score
      },
      timestamp: row.created_at
    }));
  } catch (error) {
    console.error('Error getting predictions by user:', error);
    return [];
  }
};

export const clearAllPredictions = async () => {
  try {
    const { error } = await supabase
      .from('predictions')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows

    if (error) throw error;
  } catch (error) {
    console.error('Error clearing predictions:', error);
    throw error;
  }
};

// Supabase utility functions for managing actual match results (admin entered)
import { supabase } from './supabaseClient';

export const saveActualResult = async (matchId, result) => {
  try {
    const { data, error } = await supabase
      .from('actual_results')
      .upsert({
        match_id: matchId,
        result: result.result,
        team1_score: result.score.team1,
        team2_score: result.score.team2,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'match_id'
      })
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving actual result:', error);
    throw error;
  }
};

export const getActualResult = async (matchId) => {
  try {
    const { data, error } = await supabase
      .from('actual_results')
      .select('*')
      .eq('match_id', matchId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found

    if (!data) return null;

    return {
      matchId: data.match_id,
      result: data.result,
      score: {
        team1: data.team1_score,
        team2: data.team2_score
      },
      timestamp: data.created_at
    };
  } catch (error) {
    console.error('Error getting actual result:', error);
    return null;
  }
};

export const getAllActualResults = async () => {
  try {
    const { data, error } = await supabase
      .from('actual_results')
      .select('*');

    if (error) throw error;

    // Convert to object format for compatibility
    const results = {};
    data.forEach(row => {
      results[row.match_id] = {
        matchId: row.match_id,
        result: row.result,
        score: {
          team1: row.team1_score,
          team2: row.team2_score
        },
        timestamp: row.created_at
      };
    });

    return results;
  } catch (error) {
    console.error('Error getting all actual results:', error);
    return {};
  }
};

export const deleteActualResult = async (matchId) => {
  try {
    const { error } = await supabase
      .from('actual_results')
      .delete()
      .eq('match_id', matchId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting actual result:', error);
    throw error;
  }
};

export const clearAllActualResults = async () => {
  try {
    const { error } = await supabase
      .from('actual_results')
      .delete()
      .neq('match_id', 0); // Delete all rows

    if (error) throw error;
  } catch (error) {
    console.error('Error clearing actual results:', error);
    throw error;
  }
};

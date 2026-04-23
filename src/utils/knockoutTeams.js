// Supabase utility for managing knockout stage team assignments
import { supabase } from './supabaseClient';

// Get all qualified teams from group stages (you'll manually set these)
export const getAllQualifiedTeams = () => {
  return [
    { name: "Mexico", code: "MEX", flag: "🇲🇽" },
    { name: "South Korea", code: "KOR", flag: "🇰🇷" },
    { name: "South Africa", code: "RSA", flag: "🇿🇦" },
    { name: "Czechia", code: "CZE", flag: "🇨🇿" },
    { name: "Canada", code: "CAN", flag: "🇨🇦" },
    { name: "Switzerland", code: "SUI", flag: "🇨🇭" },
    { name: "Qatar", code: "QAT", flag: "🇶🇦" },
    { name: "Bosnia-Herzegovina", code: "BIH", flag: "🇧🇦" },
    { name: "Brazil", code: "BRA", flag: "🇧🇷" },
    { name: "Morocco", code: "MAR", flag: "🇲🇦" },
    { name: "Haiti", code: "HAI", flag: "🇭🇹" },
    { name: "Scotland", code: "SCO", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    { name: "USA", code: "USA", flag: "🇺🇸" },
    { name: "Paraguay", code: "PAR", flag: "🇵🇾" },
    { name: "Australia", code: "AUS", flag: "🇦🇺" },
    { name: "Türkiye", code: "TUR", flag: "🇹🇷" },
    { name: "Germany", code: "GER", flag: "🇩🇪" },
    { name: "Curaçao", code: "CUW", flag: "🇨🇼" },
    { name: "Ivory Coast", code: "CIV", flag: "🇨🇮" },
    { name: "Ecuador", code: "ECU", flag: "🇪🇨" },
    { name: "Netherlands", code: "NED", flag: "🇳🇱" },
    { name: "Sweden", code: "SWE", flag: "🇸🇪" },
    { name: "Tunisia", code: "TUN", flag: "🇹🇳" },
    { name: "Japan", code: "JPN", flag: "🇯🇵" },
    { name: "Belgium", code: "BEL", flag: "🇧🇪" },
    { name: "Egypt", code: "EGY", flag: "🇪🇬" },
    { name: "Iran", code: "IRN", flag: "🇮🇷" },
    { name: "New Zealand", code: "NZL", flag: "🇳🇿" },
    { name: "Spain", code: "ESP", flag: "🇪🇸" },
    { name: "Cabo Verde", code: "CPV", flag: "🇨🇻" },
    { name: "Saudi Arabia", code: "KSA", flag: "🇸🇦" },
    { name: "Uruguay", code: "URU", flag: "🇺🇾" },
    { name: "France", code: "FRA", flag: "🇫🇷" },
    { name: "Senegal", code: "SEN", flag: "🇸🇳" },
    { name: "Iraq", code: "IRQ", flag: "🇮🇶" },
    { name: "Norway", code: "NOR", flag: "🇳🇴" },
    { name: "Argentina", code: "ARG", flag: "🇦🇷" },
    { name: "Algeria", code: "ALG", flag: "🇩🇿" },
    { name: "Austria", code: "AUT", flag: "🇦🇹" },
    { name: "Jordan", code: "JOR", flag: "🇯🇴" },
    { name: "Portugal", code: "POR", flag: "🇵🇹" },
    { name: "DR Congo", code: "COD", flag: "🇨🇩" },
    { name: "Uzbekistan", code: "UZB", flag: "🇺🇿" },
    { name: "Colombia", code: "COL", flag: "🇨🇴" },
    { name: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { name: "Croatia", code: "CRO", flag: "🇭🇷" },
    { name: "Ghana", code: "GHA", flag: "🇬🇭" },
    { name: "Panama", code: "PAN", flag: "🇵🇦" }
  ];
};

// Save team assignment for a specific match
export const saveKnockoutTeamAssignment = async (matchId, team1, team2) => {
  try {
    const { data, error } = await supabase
      .from('knockout_assignments')
      .upsert({
        match_id: matchId,
        team1_code: team1.code,
        team1_name: team1.name,
        team1_flag: team1.flag,
        team2_code: team2.code,
        team2_name: team2.name,
        team2_flag: team2.flag,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'match_id'
      })
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving knockout team assignment:', error);
    throw error;
  }
};

// Get team assignment for a specific match
export const getKnockoutTeamAssignment = async (matchId) => {
  try {
    const { data, error } = await supabase
      .from('knockout_assignments')
      .select('*')
      .eq('match_id', matchId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found

    if (!data) return null;

    return {
      matchId: data.match_id,
      team1: {
        code: data.team1_code,
        name: data.team1_name,
        flag: data.team1_flag
      },
      team2: {
        code: data.team2_code,
        name: data.team2_name,
        flag: data.team2_flag
      },
      timestamp: data.created_at
    };
  } catch (error) {
    console.error('Error getting knockout team assignment:', error);
    return null;
  }
};

// Get all knockout team assignments
export const getAllKnockoutTeamAssignments = async () => {
  try {
    const { data, error } = await supabase
      .from('knockout_assignments')
      .select('*');

    if (error) throw error;

    // Convert to object format for compatibility
    const assignments = {};
    data.forEach(row => {
      assignments[row.match_id] = {
        matchId: row.match_id,
        team1: {
          code: row.team1_code,
          name: row.team1_name,
          flag: row.team1_flag
        },
        team2: {
          code: row.team2_code,
          name: row.team2_name,
          flag: row.team2_flag
        },
        timestamp: row.created_at
      };
    });

    return assignments;
  } catch (error) {
    console.error('Error getting all knockout team assignments:', error);
    return {};
  }
};

// Delete team assignment for a match
export const deleteKnockoutTeamAssignment = async (matchId) => {
  try {
    const { error } = await supabase
      .from('knockout_assignments')
      .delete()
      .eq('match_id', matchId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting knockout team assignment:', error);
    throw error;
  }
};

// Clear all knockout team assignments
export const clearAllKnockoutTeamAssignments = async () => {
  try {
    const { error } = await supabase
      .from('knockout_assignments')
      .delete()
      .neq('match_id', 0); // Delete all rows

    if (error) throw error;
  } catch (error) {
    console.error('Error clearing knockout team assignments:', error);
    throw error;
  }
};

// Get the display teams for a match (either assigned teams or default placeholder)
export const getMatchTeams = async (match) => {
  const assignment = await getKnockoutTeamAssignment(match.id);

  if (assignment) {
    return {
      team1: assignment.team1,
      team2: assignment.team2,
      isAssigned: true
    };
  }

  // Return original match teams
  return {
    team1: match.team1,
    team2: match.team2,
    isAssigned: false
  };
};

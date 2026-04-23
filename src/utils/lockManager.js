// Supabase utility for managing locked stages
import { supabase } from './supabaseClient';

// Get all locked stages
export const getLockedStages = async () => {
  try {
    const { data, error } = await supabase
      .from('locked_stages')
      .select('stage_name');

    if (error) throw error;

    return data.map(row => row.stage_name);
  } catch (error) {
    console.error('Error getting locked stages:', error);
    return [];
  }
};

// Check if a specific stage is locked
export const isstageLocked = async (stage) => {
  const lockedStages = await getLockedStages();
  return lockedStages.includes(stage);
};

// Lock a stage
export const lockStage = async (stage) => {
  try {
    const { error } = await supabase
      .from('locked_stages')
      .upsert({
        stage_name: stage
      }, {
        onConflict: 'stage_name'
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error locking stage:', error);
    throw error;
  }
};

// Unlock a stage
export const unlockStage = async (stage) => {
  try {
    const { error } = await supabase
      .from('locked_stages')
      .delete()
      .eq('stage_name', stage);

    if (error) throw error;
  } catch (error) {
    console.error('Error unlocking stage:', error);
    throw error;
  }
};

// Lock all stages
export const lockAllStages = async () => {
  const allStages = [
    'Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F',
    'Group G', 'Group H', 'Group I', 'Group J', 'Group K', 'Group L',
    'Round of 32', 'Round of 16', 'Quarterfinal', 'Semifinal', 'Third Place', 'Final'
  ];

  try {
    const stagesToInsert = allStages.map(stage => ({ stage_name: stage }));
    const { error } = await supabase
      .from('locked_stages')
      .upsert(stagesToInsert, {
        onConflict: 'stage_name'
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error locking all stages:', error);
    throw error;
  }
};

// Unlock all stages
export const unlockAllStages = async () => {
  try {
    const { error } = await supabase
      .from('locked_stages')
      .delete()
      .neq('stage_name', ''); // Delete all rows

    if (error) throw error;
  } catch (error) {
    console.error('Error unlocking all stages:', error);
    throw error;
  }
};

// Group stage names
const GROUP_STAGES = [
  'Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F',
  'Group G', 'Group H', 'Group I', 'Group J', 'Group K', 'Group L'
];

// Check if all group stages are locked
export const areGroupStagesLocked = async () => {
  const lockedStages = await getLockedStages();
  return GROUP_STAGES.every(stage => lockedStages.includes(stage));
};

// Lock all group stages
export const lockGroupStages = async () => {
  try {
    const stagesToInsert = GROUP_STAGES.map(stage => ({ stage_name: stage }));
    const { error } = await supabase
      .from('locked_stages')
      .upsert(stagesToInsert, {
        onConflict: 'stage_name'
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error locking group stages:', error);
    throw error;
  }
};

// Unlock all group stages
export const unlockGroupStages = async () => {
  try {
    const { error } = await supabase
      .from('locked_stages')
      .delete()
      .in('stage_name', GROUP_STAGES);

    if (error) throw error;
  } catch (error) {
    console.error('Error unlocking group stages:', error);
    throw error;
  }
};

// Get displayable stages (combines all groups into one "Group Stages" entry)
export const getDisplayStages = () => {
  return [
    'Group Stages',
    'Round of 32',
    'Round of 16',
    'Quarterfinal',
    'Semifinal',
    'Third Place',
    'Final'
  ];
};

// Check if a display stage is locked
export const isDisplayStageLocked = async (displayStage) => {
  if (displayStage === 'Group Stages') {
    return await areGroupStagesLocked();
  }
  return await isstageLocked(displayStage);
};

// Toggle lock for a display stage
export const toggleDisplayStageLock = async (displayStage) => {
  if (displayStage === 'Group Stages') {
    const isLocked = await areGroupStagesLocked();
    if (isLocked) {
      await unlockGroupStages();
    } else {
      await lockGroupStages();
    }
  } else {
    const isLocked = await isstageLocked(displayStage);
    if (isLocked) {
      await unlockStage(displayStage);
    } else {
      await lockStage(displayStage);
    }
  }
};

// Supabase utility for managing prediction visibility per stage
import { supabase } from './supabaseClient';

const ALL_STAGES = [
  'Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F',
  'Group G', 'Group H', 'Group I', 'Group J', 'Group K', 'Group L',
  'Round of 32', 'Round of 16', 'Quarterfinal', 'Semifinal', 'Third Place', 'Final'
];

const GROUP_STAGES = [
  'Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F',
  'Group G', 'Group H', 'Group I', 'Group J', 'Group K', 'Group L'
];

export const getDisplayStages = () => [
  'Group Stages',
  'Round of 32',
  'Round of 16',
  'Quarterfinal',
  'Semifinal',
  'Third Place',
  'Final'
];

export const getVisibleStages = async () => {
  try {
    const { data, error } = await supabase
      .from('visible_stages')
      .select('stage_name');
    if (error) throw error;
    return data.map(row => row.stage_name);
  } catch (error) {
    console.error('Error getting visible stages:', error);
    return [];
  }
};

const isStageVisible = async (stage) => {
  const visible = await getVisibleStages();
  return visible.includes(stage);
};

const showStage = async (stage) => {
  const { error } = await supabase
    .from('visible_stages')
    .upsert({ stage_name: stage }, { onConflict: 'stage_name' });
  if (error) throw error;
};

const hideStage = async (stage) => {
  const { error } = await supabase
    .from('visible_stages')
    .delete()
    .eq('stage_name', stage);
  if (error) throw error;
};

const areGroupStagesVisible = async () => {
  const visible = await getVisibleStages();
  return GROUP_STAGES.every(stage => visible.includes(stage));
};

const showGroupStages = async () => {
  const { error } = await supabase
    .from('visible_stages')
    .upsert(GROUP_STAGES.map(s => ({ stage_name: s })), { onConflict: 'stage_name' });
  if (error) throw error;
};

const hideGroupStages = async () => {
  const { error } = await supabase
    .from('visible_stages')
    .delete()
    .in('stage_name', GROUP_STAGES);
  if (error) throw error;
};

export const isDisplayStageVisible = async (displayStage) => {
  if (displayStage === 'Group Stages') return await areGroupStagesVisible();
  return await isStageVisible(displayStage);
};

export const toggleDisplayStageVisibility = async (displayStage) => {
  if (displayStage === 'Group Stages') {
    const visible = await areGroupStagesVisible();
    visible ? await hideGroupStages() : await showGroupStages();
  } else {
    const visible = await isStageVisible(displayStage);
    visible ? await hideStage(displayStage) : await showStage(displayStage);
  }
};

export const showAllStages = async () => {
  const { error } = await supabase
    .from('visible_stages')
    .upsert(ALL_STAGES.map(s => ({ stage_name: s })), { onConflict: 'stage_name' });
  if (error) throw error;
};

export const hideAllStages = async () => {
  const { error } = await supabase
    .from('visible_stages')
    .delete()
    .neq('stage_name', '');
  if (error) throw error;
};

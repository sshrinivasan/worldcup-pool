-- World Cup Pool Database Schema for Supabase
-- Run this in: Supabase Dashboard → SQL Editor → New Query

-- ===== TABLES =====

-- Predictions table
CREATE TABLE predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  match_id INTEGER NOT NULL,
  user_name TEXT NOT NULL,
  result TEXT NOT NULL CHECK (result IN ('home', 'draw', 'away')),
  team1_score INTEGER NOT NULL CHECK (team1_score >= 0),
  team2_score INTEGER NOT NULL CHECK (team2_score >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(match_id, user_name)
);

-- Actual results table
CREATE TABLE actual_results (
  match_id INTEGER PRIMARY KEY,
  result TEXT NOT NULL CHECK (result IN ('home', 'draw', 'away')),
  team1_score INTEGER NOT NULL CHECK (team1_score >= 0),
  team2_score INTEGER NOT NULL CHECK (team2_score >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Knockout team assignments table
CREATE TABLE knockout_assignments (
  match_id INTEGER PRIMARY KEY,
  team1_code TEXT NOT NULL,
  team1_name TEXT NOT NULL,
  team1_flag TEXT NOT NULL,
  team2_code TEXT NOT NULL,
  team2_name TEXT NOT NULL,
  team2_flag TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locked stages table
CREATE TABLE locked_stages (
  stage_name TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===== ROW LEVEL SECURITY (RLS) =====

ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE actual_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE knockout_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE locked_stages ENABLE ROW LEVEL SECURITY;

-- ===== POLICIES (Allow public access for simplicity) =====

-- Predictions policies
CREATE POLICY "Anyone can read predictions" ON predictions FOR SELECT USING (true);
CREATE POLICY "Anyone can insert predictions" ON predictions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update predictions" ON predictions FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete predictions" ON predictions FOR DELETE USING (true);

-- Actual results policies
CREATE POLICY "Anyone can read results" ON actual_results FOR SELECT USING (true);
CREATE POLICY "Anyone can insert results" ON actual_results FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update results" ON actual_results FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete results" ON actual_results FOR DELETE USING (true);

-- Knockout assignments policies
CREATE POLICY "Anyone can read assignments" ON knockout_assignments FOR SELECT USING (true);
CREATE POLICY "Anyone can insert assignments" ON knockout_assignments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update assignments" ON knockout_assignments FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete assignments" ON knockout_assignments FOR DELETE USING (true);

-- Locked stages policies
CREATE POLICY "Anyone can read locks" ON locked_stages FOR SELECT USING (true);
CREATE POLICY "Anyone can insert locks" ON locked_stages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete locks" ON locked_stages FOR DELETE USING (true);

-- ===== INDEXES for Performance =====

CREATE INDEX idx_predictions_match_user ON predictions(match_id, user_name);
CREATE INDEX idx_predictions_user ON predictions(user_name);
CREATE INDEX idx_predictions_match ON predictions(match_id);

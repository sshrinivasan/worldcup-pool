# Supabase Migration Guide

## Step 1: Create Supabase Project

1. Go to https://supabase.com and create account (free)
2. Create new project:
   - Name: `worldcup-pool`
   - Database Password: (create and save it!)
   - Region: Choose closest to you
3. Wait ~2 minutes for project to initialize

## Step 2: Get API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbG...` (long string)

## Step 3: Set Up Database Tables

Run this SQL in Supabase SQL Editor (Settings → SQL Editor):

```sql
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

-- Enable Row Level Security (RLS)
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE actual_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE knockout_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE locked_stages ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read/write (since we're using client-side auth)
-- For production, you'd want proper auth, but this works for your use case

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

-- Create indexes for better performance
CREATE INDEX idx_predictions_match_user ON predictions(match_id, user_name);
CREATE INDEX idx_predictions_user ON predictions(user_name);
CREATE INDEX idx_predictions_match ON predictions(match_id);
```

## Step 4: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

## Step 5: Create Environment File

Create `.env` file in project root:

```
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Important:** Add `.env` to `.gitignore` to keep credentials private!

## Step 6: Migration Complete!

After running all the migration steps, your app will:
- ✅ Store all data in Supabase (cloud database)
- ✅ Share predictions across all users
- ✅ Show real leaderboard with all players
- ✅ Sync admin changes to everyone instantly
- ✅ Work from any device

## Verification

Test these features:
1. Make prediction as User A on Device 1
2. Switch to User B on Device 2
3. View "All Predictions" - should see User A's prediction
4. Admin enters result on Device 1
5. Check "Pool Results" on Device 2 - should update automatically

## Troubleshooting

**"Failed to fetch" errors:**
- Check your Supabase URL and anon key are correct
- Verify tables were created (check Supabase Table Editor)
- Check browser console for detailed error messages

**Empty data:**
- Verify RLS policies are set up correctly
- Check Supabase logs (Settings → Logs)

**Slow performance:**
- Supabase free tier is fast enough for <100 users
- If needed, add more indexes on frequently queried columns

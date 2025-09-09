-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  navigator_domain TEXT DEFAULT 'procurement',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Simulation progress table
CREATE TABLE simulation_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  navigator_domain TEXT DEFAULT 'procurement',
  challenge_id INTEGER NOT NULL,
  status TEXT CHECK (status IN ('incomplete', 'complete')) DEFAULT 'incomplete',
  answers JSONB,
  score INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, navigator_domain, challenge_id)
);

-- Exercise submissions table
CREATE TABLE exercise_submissions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  navigator_domain TEXT DEFAULT 'procurement',
  exercise_id INTEGER NOT NULL,
  responses JSONB NOT NULL,
  score INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  time_spent INTEGER, -- in minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, navigator_domain, exercise_id)
);

-- Challenges table (static content)
CREATE TABLE challenges (
  id SERIAL PRIMARY KEY,
  navigator_domain TEXT DEFAULT 'procurement',
  title TEXT NOT NULL,
  scenario JSONB NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer CHAR(1) NOT NULL,
  feedback JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificates table
CREATE TABLE certificates (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  navigator_domain TEXT DEFAULT 'procurement',
  certificate_code UUID DEFAULT uuid_generate_v4(),
  score_level TEXT NOT NULL,
  total_score INTEGER NOT NULL,
  time_completed INTEGER, -- in minutes
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  certificate_url TEXT
);

-- User analytics table
CREATE TABLE user_analytics (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  navigator_domain TEXT DEFAULT 'procurement',
  session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_end TIMESTAMP WITH TIME ZONE,
  pages_visited JSONB,
  time_per_module JSONB,
  completion_rate DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table
CREATE TABLE admin_users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT DEFAULT 'admin',
  permissions JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content versions table (for admin management)
CREATE TABLE content_versions (
  id SERIAL PRIMARY KEY,
  navigator_domain TEXT DEFAULT 'procurement',
  content_type TEXT NOT NULL, -- 'challenge', 'exercise', 'video'
  content_id INTEGER NOT NULL,
  version INTEGER DEFAULT 1,
  content JSONB NOT NULL,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System analytics table
CREATE TABLE system_analytics (
  id SERIAL PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value JSONB NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_user_progress ON simulation_progress(user_id, navigator_domain, challenge_id);
CREATE INDEX idx_certificates ON certificates(user_id, navigator_domain, issued_at);
CREATE INDEX idx_analytics ON user_analytics(user_id, navigator_domain, session_start);
CREATE INDEX idx_challenges ON challenges(navigator_domain, id);
CREATE INDEX idx_exercises ON exercise_submissions(user_id, navigator_domain, exercise_id);
CREATE INDEX idx_user_profiles_domain ON user_profiles(navigator_domain);

-- Row Level Security (RLS) policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulation_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for simulation_progress
CREATE POLICY "Users can view own progress" ON simulation_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON simulation_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can upsert own progress" ON simulation_progress FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for exercise_submissions
CREATE POLICY "Users can view own submissions" ON exercise_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own submissions" ON exercise_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own submissions" ON exercise_submissions FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for certificates
CREATE POLICY "Users can view own certificates" ON certificates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own certificates" ON certificates FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_analytics
CREATE POLICY "Users can view own analytics" ON user_analytics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own analytics" ON user_analytics FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read access for challenges (static content)
CREATE POLICY "Challenges are publicly readable" ON challenges FOR SELECT USING (true);

-- Functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_simulation_progress_updated_at BEFORE UPDATE ON simulation_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exercise_submissions_updated_at BEFORE UPDATE ON exercise_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial challenge data
INSERT INTO challenges (id, title, scenario, question, options, correct_answer, feedback) VALUES
(1, 'The Friday Afternoon Crisis', 
 '{"time": "Day 1, 3:47 PM - Production Floor", "description": "The primary hydraulic system on Production Line 3 is losing pressure rapidly. Your maintenance team reports a critical seal failure that will shut down the line by Monday morning if not replaced. The seal costs $4,200 and requires special ordering from Germany with a normal 3-week lead time.\n\nProduction Line 3 manufactures 30% of your plant''s daily output. Each day of downtime costs approximately $85,000 in lost production. Your emergency purchase authority is $5,000, and your supervisor is unreachable at an off-site meeting."}',
 'What''s your first action?',
 '{"A": "Order the seal immediately using emergency purchase procedures - time is critical", "B": "Wait until Monday to follow normal procurement procedures and get proper approvals", "C": "Look for a cheaper alternative seal from a local supplier to stay under budget", "D": "First verify this truly qualifies as an emergency, then document justification before proceeding"}',
 'D',
 '{"A": {"correct": false, "message": "While speed matters, jumping straight to ordering without verification can create bigger problems. Emergency purchases that aren''t properly justified can face audit issues later. In one major manufacturer, $2.3M in emergency purchases were challenged because proper documentation wasn''t completed first.", "guidingQuestion": "What should you confirm before declaring any situation an emergency?"}, "B": {"correct": false, "message": "Waiting until Monday would cost $255,000 in lost production (3 days × $85,000) - far more than expediting the correct part. Normal procedures exist for routine situations, not genuine emergencies.", "guidingQuestion": "When production impact exceeds $85,000 per day, what type of purchase process should you consider?"}, "C": {"correct": false, "message": "Choosing cheaper alternatives for critical components often backfires. If the substitute seal fails, you''ll face the original downtime plus additional repair time. A pharmaceutical plant learned this lesson when a $300 \"equivalent\" part caused $1.2M in production losses.", "guidingQuestion": "What should drive your decision - initial cost or total impact on operations?"}, "D": {"correct": true, "message": "This systematic approach protects both you and your organization while addressing the urgent need. Verification prevents costly mistakes, documentation supports faster processing, ensures audit compliance, and maintains professional credibility.", "explanation": "Emergency purchases require systematic verification - not just urgency feelings. Document the business impact, equipment risks, and time constraints to build a solid case for expedited processing."}}');
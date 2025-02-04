-- Create users table
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  user_id text not null unique,
  email text not null unique,
  name text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table public.users enable row level security;

-- Create policies
create policy "Users can view their own data" on public.users
  for select using (auth.uid() = id);

create policy "Users can update their own data" on public.users
  for update using (auth.uid() = id);

-- Create indexes
create index users_user_id_idx on public.users (user_id);
create index users_email_idx on public.users (email);

-- Set up realtime
alter publication supabase_realtime add table public.users;

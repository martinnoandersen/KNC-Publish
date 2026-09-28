create table if not exists wires (
  id serial primary key,
  lang text not null,
  kicker text not null default '',
  text text not null,
  href text not null default '',
  urgent boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists comments (
  id serial primary key,
  group_key text not null,
  user_id text not null,
  body text not null,
  status text not null default 'visible',
  created_at timestamptz not null default now()
);

create index if not exists comments_group_idx on comments (group_key, status, created_at);

create table if not exists saves (
  user_id text not null,
  group_key text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, group_key)
);

create table if not exists follows (
  user_id text not null,
  kind text not null,
  target text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, kind, target)
);

create table if not exists subscriptions (
  user_id text not null,
  slug text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, slug)
);

create table if not exists corrections (
  id serial primary key,
  group_key text not null default '',
  lang text not null default 'ckb',
  note text not null,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id serial primary key,
  lang text not null,
  title text not null,
  place text not null default '',
  starts_on date not null,
  detail text not null default '',
  created_at timestamptz not null default now()
);

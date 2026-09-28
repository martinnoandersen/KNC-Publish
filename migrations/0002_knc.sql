create table if not exists profiles (
  user_id text primary key,
  slug text unique not null,
  display_name text not null,
  role text not null default 'reader',
  title text not null default '',
  location text not null default '',
  languages text not null default '',
  avatar_url text not null default '',
  email_public text not null default '',
  bio text not null default '{}',
  education text not null default '{}',
  experience text not null default '{}',
  is_staff boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists categories (
  id serial primary key,
  slug text unique not null,
  name text not null,
  sort int not null default 0
);

create table if not exists tags (
  id serial primary key,
  slug text unique not null,
  name text not null
);

create table if not exists articles (
  id serial primary key,
  group_key text not null,
  lang text not null,
  kind text not null default 'article',
  type text not null default 'standard',
  status text not null default 'draft',
  title text not null,
  dek text not null default '',
  body text not null default '',
  image text not null default '',
  image_caption text not null default '',
  category_slug text not null default '',
  author_id text not null references profiles (user_id),
  refs text not null default '[]',
  views int not null default 0,
  review_note text not null default '',
  reviewed_by text not null default '',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (group_key, lang)
);

create index if not exists articles_status_idx on articles (status, published_at desc);
create index if not exists articles_cat_idx on articles (category_slug, status);

create table if not exists placements (
  article_id int not null references articles (id) on delete cascade,
  zone text not null,
  primary key (article_id, zone)
);

create table if not exists article_tags (
  article_id int not null references articles (id) on delete cascade,
  tag_id int not null references tags (id) on delete cascade,
  primary key (article_id, tag_id)
);

create table if not exists pages (
  id serial primary key,
  slug text not null,
  lang text not null,
  title text not null,
  body text not null default '',
  status text not null default 'draft',
  updated_at timestamptz not null default now(),
  unique (slug, lang)
);

create table if not exists settings (
  key text primary key,
  value text not null
);

create table if not exists plugins (
  slug text primary key,
  enabled boolean not null default true
);

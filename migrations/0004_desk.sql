create table if not exists nav_items (
  id serial primary key,
  lang text not null,
  label text not null,
  href text not null default '',
  parent_id int,
  sort int not null default 0,
  mega boolean not null default false
);

create index if not exists nav_items_lang_idx on nav_items (lang, sort);

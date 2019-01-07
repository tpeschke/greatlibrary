update GLspellList
set
    name = $1,
    description = $2
where
    id = $3;

select id, name, description from GLspellList
where id = $3;
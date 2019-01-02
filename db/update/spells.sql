Update GLspells
set
    duration = $2, 
    aoe = $3, 
    components = $4
where
    name = $1;

select id from GLspells where name = $1
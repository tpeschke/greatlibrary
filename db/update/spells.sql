insert into GLspells (name, duration, aoe, components)
select * from (select $1, $2, $3, $4) as tmp
where not EXISTS (
    select name from GLspells where name = $1
) limit 1;

Update GLspells
set
    duration = $2, 
    aoe = $3, 
    components = $4
where
    name = $1
    and
    exists (select * from GLspells where name = $1);

select id from GLspells where name = $1
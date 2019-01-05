insert into GLmiracles (name, req)
select * from (select $1, $2) as tmp
where not EXISTS (
    select name from GLmiracles where name = $1
) limit 1;

Update GLmiracles
set
    req = $2 
where
    name = $1
        and
    exists (select * from GLspells where name = $1);

select id from GLmiracles where name = $1
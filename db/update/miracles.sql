Update GLmiracles
set
    req = $2 
where
    name = $1;

select id from GLmiracles where name = $1
insert into GLmiracleeffects (effect, index, miracleid)
select * from (select $1, $2, $3) as tmp
where not EXISTS (
    select * from GLmiracleeffects where miracleid = $3
) limit 1;

Update GLmiracleEffects 
set  
    effect = $1, 
    index = $2
Where miracleId = $3
    and
    exists (select * from GLmiracleeffects where miracleid = $3);
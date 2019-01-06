insert into GLspellEffects (effect, index, spellId)
select * from (select $1, $2, $3) as tmp
where not EXISTS (
    select spellId from GLspellEffects where spellId = $3 and index = $2
) limit 1;

Update GLspellEffects 
set  
    effect = $1, 
    index = $2
Where 
    spellId = $3
        and
    index = $2
        and
    exists (select spellId from GLspellEffects where spellId = $3);
SELECT distinct effect, index as id from GLspellEffects
where spellid = $1
order by index ASC
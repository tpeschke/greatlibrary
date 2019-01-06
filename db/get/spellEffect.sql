select id, effect from GLspellEffects
where spellid = $1
order by index ASC
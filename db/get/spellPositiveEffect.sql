SELECT distinct effect, index as id from GLspellpositive
where spellid = $1
order by index ASC
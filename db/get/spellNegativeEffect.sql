SELECT distinct effect, index as id from GLspellnegative
where spellid = $1
order by index ASC
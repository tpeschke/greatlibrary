SELECT distinct effect, index as id from GLmiracleEffects
where miracleid = $1
order by index ASC
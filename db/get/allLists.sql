select id, name, description from GLspelllist
where userid = $1
order by name asc
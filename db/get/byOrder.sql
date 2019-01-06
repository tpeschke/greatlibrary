select distinct glspells.id as id, glspells.name as name from glspellorders
join glorders on glorders.id = glspellorders.orderid
join glspells on glspells.id = glspellorders.spellid
where UPPER(glorders.name) like $1
order by glspells.name asc
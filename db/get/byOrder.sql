select distinct glspells.id as id, glspells.name as name, components from glspellorders
join glorders on glorders.id = glspellorders.orderid
join glspells on glspells.id = glspellorders.spellid
where 
    UPPER(glorders.name) like $1
        or
    UPPER(glorders.name) like 'ALL'
order by glspells.name asc
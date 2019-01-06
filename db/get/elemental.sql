select distinct glspells.id as id, glspells.name as name from glspellorders
join glorders on glorders.id = glspellorders.orderid
join glspells on glspells.id = glspellorders.spellid
where 
    UPPER(glorders.name) like 'ELEMENTAL'
        or
    UPPER(glorders.name) like 'AIR'
        or
    UPPER(glorders.name) like 'WATER'
        or
    UPPER(glorders.name) like 'EARTH'
        or
    UPPER(glorders.name) like 'FIRE'
        or
    UPPER(glorders.name) like 'CHAOS'
        or
    UPPER(glorders.name) like 'ORDER'
        or
    UPPER(glorders.name) like 'ALL'
order by glspells.name asc
select distinct glspells.id, name, duration, aoe, components, base_cost from glspells
join glspellpositive on glspellpositive.spellid = glspells.id
join glspellnegative on glspellnegative.spellid = glspells.id
where 
    name like UPPER('%'|| $1 ||'%')
        or
    UPPER(glspellpositive.effect) like UPPER('%'|| $1 ||'%')
        or
    UPPER(glspellnegative.effect) like UPPER('%'|| $1 ||'%');
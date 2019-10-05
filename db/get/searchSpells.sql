select distinct glspells.id, name, duration, aoe, components from glspells
join glspellpositive on glspelleffects.spellid = glspells.id
join glspellnegative on glspelleffects.spellid = glspells.id
where 
    name like UPPER('%'|| $1 ||'%')
        or
    UPPER(effect) like UPPER('%'|| $1 ||'%');
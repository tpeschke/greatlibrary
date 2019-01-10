select distinct glspells.id, name, duration, aoe, components from glspells
join glspelleffects on glspelleffects.spellid = glspells.id
where 
    name like UPPER('%'|| $1 ||'%')
        or
    UPPER(effect) like UPPER('%'|| $1 ||'%');
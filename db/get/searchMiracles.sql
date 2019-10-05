select distinct glMiracles.id, name, invocationdie from glMiracles
join glMiracleeffects on glMiracleeffects.Miracleid = glMiracles.id
where 
    name like UPPER('%'|| $1 ||'%')
        or
    UPPER(effect) like UPPER('%'|| $1 ||'%');
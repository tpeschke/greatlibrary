select id, name from GLspells
where 
    (UPPER(name) like UPPER('%'|| $1 ||'%'));    
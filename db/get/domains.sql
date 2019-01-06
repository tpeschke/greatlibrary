select name from glmiracledomains
join gldomains on gldomains.id = glmiracledomains.domainid
where miracleid = $1
order by name ASC
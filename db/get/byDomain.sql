select distinct glmiracles.id as id, glmiracles.name as name, invocationdie from glmiracledomains
join gldomains on gldomains.id = glmiracledomains.domainid
join glmiracles on glmiracles.id = glmiracledomains.miracleid
where 
    UPPER(gldomains.name) like $1
        or
    UPPER(gldomains.name) like 'ALL'
order by glmiracles.name asc
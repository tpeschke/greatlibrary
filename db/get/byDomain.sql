select distinct glmiracles.id as id, glmiracles.name as name from glmiracledomains
join gldomains on gldomains.id = glmiracledomains.domainid
join glmiracles on glmiracles.id = glmiracledomains.miracleid
where UPPER(gldomains.name) like $1
order by glmiracles.name asc
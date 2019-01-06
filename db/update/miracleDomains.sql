insert into GLmiracleDomains (miracleId, domainId)
select * from (select $1, (select id from gldomains where UPPER(name) like $2)) as tmp
where not EXISTS (
    select * from GLmiracleDomains where miracleid = $1 and domainId = (select id from gldomains where UPPER(name) like $2)
) limit 1;

Update GLmiracleDomains
set  
    miracleId = $1, 
    domainId = (select id from gldomains where UPPER(name) like $2)
Where 
    miracleId = $1
        and
    domainId = (select id from gldomains where UPPER(name) like $2)
        and
    exists (select * from GLdomains where miracleid = $1 and domainId = (select id from gldomains where UPPER(name) like $2));
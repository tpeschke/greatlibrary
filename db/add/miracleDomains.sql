insert into glmiracledomains 
    (miracleId, domainId) 
values 
    ($1, (select id from gldomains where name like $2));
insert into glspellorders (spellId, orderId) values ($1, (select id from glorders where name like $2));
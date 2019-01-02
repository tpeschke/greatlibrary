create table GLspells (
    id serial primary key,
    name varchar(40),
    duration varchar(40),
    aoe varchar(40),
    components varchar(40)
);

create table GLorders(
    id serial primary key,
    name varchar(40)
);

create table GLspellOrders (
    id serial primary key,
    spellId int,
    orderId int
);

create table GLspelleffects (
    id serial primary key,
    spellId int,
    index int,
    effect text
);

-- =============================================================== --

create table GLmiracles (
    id serial primary key,
    name varchar(50),
    req varchar(150)
);

create table GLdomains (
    id serial primary key,
    name varchar(40)
);

create table GLmiracleDomains (
    id serial primary key,
    miracleId int,
    domainId int
);

create table GLmiracleEffects (
    id serial primary key,
    miracleId int,
    index int,
    effect text
)
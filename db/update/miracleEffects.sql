-- Update GLspellEffects 
-- set  
--     effect = $1, 
--     index = $2
-- Where spellId = $3;

insert into GLmiracleEffects (effect, index, miracleId) values ($1, $2, $3)
select glspells.id, name, duration, aoe, components from gllist
join glspells on glspells.id = gllist.spellid
where gllist.listid = $1
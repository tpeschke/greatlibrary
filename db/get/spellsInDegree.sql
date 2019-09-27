select glspells.id, name, duration, aoe, components, base_cost, modmag, modaoe, modduration, modposbuydown, modnegbuydown from gllist
join glspells on glspells.id = gllist.spellid
where gllist.modmag = $1
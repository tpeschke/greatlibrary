const { magic, divine, auth } = require('./serv-config')
    , rp = require('request-promise')

module.exports = {
    /// GET ///

    getSingle: (req, res) => {
        const db = req.app.get('db')
        let { id } = req.params

        if (id.substring(0, 1) === 'm') {
            db.get.miracle(id.substring(1)).then(result => {
                db.get.miracleEffect(id.substring(1)).then(eff => {
                    let effects = []
                    let domains = []
                    db.get.domains(id.substring(1)).then(dom => {
                        dom.forEach(val => domains.push(val.name))
                        eff.forEach(val => effects.push(val.effect))
                        res.send(Object.assign(result[0], { effects }, { domains }))
                    })
                })
            })
        } else {
            db.get.spell(id.substring(1)).then(result => {
                db.get.spellEffect(id.substring(1)).then(eff => {
                    let effects = []
                    eff.forEach(val => effects.push(val.effect))
                    res.send(Object.assign(result[0], { effects }))
                })
            })
        }
    },
    getDomain: (req, res) => {
        const db = req.app.get('db')
        let { domain } = req.params

        if (domain === 'All') {
            db.glmiracles.find().then(list => {
                let finalList = list.map(val => {
                    let finalSpell = db.get.miracleEffect(val.id).then(eff => {
                        let effects = []
                        eff.forEach(v => effects.push(v.effect))
                        return Object.assign(val, { effects })
                    })
                    return finalSpell
                })
                Promise.all(finalList).then(finalArray => res.send(finalArray))
            })
        } else {
            db.get.byDomain(domain.toUpperCase()).then(list => {
                let finalList = list.map(val => {
                    let finalSpell = db.get.miracleEffect(val.id).then(eff => {
                        let effects = []
                        eff.forEach(v => effects.push(v.effect))
                        return Object.assign(val, { effects })
                    })
                    return finalSpell
                })
                Promise.all(finalList).then(finalArray => res.send(finalArray))
            })
        }
    },
    getOrder: (req, res) => {
        const db = req.app.get('db')
        let { order } = req.params

        if (order.toUpperCase === "ELEMENTAL") {
            db.get.elemental(order.toUpperCase()).then(list => {
                let finalList = list.map(val => {
                    let finalSpell = db.get.spellEffect(val.id).then(eff => {
                        let effects = []
                        eff.forEach(v => effects.push(v.effect))
                        return Object.assign(val, { effects })
                    })
                    return finalSpell
                })
                Promise.all(finalList).then(finalArray => res.send(finalArray))
            })
        } else if (order === "All") {
            db.glspells.find().then(list => {
                let finalList = list.map(val => {
                    let finalSpell = db.get.spellEffect(val.id).then(eff => {
                        let effects = []
                        eff.forEach(v => effects.push(v.effect))
                        return Object.assign(val, { effects })
                    })
                    return finalSpell
                })
                Promise.all(finalList).then(finalArray => res.send(finalArray))
            })
        } else {
            db.get.byOrder(order.toUpperCase()).then(list => {
                let finalList = list.map(val => {
                    let finalSpell = db.get.spellEffect(val.id).then(eff => {
                        let effects = []
                        eff.forEach(v => effects.push(v.effect))
                        return Object.assign(val, { effects })
                    })
                    return finalSpell
                })
                Promise.all(finalList).then(finalArray => res.send(finalArray))
            })
        }
    },
    allLists: (req, res) => {
        const db = req.app.get('db')

        if (!req.user) {
            res.status(401).send('no')
        } else {
            let { id } = req.user
            db.get.allLists(id).then(result => res.send(result))
        }
    },
    getList: (req, res) => {
        const db = req.app.get('db')

        if (!req.user) {
            res.status(200).send('no')
        } else {
            let { id } = req.params
            db.get.spellsInList(id).then(result => {
                let finalList = result.map(val => {
                    let finalSpell = db.get.spellEffect(val.id).then(eff => {
                        let effects = []
                        eff.forEach(v => effects.push(v.effect))
                        return Object.assign(val, { effects })
                    })
                    return finalSpell
                })
                Promise.all(finalList).then(finalArray => res.send(finalArray))
            })
        }

    },
    getOrders: (req, res) => {
        const db = req.app.get('db')
        db.glorders.find().then(result => res.send(result))
    },
    getDomains: (req, res) => {
        const db = req.app.get('db')

        db.gldomains.find().then(result => res.send(result))
    },
    getSingleList: (req, res) => {
        const db = req.app.get('db')
        let { id } = req.params

        db.glspelllist.find(+id).then(result => res.send(result))
    },
    search: (req, res) => {
        const db = req.app.get('db')
        let { search, type } = req.body

        if (type === 'order') {
            db.get.searchSpells(search).then(list => {
                let finalList = list.map(val => {
                    let finalSpell = db.get.spellEffect(val.id).then(eff => {
                        let effects = []
                        eff.forEach(v => effects.push(v.effect))
                        return Object.assign(val, { effects })
                    })
                    return finalSpell
                })
                Promise.all(finalList).then(finalArray => res.send(finalArray))
            })
        } else {
            db.get.searchMiracles(search).then(list => {
                let finalList = list.map(val => {
                    let finalSpell = db.get.miracleEffect(val.id).then(eff => {
                        let effects = []
                        eff.forEach(v => effects.push(v.effect))
                        return Object.assign(val, { effects })
                    })
                    return finalSpell
                })
                Promise.all(finalList).then(finalArray => res.send(finalArray))
            })
        }
    },

    /// POST ///

    newList: (req, res) => {
        const db = req.app.get('db')
        let { name, description } = req.body

        let { id, gl } = req.user

        db.get.listCount(id).then(count => {
            if (gl === 1 || +count[0].count === 1) {
                res.status(200).send('too many lists')
            } else if (gl * 2 <= +count[0].count) {
                res.status(200).send('too many lists')
            } else {
                db.add.list(id, name, description).then(result => res.send(result))
            }
        })
    },
    addSpell: (req, res) => {
        const db = req.app.get('db')
        let { spellid, listid } = req.body

        db.add.spell(spellid, listid).then(_ => res.send('done'))
    },
    allSpells: (req, res) => {
        const db = req.app.get('db')
        let { type, listid } = req.body
        let array = []

        db.get.idsByOrder(type.toUpperCase()).then(ids => {
            ids.forEach(val => {
                array.push(db.add.spell(val.id, listid).then())
            })
            Promise.all(array).then(_ => res.send('done'))
        })
    },

    /// PATCH ///

    updateListInfo: (req, res) => {
        const db = req.app.get('db')
        let { name, description, id } = req.body

        db.update.list(name, description, id).then(result => res.send(result))
    },

    /// DELETE ///

    deleteSpell: (req, res) => {
        const db = req.app.get('db')
        let { spellid, listid } = req.query

        db.delete.spell(spellid, listid).then(_ => res.send('done'))
    },
    deleteList: (req, res) => {
        const db = req.app.get('db')
        let { id } = req.params

        db.delete.list(id).then(_ => res.send('done'))
    },

    // UPDATE AND PURE GETS

    updateList: (req, res) => {
        if (req.body.auth === auth) {
            const db = req.app ? req.app.get('db') : req.body.a
            let promise = []
            let spellCut = '>SPELL DESCRIPTIONS<'
            let miracleCut = '>MIRACLE DESCRIPTIONS<'

            rp(magic).then(html => {
                let descript = html.split(spellCut)[1].match(/<span.*?>.*?<\/span>/g)
                let indexes = []

                for (let i = 0; i < descript.length; i++) {
                    if (descript[i].indexOf('ORDERS') !== -1) {
                        indexes.push(i - 2)
                    }
                }

                for (let i = 0; i < indexes.length; i++) {
                    let offset = descript[indexes[i] + 3].replace(/<(?:.|\n)*?>/gm, '') === '&nbsp;' ? 4 : 3;
                    let orders = descript[indexes[i] + offset].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '').split(' | ')
                    let effects = []

                    for (x = indexes[i] + offset + 8; x < indexes[i + 1]; x++) {
                        effects.push(descript[x].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''))
                    }

                    db.update.spells(descript[indexes[i]].replace(/<(?:.|\n)*?>/gm, ''), descript[indexes[i] + offset + 2].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''), descript[indexes[i] + offset + 4].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''), descript[indexes[i] + offset + 6].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''))
                        .then(id => {
                            let spellid = id[0].id
                            effects.forEach((val, i) => {
                                promise.push(db.update.spellEffects(val, i + 1, spellid).then().catch(e => console.log(e)))
                            })
                            db.delete.spellOrders(id[0].id).then(_ => {
                                orders.forEach(val => {
                                    promise.push(db.add.spellOrder(spellid, val).then().catch(e => console.log(e)))
                                })
                            })
                        }).catch(e => console.log(e))
                }
            })

            rp(divine).then(html => {
                let descript = html.split(miracleCut)[1].match(/<span.*?>.*?<\/span>/g)
                let indexes = []

                for (let i = 0; i < descript.length; i++) {
                    if (descript[i].indexOf('EFFECT') !== -1) {
                        let index = descript[i - 2].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '') === 'PREREQUISITE' ? i - 4 : i - 2;
                        indexes.push(index)
                    }
                }

                for (let i = 0; i < indexes.length; i++) {
                    let effects = []
                    let offset = descript[indexes[i] + 2].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '') === "PREREQUISITE" ? 2 : 0;
                    let domains = descript[indexes[i] + 1].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '').split(' | ')

                    for (x = indexes[i] + offset + 3; x < indexes[i + 1]; x++) {
                        let effect = descript[x].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '')
                        if (effect !== '') {
                            effects.push(descript[x].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''))
                        }
                    }

                    db.update.miracles(descript[indexes[i]].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''), offset === 0 ? 'none' : descript[indexes[i] + 3].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''))
                        .then(id => {
                            let miracleid = id[0].id
                            effects.forEach((val, i) => {
                                promise.push(db.update.miracleEffects(val, i + 1, miracleid).then())
                            })
                            domains.forEach((val) => {
                                promise.push(db.update.miracleDomains(miracleid, val.toUpperCase()).then())
                            })
                            db.delete.miracleDomains(id[0].id).then(_ => {
                                domains.forEach(val => {
                                    promise.push(db.add.miracleDomains(miracleid, val).then())
                                })
                            })
                        })

                }
            })

            Promise.all(promise).then(final => res.send("done"))
        }
    },
    getMagic: (req, res) => {
        let description = '>SPELL DESCRIPTIONS<'

        rp(magic).then(html => {
            let descript = html.split(description)[1].match(/<span.*?>.*?<\/span>/g)
            let indexes = []
            let spells = []

            for (let i = 0; i < descript.length; i++) {
                if (descript[i].indexOf('ORDERS') !== -1) {
                    indexes.push(i - 2)
                }
            }

            for (let i = 0; i < indexes.length; i++) {
                let offset = descript[indexes[i] + 3].replace(/<(?:.|\n)*?>/gm, '') === '&nbsp;' ? 4 : 3;
                let effects = []

                for (x = indexes[i] + offset + 8; x < indexes[i + 1]; x++) {
                    effects.push(descript[x].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '').replace('/&RSQUO;/g', "'"))
                }

                spells.push({
                    name: descript[indexes[i]].replace(/<(?:.|\n)*?>/gm, ''),
                    orders: descript[indexes[i] + offset].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '').split(' | '),
                    duration: descript[indexes[i] + offset + 2].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''),
                    aoe: descript[indexes[i] + offset + 4].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''),
                    components: descript[indexes[i] + offset + 6].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''),
                    effects
                })
            }

            res.send(spells)
        })
    },
    getDivine: (req, res) => {
        let description = '>MIRACLE DESCRIPTIONS<'

        rp(divine).then(html => {
            let descript = html.split(description)[1].match(/<span.*?>.*?<\/span>/g)
            let indexes = []
            let miracles = []

            for (let i = 0; i < descript.length; i++) {
                if (descript[i].indexOf('EFFECT') !== -1) {
                    let index = descript[i - 2].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '') === 'PREREQUISITE' ? i - 4 : i - 2;
                    indexes.push(index)
                }
            }

            for (let i = 0; i < indexes.length; i++) {
                let effects = []
                let offset = descript[indexes[i] + 2].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '') === "PREREQUISITE" ? 2 : 0;

                for (x = indexes[i] + offset + 3; x < indexes[i + 1]; x++) {
                    let effect = descript[x].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '')
                    if (effect !== '') {
                        effects.push(descript[x].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''))
                    }
                }

                miracles.push({
                    name: descript[indexes[i]].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''),
                    convenants: descript[indexes[i] + 1].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '').split(' | '),
                    req: offset === 0 ? 'none' : descript[indexes[i] + 3].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''),
                    effects
                })
            }

            res.send(miracles)
        })
    }
}

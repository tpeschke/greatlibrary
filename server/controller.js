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
                    let finalSpell = db.get.spellPositiveEffect(val.id).then(eff => {
                        let positive = []
                        eff.forEach(v => positive.push(v.effect))
                        return Object.assign(val, { positive })
                    })
                    return finalSpell
                })
                Promise.all(finalList).then(finalArray => {
                    let spellArrayWithNegative = finalArray.map(val => {
                        let spellWithNegative = db.get.spellNegativeEffect(val.id).then(negEff => {
                            let negative = []
                            negEff.forEach(nv => negative.push(nv.effect))
                            return Object.assign(val, { negative })
                        })
                        return spellWithNegative
                    })
                    Promise.all(spellArrayWithNegative).then(finalSpellArray => res.send(finalSpellArray))
                })
            })
        } else if (order === "All") {
            db.glspells.find().then(list => {
                let finalList = list.map(val => {
                    let finalSpell = db.get.spellPositiveEffect(val.id).then(eff => {
                        let positive = []
                        eff.forEach(v => positive.push(v.effect))
                        return Object.assign(val, { positive })
                    })
                    return finalSpell
                })
                Promise.all(finalList).then(finalArray => {
                    let spellArrayWithNegative = finalArray.map(val => {
                        let spellWithNegative = db.get.spellNegativeEffect(val.id).then(negEff => {
                            let negative = []
                            negEff.forEach(nv => negative.push(nv.effect))
                            return Object.assign(val, { negative })
                        })
                        return spellWithNegative
                    })
                    Promise.all(spellArrayWithNegative).then(finalSpellArray => res.send(finalSpellArray))
                })
            })
        } else {
            db.get.byOrder(order.toUpperCase()).then(list => {
                let finalList = list.map(val => {
                    let finalSpell = db.get.spellPositiveEffect(val.id).then(eff => {
                        let positive = []
                        eff.forEach(v => positive.push(v.effect))
                        return Object.assign(val, { positive })
                    })
                    return finalSpell
                })
                Promise.all(finalList).then(finalArray => {
                    let spellArrayWithNegative = finalArray.map(val => {
                        let spellWithNegative = db.get.spellNegativeEffect(val.id).then(negEff => {
                            let negative = []
                            negEff.forEach(nv => negative.push(nv.effect))
                            return Object.assign(val, { negative })
                        })
                        return spellWithNegative
                    })
                    Promise.all(spellArrayWithNegative).then(finalSpellArray => res.send(finalSpellArray))
                })
            })
        }
    },
    allLists: (req, res) => {
        const db = req.app.get('db')

        if (!req.user) {
            res.send('no')
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
                    let finalSpell = db.get.spellPositiveEffect(val.id).then(eff => {
                        let positive = []
                        eff.forEach(v => positive.push(v.effect))
                        return Object.assign(val, { positive })
                    })
                    return finalSpell
                })
                Promise.all(finalList).then(finalArray => {
                    let spellArrayWithNegative = finalArray.map(val => {
                        let spellWithNegative = db.get.spellNegativeEffect(val.id).then(negEff => {
                            let negative = []
                            negEff.forEach(nv => negative.push(nv.effect))
                            return Object.assign(val, { negative })
                        })
                        return spellWithNegative
                    })
                    Promise.all(spellArrayWithNegative).then(finalSpellArray => res.send(finalSpellArray))
                })
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
        let { search, type } = req.query

        if (type === 'order') {
            db.get.searchSpells(search).then(list => {
                let finalList = list.map(val => {
                    let finalSpell = db.get.spellPositiveEffect(val.id).then(eff => {
                        let positive = []
                        let negative = []
                        eff.forEach(v => positive.push(v.effect))
                        db.get.spellNegativeEffect(val.id).then(negEff => {
                            negEff.forEach(nv => negative.push(nv.effect))
                        })
                        return Object.assign(val, { positive, negative })
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

        let { id, gl } = req.user

        db.get.listCount(id).then(count => {
            if (gl === 1 && +count[0].count === 1) {
                res.status(200).send('too many lists')
            } else if (gl * 2 <= +count[0].count) {
                res.status(200).send('too many lists')
            } else {
                db.add.list(id, "New List", "New Description").then(result => res.send(result))
            }
        })
    },
    addSpell: (req, res) => {
        const db = req.app.get('db')
        let { spellid, listid, degree, pos, neg, aoe, duration } = req.body

        db.add.spell(spellid, listid, degree, aoe, duration, pos, neg).then(_ => res.send('done'))
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
    }
}

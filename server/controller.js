const {magic, divine} = require('./serv-config')
    , rp = require('request-promise')

module.exports = {
    getMagic: (req, res) => {
        let description = '>SPELL DESCRIPTIONS<'

        rp(magic).then(html => {
            let descript = html.split(description)[1].match(/<span.*?>.*?<\/span>/g)
            let indexes = []
            let spells = []
            let id = 1

            for (let i = 0; i < descript.length; i++) {
                if (descript[i].indexOf('ORDERS') !== -1) {
                    indexes.push(i-2)
                }
            }

            for (let i = 0; i < indexes.length; i++) {
                let offset = descript[indexes[i]+3].replace(/<(?:.|\n)*?>/gm, '') === '&nbsp;' ? 4 : 3;
                let effects = []
            
                for (x = indexes[i] + offset + 8; x < indexes[i+1]; x++) {
                    effects.push(descript[x].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''))
                }

                spells.push({
                    id,
                    name: descript[indexes[i]].replace(/<(?:.|\n)*?>/gm, ''),
                    orders: descript[indexes[i]+offset].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '').split(' | '),
                    duration: descript[indexes[i]+offset+2].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''),
                    aoe: descript[indexes[i]+offset+4].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''),
                    components: descript[indexes[i]+offset+6].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '').replace(/&rsquo;/g, "'"),
                    effects
                })

                id = id+1
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
                    let index = descript[i-2].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '') === 'PREREQUISITE' ? i - 4 : i - 2;
                    indexes.push(index)
                }
            }

            for (let i = 0; i < indexes.length; i++) {
                let effects = []
                let offset = descript[indexes[i]+2].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '') === "PREREQUISITE" ? 2 : 0 ;

                for (x = indexes[i] +offset +3; x < indexes[i+1]; x++) {
                    let effect = descript[x].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '').replace(/&rsquo;/g, "'")
                    if (effect !== '') {
                        effects.push(descript[x].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '').replace(/&rsquo;/g, "'"))
                    }
                }

                miracles.push({
                    name: descript[indexes[i]].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''),
                    convenants: descript[indexes[i]+1].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, '').split(' | '),
                    req: offset === 0 ? 'none' : descript[indexes[i]+3].replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ''),
                    effects
                })
            }

            res.send(miracles)
        })
    }
}
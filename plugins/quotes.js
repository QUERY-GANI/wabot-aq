const axios = require('axios')

let handler  = async (m, { conn }) => {
        const fetching = await axios.get(global.API('free', '/randomquotes'))
        const quote = fetching.data
        if (quote.status === 200) {
            teks = `
            *Author : ${quote.author}*
            \n*Quotes : ${quote.quotes}*
            `.trim()
            conn.reply(m.chat, teks, m)
        } else throw '*Sedang maintance!*'
}

handler.tags = ['quotes']
handler.help = ['quote']
handler.command = /^rquote|rq|quote$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.limit = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
  
  
const axios = require('axios')

let handler = async (m, { conn, text }) => {
    if (text) {
        try {
            const pinterest = await axios.get('https://api.zeks.xyz/api/pin?q=' + encodeURIComponent(text) + '&apikey=apivinz')
            if (pinterest.data.status == false) return conn.reply(m.chat, pinterest.data.message, m)
            if (pinterest.data.status == true) {
                const p = pinterest.data.result
                conn.sendFile(m.chat, p, 'pinterest.jpg', `*Pinterest: ${text}*`, m)
            } else throw 'Uhm..yang kamu cari tidak ditemukan.'
        } catch (e) {
            console.log(('[ERROR]', 'red'), e)
        }
    } else throw 'Uhm...Teksnya mana?\ncontoh: .pinterest estetik'

}
handler.help = ['pinterest <search>']
handler.tags = ['internet']
handler.command = /^pinterest$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.limit = true

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
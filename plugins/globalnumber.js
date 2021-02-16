const PhoneNumber = require('awesome-phonenumber')

let handler = (m, { conn, text }) => {
    if (!text) throw '*Nomornya mana?*'
    if (isNaN(text)) throw '*Contoh : #getglobal 628156307437*'
    if (text.startsWith('0')) throw '*Contoh : #getglobal 628156307437*'
    let no = PhoneNumber('+' + text).getNumber('international')
    conn.reply(m.chat, no, m)
}
handler.help = ['global <number>']
handler.tags = ['info']
handler.command = /^getglobal$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler
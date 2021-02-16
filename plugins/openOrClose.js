const { GroupSettingChange } = require('@adiwajshing/baileys')

let handler  = async (m, { conn, args }) => {
    if (args[0] === 'open') {
        conn.reply(m.chat, `*BERHASIL MEMBUKA GROUP*`, m)
        conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, false)
    } else if (args[0] === 'close') {
        conn.reply(m.chat, `*BERHASIL MENUTUP GROUP*`, m)
        conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, true)
    } else {
        throw '*Contoh : #group open*'
    }
}

handler.help = ['group <open/close>']
handler.tags = ['group']
handler.command = /^(group)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = true
handler.botAdmin = true

handler.fail = null

module.exports = handler 
  
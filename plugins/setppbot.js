const fs = require('fs')
const { Presence } = require('@adiwajshing/baileys')

let handler  = async (m, { conn }) => {
    const type = Object.keys(m.message)[0]
    const content = JSON.stringify(m.message)
    const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
    conn.updatePresence(m.chat, Presence.composing)
    if (!isQuotedImage && !content.includes('imageMessage')) return conn.reply(m.chat, `*Kirim gambar dengan caption #setbotpp atau tag gambar yang sudah dikirim*`, m)
    if (isQuotedImage) {
        enmedia = JSON.parse(JSON.stringify(m).replace('quotedM','m')).message.extendedTextMessage.contextInfo
        media = await conn.downloadAndSaveMediaMessage(enmedia)
    }  else {
        media = await conn.downloadAndSaveMediaMessage(m)
    }
    await conn.updateProfilePicture(conn.user.jid, media)
    fs.unlinkSync(media)
    conn.reply(m.chat, '*ありがとございました!*', m)
}

handler.help = ['setppbot']
handler.tags = ['owner']
handler.command = /^(setppbot|spb)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false 

handler.fail = null

module.exports = handler
  
  
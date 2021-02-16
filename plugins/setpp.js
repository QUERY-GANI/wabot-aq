const fs = require('fs')

let handler  = async (m, { conn }) => {
    const type = Object.keys(m.message)[0]
    const content = JSON.stringify(m.message)
    const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
    if (!isQuotedImage && !content.includes('imageMessage')) return conn.reply(m.chat, `*Kirim gambar dengan caption #setbotpp atau tag gambar yang sudah dikirim*`, m)
    if (isQuotedImage) {
        enmedia = JSON.parse(JSON.stringify(m).replace('quotedM','m')).message.extendedTextMessage.contextInfo
        media = await conn.downloadAndSaveMediaMessage(enmedia)
    }  else {
        media = await conn.downloadAndSaveMediaMessage(m)
    }
    
    try {
        await conn.updateProfilePicture(m.chat, media)
    } catch (e) {
        throw 'Harus jpg / png!'
    }
    fs.unlinkSync(media)
    conn.reply(m.chat, '*SUCCESS CHANGE PROFILE GROUP!*', m)
}

handler.help = ['setpp']
handler.tags = ['group']
handler.command = /^(setpp|sp)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = true
handler.botAdmin = true

handler.fail = null

module.exports = handler 
  
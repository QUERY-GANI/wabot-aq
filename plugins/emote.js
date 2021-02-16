const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const { spawn } = require('child_process')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text }) => {
    if (text.length >= 3) {
        throw 'Hanya boleh 1 emote!'
    } else if (!text) {
        throw 'Uhm...Teksnya mana?\ncontoh: #ets ❤️'
    } else if (text) {
        // conn.sendFile(m.chat, ets, 'emoji-image.png', '', m, false, { asSticker: false, quoted: m })
        let ets = await fetch('https://api.zeks.xyz/api/emoji-image?apikey=apivinz&emoji=' + encodeURIComponent(text))
        if (ets.status !== 200) throw 'jangan goblok lhaa'
        let e = await ets.buffer()
        if (!e) throw e
        let stiker = await toSticker(e)
        conn.sendMessage(m.chat, stiker, MessageType.sticker, {
            quoted: m
        })
    }
}
handler.help = ['ets <emoji>']
handler.tags = ['sticker']
handler.command = /^(ets|emojitosticker|emojitostiker|stikeremoji|stickeremoji)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.maintenance = false

handler.fail = null
handler.limit = true

module.exports = handler

function toSticker(buffer, ext) {
    let tmp = path.join(__dirname, '../tmp/' + (new Date * 1) + '.' + ext)
    let out = tmp.replace(new RegExp(ext + '$'), 'webp')
    return new Promise((resolve, reject) => {
        fs.writeFileSync(tmp, buffer)
        spawn('ffmpeg', [
            '-y',
            '-i', tmp,
            `-vcodec`, `libwebp`,
            `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            '-f', 'webp',
            out])
            .on('error', reject)
            .on('error', () => fs.unlinkSync(tmp))
            .on('exit', () => {
                resolve(fs.readFileSync(out))
                fs.unlinkSync(tmp)
                if (fs.existsSync(out)) fs.unlinkSync(out)
            })
    })

}
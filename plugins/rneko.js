const axios = require('axios')

let handler = async (m, { conn }) => {
    try {
        const waifu = await axios.get('https://waifu.pics/api/sfw/neko')
        if (waifu.data.error) throw 'Under maintenance!'
        const modo = waifu.data.url
        const resmod = `Nohh..`
        conn.sendFile(m.chat, modo, 'neko.jpg', resmod, m)
    } catch (e) {
        console.log(('[ERROR]', 'red'), e)
    }
}
handler.help = ['neko']
handler.tags = ['fun']
handler.command = /^neko|rneko$/i
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
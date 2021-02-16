const axios = require('axios')

let handler = async (m, { conn }) => {
    try {
        const waifu = await axios.get('https://waifu.pics/api/sfw/megumin')
        if (waifu.data.error) throw 'Under maintenance!'
        const modo = waifu.data.url
        const resmod = `Nohh..`
        conn.sendFile(m.chat, modo, 'megumin.jpg', resmod, m)
    } catch (e) {
        console.log(('[ERROR]', 'red'), e)
    }
}
handler.help = ['megumin']
handler.tags = ['fun']
handler.command = /^waganawa|rmegumin$/i

module.exports = handler
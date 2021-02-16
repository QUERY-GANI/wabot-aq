const fetch = require('node-fetch')
const { MessageType } = require('@adiwajshing/baileys')
const axios = require('axios')

let handler  = async (m, { conn, text }) => {
    const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
        fetch(url, options)
        .then(response => response.json())
        .then(json => {
            // console.log(json)
            resolve(json)
        })
        .catch((err) => {
            reject(err)
        })
    })

    const getBuffer = async (url, options) => {
        try {
            options ? options : {}
            const res = await axios({
                method: "get",
                url,
                headers: {
                    'DNT': 1,
                    'Upgrade-Insecure-Request': 1
                },
                ...options,
                responseType: 'arraybuffer'
            })
            return res.data
        } catch (e) {
            console.log(`Error : ${e}`)
        }
    }
    
    if (text) {
        data = await fetchJson(`https://tobz-api.herokuapp.com/api/joox?q=${text}&apikey=BotWeA`, { method: 'get' })
        if (data.status == 200) {
            teks = '*「 Play Music From Joox 」*\n'
            const joox = data.result
            teks += `\n *Judul :* ${joox.judul}\n *Album :* ${joox.album}\n *Publish At :* ${joox.dipublikasi}`
            thumb = await getBuffer(joox.thumb)
            conn.sendMessage(m.chat, thumb, MessageType.image, { quoted: m, caption: teks })
            buffer = await getBuffer(joox.mp3)
            conn.sendMessage(m.chat, buffer, MessageType.audio, { mimetype: 'audio/mp4', filename: `${joox.judul}.mp3`, quoted: m })
        } else {
            throw `*Maaf sepertinya lagu dengan judul ${text} tidak ditemukan*`
        }
    } else throw 'Uhm... Lu mau nyari apaan?'
    
}

handler.help = ['joox <lagu>']
handler.tags = ['downloader']
handler.command = /^joox$/i
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


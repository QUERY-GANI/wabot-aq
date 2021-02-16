const axios = require('axios')

let handler  = async (m, { conn, text }) => {
    if (text) {
        const fetching = await axios.get(global.API('tobz', '/kuso', { q: text }, 'apikey'))
        const anime = fetching.data
        console.log(anime.status)
        if (anime.status === 200) {
            const teks = `
            \n*Title : ${anime.title}*
            \n${anime.info}
            \n*Sinopsis :* ${anime.sinopsis}
            \n*Download :* ${anime.link_dl}
            `
            conn.sendFile(m.chat, anime.thumb, 'anime.jpg', teks, m)
        } else throw `Maaf, anime dengan title ${text} tidak di temukan!` 
    }
    else throw 'Uhm...Teksnya? contoh : #anm dr stone'
  }
  handler.help = ['anm <title>']
  handler.tags = ['fun']
  handler.command = /^anm|anime$/i
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
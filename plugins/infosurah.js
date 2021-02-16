const axios = require('axios')

let handler = async (m, { conn, args }) => {
    try {
        const response = await axios.get('https://api.quran.sutanlab.id/surah')
        const { data } = response.data
        var idx = data.findIndex(function(post, index) {
            if((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
            return true
        })
        var pesan = ""
        pesan = pesan + "Nama : "+ data[idx].name.transliteration.id + "\n" + "Asma : " +data[idx].name.short+"\n"+"Arti : "+data[idx].name.translation.id+"\n"+"Jumlah ayat : "+data[idx].numberOfVerses+"\n"+"Nomor surah : "+data[idx].number+"\n"+"Jenis : "+data[idx].revelation.id+"\n"+"Keterangan : "+data[idx].tafsir.id
        conn.reply(m.chat, pesan, m)
    } catch (e) {
        throw `*_Surah ${args[0]} tidak ditemukan!_*`
    }
}
handler.help = ['info <nama-surah> <lang>']
handler.tags = ['quran']
handler.command = /^info$/i
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
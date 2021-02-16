const axios = require('axios')

let handler = async (m, { conn, args }) => {
    if (args.length < 2) throw '*Contoh Penggunaan : #tafsir al-baqarah 282*'
    const respons = await axios.get('https://api.quran.sutanlab.id/surah')
    const {data} = respons.data
    var idx = data.findIndex(function(post, index) {
        if((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
        return true;
    });
    nmr = data[idx].number
    if(!isNaN(nmr)) {
        try {
            const responsi = await axios.get('https://api.quran.sutanlab.id/surah/'+nmr+"/"+args[1])
            const {data} = responsi.data
            pesan = ""
            pesan = pesan + "Tafsir Q.S. "+data.surah.name.transliteration.id+":"+args[1]+"\n\n"
            pesan = pesan + data.text.arab + "\n\n"
            pesan = pesan + "_" + data.translation.id + "_" + "\n\n" +data.tafsir.id.long
            conn.reply(m.chat, pesan, m)
        } catch (e) {
            throw '*_Ayatnya kebanyakan kak.._*'
        }
    }
}
handler.help = ['tafsir <nama-surah> <ayat> <lang>']
handler.tags = ['quran']
handler.command = /^tafsir$/i
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
const axios = require('axios')

let handler = async (m, { conn, args }) => {
    const response = await axios.get('https://api.quran.sutanlab.id/surah')
    const { data } = response.data
    nmr = Math.floor(Math.random() * 115)
    maks = data[nmr-1].numberOfVerses
    ayat = Math.floor(Math.random() * maks) + 1
    if(!isNaN(nmr)) {
    const responsi2 = await axios.get('https://api.quran.sutanlab.id/surah/'+nmr+"/"+ayat)
    const {data} = responsi2.data
    var last = function last(array, n) {
        if (array == null) return void 0
        if (n == null) return array[array.length - 1]
        return array.slice(Math.max(array.length - n, 0))
    }
    bhs = last(args)
    pesan = ""
    pesan = pesan + data.text.arab + "\n\n"
    if(bhs == "en") {
        pesan = pesan + data.translation.en
    } else {
        pesan = pesan + data.translation.id
    }
    pesan = pesan + "\n\n(Q.S. "+data.surah.name.transliteration.id+":"+ayat+")"
    conn.reply(m.chat, pesan, m)
    }
}
handler.help = ['randomAyat <en>']
handler.tags = ['quran']
handler.command = /^randomAyat|rayt$/i
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
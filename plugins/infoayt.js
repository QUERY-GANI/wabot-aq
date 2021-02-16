const axios = require('axios')

let handler = async (m, { conn, args }) => {
    if (args.length < 2) throw '*Contoh Penggunaan : #surah yasin 2*'
    const response = await axios.get('https://api.quran.sutanlab.id/surah')
    const { data } = response.data
    var idx = data.findIndex(function(post, index) {
        if((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
        return true
    })
    nmr = data[idx].number
    if(!isNaN(nmr)) {
        try {
            const responsi2 = await axios.get('https://api.quran.sutanlab.id/surah/'+nmr+"/"+args[1])
            const {data} = responsi2.data
            var last = function last(array, n) {
                if (array == null) return void 0
                if (n == null) return array[array.length - 1]
                return array.slice(Math.max(array.length - n, 0))
            }
            bhs = last(args)
            // console.log(bhs)
            pesan = ""
            pesan = pesan + data.text.arab + "\n\n"
            if(bhs == "en") {
            pesan = pesan + data.translation.en
            } else {
            pesan = pesan + data.translation.id
            }
            pesan = pesan + "\n\n(Q.S. "+data.surah.name.transliteration.id+":"+args[1]+")"
            conn.reply(m.chat, pesan, m)
        } catch (e) {
            throw '_*Ayatnya kebanyakan kak..*_'
        }
    }
}
handler.help = ['surah <nama-surah> <ayat> <lang>']
handler.tags = ['quran']
handler.command = /^surah$/i
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
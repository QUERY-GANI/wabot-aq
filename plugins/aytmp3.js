const axios = require('axios')
const { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args }) => {
    if (args.length < 1) throw '*Contoh Penggunaan : #ayta al-baqarah 1*'
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
    ayat = "ayat"
    bhs = ""
    const response = await axios.get('https://api.quran.sutanlab.id/surah')
    const surah = response.data
    console.log(args)
    var idx = surah.data.findIndex(function(post, index) {
    if((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
        return true;
    });
    nmr = surah.data[idx].number
    if(!isNaN(nmr)) {
    if(args.length > 2) {
        ayat = args[1]
    }
    if (args.length == 2) {
        var last = function last(array, n) {
        if (array == null) return void 0;
        if (n == null) return array[array.length - 1];
        return array.slice(Math.max(array.length - n, 0));
        };
        ayat = last(args)
    } 
    pesan = ""
    if(isNaN(ayat)) {
        const responsi2 = await axios.get('https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/'+nmr+'.json')
        const {name, name_translations, number_of_ayah, number_of_surah,  recitations} = responsi2.data
        pesan = pesan + "Audio Quran Surah ke-"+number_of_surah+" "+name+" ("+name_translations.ar+") "+ "dengan jumlah "+ number_of_ayah+" ayat\n"
        pesan = pesan + "Dilantunkan oleh "+recitations[0].name+" : "+recitations[0].audio_url+"\n"
        pesan = pesan + "Dilantunkan oleh "+recitations[1].name+" : "+recitations[1].audio_url+"\n"
        pesan = pesan + "Dilantunkan oleh "+recitations[2].name+" : "+recitations[2].audio_url+"\n"
        conn.reply(m.chat, pesan, m)
    } else {
        try {
            const responsi2 = await axios.get('https://api.quran.sutanlab.id/surah/'+nmr+"/"+ayat)
        } catch (e) {
            throw '_*Ayatnya kebanyakan kak..*_'
        }
            const {data} = responsi2.data
            var last = function last(array, n) {
            if (array == null) return void 0;
            if (n == null) return array[array.length - 1];
            return array.slice(Math.max(array.length - n, 0));
            };
            bhs = last(args)
            pesan = ""
            pesan = pesan + data.text.arab + "\n\n"
            if(bhs == "en") {
            pesan = pesan + data.translation.en
            } else {
            pesan = pesan + data.translation.id
            }
            pesan = pesan + "\n\n(Q.S. "+data.surah.name.transliteration.id+":"+args[1]+")"
            let mp3 = await getBuffer(data.audio.secondary[0])
            conn.sendMessage(m.chat, mp3, MessageType.audio)
            conn.reply(m.chat, pesan, m)
        }
    }
}
handler.help = ['ayta <nama-surah> <ayat>']
handler.tags = ['quran']
handler.command = /^ayatmp3|ayta$/i
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

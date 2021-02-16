const { MessageType } = require('@adiwajshing/baileys')

let handler  = async (m, { conn, text }) => {
  try {
    if (text) {
      let i = [...global.owner].map(v => {
        v.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        console.log(v)
      })

      no = m.sender.slice(0, 12)
      let teks = `\n*Report dari : ${no}*\n\n*keluhan : ${text}*`
      conn.sendMessage(`628156307437@s.whatsapp.net`, teks, MessageType.text,  {quoted: m})
      
      conn.reply(m.chat, '*_Terimakasih telah mereport bug!_*', m)
        
    }else {
      conn.reply(m.chat, '*_Mau report apa kaka?_*', m)
    }
  } catch(err) {
    console.log(err)
  }
}
handler.help = ['report <nama bug>']
handler.tags = ['info']
handler.command = /^r_bug|report$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler


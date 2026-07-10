import fetch from 'node-fetch'
let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('⛈️ *RAYO PREM IA* ➔ Escribe tu consulta para Copilot\n⚡ *Ejemplo:* .copilot código en js') // Cambiado
  await m.react('🌩️') // Cambiado
  let key = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')
  let res = await fetch(`https://api.evogb.org/ai/copilot?text=${encodeURIComponent(text)}&key=${key}`)
  let json = await res.json()
  if (json.status) {
    await m.react('⚡') // Cambiado
    m.reply(`⛈️ *RAYO PREM COPILOT* 🌙\n\n${json.response}\n\n⚡ *Team Nightwish*`) // Cambiado
  } else {
    await m.react('❌')
    m.reply('⛈️ *RAYO PREM ERROR* ➔ Copilot no respondió') // Cambiado
  }
}
handler.help = ['copilot <texto>']
handler.tags = ['inteligencia artificial']
handler.command = ['copilot']
export default handler
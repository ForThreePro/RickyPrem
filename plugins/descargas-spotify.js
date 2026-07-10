import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`⛈️ *RAYO PREM SPOTIFY* 🌙\n\n⚡ *Escribe el nombre de la canción a buscar.*\n📌 *Ejemplo:* ${usedPrefix + command} Lupita`) // Cambiado

  await m.react('🔍')

  try {
    let searchRes = await fetch(`https://api.evogb.org/search/spotify?query=${encodeURIComponent(text)}&key=sasuke`)
    let searchData = await searchRes.json()

    if (!searchData.status ||!searchData.result[0]) {
        await m.react('❌')
        return m.reply(`⛈️ *RAYO PREM ERROR* ➔ *No se encontraron resultados para:* ${text}`) // Cambiado
    }

    await m.react('⏳')

    let song = searchData.result[0]
    let dlRes = await fetch(`https://api.evogb.org/dl/spotify?url=${encodeURIComponent(song.link)}&key=sasuke`)
    let dlData = await dlRes.json()

    if (!dlData.status) {
        await m.react('❌')
        return m.reply(`⛈️ *RAYO PREM ERROR* ➔ *Error al obtener el enlace de descarga.*`) // Cambiado
    }

    let cap = `⛈️ *RAYO PREM SPOTIFY* 🌙\n\n` // Cambiado
    cap += `⚡ *Título:* ${dlData.data.name}\n`
    cap += `👤 *Artista:* ${dlData.data.artist}\n`
    cap += `💿 *Álbum:* ${dlData.data.album}\n`
    cap += `⏳ *Duración:* ${dlData.data.duration}\n`
    cap += `📅 *Año:* ${dlData.data.year}\n\n`
    cap += `🌩️ *Enviando audio...*\n⛈️ *Team Nightwish*` // Cambiado

    await conn.sendMessage(m.chat, { image: { url: dlData.data.image }, caption: cap }, { quoted: m })
    await conn.sendMessage(m.chat, { audio: { url: dlData.data.url }, mimetype: 'audio/mpeg', fileName: `${dlData.data.name}.mp3` }, { quoted: m }) // Agregado fileName

    await m.react('✅')
  } catch (e) {
    await m.react('❌')
    m.reply(`⛈️ *RAYO PREM ERROR* ➔ *Ocurrió un error inesperado:* ${e.message}`) // Cambiado
  }
}

handler.help = ['spotify <búsqueda>']
handler.tags = ['downloader']
handler.command = /^(spotify)$/i

export default handler
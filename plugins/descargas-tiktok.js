let handler = async (m, { conn, text, command }) => {
    if (!text) throw '⛈️ *RAYO PREM TIKTOK* 🌙\n\n⚡ *Ingresa un link o texto a buscar*' // Cambiado
    try {
        if (command === 'tiktoksearch') {
            let res = await (await fetch(`https://api.evogb.org/search/tiktok?query=${text}&key=sasuke`)).json()
            let video = res.data[0]
            if (!video) throw '⛈️ *RAYO PREM ERROR* ➔ *No se encontraron resultados*' // Cambiado

            let caption = `⛈️ *RAYO PREM TIKTOK SEARCH* 🌙\n\n` // Cambiado
            caption += `⚡ *Título:* ${video.title}\n`
            caption += `👤 *Autor:* ${video.author.nickname}\n`
            caption += `👁️ *Vistas:* ${video.play_count.toLocaleString()}\n`
            caption += `❤️ *Likes:* ${video.digg_count.toLocaleString()}\n\n`
            caption += `🌩️ *Descargando...*\n⛈️ *Team Nightwish*` // Cambiado

            await conn.sendFile(m.chat, video.dl, 'tiktok.mp4', caption, m)
        } else if (command === 'tiktok') {
            let res = await (await fetch(`https://api.evogb.org/dl/tiktok?url=${text}&key=sasuke`)).json()
            let data = res.data
            if (!data) throw '⛈️ *RAYO PREM ERROR* ➔ *No se pudo obtener el video*' // Cambiado

            let caption = `⛈️ *RAYO PREM TIKTOK* 🌙\n\n` // Cambiado
            caption += `⚡ *Título:* ${data.title}\n`
            caption += `👤 *Autor:* ${data.author.nickname}\n\n`
            caption += `🌩️ *Enviando video...*\n⛈️ *Team Nightwish*` // Cambiado

            await conn.sendFile(m.chat, Array.isArray(data.dl)? data.dl[0] : data.dl, 'tiktok.mp4', caption, m)
        }
    } catch (e) {
        throw '⛈️ *RAYO PREM ERROR* ➔ *Error al obtener el video*' // Cambiado
    }
}
handler.help = ['tiktok <link>', 'tiktoksearch <busqueda>']
handler.tags = ['downloader', 'search']
handler.command = /^(tiktok|tiktoksearch)$/i
export default handler
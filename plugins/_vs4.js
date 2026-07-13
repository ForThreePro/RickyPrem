let vs = {}

let handler = async (m, { conn, args }) => {
    let chat = m.chat
    if (vs) return m.reply('⚠️ Ya hay un VS4 activo. Usa *.cerrarvs*')
    
    vs = {
        chat: chat,
        players: [],
        suplentes: [],
        admin: m.sender
    }

    let texto = `┏━━━━━━━━━━━
 ▎🌙 *TEAM NIGHTWISH VS4* 🌙
 ▎𝖤𝗇𝖼𝖺𝗋𝗀𝖺𝖽𝖺: @${m.sender.split('@')[0]}
 ▎౨ 22🇦🇷 ↫ 🕰️ ↬ 20🇵🇪 : apost 2k
 ▎
 ▎𝙹𝚄𝙶𝙰𝙳𝙾𝚁𝙰𝚂 :
 ▎1. Libre
 ▎2. Libre
 ▎3. Libre
 ▎4. Libre
 ▎𝚂𝚄𝙿𝙻𝙴𝙽𝚃𝙴𝚂 :
 ▎1. Libre
 ▎2. Libre
 ▎𝙳𝙾𝙽𝙰𝙳𝙾𝚁𝙰 𝙳𝙴 𝚂𝙰𝙻𝙰 :
 ▎@${m.sender.split('@')[0]}
┗━━━━━━━━━━━━┛`

    let buttons = [
        {buttonId: '.anotarvs', buttonText: {displayText: '🩷 Anotarme'}, type: 1},
        {buttonId: '.vervs', buttonText: {displayText: '👀 Ver Lista'}, type: 1},
        {buttonId: '.cerrarvs', buttonText: {displayText: '🔒 Cerrar'}, type: 1}
    ]
    
    let buttonMessage = {
        text: texto,
        footer: '© Team Nightwish | Toca para anotarte',
        buttons: buttons,
        headerType: 1,
        mentions: [m.sender]
    }
    
    await conn.sendMessage(chat, buttonMessage)
}
handler.help = ['vs4']
handler.tags = ['ff']
handler.command = /^(vs4)$/i
handler.group = true
export default handler

// ===== ANOTAR =====
export let anotar = async (m, { conn }) => {
    let user = m.sender
    if (!vs) return m.reply('No hay VS activo')
    if (vs.players.includes(user) || vs.suplentes.includes(user)) return m.reply('Ya estás 👀')

    let puesto = ''
    if (vs.players.length < 4) {
        vs.players.push(user)
        puesto = 'TITULAR ✅'
    } else if (vs.suplentes.length < 2) {
        vs.suplentes.push(user)
        puesto = 'SUPLENTE ✅'
    } else return m.reply('❌ Lista llena')

    await m.reply(`@${user.split('@')[0]} anotada como ${puesto}`, null, { mentions:  })
    await actualizar(conn)
}
anotar.command = /^(anotarvs)$/i

// ===== VER =====
export let ver = async (m, { conn }) => {
    if (!vs) return m.reply('No hay VS activo')
    await actualizar(conn)
}
ver.command = /^(vervs)$/i

// ===== CERRAR =====
export let cerrar = async (m, { conn }) => {
    if (!vs) return m.reply('No hay VS activo')
    if (m.sender !== vs.admin && !m.isAdmin) return m.reply('Solo la encargada')
    vs = {}
    await m.reply('✅ VS4 cerrado')
}
cerrar.command = /^(cerrarvs)$/i

// ===== ACTUALIZAR MENSAJE =====
async function actualizar(conn) {
    let p = vs.players.map(u => `@${u.split('@')[0]}`)
    let s = vs.suplentes.map(u => `@${u.split('@')[0]}`)
    while(p.length < 4) p.push('Libre')
    while(s.length < 2) s.push('Libre')

    let texto = `┏━━━━━━━━━━━
 ▎🌙 *TEAM NIGHTWISH VS4* 🌙
 ▎𝖤𝗇𝖼𝖺𝗋𝗀𝖺𝖽𝖺: @${vs.admin.split('@')[0]}
 ▎౨ 22🇦🇷 ↫ 🕰️ ↬ 20🇵🇪 : apost 2k
 ▎
 ▎𝙹𝚄𝙶𝙰𝙳𝙾𝚁𝙰𝚂 :
 ▎1. ${p[0]}
 ▎2. ${p[1]}
 ▎3. ${p[2]}
 ▎4. ${p[3]}
 ▎𝚂𝚄𝙿𝙻𝙴𝙽𝚃𝙴𝚂 :
 ▎1. ${s[0]}
 ▎2. ${s[1]}
 ▎𝙳𝙾𝙽𝙰𝙳𝙾𝚁𝙰 𝙳𝙴 𝚂𝙰𝙻𝙰 :
 ▎@${vs.admin.split('@')[0]}
┗━━━━━━━━━━━━┛`

    let buttons = [
        {buttonId: '.anotarvs', buttonText: {displayText: '🩷 Anotarme'}, type: 1},
        {buttonId: '.vervs', buttonText: {displayText: '👀 Ver Lista'}, type: 1},
        {buttonId: '.cerrarvs', buttonText: {displayText: '🔒 Cerrar'}, type: 1}
    ]
    
    await conn.sendMessage(vs.chat, {
        text: texto,
        footer: '© Team Nightwish | Toca para anotarte',
        buttons: buttons,
        headerType: 1,
        mentions: [vs.admin,...vs.players,...vs.suplentes]
    })
}
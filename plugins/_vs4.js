// ============================================
// PLUGIN: VS4 FREE FIRE CON REACCIONES v2.0
// Comando:.vs4
// La gente se anota reaccionando con 🩷
// ============================================

let vs4 = {}

let handler = async (m, { conn }) => {
    let chat = m.chat
    if (vs4[chat]) return conn.reply(m.chat, '⚠️ Ya hay un VS4 activo. Usa.cerrarvs para cerrar', m)

    let texto = `┏━━━━━━━━━━━
 ▎🌙 *TEAM NIGHTWISH VS4* 🌙
 ▎𝖤𝗇𝖼𝖺𝗋𝗀𝖺𝖽𝖺: @${m.sender.split('@')[0]}
 ▎౨ 22🇦🇷 ↫ 🕰️ ↬ 20🇵🇪 : apost 2k
 ▎
 ▎*ANÓTATE REACCIONANDO CON* 🩷
 ▎
 ▎𝙹𝚄𝙶𝙰𝙳𝙾𝚁𝙰𝚂 :
 ▎1. -
 ▎2. -
 ▎3. -
 ▎4. -
 ▎𝚂𝚄𝙿𝙻𝙴𝙽𝚃𝙴𝚂 :
 ▎1. -
 ▎2. -
 ▎𝙳𝙾𝙽𝙰𝙳𝙾𝚁𝙰 𝙳𝙴 𝚂𝙰𝙻𝙰 :
 ▎@${m.sender.split('@')[0]}
┗━━━━━━━━━━━━┛

_Usa.cerrarvs para cerrar anotaciones_
_© Team Nightwish_`

    let msg = await conn.sendMessage(m.chat, {
        text: texto,
        mentions: [m.sender]
    }, { quoted: m })

    vs4[chat] = {
        msgId: msg.key.id,
        players: [],
        suplentes: [],
        sender: m.sender
    }

    // Agregar reacción inicial
    await conn.sendMessage(m.chat, { react: { text: '🩷', key: msg.key }})
}

handler.help = ['vs4']
handler.tags = ['ff', 'teamnightwish']
handler.command = /^(vs4)$/i
handler.group = true

export default handler

// ===== SISTEMA DE REACCIONES =====
export async function handlerMessage(conn, m) {
    if (!m.message) return
    let chat = m.chat

    if (vs4[chat] && m.message.reactionMessage) {
        let reaction = m.message.reactionMessage
        if (reaction.text === '🩷' && reaction.key.id === vs4[chat].msgId) {
            let user = m.key.participant || m.key.remoteJid

            if (!vs4[chat].players.includes(user) && vs4[chat].players.length < 4) {
                vs4[chat].players.push(user)
            } else if (!vs4[chat].suplentes.includes(user) && vs4[chat].suplentes.length < 2) {
                vs4[chat].suplentes.push(user)
            }

            // Actualizar lista
            let p1 = vs4[chat].players[0] || '-'
            let p2 = vs4[chat].players[1] || '-'
            let p3 = vs4[chat].players[2] || '-'
            let p4 = vs4[chat].players[3] || '-'
            let s1 = vs4[chat].suplentes[0] || '-'
            let s2 = vs4[chat].suplentes[1] || '-'

            let update = `┏━━━━━━━━━━━
 ▎🌙 *TEAM NIGHTWISH VS4* 🌙
 ▎𝖤𝗇𝖼𝖺𝗋𝗀𝖺𝖽𝖺: @${vs4[chat].sender.split('@')[0]}
 ▎౨ 22🇦🇷 ↫ 🕰️ ↬ 20🇵🇪 : apost 2k
 ▎
 ▎*ANÓTATE REACCIONANDO CON* 🩷
 ▎
 ▎𝙹𝚄𝙶𝙰𝙳𝙾𝚁𝙰𝚂 :
 ▎1. @${p1.split('@')[0]}
 ▎2. @${p2.split('@')[0]}
 ▎3. @${p3.split('@')[0]}
 ▎4. @${p4.split('@')[0]}
 ▎𝚂𝚄𝙿𝙻𝙴𝙽𝚃𝙴𝚂 :
 ▎1. @${s1.split('@')[0]}
 ▎2. @${s2.split('@')[0]}
 ▎𝙳𝙾𝙽𝙰𝙳𝙾𝚁𝙰 𝙳𝙴 𝚂𝙰𝙻𝙰 :
 ▎@${vs4[chat].sender.split('@')[0]}
┗━━━━━━━━━━━━┛`

            let mentions = [vs4[chat].sender,...vs4[chat].players,...vs4[chat].suplentes]
            await conn.sendMessage(chat, { text: update, mentions })
        }
    }
}
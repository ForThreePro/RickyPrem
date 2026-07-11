import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

let mutedUsers = new Set();

let handler = async (m, { conn, text, command, participants, usedPrefix }) => {
    const isGroup = m.isGroup
    if (!isGroup) return

    // ===== LINK =====
    if (/^(link|linkgroup)$/i.test(command)) {
        try {
            let link = await conn.groupInviteCode(m.chat)
            return m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 🔗 *LINK DEL GRUPO*
│
│ ⚡ https://chat.whatsapp.com/${link}
│
│ > *“Comparte con cuidado”*
╰─────────────────❒`)
        } catch {
            return m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ ⛈️ *ERROR*
│
│ ⚡ *No pude obtener el link*
│ 🌙 *¿Soy admin?*
╰─────────────────❒`)
        }
    }

    // ===== MUTE / UNMUTE =====
    if (/^(mute|unmute)$/i.test(command)) {
        let mentionedJid = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : false;
        if (!mentionedJid) return m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 🔇 *MUTE SYSTEM*
│
│ ⚡ *Uso:* ${usedPrefix}mute @usuario
╰─────────────────❒`)

        let isUserAdmin = participants.find(p => p.id === mentionedJid)?.admin;
        if (isUserAdmin) return m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ ❌ *No puedes mutear a un admin*\n╰─────────────────❒`)
        if (mentionedJid === conn.user.jid) return m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ ❌ *No puedo mutearme*\n╰─────────────────❒`)

        if (command === "mute") {
            mutedUsers.add(mentionedJid);
            return conn.reply(m.chat, `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 🔇 *USUARIO SILENCIADO*
│
│ ⚡ *@${mentionedJid.split('@')[0]}*
│ 🌙 *Sus mensajes serán eliminados*
╰─────────────────❒`, m, { mentions: [mentionedJid] })
        } else if (command === "unmute") {
            mutedUsers.delete(mentionedJid);
            return conn.reply(m.chat, `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 🔊 *USUARIO DESMUTEADO*
│
│ ⚡ *@${mentionedJid.split('@')[0]}*
│ 🌙 *Ya puede hablar de nuevo*
╰─────────────────❒`, m, { mentions: [mentionedJid] })
        }
    }

    // ===== NOTI / N / HIDETAG =====
    if (/^(n|noti|notifi|notificar|notify|hidetag|hidet|aviso)$/i.test(command)) {
        let users = participants.map(u => conn.decodeJid(u.id))
        let baseText = text || ''
        if (!baseText && m.quoted) baseText = m.quoted.text

        let finalText = `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 📢 *AVISO GENERAL*
│
│ ${baseText}
│
│ > *“Atención a todos los guerreros”*
╰─────────────────❒`

        const msg = generateWAMessageFromContent(m.chat, {
            extendedTextMessage: { text: finalText, contextInfo: { mentionedJid: users } }
        }, {})

        return await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    }

    // ===== PROMOTE / DEMOTE =====
    if (/^(promote|promover|daradmin|demote|degradar|quitaradmin)$/i.test(command)) {
        if (!m.mentionedJid[0] &&!m.quoted) return m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ ⚡ *Menciona a alguien*\n╰─────────────────❒`)

        let user = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted.sender
        let action = /^(promote|promover|daradmin)$/i.test(command)? 'promote' : 'demote'

        let msgAccion = action === 'promote'
       ? `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ ⚡ *PROMOCIÓN*\n│\n│ 👑 *@${user.split('@')[0]} ahora es Admin*\n│ 🌙 *Por:* @${m.sender.split('@')[0]}\n╰─────────────────❒`
          : `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ ⛈️ *DEGRADACIÓN*\n│\n│ 🛡️ *@${user.split('@')[0]} ya no es Admin*\n│ 🌙 *Por:* @${m.sender.split('@')[0]}\n╰─────────────────❒`

        await conn.groupParticipantsUpdate(m.chat,, action)
        return m.reply(msgAccion, m.chat, { mentions: [user, m.sender] })
    }

    // ===== BANCHAT / UNBANCHAT =====
    if (/^(banchat|banearchat|unbanchat|desbanearchat)$/i.test(command)) {
        let chat = global.db.data.chats[m.chat]
        if (/^(banchat|banearchat)$/i.test(command)) {
            if (chat.isBanned) return m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ ⛈️ *CHAT YA BANEADO*\n╰─────────────────❒`)
            chat.isBanned = true
            return await conn.reply(m.chat, `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ 🚫 *CHAT BANEADO*\n│\n│ ⚡ *El bot ha sido desactivado*\n╰─────────────────❒`, m)
        } else {
            if (!chat.isBanned) return m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ ✅ *CHAT NO ESTÁ BANEADO*\n╰─────────────────❒`)
            chat.isBanned = false
            return await conn.reply(m.chat, `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ ✅ *CHAT DESBANEADO*\n│\n│ ⚡ *El bot vuelve a estar activo*\n╰─────────────────❒`, m)
        }
    }

    // ===== DELETE =====
    if (/^del(ete)?$/i.test(command)) {
        if (!m.quoted) return m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ 🗑️ *Responde al mensaje*\n╰─────────────────❒`)
        try {
            let delet = m.message.extendedTextMessage?.contextInfo?.participant
            let bang = m.message.extendedTextMessage?.contextInfo?.stanzaId
            await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
        } catch {
            await conn.sendMessage(m.chat, { delete: m.quoted.vM.key })
        }
        return m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ 🗑️ *MENSAJE ELIMINADO*\n│\n│ ⚡ *Por:* @${m.sender.split('@')[0]}\n╰─────────────────❒`, { mentions: [m.sender] })
    }

    // ===== KICK =====
    if (/^(kick|echar|hechar|sacar|ban)$/i.test(command)) {
        let mentionedJid = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null
        if (!mentionedJid) return m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ 🚮 *Menciona a alguien*\n╰─────────────────❒`)

        let groupMetadata = await conn.groupMetadata(m.chat)
        let ownerGroup = groupMetadata.owner || m.chat.split`-`[0] + '@s.whatsapp.net'
        let ownerBot = global.owner[0][0] + '@s.whatsapp.net'

        if (mentionedJid === conn.user.jid) return m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ ❌ *No puedo expulsarme*\n╰─────────────────❒`)
        if (mentionedJid === ownerGroup) return m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ ❌ *No puedo expulsar al creador*\n╰─────────────────❒`)
        if (mentionedJid === ownerBot) return m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒\n│ ❌ *No puedo expulsar al dueño*\n╰─────────────────❒`)

        await conn.groupParticipantsUpdate(m.chat, [mentionedJid], 'remove')
        return m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 🚮 *USUARIO EXPULSADO*
│
│ ⚡ *@${mentionedJid.split('@')[0]} fue sacado*
╰─────────────────❒`, { mentions: [mentionedJid] })
    }
}

// Anti-mute: Borra mensajes de usuarios muteados
handler.before = async (m, { conn }) => {
    if (mutedUsers.has(m.sender) && m.isGroup) {
        try {
            await conn.sendMessage(m.chat, { delete: m.key });
        } catch (e) {}
    }
};

handler.help = ['link', 'mute @', 'unmute @', 'n texto', 'promote', 'demote', 'banchat', 'unbanchat', 'delete', 'kick']
handler.tags = ['grupos']
handler.command = /^(link|linkgroup|mute|unmute|n|noti|notifi|notificar|notify|hidetag|hidet|aviso|promote|promover|daradmin|demote|degradar|quitaradmin|banchat|banearchat|unbanchat|desbanearchat|del(ete)?|kick|echar|hechar|sacar|ban)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
import chalk from 'chalk'
import { WAMessageStubType } from '@whiskeysockets/baileys'

let handler = m => m

handler.before = async function (m, { conn, groupMetadata }) {
    if (!m.messageStubType ||!m.isGroup) return

    let chat = global.db.data.chats[m.chat]
    if (!chat?.detect) return

    const userJid = m.sender
    const usuario = `@${userJid.split('@')[0]}`
    const group = groupMetadata.subject

    let txt = ''

    switch (m.messageStubType) {
        case 21: // Cambiar nombre
            txt = `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 🌙 *REGISTRO DEL GRUPO*
│
│ 📢 *CAMBIO DE NOMBRE*
│ 👤 *Usuario:* ${usuario}
│ 📝 *Nuevo:* _${m.messageStubParameters[0]}_
│ 🌩️ *Grupo:* ${group}
│
│ > *“El trueno ha renombrado”* ⚡
╰─────────────────❒`; break

        case 22: // Cambiar foto
            txt = `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 🌙 *REGISTRO DEL GRUPO*
│
│ 📸 *CAMBIO DE FOTO*
│ 👤 *Usuario:* ${usuario}
│ 🖼️ *Nueva imagen establecida*
│ 🌩️ *Grupo:* ${group}
│
│ > *“Que brille bajo la noche”* ⚡
╰─────────────────❒`; break

        case 23: // Cambiar link
            txt = `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ ⛈️ *ALERTA DE SEGURIDAD*
│
│ 🔗 *LINK RESETEADO*
│ 👤 *Usuario:* ${usuario}
│ 🌩️ *Grupo:* ${group}
│
│ > *“El portal ha sido alterado”* ⚡
╰─────────────────❒`; break

        case 25: // Cambiar ajustes
            txt = `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 🛡️ *AJUSTES MODIFICADOS*
│
│ 👤 *Usuario:* ${usuario}
│ ⚙️ *Permisos:* ${m.messageStubParameters[0] == 'on'? '*SOLO ADMINS* 🔒' : '*TODOS* 🔓'}
│ 📊 *Edición de info de grupo*
│
│ > *“El control cambió de manos”* ⚡
╰─────────────────❒`; break

        case 26: // Abrir/Cerrar
            txt = `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 🌙 *ESTADO DEL CHAT*
│
│ 👤 *Usuario:* ${usuario}
│ 🗣️ *Modo:* ${m.messageStubParameters[0] == 'on'? '*SOLO ADMINS* 🔒' : '*TODOS* 🔓'}
│ 📢 *Grupo:* ${m.messageStubParameters[0] == 'on'? 'CERRADO' : 'ABIERTO'}
│
│ > *“Que se escuche el trueno”* ⚡
╰─────────────────❒`; break

        case 29: // Dar admin
            txt = `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 👑 *ASCENSO DIVINO*
│
│ ⚡ *Nuevo Admin:* @${m.messageStubParameters[0].split('@')[0]}
│ 👤 *Otorgado por:* ${usuario}
│ 🌙 *Rango:* Administrador
│
│ > *“Que gobierne con poder”* ⚡
╰─────────────────❒`; break

        case 30: // Quitar admin
            txt = `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 📉 *DESTITUCIÓN*
│
│ 💥 *Admin caído:* @${m.messageStubParameters[0].split('@')[0]}
│ 👤 *Ejecutado por:* ${usuario}
│ 🗑️ *Rango removido*
│
│ > *“El rayo no perdona”* ⚡
╰─────────────────❒`; break

        case WAMessageStubType.GROUP_PARTICIPANT_ADD:
            txt = `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 🌩️ *NUEVO INTEGRANTE*
│
│ 🔥 *Bienvenido:* @${m.messageStubParameters[0].split('@')[0]}
│ 🌙 *Grupo:* ${group}
│ ⚡ *Estado:* Ingreso registrado
│
│ > *“Prepárate para la tormenta”* ⛈️
╰─────────────────❒`; break

        case WAMessageStubType.GROUP_PARTICIPANT_LEAVE:
            txt = `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 💨 *SALIDA REGISTRADA*
│
│ 😔 *Se fue:* @${m.messageStubParameters[0].split('@')[0]}
│ 🌙 *Grupo:* ${group}
│ 🌫️ *Estado:* Abandonó el grupo
│
│ > *“Que los vientos lo guíen”* ⚡
╰─────────────────❒`; break

        case WAMessageStubType.GROUP_PARTICIPANT_REMOVE:
            txt = `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 🚮 *EXPULSIÓN EJECUTADA*
│
│ 💣 *Eliminado:* @${m.messageStubParameters[0].split('@')[0]}
│ 👤 *Por orden de:* ${usuario}
│ ⛈️ *Causa:* Violación de reglas
│
│ > *“El trueno ha juzgado”* ⚡
╰─────────────────❒`; break
    }

    if (txt) {
        await this.sendMessage(m.chat, {
            text: txt,
            mentions: [userJid,...(m.messageStubParameters?.[0]? [m.messageStubParameters[0]] : [])]
        })
    }
}

export default handler
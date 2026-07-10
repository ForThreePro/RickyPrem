import { WAMessageStubType } from '@whiskeysockets/baileys'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

let handler = m => m

handler.before = async function (m, { conn, groupMetadata }) {
  try {
    if (!m.messageStubType ||!m.isGroup) return true

    const chat = global.db?.data?.chats?.[m.chat]
    if (!chat?.welcome) return true

    const userJid = m.messageStubParameters?.[0]
    if (!userJid) return true

    // 1. Intentar cargar imagen local
    const localPath = join(process.cwd(), 'storage', 'img', 'rayo.jpg')
    const img = existsSync(localPath)? readFileSync(localPath) : null

    const user = `@${userJid.split('@')[0]}`
    const group = groupMetadata.subject
    const total = groupMetadata.participants.length

    let txt = ''

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      txt = `⛈️ *RAYO PREM* ⚡\n\n🌩️ *BIENVENIDO/A* ${user}\n\n📍 *Grupo:* ${group}\n👥 *Somos:* ${total}\n\n> Lee las reglas ⚡`
    }

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE ||
        m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
      txt = `⛈️ *RAYO PREM* ⚡\n\n💨 ${user} salió de *${group}*\n\n👥 *Quedan:* ${total}\n> Cuídate ⚡`
    }

    // 2. Si hay imagen la manda con imagen, si no solo texto
    if (txt) {
      if (img) {
        await conn.sendMessage(m.chat, { image: img, caption: txt, mentions: [userJid] })
      } else {
        await conn.sendMessage(m.chat, { text: txt, mentions: [userJid] })
      }
    }

  } catch (e) {
    console.error("Error Welcome RAYO:", e)
  }
  return true
}

handler.command = /^(welcome|bienvenida)$/i
handler.group = true
handler.admin = true
export default handler
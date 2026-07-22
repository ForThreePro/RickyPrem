let handler = async (m, { conn, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
          : m.quoted
      ? m.quoted.sender
          : m.sender;

  let yo = m.sender
  let nameYo = await conn.getName(yo);
  let nameUser = await conn.getName(who);
  let porcentaje = Math.floor(Math.random() * 101);

  if(command == 'love'){
    let frase = porcentaje < 30
  ? '💔 *MEJOR QUEDAR COMO PANAS*'
      : porcentaje < 60
  ? '😏 *HAY QUÍMICA EH*'
      : porcentaje < 85
  ? '💕 *SE LES VE FUTURO*'
      : '💍 *PASTEL DE BODA YA*'

    await conn.sendMessage(m.chat, {
      text: `💘 *RICKI BOT LOVE SCANNER* 😎\n\n✨ *@${yo.split('@')[0]}* + *@${who.split('@')[0]}*\n📊 *COMPATIBILIDAD: ${porcentaje}%*\n${frase}\n\n🌸 *Sistema de Amor by Ricki Bot*`,
      mentions: [yo, who]
    }, {quoted: m})
  }
}

handler.help = ['love *@user*']
handler.tags = ['love']
handler.command = /^(love)$/i

export default handler
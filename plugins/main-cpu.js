import os from 'os'

let handler = async (m) => {
    let cpu = os.loadavg()[0].toFixed(2)
    m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 🖥️ *MONITOR CPU*
│
│ ⚡ *Carga Actual:* ${cpu}%
│ 🌙 *Estado:* Procesando rayos
╰─────────────────❒`)
}

handler.help = ['cpu']
handler.tags = ['main']
handler.command = ['cpu']

export default handler
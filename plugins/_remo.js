import { Blob } from 'node:buffer';
import { FormData } from 'formdata-node';
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!mime) throw `👾 *Ricky Bot Prem*\n\nResponde a una imagen con *${usedPrefix + command}*`;
    if (!/image\/(jpe?g|png)/.test(mime)) {
        throw `⚠️ *Formato no soportado.* Solo JPG/PNG. Envía la imagen normal`;
    }

    const API_KEY = "FEx4CYmYN1QRQWD1mbZp87jV";

    await m.react('⏳');
    await m.reply('⚡ *Quitando fondo con Ricky Bot Prem...*');

    try {
        let img = await q.download();
        if (!img) throw '❌ No se pudo descargar la imagen';
        if (img.length > 12 * 1024 * 1024) throw '❌ *Imagen muy pesada.* Máximo 12MB';

        let base64Img = img.toString('base64');

        let form = new FormData();
        form.append('image_file_b64', base64Img);
        form.append('size', 'auto');

        let res = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': API_KEY
            },
            body: form
        });

        if (!res.ok) {
            let errorText = await res.text();
            throw `❌ Error ${res.status}: ${errorText}`;
        }

        let processedImg = await res.buffer();

        await conn.sendFile(
            m.chat,
            processedImg,
            'ricky_prem.png',
            '✨ *Fondo eliminado con éxito* ✨\n\n👾 *Ricky Bot Prem*',
            m
        );

        await m.react('✅');

    } catch (error) {
        console.error('Remove.bg Error:', error);
        await m.reply(`${error}`);
        await m.react('❌');
    }
};

handler.help = ['removebg', 'quitafondo'];
handler.tags = ['tools'];
handler.command = ['removebg', 'quitafondo', 'nobg', 'rmbg'];
handler.register = false;

export default handler;
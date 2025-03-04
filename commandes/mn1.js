
const { DateTime } = require('luxon');
const fs = require('fs');

module.exports = async (context) => {
    const { client, m, totalCommands, mode, botname, prefix} = context;

    try {
        const categories = [
            { name: 'AI', emoji: '」' },
            { name: 'General', emoji: '」' },
            { name: 'Media', emoji: '」' },
{ name: 'Search', emoji: '」' },
            { name: 'Editting', emoji: '」' },
            { name: 'Groups', emoji: '」' },
            { name: 'Fun', emoji: '」' },
            { name: 'Owner', emoji: '」' },
            { name: 'Logo', emoji: '」' },
            { name: 'Coding', emoji: '」' },
{ name: 'Stalk', emoji: '」' }
        ];

        
        const getGreeting = () => {
            const currentHour = DateTime.now().setZone('Africa/Nairobi').hour;

            if (currentHour >= 5 && currentHour < 12) {
                return 'Good morning 🌄';
            } else if (currentHour >= 12 && currentHour < 18) {
                return 'Good afternoon ☀️';
            } else if (currentHour >= 18 && currentHour < 22) {
                return 'Good evening 🌆';
            } else {
                return 'Good night 😴';
            }
        };

       
        const getCurrentTimeInNairobi = () => {
            return DateTime.now().setZone('Africa/dar es salaam).toLocaleString(DateTime.TIME_SIMPLE);
        };

        let menuText = `╰►Hey, ${getGreeting()},\n\n`;

      
        menuText += `╭━━━  ⟮  ${botname} ⟯━━━━━━┈⊷\n`;
          menuText += `┃☠️╭──────────────\n`; 
        menuText += `┃☠️│ ᴄᴏᴍᴍᴀɴᴅᴇʀ: ${m.pushName}\n`; 
menuText += `┃☠️│ ᴛᴏᴛᴀʟ ᴘʟᴜɢɪɴs: ${totalCommands}\n`
        menuText += '┃☠️│ ᴛɪᴍᴇ: ' + getCurrentTimeInNairobi() + '\n';
        menuText += `┃🤠│ ᴘʀᴇғɪx: ${prefix}\n`;
menuText += `┃☠️│ ᴍᴏᴅᴇ: ${mode}\n`;
        menuText += '┃☠️│ ʟɪʙʀᴀʀʏ: Baileys\n';
        menuText += '┃☠️╰──────────────\n';
        menuText += '╰━━━━━━━━━━━━━━━━━━┈⊷\n';

       
        menuText += '━━━━━━━━━━━━━━━━━━━━\n';
        menuText += '*┃𒊹┃𒊹┃𒊹┃𒊹┃𒊹┃𒊹┃𒊹┃𒊹┃:*\n\n';


        const toFancyUppercaseFont = (text) => {
            const fonts = {
                'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌',
                'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
            };
            return text.split('').map(char => fonts[char] || char).join('');
        };

        const toFancyLowercaseFont = (text) => {
            const fonts = {
                'a':'𝚊','b':'𝚋','c':'𝚌','d':'𝚍','e':'𝚎','f':'𝚏','g':'𝚐','h':'𝚑','i':'𝚒','j':'𝚓','k':'𝚔','l':'𝚕','m':'𝚖','n':'𝚗','o':'𝚘','p':'𝚙','q':'𝚚','r':'𝚛','s':'𝚜','t':'𝚝','u':'𝚞','v':'𝚟','w':'𝚠','x':'𝚡','y':'𝚢','z':'𝚣','A':'𝙰','B':'𝙱','C':'𝙲','D':'𝙳','E':'𝙴','F':'𝙵','G':'𝙶','H':'𝙷','I':'𝙸','J':'𝙹','K':'𝙺','L':'𝙻','M':'𝙼','N':'𝙽','O':'𝙾','P':'𝙿','Q':'𝚀','R':'𝚁','S':'𝚂','T':'𝚃','U':'𝚄','V':'𝚅','W':'𝚆','X':'𝚇','Y':'𝚈','Z':'𝚉'
            };
            return text.split('').map(char => fonts[char] || char).join('');
        };

        for (const category of categories) {
            const commandFiles = fs.readdirSync(`./Cmds/${category.name}`).filter((file) => file.endsWith('.js'));

            const fancyCategory = toFancyUppercaseFont(category.name.toUpperCase());

            menuText += ` ╭─────「 ${fancyCategory} ${category.emoji}───┈⊷ \n`;
            for (const file of commandFiles) {
                const commandName = file.replace('.js', '');
                const fancyCommandName = toFancyLowercaseFont(commandName);
                menuText += ` ││◦☠️➛  ${fancyCommandName}\n`;
            }

            menuText += ' ╰──────────────┈⊷ \n';
        }

        await client.sendMessage(m.chat, {
            image: { url: "https://files.catbox.moe/3ijal6.jpg" },
            caption: menuText,
            gifPlayback: true
        }, {
            quoted: m
        });

    } catch (error) {
        console.error(error);
        m.reply('An error occurred while fetching the menu.');
    }
};

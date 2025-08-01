// const fs = require('fs').promises;
// const path = require('path');
import fs from 'fs';
import path from 'path';
import {readFile} from 'node:fs/promises';


// Utility functions
const trimString = (s, limit, ellipsis = '…') => {
    s = (s || '').trim();
    if (s.length > limit) {
        return s.substring(0, limit - 1).trim() + ellipsis;
    }
    return s;
};

const readFromFile = async (filename) => {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filename}:`, error);
        return null;
    }
};

const writeToFile = async (filename, data) => {
    try {
        await fs.mkdir(path.dirname(filename), {recursive: true});
        await fs.writeFile(filename, JSON.stringify(data, null, 4), 'utf8');
        return true;
    } catch (error) {
        console.error(`Error writing to file ${filename}:`, error);
        return false;
    }
};
const blobToBase64 = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});
const b64toBlob = (base64Data) => new Promise(  (resolve, reject) => {
    const base64Response =  fetch(`data:image/jpeg;base64,${base64Data}`).then((response) => response.blob()).then((myBlob) => {
        return myBlob
    });

});
const b64toBlob2 = (b64Data, contentType='image/jpeg', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
}
const readtoBase64 = async (filepath) => {
    try {
        const fileBuffer = await readFile(filepath);
        return fileBuffer.toString('base64');
    } catch (error) {
        throw new Error(`Failed to read file as base64: ${error.message}`);
    }
};
// const readImg2B64 = async form =>{
//     var files = form.files;
//     if (files.length === 0)
//         return;
//     let data = await resizeImage(window.URL.createObjectURL(files[0]))
//     document.querySelector('#img').src = data;
//     return  data.split(",")[1] // get only base64
//     // sendMessage(b64toBlob(b64), { content: 'Resized Image'})
// }
// Message Sending Functions
export class Log2im {
    constructor() {
        this.lineNotifyHistory = [];
        this.telegramBotHistory = [];
        this.discordBotHistory = [];
    }

    /**
     * Send message to LINE Notify
     * @param {string} message - Message to send
     * @param {string} token - LINE Notify token
     * @param {string} imagePath - Path to image file (optional)
     * @returns {Promise<object>} Response from LINE Notify API
     */
    async sendToLineNotify(message, token, imagePath = null) {
        const url = 'https://notify-api.line.me/api/notify';
        const headers = {'Authorization': `Bearer ${token}`};

        try {
            let body;

            if (imagePath) {
                const imageFile = await fs.readFile(imagePath);
                const formData = createFormData({
                    message: message,
                    imageFile: {
                        file: imageFile,
                        filename: path.basename(imagePath),
                        contentType: 'image/png'
                    }
                });

                headers['Content-Type'] = formData.headers['Content-Type'];
                body = formData.body;
            } else {
                const formData = new URLSearchParams();
                formData.append('message', message);
                headers['Content-Type'] = 'application/x-www-form-urlencoded';
                body = formData.toString();
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to send to LINE Notify');
            }

            this.lineNotifyHistory.push({
                timestamp: new Date().toISOString(),
                status: 'success',
                message: 'Message sent to LINE Notify',
                response: responseData
            });

            return responseData;
        } catch (error) {
            console.error('Error sending to LINE Notify:', error.message);

            this.lineNotifyHistory.push({
                timestamp: new Date().toISOString(),
                status: 'error',
                message: 'Failed to send to LINE Notify',
                error: error.message
            });

            throw error;
        }
    }

    /**
     * Send message via LINE Messaging API
     * @param {string} message - Message to send
     * @param {string} channelAccessToken - LINE Messaging API channel access token
     * @param {string} to - Recipient user ID
     * @param {string} imagePath - Path to image file (optional)
     * @returns {Promise<object>} Response from LINE Messaging API
     */
    async sendToLineMessaging(message, channelAccessToken, to, imagePath = null) {
        const url = 'https://api.line.me/v2/bot/message/push';
        const headers = {
            'Authorization': `Bearer ${channelAccessToken}`,
            'Content-Type': 'application/json'
        };

        try {
            let body;

            if (imagePath) {
                // For image messages, we need to upload the image first to get an ID
                // Then send a message with that image ID
                const imageFile = await fs.readFile(imagePath);
                const imageBase64 = imageFile.toString('base64');

                // Create message object with both text and image
                body = JSON.stringify({
                    to: to,
                    messages: [
                        {
                            type: 'text',
                            text: message
                        },
                        {
                            type: 'image',
                            originalContentUrl: `data:image/png;base64,${imageBase64}`,
                            previewImageUrl: `data:image/png;base64,${imageBase64.substring(0, Math.min(1000, imageBase64.length))}`
                        }
                    ]
                });
            } else {
                // Text-only message
                body = JSON.stringify({
                    to: to,
                    messages: [
                        {
                            type: 'text',
                            text: message
                        }
                    ]
                });
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || `Failed to send to LINE Messaging API: ${response.status}`);
            }

            this.lineNotifyHistory.push({
                timestamp: new Date().toISOString(),
                status: 'success',
                message: 'Message sent to LINE Messaging API',
                response: responseData
            });

            return responseData;
        } catch (error) {
            console.error('Error sending to LINE Messaging API:', error.message);

            this.lineNotifyHistory.push({
                timestamp: new Date().toISOString(),
                status: 'error',
                message: 'Failed to send to LINE Messaging API',
                error: error.message
            });

            throw error;
        }
    }

    async getChatID_Telegram(token) {
        const url = `https://api.telegram.org/bot${token}/getUpdates`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json(); // Parse the JSON response
            const chatid = data['result'][0]['message']['chat']['id']
            console.log('[][][getChatID_Telegram]chatid=', chatid, JSON.stringify(data)); // Log the entire response for inspection
            return chatid; // Return the parsed JSON
        } catch (error) {
            console.error('Error getting Telegram updates:', error);
            throw error;
        }


    }

    /**
     * Send message to Telegram
     * @param {string} message - Message to send
     * @param {string} token - Telegram bot token
     * @param {string} chatid - Telegram chat ID
     * @param {string} images - Path to image file (optional)
     * @returns {Promise<object>} Response from Telegram API
     */
    async sendToTelegram({text, images, token, chatid}) {
        // console.log('[][][sendToTelegram]text=',text,images, token, chatid)
        try {
            if (chatid || chatid.length < 1)
                chatid = await this.getChatID_Telegram(token)
            const baseUrl = `https://api.telegram.org/bot${token}`;


            let responseData = undefined;
            if (text) {
                const url = baseUrl + '/sendMessage'
                console.log(`[][][sendToTelegram] text=${text} chatid=${chatid} url=${url}`)
                try {
                    await fetch(url, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            chat_id: chatid,
                            text: text
                        })
                    }).then(res => {
                        return res.json()
                    }).then(res => {
                        this.telegramBotHistory.push({
                            timestamp: new Date().toISOString(),
                            status: 'success',
                            message: 'Message sent to Telegram',
                            response: res
                        });
                        console.log('[][][sendToTelegram]res', res)
                        return res
                    });

                } catch (error) {
                    console.error('Error getting Telegram updates:', error);
                    throw error;
                }
            }
            if (images.filepath) {
                const url = baseUrl + '/sendPhoto'
                console.log(`[][T][sendPhoto] images.filepath=${images.filepath} chatid=${chatid} url=${url}`)
                try {
                    const imageBuffer = await readFile(images.filepath);
                    const imageBlob = new Blob([imageBuffer], {type: 'image/jpeg'}); // Adjust MIME type as needed
                    const formData = new FormData();
                    formData.append('chat_id', chatid)
                    formData.append('caption', text)
                    formData.append('photo', imageBlob)
                    await fetch(url, {
                        method: 'POST',
                        // headers: { 'Content-Type': 'multipart/form-data' },
                        body: formData
                    }).then(res => {
                        return res.json()
                    }).then(res => {
                        this.telegramBotHistory.push({
                            timestamp: new Date().toISOString(),
                            status: 'success',
                            message: 'Photo sent to Telegram',
                            response: res
                        });
                        console.log('[][T][sendPhoto]res', res)
                        return res
                    });

                } catch (error) {
                    console.error('Error getting Telegram updates:', error);
                    throw error;
                }
            }

            return responseData;
        } catch (error) {
            console.error('Error sending to Telegram:', error);

            this.telegramBotHistory.push({
                timestamp: new Date().toISOString(),
                status: 'error',
                message: 'Failed to send to Telegram',
                error: error.message
            });

            throw error;
        }
    }

    /**
     * Send message to Discord webhook
     * @param {string} message - Message to send
     * @param {string} webhookUrl - Discord webhook URL
     * @param {string} username - Custom username for the webhook
     * @param {string} imagePath - Path to image file (optional)
     * @returns {Promise<object>} Response from Discord API
     */
    async sendToDiscord({text, images, token, chatid, clientid}) {
        try {
            console.log('[Discord]', text, token, chatid, clientid)

            const addBotintoChannel = `https://discord.com/oauth2/authorize?client_id=${clientid}&permissions=2048&integration_type=0&scope=bot`
            console.log('[Discord][add bot into channel url][ clientid != chatid ]', addBotintoChannel)
            if (chatid || chatid.length < 1)
                console.log('[Discord][chatid][ get chatid from desktop app(right click channel then copy it)]')

            const baseUrl = `https://discord.com/api/v10/channels/${chatid}/messages`;


            let responseData = undefined;
            if (text) {
                const url = baseUrl
                console.log(`[][][Discord] text=${text} chatid=${chatid} url=${url}`)
                try {
                    await fetch(url, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', "Authorization": 'Bot ' + token},
                        body: JSON.stringify({
                            tts: false,
                            content: '[text]' + text
                        })
                    }).then(res => {
                        return res.json()
                    }).then(res => {
                        this.telegramBotHistory.push({
                            timestamp: new Date().toISOString(),
                            status: 'success',
                            message: 'Message sent to Telegram',
                            response: res
                        });
                        console.log('[][][Discord]res', res)
                        return res
                    });

                } catch (error) {
                    console.error('Error getting Discord updates:', error);
                    throw error;
                }
            }
            if (images.filepath) {
                const url = baseUrl
                console.log(`[][][Discord] images=${images.filepath} chatid=${chatid} url=${url}`)
                const filename = path.basename(images.filepath)
                const emb = {
                    // id: 0,filename: filename,
                    // title: filename,description: filename,
                    // thumbnail: {
                    //     // "url": images.url
                    //     url: "attachment://" + filename
                    // },
                    image: {
                        // "url": images.url
                        url: "attachment://" + filename
                    },
                }
                const att = {
                    id: 0,description: filename,filename: filename,
                }
                const messageRef={
                    message_id: "1400719999336710275"
                }
                try {

                    const screenShotBase64=await readtoBase64(images.filepath)
                    // console.log('screenShotBase64',screenShotBase64)
                    const imageBlob =  b64toBlob2(screenShotBase64)
                    // console.log('imageBlob',imageBlob)

                    const contentX={
                        content: '[att]' + text,
                        // embeds: JSON.stringify([emb]),
                        // message_reference: {
                        //     message_id: "1400719999336710275"
                        // },
                        // attachments: JSON.stringify([att]),
                    }
                    const filesObj = {}
                    filesObj[filename] = imageBlob
                    let formData = new FormData();
                    formData.append('json',JSON.stringify(contentX))
                    formData.append('files',imageBlob,filename)
                    // formData.append('files',imageBlob)
                    console.log('formData',(formData))
                    await fetch(url, {
                        method: 'POST',
                        headers: {
                            "Authorization": 'Bot ' + token,
                        },
                        body: formData,

                    }).then(res => {
                        return res.json()
                    }).then(res => {
                        this.telegramBotHistory.push({
                            timestamp: new Date().toISOString(),
                            status: 'success',
                            message: 'Photo sent to Discord',
                            response: res
                        });
                        console.log('[][T][sendPhoto]res', res)
                        return res
                    });

                } catch (error) {
                    console.error('Error getting Discord updates:', error);
                    throw error;
                }
            }


            return responseData;
        } catch (error) {
            console.error('Error sending to Discord:', error);

            this.telegramBotHistory.push({
                timestamp: new Date().toISOString(),
                status: 'error',
                message: 'Failed to send to Telegram',
                error: error.message
            });

            throw error;
        }
    }

    /**
     * Send message to IMGUR webhook
     * @param {string} message - Message to send
     * @param {string} webhookUrl - Discord webhook URL
     * @param {string} username - Custom username for the webhook
     * @param {string} imagePath - Path to image file (optional)
     * @returns {Promise<object>} Response from Discord API
     */
    async sendToIMGUR({text, images, token, albumid=''}) {
        try {
            console.log('[IMGUR]', text, token, albumid)

            const baseUrl = `https://api.imgur.com/3/upload`;


            let responseData = undefined;

            if (images.filepath) {
                const url = baseUrl
                console.log(`[][][IMGUR] images=${images.filepath} albumid=${albumid} url=${url}`)
                const filename = path.basename(images.filepath)

                try {

                    const imgBase64=await readtoBase64(images.filepath)
                    const imageBlob =  b64toBlob2(imgBase64)

                    // console.log('screenShotBase64',screenShotBase64)

                    let formData = new FormData();
                    formData.append('image','data:image/png;base64,'+imgBase64)
                    formData.append('type','base64')
                    formData.append('name',filename+'_'+Date.now())
                    formData.append('title',text+'_'+Date.now())
                    if(albumid.length>0&&albumid.indexOf(' ')<=0)
                        formData.append('album',albumid)
                    // const bodyx={
                    //     image:imgBase64,
                    //     album:chatid,
                    //     type:'base64',
                    //     name:filename+'_'+Date.now(),
                    //     title:text+'_'+Date.now()
                    // }
                    console.log('formData',(formData))
                    await fetch(url, {
                        method: 'POST',
                        headers: {
                            "Authorization": 'f"Bearer ' + token,
                            // 'Authorization': 'Client-ID ' + clientid,
                            'Content-Type': 'multipart/form-data'
                            // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
                        },
                        body: formData,

                    }).then(res => {
                        return res.json()
                    }).then(res => {
                        this.telegramBotHistory.push({
                            timestamp: new Date().toISOString(),
                            status: 'success',
                            message: 'Photo sent to Discord',
                            response: res
                        });
                        console.log('[][IMGUR][sendPhoto]res', res)
                        return res
                    });

                } catch (error) {
                    console.error('Error getting IMGUR updates:', error);
                    throw error;
                }
            }


            return responseData;
        } catch (error) {
            console.error('Error sending to IMGUR:', error);

            this.telegramBotHistory.push({
                timestamp: new Date().toISOString(),
                status: 'error',
                message: 'Failed to send to IMGUR',
                error: error.message
            });

            throw error;
        }
    }
    /**
     * Send message to all configured services
     * @param {Object} options - Configuration options

     */
    async sendToAll({line,imgur, telegram, discord, text, images}) {
        const results = {
            line: {success: false},
            telegram: {success: false},
            discord: {success: false}
        };
        // Send to Discord if configured
        if (discord.token) {

            try {
                results.discord = {
                    success: true,
                    response: await this.sendToDiscord({
                        text: text,
                        images: images,
                        token: discord.token,
                        chatid: discord.chatid,
                        clientid: discord.clientid
                    })
                };
            } catch (error) {
                results.discord = {
                    success: false,
                    error: error.message
                };
            }
        }
       // Send to Telegram if configured
        if (telegram.token ) {
            try {
                results.telegram = {
                    success: true,
                    response: await this.sendToTelegram({text:text, images:images, token:telegram.token,chatid:telegram.chatid})
                };
            } catch (error) {
                results.telegram = {
                    success: false,
                    error: error.message
                };
            }
        }
        if (imgur.token ) {
            try {
                results.telegram = {
                    success: true,
                    response: await this.sendToIMGUR({text:text, images:images, token:imgur.token,albumid:imgur.albumid})
                };
            } catch (error) {
                results.telegram = {
                    success: false,
                    error: error.message
                };
            }
        }

        // // Send to LINE Messaging API if configured
        // if (line.token ) {
        //     try {
        //         results.line = {
        //             success: true,
        //             response: await this.sendToLineMessaging(line)
        //         };
        //     } catch (error) {
        //         results.line = {
        //             success: false,
        //             error: error.message
        //         };
        //     }
        // }
        //
        //
        //


        return results;
    }
}

// Export the MessageSender class for use in other modules
// module.exports = {
//     MessageSender,
// };

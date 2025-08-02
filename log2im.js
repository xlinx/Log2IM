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
const b64toBlob = (base64Data) => new Promise((resolve, reject) => {
    const base64Response = fetch(`data:image/jpeg;base64,${base64Data}`).then((response) => response.blob()).then((myBlob) => {
        return myBlob
    });

});
const b64toBlob2 = (b64Data, contentType = 'image/jpeg', sliceSize = 512) => {
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

function loadEnvFile(filePath) {
    try {
        const resolvedPath = path.resolve(filePath);
        const data = fs.readFileSync(resolvedPath, 'utf-8');
        data.split(/\r?\n/).forEach((line) => {
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine.startsWith('#')) return; // Skip empty lines and comments
            const [key, value] = trimmedLine.split('=');
            if (key && value !== undefined) {
                process.env[key.trim()] = value.trim();
                console.log(`[ENV][LOAD]${key}=${value}`);
            }
        });
        console.log('[][DECADE.TW] Environment variables loaded successfully.');
    } catch (error) {
        console.error(`[][DECADE.TW]Error loading .env file: ${error.message}`);
    }
}

export class Log2im {

    log2IM_Config = {
        text: `wahaha@${Date.now()}`,
        image_url: 'https://www.decade.tw/wp-content/uploads/2021/09/DECADE_new.png',
        image_file: '/Users/x/Pictures/D.png',

        line: {token: 'must_need'},
        notion: {token: 'must_need', chatid: 'must_need'},
        telegram: {token: 'must_need', chatid: 'must_need'},
        discord: {token: 'must_need', chatid: 'must_need', clientid: 'must_need'},
        imgur: {
            token: 'must_need', albumid: 'get from url, set if u want img into album',
            clientid: 'no need after token get',
            clientsecret: 'no need after token get'
        } //chatid is imgur album name
    }

    constructor(log2IM_Config) {
        this.lineNotifyHistory = [];
        this.telegramBotHistory = [];
        this.discordBotHistory = [];
        this.imgurBotHistory = [];
        if (log2IM_Config) {
            this.log2IM_Config = log2IM_Config
        } else {
            loadEnvFile('.env');
            this.log2IM_Config.discord.token = process.env.discord_token
            this.log2IM_Config.discord.chatid = process.env.discord_chatid
            this.log2IM_Config.discord.clientid = process.env.discord_clientid

            this.log2IM_Config.telegram.token = process.env.telegram_token
            this.log2IM_Config.telegram.chatid = process.env.telegram_chatid

            this.log2IM_Config.notion.token = process.env.notion_token
            this.log2IM_Config.notion.chatid = process.env.notion_chatid

            this.log2IM_Config.imgur.token = process.env.imgur_token
            this.log2IM_Config.imgur.clientid = process.env.imgur_clientid
            this.log2IM_Config.imgur.clientsecret = process.env.imgur_clientsecret
        }
        console.log('[init][log2im][log2IM_Config]', this.log2IM_Config);
    }

    history() {
        console.log('==========history')
        this.lineNotifyHistory.forEach(e => {
            console.log(e)
        })
        this.telegramBotHistory.forEach(e => {
            console.log(e)
        })
        this.discordBotHistory.forEach(e => {
            console.log(e)
        })
        this.imgurBotHistory.forEach(e => {
            console.log(e)
        })
        console.log('==========history')
    }

    /**
     * Send message to LINE Notify
     * @param {string} message - Message to send
     * @param {string} token - LINE Notify token
     * @param {string} imagePath - Path to image file (optional)
     * @returns {Promise<object>} Response from LINE Notify API
     */
    async sendToLineNotify(message, token = this.log2IM_Config.line.token, image_file) {
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
    async sendToLineMessaging(message, channelAccessToken = this.log2IM_Config.line.token, to, imagePath) {
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
    async sendToTelegram({
                             text,
                             image_url,
                             image_file,
                             token = this.log2IM_Config.telegram.token,
                             chatid = this.log2IM_Config.telegram.chatid
                         }) {
        // console.log('[][][sendToTelegram]text=',text,images, token, chatid)
        try {
            if (chatid.length < 1)
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
            if (image_file) {
                const url = baseUrl + '/sendPhoto'
                console.log(`[][T][sendPhoto] image_file=${image_file} chatid=${chatid} url=${url}`)
                try {
                    const imageBuffer = await readFile(image_file);
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
    async sendToDiscord({
                            text,
                            image_file,
                            token = this.log2IM_Config.discord.token,
                            chatid = this.log2IM_Config.discord.chatid,
                            clientid = this.log2IM_Config.discord.clientid
                        }) {
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
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json', "Authorization": 'Bot ' + token
                        },
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
            if (image_file) {
                const url = baseUrl
                console.log(`[][][Discord] images=${image_file} chatid=${chatid} url=${url}`)
                const filename = path.basename(image_file)
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
                    id: 0, description: filename, filename: filename,
                }
                const messageRef = {
                    message_id: "1400719999336710275"
                }
                try {

                    const screenShotBase64 = await readtoBase64(image_file)
                    // console.log('screenShotBase64',screenShotBase64)
                    const imageBlob = b64toBlob2(screenShotBase64)
                    // console.log('imageBlob',imageBlob)

                    const contentX = {
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
                    formData.append('json', JSON.stringify(contentX))
                    formData.append('files', imageBlob, filename)
                    // formData.append('files',imageBlob)
                    console.log('formData', (formData))
                    await fetch(url, {
                        method: 'POST',
                        headers: {
                            "Authorization": 'Bot ' + token,
                        },
                        body: formData,

                    }).then(res => {
                        return res.json()
                    }).then(res => {
                        this.discordBotHistory.push({
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
    async sendToIMGUR({
                          text,
                          image_file,
                          token = this.log2IM_Config.imgur.token,
                          albumid = this.log2IM_Config.imgur.albumid
                      }) {
        try {
            console.log('[IMGUR]', text, token, albumid)

            const baseUrl = `https://api.imgur.com/3/upload`;


            let responseData = undefined;

            if (image_file) {
                const url = baseUrl
                console.log(`[][][IMGUR] images=${image_file} albumid=${albumid} url=${url}`)
                const filename = path.basename(image_file)

                try {

                    const imgBase64 = await readtoBase64(image_file)
                    const imageBlob = b64toBlob2(imgBase64)

                    // console.log('screenShotBase64',screenShotBase64)

                    let formData = new FormData();
                    formData.append('image', 'data:image/png;base64,' + imgBase64)
                    formData.append('type', 'base64')
                    formData.append('name', filename + '_' + Date.now())
                    formData.append('title', text + '_' + Date.now())
                    if (albumid.length > 0 && albumid.indexOf(' ') <= 0)
                        formData.append('album', albumid)
                    // const bodyx={
                    //     image:imgBase64,
                    //     album:chatid,
                    //     type:'base64',
                    //     name:filename+'_'+Date.now(),
                    //     title:text+'_'+Date.now()
                    // }
                    console.log('formData', (formData))
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
                        this.imgurBotHistory.push({
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

    // Helper function to append a block to an existing Notion page
    async appendBlockToNotionPage(pageId, block, token) {
        try {
            // Notion API endpoint for appending blocks to a page
            const url = `https://api.notion.com/v1/blocks/${pageId}/children`;
            
            console.log(`[Notion] Appending block to page ${pageId}`);
            
            // Headers for the request
            const headers = {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Notion-Version": "2022-06-28"
            };
            
            // Create the request body with the block to append
            const blockData = {
                children: [block]
            };
            
            // Send the request to Notion API
            const response = await fetch(url, {
                method: "PATCH",
                headers: headers,
                body: JSON.stringify(blockData)
            });
            
            if (response.ok) {
                console.log("Block successfully appended to existing page");
                return true;
            } else {
                const errorData = await response.json();
                console.error("Error appending block to page:", errorData);
                return false;
            }
        } catch (error) {
            console.error("Error in appendBlockToNotionPage:", error);
            return false;
        }
    }

    async sendToNotion({
                       text,
                       image_file,
                       token = this.log2IM_Config.notion.token,
                       chatid = this.log2IM_Config.notion.chatid
                   }) {
        // Authentication - Load API token from environment variables
        if (!token) {
            console.error("Notion API token not found in environment variables");
            console.error("Please set NOTION_TOKEN in your .env file or provide it in the config object");
            return false;
        }

        // Check if chatid is provided
        if (!chatid) {
            console.error("Notion page ID not provided");
            console.error("Please set notion_chatid in your .env file or provide it in the config object");
            console.error("You can find your page ID in the URL of your Notion page: https://www.notion.so/[workspace]/[page-id]");
            return false;
        }

        // Notion API endpoint for appending blocks to a page
        // Format the page ID to ensure it's in the correct format (8-4-4-4-12)
        let formattedPageId = chatid;
        if (chatid && !chatid.includes('-') && chatid.length === 32) {
            formattedPageId = `${chatid.slice(0, 8)}-${chatid.slice(8, 12)}-${chatid.slice(12, 16)}-${chatid.slice(16, 20)}-${chatid.slice(20)}`;
        }
        
        // Use the pages API endpoint to create a new page
        const url = `https://api.notion.com/v1/pages`;
        
        console.log('[][][sendToNotion]url=', url);
        
        // Headers for the request
        const headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28"
        };
        
        // Create a new page with content
        let properties = {
            title: {
                title: [
                    {
                        text: {
                            content: text || "Log2IM Message"
                        }
                    }
                ]
            }
        };
        
        // Create the request body for creating a page
        // We'll try database_id first, and if that fails, we'll try page_id
        const blockData = {
            parent: {
                database_id: formattedPageId
            },
            properties: properties,
            children: []
        };
        
        // Add text block if provided
        if (text) {
            blockData.children.push({
                object: "block",
                type: "paragraph",
                paragraph: {
                    rich_text: [{ 
                        type: "text", 
                        text: { 
                            content: text 
                        } 
                    }]
                }
            });
        }
        
        // Add image block if provided
        if (image_file) {
            try {
                // Step 1: Create a file upload object
                console.log("Creating file upload object for Notion...");
                const fileUploadResponse = await fetch("https://api.notion.com/v1/file_uploads", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Notion-Version": "2022-06-28"
                    },
                    body: JSON.stringify({})
                });
                
                if (!fileUploadResponse.ok) {
                    const errorData = await fileUploadResponse.json();
                    console.error("Error creating file upload:", errorData);
                    throw new Error(`Failed to create file upload: ${fileUploadResponse.status}`);
                }
                
                const fileUploadData = await fileUploadResponse.json();
                console.log("File upload object created:", fileUploadData);
                
                // Step 2: Upload the file content
                const fileBuffer = await readFile(image_file);
                const fileName = path.basename(image_file);
                const fileType = fileName.endsWith('.png') ? 'image/png' : 
                                 fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') ? 'image/jpeg' : 
                                 'application/octet-stream';
                
                console.log(`Uploading file ${fileName} to Notion...`);
                // Create a FormData object for the file upload
                const formData = new FormData();
                const fileBlob = new Blob([fileBuffer], { type: fileType });
                formData.append('file', fileBlob, fileName);
                formData.append('part_number', '1');
                
                // Send the file using POST request
                const uploadResponse = await fetch(fileUploadData.upload_url, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Notion-Version": "2022-06-28"
                        // Don't set Content-Type header, it will be set automatically with the boundary
                    },
                    body: formData
                });
                
                if (!uploadResponse.ok) {
                    console.error("Error uploading file:", await uploadResponse.text());
                    throw new Error(`Failed to upload file: ${uploadResponse.status}`);
                }
                
                console.log("File uploaded successfully");
                
                // Step 3: Add the uploaded file to the page as an image block
                blockData.children.push({
                    object: "block",
                    type: "image",
                    image: {
                        type: "file_upload",
                        file_upload: {
                            id: fileUploadData.id
                        }
                    }
                });
                
                console.log("Image block added to page content");
                
                // Step 4: Also append the image to the existing page if it was created successfully
                await this.appendBlockToNotionPage(formattedPageId, {
                    object: "block",
                    type: "image",
                    image: {
                        type: "file_upload",
                        file_upload: {
                            id: fileUploadData.id
                        }
                    }
                }, token);
                
            } catch (error) {
                console.error("Error handling image file for Notion:", error);
                
                // Fallback: Add a text block mentioning the image
                blockData.children.push({
                    object: "block",
                    type: "paragraph",
                    paragraph: {
                        rich_text: [{ 
                            type: "text", 
                            text: { 
                                content: "Failed to upload image: " + path.basename(image_file)
                            } 
                        }]
                    }
                });
            }
        }

        // Send the request to Notion API - first try with database_id
        try {
            let response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(blockData)
            });

            // If database_id fails, try with page_id
            if (!response.ok && response.status === 404) {
                console.log("Database ID not found, trying as page_id instead");
                
                // Update the request body to use page_id instead
                blockData.parent = {
                    page_id: formattedPageId
                };
                
                // Try again with page_id
                response = await fetch(url, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(blockData)
                });
            }

            if (response.ok) {
                console.log("Message sent to Notion successfully!");
                return true;
            } else {
                const errorData = await response.json();
                console.error("Notion API error:", errorData);
                
                // Provide more helpful error messages based on common issues
                if (errorData.code === "object_not_found") {
                    console.error("The specified page or block ID was not found.");
                    console.error("Make sure the page exists and your integration has access to it.");
                    console.error("You need to share the page with your integration in Notion.");
                    console.error("Try creating a database in Notion and sharing it with your integration.");
                } else if (errorData.code === "unauthorized") {
                    console.error("Your integration doesn't have permission to access this page.");
                    console.error("Make sure you've shared the page with your integration in Notion.");
                } else if (errorData.code === "invalid_request_url") {
                    console.error("The request URL is invalid. Check your page ID format.");
                    console.error("Page ID should be in the format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
                    console.error("Or without dashes: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
                }
                
                throw new Error(`Failed to send message to Notion: ${response.status}`);
            }
        } catch (error) {
            console.error("Error sending message to Notion:", error);
            return false;
        }
    }

    /**
     * Send message to all configured services
     * @param {Object} options - Configuration options

     */
    async sendToAll({
                        line = this.log2IM_Config.line,
                        imgur = this.log2IM_Config.imgur,
                        telegram = this.log2IM_Config.telegram,
                        discord = this.log2IM_Config.discord,
                        text,
                        images
                    }) {
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
        if (telegram.token) {
            try {
                results.telegram = {
                    success: true,
                    response: await this.sendToTelegram({
                        text: text,
                        images: images,
                        token: telegram.token,
                        chatid: telegram.chatid
                    })
                };
            } catch (error) {
                results.telegram = {
                    success: false,
                    error: error.message
                };
            }
        }
        if (imgur.token) {
            try {
                results.telegram = {
                    success: true,
                    response: await this.sendToIMGUR({
                        text: text,
                        images: images,
                        token: imgur.token,
                        albumid: imgur.albumid
                    })
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

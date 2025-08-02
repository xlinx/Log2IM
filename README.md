# Log2IM (Telegram, Discord, LINE, imgur, Notion)
* small. use native node lib, no other needs.
* send anything to your IM realtime as log.
  * if u like u can add it to anywhere not just as log
  * one line send to All IM(Telegram, Discord, LINE, imgur)
* https://www.npmjs.com/package/log2im
* tool from https://decade.tw

### Usage
```shell
npm install log2im
```
```javascript
const {Log2im} = require("log2im/log2im.js");
// Run the tests
try {
    // Option 1: Use config object
    // const log2IM = new Log2im(log2IM_Config);
    
    // Option 2: Use .env file
    const log2IM = new Log2im();
    
    log2IM.sendToDiscord({text:'send2discord',image_file:'/Users/x/Pictures/D.png'}).then((r)=>{log2IM.history()})
    log2IM.sendToTelegram({text:'send2telegram',image_file:'/Users/x/Pictures/D.png'}).then((r)=>{log2IM.history()})
    log2IM.sendToIMGUR({text:'imgur_title',image_file:'/Users/x/Pictures/D.png'}).then((r)=>{log2IM.history()})
    log2IM.sendToLineMessaging({text:'send2line'}).then((r)=>{log2IM.history()})
    
    // Send to Notion with an image file
    log2IM.sendToNotion({
        text: 'Test Notion message', 
        image_file: '/Users/x/Pictures/D.png'
    }).then((r) => {
        console.log('Notion response:', r);
    });
    
    const results = log2IM.sendToAll(log2IM_Config);
} catch (error) {
    console.error('Error in testSendToAllLineNotify:', error.message);
}
```

### Method1 - Config use obj
```javascript

const log2IM_Config = {
    text:`wahaha@${Date.now()}`,
    image_url:'https://www.decade.tw/wp-content/uploads/2021/09/DECADE_new.png',
    image_file: '/Users/x/Pictures/D.png',

    line: {token: 'must_need'},
    telegram: {token: 'must_need', chatid: 'must_need'},
    discord: {token: 'must_need', chatid: 'must_need',clientid:'must_need'},
    imgur: {token: 'must_need',albumid:'get from url, set if u want img into album',
        clientid:'no need after token get',
        clientsecret:'no need after token get'} //chatid is imgur album name
}
```
### Method2 - Config use .env
```shell
.env

line_token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

telegram_token= xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
telegram_chatid= 1967680189

discord_token= xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
discord_chatid=1332432695237673052
discord_clientid=1400502410769858632

imgur_token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
imgur_albumid=get from url, set if u want img into album
imgur_clientid=no need after token get
imgur_clientsecret=no need after token get

notion_token= ntn_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
notion_chatid=243df44366a8802aaa9bd2ed6ef2f543

```

## IMs Support
<table style="border-width:0px">
<tr>
    <td><b style="font-size:20px">Notion API [🟢ready to use]</b>
        <li>Create a Notion integration first - <a href="https://www.notion.so/my-integrations">link</a></li>
        <li>Get your integration token and add it to your .env file as NOTION_TOKEN</li>
        <li>You can use either a Notion page ID or database ID:</li>
        <li>get from notion url on your page link</li>
        <li>Example: 1429989fe8ac4effbc8f57f56486db54</li>
        <li>Note: Images are handled by reference only - they need to be hosted elsewhere</li>
    </td>
    <td><svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.81 1.294L18.446.068c2.043-.175 2.568-.057 3.852.875l5.311 3.733c.877.642 1.169.817 1.169 1.516v20.473c0 1.283-.468 2.042-2.102 2.158L7.357 29.99c-1.228.058-1.811-.117-2.454-.934l-3.91-5.074C.29 23.048 0 22.349 0 21.532V3.334c0-1.049.468-1.924 1.81-2.04z" fill="#fff"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M18.447.068L1.808 1.294C.468 1.41 0 2.285 0 3.334v18.198c0 .817.291 1.516.992 2.45l3.911 5.074c.643.817 1.226.992 2.453.934l19.321-1.167c1.634-.116 2.102-.875 2.102-2.158V6.192c0-.663-.263-.854-1.037-1.42l-.132-.096L22.3.943c-1.285-.932-1.81-1.05-3.854-.875zM7.793 5.857c-1.577.106-1.936.13-2.831-.597L2.685 3.452c-.233-.234-.116-.526.467-.584l15.995-1.166c1.342-.117 2.043.35 2.568.758l2.744 1.983c.117.059.408.408.058.408l-16.52.992-.203.014zM5.954 26.49V9.11c0-.759.234-1.109.934-1.168l18.971-1.108c.643-.058.935.35.935 1.108v17.264c0 .759-.117 1.401-1.168 1.459l-18.154 1.05c-1.05.058-1.518-.291-1.518-1.225zm17.922-16.448c.116.525 0 1.05-.527 1.11l-.874.173v12.832c-.76.408-1.46.641-2.044.641-.934 0-1.168-.292-1.868-1.166l-5.721-8.982v8.69l1.81.409s0 1.05-1.46 1.05l-4.027.233c-.117-.234 0-.817.408-.933l1.051-.291v-11.49L9.165 12.2c-.117-.525.174-1.283.992-1.341l4.32-.292 5.954 9.1v-8.05l-1.518-.174c-.116-.643.35-1.109.934-1.167l4.029-.234z" fill="#000"></path></svg></td>
 </tr>
 <tr>
    <td><b style="font-size:20px">LINE-Bot-MsgAPI [🟠bug fixing]</b>
    <li>add bot first- <a href="https://developers.line.biz/zh-hant/services/messaging-api/">link</a></li><li>later version porting...</li></td>
    <td><img width="100px" src="https://developers.line.biz/assets/img/products/messaging-api/p1.svg"></td>
 </tr>

 <tr>
    <td><b style="font-size:20px">Telegram - Bot [🟢ready to use]</b><li>add bot first- <a href="https://core.telegram.org/api">link</a></li><li>no-need server(if just send text&img to IM)</li><li>control node from IM (need cloud server. like AWS lambda)</li><li>text & image support</li></td>
    <td><img width="100px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/512px-Telegram_logo.svg.png"></td>

 </tr>
 <tr>
    <td><b style="font-size:20px">Discord - Bot [🟢ready to use]</b><li>add bot first- <a href="https://discord.com/developers/applications">link</a></li><li>no-need server(if just send text&img to IM)</li><li>control node from IM (need cloud server. like AWS lambda)</li><li>text & image support</li></td>
    <td><img width="100px" src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/636e0b5061df29d55a92d945_full_logo_blurple_RGB.svg"></td>
 </tr>
 <tr>
    <td><b style="font-size:20px">imgur - FreePic [🟢ready to use]</b> 
        <li>add app first- <a href="https://imgur.com/account/settings/apps">link</a></li>
        <li> use Client ID、Client Secret to get token</li>
        <li> If you already have the id and secret, just login with your browser and then on another tab</li> 
        <li>enter this URL (replace CLIENT_ID)
        <li>https://api.imgur.com/oauth2/authorize?client_id=CLIENT_ID&response_type=token</li>
        <li>Accept, and from the resulting URL you need to extract the desired tokens</li>
        <li>other tutorial - <a href="https://rapidapi.com/blog/imgur-api-tutorial/">link</a></li>
        <li>Upload limits: unlimited, but 50 images per hour. </li>
         </td>
    <td><img width="100px" src="https://s.imgur.com/images/imgur-logo.svg"></td>
 </tr>
 <tr>
    <td><strike style="font-size:20px">LINE-Notify(🔴official stop service @2025/04)</strike>
    <li>LY crop. official stop service @2025/04</li>
    <li>using 2.LINE-Bot-Messaging API replace Notify services</li></td>
    <td><img width="100px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/320px-LINE_logo.svg.png"></td>
 </tr>
 <tr>
    <td><b style="font-size:20px">Notion [🟢ready to use]</b>
    <li>Create a Notion integration - <a href="https://www.notion.so/my-integrations">link</a></li>
    <li>Set NOTION_TOKEN in your .env file</li>
    <li>Send messages with image files to your Notion workspace</li>
    <li>Images are uploaded and added both to new pages and appended to existing pages</li>
    <li>Supports both database entries and direct page updates</li></td>
    <td><img width="100px" src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png"></td>
 </tr>
</table>

#### Preparing
* Line-Notify: ❓[access-token] ~5min
* ~~Line-Bot-Messaging-API:~~ ❓[API access-token-ID] ❓[cloud-server] ~60min
* Telegram-bot: ❓[bot-token] ❓[chat-id] ~10min
* Discord: ❓[User]/❓[Server|Guild]/❓[Message] ID ~15min
* Notion: ❓[NOTION_TOKEN] ~5min

#### LINE
* ⬇️LINE Notify (basic usage, receive from web-ui)
    * You need get Token,
    * then add LINENotify to where u want recive place(can be a group or just u)
    * 1. https://notify-bot.line.me/
    * 2. free for 1000 request /per token
    * 3. ever account can have 100 tokens max
    * 4. limit info https://notify-bot.line.me/doc/en/
* LINE bot messaging-api (in advance, u can send message control web-ui)
    * https://developers.line.biz/zh-hant/services/messaging-api/
#### Telegram
* Telegram
    * You need get [**_`BotToken`_**] & [**_`ChatId`_**]
        1. https://t.me/botfather
        2. type /newbot
        3. bot name: webuix
        4. bot username("end with _bot"): webuix_bot
        5. okay, u got [**_`BotToken`_**]
        6. add ur new bot as friend: goto https://t.me/webuix_bot
        7. get [**_`ChatID`_**]: https://api.telegram.org/botXXXXXXXXXXXXXXX/getUpdates
        8. find [**_`ChatID`_**] in json file=> ex: 1967680189
* detail manual: https://core.telegram.org/bots/tutorial#getting-ready
* get BotToken
    * add botfather inside ur telgram
    * type "/newbot"
    * type "XXXXXXXX_bot"
    * then, u will get botToken
    * then add this bot as ur friend
* get ChatId
    * replace YOUR_BOT_TOKEN
        * https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
* WhatsApp
    * seems only for business
    * https://business.whatsapp.com/products/business-platform
* IFTTT (share what's funny how u interactive with web-ui)
    * https://ifttt.com/line
    * https://ifttt.com/explore
#### Discord
* [TX & RX] ~~Send Cmd from Discord to sd-web-ui~~ security issue.
* [TX-only]Send sd-web-ui to Discord. we need
    * [Channel-ID]
    * [Bot-Token]
    * [Invite-Bot-into-Channel]

  ##### [Channel-ID]
    * Create a channel on ur discord
        * In The Discord application go to Settings > Appearance > Check developer mode.
        * Right click channel name and copy the channel ID (Copy ID).
  ##### [Bot-Token]
    * goto Discord Developer Portal. https://discord.com/developers/applications
    * Create App on discord.
    * Add a Bot. Check [Message Content Intent] Save Change.
    * View [Token]. copy it into extension.
  ##### [Invite-Bot-into-Channel]
    * In App page left side menu [OAuth2]->[SCOPES]->checkbox [bot]->permissions [send message] get bot URL.
    * run url. Add bot to channel
        * bot URL ex: https://discord.com/oauth2/authorize?client_id=xxxxxxxxxxxx&permissions=51200&integration_type=0&scope=bot
        * then u should see bot inside channel in user list.(前往「OAuth2」， 在「SCOPES」中點選 bot，下方連接就是機器人邀請連結，就可以將機器人邀請進去你自己的群)



## Buy me a Coca cola ☕

https://buymeacoffee.com/xxoooxx

## Colophon

Made for fun. I hope if brings you great joy, and perfect hair forever. Contact me with questions and comments, but not threats, please. And feel free to contribute! Pull requests and ideas in Discussions or Issues will be taken quite seriously!
--- https://decade.tw


### Other Projects Quick Links

* Auto prompt by LLM and LLM-Vision (Trigger more details out inside model)
    * SD-WEB-UI: https://github.com/xlinx/sd-webui-decadetw-auto-prompt-llm
    * ComfyUI:   https://github.com/xlinx/ComfyUI-decadetw-auto-prompt-llm
* Auto msg to ur mobile  (LINE | Telegram | Discord)
    * SD-WEB-UI :https://github.com/xlinx/sd-webui-decadetw-auto-messaging-realtime
    * ComfyUI:  https://github.com/xlinx/ComfyUI-decadetw-auto-messaging-realtime
* I'm SD-VJ. (share SD-generating-process in realtime by gpu)
    * SD-WEB-UI: https://github.com/xlinx/sd-webui-decadetw-spout-syphon-im-vj
    * ComfyUI:   https://github.com/xlinx/ComfyUI-decadetw-spout-syphon-im-vj
* CivitAI Info|discuss:
    * https://civitai.com/articles/6988/extornode-using-llm-trigger-more-detail-that-u-never-thought
    * https://civitai.com/articles/6989/extornode-sd-image-auto-msg-to-u-mobile-realtime
    * https://civitai.com/articles/7090/share-sd-img-to-3rd-software-gpu-share-memory-realtime-spout-or-syphon

<hr/>
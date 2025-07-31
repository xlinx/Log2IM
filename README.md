# Log2IM (node version)
* small. use native node lib, no other needs.
* send anything to your IM realtime as log.
* https://decade.tw

### Usage

```javascript
const {Log2im} = require("log2im/log2im.js");

const log2IM_Config = {
    text:`wahaha@${Date.now()}`,
    images:{
      url:'https://www.decade.tw/wp-content/uploads/2021/09/DECADE_new.png',
      filepath: '/Users/x/Pictures/D.png', //imageOption1
      base64: base64Example //imageOption2
    },
    line: {token: ''},
    telegram: {token: '11111:xxxxxxxxxxxxxxxxxxxxxx', chatid: '1967680189'},
    discord: {token: '', chatid: ''},
    imgur: {token: ''}
    
    const log2IM = new Log2im();
    log2IM_Config.text='init solar proxy'
    log2IM.sendToAll(log2IM_Config).then(r => {
        console.log("[DECADE.TW][log2im][ok]")
    })
}
```

## IMs Support 
<table style="border-width:0px">

 <tr>
    <td><b style="font-size:20px">LINE-Bot-MsgAPI</b>
    <li><a href="https://developers.line.biz/zh-hant/services/messaging-api/">link</a></li></td>
    <td><img width="100px" src="https://developers.line.biz/assets/img/products/messaging-api/p1.svg"></td>
 </tr>

 <tr>
    <td><b style="font-size:20px">Telegram - Bot</b><li><a href="https://core.telegram.org/api">link</a></li></td>
    <td><img width="100px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/512px-Telegram_logo.svg.png"></td>
 </tr>
 <tr>
    <td><b style="font-size:20px">Discord - Bot</b><li><a href="https://discord.com/developers/applications">link</a></li></td>
    <td><img width="100px" src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/636e0b5061df29d55a92d945_full_logo_blurple_RGB.svg"></td>
 </tr>
 <tr>
    <td><b style="font-size:20px">imgur - FreePic</b> 
        <li><a href="https://imgur.com/account/settings/apps">link</a></li>
        <li>Upload limits</li>
        <li>There is an upload limit of 50 images per hour. </li>
        <li>There is no upload limit per account, so upload to your heart's desire!</li> </td>
    <td><img width="100px" src="https://s.imgur.com/images/imgur-logo.svg"></td>
 </tr>
 <tr>
    <td><strike style="font-size:20px">LINE-Notify(official stop service @2025/04)</strike>
    <li>LY crop. official stop service @2025/04</li>
    <li>using 2.LINE-Bot-Messaging API replace Notify services</li></td>
    <td><b style="font-size:20px"><img width="100px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/320px-LINE_logo.svg.png"></td>
 </tr>
</table>

#### Preparing
* Line-Notify: ❓[access-token] ~5min
* ~~Line-Bot-Messaging-API:~~ ❓[API access-token-ID] ❓[cloud-server] ~60min
* Telegram-bot: ❓[bot-token] ❓[chat-id] ~10min
* Discord: ❓[User]/❓[Server|Guild]/❓[Message] ID ~15min

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
        * bot URL ex: https://discord.com/oauth2/authorize?client_id=xxxxxxxxxxxx&permissions=2048&integration_type=0&scope=bot
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
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

    log2IM.sendToDiscord({text: 'send2discord', image_file: '/Users/x/Pictures/D.png'}).then((r) => {
        log2IM.history()
    })
    log2IM.sendToTelegram({text: 'send2telegram', image_file: '/Users/x/Pictures/D.png'}).then((r) => {
        log2IM.history()
    })
    log2IM.sendToIMGUR({text: 'imgur_title', image_file: '/Users/x/Pictures/D.png'}).then((r) => {
        log2IM.history()
    })
    log2IM.sendToLineMessaging({text: 'send2line'}).then((r) => {
        log2IM.history()
    })

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
    text: `wahaha@${Date.now()}`,
    image_url: 'https://www.decade.tw/wp-content/uploads/2021/09/DECADE_new.png',
    image_file: '/Users/x/Pictures/D.png',

    line: {token: 'must_need'},
    telegram: {token: 'must_need', chatid: 'must_need'},
    discord: {token: 'must_need', chatid: 'must_need', clientid: 'must_need'},
    imgur: {
        token: 'must_need', albumid: 'get from url, set if u want img into album',
        clientid: 'no need after token get',
        clientsecret: 'no need after token get'
    } //chatid is imgur album name
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
notion_chatid=243df44366a8802aaa9bd2ed6ef2f543(notion-page-url-id)
```

## IMs Support
<table style="border-width:1px;">
    <tr>
        <td><b style="font-size:20px">Notion [🟢ready to use]</b>
            <ul>
                <li>Create a Notion integration - <a href="https://www.notion.so/my-integrations">link</a></li>
                <li>get page id from ur notion page URL(without page-title-ahead)</li>
            </ul>
        </td>
        <td><img width="100px" src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="">
        </td>
    </tr>
    <tr>
        <td><b style="font-size:20px">LINE-Bot-MsgAPI [🟠bug fixing]</b>
            <ul>
                <li>add bot first- <a href="https://developers.line.biz/zh-hant/services/messaging-api/">link</a></li>
                <li>later version porting...</li>
            </ul>
        </td>
        <td><img width="100px" src="https://developers.line.biz/assets/img/products/messaging-api/p1.svg" alt=""></td>
    </tr>
    <tr>
        <td><b style="font-size:20px">Telegram - Bot [🟢ready to use]</b>
            <ul>
                <li>add bot first- <a href="https://core.telegram.org/api">link</a></li>
                <li>no-need server(if just send text&img to IM)</li>
                <li>control node from IM (need cloud server. like AWS lambda)</li>
                <li>text & image support</li>
            </ul>
        </td>
        <td><img width="100px"
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/512px-Telegram_logo.svg.png"
                 alt=""></td>
    </tr>
    <tr>
        <td><b style="font-size:20px">Discord - Bot [🟢ready to use]</b>
            <ul>
                <li>add bot first- <a href="https://discord.com/developers/applications">link</a></li>
                <li>no-need server(if just send text&img to IM)</li>
                <li>control node from IM (need cloud server. like AWS lambda)</li>
                <li>text & image support</li>
            </ul>
        </td>
        <td><img width="100px"
                 src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/636e0b5061df29d55a92d945_full_logo_blurple_RGB.svg"
                 alt=""></td>
    </tr>
    <tr>
        <td><b style="font-size:20px">imgur - FreePic [🟢ready to use]</b>
            <ul>
                <li>add app first- <a href="https://imgur.com/account/settings/apps">link</a></li>
                <li> use Client ID、Client Secret to get token</li>
                <li> If you already have the id and secret, just login with your browser and then on another tab</li>
                <li>enter this URL (replace CLIENT_ID)
                <li>https://api.imgur.com/oauth2/authorize?client_id=CLIENT_ID&response_type=token</li>
                <li>Accept, and from the resulting URL you need to extract the desired tokens</li>
                <li>other tutorial - <a href="https://rapidapi.com/blog/imgur-api-tutorial/">link</a></li>
                <li>Upload limits: unlimited, but 50 images per hour.</li>
            </ul>
        </td>
        <td><img width="100px" src="https://s.imgur.com/images/imgur-logo.svg" alt=""></td>
    </tr>
    <tr>
        <td><span
                style="font-size:20px; text-decoration: line-through;">LINE-Notify(🔴official stop service @2025/04)</span>
            <ul>
                <li>LY crop. official stop service @2025/04</li>
                <li>using 2.LINE-Bot-Messaging API replace Notify services</li>
            </ul>
        </td>
        <td><img width="100px"
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/320px-LINE_logo.svg.png"
                 alt=""></td>
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
    *
        1. https://notify-bot.line.me/
    *
        2. free for 1000 request /per token
    *
        3. ever account can have 100 tokens max
    *
        4. limit info https://notify-bot.line.me/doc/en/
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
        * bot URL
          ex: https://discord.com/oauth2/authorize?client_id=xxxxxxxxxxxx&permissions=51200&integration_type=0&scope=bot
        * then u should see bot inside channel in user list.(前往「OAuth2」， 在「SCOPES」中點選
          bot，下方連接就是機器人邀請連結，就可以將機器人邀請進去你自己的群)

## Buy me a Coca cola ☕

https://buymeacoffee.com/xxoooxx

## Colophon

Made for fun. I hope if brings you great joy, and perfect hair forever. Contact me with questions and comments, but not
threats, please. And feel free to contribute! Pull requests and ideas in Discussions or Issues will be taken quite
seriously!
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


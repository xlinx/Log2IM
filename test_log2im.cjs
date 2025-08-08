const { Log2im } = require('./log2im.js');

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

// Run the tests
try {
    // const log2IM = new Log2im();
    // const log2IM = new Log2im(log2IM_Config);//use above obj
    const log2IM = new Log2im('XXX.env');//use .env

    const results = log2IM.sendToAll(log2IM_Config);

    // log2IM.sendToDiscord({text:'send2discord',image_file:'/Users/x/Pictures/D.png'}).then((r)=>{log2IM.history()})
    // log2IM.sendToTelegram({text:'send2telegram',image_file:'/Users/x/Pictures/D.png'}).then((r)=>{log2IM.history()})
    // log2IM.sendToIMGUR({text:'imgur_title',image_file:'/Users/x/Pictures/D.png'}).then((r)=>{log2IM.history()})
    // Test the updated sendToNotion function with an image file
    // log2IM.sendToNotion({text:'from log2im '+Date.now(),image_file:'/Users/x/Pictures/D.png'}).then((r) => {
    //     console.log('Notion response:', r);
    // });
    // log2IM.sendToLineMessaging({text:'send2line'}).then((r)=>{log2IM.history()})
} catch (error) {
  console.error('Error in testSendToAllLineNotify:', error.message);
}
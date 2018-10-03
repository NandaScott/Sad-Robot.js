/* 
Sending a local image as an embed
let embed = new Discord.RichEmbed()
    .setImage('attachment://WednesdayMeme.jpg');

msg.channel.send({ embed, files: [{ attachment: './WednesdayMeme.jpg', name: 'WednesdayMeme.jpg' }] });


======= Rotate image feature ========

Use a pattern like this to download the image from scryfall
https://stackoverflow.com/questions/18264346/how-to-load-an-image-from-url-into-buffer-in-nodejs

Then use that buffer and load it into sharp, perform operations

Then send that to an endpoint which we can use in an embed.

Might be possible to send that buffer as an attachment to discord.

*/
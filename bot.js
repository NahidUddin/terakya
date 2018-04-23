const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "!";

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "new") {
    message.delete()

  let choice = args.join(' ');

  if (choice) {
  let name = message.author.username;
  let userid =  message.author;

  message.guild.createChannel(`ticket-${choice}`).then(async c => {
      if (message.guild.channels.find(c => c.name.toLowerCase() === 'tickets')) {
          if (message.guild.channels.find(c => c.name.toLowerCase() === 'tickets').type === 'category') {
              c.setParent(message.guild.channels.find(c => c.name.toLowerCase() === 'tickets').id)
          }
          c.overwritePermissions(message.guild.defaultRole, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false
          })
          c.overwritePermissions(userid, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          })

          c.send({embed: {
            color: 0x39e600,
            timestamp: new Date(),
            footer: {
              icon_url: bot.user.avatarURL,
              text: "Created by: OrthaxioBot"
            },
            description: `*We would like more information on this so may you please fill out all the information bellow and paste it into the channel?*`
          }})
        }
    })
  } else {
        message.channel.send({embed: {
          color: 0x39e600,
          description: `***Usage***\n*!new <category>*\n\n***Valid categories***\n*General Support | Billing Support | Other Support*`
        }}).then(function(a) {
          a.delete(4000);
        })
      }
}

  if (command === "close") {
    message.delete()

  if(message.channel.parentID === "436185942735323137") {
      message.channel.delete()
    } else {
      message.channel.send({embed: {
        title: 'No Permission & Channel!',
        description: `Sorry you do not have permission to do this or you are doing this in the wrong channel ${message.author.username}!`,
        color: 0x39e600
      }})
    }
  }
});

bot.login('NDM3MjkwNDg2MTM5NDUzNDQx.Dbz6BA.4u4NYfeDzUIpPq3jSVppAUVuLSc');

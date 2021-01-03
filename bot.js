const Discord = require('discord.js');
const redis = require('redis');
const cache = redis.createClient(6379, '127.0.0.1');

const helpText = require('./extra_utils/helpText');
const adminUtils = require('./admin/adminUtils');
const prefix = require('./extra_utils/handlePrefixes');
const cogs = require('./cogs/cogs');
const {
  startFetch,
  fetchAllCards,
  constructEmbeds,
} = require('./cogs/promiseCard');

const client = new Discord.Client();

require('dotenv').config();

function errorDM(err) {
  client.users
    .fetch(process.env.MASTER_ID)
    .then((user) => user.createDM())
    .then((dm) => dm.send('Error happened! ```' + err.stack + '```'))
    .catch(console.error);
}

client.on('ready', () => {
  console.log('Logged in!', new Date().toISOString());
  prefix.setDefaultPrefix(cache);

  cache.get('bannedUsers', (err, reply) => {
    if (err) console.log(err);

    if (reply === null) {
      console.log('No ban list found. Creating empty list.');
      let init = { users: [] };

      cache.set('bannedUsers', JSON.stringify(init));
    } else {
      console.log('Ban list found.');
    }
  });
});

client.on('message', async (msg) => {
  // Ignore ourself and other bots
  if (msg.author.bot) return;

  // Ignore banned users
  if (await adminUtils.search(msg.author.id)) {
    return;
  }

  let serverPrefix = await prefix.checkPrefix(msg);

  const args = msg.content.split(' ').slice(1);
  const command = msg.content.split(' ')[0].replace(serverPrefix, '');

  switch (command) {
    case 'feedback':
      adminUtils.getFeedback(msg, args);
      break;
    case 'help':
      msg.author.send(helpText.helpText(serverPrefix));
      break;
    case 'ping':
      const m = await msg.channel.send('Ping?');
      m.edit(
        `Pong! Latency is ${
          m.createdTimestamp - msg.createdTimestamp
        }ms. API Latency is ${Math.round(client.ping)}ms`
      );
      break;
    case 'prefix':
      prefix.main(cache, msg, args);
      break;
  }

  switch (msg.content.toLowerCase()) {
    default:
      msg
        .react('⏱️')
        .then((msgReaction) => startFetch(msgReaction.message))
        .then((requestedCards) => fetchAllCards(requestedCards))
        .then((promises) => Promise.all(promises))
        .then((resps) => constructEmbeds(resps))
        .then((embeds) => embeds.forEach((embed) => msg.channel.send(embed)))
        .then(() => {
          if (msg.channel.type !== 'dm') {
            return msg.reactions.resolve('⏱️');
          }
        })
        .then((reaction) => {
          if (reaction) {
            reaction.remove();
          }
        })
        .catch(errorDM);
      break;
    case 'good bot':
      msg.reply('Thank you!');
      break;
    case 'resetprefix':
      prefix.resetPrefix(cache, msg);
      break;
  }
});

client.on('guildMemberAdd', async (member) => {
  const memberId = member.id;
  let serverPrefix = await prefix.checkPrefix(msg);
  const selfName = process.env.BOT_NAME;

  client.users
    .fetch(memberId)
    .then((user) => {
      user.send(helpText.greeting(member.guild.name, serverPrefix, selfName));
    })
    .catch((err) => {
      console.error(err);
    });
});

client.on('guildCreate', (guild) => {
  const membersWithHighestRole = guild.roles.highest.members;

  membersWithHighestRole.forEach((member) =>
    member.send(helpText.onJoin(guild.name, process.env.BOT_NAME))
  );
});

client.on('guildDelete', (guild) => {
  cache.del(guild.id, (err, reply) => {
    if (err) console.log(err);

    console.log(`Successfully removed prefix for server ${guild.id}`);
  });
});

client.login(process.env.TOKEN);

module.exports = {
  errorDM,
};

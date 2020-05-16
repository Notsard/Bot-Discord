require('dotenv').config({
    path: 'config/.env'
});

/**
 * Dépendances du bot
 */
const   Discord = require('discord.js'),
        clear = require('clear'),
        client = new Discord.Client(),
        colors = require('colors');

/**
 * Environnement Variables in config/.env
 */
const   token = process.env.BOT_TOKEN,
        botStatus = process.env.BOT_STATUS

/**
 * Statistiques du Bot
 */
let serversNumber;
let serversName = [];

/**
 * Features
 */
const adminFeature = require('./Features/Administratives/JoinLeave');

async function getServers() {
    let serversArray = client.guilds.array();
    serversNumber = serversArray.length;
    serversName = serversArray.join().replace(',','\n\r- ');
}

client.on('ready', async function(){
    clear();

    await getServers();

    console.log(`
        \rBot Connecté avec succès ! 
        \n
        \rNom de votre bot : ${client.user.username},
        \rNombre de serveurs : ${serversNumber},
        \rListe des serveurs :
        \r- ${serversName}
        \n
    `.green.bold+`\rDéveloppé par : Notsard#1080`.yellow.bold);

    client.user.setActivity(botStatus)
    

});
/*
client.on('message', (msg) => {
    eventHandler.onMessage(msg);
});
*/

client.on('guildMemberAdd', member => {
    adminFeature.newMember(Discord, client, member);
});

client.on('guildMemberRemove', member => {
    adminFeature.leaveMember(Discord, client, member);
});
client.on('message', message => {
    // If the message is "what is my avatar"
    if (message.content === 'Mon avatar ?') {
      // Send the user's avatar URL
      message.reply(message.author.displayAvatarURL);
    }
  });
client.login(token);
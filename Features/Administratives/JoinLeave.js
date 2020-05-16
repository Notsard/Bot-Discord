/**
 * Les fonctions prendront en paramètres :
 * - botInstance : L'instance du bot
 * - member : l'objet user du membre qui a rejoind / quitté
 * - WellcomeChannel / GoodbyeChannel : Le Channel textuel où sera annoncé l'arrivée ou le départ d'un membre 
 */

require('dotenv').config({
    path: 'config/.env'
});

const   BotChannel = process.env.BOT_CHANNEL,
        DefaultRole = process.env.DEFAULT_ROLE;

module.exports = {
    newMember: (Discord, client, member) => {
        const channel = member.guild.channels.find('name', BotChannel),
              defaultRole = member.guild.roles.find('name', DefaultRole);
    
        channel.send(`${member}`,new Discord.RichEmbed()
                .setAuthor(client.user.username,client.user.avatarURL)
                .setTitle("💠 Bienvenue sur notre serveur ! 💠")
                .setColor(7385958)
                .setThumbnail(member.user.avatarURL)
                .setTimestamp()
                .addField(`Nous te souhaitons de passer de bons moments parmis nous ! 😄`, '\u200b')
        );
        if(DefaultRole != "" || DefaultRole != undefined || DefaultRole != null){
            member.addRole(defaultRole).catch(console.error)
        }
      },
    
      leaveMember: (Discord, client, member) => {
        const channel = member.guild.channels.find('name', BotChannel),
              username = member.user.username;
    
        channel.send(new Discord.RichEmbed()
                .setAuthor(client.user.username,client.user.avatarURL)
                .setColor(7385958)
                .setThumbnail(member.user.avatarURL)
                .setTimestamp()
                .addField("Bye Bye :v:",username+" à quitté le discord.")
        );
      }
}
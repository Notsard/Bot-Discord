

module.exports= {

hello: ('message', message => {
    if (message.content === 'Bonjour') {
      message.reply("Salut !");
    }
}),
ping: ('message', message => {
    // If the message is "ping"
    if (message.content === 'ping') {
      // Send "pong" to the same channel
      message.channel.send('pong');
    }
  }),

}
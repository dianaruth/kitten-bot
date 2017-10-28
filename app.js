const Discord = require('discord.js');
require('isomorphic-fetch');

const client = new Discord.Client();

function matchExact(r, str) {
  var match = str.match(r);
  return match != null && str == match[0];
}

client.on('ready', () => {
  console.log("I'm online");
});

client.on('message', message => {
  const re = /\?givekittento\s<@\d+>/;
  if (matchExact(re, message.content)) {
    console.log(message.author);
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_TOKEN}&tag=kitten&rating=G`;
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(gifs) {
      const embed = new Discord.RichEmbed()
        .addField(':cat: Incoming Kitten! :cat:', `${message.author}, you have given a kitten to ${message.mentions.members.first()}!`, true)
        .setImage(gifs.data.image_url);
      message.channel.send({embed});
    })
    .catch(function(err) {
      console.log(err);
    });
  } else if (message.content === '?help') {
    message.channel.send({
      embed: {
        title: 'kitten-bot help',
        description: 'Give a kitten to a friend by typing `?givekittento @friendsusername`'
      }
    });
  }
});

client.login(process.env.DISCORD_TOKEN);

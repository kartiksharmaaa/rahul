const {
  MessageAttachment,
  Client,
  Collection,
} = require("discord.js-selfbot-v13");
const { token, serverID, litecoin, img } = require("./config.js");

const client = new Client({
  checkUpdate: false,
});

const processedChannels = new Collection();

client.on("ready", () => {
  console.log(`${client.user.username} is ready!`);
  const targetServer = client.guilds.cache.get(serverID);

  if (targetServer) {
    console.log(`Server name: ${targetServer.name}`);
  } else {
    console.log(
      `Bot is not a member of the specified server (ID: ${serverID})`
    );
  }
});

client.on("channelCreate", (channel) => {
  if (
    channel.guild.id === serverID &&
    channel.type === "GUILD_TEXT" &&
    channel.name.includes("video-likes") &&
    !processedChannels.has(channel.id)
  ) {
    const attachment = new MessageAttachment(img);
    const intervalId = setInterval(() => {
      const permissions = channel.permissionsFor(client.user);
      if (permissions.has("SEND_MESSAGES")) {
        channel
          .send({ content: litecoin, files: [attachment] })
          .then(() => {
            console.log(
              `Message successfully sent to ${channel.name} in ${channel.guild.name}`
            );
            processedChannels.set(channel.id, true);
            clearInterval(intervalId); // Stop the interval once the message is sent
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }, 50);
  }
});

client.login(token);

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
});

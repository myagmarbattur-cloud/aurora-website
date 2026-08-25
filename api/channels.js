export default async function handler(req, res) {
  const guildId = "1529096653372522596";

  const response = await fetch(
    `https://discord.com/api/v10/guilds/${guildId}/channels`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
      }
    }
  );

  const channels = await response.json();

  res.status(response.status).json(channels);
}

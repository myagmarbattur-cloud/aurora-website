export default async function handler(req, res) {
  const guildId = "1529096653372522596";

  const response = await fetch(
    `https://discord.com/api/v10/guilds/${guildId}?with_counts=true`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
      }
    }
  );

  const data = await response.json();

  res.status(response.status).json(data);
}

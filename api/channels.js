export default async function handler(req, res) {
  const guildId = "1529096653372522596";
  const token = process.env.DISCORD_BOT_TOKEN;

  try {
    const [channelsResponse, guildResponse] = await Promise.all([
      fetch(
        `https://discord.com/api/v10/guilds/${guildId}/channels`,
        {
          headers: {
            Authorization: `Bot ${token}`
          }
        }
      ),
      fetch(
        `https://discord.com/api/v10/guilds/${guildId}?with_counts=true`,
        {
          headers: {
            Authorization: `Bot ${token}`
          }
        }
      )
    ]);

    const channels = await channelsResponse.json();
    const guild = await guildResponse.json();

    if (!channelsResponse.ok) {
      return res.status(channelsResponse.status).json(channels);
    }

    if (!guildResponse.ok) {
      return res.status(guildResponse.status).json(guild);
    }

    res.status(200).json({
      channels,
      memberCount: guild.approximate_member_count ?? 0,
      onlineCount: guild.approximate_presence_count ?? 0
    });

  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch Discord data"
    });
  }
}

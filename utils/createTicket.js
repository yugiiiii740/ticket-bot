const { PermissionFlagsBits } = require('discord.js');
const config = require('../config.json');

module.exports = async (interaction) => {
    const guild = interaction.guild;
    const member = interaction.member;
    const selected = interaction.values[0];

    const channelName = `ticket-${member.user.username.toLowerCase()}`;

    const existing = guild.channels.cache.find(ch =>
        ch.name === channelName &&
        ch.type === 0
    );

    if (existing) {
        return interaction.reply({ content: 'Zaten açık bir ticketin var!', ephemeral: true });
    }

    const channel = await guild.channels.create({
        name: channelName,
        type: 0,
        parent: config.categoryId,
        permissionOverwrites: [
            {
                id: guild.id,
                deny: [PermissionFlagsBits.ViewChannel],
            },
            {
                id: member.id,
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
            },
            {
                id: config.roles.staff,
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
            }
        ]
    });

    await channel.send({
        content: `🎫 Merhaba ${member}, destek talebin "${selected}" kategorisinde oluşturuldu. Yetkililer kısa sürede seninle ilgilenecektir.`
    });

    await interaction.reply({ content: `✅ Ticket oluşturuldu: ${channel}`, ephemeral: true });
};


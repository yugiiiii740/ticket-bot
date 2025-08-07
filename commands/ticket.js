const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Destek sistemi başlatır.'),
    async execute(interaction) {
        const menu = new StringSelectMenuBuilder()
            .setCustomId('ticket_select')
            .setPlaceholder('Lütfen destek talebi nedeninizi seçiniz.')
            .addOptions([
                {
                    label: 'Satın Alım',
                    description: 'Küçük skin veya yetki alımı için.',
                    value: 'satinalim',
                    emoji: '💎'
                },
                {
                    label: 'Bug & Şikayet Bildir',
                    description: 'Bug veya Şikayet bildirmek için.',
                    value: 'bug',
                    emoji: '🛠️'
                },
                {
                    label: 'Diğer',
                    description: 'Diğer sebeplerden dolayı ticket açıyorsanız.',
                    value: 'diger',
                    emoji: '📩'
                }
            ]);

        const row = new ActionRowBuilder().addComponents(menu);

        await interaction.reply({
            content: '**🟢 NOVA JB - DESTEK SİSTEMİ**\n\n**👋 Merhaba!** Aşağıdan ihtiyacın olan destek kategorisini seçerek bize ulaşabilirsin.\n\n__**🎫 Ticket Kuralları:**__\n🔒 Yanlış kategoriye açılan talepler kapatılır\n🔴 Yetkililere etiket atma',
            components: [row],
            ephemeral: true
        });
    }
};


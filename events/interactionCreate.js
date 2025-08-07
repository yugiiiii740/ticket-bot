const createTicket = require('../utils/createTicket');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (command) await command.execute(interaction, client);
        }

        if (interaction.isStringSelectMenu() && interaction.customId === 'ticket_select') {
            await createTicket(interaction);
        }
    }
};


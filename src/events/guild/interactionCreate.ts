import { Events, Interaction, MessageInteraction } from "discord.js";

export const event = {
    name: Events.InteractionCreate,
    execute: async (interaction: Interaction) => {
        console.log(
            `${interaction.user.tag} in #${interaction.channel} triggered an interaction.`
        );

        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(
                interaction.commandName
            );
            const opts = { args: null };

            if (!command) {
                console.error(
                    `No command matching ${interaction.commandName} was found.`
                );
                return;
            }

            try {
                await command.execute(interaction, opts);
            } catch (error) {
                console.error(
                    `Error executing ${
                        (interaction as MessageInteraction).commandName
                    }`
                );
                console.error(error);
                return interaction.reply({
                    content: "There was an error while executing this command!",
                    ephemeral: true,
                });
            }
        } else if (interaction.isAutocomplete()) {
            const command = interaction.client.commands.get(
                interaction.commandName
            );

            if (!command) {
                console.error(
                    `No command matching ${interaction.commandName} was found.`
                );
            }

            try {
                if (!command.autocomplete) return;
                command.autocomplete(interaction);
            } catch (error) {
                console.error(error);
            }
        }

        if (!interaction.isCommand()) return;
    },
};

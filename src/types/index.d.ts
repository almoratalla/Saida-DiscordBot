export interface BotEvent {
    name: string;
    once?: boolean | false;
    execute: (...args) => void;
}

export interface Command {
    name: string;
    description: string;
    execute: (
        message: Message,
        args: Array<string, string | null> | null
    ) => void;
    permissions: Array<PermissionResolvable>;
    aliases: Array<string>;
    cooldown?: number;
}

export interface SlashCommand {
    name: string;
    description: string;
    data: SlashCommandBuilder;
    execute: (interaction: CommandInteraction) => void;
}

export type SDCommand = Command | SlashCommand;

declare module "discord.js" {
    export interface Client extends Client {
        slashCommands: Collection<string, SlashCommand>;
        commands: Collection<string, Command>;
        cooldowns: Collection<string, number>;
    }
}

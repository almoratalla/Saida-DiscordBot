import conf from "./config.js";
import colors from "colors";
import { config } from "dotenv";
import { PREFIX } from "./constants.js";
const { token, client_id } = conf;
colors.enable();
config();

export const DISCORD_TOKEN = token || process.env.DISCORD_TOKEN || "";
export const DISCORD_CLIENT_ID =
    client_id || process.env.DISCORD_CLIENT_ID || "";

export default {
    DISCORD_TOKEN,
    PREFIX,
};

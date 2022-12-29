import config from "./config.js";
const { prefix } = config;

export const PREFIX = prefix || process.env.PREFIX || "!sha-";
export default {
    PREFIX,
};

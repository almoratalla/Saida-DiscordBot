import { createSchema } from "./command.js";

export const schemaCreate = (schema, args) => {
    if (schema === "command") {
        createSchema(args);
    }
};

export default schemaCreate;
const fs = require("fs");
const path = require("path");

const { resolve } = path;

const resolvePath = (path) => resolve(__dirname, path);

module.exports = {
    keys: "blog",
    static: {
        prefix: "/",
        dir: [resolvePath("../dist"), resolvePath("../app/public")],
    },
    siteFile: {
        "/favicon.ico": fs.readFileSync(path.join(__dirname, "../app/public/favicon.ico")),
    },
};

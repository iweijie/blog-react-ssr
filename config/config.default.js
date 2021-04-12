const fs = require("fs");
const path = require("path");

const { resolve } = path;

const resolvePath = (path) => resolve(__dirname, path);

module.exports = {
    keys: "egg-ssr",
    static: {
        prefix: "/",
        dir: [resolvePath("../dist"), resolvePath("../app/public")],
    },
    // "/favicon.ico": resolvePath("../app/public/favicon.ico"),
    // siteFile: {
    //     "/favicon.ico": resolvePath("../app/public/favicon.ico"),
    // },
    siteFile: {
        "/favicon.ico": fs.readFileSync(path.join(__dirname, "../app/public/favicon.ico")),
    },
};

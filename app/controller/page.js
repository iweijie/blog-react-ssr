const Controller = require("egg").Controller;
const renderToStream = require("ykfe-utils/lib/renderToStream");
const ssrConfig = require("../../config/config.ssr");
const { v4: uuidV4 } = require("uuid");
const { uuid, cookies } = require("../../constants/index");
const { forEach } = require("lodash");

class PageController extends Controller {
    async index() {
        const { ctx } = this;

        ctx[uuid] = uuidV4();

        try {
            // Page为webpack打包的chunkName，项目默认的entry为Page
            ctx.type = "text/html";
            ctx.status = 200;
            Object.assign(ctx.app.config, ssrConfig);
            const stream = await renderToStream(ctx, ctx.app.config);

            if (ctx[cookies]) {
                forEach(ctx[cookies], (cookie) => {
                    ctx.cookies.set(...cookie);
                });
            }

            ctx.body = stream;
        } catch (error) {
            ctx.logger.error(`Page Controller renderToStream Error ${error}`);
        }
    }
}

module.exports = PageController;

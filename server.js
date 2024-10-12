// 로컬 환경에 https 적용 - https://velog.io/@sejinkim/%EB%A1%9C%EC%BB%AC-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD%EC%97%90-HTTPS-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync("./localhost-key.pem"),
  cert: fs.readFileSync("./localhost.pem"),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on https://localhost:3000");
  });
});

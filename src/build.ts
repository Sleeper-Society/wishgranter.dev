import http from "http";
import { createReadStream, existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { firefox, type Page } from "playwright";
// OR
// const { chromium, firefox, webkit } = require('playwright');

const out_path = "public";
const scripts_path = "dist";
const working_path = "src";
const host = "localhost";
const port = 8000;

const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".pdf": "application/pdf",
};

runServer(build);

async function runServer(callback: () => Promise<void> | void) {
    const server = http.createServer((req, res) => {
        // You can also set using the following method
        res.setHeader(
            "Access-Control-Allow-Origin",
            "req.header.origin",
        ); /* @dev First, read about security */
        if (!req.url) return;
        // Determine MIME type from file extension
        const ext = path
            .extname(req.url)
            .toLowerCase() as keyof typeof mimeTypes;
        const contentType = mimeTypes[ext] || "application/octet-stream";

        const fallbacks = [out_path, scripts_path, working_path];
        for (const fallback of fallbacks) {
            const file_path = path.join(fallback, req.url);
            if (!existsSync(file_path)) continue;
            res.setHeader("Content-Type", contentType);
            res.setHeader("X-Content-Type-Options", "nosniff"); // Prevents MIME sniffing attacks
            res.writeHead(200);
            const stream = createReadStream(file_path);
            stream.pipe(res);
            return;
        }
        res.writeHead(404, { "X-Content-Type-Options": "nosniff" });
        res.end("File not found");
    });

    server.listen(port, host, () => {
        console.log(
            `Serving static files from ${process.cwd()} on http://${host}:${port.toString()}`,
        );
    });
    await callback();
    server.close();
}

async function build() {
    const browser = await firefox.launch(); // Or 'firefox' or 'webkit'.
    const context = await browser.newContext();
    const page = await context.newPage();
    const url_stack = ["index.html"];
    while (url_stack.length > 0) {
        url_stack.push(...(await processUrl(url_stack.pop() as string, page)));
    }
    await context.close();
    await browser.close();
}

async function processUrl(url: string, page: Page): Promise<Iterable<string>> {
    url = url.endsWith(path.sep) ? url + "index.html" : url;
    if (existsSync(path.join(out_path, url))) {
        return [];
    }
    if (url.endsWith(".html") && existsSync(path.join(working_path, url)))
        return await render_url(url, page);
    const file_path = existsSync(path.join(scripts_path, url))
        ? path.join(scripts_path, url)
        : path.join(working_path, url);
    if (!existsSync(file_path)) return [];
    await readFile(file_path).then(async (file) => {
        await mkdir(path.join(out_path, ...url.split(path.sep).slice(0, -1)), {
            recursive: true,
        });
        console.log("Copying", url);
        await writeFile(path.join(out_path, url), file);
    });
    return [];
}

async function render_url(url: string, page: Page): Promise<Iterable<string>> {
    console.log("Writing", url);
    await readFile(path.join(working_path, url)).then(async (file) => {
        await mkdir(path.join(out_path, ...url.split(path.sep).slice(0, -1)), {
            recursive: true,
        });
        return writeFile(path.join(out_path, url), file);
    });
    await page.goto(`http://localhost:8000/${url}`);
    // Wait for your initial dynamic JavaScript code to finish... typically this involves scripts being fetched and then those scripts doing something like fetching some data and rendering it. You would expect right after fetch the render would happen, so networkidle is usually enough
    await page.waitForLoadState("networkidle");
    const console_messages = await page.consoleMessages({
        filter: "since-navigation",
    });
    if (console_messages?.length ?? 0 > 0)
        console_messages.forEach((console_message) =>
            console.log(console_message),
        );

    // Get your html after the JavaScript has done some things
    const [new_urls, html] = await page.evaluate(() => {
        // Runs inside the actual page
        let new_urls = Array.from(document.getElementsByTagName("script"))
            .map((element) => element.getAttribute("src"))
            .concat(
                Array.from(document.getElementsByTagName("img")).map(
                    (element) => element.getAttribute("src"),
                ),
            )
            .concat(
                Array.from(document.getElementsByTagName("link")).map(
                    (element) => element.getAttribute("href"),
                ),
            )
            .concat(
                Array.from(document.getElementsByTagName("a")).map((element) =>
                    element.getAttribute("href"),
                ),
            );

        new_urls = new_urls.filter((url) => url && !url.startsWith("http"));

        return [new_urls, document.documentElement.innerHTML];
    });
    // Use your html here
    await writeFile(path.join(out_path, url), html);
    return new_urls
        .filter((url) => typeof url == "string")
        .map((url) => (url.endsWith("/") ? url + "index.html" : url));
}

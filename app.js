// Test Script
// Use this script to test the integration and debug any problems.
import fetch from "node-fetch";

// Test Data: This mimics the way Zapier passes variables
const inputData = { url: "https://github.com/thedevs-network/kutt" };
var output;

// This anonymous function mimics the Zapier environment.
(async function () {
  const baseDomain = "https://kutt.it";
  const apiKey = "";
  // Optional Param if you are using Kutt with multiple domains
  const domain = "";

  const linksURL = `${baseDomain}/api/v2/links`;
  const data = { domain: domain, target: inputData.url };
  var shortURL;

  function getErrorMessage(message) {
    if (message === "reCAPTCHA is not valid. Try again.") {
      return "API key is invalid.";
    }
    return message;
  }

  try {
    const response = await fetch(linksURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify(data),
    });
    const body = await response.json();
    output = { shortURL: body.link || getErrorMessage(body.error) };
  } catch (error) {
    console.log(error.message);
  }

  console.log(output);
})();

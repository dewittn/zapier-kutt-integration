# Zapier Kutt Integration

Allows you to use [Kutt.it](https://github.com/TheDevs-Network/kutt) as a URL shortener with [Zapier](https://zapier.com/). Requires the [Code by Zapier](https://zapier.com/apps/code/integrations) action.

Read the [Zapier Documentation](https://zapier.com/help/create/code-webhooks/use-javascript-code-in-zaps) for more info about this action.

## Installation

1. Add the [Code by Zapier](https://zapier.com/apps/code/integrations) action to your workflow.
2. Setup the action with the input Data listed below.
3. Use the resulting `shortLink` variable in your workflow.

`targetURL`: The incoming URL you want to shorten
`hostURL`: The url of your hosted Kutt.it installation.
`apiKey`: The apiKey generated in the settings or your Kutt.it installation.
`shortLinkDomain`: Optional argument if you are using Kutt.it with multiple domains.

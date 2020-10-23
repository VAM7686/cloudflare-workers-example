# Using Cloudflare Workers

## What is it?

Cloudflare Workers lets developers deploy serverless JavaScript applications on Cloudflare's global edge network, where they are seamlessly scalable and closer to end users. Based on the Service Workers API, Workers receive events for every HTTP(S) request made to an application.

In this example, I deployed a Cloudflare Workers project in order to build a linktree-style website. This project will respond to two kinds of requests, one to generate a JSON API (defined below), and second, to serve an HTML page.

## Features

### JSON API
I created an array of links and set up a request handler to respond to the path `/links` which returns the array itself as the root of the JSON response.

### HTML page
When the path requested _is not_ `/links`, your application should render a static HTML page, by doing the following steps:

1. Retrieves a static HTML page. In this case `https://static-links-page.signalnerve.workers.dev`.
2. Uses the links from your previously deployed JSON response
3. Uses HTMLRewriter to add these links to the static HTML page.
4. Uses HTMLRewriter to modify other portions of the page of my choosing, e.g., customizing the background.
4. Return the transformed HTML page from the Worker.

HTML page:
[https://my-worker.mhatre.workers.dev](https://my-worker.mhatre.workers.dev)

JSON API:
[https://my-worker.mhatre.workers.dev/links](https://my-worker.mhatre.workers.dev/links)

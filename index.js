var links = []
links.push({ "name": "\"A Rabona To Make An Onion Cry\"", "url": "https://www.youtube.com/watch?v=UtKtd3__8c4&t=45" });
links.push({ "name": "The HMS Porcupine", "url": "https://www.amusingplanet.com/2020/01/hms-porcupine-warship-that-became-two.html" });
links.push({ "name": "An Annoying Minus Sign", "url": "https://arxiv.org/pdf/1002.0555.pdf" });

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  const json = JSON.stringify(links);

  if (url.pathname == "/links") {
    return new Response(json, {
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    })
  }
  else {
    const init = {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    }
    const url1 = "https://static-links-page.signalnerve.workers.dev"
    const response = await fetch(url1, init)
    const results = await gatherResponse(response)

    // return new HTMLRewriter()
    // .on("img", new ElementHandler())
    // .transform(await fetch(url1, init))
    return new HTMLRewriter()
      .on("div#links", new LinksTransformer())
      .on("div#profile", new Profile())
      .on("img#avatar", new Avatar())
      .on("h1#name", new Name())
      .on("div#social", new Social())
      .on("title", new changeTitle())
      .on("body", new Background())
      .transform(await fetch(url1, init));
    // return new HTMLRewriter().on("div", new ElementHandler()).transform(res)
    // return new Response(results, init)
  }
}

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json())
  }
  else if (contentType.includes("application/text")) {
    return await response.text()
  }
  else if (contentType.includes("text/html")) {
    return await response.text()
  }
  else {
    return await response.text()
  }
}


class LinksTransformer {
  constructor(links) {
    this.links = links
  }

  async element(element) {
    links.forEach(link => {
      element.append(
        `<a href="${link.url}">${link.name}</a>`, 
        { html: true }
      );
    })
  }
}

class changeTitle {
  async element(element) {
    element.setInnerContent("Vivek Mhatre");
  }
}

class Name {
  async element(element) {
    element.setInnerContent("Vivek Mhatre");
  }
}

class Avatar {
  async element(element) {
    element.setAttribute("src", "https://vam7686.github.io/assets/images/about/profilePicCrop.jpg");
  }
}

class Profile {
  async element(element) {
    element.removeAttribute('style');
  }
}

class Social {
  async element(element) {
    element.removeAttribute('style');
    element.append("<a href=\"https://linkedin.com/in/vmhatre3/\"><img src=\"https://simpleicons.org/icons/linkedin.svg\"></a>", { html: true })
    element.append("<a href=\"https://github.com/VAM7686/\"><img src=\"https://simpleicons.org/icons/github.svg\"></a>", { html: true })
    element.append("<a href=\"https://www.youtube.com/channel/UCefJss0nDy7FFK5MOf8D6OA/videos\"><img src=\"https://simpleicons.org/icons/youtube.svg\"></a>", { html: true })
  }
}

class Background {
  async element(element) {
    element.setAttribute("class", "bg-orange-600");
  }
}


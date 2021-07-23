async function handleRequest(request) {
  const userAgent = request.headers.get("user-agent");
  if (userAgent && userAgent.includes("Discord")) {
    const response = await fetch(request);
    if (response.status == 200) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.startsWith("image/")) {
        const url = new URL(request.url);
        const title = "ShareX";
        const description = url.pathname.substr(url.pathname.lastIndexOf("/") + 1);
        const color = "#00aff4";
        return new Response(`<html>
<head>
  <title>${title}</title>
  <meta charset="utf-8">
  <meta name="robots" content="noindex">
  <meta name="theme-color" content="${color}">
  <meta name="description" content="${description}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${url.toString()}">
  <meta property="twitter:card" content="summary_large_image">
</head>
<body>
  <img src="${url.toString()}">
</body>
</html>`, {
          headers: {
            "content-type": "text/html"
          }
        });
      }
    }
    return response;
  }
  return fetch(request);
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});
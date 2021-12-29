async function handleRequest(request) {
  const userAgent = request.headers.get("user-agent");
  if (userAgent && userAgent.includes("Discord")) {
    const response = await fetch(request);
    if (response.status == 200) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.startsWith("image/")) {
        const url = new URL(request.url);
        const filename = decodeURIComponent(url.pathname.substr(url.pathname.lastIndexOf("/") + 1));
        const title = "ShareX";
        const description = filename;
        const color = "#00aff4";
        const username = "Your Username";
        return new Response(`<html>
<head>
  <title>${title}</title>
  <meta charset="utf-8">
  <meta property="og:site_name" content="${username}">
  <meta name="robots" content="noindex">
  <meta name="theme-color" content="${color}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${url.toString()}">
  <meta property="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${url.toString()}">
</head>
<body>
  <img src="${url.toString()}">
</body>
</html>`, {
          headers: {
            "content-type": "text/html; charset=UTF-8"
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

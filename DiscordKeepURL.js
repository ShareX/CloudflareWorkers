async function handleRequest(request) {
  const userAgent = request.headers.get("user-agent");
  if (userAgent && userAgent.includes("Discord")) {
    const response = await fetch(request);
    if (response.status == 200) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.startsWith("image/")) {
        return new Response(`<html>
<head>
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:image" content="${request.url}">
</head>
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
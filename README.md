## Using Cloudflare Workers for Discord embed support

Requirements: Your own image host, on a domain that you control via [Cloudflare](https://www.cloudflare.com).

Limitations: 100,000 requests per day (where the embed works).

1. Create a Cloudflare Worker: https://dash.cloudflare.com/sign-up/workers
2. Replace the script inside the worker with your desired script from this repo ([DiscordEmbed.js](DiscordEmbed.js) in this case).
3. Press "Save and Deploy".
4. Return to your dashboard, press "Workers", and then press "Add route".
5. Set the route to be where your images are hosted, for example: `i.example.com/*`.
6. Make sure to click "Request limit failure mode" and change it to "Fail open". This will allow your images to show, even if you exceed 100,000 requests.
7. Save & try it out.

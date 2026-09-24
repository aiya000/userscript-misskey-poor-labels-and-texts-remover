# userscript-misskey-poor-labels-and-texts-remover

A userscript that hides the following from Misskey.
It is made for [Hermit](https://hermit.chimbori.com/features/userscripts), and also works with Tampermonkey, Violentmonkey, and similar userscript managers.

- The "bot" label on notes
- The following and follower counts on user pages
- The "Connection to server has been lost" panel (with its Reload / Do nothing buttons)

## Install (Hermit)

1. Download [`misskey-poor-labels-and-texts-remover.user.js`](./misskey-poor-labels-and-texts-remover.user.js), or copy its contents
2. In Hermit, open your Misskey Lite App, go to Settings → Userscripts, then add the script and turn it on

The script runs only on pages that have `<meta name="application-name" content="Misskey">`.

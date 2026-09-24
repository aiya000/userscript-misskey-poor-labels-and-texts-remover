# userscript-misskey-poor-labels-and-texts-remover

Misskeyの以下の表示を消すuserscriptです（[Hermit](https://hermit.chimbori.com/features/userscripts)向けですが、Tampermonkey/Violentmonkeyなどでも動きます）

- ノートに付く「bot」ラベル
- ユーザーページの「フォロー」「フォロワー」の数
- 「サーバーから切断されました」パネル（リロード / なにもしない）

## インストール（Hermit）

1. [`misskey-poor-labels-and-texts-remover.user.js`](./misskey-poor-labels-and-texts-remover.user.js) をダウンロード
2. HermitでMisskeyのLite Appを開き、設定 → Userscripts からこのファイルを追加して有効化

`<meta name="application-name" content="Misskey">` があるページでのみ動作します

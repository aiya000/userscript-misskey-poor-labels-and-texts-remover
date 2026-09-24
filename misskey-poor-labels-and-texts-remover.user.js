// ==UserScript==
// @name         Misskey poor labels and texts remover
// @namespace    https://github.com/aiya000/userscript-misskey-poor-labels-and-texts-remover
// @version      1.0.0
// @description  Misskeyの「bot」ラベル、プロフィールのフォロー数・フォロワー数、「サーバーから切断されました」パネルを非表示にします
// @author       aiya000
// @match        *://*/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  // Misskey以外のページでは何もしない
  const isMisskey = () =>
    document.querySelector('meta[name="application-name"][content="Misskey"]') !== null ||
    document.getElementById('misskey_app') !== null;

  const HIDDEN_ATTR = 'data-poor-label-removed';

  const hide = (el) => {
    if (el && !el.hasAttribute(HIDDEN_ATTR)) {
      el.setAttribute(HIDDEN_ATTR, '');
    }
  };

  // ノートヘッダーの「bot」ラベル
  // MkNoteHeader.vue:   <header> ... <div class="isBot">bot</div>
  // MkNoteDetailed.vue: <header> ... <span class="isBot">bot</span>
  const hideBotLabels = (root) => {
    root.querySelectorAll('header div, header span').forEach((el) => {
      if (el.childElementCount === 0 && el.textContent.trim() === 'bot' && el.closest('a') === null) {
        hide(el);
      }
    });
  };

  // ユーザーページのフォロー数・フォロワー数
  // pages/user/home.vue: <div class="status"><a href=".../following">...</a><a href=".../followers">...</a></div>
  const hideFollowCounts = (root) => {
    root.querySelectorAll('.status > a[href$="/following"], .status > a[href$="/followers"]').forEach(hide);
  };

  // 「サーバーから切断されました」パネル
  // ui/_common_/stream-indicator.vue: <div class="_panel _shadow"><div><i class="ti ti-alert-triangle"></i> ...</div><div class="_buttons">...</div></div>
  const hideDisconnectedIndicator = (root) => {
    root.querySelectorAll('._panel._shadow').forEach((el) => {
      if (el.querySelector(':scope > div > i.ti-alert-triangle') && el.querySelector(':scope > ._buttons')) {
        hide(el);
      }
    });
  };

  const apply = () => {
    hideBotLabels(document);
    hideFollowCounts(document);
    hideDisconnectedIndicator(document);
  };

  const start = () => {
    if (!isMisskey()) {
      return;
    }

    // Vueの管理下にある要素を削除すると再描画で壊れることがあるので、削除ではなくCSSで隠す
    const style = document.createElement('style');
    style.textContent = `[${HIDDEN_ATTR}] { display: none !important; }`;
    document.head.appendChild(style);

    apply();

    let scheduled = false;
    new MutationObserver(() => {
      if (scheduled) {
        return;
      }
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        apply();
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();

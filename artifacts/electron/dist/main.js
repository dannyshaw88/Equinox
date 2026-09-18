"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/main.ts
var import_electron2 = require("electron");
var import_electron_updater = require("electron-updater");
var import_child_process = require("child_process");
var import_util = require("util");
var import_http2 = __toESM(require("http"));
var import_net = __toESM(require("net"));
var import_fs2 = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));
var import_os = __toESM(require("os"));

// src/ebManager.ts
var import_electron = require("electron");
var import_http = __toESM(require("http"));
var import_https = __toESM(require("https"));
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_crypto = require("crypto");
var _ebLogPath = "";
function setEbLogPath(p) {
  _ebLogPath = p;
}
function _ebCrashLog(profileId, msg) {
  const line = `[${(/* @__PURE__ */ new Date()).toISOString()}] [EB:${profileId}] ${msg}
`;
  try {
    process.stderr.write(line);
  } catch {
  }
  if (_ebLogPath) {
    try {
      import_fs.default.appendFileSync(_ebLogPath, line);
    } catch {
    }
  }
}
function buildNativeToolbarHtml(isGhost) {
  const styles = `*{box-sizing:border-box;margin:0;padding:0}body{height:92px;max-height:92px;overflow:hidden;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;flex-direction:column;font-family:-apple-system,"Segoe UI",sans-serif;-webkit-user-select:none;user-select:none}#navbar{height:58px;display:flex;align-items:center;gap:4px;padding:0 8px;flex-shrink:0;overflow:hidden}button{height:30px;min-width:30px;padding:0 8px;background:transparent;border:1px solid #d1d5db;color:#6b7280;border-radius:6px;cursor:pointer;font-size:12px;font-family:inherit;display:flex;align-items:center;gap:3px;white-space:nowrap;flex-shrink:0}button:hover{background:#f3f4f6;color:#374151}button:disabled{opacity:.5;cursor:default}.sep{width:1px;height:18px;background:#e2e8f0;margin:0 2px;flex-shrink:0}#url{flex:1;min-width:0;height:30px;padding:0 8px;background:#f9fafb;border:1px solid #d1d5db;border-radius:6px;color:#111827;font-size:12px;font-family:monospace;outline:none;-webkit-user-select:text;user-select:text}#url:focus{background:#fff;border-color:#3b82f6}#url::selection{background:#bfdbfe;color:#111827}#timer{font-size:11px;color:#9ca3af;white-space:nowrap;min-width:34px;text-align:right;font-variant-numeric:tabular-nums;padding-right:2px}#tabbar{height:34px;background:#f8fafc;border-top:1px solid #e2e8f0;display:flex;align-items:center;gap:2px;padding:0 6px;overflow-x:auto;overflow-y:hidden;flex-shrink:0}#tabbar::-webkit-scrollbar{height:3px}#tabbar::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:3px}.tab{height:26px;max-width:160px;min-width:56px;display:flex;align-items:center;gap:3px;padding:0 8px;border-radius:4px;cursor:pointer;font-size:11px;color:#9ca3af;border:1px solid transparent;flex-shrink:0;overflow:hidden}.tab:hover{background:#f1f5f9;color:#374151}.tab.active{background:#fff;border-color:#d1d5db;color:#374151}.tab-title{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}.tab-x{border:none!important;min-width:0!important;height:14px!important;width:14px!important;padding:0!important;font-size:13px!important;line-height:1;color:#9ca3af;flex-shrink:0;background:none!important}.tab-x:hover{color:#374151!important}.newtab{height:22px;min-width:22px;max-width:22px;padding:0!important;font-size:13px;border-style:dashed!important;color:#9ca3af;flex-shrink:0}`;
  const ghostNavHtml = `<button title="Back" onclick="cmd('back')">&#9664;</button><button title="Forward" onclick="cmd('forward')">&#9654;</button><button title="Reload" onclick="cmd('reload')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg></button><button title="Instagram Home" onclick="cmd('navigate',{url:'https://www.instagram.com/'})"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></button><span class="sep"></span><input id="url" type="text" spellcheck="false"><span class="sep"></span><button title="Run in-app leak test \u2014 checks IP, WebRTC, WebDriver, Canvas, Audio, WebGL and more" onclick="cmd('leak-check')">&#128737; Leak Check</button><span class="sep"></span><span id="timer">0:00</span>`;
  const navHtml = `<button title="Back" onclick="cmd('back')">&#9664;</button><button title="Forward" onclick="cmd('forward')">&#9654;</button><button title="Reload" onclick="cmd('reload')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg></button><button title="Instagram Home" onclick="cmd('navigate',{url:'https://www.instagram.com/'})"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></button><span class="sep"></span><input id="url" type="text" spellcheck="false"><span class="sep"></span><button id="lbtn" title="Fill login fields and submit" onclick="doLogin()">Login</button><button title="Generate TOTP code" onclick="cmd('totp')">2FA</button><button title="Type phone number" onclick="cmd('phone')">Phone</button><button title="Type email address" onclick="cmd('email-user')">Email</button><button title="Type email password" onclick="cmd('email-pass')">Email Pass</button><button title="Run in-app leak test \u2014 checks IP, WebRTC, WebDriver, Canvas, Audio, WebGL and more" onclick="cmd('leak-check')">&#128737; Leak Check</button><span class="sep"></span><span id="timer">0:00</span>`;
  const script = `function cmd(c,p){return window.__eq&&window.__eq.command(c,p);}
function doLogin(){var b=document.getElementById('lbtn');if(!b)return;b.disabled=true;Promise.resolve(cmd('login')).then(function(){b.disabled=false;}).catch(function(){b.disabled=false;});}
var u=document.getElementById('url');
u.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();var v=u.value.trim();if(v&&v.indexOf('http')!==0)v='https://'+v;cmd('navigate',{url:v});}});
// Select all text on click so the user can immediately type a new URL
// without having to manually Ctrl+A first.  Works even when the toolbar
// BrowserView is not the focused window \u2014 the select() call runs before
// any OS focus change resolves so it always succeeds.
u.addEventListener('click',function(){u.select();});
window.updateUrl=function(url){if(document.activeElement!==u)u.value=url;};
var _s=Date.now();
function tick(){var s=Math.floor((Date.now()-_s)/1000),m=Math.floor(s/60);s=s%60;document.getElementById('timer').textContent=m+':'+(s<10?'0':'')+s;}
tick();setInterval(tick,1000);
var _tabs=[{id:0,title:'Instagram',url:''}],_aid=0;
window.updateTabs=function(tabs,activeId){_tabs=tabs;_aid=activeId;renderTabs();};
function renderTabs(){
  var tb=document.getElementById('tabbar');if(!tb)return;tb.innerHTML='';
  for(var i=0;i<_tabs.length;i++){(function(t){
    var d=document.createElement('div');d.className='tab'+(_aid===t.id?' active':'');
    var sp=document.createElement('span');sp.className='tab-title';sp.textContent=t.title||'New Tab';d.appendChild(sp);
    if(_tabs.length>1){var x=document.createElement('button');x.className='tab-x';x.title='Close tab';x.innerHTML='&times;';x.onclick=function(e){e.stopPropagation();cmd('close-tab',{id:t.id});};d.appendChild(x);}
    d.onclick=function(){cmd('switch-tab',{id:t.id});};
    tb.appendChild(d);
  })(_tabs[i]);}
  var nb=document.createElement('button');nb.className='newtab';nb.title='New tab';nb.textContent='+';nb.onclick=function(){cmd('new-tab');};
  tb.appendChild(nb);
}
renderTabs();
`;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${styles}</style></head><body><div id="navbar">${navHtml}</div><div id="tabbar"></div><script>${script}</script></body></html>`;
}
function buildPageUtilsJs(autoFill, jsToken = "") {
  const afJson = autoFill ? JSON.stringify(autoFill) : "null";
  const t = jsToken;
  return `(function(){
  if(window.__eq${t}_u)return;window.__eq${t}_u=true;

  // \u2500\u2500 Push body below the native 92-px Equinox toolbar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  if(!document.getElementById('__eq${t}_tb')){var _eq_s=document.createElement('style');_eq_s.id='__eq${t}_tb';_eq_s.textContent='body{padding-top:92px!important;box-sizing:border-box!important}';(document.head||document.documentElement).appendChild(_eq_s);}

  // \u2500\u2500 Focus tracking (for toolbar paste buttons) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  window.__eq${t}_li=null;
  document.addEventListener('focusin',function(e){
    var _el=e.target;
    if(_el&&(_el.tagName==='INPUT'||_el.tagName==='TEXTAREA')){window.__eq${t}_li=_el;}
  },true);

  // \u2500\u2500 Credential-aware auto-fill \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // Works on any URL \u2014 handles hard navigations, SPA pushState, and inline
  // login forms. Uses MutationObserver for instant reaction + polling fallback.
  var AF=${afJson};

  if(AF&&!window.__eq${t}_fd){
    var _doFill=function(){
      if(window.__eq${t}_fd)return;
      var uInp=document.querySelector('input[name="username"]');
      var pInp=document.querySelector('input[name="password"]');
      if(!uInp||!pInp)return;
      if(!uInp.getBoundingClientRect().width)return; // hidden / not yet visible
      window.__eq${t}_fd=true;
      if(window.__eq${t}_mo){window.__eq${t}_mo.disconnect();window.__eq${t}_mo=null;}
      if(window.__eq${t}_fp){clearInterval(window.__eq${t}_fp);window.__eq${t}_fp=null;}
      var setter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
      setter.call(uInp,AF.username);
      uInp.dispatchEvent(new Event('input',{bubbles:true}));
      setTimeout(function(){
        setter.call(pInp,AF.password);
        pInp.dispatchEvent(new Event('input',{bubbles:true}));
        // Poll up to 5 s for the submit button to become enabled (React re-renders async)
        var _bp=0;var _bi=setInterval(function(){
          if(++_bp>20){clearInterval(_bi);return;}
          var btn=document.querySelector('button[type="submit"]')
            ||Array.from(document.querySelectorAll('button')).find(function(b){var _bt=(b.innerText||b.textContent||'').trim();return/log[s-]*in|sign[s-]*in/i.test(_bt)&&b.getBoundingClientRect().width>50;});
          if(btn&&!btn.disabled){clearInterval(_bi);btn.click();}
        },250);
      },300);
    };
    // 1. Try immediately (form may already be in the DOM)
    _doFill();
    // 2. MutationObserver \u2014 fires instantly whenever DOM changes
    if(!window.__eq${t}_fd&&!window.__eq${t}_mo){
      window.__eq${t}_mo=new MutationObserver(function(){_doFill();});
      window.__eq${t}_mo.observe(document.documentElement,{childList:true,subtree:true});
      setTimeout(function(){if(window.__eq${t}_mo){window.__eq${t}_mo.disconnect();window.__eq${t}_mo=null;}},120000);
    }
    // 3. Polling fallback every 800 ms (belt-and-suspenders)
    if(!window.__eq${t}_fd&&!window.__eq${t}_fp){
      window.__eq${t}_fp=setInterval(function(){
        if(window.__eq${t}_fd){clearInterval(window.__eq${t}_fp);window.__eq${t}_fp=null;return;}
        _doFill();
      },800);
      setTimeout(function(){if(window.__eq${t}_fp){clearInterval(window.__eq${t}_fp);window.__eq${t}_fp=null;}},120000);
    }
  }

  // \u2500\u2500 Cookie consent banner post-dismiss navigation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // The actual CLICK on the cookie button is done from the main process via
  // sendInputEvent (isTrusted=true, required for Instagram's React handlers).
  // This in-page interval only watches for the banner to disappear, then
  // navigates to the login page if needed (one time).
  if(!window.__eq${t}_ct){var _cks${t}=false;window.__eq${t}_ct=setInterval(function(){
    var __ACCEPT=['allow all cookies','accept all cookies','allow all','accept all','allow essential and optional cookies','accept cookies','allow cookies','alle cookies akzeptieren','accepter tout','aceptar todo','accetta tutto','till\xE5t alla','alle accepteren'];
    function _isCookieAcceptBtn(b){
      if(!b||!b.getBoundingClientRect||b.getBoundingClientRect().width<=0)return false;
      var _bt=(b.innerText||b.textContent||'').trim().toLowerCase();
      return __ACCEPT.indexOf(_bt)!==-1;
    }
    var btn=document.querySelector('[data-cookiebanner="accept_button"]')||document.querySelector('[data-testid="cookie-policy-banner-accept"]');
    if(!btn){
      var container=document.querySelector('[data-cookiebanner]')||document.querySelector('[class*="CookieBanner"],[class*="cookie-banner"],[id*="cookie"]');
      if(container){btn=Array.from(container.querySelectorAll('button,[role="button"],a')).find(_isCookieAcceptBtn)||null;}
    }
    if(!btn){btn=Array.from(document.querySelectorAll('button,[role="button"],a')).find(_isCookieAcceptBtn)||null;}
    if(btn){
      _cks${t}=true;
      // Do NOT click from here \u2014 untrusted JS events are ignored by Instagram's
      // React app. The main-process sendInputEvent timer handles the click.
    }else if(_cks${t}){
      // Banner was visible and is now gone (main process clicked it) \u2014 navigate to login.
      clearInterval(window.__eq${t}_ct);window.__eq${t}_ct=null;
      setTimeout(function(){
        if(AF&&window.__eq${t}_fd)return;
        var LOGIN_RE=/^logs*in$/i;
        var loginEl=Array.from(document.querySelectorAll('a[href*="accounts/login"],a[href*="/login/"]')).find(function(el){var r=el.getBoundingClientRect();return r.width>0&&r.height>0;});
        if(!loginEl){loginEl=Array.from(document.querySelectorAll('a,button,[role="button"]')).find(function(el){var _et=(el.innerText||el.textContent||'').trim();return LOGIN_RE.test(_et)&&el.getBoundingClientRect().width>0;});}
        if(loginEl){
          var r2=loginEl.getBoundingClientRect();
          window.__eq${t}_pl={x:Math.round(r2.left+r2.width/2),y:Math.round(r2.top+r2.height/2)};
          loginEl.click();
        }
      },800);
    }
  },500);}
})();`;
}
var _serverPort = 0;
var _cookiesDir = "";
var _iconPath = "";
function _ipcLog(msg) {
  console.log(msg);
  if (!_serverPort) return;
  fetch(`http://127.0.0.1:${_serverPort}/api/ipc-log`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  }).catch(() => {
  });
}
var _sfInProgress = /* @__PURE__ */ new Set();
var _ghostSignupAbortTokens = /* @__PURE__ */ new Map();
var _silentVerifyResults = /* @__PURE__ */ new Map();
var ebMap = /* @__PURE__ */ new Map();
var _headerCaptures = /* @__PURE__ */ new Map();
var HEADER_CAPTURE_LIMIT = 25;
function _recordHeaderCapture(profileId, url, method, headers) {
  try {
    const host = new URL(url).hostname;
    if (!/(^|\.)instagram\.com$/.test(host) && !/(^|\.)facebook\.com$/.test(host)) return;
  } catch {
    return;
  }
  const list = _headerCaptures.get(profileId) ?? [];
  list.push({ url, method, headers, capturedAt: (/* @__PURE__ */ new Date()).toISOString() });
  while (list.length > HEADER_CAPTURE_LIMIT) list.shift();
  _headerCaptures.set(profileId, list);
}
var _headerCaptureWired = /* @__PURE__ */ new WeakSet();
function wireHeaderCapture(wc, profileId) {
  if (_headerCaptureWired.has(wc)) return;
  _headerCaptureWired.add(wc);
  try {
    wc.debugger.sendCommand("Network.enable").catch(() => {
    });
  } catch {
  }
  const onMessage = (_event, method, params) => {
    if (method !== "Network.requestWillBeSentExtraInfo") return;
    const pending = _pendingReqMeta.get(params.requestId);
    if (!pending) return;
    _recordHeaderCapture(profileId, pending.url, pending.method, params.headers ?? {});
    _pendingReqMeta.delete(params.requestId);
  };
  const _pendingReqMeta = /* @__PURE__ */ new Map();
  const onMeta = (_event, method, params) => {
    if (method !== "Network.requestWillBeSent") return;
    _pendingReqMeta.set(params.requestId, { url: params.request?.url ?? "", method: params.request?.method ?? "GET" });
    if (_pendingReqMeta.size > 200) {
      const firstKey = _pendingReqMeta.keys().next().value;
      if (firstKey) _pendingReqMeta.delete(firstKey);
    }
  };
  wc.debugger.on("message", onMeta);
  wc.debugger.on("message", onMessage);
}
var _tzCache = /* @__PURE__ */ new Map();
var _ebIpAudits = /* @__PURE__ */ new Map();
function _directHttpsGet(url, timeoutMs = 5e3) {
  return new Promise((resolve) => {
    const req = import_https.default.get(url, { timeout: timeoutMs }, (res) => {
      let body = "";
      res.on("data", (d) => {
        body += d.toString();
      });
      res.on("end", () => resolve(body));
    });
    req.on("error", () => resolve(""));
    req.on("timeout", () => {
      req.destroy();
      resolve("");
    });
  });
}
function ebPartition(pid) {
  return ebMap.get(pid)?.partition ?? `persist:eb-${pid}`;
}
function buildProxyConfig(proxy) {
  const creds = proxy.user ? `${encodeURIComponent(proxy.user)}:${encodeURIComponent(proxy.pass ?? "")}@` : "";
  if (proxy.type === "socks5") {
    return {
      mode: "fixed_servers",
      proxyRules: `socks5://${creds}${proxy.host}:${proxy.port}`,
      proxyBypassRules: "127.0.0.1;[::1];localhost"
    };
  }
  return {
    mode: "fixed_servers",
    proxyRules: `http://${proxy.host}:${proxy.port}`,
    proxyBypassRules: "127.0.0.1;[::1];localhost"
  };
}
var CHROME_BUILD_INFO = {
  "124": { full: "124.0.6367.82", grease: "Not/A)Brand", greaseVer: "8" },
  "125": { full: "125.0.6422.165", grease: "Not/A)Brand", greaseVer: "8" },
  "126": { full: "126.0.6478.202", grease: "Not/A)Brand", greaseVer: "8" },
  "127": { full: "127.0.6533.119", grease: "Not/A)Brand", greaseVer: "8" },
  "128": { full: "128.0.6613.137", grease: " Not A;Brand", greaseVer: "8" },
  "129": { full: "129.0.6668.103", grease: " Not A;Brand", greaseVer: "8" },
  "130": { full: "130.0.6723.107", grease: " Not A;Brand", greaseVer: "8" },
  "131": { full: "131.0.6778.260", grease: " Not A;Brand", greaseVer: "8" },
  "132": { full: "132.0.6834.163", grease: " Not A;Brand", greaseVer: "8" },
  "133": { full: "133.0.6943.137", grease: " Not A;Brand", greaseVer: "8" },
  "134": { full: "134.0.6998.135", grease: " Not A;Brand", greaseVer: "8" },
  "135": { full: "135.0.7049.114", grease: " Not A;Brand", greaseVer: "8" },
  "136": { full: "136.0.7103.125", grease: " Not;A Brand", greaseVer: "8" },
  "137": { full: "137.0.7151.55", grease: " Not;A Brand", greaseVer: "8" },
  "138": { full: "138.0.7204.101", grease: " Not;A Brand", greaseVer: "8" },
  "139": { full: "139.0.7258.66", grease: " Not;A Brand", greaseVer: "8" },
  "140": { full: "140.0.7312.45", grease: " Not;A Brand", greaseVer: "8" }
};
var CURRENT_CHROME_MAJOR = "140";
function getChromeBuildInfo(majorVersion) {
  return CHROME_BUILD_INFO[majorVersion] ?? CHROME_BUILD_INFO[CURRENT_CHROME_MAJOR];
}
var _GREASE_BRANDS = [
  " Not A;Brand",
  // 0 — Chrome 128-135 (confirmed)
  " Not;A Brand",
  // 1 — Chrome 136-143 (confirmed)
  "Not A)Brand",
  // 2 — Chrome 144-151 (from Chromium source)
  "Not)A;Brand",
  // 3 — Chrome 152-159 (from Chromium source)
  "Not;A)Brand",
  // 4 — Chrome 160-167 (from Chromium source)
  "Not-A(Brand",
  // 5 — Chrome 168-175 (from Chromium source)
  "Not A(Brand",
  // 6 — Chrome 176-183 (from Chromium source)
  "Not/A)Brand"
  // 7 — Chrome 120-127 (confirmed)
];
function _inferGrease(major) {
  const idx = Math.floor(major / 8) % 8;
  return { grease: _GREASE_BRANDS[idx], greaseVer: "8" };
}
var _chromeVersionLastFetch = 0;
var _CHROME_VERSION_CACHE_TTL = 24 * 60 * 60 * 1e3;
var _chromeVersionInFlight = null;
function refreshChromeVersion() {
  const now = Date.now();
  if (now - _chromeVersionLastFetch < _CHROME_VERSION_CACHE_TTL) return Promise.resolve();
  if (_chromeVersionInFlight) return _chromeVersionInFlight;
  const url = "https://versionhistory.googleapis.com/v1/chrome/platforms/android/channels/stable/versions?filter=endtime=none&orderBy=version%20desc&pageSize=1";
  _chromeVersionInFlight = new Promise((resolve) => {
    const req = import_https.default.get(url, { timeout: 8e3 }, (res) => {
      let raw = "";
      res.on("data", (chunk) => {
        raw += chunk;
      });
      res.on("end", () => {
        try {
          const json = JSON.parse(raw);
          const ver = json?.versions?.[0]?.version;
          if (ver && /^\d+\.\d+\.\d+\.\d+$/.test(ver)) {
            const major = ver.split(".")[0];
            const majorN = parseInt(major, 10);
            if (!CHROME_BUILD_INFO[major]) {
              CHROME_BUILD_INFO[major] = { full: ver, ..._inferGrease(majorN) };
              console.log(`[chromeVersion] Added Chrome ${major} (${ver}) to build table`);
            }
            if (majorN >= parseInt(CURRENT_CHROME_MAJOR, 10)) {
              if (CURRENT_CHROME_MAJOR !== major) {
                console.log(`[chromeVersion] Updated CURRENT_CHROME_MAJOR: ${CURRENT_CHROME_MAJOR} \u2192 ${major}`);
                CURRENT_CHROME_MAJOR = major;
              }
            }
            _chromeVersionLastFetch = Date.now();
          }
        } catch {
        }
        resolve();
      });
    });
    req.on("error", () => resolve());
    req.on("timeout", () => {
      req.destroy();
      resolve();
    });
  }).finally(() => {
    _chromeVersionInFlight = null;
  });
  return _chromeVersionInFlight;
}
function _strHash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = Math.imul(h, 31) + s.charCodeAt(i) >>> 0;
  return h;
}
function buildDesktopUAMetadata(browserUA) {
  const h = _strHash(browserUA);
  if (browserUA.includes("Macintosh")) {
    const macVersions = ["13.6.7", "14.4.1", "14.6.1", "15.0.1", "15.1.0"];
    const archOptions = ["arm", "x86"];
    return {
      platform: "macOS",
      navigatorPlatform: "MacIntel",
      architecture: archOptions[h % archOptions.length],
      platformVersion: macVersions[h % macVersions.length],
      bitness: "64"
    };
  }
  if (browserUA.includes("Linux") && !browserUA.includes("Android")) {
    return {
      platform: "Linux",
      navigatorPlatform: "Linux x86_64",
      architecture: "x86",
      platformVersion: "",
      bitness: "64"
    };
  }
  const winVersions = ["10.0.0", "13.0.0", "15.0.0", "15.0.0", "19.0.0"];
  return {
    platform: "Windows",
    navigatorPlatform: "Win32",
    architecture: "x86",
    platformVersion: winVersions[h % winVersions.length],
    bitness: "64"
  };
}
var MOBILE_PROFILES = [
  [360, 808, 3],
  [411, 914, 2.625],
  [411, 914, 2.625],
  [360, 780, 3],
  [360, 780, 3],
  [393, 851, 2.75],
  [412, 915, 2.625],
  [412, 900, 2.7],
  [393, 873, 2.75],
  [393, 873, 2.75],
  [393, 868, 2.75],
  [360, 780, 3]
];
function getMobileDeviceProfile(browserUA, apiUA) {
  if (!browserUA) return null;
  const isMob = browserUA.includes("Mobile") || browserUA.includes("Android");
  if (!isMob) return null;
  if (apiUA) {
    const m = apiUA.match(/;\s*(\d+)dpi;\s*(\d+)x(\d+)/);
    if (m) {
      const dpi = +m[1], pW = +m[2], pH = +m[3];
      const dpr = Math.round(dpi / 160 * 1e4) / 1e4;
      return { width: Math.round(pW / dpr), height: Math.round(pH / dpr), dpr };
    }
  }
  let s = 5381;
  for (let i = 0; i < browserUA.length; i++) {
    s = ((s << 5) + s ^ browserUA.charCodeAt(i)) >>> 0;
  }
  if (!s) s = 1;
  s = Math.imul(1664525, s) + 1013904223 >>> 0;
  const idx = Math.floor(s / 4294967296 * MOBILE_PROFILES.length);
  const p = MOBILE_PROFILES[idx] ?? MOBILE_PROFILES[0];
  return { width: p[0], height: p[1], dpr: p[2] };
}
var ELECTRON_LEAK_SUPPRESSOR_JS = `(function () {
  // Names probed by Instagram's login JS to detect Electron/automation.
  var _ELEC = ['require','process','module','exports','_electron','__electron','__eq'];
  for (var _i = 0; _i < _ELEC.length; _i++) {
    var _k = _ELEC[_i];
    // Fast-path: already absent \u2014 nothing to do.
    if (typeof window[_k] === 'undefined') continue;
    // Step 1: attempt direct delete (own configurable property \u2014 the common case
    // for Electron globals that leak despite contextIsolation:true).
    var _deleted = false;
    try { _deleted = (delete window[_k]); } catch (_e) { _deleted = false; }
    if (_deleted && typeof window[_k] === 'undefined') continue;
    // Step 2: delete either failed or the value survived via the prototype chain.
    // Inspect the descriptor so we can choose the right remediation path.
    var _desc;
    try { _desc = Object.getOwnPropertyDescriptor(window, _k); } catch (_e) {}
    if (_desc && !_desc.configurable) {
      // Non-configurable own property \u2014 cannot be deleted or redefined.
      // If it is writable, zero it out so typeof probes return 'undefined'.
      try { if (_desc.writable) { window[_k] = undefined; } } catch (_e) {}
    } else {
      // Configurable (or on the prototype chain) \u2014 shadow it with a value
      // descriptor so both typeof and direct access return undefined.
      try {
        Object.defineProperty(window, _k, {
          value: undefined, writable: true, configurable: true, enumerable: false,
        });
      } catch (_e) {}
    }
  }
  // Scrub ChromeDriver / Selenium artefacts that Electron sometimes injects.
  try {
    Object.keys(window)
      .filter(function (k) {
        return k.indexOf('$cdc_') === 0 || k.indexOf('$chrome_') === 0 ||
               k === '__driver_evaluate' || k === '__webdriver_evaluate' ||
               k === '__selenium_evaluate' || k === '__fxdriver_evaluate';
      })
      .forEach(function (k) { try { delete window[k]; } catch (_e) {} });
  } catch (_e) {}
})();`;
var WEBRTC_BLOCKER_JS = `(function () {
  var R = window.RTCPeerConnection || window.webkitRTCPeerConnection;
  if (!R) return;
  function B() {
    var pc = new R({});
    pc.createOffer  = function () { return Promise.reject(new DOMException('WebRTC disabled', 'NotAllowedError')); };
    pc.createAnswer = function () { return Promise.reject(new DOMException('WebRTC disabled', 'NotAllowedError')); };
    return pc;
  }
  try { B.prototype = R.prototype; } catch {}
  try { B.generateCertificate = R.generateCertificate.bind(R); } catch {}
  try { Object.defineProperty(window, 'RTCPeerConnection',        { get: function () { return B; }, configurable: true }); } catch {}
  try { Object.defineProperty(window, 'webkitRTCPeerConnection',  { get: function () { return B; }, configurable: true }); } catch {}
})();`;
async function armSilentWindowAntiDetection(win2, opts) {
  try {
    const browserUA = opts.browserUA ?? null;
    const apiUA = opts.apiUA ?? null;
    let fp = null;
    try {
      fp = typeof opts.ebFingerprint === "string" ? JSON.parse(opts.ebFingerprint) : opts.ebFingerprint ?? null;
    } catch {
      fp = null;
    }
    const isMobile = !!browserUA && (browserUA.includes("Mobile") || isApiFormatUA(browserUA));
    const chromeMajor = browserUA?.match(/Chrome\/(\d+)/)?.[1] ?? CURRENT_CHROME_MAJOR;
    const buildInfo = getChromeBuildInfo(chromeMajor);
    const fpScript = buildFingerprintScript(isMobile, apiUA, fp, buildInfo.full, buildInfo.grease, buildInfo.greaseVer, null, browserUA);
    try {
      win2.webContents.debugger.attach("1.3");
    } catch {
    }
    await Promise.race([
      (async () => {
        try {
          await win2.webContents.debugger.sendCommand("Page.enable");
          await win2.webContents.debugger.sendCommand("Page.addScriptToEvaluateOnNewDocument", { source: ELECTRON_LEAK_SUPPRESSOR_JS });
          await win2.webContents.debugger.sendCommand("Page.addScriptToEvaluateOnNewDocument", { source: WEBRTC_BLOCKER_JS });
          await win2.webContents.debugger.sendCommand("Page.addScriptToEvaluateOnNewDocument", { source: fpScript });
        } catch {
        }
      })(),
      new Promise((r) => setTimeout(r, 1500))
    ]);
    if (browserUA) {
      try {
        win2.webContents.setUserAgent(browserUA);
      } catch {
      }
      try {
        const desktopMeta = isMobile ? null : buildDesktopUAMetadata(browserUA);
        const mobileAndroidVer = isMobile ? (browserUA.match(/Android\s+([0-9]+)/i)?.[1] ?? "14") + ".0.0" : "";
        const mobileModel = isMobile ? browserUA.match(/Android [0-9]+;\s*([^)]+)\)/)?.[1]?.trim() ?? "" : "";
        await Promise.race([
          win2.webContents.debugger.sendCommand("Emulation.setUserAgentOverride", {
            userAgent: browserUA,
            acceptLanguage: "en-US,en;q=0.9",
            platform: isMobile ? "Linux armv8l" : desktopMeta.navigatorPlatform,
            userAgentMetadata: {
              brands: [
                { brand: buildInfo.grease, version: buildInfo.greaseVer },
                { brand: "Chromium", version: chromeMajor },
                { brand: "Google Chrome", version: chromeMajor }
              ],
              fullVersionList: [
                { brand: buildInfo.grease, version: buildInfo.greaseVer + ".0.0.0" },
                { brand: "Chromium", version: buildInfo.full },
                { brand: "Google Chrome", version: buildInfo.full }
              ],
              fullVersion: buildInfo.full,
              platform: isMobile ? "Android" : desktopMeta.platform,
              platformVersion: isMobile ? mobileAndroidVer : desktopMeta.platformVersion,
              architecture: isMobile ? "arm" : desktopMeta.architecture,
              model: isMobile ? mobileModel : "",
              mobile: isMobile,
              bitness: isMobile ? "64" : desktopMeta.bitness,
              wow64: false
            }
          }),
          new Promise((r) => setTimeout(r, 1500))
        ]);
      } catch {
      }
    }
  } catch (err) {
    console.warn(`[armSilentWindowAntiDetection] failed: ${err?.message ?? err}`);
  }
}
var GHOST_MOUSE_BLOCKER_JS = `(function(){
  var BLOCK=['mousemove','mouseover','mouseout','mouseenter','mouseleave',
             'pointermove','pointerover','pointerout','pointerenter','pointerleave',
             'mousedown','mouseup','dblclick','contextmenu','auxclick'];
  function block(e){ e.stopImmediatePropagation(); }
  BLOCK.forEach(function(t){
    window.addEventListener(t, block, true);
    document.addEventListener(t, block, true);
  });
  // Inject cursor style so the user sees a blocked cursor over the ghost window.
  // Uses DOMContentLoaded if document.head isn't ready yet.
  function _injectCursor(){
    if(document.getElementById('__ghost-cur__')) return;
    var s=document.createElement('style');
    s.id='__ghost-cur__';
    s.textContent='html,body,*,*::before,*::after{cursor:not-allowed!important}';
    (document.head||document.documentElement).appendChild(s);
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',_injectCursor,{once:true});
  } else {
    _injectCursor();
  }
})();`;
var DAILY_LIMIT_DISMISSER_JS = `(function(){
  'use strict';
  function _tryDismiss(){
    var b=document.body;
    if(!b)return;
    // Fast bail \u2014 don't touch the DOM unless the overlay text is present
    var txt=b.innerText||'';
    if(txt.indexOf('daily limit')===-1&&txt.indexOf('Daily limit')===-1)return;

    // Strategy 1 \u2014 button with a close-like aria-label (most reliable)
    var btns=document.querySelectorAll('button,[role="button"]');
    for(var i=0;i<btns.length;i++){
      var lbl=(btns[i].getAttribute('aria-label')||'').toLowerCase().trim();
      if(lbl==='close'||lbl==='dismiss'||lbl==='not now'||lbl==='maybe later'){
        btns[i].click();
        console.log('[daily-limit-dismisser] clicked close via aria-label="'+lbl+'"');
        return;
      }
    }

    // Strategy 2 \u2014 SVG element with aria-label containing "close" or "dismiss"
    var svgs=document.querySelectorAll('svg[aria-label]');
    for(var i=0;i<svgs.length;i++){
      var slbl=(svgs[i].getAttribute('aria-label')||'').toLowerCase();
      if(slbl.indexOf('close')!==-1||slbl.indexOf('dismiss')!==-1){
        var t=svgs[i].closest('button,[role="button"]')||svgs[i];
        t.click();
        console.log('[daily-limit-dismisser] clicked close via SVG aria-label');
        return;
      }
    }

    // Strategy 3 \u2014 find the container holding the overlay text, click its first button
    // Instagram's daily-limit modal typically has only one interactive element (\xD7).
    var roots=document.querySelectorAll('[role="dialog"],[role="alertdialog"],section,article,div');
    for(var i=0;i<roots.length;i++){
      var r=roots[i];
      // Only check elements that directly contain the text (not every div)
      var ownText=(r.childNodes&&Array.from(r.childNodes).map(function(n){return n.textContent||'';}).join(''))||'';
      if(ownText.indexOf('daily limit')===-1&&ownText.indexOf('Daily limit')===-1)continue;
      var rb=r.querySelectorAll('button,[role="button"]');
      if(rb.length>0){
        rb[0].click();
        console.log('[daily-limit-dismisser] clicked first button in overlay container');
        return;
      }
    }

    // Strategy 4 \u2014 any button whose visible text is a close glyph (\xD7, \u2715, \u2716, \u2A2F)
    for(var i=0;i<btns.length;i++){
      var tc=(btns[i].textContent||'').trim();
      if(tc==='\xD7'||tc==='\u2715'||tc==='\u2716'||tc==='\u2A2F'||tc==='\u2297'){
        btns[i].click();
        console.log('[daily-limit-dismisser] clicked \xD7 glyph button');
        return;
      }
    }
  }

  // Run immediately in case modal is already in the DOM when this script executes
  try{_tryDismiss();}catch(_e){}

  // MutationObserver catches the overlay whenever Instagram injects it mid-session
  try{
    var _obs=new MutationObserver(function(){try{_tryDismiss();}catch(_e){}});
    function _start(){
      _obs.observe(document.body||document.documentElement,{childList:true,subtree:true});
    }
    if(document.readyState==='loading'){
      document.addEventListener('DOMContentLoaded',_start,{once:true});
    }else{
      _start();
    }
  }catch(_e){}
})();`;
var GHOST_SIGNUP_FP_PATCH_JS = `(function(){
  var _SW=393,_SH=851,_DPR=2.75;
  // \u2500\u2500 Screen dimensions \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  try{Object.defineProperty(screen,'width',{get:function(){return _SW;},configurable:true,enumerable:true});}catch(e){}
  try{Object.defineProperty(screen,'height',{get:function(){return _SH;},configurable:true,enumerable:true});}catch(e){}
  try{Object.defineProperty(screen,'availWidth',{get:function(){return _SW;},configurable:true,enumerable:true});}catch(e){}
  try{Object.defineProperty(screen,'availHeight',{get:function(){return _SH-56;},configurable:true,enumerable:true});}catch(e){}
  try{Object.defineProperty(screen,'colorDepth',{get:function(){return 24;},configurable:true});}catch(e){}
  try{Object.defineProperty(screen,'pixelDepth',{get:function(){return 24;},configurable:true});}catch(e){}
  try{Object.defineProperty(window,'devicePixelRatio',{get:function(){return _DPR;},configurable:true});}catch(e){}
  try{Object.defineProperty(window,'innerWidth',{get:function(){return _SW;},configurable:true});}catch(e){}
  try{Object.defineProperty(window,'innerHeight',{get:function(){return _SH;},configurable:true});}catch(e){}
  try{Object.defineProperty(window,'outerWidth',{get:function(){return _SW;},configurable:true});}catch(e){}
  try{Object.defineProperty(window,'outerHeight',{get:function(){return _SH;},configurable:true});}catch(e){}
  // \u2500\u2500 navigator: platform + touch (belt-and-suspenders on top of CDP) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  try{Object.defineProperty(navigator,'platform',{get:function(){return 'Linux armv8l';},configurable:true});}catch(e){}
  try{Object.defineProperty(navigator,'maxTouchPoints',{get:function(){return 10;},configurable:true});}catch(e){}
  // \u2500\u2500 navigator.hardwareConcurrency: Pixel 8 has 8 cores (Tensor G3) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // The desktop fp script picks from [4,6,8,8,8,12,16] \u2014 can land on 4, which
  // is wrong for a Pixel 8. Pin to 8 here as the canonical Pixel 8 core count.
  try{Object.defineProperty(navigator,'hardwareConcurrency',{get:function(){return 8;},configurable:true});}catch(e){}
  // \u2500\u2500 navigator.languages: strip HTTP q-weight from JS array \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // Setting acceptLanguage:"en-US,en;q=0.9" in CDP causes Chrome to leak the
  // q-value into navigator.languages \u2192 ["en-US","en;q=0.9"]. Real Android Chrome
  // strips q-values: navigator.languages is always ["en-US","en"].
  try{
    var _rawLangs=Array.from(navigator.languages||[]);
    var _cleanLangs=_rawLangs.map(function(l){return l.split(';')[0].trim();}).filter(Boolean);
    if(_cleanLangs.length===0)_cleanLangs=['en-US','en'];
    Object.defineProperty(navigator,'languages',{get:function(){return _cleanLangs;},configurable:true});
    Object.defineProperty(navigator,'language',{get:function(){return _cleanLangs[0];},configurable:true});
  }catch(e){}
  // \u2500\u2500 navigator.plugins: empty on Android Chrome \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  try{
    var _ep=Object.create(PluginArray.prototype);
    Object.defineProperty(_ep,'length',{get:function(){return 0;},configurable:true});
    Object.defineProperty(navigator,'plugins',{get:function(){return _ep;},configurable:true});
    var _em=Object.create(MimeTypeArray.prototype);
    Object.defineProperty(_em,'length',{get:function(){return 0;},configurable:true});
    Object.defineProperty(navigator,'mimeTypes',{get:function(){return _em;},configurable:true});
    Object.defineProperty(navigator,'pdfViewerEnabled',{get:function(){return false;},configurable:true});
  }catch(e){}
  // \u2500\u2500 navigator.connection: force cellular/4g (not random wifi) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  try{
    var _nc=navigator.connection;
    if(_nc){
      try{Object.defineProperty(_nc,'type',{get:function(){return 'cellular';},configurable:true});}catch(e2){}
      try{Object.defineProperty(_nc,'effectiveType',{get:function(){return '4g';},configurable:true});}catch(e3){}
      // Seed once \u2014 stable between reads on the same page (real NetworkInformation
      // only changes when network conditions change, not on every property access).
      var _mob_dl=35+Math.round(Math.random()*25);
      var _mob_rtt=35+Math.round(Math.random()*30);
      try{Object.defineProperty(_nc,'downlink',{get:function(){return _mob_dl;},configurable:true});}catch(e4){}
      try{Object.defineProperty(_nc,'rtt',{get:function(){return _mob_rtt;},configurable:true});}catch(e5){}
    }
  }catch(e){}
  // \u2500\u2500 DeviceMotionEvent: real phones always have active sensor emissions \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // A phone held normally shows near-zero jitter on x/y and ~-9.81 on y gravity.
  try{
    var _ax=0,_ay=0,_az=0;
    setInterval(function(){
      _ax+=( Math.random()-0.5)*0.025;_ay+=(Math.random()-0.5)*0.025;_az+=(Math.random()-0.5)*0.015;
      _ax=Math.max(-0.4,Math.min(0.4,_ax));_ay=Math.max(-0.4,Math.min(0.4,_ay));_az=Math.max(-0.2,Math.min(0.2,_az));
      try{
        var me=new DeviceMotionEvent('devicemotion');
        Object.defineProperty(me,'acceleration',{get:function(){return{x:_ax,y:_ay,z:_az};}});
        Object.defineProperty(me,'accelerationIncludingGravity',{get:function(){return{x:_ax,y:_ay-9.81,z:_az};}});
        Object.defineProperty(me,'rotationRate',{get:function(){return{alpha:(Math.random()-0.5)*1.2,beta:(Math.random()-0.5)*1.2,gamma:(Math.random()-0.5)*0.6};}});
        Object.defineProperty(me,'interval',{get:function(){return 16.67;}});
        window.dispatchEvent(me);
      }catch(e2){}
      try{
        var oe=new DeviceOrientationEvent('deviceorientation');
        Object.defineProperty(oe,'alpha',{get:function(){return 180+(Math.random()-0.5)*10;}});
        Object.defineProperty(oe,'beta',{get:function(){return (Math.random()-0.5)*5;}});
        Object.defineProperty(oe,'gamma',{get:function(){return (Math.random()-0.5)*3;}});
        Object.defineProperty(oe,'absolute',{get:function(){return false;}});
        window.dispatchEvent(oe);
      }catch(e3){}
    },16+Math.round(Math.random()*5));
  }catch(e){}
  // \u2500\u2500 screen.orientation + window.orientation: must be portrait \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // The fp script's desktop branch (isMobile=false, which ghost browser gets)
  // never touches orientation, so Electron defaults to landscape-primary.
  // setDeviceMetricsOverride sets portraitPrimary at the rendering level but does
  // NOT override the JavaScript screen.orientation object.
  try{
    var _ori={type:'portrait-primary',angle:0,onchange:null,
      lock:function(){return Promise.reject(new DOMException('Not supported','NotSupportedError'));},
      unlock:function(){},addEventListener:function(){},removeEventListener:function(){},dispatchEvent:function(){return true;}};
    Object.defineProperty(screen,'orientation',{get:function(){return _ori;},configurable:true});
  }catch(e){}
  try{Object.defineProperty(window,'orientation',{get:function(){return 0;},configurable:true});}catch(e){}
  // \u2500\u2500 window.visualViewport: match the emulated 393\xD7851 viewport \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  try{if(window.visualViewport){
    Object.defineProperty(window.visualViewport,'width',{get:function(){return 393;},configurable:true});
    Object.defineProperty(window.visualViewport,'height',{get:function(){return 851;},configurable:true});
    Object.defineProperty(window.visualViewport,'scale',{get:function(){return 1;},configurable:true});
  }}catch(e){}
  // \u2500\u2500 window.ontouchstart: must be null (not undefined) on Android Chrome \u2500\u2500\u2500\u2500\u2500
  // undefined = no touch support; null = touch capable, no handler registered.
  // The fp script only sets this in the mobile branch (isMobile=true).
  try{if(window.ontouchstart===undefined)window.ontouchstart=null;}catch(e){}
  // \u2500\u2500 matchMedia: belt-and-suspenders on top of CDP setTouchEmulationEnabled \u2500\u2500
  // CDP touch emulation SHOULD flip (pointer:coarse) at Blink level, but the
  // fp script's mobile branch also patches matchMedia as extra insurance. Since
  // ghost browser runs the desktop branch, we replicate that patch here.
  try{
    var _oMM=window.matchMedia.bind(window);
    window.matchMedia=function(q){
      var _mql={matches:false,media:q,onchange:null,addListener:function(){},removeListener:function(){},addEventListener:function(){},removeEventListener:function(){},dispatchEvent:function(){return true;}};
      if(/(pointer:s*coarse|any-pointer:s*coarse)/.test(q))return Object.assign({},_mql,{matches:true});
      if(/(hover:s*none|any-hover:s*none)/.test(q))return Object.assign({},_mql,{matches:true});
      if(/(pointer:s*fine|any-pointer:s*fine|hover:s*hover|any-hover:s*hover)/.test(q))return _mql;
      try{return _oMM(q);}catch(e2){return _mql;}
    };
  }catch(e){}
  // \u2500\u2500 Remove desktop-only APIs absent from Android Chrome \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // performance.memory is a non-standard Chrome extension not available on Android.
  // Instagram's device classifier checks "typeof performance.memory" to distinguish
  // mobile from desktop. We make it undefined to match the Android Chrome baseline.
  try{if(window.performance&&'memory' in window.performance){
    Object.defineProperty(performance,'memory',{get:function(){return undefined;},configurable:true});
  }}catch(e){}
  // navigator.keyboard (Keyboard Lock / Keyboard Map API) is desktop-only.
  // Present in desktop Chrome, absent in Android Chrome.
  try{if(navigator.keyboard!==undefined){
    Object.defineProperty(navigator,'keyboard',{get:function(){return undefined;},configurable:true});
  }}catch(e){}
})();`;
async function humanMouseClick(wc, tx, ty, sx = Math.round(tx * 0.1 + Math.random() * 20), sy = Math.round(ty * 0.1 + Math.random() * 20)) {
  if (wc.isDestroyed()) return;
  const dx = tx - sx;
  const dy = ty - sy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 2) {
    wc.sendInputEvent({ type: "mouseDown", x: tx, y: ty, button: "left", clickCount: 1 });
    await new Promise((r) => setTimeout(r, 40 + Math.random() * 60));
    if (!wc.isDestroyed()) wc.sendInputEvent({ type: "mouseUp", x: tx, y: ty, button: "left", clickCount: 1 });
    return;
  }
  const steps = Math.max(8, Math.min(40, Math.round(dist / 10)));
  const totalMs = Math.max(80, Math.min(340, Math.round(dist * 0.7 + 50)));
  const perpX = -dy / dist;
  const perpY = dx / dist;
  const jiggle = (dist * 0.18 + 8) * (Math.random() > 0.5 ? 1 : -1);
  const c1x = sx + dx * 0.25 + perpX * jiggle * (0.5 + Math.random() * 0.5);
  const c1y = sy + dy * 0.25 + perpY * jiggle * (0.5 + Math.random() * 0.5);
  const c2x = sx + dx * 0.75 + perpX * jiggle * 0.4 * Math.random();
  const c2y = sy + dy * 0.75 + perpY * jiggle * 0.4 * Math.random();
  for (let i = 1; i <= steps; i++) {
    const raw = i / steps;
    const t = raw * raw * (3 - 2 * raw);
    const u = 1 - t;
    const mx = Math.round(u * u * u * sx + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * tx + (Math.random() - 0.5) * 1.2);
    const my = Math.round(u * u * u * sy + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * ty + (Math.random() - 0.5) * 1.2);
    if (!wc.isDestroyed()) wc.sendInputEvent({ type: "mouseMoved", x: mx, y: my });
    const stepMs = totalMs / steps * (0.7 + Math.random() * 0.6);
    await new Promise((r) => setTimeout(r, stepMs));
  }
  if (wc.isDestroyed()) return;
  wc.sendInputEvent({ type: "mouseDown", x: tx, y: ty, button: "left", clickCount: 1 });
  await new Promise((r) => setTimeout(r, 35 + Math.random() * 55));
  if (!wc.isDestroyed()) wc.sendInputEvent({ type: "mouseUp", x: tx, y: ty, button: "left", clickCount: 1 });
}
async function typeTextCDP(dbg, text, opts) {
  const min = opts?.minDelay ?? 80;
  const max = opts?.maxDelay ?? 280;
  const androidIme = opts?.androidIme ?? false;
  for (const char of text) {
    const code = char.codePointAt(0) ?? 0;
    const vk = code >= 32 && code <= 126 ? code : 0;
    try {
      if (androidIme) {
        await dbg.sendCommand("Input.dispatchKeyEvent", {
          type: "rawKeyDown",
          key: "Unidentified",
          windowsVirtualKeyCode: 229,
          nativeVirtualKeyCode: 229
        });
        await dbg.sendCommand("Input.insertText", { text: char });
        await dbg.sendCommand("Input.dispatchKeyEvent", {
          type: "keyUp",
          key: "Unidentified",
          windowsVirtualKeyCode: 229,
          nativeVirtualKeyCode: 229
        });
      } else {
        await dbg.sendCommand("Input.dispatchKeyEvent", {
          type: "rawKeyDown",
          windowsVirtualKeyCode: vk,
          nativeVirtualKeyCode: vk,
          unmodifiedText: char,
          text: char
        });
        await dbg.sendCommand("Input.insertText", { text: char });
        await dbg.sendCommand("Input.dispatchKeyEvent", {
          type: "keyUp",
          windowsVirtualKeyCode: vk,
          nativeVirtualKeyCode: vk,
          unmodifiedText: char,
          text: char
        });
      }
    } catch {
    }
    const base = min + Math.random() * (max - min);
    const pause = Math.random() < 0.08 ? 400 + Math.random() * 600 : 0;
    await new Promise((r) => setTimeout(r, Math.round(base + pause)));
  }
}
async function cdpTapGesture(dbg, x, y, opts) {
  const dur = opts?.durationMs ?? Math.round(50 + Math.random() * 80);
  try {
    await dbg.sendCommand("Input.synthesizeTapGesture", {
      x,
      y,
      duration: dur,
      tapCount: 1,
      gestureSourceType: "touch"
    });
  } catch {
    try {
      await dbg.sendCommand("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1, modifiers: 0, pointerType: "touch" });
      await new Promise((r) => setTimeout(r, 40 + Math.random() * 50));
      await dbg.sendCommand("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1, modifiers: 0, pointerType: "touch" });
    } catch {
    }
  }
}
function buildFingerprintScript(isMobile, apiUA, fp, chromeFullVer, greaseBrand, greaseBrandVer, timezone, browserUA) {
  const mf = isMobile ? "true" : "false";
  const af = apiUA ? JSON.stringify(apiUA) : "null";
  const _cfv = JSON.stringify(chromeFullVer ?? null);
  const _gbr = JSON.stringify(greaseBrand ?? null);
  const _gbv = JSON.stringify(greaseBrandVer ?? null);
  const _dm = !isMobile && browserUA ? buildDesktopUAMetadata(browserUA) : null;
  const _daLiteral = JSON.stringify(_dm?.architecture ?? null);
  const _dpvLiteral = JSON.stringify(_dm ? _dm.platformVersion || null : null);
  let fpVars;
  if (fp) {
    fpVars = `var _WV=${JSON.stringify(fp.webglVendor)},_WR=${JSON.stringify(fp.webglRenderer)};var _CN=${fp.canvasNoise},_AN=${fp.audioNoise};var _MVID=${JSON.stringify(fp.mediaVideoId)},_MAID=${JSON.stringify(fp.mediaAudioId)},_MSID=${JSON.stringify(fp.mediaSpeakerId)};var _FN=${fp.fontSeed ?? 50},_SP=${fp.speechProfile ?? 0};`;
  } else {
    fpVars = `var _WGPU=[["Qualcomm Technologies, Inc.","Adreno (TM) 750"],["Qualcomm Technologies, Inc.","Adreno (TM) 735"],["Qualcomm Technologies, Inc.","Adreno (TM) 720"],["ARM","Mali-G920 MC10"],["Google","Tensor G3"]];var _gp=_WGPU[Math.floor(_r()*_WGPU.length)],_WV=_gp[0],_WR=_gp[1];var _CN=(Math.floor(_r()*4294967295)||1),_AN=(Math.floor(_r()*4294967295)||1);var _hx=function(n){var s="";for(var i=0;i<n;i++){s+=("0"+Math.floor(_r()*256).toString(16)).slice(-2);}return s;};var _MVID=_hx(16),_MAID=_hx(16),_MSID=_hx(16);var _FN=_rI(1,99),_SP=_rI(0,7);`;
  }
  const _tzLiteral = timezone ? JSON.stringify(timezone) : "null";
  const _ebFpSrc = `(function(){try{
  var _M=${mf},_A=${af},_TZ=${_tzLiteral};
  var _da=${_daLiteral},_dpv=${_dpvLiteral};
  var _ua=navigator.userAgent,_s=5381;
  for(var i=0;i<_ua.length;i++){_s=(((_s<<5)+_s)^_ua.charCodeAt(i))>>>0;}
  _s=_s||1;
  var _r=function(){_s=(Math.imul(1664525,_s)+1013904223)>>>0;return _s/0x100000000;};
  var _rI=function(lo,hi){return lo+Math.round(_r()*(hi-lo));};
  var _rp=function(a){return a[Math.floor(_r()*a.length)];};
  var _PROF=[[360,808,3.0,8,8],[411,914,2.625,8,9],[411,914,2.625,8,9],[360,780,3.0,8,10],
    [360,780,3.0,8,8],[393,851,2.75,8,8],[412,915,2.625,8,8],[412,900,2.70,8,8],
    [393,873,2.75,8,8],[393,873,2.75,8,8],[393,868,2.75,8,8],[360,780,3.0,8,8]];
  var _p=_rp(_PROF),_SW=_p[0],_SH=_p[1],_DPR=_p[2],_MEM=_p[3],_CORES=_p[4];
  if(_A){var _m=_A.match(/;\\s*(\\d+)dpi;\\s*(\\d+)x(\\d+)/);if(_m){
    var _dpi=+_m[1],_pW=+_m[2],_pH=+_m[3];
    _DPR=Math.round(_dpi/160*10000)/10000;_SW=Math.round(_pW/_DPR);_SH=Math.round(_pH/_DPR);_MEM=8;
    _CORES=/;\\s*Pixel 8[^9]/i.test(_A)?9:/exynos2400/i.test(_A)?10:8;}}
  var _BL=Math.round((0.60+_r()*0.39)*100)/100,_BC=_r()>0.35;
  var _BCT=_BC?_rI(0,3600):0,_BDT=_BC?Infinity:_rI(1800,28800);
  var _CT=_rp(["wifi","wifi","wifi","cellular"]),_CDL=Math.round(2+_r()*98),_CRT=_rI(10,150);
  ${fpVars}
  // \u2500\u2500 ChromeDriver / Puppeteer artifact removal \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // Electron injects $cdc_* / $chrome_* properties even with AutomationControlled
  // disabled.  These are the first thing bot-detection scripts check.
  try{var _dK=Object.keys(window).filter(function(k){return k.indexOf('$cdc_')===0||k.indexOf('$chrome_')===0||k==='__driver_evaluate'||k==='__webdriver_evaluate'||k==='__selenium_evaluate'||k==='__fxdriver_evaluate';});_dK.forEach(function(k){try{delete window[k];}catch(_e){}});}catch(_e){}
  // navigator.webdriver \u2014 patch the PROTOTYPE, not the instance.
  // Real Chrome (non-automated) exposes webdriver only on Navigator.prototype \u2192 false.
  // With --disable-blink-features=AutomationControlled the runtime value is already
  // false, but any Object.defineProperty() on the navigator *instance* creates a
  // detectable OWN property: Object.getOwnPropertyDescriptor(navigator,'webdriver')
  // returns undefined on a real browser, but would return our getter if we patched
  // the instance \u2014 a clear automation signal even when the returned value is false.
  // Fix: delete any accidental instance-level descriptor first, then enforce false
  // on the prototype so the own-property check returns undefined (clean).
  try{
    // Remove own-property descriptor if Electron somehow placed one.
    try{delete navigator.webdriver;}catch(_e){}
    // Redefine on the prototype so reads return false with no own-property trace.
    Object.defineProperty(Navigator.prototype,'webdriver',{
      get:function(){return false;},configurable:true,enumerable:true
    });
  }catch(e){}
  // Android Chrome 129 removed Java-plugin support \u2014 javaEnabled() must return false.
  // Electron returns true by default, which is a hard desktop/bot signal.
  // Direct assignment (navigator.javaEnabled = fn) silently fails \u2014 the Navigator
  // instance is sealed/the property is non-writable.  Patching the prototype works.
  try{Object.defineProperty(Navigator.prototype,'javaEnabled',{value:function(){return false;},writable:true,configurable:true});}catch(e){}
  if(_M){
    try{Object.defineProperty(screen,"width",{get:function(){return _SW;}});}catch(e){}
    try{Object.defineProperty(screen,"height",{get:function(){return _SH;}});}catch(e){}
    try{Object.defineProperty(screen,"availWidth",{get:function(){return _SW;}});}catch(e){}
    try{Object.defineProperty(screen,"availHeight",{get:function(){return _SH-30;}});}catch(e){}
    try{Object.defineProperty(screen,"colorDepth",{get:function(){return 24;}});}catch(e){}
    try{Object.defineProperty(screen,"pixelDepth",{get:function(){return 24;}});}catch(e){}
    try{Object.defineProperty(navigator,"maxTouchPoints",{get:function(){return 10;}});}catch(e){}
    try{Object.defineProperty(navigator,"platform",{get:function(){return "Linux armv8l";}});}catch(e){}
    try{Object.defineProperty(navigator,"hardwareConcurrency",{get:function(){return _CORES;}});}catch(e){}
    try{Object.defineProperty(navigator,"deviceMemory",{get:function(){return _MEM;}});}catch(e){}
    try{Object.defineProperty(window,"devicePixelRatio",{get:function(){return _DPR;}});}catch(e){}
    try{Object.defineProperty(window,"innerWidth",{get:function(){return _SW;}});}catch(e){}
    try{Object.defineProperty(window,"innerHeight",{get:function(){return _SH;}});}catch(e){}
    try{Object.defineProperty(screen,"isExtended",{get:function(){return false;}});}catch(e){}
    try{Object.defineProperty(window,"orientation",{get:function(){return 0;},configurable:true});}catch(e){}
    try{var _ori={type:"portrait-primary",angle:0,onchange:null,
      lock:function(){return Promise.reject(new DOMException("Not supported","NotSupportedError"));},
      unlock:function(){},addEventListener:function(){},removeEventListener:function(){},dispatchEvent:function(){return true;}};
      Object.defineProperty(screen,"orientation",{get:function(){return _ori;},configurable:true});}catch(e){}
    // navigator.connection: Chrome always has an existing NetworkInformation object,
    // so the old "only create if absent" block never ran \u2014 leaving the real type/
    // downlinkMax/etc. values visible (shows as "?" in the leak-test Network card).
    // Fix: always override properties on the existing object; only create a mock when
    // there is genuinely no connection object (e.g. non-Chrome Electron builds).
    try{
      var _nc2=(navigator).connection;
      if(_nc2){
        try{Object.defineProperty(_nc2,'type',{get:function(){return _CT;},configurable:true});}catch(_ce){}
        try{Object.defineProperty(_nc2,'effectiveType',{get:function(){return '4g';},configurable:true});}catch(_ce){}
        // Seed once \u2014 stable between reads on the same page.
        var _dt_dl=Math.max(1,Math.round(_CDL*(0.75+Math.random()*0.5)));
        var _dt_rtt=Math.max(5,Math.round(_CRT*(0.75+Math.random()*0.5)));
        try{Object.defineProperty(_nc2,'downlink',{get:function(){return _dt_dl;},configurable:true});}catch(_ce){}
        try{Object.defineProperty(_nc2,'rtt',{get:function(){return _dt_rtt;},configurable:true});}catch(_ce){}
        try{Object.defineProperty(_nc2,'saveData',{get:function(){return false;},configurable:true});}catch(_ce){}
        try{Object.defineProperty(_nc2,'downlinkMax',{get:function(){return Infinity;},configurable:true});}catch(_ce){}
      }else{
        var _cn={effectiveType:"4g",downlink:_CDL,rtt:_CRT,saveData:false,type:_CT,downlinkMax:Infinity,onchange:null,
          addEventListener:function(){},removeEventListener:function(){},dispatchEvent:function(){return true;}};
        setInterval(function(){
          _cn.downlink=Math.max(1,Math.round(_CDL*(0.75+Math.random()*0.5)));
          _cn.rtt=Math.max(5,Math.round(_CRT*(0.75+Math.random()*0.5)));
        },25000+Math.random()*10000);
        try{Object.defineProperty(navigator,"connection",{get:function(){return _cn;},configurable:true});}catch(e){}
      }
    }catch(_ce){}
    try{var _oMM=window.matchMedia.bind(window);window.matchMedia=function(q){
      var _mql={matches:false,media:q,onchange:null,addListener:function(){},removeListener:function(){},addEventListener:function(){},removeEventListener:function(){},dispatchEvent:function(){return true;}};
      if(/(pointer:s*coarse|any-pointer:s*coarse)/.test(q))return Object.assign({},_mql,{matches:true});
      if(/(hover:s*none|any-hover:s*none)/.test(q))return Object.assign({},_mql,{matches:true});
      if(/(pointer:s*fine|any-pointer:s*fine|hover:s*hover|any-hover:s*hover)/.test(q))return _mql;
      // prefers-color-scheme / prefers-reduced-motion: only intercept simple single-
      // feature queries. Compound queries (containing "and", "or", "not", commas) fall
      // through to native matchMedia \u2014 substring matching would misfire on e.g.
      // "not (prefers-color-scheme: light)" or "(prefers-color-scheme: dark) and (...)".
      // Android dark-mode is the majority default on modern devices; a server Electron
      // process returns "light" (no system dark mode), leaking host-OS identity.
      if(!/\band\b|\bor\b|\bnot\b|,/.test(q)){
        if(/prefers-color-scheme:s*dark/.test(q))return Object.assign({},_mql,{matches:true});
        if(/prefers-color-scheme:s*light/.test(q))return _mql;
        // prefers-reduced-motion: Android Chrome default is no-preference.
        if(/prefers-reduced-motion:s*no-preference/.test(q))return Object.assign({},_mql,{matches:true});
        if(/prefers-reduced-motion:s*reduce/.test(q))return _mql;
      }
      try{return _oMM(q);}catch(e2){return _mql;}
    };}catch(e){}
    try{if(window.visualViewport){
      Object.defineProperty(window.visualViewport,'width',{get:function(){return _SW;},configurable:true});
      Object.defineProperty(window.visualViewport,'height',{get:function(){return _SH;},configurable:true});
      Object.defineProperty(window.visualViewport,'scale',{get:function(){return 1;},configurable:true});
    }}catch(e){}
    try{Object.defineProperty(window,'outerWidth',{get:function(){return _SW;},configurable:true});}catch(e){}
    try{Object.defineProperty(window,'outerHeight',{get:function(){return _SH;},configurable:true});}catch(e){}
    try{if(window.ontouchstart===undefined)window.ontouchstart=null;}catch(e){}
    // Android Chrome has zero plugins and zero MIME types.
    // The ghost-signup patch already does this, but the regular EB fp script was
    // missing it \u2014 leaking Electron's real "PDF Viewer / Print" plugin entries
    // (5 plugins, 2 MIME types visible in Bot Detection on the leak-test page).
    try{
      var _ep2=Object.create(PluginArray.prototype);
      Object.defineProperty(_ep2,'length',{get:function(){return 0;},configurable:true});
      Object.defineProperty(navigator,'plugins',{get:function(){return _ep2;},configurable:true});
      var _em2=Object.create(MimeTypeArray.prototype);
      Object.defineProperty(_em2,'length',{get:function(){return 0;},configurable:true});
      Object.defineProperty(navigator,'mimeTypes',{get:function(){return _em2;},configurable:true});
    }catch(e){}
    // performance.memory is a non-standard Chrome extension absent on Android Chrome.
    // Instagram's device classifier checks "typeof performance.memory" to distinguish
    // mobile from desktop. The ghost-signup patch already does this \u2014 keep in sync.
    try{if(window.performance&&'memory' in window.performance){
      Object.defineProperty(performance,'memory',{get:function(){return undefined;},configurable:true});
    }}catch(e){}
    // navigator.keyboard (Keyboard Lock / Keyboard Map API) is desktop-only Chrome.
    // Present in Electron; absent on Android Chrome. Another clear desktop signal.
    try{if(navigator.keyboard!==undefined){
      Object.defineProperty(navigator,'keyboard',{get:function(){return undefined;},configurable:true});
    }}catch(e){}
  }else{
    try{Object.defineProperty(screen,"width",{get:function(){return 1920;}});}catch(e){}
    try{Object.defineProperty(screen,"height",{get:function(){return 1080;}});}catch(e){}
    try{Object.defineProperty(screen,"availWidth",{get:function(){return 1920;}});}catch(e){}
    try{Object.defineProperty(screen,"availHeight",{get:function(){return 1040;}});}catch(e){}
    try{Object.defineProperty(screen,"colorDepth",{get:function(){return 24;}});}catch(e){}
    try{Object.defineProperty(screen,"pixelDepth",{get:function(){return 24;}});}catch(e){}
    try{Object.defineProperty(navigator,"maxTouchPoints",{get:function(){return 0;}});}catch(e){}
    try{Object.defineProperty(navigator,"hardwareConcurrency",{get:function(){return _rp([4,6,8,8,8,12,16]);}});}catch(e){}
    try{Object.defineProperty(navigator,"deviceMemory",{get:function(){return _rp([8,8,16,32]);}});}catch(e){}
  }
  try{
    var _bt={charging:_BC,chargingTime:_BCT,dischargingTime:_BDT,level:_BL,
      onchargingchange:null,onchargingtimechange:null,ondischargingtimechange:null,onlevelchange:null,
      addEventListener:function(){},removeEventListener:function(){},dispatchEvent:function(){return true;}};
    var _dp=0.0008+Math.random()*0.0004;
    setInterval(function(){
      if(_bt.charging){_bt.level=Math.min(1.0,Math.round((_bt.level+_dp)*10000)/10000);if(_bt.level>=1.0)_bt.chargingTime=0;}
      else{_bt.level=Math.max(0.05,Math.round((_bt.level-_dp)*10000)/10000);}
    },60000);
    navigator.getBattery=function(){return Promise.resolve(_bt);};
  }catch(e){}
  try{document.hasFocus=function(){return true;};}catch(e){}
  try{Object.defineProperty(document,'visibilityState',{get:function(){return 'visible';},configurable:true});}catch(e){}
  try{Object.defineProperty(document,'hidden',{get:function(){return false;},configurable:true});}catch(e){}
  try{Object.defineProperty(navigator,"languages",{get:function(){return ["en-US","en"];}});}catch(e){}
  // window.chrome MUST be present on both Android Chrome and Desktop Chrome \u2014
  // real Chrome (any platform, any version in our range) always exposes it as
  // long as navigator.vendor === "Google Inc.".  Deleting it entirely (the old
  // behaviour here) is itself a well-known bot signal: headless/automated
  // Chromium and older stealth-evasion scripts historically stripped window.chrome,
  // so detectors specifically check for its ABSENCE as a red flag. Real Android
  // Chrome's window.chrome is a minimal object (no loadTimes/csi \u2014 those were
  // removed from both desktop and mobile Chrome years ago), so we expose the
  // same minimal shape on both branches instead of contradicting the UA.
  // window.chrome.runtime must be a real object \u2014 detectors check
  // typeof window.chrome.runtime === 'object' and it must be truthy.
  // The old {runtime:undefined} value failed that test (WARN in browser check).
  try{
    var _cr={id:undefined,connect:function(){return{onMessage:{addListener:function(){}},onDisconnect:{addListener:function(){}},postMessage:function(){},disconnect:function(){}};},sendMessage:function(){},getManifest:function(){return null;},onMessage:{addListener:function(){},removeListener:function(){},hasListener:function(){return false;}},onConnect:{addListener:function(){},removeListener:function(){},hasListener:function(){return false;}}};
    if(!window.chrome){Object.defineProperty(window,'chrome',{value:{runtime:_cr},configurable:true,writable:true,enumerable:true});}
    else if(window.chrome&&!window.chrome.runtime){try{Object.defineProperty(window.chrome,'runtime',{value:_cr,configurable:true,writable:true});}catch(_e2){try{window.chrome.runtime=_cr;}catch(_e3){}}}
  }catch(_e){}
  try{var _oq=navigator.permissions&&navigator.permissions.query.bind(navigator.permissions);
    if(_oq){
      // Expand to all permissions that should be "prompt" on a real Android Chrome session.
      // Previously only "notifications" was overridden; clipboard-read/write, midi, and
      // payment-handler were returning "granted" (Electron defaults), which is a bot signal.
      var _PPROMPT=['notifications','clipboard-read','clipboard-write','midi','payment-handler','background-sync','geolocation','camera','microphone','accelerometer','gyroscope','magnetometer'];
      navigator.permissions.query=function(p){
        return _PPROMPT.indexOf(p.name)>=0?Promise.resolve({state:"prompt",onchange:null}):_oq(p);};
    }}catch(e){}
  try{
    if(window.WebGLRenderingContext){
      var _oE1=WebGLRenderingContext.prototype.getExtension;
      WebGLRenderingContext.prototype.getExtension=function(n){
        if(n==="WEBGL_debug_renderer_info")return{UNMASKED_VENDOR_WEBGL:0x9245,UNMASKED_RENDERER_WEBGL:0x9246};
        return _oE1.call(this,n);};
      var _oP1=WebGLRenderingContext.prototype.getParameter;
      WebGLRenderingContext.prototype.getParameter=function(p){
        if(p===0x9245)return _WV;if(p===0x9246)return _WR;return _oP1.call(this,p);};
    }
    if(window.WebGL2RenderingContext){
      var _oE2=WebGL2RenderingContext.prototype.getExtension;
      WebGL2RenderingContext.prototype.getExtension=function(n){
        if(n==="WEBGL_debug_renderer_info")return{UNMASKED_VENDOR_WEBGL:0x9245,UNMASKED_RENDERER_WEBGL:0x9246};
        return _oE2.call(this,n);};
      var _oP2=WebGL2RenderingContext.prototype.getParameter;
      WebGL2RenderingContext.prototype.getParameter=function(p){
        if(p===0x9245)return _WV;if(p===0x9246)return _WR;return _oP2.call(this,p);};
    }
  }catch(e){}
  try{
    var _oDTU=HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL=function(){
      if(!this.width||!this.height)return _oDTU.apply(this,arguments);
      try{
        var c=document.createElement('canvas');c.width=this.width;c.height=this.height;
        var cx=c.getContext('2d');cx.drawImage(this,0,0);
        var d=cx.getImageData(0,0,c.width,c.height);
        var idx=(_CN*4)%d.data.length;d.data[idx]=d.data[idx]^1;
        cx.putImageData(d,0,0);
        return _oDTU.apply(c,arguments);
      }catch(e2){return _oDTU.apply(this,arguments);}
    };
  }catch(e){}
  try{
    var _oDTB=HTMLCanvasElement.prototype.toBlob;
    HTMLCanvasElement.prototype.toBlob=function(cb,type,quality){
      if(!this.width||!this.height){_oDTB.call(this,cb,type,quality);return;}
      try{
        var c=document.createElement('canvas');c.width=this.width;c.height=this.height;
        var cx=c.getContext('2d');cx.drawImage(this,0,0);
        var d=cx.getImageData(0,0,c.width,c.height);
        var idx=(_CN*4)%d.data.length;d.data[idx]=d.data[idx]^1;
        cx.putImageData(d,0,0);
        _oDTB.call(c,cb,type,quality);
      }catch(e2){_oDTB.call(this,cb,type,quality);}
    };
  }catch(e){}
  try{Object.defineProperty(navigator,"pdfViewerEnabled",{get:function(){return false;}});}catch(e){}
  try{
    var _oGFF=AnalyserNode.prototype.getFloatFrequencyData;
    AnalyserNode.prototype.getFloatFrequencyData=function(a){
      _oGFF.call(this,a);
      if(a&&a.length>0){var _as=(_AN|1);for(var i=0;i<a.length;i++){_as=Math.imul(1664525,_as)+1013904223>>>0;a[i]+=(_as/0x100000000)*0.0001-0.00005;}}
    };
    var _oGBF=AnalyserNode.prototype.getByteFrequencyData;
    AnalyserNode.prototype.getByteFrequencyData=function(a){
      _oGBF.call(this,a);
      if(a&&a.length>0){var _as=(_AN|1);for(var i=0;i<a.length;i++){_as=Math.imul(1664525,_as)+1013904223>>>0;var v=a[i]+(_as/0x100000000>0.5?1:0);a[i]=Math.max(0,Math.min(255,v));}}
    };
    var _oGFT=AnalyserNode.prototype.getFloatTimeDomainData;
    AnalyserNode.prototype.getFloatTimeDomainData=function(a){
      _oGFT.call(this,a);
      if(a&&a.length>0){var _as=(_AN|1);for(var i=0;i<a.length;i++){_as=Math.imul(1664525,_as)+1013904223>>>0;a[i]=Math.max(-1,Math.min(1,a[i]+(_as/0x100000000)*0.0001-0.00005));}}
    };
  }catch(e){}
  try{
    // Real Chrome reduces performance.now() resolution to ~0.1 ms to mitigate
    // Spectre timing attacks. Electron/Chromium in debug mode returns
    // full-microsecond precision \u2014 a clear non-browser signal. Clamp to 0.1 ms.
    var _oPNow=performance.now.bind(performance);
    performance.now=function(){return Math.round(_oPNow()*10)/10;};
  }catch(e){}
  try{
    // Real Android Chrome does NOT set DNT \u2014 navigator.doNotTrack is null.
    // Electron sets it to "1" by default (Chromium's built-in DNT preference
    // is ON in the Electron session), which is a fingerprint mismatch: Instagram
    // sees a "mobile Chrome" session with DNT=1 even though no Android user
    // ever enables DNT through Chrome's hidden settings.
    Object.defineProperty(navigator,'doNotTrack',{get:function(){return null;},configurable:true});
  }catch(e){}
  try{
    // Real behaviour was to CONCAT the fake device onto the host's real
    // enumerateDevices() result \u2014 meaning Instagram still saw the actual PC's
    // real camera/mic hardware (device count, group IDs) alongside the fake
    // Android entries. A phone never has an extra desktop webcam + headset
    // showing up next to its stock camera/mic. Now we IGNORE the real result
    // entirely and always return a fixed, realistic Android device set (one
    // rear + one front camera, one mic, one speaker) \u2014 matching a stock phone
    // and never leaking anything about the host PC's real hardware.
    if(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices){
      navigator.mediaDevices.enumerateDevices=function(){
        return Promise.resolve([
          {deviceId:_MVID,groupId:_MVID.slice(0,8),kind:'videoinput',label:'',toJSON:function(){return {};}},
          {deviceId:_MVID.slice(0,16)+'f',groupId:_MVID.slice(0,8),kind:'videoinput',label:'',toJSON:function(){return {};}},
          {deviceId:_MAID,groupId:_MAID.slice(0,8),kind:'audioinput',label:'',toJSON:function(){return {};}},
          {deviceId:_MSID,groupId:_MSID.slice(0,8),kind:'audiooutput',label:'',toJSON:function(){return {};}}
        ]);
      };
    }
  }catch(e){}
  try{
    var _chm=_ua.match(/Chrome\\/([0-9]+)/);
    var _chv=_chm?_chm[1]:"${CURRENT_CHROME_MAJOR}";
    var _chp=_ua.indexOf("Android")>=0?"Android":_ua.indexOf("Macintosh")>=0?"macOS":_ua.indexOf("Linux")>=0?"Linux":"Windows";
    var _chmo=_ua.indexOf("Android")>=0&&_ua.indexOf("Mobile")>=0;
    // Real greased brand + version baked in from CHROME_BUILD_INFO at injection time.
    // Falls back to UA-derived values so old profiles without the info still work.
    var _GB=${_gbr}||(parseInt(_chv,10)>=128?" Not A;Brand":"Not/A)Brand");
    var _GBV=${_gbv}||"8";
    // Real full build version (e.g. "131.0.6778.260") \u2014 never ".0.0.0"
    var _CFV=${_cfv}||(_chv+".0.6778.260");
    var _chb=[{brand:_GB,version:_GBV},{brand:"Chromium",version:_chv},{brand:"Google Chrome",version:_chv}];
    var _chmdl=(function(){var mm=_ua.match(/Android [0-9]+;\\s*([^)]+)\\)/);return mm?mm[1].trim():"";})();
    // Android platform version derived from UA string \u2014 must match Sec-CH-UA-Platform-Version header.
    var _chav=(function(){var m=_ua.match(/Android[\\s/]+([0-9]+)/i);return m?(m[1]+".0.0"):"15.0.0";})();
    Object.defineProperty(navigator,"userAgentData",{
      get:function(){
        return{
          brands:_chb,mobile:_chmo,platform:_chp,
          getHighEntropyValues:function(h){
            var rv={brands:_chb,mobile:_chmo,platform:_chp};
            if(h.indexOf("platformVersion")>=0)rv.platformVersion=_M?_chav:(_dpv!=null?_dpv:"");
            if(h.indexOf("architecture")>=0)rv.architecture=_M?"arm":(_da||"x86");
            if(h.indexOf("bitness")>=0)rv.bitness="64";
            if(h.indexOf("model")>=0)rv.model=_chmdl;
            if(h.indexOf("uaFullVersion")>=0)rv.uaFullVersion=_CFV;
            if(h.indexOf("fullVersionList")>=0)rv.fullVersionList=_chb.map(function(b){return{brand:b.brand,version:b===_chb[0]?(_GBV+".0.0.0"):_CFV};});
            return Promise.resolve(rv);
          },
          toJSON:function(){return{brands:_chb,mobile:_chmo,platform:_chp};}
        };
      },configurable:true
    });
  }catch(e){}
  try{
    // All 28 fonts probed by the leak test + common external fingerprinters.
    // Per-account fontSeed (_FN, range 1-99) controls which subset appears
    // "installed" so 1,000 accounts each report a different font profile.
    // The hook fully controls measureText width for every controlled font:
    //   \u2022 present  \u2192 width clearly differs from monospace baseline
    //   \u2022 absent   \u2192 width equals monospace baseline (font appears not installed)
    // This hides genuine Windows fonts AND fakes absent fonts, per-account.
    // Sorted longest-first so indexOf matching is unambiguous:
    // 'Arial Black' / 'Arial Narrow' are found before the shorter 'Arial'.
    var _FVAR=['Franklin Gothic Medium','Microsoft Sans Serif','Lucida Sans Unicode',
      'Palatino Linotype','Bookman Old Style','Times New Roman','Century Gothic',
      'Lucida Console','Comic Sans MS','Arial Narrow','Trebuchet MS','Gill Sans MT',
      'Courier New','Arial Black','Arial','Calibri','Cambria','Courier','Georgia',
      'Helvetica','Impact','Segoe UI','Tahoma','Verdana','Wingdings','Symbol',
      'Webdings','Garamond'];
    // These fonts have Noto/metric-compatible equivalents on Android Chrome \u2014
    // always shown as present so the account looks like a real mobile browser.
    var _FCORE=['Arial','Courier New','Georgia','Times New Roman','Verdana'];
    var _FP={};
    (function(){
      var _fh=function(f,s){var h=s>>>0;for(var i=0;i<f.length;i++){h=((h<<5)+h+f.charCodeAt(i))>>>0;}return h;};
      for(var _fi=0;_fi<_FVAR.length;_fi++){
        var _ff=_FVAR[_fi];
        if(_FCORE.indexOf(_ff)>=0){_FP[_ff]=true;continue;}
        // Non-core: 10-30% probability, unique per account via fontSeed
        _FP[_ff]=(_fh(_ff,_FN)%100)<Math.max(10,Math.min(30,Math.round(_FN/3)));
      }
    })();
    // Separate OffscreenCanvas for monospace baseline measurement \u2014 avoids
    // mutating this.font inside the hook which would be a detectable side-effect.
    // Helper canvas for monospace baseline measurement.
    // IMPORTANT: save _fpMT BEFORE installing the hook so it captures the native
    // (pre-hook) measureText bound to the correct context type.  Two failure modes:
    //   (a) OffscreenCanvas.getContext('2d') returns null \u2192 _fpX stays null, fallback runs.
    //   (b) OffscreenCanvas.getContext('2d') returns a NON-null OffscreenCanvasRenderingContext2D \u2014
    //       calling CanvasRenderingContext2D.prototype.measureText with that as 'this' throws
    //       "Illegal invocation" because the two contexts are DIFFERENT prototype chains.
    // Solution: bind _fpX.measureText directly to _fpX so the call always uses the
    // native method for whatever context type was actually created (OffscreenCanvas OR
    // document canvas).  _fpMT(text) then works regardless of which branch ran.
    var _fpX=null;
    try{var _fpC=new OffscreenCanvas(400,40);_fpX=_fpC.getContext('2d');}catch(_fe){}
    if(!_fpX){try{var _fpD=document.createElement('canvas');_fpD.width=400;_fpD.height=40;_fpX=_fpD.getContext('2d');}catch(_fe2){}}
    // Capture the native measureText bound to _fpX NOW, before the hook replaces
    // CanvasRenderingContext2D.prototype.measureText below.
    var _fpMT=_fpX?_fpX.measureText.bind(_fpX):null;
    var _oMT=CanvasRenderingContext2D.prototype.measureText;
    CanvasRenderingContext2D.prototype.measureText=function(text){
      var r=_oMT.call(this,text);
      var fs=this.font||'';
      // Find the first controlled font name present in this font string
      var _mf=null;
      for(var _fi=0;_fi<_FVAR.length;_fi++){if(fs.indexOf(_FVAR[_fi])>=0){_mf=_FVAR[_fi];break;}}
      if(_mf===null)return r;
      // Guard: if OffscreenCanvas context failed to create (returns null in some
      // Chromium sandbox configurations), fall back to passing the real measurement
      // through unmodified rather than crashing the caller with a TypeError from
      // _oMT.call(null,...). Without this, testFonts() in the leak-test page throws
      // and crashes the entire runAll() async function, leaving every async card
      // (IP, WebRTC, DNS, Battery, Media, Permissions, Hints) frozen in its initial
      // "Fetching\u2026" / "Running\u2026" HTML state forever.
      if(!_fpX||!_fpMT)return r;
      // Extract font size (e.g. "72px") to use the same size on the helper canvas
      var _sz=(fs.match(/d+(?:.d+)?(?:px|pt|em|rem)/)||['16px'])[0];
      _fpX.font=_sz+' monospace';
      // Use _fpMT (pre-bound to _fpX) instead of _oMT.call(_fpX, text).
      // _oMT is CanvasRenderingContext2D.prototype.measureText \u2014 calling it with an
      // OffscreenCanvasRenderingContext2D as 'this' throws "Illegal invocation".
      // _fpMT was bound to _fpX before hook installation, so it always uses the
      // correct native method for whatever context type _fpX actually is.
      var _bw=_fpMT(text).width;
      if(_FP[_mf]){
        // Font should appear present: width must differ from monospace baseline
        if(Math.abs(r.width-_bw)<0.01){
          // Font not truly installed \u2014 inject a detectable width difference
          return new Proxy(r,{get:function(t,k,rv){return k==='width'?_bw+1.5:Reflect.get(t,k,rv);}});
        }
        return r; // Truly installed and already different \u2014 pass through
      }else{
        // Font should appear NOT present: clamp to monospace baseline width
        return new Proxy(r,{get:function(t,k,rv){return k==='width'?_bw:Reflect.get(t,k,rv);}});
      }
    };
  }catch(e){}
  try{
    var _SVS=[
      [{name:'Google US English',lang:'en-US',localService:true,default:true,voiceURI:'Google US English'},{name:'Google UK English Female',lang:'en-GB',localService:true,default:false,voiceURI:'Google UK English Female'}],
      [{name:'Google US English',lang:'en-US',localService:true,default:true,voiceURI:'Google US English'},{name:'Google UK English Male',lang:'en-GB',localService:true,default:false,voiceURI:'Google UK English Male'},{name:'Google Deutsch',lang:'de-DE',localService:false,default:false,voiceURI:'Google Deutsch'}],
      [{name:'Google US English',lang:'en-US',localService:true,default:true,voiceURI:'Google US English'},{name:'Google Espanol',lang:'es-ES',localService:false,default:false,voiceURI:'Google Espanol'},{name:'Google Francais',lang:'fr-FR',localService:false,default:false,voiceURI:'Google Francais'}],
      [{name:'Google US English',lang:'en-US',localService:true,default:true,voiceURI:'Google US English'},{name:'Google Hindi',lang:'hi-IN',localService:false,default:false,voiceURI:'Google Hindi'},{name:'Google Italiano',lang:'it-IT',localService:false,default:false,voiceURI:'Google Italiano'}],
      [{name:'Google US English',lang:'en-US',localService:true,default:true,voiceURI:'Google US English'},{name:'Google UK English Female',lang:'en-GB',localService:true,default:false,voiceURI:'Google UK English Female'},{name:'Google Portugues',lang:'pt-BR',localService:false,default:false,voiceURI:'Google Portugues'}],
      [{name:'Google US English',lang:'en-US',localService:true,default:true,voiceURI:'Google US English'},{name:'Google Mandarin',lang:'zh-CN',localService:false,default:false,voiceURI:'Google Mandarin'}],
      [{name:'Google US English',lang:'en-US',localService:true,default:true,voiceURI:'Google US English'},{name:'Google UK English Male',lang:'en-GB',localService:true,default:false,voiceURI:'Google UK English Male'},{name:'Google Espanol US',lang:'es-US',localService:false,default:false,voiceURI:'Google Espanol US'},{name:'Google Russian',lang:'ru-RU',localService:false,default:false,voiceURI:'Google Russian'}],
      [{name:'Google US English',lang:'en-US',localService:true,default:true,voiceURI:'Google US English'},{name:'Google Bahasa Indonesia',lang:'id-ID',localService:false,default:false,voiceURI:'Google Bahasa Indonesia'},{name:'Google Bangla',lang:'bn-BD',localService:false,default:false,voiceURI:'Google Bangla'}]
    ];
    var _SV=_SVS[_SP%_SVS.length];
    window.speechSynthesis.getVoices=function(){return _SV.slice();};
    var _oPAE=EventTarget.prototype.addEventListener;
    window.speechSynthesis.addEventListener=function(t,fn,opts){
      _oPAE.call(this,t,fn,opts);if(t==='voiceschanged'){try{fn.call(window.speechSynthesis,new Event('voiceschanged'));}catch(e2){}}
    };
  }catch(e){}
  try{
    var _WPS=(
      '(function(){'
      +'try{Object.defineProperty(self.navigator,"hardwareConcurrency",{get:function(){return '+_CORES+';}});}catch(e){}'
      +'try{Object.defineProperty(self.navigator,"deviceMemory",{get:function(){return '+_MEM+';}});}catch(e){}'
      +'try{Object.defineProperty(self.navigator,"platform",{get:function(){return"Linux armv8l";}});}catch(e){}'
      +'if(typeof OffscreenCanvas!=="undefined"){try{'
      +'var _pG=function(gl){if(!gl)return;'
      +'var _eO=gl.getExtension.bind(gl),_pO=gl.getParameter.bind(gl);'
      +'gl.getExtension=function(n){if(n==="WEBGL_debug_renderer_info")return{UNMASKED_VENDOR_WEBGL:37445,UNMASKED_RENDERER_WEBGL:37446};return _eO(n);};'
      +'gl.getParameter=function(p){if(p===37445)return '+JSON.stringify(_WV)+';if(p===37446)return '+JSON.stringify(_WR)+';return _pO(p);};};'
      +'var _oGC=OffscreenCanvas.prototype.getContext;'
      +'OffscreenCanvas.prototype.getContext=function(t,a){var g=_oGC.call(this,t,a);if(g&&(t==="webgl"||t==="webgl2"||t==="experimental-webgl"))_pG(g);return g;};'
      +'}catch(e){}}'
      +'})();'
    );
    var _WBlob=new Blob([_WPS],{type:'text/javascript'});
    var _WUrl=URL.createObjectURL(_WBlob);
    var _WOrig=window.Worker;
    if(_WOrig){
      window.Worker=function(url,opts){
        if(!opts||opts.type!=='module'){
          try{
            var _wu=typeof url==='string'?url:url.toString();
            var _wb=new Blob(['importScripts('+JSON.stringify(_WUrl)+');\\nimportScripts('+JSON.stringify(_wu)+');'],{type:'text/javascript'});
            return new _WOrig(URL.createObjectURL(_wb),opts);
          }catch(e2){}
        }
        return new _WOrig(url,opts);
      };
      try{window.Worker.prototype=_WOrig.prototype;}catch(e){}
      try{Object.defineProperty(window.Worker,'name',{value:'Worker'});}catch(e){}
    }
  }catch(e){}
  // \u2500\u2500 Intl.DateTimeFormat timezone override \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // Emulation.setTimezoneOverride sets the V8 runtime's OS-level timezone BUT
  // Intl.DateTimeFormat reads from the ICU locale data, not the V8 timezone \u2014
  // so Intl.DateTimeFormat().resolvedOptions().timeZone still returns the real
  // server timezone.  Instagram calls this to validate the session's timezone
  // against the proxy exit IP.  This override fixes the mismatch by wrapping
  // the constructor to always inject the correct timeZone option.
  if(_TZ){try{var _oDTF=Intl.DateTimeFormat;var _pDTF=function(l,o){return new _oDTF(l,Object.assign({},o||{},{timeZone:_TZ}));};_pDTF.prototype=_oDTF.prototype;_pDTF.supportedLocalesOf=_oDTF.supportedLocalesOf.bind(_oDTF);Intl.DateTimeFormat=_pDTF;}catch(_e){}}
  // \u2500\u2500 Intl locale fix: RelativeTimeFormat / NumberFormat / PluralRules / Collator \u2500
  // Emulation.setUserAgentOverride acceptLanguage controls HTTP headers and
  // navigator.language but NOT the ICU locale used by other Intl constructors \u2014
  // they read the process locale directly (e.g. may expose 'pt-BR' on a Linux
  // server even though navigator.language is 'en-US').  Force them to match.
  try{var _lang0=(navigator.languages&&navigator.languages[0])||'en-US';
    ['RelativeTimeFormat','NumberFormat','PluralRules','Collator'].forEach(function(n){
      var _o=(Intl)[n];if(!_o)return;
      var _p=function(l,o){return new _o(l!==undefined?l:_lang0,o);};
      try{_p.prototype=_o.prototype;}catch(_e){}
      try{_p.supportedLocalesOf=_o.supportedLocalesOf.bind(_o);}catch(_e){}
      try{(Intl)[n]=_p;}catch(_e){}
    });
  }catch(_e){}
}catch(e){}})();`;
  return _ebFpSrc.replace(/\{get:function\(\)/g, "{configurable:true,get:function()");
}
function isApiFormatUA(ua) {
  return !!ua && !ua.startsWith("Mozilla") && /^\d+\/\d+;\s*\d+dpi/i.test(ua);
}
function apiUAToBrowserUA(apiUA) {
  const m = apiUA.match(/^\d+\/(\d+);\s*\d+dpi;\s*\d+x\d+;\s*[^;]+;\s*([^;]+)/i);
  const androidVersion = m ? m[1].trim() : "14";
  const deviceModel = m ? m[2].trim() : "motorola edge 40 pro";
  const chromeMajor = process.versions.chrome?.split(".")[0] ?? CURRENT_CHROME_MAJOR;
  const browserUA = `Mozilla/5.0 (Linux; Android ${androidVersion}; ${deviceModel}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeMajor}.0.0.0 Mobile Safari/537.36`;
  return { browserUA, androidVersion, deviceModel };
}
var toolbarViewMap = /* @__PURE__ */ new Map();
var TOOLBAR_H = 92;
var tabsStateMap = /* @__PURE__ */ new Map();
function pushTabUpdate(profileId) {
  const tv = toolbarViewMap.get(profileId);
  if (!tv || tv.webContents.isDestroyed()) return;
  const state = tabsStateMap.get(profileId);
  if (!state) return;
  tv.webContents.executeJavaScript(
    `window.updateTabs && window.updateTabs(${JSON.stringify(state.tabs)}, ${state.activeId})`
  ).catch(() => {
  });
}
function getActiveWc(profileId) {
  const entry = ebMap.get(profileId);
  if (!entry || entry.win.isDestroyed()) return null;
  const state = tabsStateMap.get(profileId);
  if (!state || state.activeId === 0) return entry.win.webContents;
  const view = state.views.get(state.activeId);
  if (!view || view.webContents.isDestroyed()) return entry.win.webContents;
  return view.webContents;
}
function switchToTab(profileId, tabId) {
  const state = tabsStateMap.get(profileId);
  const entry = ebMap.get(profileId);
  if (!state || !entry || entry.win.isDestroyed()) return;
  const win2 = entry.win;
  state.activeId = tabId;
  for (const view of state.views.values()) {
    win2.removeBrowserView(view);
  }
  if (tabId !== 0) {
    const view = state.views.get(tabId);
    if (view && !view.webContents.isDestroyed()) {
      win2.addBrowserView(view);
      const [w, h] = win2.getContentSize();
      view.setBounds({ x: 0, y: TOOLBAR_H, width: w, height: Math.max(1, h - TOOLBAR_H) });
    }
  }
  const tv = toolbarViewMap.get(profileId);
  if (tv && !tv.webContents.isDestroyed()) {
    win2.removeBrowserView(tv);
    win2.addBrowserView(tv);
  }
  pushTabUpdate(profileId);
}
function cookieFilePath(profileId) {
  return import_path.default.join(_cookiesDir, `cookies-${profileId}.json`);
}
async function loadCookiesFromFile(profileId, ses) {
  const fp = cookieFilePath(profileId);
  if (!import_fs.default.existsSync(fp)) return;
  try {
    const raw = JSON.parse(import_fs.default.readFileSync(fp, "utf8"));
    if (!Array.isArray(raw)) return;
    for (const c of raw) {
      if (!c.name || !c.value) continue;
      const domain = c.domain ?? ".instagram.com";
      await ses.cookies.set({
        url: `https://${domain.replace(/^\./, "") || "instagram.com"}`,
        name: c.name,
        value: c.value,
        domain,
        path: c.path ?? "/",
        secure: c.secure ?? true,
        httpOnly: c.httpOnly ?? false,
        expirationDate: c.expires && c.expires !== -1 ? c.expires : void 0,
        sameSite: "no_restriction"
      }).catch(() => {
      });
    }
    console.log(`[ebManager:${profileId}] Loaded cookies from file (${raw.length})`);
  } catch (e) {
    console.warn(`[ebManager:${profileId}] loadCookiesFromFile failed:`, e);
  }
}
async function saveCookiesToFile(profileId, ses) {
  try {
    const c1 = await ses.cookies.get({ domain: ".instagram.com" });
    const c2 = await ses.cookies.get({ domain: "instagram.com" });
    const seen = /* @__PURE__ */ new Set();
    const all = [...c1, ...c2].filter((c) => {
      if (seen.has(c.name)) return false;
      seen.add(c.name);
      return true;
    });
    if (!all.length) return;
    const asFile = all.map((c) => ({
      name: c.name,
      value: c.value,
      domain: c.domain ?? ".instagram.com",
      path: c.path ?? "/",
      expires: c.expirationDate ?? -1,
      httpOnly: c.httpOnly ?? false,
      secure: c.secure ?? true,
      session: !c.expirationDate,
      sameSite: "None"
    }));
    import_fs.default.mkdirSync(_cookiesDir, { recursive: true });
    import_fs.default.writeFileSync(cookieFilePath(profileId), JSON.stringify(asFile, null, 2));
    console.log(`[ebManager:${profileId}] Saved ${asFile.length} cookies to file`);
  } catch (e) {
    console.warn(`[ebManager:${profileId}] saveCookiesToFile failed:`, e);
  }
}
function rewriteChromeMajorInUA(ua, newFull) {
  return ua.replace(/Chrome\/[\d.]+/, `Chrome/${newFull}`);
}
function pushUABumpToServer(profileId, newEmbeddedUA) {
  if (!_serverPort) return;
  const body = JSON.stringify({ userAgentEmbedded: newEmbeddedUA });
  const req = import_http.default.request({
    hostname: "127.0.0.1",
    port: _serverPort,
    path: `/api/profiles/${profileId}/bump-chrome-ua`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body)
    }
  });
  req.on("error", () => {
  });
  req.write(body);
  req.end();
}
function pushCookiesToServer(profileId, cookies) {
  if (!_serverPort) return;
  const body = JSON.stringify({ cookies });
  const req = import_http.default.request({
    hostname: "127.0.0.1",
    port: _serverPort,
    path: `/api/profiles/${profileId}/eb-cookies`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body)
    }
  });
  req.on("error", () => {
  });
  req.write(body);
  req.end();
}
async function syncCookies(profileId, ses) {
  await saveCookiesToFile(profileId, ses);
  const c1 = await ses.cookies.get({ domain: ".instagram.com" });
  const c2 = await ses.cookies.get({ domain: "instagram.com" });
  const seen = /* @__PURE__ */ new Set();
  const all = [...c1, ...c2].filter((c) => {
    if (seen.has(c.name)) return false;
    seen.add(c.name);
    return true;
  });
  pushCookiesToServer(profileId, all.map((c) => ({ name: c.name, value: c.value })));
}
function generateTotp(base32Key) {
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const key = base32Key.replace(/\s+/g, "").toUpperCase();
  let bits = 0, acc = 0;
  const bytes = [];
  for (const ch of key) {
    const idx = CHARS.indexOf(ch);
    if (idx < 0) continue;
    acc = acc << 5 | idx;
    bits += 5;
    if (bits >= 8) {
      bytes.push(acc >>> bits - 8 & 255);
      bits -= 8;
    }
  }
  const keyBuf = Buffer.from(bytes);
  const ctr = Math.floor(Date.now() / 3e4);
  const ctBuf = Buffer.alloc(8);
  ctBuf.writeUInt32BE(Math.floor(ctr / 4294967296), 0);
  ctBuf.writeUInt32BE(ctr & 4294967295, 4);
  const hmac = (0, import_crypto.createHmac)("sha1", keyBuf).update(ctBuf).digest();
  const off = hmac[hmac.length - 1] & 15;
  const code = (hmac[off] & 127) << 24 | (hmac[off + 1] & 255) << 16 | (hmac[off + 2] & 255) << 8 | hmac[off + 3] & 255;
  return String(code % 1e6).padStart(6, "0");
}
function waitForNav(wc, predicate, timeoutMs) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      wc.removeListener("did-navigate", handler);
      wc.removeListener("did-navigate-in-page", handler);
      resolve(wc.getURL());
    }, timeoutMs);
    const handler = (_, url) => {
      if (predicate(url)) {
        clearTimeout(timer);
        wc.removeListener("did-navigate", handler);
        wc.removeListener("did-navigate-in-page", handler);
        resolve(url);
      }
    };
    wc.on("did-navigate", handler);
    wc.on("did-navigate-in-page", handler);
  });
}
async function doAutoLogin(profileId, win2, username, password, twoFAKey, userAgent) {
  const _t0 = Date.now();
  const _ts = () => `+${((Date.now() - _t0) / 1e3).toFixed(1)}s`;
  console.log(`[doAutoLogin:${profileId}] @${username} \u2014 starting`);
  const wc = win2.webContents;
  const ses = import_electron.session.fromPartition(ebPartition(profileId));
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  if (userAgent) {
    try {
      try {
        wc.debugger.attach("1.3");
      } catch {
      }
      wireHeaderCapture(wc, profileId);
      const _chromeMajor = userAgent.match(/Chrome\/(\d+)/)?.[1] ?? CURRENT_CHROME_MAJOR;
      const _isMob = userAgent.includes("Mobile") || userAgent.includes("Android");
      const _buildInfo = getChromeBuildInfo(_chromeMajor);
      const _androidVer = userAgent.match(/Android\s+(\d+)/i)?.[1] ?? "15";
      const _model = userAgent.match(/Android\s+\d+;\s*([^)]+)\)/i)?.[1]?.trim() ?? "";
      const _desktopMeta = _isMob ? null : buildDesktopUAMetadata(userAgent);
      await wc.debugger.sendCommand("Emulation.setUserAgentOverride", {
        userAgent,
        acceptLanguage: "en-US,en;q=0.9",
        platform: _isMob ? "Linux armv8l" : _desktopMeta.navigatorPlatform,
        userAgentMetadata: {
          brands: [
            { brand: _buildInfo.grease, version: _buildInfo.greaseVer },
            { brand: "Chromium", version: _chromeMajor },
            { brand: "Google Chrome", version: _chromeMajor }
          ],
          fullVersionList: [
            { brand: _buildInfo.grease, version: _buildInfo.greaseVer + ".0.0.0" },
            { brand: "Chromium", version: _buildInfo.full },
            { brand: "Google Chrome", version: _buildInfo.full }
          ],
          fullVersion: _buildInfo.full,
          platform: _isMob ? "Android" : _desktopMeta.platform,
          platformVersion: _isMob ? _androidVer : _desktopMeta.platformVersion,
          architecture: _isMob ? "arm" : _desktopMeta.architecture,
          model: _isMob ? _model : "",
          mobile: _isMob,
          bitness: _isMob ? "64" : _desktopMeta.bitness,
          wow64: false
        }
      });
    } catch {
    }
  }
  console.log(`[doAutoLogin:${profileId}] ${_ts()} navigating to login page`);
  try {
    await new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error("Login page load timeout")), 3e4);
      wc.once("did-finish-load", () => {
        clearTimeout(t);
        resolve();
      });
      wc.loadURL("https://www.instagram.com/accounts/login/").catch(reject);
    });
  } catch (e) {
    console.error(`[doAutoLogin:${profileId}] ${_ts()} login page load FAILED: ${e?.message}`);
    return { ok: false, message: `Failed to load login page: ${e?.message}` };
  }
  console.log(`[doAutoLogin:${profileId}] ${_ts()} login page loaded`);
  await delay(2e3);
  {
    const _CK_ACCEPT = [
      "allow all cookies",
      "accept all cookies",
      "allow all",
      "accept all",
      "allow essential and optional cookies",
      "accept cookies",
      "allow cookies",
      "alle cookies akzeptieren",
      "accepter tout",
      "aceptar todo",
      "accetta tutto",
      "till\xE5t alla",
      "alle accepteren"
    ];
    const ckDetectJs = `(() => {
      const A = ${JSON.stringify(_CK_ACCEPT)};
      function m(b) {
        if (!b || !b.getBoundingClientRect) return null;
        const r = b.getBoundingClientRect();
        if (r.width <= 0 || r.height <= 0) return null;
        const t = (b.innerText||b.textContent||'').trim().toLowerCase();
        if (A.indexOf(t) === -1) return null;
        return { x: Math.round(r.left + r.width/2), y: Math.round(r.top + r.height/2) };
      }
      let b = document.querySelector('[data-cookiebanner="accept_button"]')
           || document.querySelector('[data-testid="cookie-policy-banner-accept"]');
      if (b) { const p = m(b); if (p) return p; }
      const c = document.querySelector('[data-cookiebanner]') || document.querySelector('[class*="CookieBanner"],[class*="cookie-banner"],[id*="cookie"]');
      if (c) { for (const el of c.querySelectorAll('button,[role="button"]')) { const p = m(el); if (p) return p; } }
      for (const el of document.querySelectorAll('button,[role="button"]')) { const p = m(el); if (p) return p; }
      return null;
    })()`;
    let ckPos = null;
    for (let attempt = 0; attempt < 12; attempt++) {
      ckPos = await wc.executeJavaScript(ckDetectJs).catch(() => null);
      if (ckPos) break;
      await delay(500);
    }
    if (ckPos) {
      console.log(`[doAutoLogin:${profileId}] ${_ts()} cookie banner at (${ckPos.x},${ckPos.y}), dismissing`);
      try {
        try {
          wc.debugger.attach("1.3");
        } catch {
        }
        await cdpTapGesture(wc.debugger, ckPos.x, ckPos.y);
        await delay(2e3);
      } catch {
      }
    } else {
      console.log(`[doAutoLogin:${profileId}] ${_ts()} no cookie banner found`);
    }
  }
  await delay(300);
  try {
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await delay(60);
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await delay(150);
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await delay(60);
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await delay(300);
  } catch {
  }
  try {
    wc.debugger.attach("1.3");
  } catch {
  }
  const fields = await wc.executeJavaScript(`
    (async () => {
      const wait = ms => new Promise(r => setTimeout(r, ms));
      let uInp, pInp, tries = 0;
      while (tries++ < 20) {
        uInp = document.querySelector('input[name="username"]');
        pInp = document.querySelector('input[name="password"]');
        if (uInp && pInp) break;
        await wait(500);
      }
      if (!uInp || !pInp) return null;
      const ur = uInp.getBoundingClientRect();
      const pr = pInp.getBoundingClientRect();
      return {
        u: { x: Math.round(ur.left + ur.width / 2), y: Math.round(ur.top + ur.height / 2) },
        p: { x: Math.round(pr.left + pr.width / 2), y: Math.round(pr.top + pr.height / 2) },
      };
    })()
  `).catch(() => null);
  if (!fields) {
    console.error(`[doAutoLogin:${profileId}] ${_ts()} login form fields NOT FOUND \u2014 bailing`);
    return { ok: false, message: "Could not find login form on Instagram login page" };
  }
  console.log(`[doAutoLogin:${profileId}] ${_ts()} login form found, filling credentials`);
  try {
    await cdpTapGesture(wc.debugger, fields.u.x, fields.u.y);
    await delay(120);
    await wc.executeJavaScript(
      `(document.querySelector('input[name="username"]')||document.querySelector('input[autocomplete="username"]'))?.focus()`
    ).catch(() => {
    });
    await delay(80);
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", modifiers: 2, key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", modifiers: 2, key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Delete", code: "Delete", windowsVirtualKeyCode: 46 });
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Delete", code: "Delete", windowsVirtualKeyCode: 46 });
    await delay(100);
    await typeTextCDP(wc.debugger, username);
    await delay(150);
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await delay(700);
    const freshPwdPos = await wc.executeJavaScript(`
      (() => {
        const p = document.querySelector('input[name="password"]');
        if (!p) return null;
        const r = p.getBoundingClientRect();
        if (r.width <= 0 || r.height <= 0) return null;
        return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
      })()
    `).catch(() => null);
    const pwdCoords = freshPwdPos ?? fields.p;
    await cdpTapGesture(wc.debugger, pwdCoords.x, pwdCoords.y);
    await delay(150);
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", modifiers: 2, key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", modifiers: 2, key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Delete", code: "Delete", windowsVirtualKeyCode: 46 });
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Delete", code: "Delete", windowsVirtualKeyCode: 46 });
    await delay(100);
    await typeTextCDP(wc.debugger, password, { androidIme: true });
  } catch (cdpErr) {
    console.error(`[doAutoLogin:${profileId}] ${_ts()} CDP form fill FAILED: ${cdpErr?.message}`);
    return { ok: false, message: `CDP form fill error: ${cdpErr?.message}` };
  }
  console.log(`[doAutoLogin:${profileId}] ${_ts()} credentials filled, submitting via Tab Tab Enter`);
  await delay(300);
  const submitted = await wc.executeJavaScript(`
    (() => {
      const b = document.querySelector('button[type="submit"]')
        || Array.from(document.querySelectorAll('button')).find(b => {
            const t = (b.innerText || b.textContent || '').trim();
            const r = b.getBoundingClientRect();
            return /log[\\s-]*in|sign[\\s-]*in/i.test(t) && r.width > 80 && !b.disabled;
          });
      if (!b || b.disabled) return false;
      b.click();
      return true;
    })()
  `).catch(() => false);
  if (!submitted) {
    console.warn(`[doAutoLogin:${profileId}] ${_ts()} submit button not found via JS \u2014 falling back to Tab Tab Enter`);
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await delay(80);
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await delay(120);
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
    await delay(60);
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  }
  console.log(`[doAutoLogin:${profileId}] ${_ts()} form submitted (via ${submitted ? "JS click" : "Tab Tab Enter"})`);
  console.log(`[doAutoLogin:${profileId}] ${_ts()} waiting for post-submit navigation (30s timeout)`);
  const postLoginUrl = await waitForNav(
    wc,
    (url) => url.includes("instagram.com") && (!url.includes("accounts/login/") || url.includes("two_factor") || /#/.test(url)),
    3e4
  );
  console.log(`[doAutoLogin:${profileId}] ${_ts()} post-submit URL: ${postLoginUrl ?? "(timeout/unchanged)"}`);
  await delay(1e3);
  const _2FA_SELECTORS = [
    'input[name="verificationCode"]',
    'input[name="verification_code"]',
    'input[name="totp_code"]',
    'input[name="security_code"]',
    'input[name="code"]',
    'input[autocomplete="one-time-code"]',
    'input[inputmode="numeric"][maxlength="6"]',
    'input[aria-label*="security" i]',
    'input[aria-label*="code" i]',
    'input[aria-label*="digit" i]',
    'input[type="tel"][maxlength="6"]',
    'input[placeholder*="code" i]'
  ].join(", ");
  const needs2FA = await wc.executeJavaScript(
    `!!(document.querySelector(${JSON.stringify(_2FA_SELECTORS)}))`
  ).catch(() => false);
  if (needs2FA) {
    if (!twoFAKey) {
      console.warn(`[doAutoLogin:${profileId}] ${_ts()} 2FA required but no 2FA key \u2014 bailing`);
      return { ok: false, message: "2FA required but no 2FA key configured for this account" };
    }
    const code = generateTotp(twoFAKey);
    console.log(`[doAutoLogin:${profileId}] ${_ts()} 2FA page detected, TOTP code generated, filling via CDP`);
    await wc.executeJavaScript(`
      (() => {
        const inp = document.querySelector(${JSON.stringify(_2FA_SELECTORS)});
        if (inp) { inp.focus(); inp.select(); }
      })()
    `).catch(() => {
    });
    await delay(150);
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", modifiers: 2, key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", modifiers: 2, key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Delete", code: "Delete", windowsVirtualKeyCode: 46 });
    await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Delete", code: "Delete", windowsVirtualKeyCode: 46 });
    await delay(80);
    await typeTextCDP(wc.debugger, code, { minDelay: 40, maxDelay: 100 });
    console.log(`[doAutoLogin:${profileId}] ${_ts()} TOTP code typed, submitting 2FA form`);
    await delay(300);
    const tf2Submitted = await wc.executeJavaScript(`
      (() => {
        const b = document.querySelector('button[type="submit"]')
          || Array.from(document.querySelectorAll('button')).find(b => {
              const t = (b.innerText || b.textContent || '').trim();
              const r = b.getBoundingClientRect();
              return /continue|confirm|verify|submit/i.test(t) && r.width > 60 && !b.disabled;
            });
        if (!b || b.disabled) return false;
        b.click();
        return true;
      })()
    `).catch(() => false);
    if (!tf2Submitted) {
      console.warn(`[doAutoLogin:${profileId}] ${_ts()} 2FA submit button not found \u2014 falling back to Tab Tab Tab Enter`);
      await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
      await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
      await delay(80);
      await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
      await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
      await delay(80);
      await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
      await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
      await delay(120);
      await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
      await delay(60);
      await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
    }
    await waitForNav(
      wc,
      (url) => url.includes("instagram.com") && !url.includes("accounts/login"),
      2e4
    );
    await delay(1e3);
  }
  const finalUrl = wc.getURL();
  console.log(`[doAutoLogin:${profileId}] ${_ts()} final URL: ${finalUrl.slice(0, 120)}`);
  if (finalUrl.includes("update_risky_contactpoint") || finalUrl.includes("/challenge/")) {
    console.warn(`[doAutoLogin:${profileId}] ${_ts()} CHALLENGE detected \u2014 ${finalUrl.slice(0, 120)}`);
    return { ok: false, message: `Instagram challenge detected: ${finalUrl}` };
  }
  if (finalUrl.includes("accounts/suspended")) {
    console.warn(`[doAutoLogin:${profileId}] ${_ts()} SUSPENDED page detected`);
    return { ok: false, message: `Instagram is asking this account to confirm it is human (URL: ${finalUrl.slice(0, 80)})` };
  }
  if (finalUrl.includes("accounts/disabled")) {
    console.warn(`[doAutoLogin:${profileId}] ${_ts()} DISABLED/security-verification page detected`);
    return { ok: false, message: `Instagram showed a security verification page during automated login. Open the embedded browser for this account, log in manually, then click Verify again.` };
  }
  const sessionCookies = await ses.cookies.get({ name: "sessionid", domain: ".instagram.com" });
  if (!sessionCookies.length) {
    const errText = await wc.executeJavaScript(`
      (() => {
        const el = document.querySelector('#slfErrorAlert, [data-testid="login-error-message"], form p[role="alert"], ._ab2z');
        return el ? el.textContent.trim().slice(0, 200) : "";
      })()
    `).catch(() => "");
    console.error(`[doAutoLogin:${profileId}] ${_ts()} NO SESSION COOKIE after login \u2014 errText="${errText}"`);
    return { ok: false, message: errText || "Login failed \u2014 no session cookie after submission" };
  }
  await syncCookies(profileId, ses);
  console.log(`[doAutoLogin:${profileId}] ${_ts()} LOGIN SUCCESS \u2014 session cookie confirmed`);
  return { ok: true, message: "Login successful" };
}
async function openEbWindow(opts) {
  const { profileId, username, proxy, userAgent, apiUA, password, twoFAKey, ebFingerprint, initialUrl, verifyMode, useHomeIp, silentMode } = opts;
  const isGhostBrowser = profileId === -1;
  const jsToken = Math.random().toString(36).slice(2, 8);
  _ebCrashLog(profileId, `STEP-1: openEbWindow entry \u2014 username=@${username} proxy=${proxy ? proxy.host + ":" + proxy.port : "none"}`);
  const existing = ebMap.get(profileId);
  if (existing && !existing.win.isDestroyed()) {
    if (profileId === -1) {
      try {
        existing.win.destroy();
      } catch {
      }
      ebMap.delete(profileId);
      tabsStateMap.delete(profileId);
      toolbarViewMap.delete(profileId);
    } else {
      const newProxyKey = proxy ? `${proxy.type || "http"}:${proxy.host}:${proxy.port}` : "direct";
      const oldProxyKey = existing.proxy ? `${existing.proxy.type || "http"}:${existing.proxy.host}:${existing.proxy.port}` : "direct";
      const proxyChanged = newProxyKey !== oldProxyKey;
      const existingSes = import_electron.session.fromPartition(existing.partition);
      if (proxy) {
        try {
          await existingSes.clearHostResolverCache();
        } catch {
        }
        await existingSes.setProxy(buildProxyConfig(proxy));
        await new Promise((r) => setTimeout(r, 150));
        await existingSes.setProxy(buildProxyConfig(proxy));
      } else {
        await existingSes.setProxy({ mode: "direct" });
      }
      try {
        existingSes.setWebRTCIPHandlingPolicy("disable_non_proxied_udp");
      } catch {
      }
      try {
        await existingSes.clearHostResolverCache();
      } catch {
      }
      if (proxyChanged) {
        console.log(`[ebManager:${profileId}] Proxy changed (${oldProxyKey} \u2192 ${newProxyKey}), updating session proxy`);
        ebMap.set(profileId, { ...existing, proxy });
        existing.win.webContents.reload();
      }
      const _wasHidden = !existing.win.isVisible();
      if (existing.win.isMinimized()) existing.win.restore();
      existing.win.setSkipTaskbar(false);
      if (!isGhostBrowser && !existing.win.isMaximized()) {
        const _eb = existing.win.getBounds();
        const _disp = eScreen.getDisplayNearestPoint({ x: _eb.x, y: _eb.y });
        existing.win.setBounds(_disp.workArea);
      }
      if (!existing.win.isVisible()) existing.win.show();
      existing.win.focus();
      const currentUrl = existing.win.webContents.getURL();
      {
        const _tv = toolbarViewMap.get(profileId);
        if (_tv && !_tv.webContents.isDestroyed()) {
          _tv.webContents.executeJavaScript(
            `window.updateUrl && window.updateUrl(${JSON.stringify(currentUrl || "")})`
          ).catch(() => {
          });
        }
      }
      if (!currentUrl || currentUrl.startsWith("chrome-error://") || currentUrl === "about:blank") {
        const existingSes2 = import_electron.session.fromPartition(existing.partition);
        const existingSessionCks = await existingSes2.cookies.get({ name: "sessionid", domain: ".instagram.com" });
        existing.win.webContents.loadURL(
          existingSessionCks.length > 0 ? "https://www.instagram.com/" : "https://www.instagram.com/accounts/login/"
        ).catch(() => {
        });
      } else if (_wasHidden) {
        const isSafe = currentUrl.includes("instagram.com") && !currentUrl.includes("challenge") && !currentUrl.includes("two_factor") && !currentUrl.includes("2fa");
        if (isSafe) {
          existing.win.webContents.reload();
        }
      }
      {
        const _reusedProxyLine = proxy ? `\u2713 ${proxy.type || "http"}://${proxy.host}:${proxy.port}${proxyChanged ? " (proxy updated)" : " (unchanged, re-applied)"}` : useHomeIp ? "DISABLED \u2014 OS resolver (no proxy in this session)" : "DISABLED";
        console.log(
          `[eb-shield:${profileId}] @${username} \u2500\u2500 REUSED WINDOW \u2014 LEAK PROTECTION RECONFIRMED
  proxy       : ${_reusedProxyLine}
  webrtc      : \u2713 disable_non_proxied_udp (re-applied to existing session)
  doh         : persists from initial window open (session-level config survives reuse)
  quic        : DISABLED (app-level --disable-quic flag)
  ipv6        : DISABLED (app-level --disable-ipv6 flag)
  dns-prefetch: DISABLED (app-level --dns-prefetch-disable flag)
  dns-cache   : FLUSHED (clearHostResolverCache)
  note        : existing window reused \u2014 openEbWindow did not run fresh`
        );
      }
      return;
    }
  }
  const partition = profileId === -1 ? `eb-ghost-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` : `persist:eb-${profileId}`;
  _ebCrashLog(profileId, `STEP-2: creating session partition="${partition}"`);
  const ses = import_electron.session.fromPartition(partition);
  _ebCrashLog(profileId, "STEP-3: session created");
  if (proxy) {
    const cfg = buildProxyConfig(proxy);
    _ebCrashLog(profileId, `STEP-4: setting proxy type=${proxy.type || "http"} host=${proxy.host}:${proxy.port}`);
    await ses.setProxy(cfg);
    _ebCrashLog(profileId, "STEP-5: proxy set (first pass)");
  } else if (useHomeIp) {
    _ebCrashLog(profileId, `STEP-4: useHomeIp=true \u2014 running DIRECT (home broadband) for @${username}`);
    await ses.setProxy({ mode: "direct" });
    _ebCrashLog(profileId, "STEP-5: direct mode set");
  } else {
    _ebCrashLog(profileId, `STEP-4: BLOCKED \u2014 no proxy assigned for @${username} (profileId=${profileId})`);
    throw new Error(`[IP-LEAK BLOCKED] Embedded browser for @${username} has no proxy assigned. Assign a proxy to this account before opening the browser.`);
  }
  let _webrtcApplied = false;
  try {
    ses.setWebRTCIPHandlingPolicy("disable_non_proxied_udp");
    _webrtcApplied = true;
  } catch {
  }
  let _dohApplied = false;
  try {
    ses.setDnsOverHttpsConfig?.({ enabled: false });
    _dohApplied = true;
  } catch {
  }
  try {
    await ses.clearHostResolverCache();
  } catch {
  }
  _ebCrashLog(profileId, "STEP-6: DNS cache cleared, registering webRequest hooks");
  {
    const proxyLine = proxy ? `${proxy.type || "http"}://${proxy.host}:${proxy.port}` : useHomeIp ? "DIRECT (home broadband)" : "\u26A0 NONE \u2014 session blocked before reaching here";
    const dohNote = proxy ? "DISABLED \u2014 proxy handles DNS resolution" : useHomeIp ? "DISABLED \u2014 OS resolver (no proxy in this session)" : "DISABLED";
    const webrtcLine = _webrtcApplied ? "\u2713 disable_non_proxied_udp (session-level + app-level flag)" : "\u26A0 session-level API unavailable \u2014 app-level flag only";
    const dohLine = _dohApplied ? `\u2713 ${dohNote}` : `\u26A0 setDnsOverHttpsConfig unavailable \u2014 ${dohNote}`;
    console.log(
      `[eb-shield:${profileId}] @${username} \u2500\u2500 LEAK PROTECTION ACTIVE
  proxy       : ${proxyLine}
  webrtc      : ${webrtcLine}
  doh         : ${dohLine}
  quic        : DISABLED (app-level --disable-quic flag)
  ipv6        : DISABLED (app-level --disable-ipv6 flag)
  dns-prefetch: DISABLED (app-level --dns-prefetch-disable flag)
  dns-cache   : FLUSHED (clearHostResolverCache)`
    );
  }
  (async () => {
    try {
      const existing2 = await ses.cookies.get({ name: "ig_nrcb", domain: ".instagram.com" });
      if (existing2.length === 0) {
        await ses.cookies.set({
          url: "https://www.instagram.com",
          name: "ig_nrcb",
          value: "1",
          domain: ".instagram.com",
          path: "/",
          secure: true,
          sameSite: "lax",
          expirationDate: Math.floor(Date.now() / 1e3) + 365 * 24 * 3600
        });
        console.log(`[ebManager:${profileId}] ig_nrcb pre-seeded for fresh session`);
      }
    } catch {
    }
  })();
  ses.webRequest.onBeforeRequest(
    { urls: ["*://www.instagram.com/accounts/scraping_warning/*"] },
    (details, callback) => {
      if (details.resourceType !== "mainFrame" && details.resourceType !== "subFrame") {
        callback({});
        return;
      }
      try {
        const u = new URL(details.url);
        const nextRaw = u.searchParams.get("next");
        if (nextRaw && nextRaw.includes("/consent/")) {
          console.warn(`[ebManager:${profileId}] scraping_warning (cookie-consent loop) \u2014 redirecting to consent page`);
          callback({ redirectURL: nextRaw });
        } else {
          console.warn(`[ebManager:${profileId}] scraping_warning (interactive challenge) \u2014 letting Chrome load it`);
          callback({});
        }
      } catch {
        callback({ redirectURL: "https://www.instagram.com/accounts/login/" });
      }
    }
  );
  ses.webRequest.onHeadersReceived((details, callback) => {
    const headers = { ...details.responseHeaders };
    for (const key of Object.keys(headers)) {
      const lower = key.toLowerCase();
      if (lower === "content-security-policy" || lower === "content-security-policy-report-only" || lower === "x-frame-options") {
        delete headers[key];
      }
    }
    callback({ responseHeaders: headers });
  });
  ses.webRequest.onBeforeSendHeaders((details, callback) => {
    const headers = details.requestHeaders;
    headers["Accept-Language"] = "en-US,en;q=0.9";
    callback({ requestHeaders: headers });
  });
  if (proxy) {
    _ebCrashLog(profileId, "STEP-7: proxy double-set start");
    await ses.setProxy(buildProxyConfig(proxy));
    await new Promise((r) => setTimeout(r, 150));
    await ses.setProxy(buildProxyConfig(proxy));
    _ebCrashLog(profileId, "STEP-8: proxy double-set done");
  }
  _ebCrashLog(profileId, "STEP-8b: exit-IP audit start");
  {
    let _auditServerIp = "unknown";
    let _auditExitIp = "unknown";
    let _auditLeaking = false;
    try {
      const _body = await _directHttpsGet("https://api4.ipify.org?format=json", 5e3);
      if (_body) _auditServerIp = JSON.parse(_body).ip ?? "unknown";
    } catch {
    }
    if (proxy) {
      try {
        const _sesRes = await Promise.race([
          ses.fetch("https://api4.ipify.org?format=json").then((r) => r.json()),
          new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 8e3))
        ]);
        _auditExitIp = _sesRes?.ip ?? "fetch-failed";
      } catch (e) {
        _auditExitIp = `FETCH-FAILED(${String(e?.message ?? "unknown").slice(0, 60)})`;
      }
      _auditLeaking = _auditServerIp !== "unknown" && !_auditExitIp.startsWith("FETCH-FAILED") && _auditExitIp !== "unknown" && _auditServerIp === _auditExitIp;
    }
    const _auditMsg = `[EB-IP-AUDIT:${profileId}] @${username}
  server-real-ip  : ${_auditServerIp}
  browser-exit-ip : ${_auditExitIp}
  proxy           : ${proxy ? `${proxy.type || "http"}://${proxy.host}:${proxy.port}` : "NONE"}
  LEAKING         : ${_auditLeaking ? "\u26A0 YES \u2014 browser is routing through server real IP \u2014 PROXY NOT WORKING" : proxy ? "\u2713 NO \u2014 exit IP differs from server IP \u2014 proxy routing correctly" : "\u26A0 NO PROXY CONFIGURED"}`;
    console.log(_auditMsg);
    _ebCrashLog(profileId, _auditLeaking ? `STEP-8b: \u26A0 IP LEAK \u2014 exitIp=${_auditExitIp} === serverIp=${_auditServerIp}` : `STEP-8b: audit done \u2014 exitIp=${_auditExitIp} serverIp=${_auditServerIp} leak=false`);
    _ipcLog(_auditMsg);
    if (_auditLeaking) {
      console.error(
        `[EB-IP-AUDIT:${profileId}] \u26A0\u26A0\u26A0 PROXY NOT ROUTING \u2014 @${username} is exposing real server IP (${_auditServerIp}) to Instagram \u26A0\u26A0\u26A0`
      );
    }
    _ebIpAudits.set(profileId, {
      profileId,
      username,
      serverIp: _auditServerIp,
      exitIp: _auditExitIp,
      proxy: proxy ? `${proxy.type || "http"}://${proxy.host}:${proxy.port}` : null,
      proxyHost: proxy?.host ?? null,
      leaking: _auditLeaking,
      checkedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  _ebCrashLog(profileId, "STEP-8b: exit-IP audit done");
  _ebCrashLog(profileId, "STEP-9: loading cookies from file");
  await loadCookiesFromFile(profileId, ses);
  _ebCrashLog(profileId, "STEP-10: cookies loaded");
  const _isApiFormat = !!userAgent && isApiFormatUA(userAgent);
  const _apiParsed = _isApiFormat ? apiUAToBrowserUA(userAgent) : null;
  let _browserUA = _isApiFormat ? _apiParsed.browserUA : userAgent ?? null;
  const _resolvedApiUA = _isApiFormat ? userAgent : apiUA ?? null;
  const _androidVer = _apiParsed?.androidVersion ?? (_browserUA?.match(/Android\s+(\d+)/i)?.[1] ?? "14");
  const _deviceModel = _apiParsed?.deviceModel ?? (_browserUA?.match(/Android\s+\d+;\s*([^)]+)\)/i)?.[1]?.trim() ?? "");
  if (_isApiFormat) {
    console.log(`[ebManager:${profileId}] API-format UA converted \u2192 browserUA="${_browserUA}" apiUA="${userAgent}"`);
  }
  let _fpIsMobile = !!_browserUA && (_browserUA.includes("Mobile") || isApiFormatUA(_browserUA));
  const _fpChromeMajor = _browserUA?.match(/Chrome\/(\d+)/)?.[1] ?? CURRENT_CHROME_MAJOR;
  if (!isGhostBrowser && !verifyMode && _browserUA) {
    const storedMajorN = parseInt(_fpChromeMajor, 10);
    const currentMajorN = parseInt(CURRENT_CHROME_MAJOR, 10);
    if (storedMajorN < currentMajorN) {
      const newBuildInfo = getChromeBuildInfo(CURRENT_CHROME_MAJOR);
      const newBrowserUA = rewriteChromeMajorInUA(_browserUA, newBuildInfo.full);
      console.log(`[ebManager:${profileId}] Chrome UA bump: ${_fpChromeMajor} \u2192 ${CURRENT_CHROME_MAJOR} (${_browserUA.slice(0, 60)} \u2192 ${newBrowserUA.slice(0, 60)})`);
      _browserUA = newBrowserUA;
      pushUABumpToServer(profileId, newBrowserUA);
    }
  }
  const _fpChromeMajorFinal = _browserUA?.match(/Chrome\/(\d+)/)?.[1] ?? CURRENT_CHROME_MAJOR;
  const _fpBuildInfo = getChromeBuildInfo(_fpChromeMajorFinal);
  let _resolvedTz = null;
  let _fpScript;
  const _mobileProfile = !isGhostBrowser && !verifyMode && _fpIsMobile ? getMobileDeviceProfile(_browserUA, _resolvedApiUA ?? null) : null;
  _ebCrashLog(profileId, "STEP-11: creating BrowserWindow");
  let _initX;
  let _initY;
  if (isGhostBrowser || verifyMode || silentMode) {
    const { width: sw, height: sh } = eScreen.getPrimaryDisplay().workAreaSize;
    const ww = 430;
    const wh = 700;
    if (isGhostBrowser) {
      _initX = Math.max(0, sw - ww - 8);
      _initY = Math.max(0, Math.floor((sh - wh) / 2));
    } else {
      _initX = sw + 10;
      _initY = Math.max(0, Math.floor((sh - wh) / 2));
    }
  }
  const win2 = new import_electron.BrowserWindow({
    width: isGhostBrowser || verifyMode ? 430 : 1280,
    height: isGhostBrowser || verifyMode ? 700 : 820,
    x: _initX,
    y: _initY,
    title: `@${username} \u2014 Equinox Browser`,
    icon: _iconPath || void 0,
    autoHideMenuBar: true,
    show: false,
    // Verify-mode windows are positioned off-screen so they never appear in the
    // taskbar or alt-tab switcher — the user should not see or interact with them.
    skipTaskbar: verifyMode || silentMode ? true : false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      // CRITICAL: prevents Electron from injecting window.require /
      // window.process into the renderer main-world. contextIsolation alone is
      // insufficient in some Electron builds — window.require is still injected
      // as a non-configurable property that page-script suppressors cannot delete.
      // sandbox:true fully sandboxes the renderer; the preload still works because
      // it only uses contextBridge + ipcRenderer, both available in sandbox mode.
      backgroundThrottling: false,
      // CRITICAL: prevents Chromium from throttling timers,
      // animations, and rendering when the window is hidden or off-screen.
      // Without this flag, waitFor() always times out, DOM elements never appear,
      // and every browser action (follow, stories, reels) silently returns 0.
      partition
      // NOTE: ebToolbarPreload.js is intentionally NOT loaded on the main window.
      // That preload runs contextBridge.exposeInMainWorld("__eq", ...) which would
      // place window.__eq on the Instagram page's main world — a detectable branded
      // global.  The toolbar BrowserView (created below) carries the preload instead;
      // it has its own isolated renderer context so __eq stays out of the page.
    }
  });
  win2.once("ready-to-show", () => {
    if (win2.isDestroyed()) return;
    if (silentMode) {
      win2.showInactive();
      return;
    }
    if (isGhostBrowser || verifyMode) {
      if (verifyMode) {
        win2.showInactive();
      } else {
        win2.show();
      }
    } else {
      win2.show();
      win2.maximize();
    }
  });
  _ebCrashLog(profileId, "STEP-12: BrowserWindow created, registering in ebMap");
  ebMap.set(profileId, { win: win2, username, proxy, partition, jsToken });
  _ebCrashLog(profileId, "STEP-13: ebMap early-registration done");
  if (proxy) {
    win2.webContents.on("did-start-loading", () => {
      ses.setProxy(buildProxyConfig(proxy)).catch(() => {
      });
      ses.clearHostResolverCache().catch(() => {
      });
    });
    win2.webContents.on("did-finish-load", () => {
      ses.setProxy(buildProxyConfig(proxy)).catch(() => {
      });
    });
    win2.webContents.on("did-navigate", (_evt, url) => {
      ses.setProxy(buildProxyConfig(proxy)).catch(() => {
      });
    });
  }
  let _lastKnownGoodUrl = "";
  const _detectSessionDeath = (_evt, url) => {
    if (/instagram\.com(?:\/[a-z]{2}(?:-[a-z]{2})?)?\/accounts\/login/i.test(url)) {
      console.warn(
        `[eb-session-dead:${profileId}] @${username} BROWSER LOGGED OUT \u2014 login redirect detected at ${(/* @__PURE__ */ new Date()).toISOString()} \u2014 login URL="${url.slice(0, 200)}" \u2014 prior URL="${_lastKnownGoodUrl.slice(0, 200)}" \u2014 partition=persist:eb-${profileId} \u2014 server-side session revocation; account needs re-verify`
      );
    } else if (url.includes("instagram.com")) {
      _lastKnownGoodUrl = url;
    }
  };
  win2.webContents.on("did-navigate", _detectSessionDeath);
  win2.webContents.on("did-redirect-navigation", _detectSessionDeath);
  if (win2.isDestroyed()) {
    _ebCrashLog(profileId, "GUARD-1: window destroyed \u2014 returning early");
    return;
  }
  _ebCrashLog(profileId, "STEP-14: guard-1 passed, attaching debugger");
  try {
    win2.webContents.debugger.attach("1.3");
  } catch {
  }
  wireHeaderCapture(win2.webContents, profileId);
  if (proxy) {
    _ebCrashLog(profileId, `STEP-15: starting timezone fetch for ${proxy.host}`);
    if (_tzCache.has(proxy.host)) {
      _resolvedTz = _tzCache.get(proxy.host);
      _ebCrashLog(profileId, `STEP-15b: timezone cache hit tz=${_resolvedTz}`);
    } else {
      try {
        const _tzAc = new AbortController();
        const _tzTimer = setTimeout(() => _tzAc.abort(), 5e3);
        const tzRes = await ses.fetch(
          `http://ip-api.com/json/${encodeURIComponent(proxy.host)}?fields=timezone`,
          { signal: _tzAc.signal }
        );
        clearTimeout(_tzTimer);
        const tzJson = await tzRes.json();
        if (tzJson.timezone) {
          _resolvedTz = tzJson.timezone;
          _tzCache.set(proxy.host, _resolvedTz);
        }
      } catch {
      }
    }
    _ebCrashLog(profileId, `STEP-16: timezone fetch done tz=${_resolvedTz ?? "none"}`);
    if (_resolvedTz) {
      try {
        await Promise.race([
          win2.webContents.debugger.sendCommand(
            "Emulation.setTimezoneOverride",
            { timezoneId: _resolvedTz }
          ),
          new Promise((r) => setTimeout(r, 2e3))
        ]);
      } catch {
      }
    }
    _ebCrashLog(profileId, "STEP-17: CDP timezone done");
  }
  _fpScript = buildFingerprintScript(_fpIsMobile, _resolvedApiUA ?? null, ebFingerprint ?? null, _fpBuildInfo.full, _fpBuildInfo.grease, _fpBuildInfo.greaseVer, _resolvedTz, _browserUA);
  void (async () => {
    try {
      await win2.webContents.debugger.sendCommand("Page.enable");
      await win2.webContents.debugger.sendCommand("Page.addScriptToEvaluateOnNewDocument", { source: ELECTRON_LEAK_SUPPRESSOR_JS });
      await win2.webContents.debugger.sendCommand("Page.addScriptToEvaluateOnNewDocument", { source: WEBRTC_BLOCKER_JS });
      await win2.webContents.debugger.sendCommand("Page.addScriptToEvaluateOnNewDocument", { source: _fpScript });
      await win2.webContents.debugger.sendCommand("Page.addScriptToEvaluateOnNewDocument", { source: DAILY_LIMIT_DISMISSER_JS });
    } catch (err) {
      console.warn(`[ebManager:${profileId}] Page/script injection (fire-and-forget) failed:`, err);
    }
  })();
  if (_browserUA) {
    win2.webContents.setUserAgent(_browserUA);
    _ebCrashLog(profileId, `STEP-17b: Electron setUserAgent applied (${_browserUA.slice(0, 60)})`);
  }
  _ebCrashLog(profileId, `STEP-18: UA override \u2014 browserUA=${_browserUA ? _browserUA.slice(0, 60) : "none"} mobile=${_fpIsMobile}`);
  if (_browserUA) {
    try {
      const _desktopMeta2 = _fpIsMobile ? null : buildDesktopUAMetadata(_browserUA);
      await Promise.race([
        win2.webContents.debugger.sendCommand("Emulation.setUserAgentOverride", {
          userAgent: _browserUA,
          acceptLanguage: "en-US,en;q=0.9",
          platform: _fpIsMobile ? "Linux armv8l" : _desktopMeta2.navigatorPlatform,
          userAgentMetadata: {
            brands: [
              { brand: _fpBuildInfo.grease, version: _fpBuildInfo.greaseVer },
              { brand: "Chromium", version: _fpChromeMajorFinal },
              { brand: "Google Chrome", version: _fpChromeMajorFinal }
            ],
            fullVersionList: [
              { brand: _fpBuildInfo.grease, version: _fpBuildInfo.greaseVer + ".0.0.0" },
              { brand: "Chromium", version: _fpBuildInfo.full },
              { brand: "Google Chrome", version: _fpBuildInfo.full }
            ],
            platform: _fpIsMobile ? "Android" : _desktopMeta2.platform,
            platformVersion: _fpIsMobile ? _androidVer : _desktopMeta2.platformVersion,
            architecture: _fpIsMobile ? "arm" : _desktopMeta2.architecture,
            model: _fpIsMobile ? _deviceModel : "",
            mobile: _fpIsMobile,
            bitness: _fpIsMobile ? "64" : _desktopMeta2.bitness,
            wow64: false
          }
        }),
        new Promise((r) => setTimeout(r, 1500))
      ]);
      _ebCrashLog(profileId, "STEP-19: UA CDP override applied");
    } catch (uaErr) {
      _ebCrashLog(profileId, `STEP-19: UA CDP override FAILED: ${uaErr?.message}`);
    }
  }
  await new Promise((r) => setTimeout(r, 100));
  if (win2.isDestroyed()) {
    _ebCrashLog(profileId, "GUARD-1b: window destroyed after UA CDP \u2014 returning early");
    return;
  }
  if (_fpIsMobile && !win2.isDestroyed()) {
    _ebCrashLog(profileId, `STEP-20: setTouchEmulationEnabled (mobile ghost/verify window)`);
    try {
      await Promise.race([
        win2.webContents.debugger.sendCommand("Emulation.setTouchEmulationEnabled", {
          enabled: true,
          maxTouchPoints: 10
        }),
        new Promise((r) => setTimeout(r, 3e3))
      ]);
      _ebCrashLog(profileId, "STEP-20b: touch emulation enabled");
    } catch (teErr) {
      _ebCrashLog(profileId, `STEP-20b: touch emulation FAILED: ${teErr?.message}`);
    }
  }
  await new Promise((r) => setTimeout(r, 100));
  if (win2.isDestroyed()) {
    _ebCrashLog(profileId, "GUARD-1d: window destroyed before locale \u2014 returning early");
    return;
  }
  _ebCrashLog(profileId, "STEP-22: setLocaleOverride");
  try {
    await Promise.race([
      win2.webContents.debugger.sendCommand("Emulation.setLocaleOverride", { locale: "en-US" }),
      new Promise((r) => setTimeout(r, 3e3))
    ]);
  } catch {
  }
  _ebCrashLog(profileId, "STEP-23: locale done");
  if (win2.isDestroyed()) {
    _ebCrashLog(profileId, "GUARD-2: window destroyed after CDP \u2014 returning early");
    return;
  }
  _ebCrashLog(profileId, "STEP-24: guard-2 passed, registering window handlers");
  win2.webContents.setWindowOpenHandler(({ url }) => {
    if (url && !url.startsWith("about:") && !url.startsWith("chrome-error://")) {
      win2.webContents.loadURL(url).catch(() => {
      });
    }
    return { action: "deny" };
  });
  win2.on("closed", () => {
    ebMap.delete(profileId);
  });
  win2.webContents.on("login", (event, _req, _authInfo, callback) => {
    event.preventDefault();
    const current = ebMap.get(profileId);
    callback(current?.proxy?.user ?? "", current?.proxy?.pass ?? "");
  });
  if (_browserUA) {
    win2.webContents.setUserAgent(_browserUA);
  }
  ebMap.set(profileId, { win: win2, username, proxy, partition, jsToken });
  win2.webContents.on("dom-ready", () => {
    if (win2.isDestroyed()) return;
    win2.webContents.executeJavaScript(WEBRTC_BLOCKER_JS).catch(() => {
    });
    win2.webContents.executeJavaScript(_fpScript).catch(() => {
    });
    win2.webContents.executeJavaScript(DAILY_LIMIT_DISMISSER_JS).catch(() => {
    });
    if (isGhostBrowser) {
      try {
        win2.webContents.debugger.sendCommand("Emulation.setDeviceMetricsOverride", {
          width: 393,
          height: 851,
          deviceScaleFactor: 2.75,
          mobile: true
        }).catch(() => {
        });
        win2.webContents.debugger.sendCommand("Emulation.setTouchEmulationEnabled", {
          enabled: true,
          maxTouchPoints: 10
        }).catch(() => {
        });
        win2.webContents.debugger.sendCommand("Emulation.setEmulatedMedia", {
          features: [
            { name: "hover", value: "none" },
            { name: "any-hover", value: "none" },
            { name: "pointer", value: "coarse" },
            { name: "any-pointer", value: "coarse" }
          ]
        }).catch(() => {
        });
      } catch {
      }
    }
  });
  let chromeErrorRecoveryCount = 0;
  win2.webContents.on("did-navigate", async (_e, navUrl) => {
    if (navUrl.startsWith("chrome-error://")) {
      fetch(`http://127.0.0.1:${_serverPort}/api/profiles/${profileId}/eb-nav`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: navUrl })
      }).catch(() => {
      });
      chromeErrorRecoveryCount++;
      console.warn(`[ebManager] chrome-error for @${username} (#${chromeErrorRecoveryCount})`);
      if (chromeErrorRecoveryCount <= 3) {
        await new Promise((r) => setTimeout(r, 2e3));
        if (!win2.isDestroyed()) {
          const recoveryCks = await ses.cookies.get({ name: "sessionid", domain: ".instagram.com" });
          win2.webContents.loadURL(
            recoveryCks.length > 0 ? "https://www.instagram.com/" : "https://www.instagram.com/accounts/login/"
          ).catch(() => {
          });
        }
      }
      return;
    }
    chromeErrorRecoveryCount = 0;
    if (navUrl.includes("/accounts/scraping_warning")) {
      _ebLog(`\u26A0\uFE0F scraping_warning page detected for @${username} \u2014 injecting overlay`);
      await new Promise((r) => setTimeout(r, 2e3));
      if (!win2.isDestroyed()) {
        win2.webContents.executeJavaScript(`
          (function() {
            if (document.body && document.body.children.length > 0) return; // page has content
            var _swId = '__eq${jsToken}_sw';
            if (document.getElementById(_swId)) return;
            var d = document.createElement('div');
            d.id = _swId;
            d.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,sans-serif;padding:32px;text-align:center;box-sizing:border-box;';
            d.innerHTML = '<div style="font-size:40px;margin-bottom:12px">\u26A0\uFE0F</div>'
              + '<div style="font-size:18px;font-weight:700;color:#111;margin-bottom:8px">Automated Behaviour Detected</div>'
              + '<div style="font-size:13px;color:#555;max-width:380px;line-height:1.5">Instagram has flagged this account. You may need to log in manually, solve any challenge shown, and then re-verify the account in Equinox once the session is restored.</div>'
              + '<div style="margin-top:18px;font-size:11px;color:#999">Account: ' + ${JSON.stringify(username)} + '</div>';
            (document.body || document.documentElement).appendChild(d);
          })()
        `).catch(() => {
        });
      }
    }
    fetch(`http://127.0.0.1:${_serverPort}/api/profiles/${profileId}/eb-nav`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: navUrl })
    }).catch(() => {
    });
    {
      const tv = toolbarViewMap.get(profileId);
      if (tv && !tv.webContents.isDestroyed()) {
        tv.webContents.executeJavaScript(
          `window.updateUrl && window.updateUrl(${JSON.stringify(navUrl)})`
        ).catch(() => {
        });
      }
    }
    if (navUrl.includes("instagram.com/consent/") && navUrl.includes("user_cookie_choice")) {
      console.log(`[ebManager:${profileId}] consent page loaded \u2014 auto-accepting cookies`);
      await new Promise((r) => setTimeout(r, 1800));
      if (!win2.isDestroyed()) {
        win2.webContents.executeJavaScript(`
          (function() {
            var btns = Array.from(document.querySelectorAll('button,[role="button"]'));
            var accept = btns.find(function(b) {
              var t = (b.textContent || b.getAttribute('aria-label') || '').toLowerCase().trim();
              return t.includes('allow') || t.includes('accept') || t.includes('akzept') ||
                     t.includes('accepter') || t.includes('izin') || t.includes('kabul') ||
                     t.includes('alle') || t.includes('tout');
            });
            if (accept) { accept.click(); return 'clicked:' + accept.textContent.trim().slice(0,30); }
            // Fallback: first non-decline button
            var fallback = btns.find(function(b) {
              var t = (b.textContent || '').toLowerCase().trim();
              return !t.includes('decline') && !t.includes('reject') && !t.includes('refuse') && t.length > 2;
            });
            if (fallback) { fallback.click(); return 'fallback:' + fallback.textContent.trim().slice(0,30); }
            return 'no-button-found';
          })()
        `).then((r) => {
          console.log(`[ebManager:${profileId}] consent auto-accept result: ${r}`);
        }).catch(() => {
        });
      }
      return;
    }
    if (!navUrl.includes("instagram.com")) return;
    await new Promise((r) => setTimeout(r, 600));
    await syncCookies(profileId, ses);
  });
  if (win2.isDestroyed()) {
    _ebCrashLog(profileId, "GUARD-3: window destroyed before BrowserView \u2014 returning early");
    return;
  }
  _ebCrashLog(profileId, "STEP-25: creating BrowserView toolbar");
  const toolbarView = new import_electron.BrowserView({
    webPreferences: {
      partition,
      // same session so cookies are visible if needed
      preload: import_path.default.join(__dirname, "ebToolbarPreload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      // prevent window.require leak (see main EB window comment)
      backgroundThrottling: false
      // keep toolbar clock/URL bar live when window is hidden
    }
  });
  _ebCrashLog(profileId, "STEP-26: BrowserView created, calling addBrowserView");
  win2.addBrowserView(toolbarView);
  _ebCrashLog(profileId, "STEP-27: addBrowserView done");
  toolbarViewMap.set(profileId, toolbarView);
  tabsStateMap.set(profileId, {
    tabs: [{ id: 0, url: "", title: `@${username}` }],
    activeId: 0,
    nextId: 1,
    views: /* @__PURE__ */ new Map()
  });
  toolbarView.webContents.once("did-finish-load", () => {
    pushTabUpdate(profileId);
    const currentPageUrl = win2.isDestroyed() ? "" : win2.webContents.getURL();
    if (currentPageUrl && currentPageUrl !== "about:blank") {
      toolbarView.webContents.executeJavaScript(
        `window.updateUrl && window.updateUrl(${JSON.stringify(currentPageUrl)})`
      ).catch(() => {
      });
    }
  });
  const updateToolbarBounds = () => {
    if (win2.isDestroyed()) return;
    const [w, h] = win2.getContentSize();
    toolbarView.setBounds({ x: 0, y: 0, width: w, height: TOOLBAR_H });
    const ts = tabsStateMap.get(profileId);
    if (ts && ts.activeId !== 0) {
      const cv = ts.views.get(ts.activeId);
      if (cv && !cv.webContents.isDestroyed()) {
        cv.setBounds({ x: 0, y: TOOLBAR_H, width: w, height: Math.max(1, h - TOOLBAR_H) });
      }
    }
  };
  toolbarView.setAutoResize({ width: true, height: false });
  win2.on("resize", updateToolbarBounds);
  win2.once("ready-to-show", () => setImmediate(updateToolbarBounds));
  const toolbarHtml = buildNativeToolbarHtml(isGhostBrowser);
  toolbarView.webContents.loadURL(
    `data:text/html;base64,${Buffer.from(toolbarHtml).toString("base64")}`
  ).catch(() => {
  });
  const injectPageUtils = () => {
    win2.webContents.executeJavaScript(buildPageUtilsJs(void 0, jsToken)).catch(() => {
    });
  };
  win2.webContents.on("dom-ready", () => injectPageUtils());
  win2.webContents.on("did-finish-load", () => injectPageUtils());
  const _ebLog = (msg) => {
    console.log(`[ebManager:${profileId}] ${msg}`);
    if (_serverPort) {
      fetch(`http://127.0.0.1:${_serverPort}/api/profiles/${profileId}/eb-diag`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
      }).catch(() => {
      });
    }
  };
  const _COOKIE_ACCEPT_LABELS = [
    "allow all cookies",
    "accept all cookies",
    "allow all",
    "accept all",
    "allow essential and optional cookies",
    "accept cookies",
    "allow cookies",
    "alle cookies akzeptieren",
    "accepter tout",
    "aceptar todo",
    "accetta tutto",
    "till\xE5t alla",
    "alle accepteren"
  ];
  const _COOKIE_DETECT_JS = `(() => {
    const ACCEPT = ${JSON.stringify(_COOKIE_ACCEPT_LABELS)};
    function match(b) {
      if (!b || !b.getBoundingClientRect) return null;
      const r = b.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return null;
      const t = (b.innerText||b.textContent||'').trim().toLowerCase();
      if (ACCEPT.indexOf(t) === -1) return null;
      return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), label: t };
    }
    // 1. Instagram's own data attribute (most specific)
    let pos = match(document.querySelector('[data-cookiebanner="accept_button"]')
                 || document.querySelector('[data-testid="cookie-policy-banner-accept"]'));
    // 2. Inside a known cookie container
    if (!pos) {
      const c = document.querySelector('[data-cookiebanner]')
             || document.querySelector('[class*="CookieBanner"],[class*="cookie-banner"],[id*="cookie"]');
      if (c) { for (const b of c.querySelectorAll('button,[role="button"],a')) { pos = match(b); if (pos) break; } }
    }
    // 3. Anywhere on the page (exact whitelist only \u2014 safe)
    if (!pos) { for (const b of document.querySelectorAll('button,[role="button"],a')) { pos = match(b); if (pos) break; } }
    return pos;
  })()`;
  let _cookieDismissRunning = false;
  const cdpClickCookieBanner = async () => {
    if (win2.isDestroyed() || _cookieDismissRunning) return;
    _cookieDismissRunning = true;
    try {
      try {
        win2.webContents.debugger.attach("1.3");
      } catch {
      }
      for (let attempt = 0; attempt < 8; attempt++) {
        if (win2.isDestroyed()) break;
        await new Promise((r) => setTimeout(r, attempt === 0 ? 2500 : 1500));
        if (win2.isDestroyed()) break;
        const _ccUrl = win2.webContents.getURL();
        if (/instagram\.com(?:\/[a-z]{2}(?:-[a-z]{2})?)?\/accounts\/login/i.test(_ccUrl)) {
          _ebLog(`CookieCheck#${attempt + 1} url="${_ccUrl.slice(0, 120)}" \u2014 on login page (session may be expired; checking for cookie banner before exiting)`);
          console.warn(`[eb-session-dead:${profileId}] @${username} CookieCheck detected login page at attempt ${attempt + 1} \u2014 session may be dead`);
        }
        const pos = await win2.webContents.executeJavaScript(_COOKIE_DETECT_JS).catch(() => null);
        _ebLog(`CookieCheck#${attempt + 1} url="${_ccUrl.slice(0, 80)}" detect=${pos ? `FOUND label="${pos.label}" at (${pos.x},${pos.y})` : "no-banner"}`);
        if (!pos) break;
        try {
          await cdpTapGesture(win2.webContents.debugger, pos.x, pos.y);
          _ebLog(`CookieBanner: touch tap dispatched at (${pos.x},${pos.y}) label="${pos.label}"`);
        } catch (cdpErr) {
          _ebLog(`CookieBanner: touch tap failed (${cdpErr})`);
        }
        await new Promise((r) => setTimeout(r, 100));
        try {
          const _dbg = win2.webContents.debugger;
          await _dbg.sendCommand("Input.dispatchMouseEvent", { type: "mousePressed", x: pos.x, y: pos.y, button: "left", clickCount: 1, modifiers: 0, pointerType: "touch" });
          await new Promise((r) => setTimeout(r, 60));
          await _dbg.sendCommand("Input.dispatchMouseEvent", { type: "mouseReleased", x: pos.x, y: pos.y, button: "left", clickCount: 1, modifiers: 0, pointerType: "touch" });
          _ebLog(`CookieBanner: touch-typed fallback dispatched at (${pos.x},${pos.y})`);
        } catch {
        }
        await new Promise((r) => setTimeout(r, 80));
        try {
          await win2.webContents.executeJavaScript(`(function(){
            var A=${JSON.stringify(_COOKIE_ACCEPT_LABELS)};
            var b=document.querySelector('[data-cookiebanner="accept_button"]')||document.querySelector('[data-testid="cookie-policy-banner-accept"]');
            if(!b){for(var e of document.querySelectorAll('button,[role="button"],a')){var t=(e.innerText||e.textContent||'').trim().toLowerCase();if(A.indexOf(t)!==-1){b=e;break;}}}
            if(b){b.click();return true;}return false;
          })()`).catch(() => {
          });
        } catch {
        }
        await new Promise((r) => setTimeout(r, 1300));
        if (win2.isDestroyed()) break;
        const stillThere = await win2.webContents.executeJavaScript(_COOKIE_DETECT_JS).catch(() => null);
        if (!stillThere) {
          _ebLog(`CookieBanner dismissed after ${attempt + 1} attempt(s)`);
          if (!win2.isDestroyed()) {
            await new Promise((r) => setTimeout(r, 800));
            const _currentUrl = win2.webContents.getURL();
            const _isSplash = profileId !== -1 && _currentUrl.includes("instagram.com") && !_currentUrl.includes("accounts/login") && !_currentUrl.includes("two_factor") && !_currentUrl.startsWith("chrome-error://");
            if (_isSplash) {
              const _loginBtnJs = `(() => {
                const LOGIN_RE = /^log\\s*in$/i;
                function p(el) {
                  if (!el) return null;
                  const r = el.getBoundingClientRect();
                  if (r.width <= 0 || r.height <= 0) return null;
                  return { x: Math.round(r.left + r.width/2), y: Math.round(r.top + r.height/2) };
                }
                let el = document.querySelector('a[href*="accounts/login"], a[href*="/login/"]');
                if (el) { const pos = p(el); if (pos) return pos; }
                for (const e of document.querySelectorAll('a, button, [role="button"]')) {
                  const t = (e.innerText || e.textContent || '').trim();
                  if (LOGIN_RE.test(t)) { const pos = p(e); if (pos) return pos; }
                }
                return null;
              })()`;
              const _loginPos = await win2.webContents.executeJavaScript(_loginBtnJs).catch(() => null);
              if (_loginPos) {
                _ebLog(`CookieBanner post-dismiss: splash page \u2014 tapping Log In at (${_loginPos.x},${_loginPos.y})`);
                try {
                  await cdpTapGesture(win2.webContents.debugger, _loginPos.x, _loginPos.y);
                } catch {
                }
              }
            }
          }
          break;
        }
      }
    } catch (err) {
      _ebLog(`CookieBanner error: ${err}`);
    } finally {
      _cookieDismissRunning = false;
    }
  };
  win2.webContents.on("did-finish-load", () => {
    cdpClickCookieBanner().catch(() => {
    });
  });
  let _sessionAliveLastAlert = 0;
  const _sessionAliveJS = `(function() {
    var url = location.href;
    // Hard login page (URL-based)
    if (/accounts\\/login|accounts\\/onetap|accounts\\/suspended/.test(url)) {
      return { dead: true, reason: 'login-url', url: url, title: document.title };
    }
    // SPA overlay: "Continue as\u2026" button or standard "Log in" button visible
    var btns = Array.from(document.querySelectorAll('button,[role="button"]'));
    for (var i = 0; i < btns.length; i++) {
      var t = (btns[i].innerText || btns[i].textContent || '').trim();
      var tl = t.toLowerCase();
      if (tl === 'log in' || tl.startsWith('continue as')) {
        return { dead: true, reason: 'spa-overlay', trigger: t.slice(0,60), url: url, title: document.title };
      }
    }
    // Password input visible (login form rendered)
    var pwd = document.querySelector('input[type="password"]');
    if (pwd && pwd.offsetParent !== null) {
      return { dead: true, reason: 'password-input', url: url, title: document.title };
    }
    return { dead: false };
  })()`;
  const _sessionAlivePoll = setInterval(async () => {
    if (win2.isDestroyed()) {
      clearInterval(_sessionAlivePoll);
      return;
    }
    try {
      const result = await win2.webContents.executeJavaScript(_sessionAliveJS, true).catch(() => null);
      if (!result?.dead) return;
      const now = Date.now();
      if (now - _sessionAliveLastAlert < 6e4) return;
      _sessionAliveLastAlert = now;
      _ipcLog(
        `[eb-session-dead:${profileId}] @${username} SESSION DEAD DETECTED BY POLL \u2014 reason="${result.reason}" \u2014 trigger="${result.trigger ?? ""}" \u2014 url="${(result.url ?? "").slice(0, 200)}" \u2014 title="${(result.title ?? "").slice(0, 80)}" \u2014 priorUrl="${_lastKnownGoodUrl.slice(0, 200)}" \u2014 detectedAt=${new Date(now).toISOString()} \u2014 partition=persist:eb-${profileId}`
      );
    } catch {
    }
  }, 3e4);
  win2.on("closed", () => clearInterval(_sessionAlivePoll));
  if (profileId === -1) {
    win2.webContents.on("did-finish-load", () => {
      win2.webContents.executeJavaScript("window.scrollTo(0,0);").catch(() => {
      });
    });
    const _GHOST_OVERLAY_JS = `(function(){
      function rect(el){
        if(!el)return null;
        var r=el.getBoundingClientRect();
        if(r.width<=0||r.height<=0)return null;
        return{x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2)};
      }
      // 1. Standard aria-label Close selectors
      var sels=[
        '[role="dialog"] button[aria-label="Close"]',
        '[role="dialog"] button[aria-label="close"]',
        '[role="presentation"] button[aria-label="Close"]',
        '[role="presentation"] button[aria-label="close"]',
        'button[aria-label="Close"]',
        'div[role="button"][aria-label="Close"]',
      ];
      for(var i=0;i<sels.length;i++){var p=rect(document.querySelector(sels[i]));if(p)return p;}
      // 2. Detect signup/login/save-info dialogs by their text, then find the dismiss button
      var containers=Array.from(document.querySelectorAll('[role="dialog"],[role="presentation"]'));
      for(var c=0;c<containers.length;c++){
        var txt=(containers[c].innerText||containers[c].textContent||'').toLowerCase();
        var isOverlay=txt.includes('sign up')||txt.includes('never miss')||
                      txt.includes('see photos')||txt.includes('see videos')||
                      txt.includes('log in to')||txt.includes('save your login')||
                      txt.includes('turn on notifications');
        if(!isOverlay)continue;
        var btns=Array.from(containers[c].querySelectorAll('button,div[role="button"]'));
        // Prefer explicit dismiss labels
        for(var b=0;b<btns.length;b++){
          var btxt=(btns[b].innerText||btns[b].textContent||'').trim().toLowerCase();
          if(btxt==='not now'||btxt==='dismiss'||btxt==='close'||btxt===''||btxt==='\xD7'||btxt==='\u2715'){
            var p2=rect(btns[b]);if(p2)return p2;
          }
        }
        // Fallback: any button that is only an SVG icon (the X close button)
        for(var b2=0;b2<btns.length;b2++){
          if(btns[b2].querySelector('svg')&&!(btns[b2].innerText||btns[b2].textContent||'').trim().match(/[a-z]/i)){
            var p3=rect(btns[b2]);if(p3)return p3;
          }
        }
      }
      return null;
    })()`;
    let _ghostOverlayRunning = false;
    const cdpDismissGhostOverlay = async () => {
      if (win2.isDestroyed() || _ghostOverlayRunning || ebMap.get(-1)?.warmupActive) return;
      _ghostOverlayRunning = true;
      try {
        try {
          win2.webContents.debugger.attach("1.3");
        } catch {
        }
        for (let attempt = 0; attempt < 6; attempt++) {
          if (win2.isDestroyed()) break;
          await new Promise((r) => setTimeout(r, attempt === 0 ? 3e3 : 2e3));
          if (win2.isDestroyed()) break;
          const pos = await win2.webContents.executeJavaScript(_GHOST_OVERLAY_JS).catch(() => null);
          if (!pos) break;
          const beforeUrl = win2.isDestroyed() ? "" : win2.webContents.getURL();
          _ebLog(`GhostOverlay#${attempt + 1}: overlay at (${pos.x},${pos.y}), touch tap (beforeUrl=${beforeUrl.slice(0, 80)})`);
          try {
            await cdpTapGesture(win2.webContents.debugger, pos.x, pos.y);
          } catch (cdpErr) {
            _ebLog(`GhostOverlay: CDP failed (${cdpErr}), falling back to humanMouseClick`);
            win2.webContents.focus();
            await humanMouseClick(win2.webContents, pos.x, pos.y);
          }
          await new Promise((r) => setTimeout(r, 1200));
          if (win2.isDestroyed()) break;
          const afterUrl = win2.webContents.getURL();
          const redirected = beforeUrl && afterUrl !== beforeUrl && (afterUrl.includes("accounts/login") || afterUrl.includes("accounts/emailsignup") || afterUrl.includes("accounts/signup") || afterUrl === "https://www.instagram.com/" || afterUrl === "https://www.instagram.com");
          if (redirected) {
            _ebLog(`GhostOverlay: dismiss caused redirect (\u2192 ${afterUrl.slice(0, 80)}), recovering to previous page`);
            const recoverUrl = beforeUrl.includes("instagram.com") ? beforeUrl : "https://www.instagram.com/";
            win2.webContents.loadURL(recoverUrl).catch(() => {
            });
            await new Promise((r) => setTimeout(r, 2e3));
            break;
          }
          const stillThere = await win2.webContents.executeJavaScript(_GHOST_OVERLAY_JS).catch(() => null);
          if (!stillThere) {
            _ebLog(`GhostOverlay: dismissed after ${attempt + 1} attempt(s)`);
            break;
          }
        }
      } catch (err) {
        _ebLog(`GhostOverlay error: ${err}`);
      } finally {
        _ghostOverlayRunning = false;
      }
    };
    win2.webContents.on("did-finish-load", () => {
      cdpDismissGhostOverlay().catch(() => {
      });
    });
    const _ghostOverlayInterval = setInterval(() => {
      if (win2.isDestroyed()) {
        clearInterval(_ghostOverlayInterval);
        return;
      }
      if (!ebMap.get(-1)?.warmupActive) cdpDismissGhostOverlay().catch(() => {
      });
    }, 7e3);
    win2.on("closed", () => clearInterval(_ghostOverlayInterval));
  }
  win2.webContents.on("did-fail-load", async (_e, code, desc, url) => {
    console.error(`[ebManager] did-fail-load for @${username}: code=${code} desc=${desc} url=${url}`);
    if (url && url.includes("instagram.com")) {
      fetch(`http://127.0.0.1:${_serverPort}/api/profiles/${profileId}/eb-fail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, desc, url })
      }).catch(() => {
      });
    }
    if (code === -310 && url && url.includes("scraping_warning")) {
      try {
        const scrapingUrl = new URL(url);
        const nextRaw = scrapingUrl.searchParams.get("next") ?? "";
        if (nextRaw.includes("/consent/")) {
          console.warn(`[ebManager] scraping_warning (cookie-consent loop) for @${username} \u2014 navigating to consent`);
          await new Promise((r) => setTimeout(r, 1500));
          if (!win2.isDestroyed()) win2.webContents.loadURL(nextRaw).catch(() => {
          });
        } else {
          console.warn(`[ebManager] scraping_warning (interactive challenge) for @${username} \u2014 loading challenge page`);
          await new Promise((r) => setTimeout(r, 1500));
          if (!win2.isDestroyed()) win2.webContents.loadURL(url).catch(() => {
          });
        }
      } catch {
        const recoveryCks = await ses.cookies.get({ name: "sessionid", domain: ".instagram.com" });
        await new Promise((r) => setTimeout(r, 1500));
        if (!win2.isDestroyed()) win2.webContents.loadURL(
          recoveryCks.length > 0 ? "https://www.instagram.com/" : "https://www.instagram.com/accounts/login/"
        ).catch(() => {
        });
      }
    }
  });
  win2.webContents.on("page-title-updated", (e) => {
    e.preventDefault();
    win2.setTitle(`@${username} \u2014 Equinox Browser`);
    const ts = tabsStateMap.get(profileId);
    if (ts && ts.tabs[0]) {
      ts.tabs[0].title = `@${username}`;
      pushTabUpdate(profileId);
    }
  });
  win2.webContents.on("context-menu", (_e, params) => {
    const tpl = [];
    if (params.editFlags.canCut) tpl.push({ role: "cut" });
    if (params.editFlags.canCopy) tpl.push({ role: "copy" });
    if (params.editFlags.canPaste) tpl.push({ role: "paste" });
    tpl.push({ type: "separator" }, { role: "selectAll" });
    tpl.push({ type: "separator" });
    tpl.push({
      label: "View Page Source",
      click: async () => {
        try {
          const html = await win2.webContents.executeJavaScript("document.documentElement.outerHTML");
          const savePath = import_path.default.join(_cookiesDir, `source-${profileId}-${Date.now()}.txt`);
          import_fs.default.writeFileSync(savePath, String(html), "utf8");
          console.log(`[ebManager:${profileId}] Page source saved: ${savePath}`);
          import_electron.shell.openPath(savePath).catch(() => {
          });
        } catch (err) {
          console.error(`[ebManager:${profileId}] View Source failed:`, err);
        }
      }
    });
    import_electron.Menu.buildFromTemplate(tpl).popup({ window: win2 });
  });
  win2.webContents.on("did-navigate-in-page", (_e, navUrl) => {
    console.log(`[ebDiag:${profileId}] did-navigate-in-page url="${navUrl}"`);
    const tv = toolbarViewMap.get(profileId);
    if (tv && !tv.webContents.isDestroyed()) {
      tv.webContents.executeJavaScript(
        `window.updateUrl && window.updateUrl(${JSON.stringify(navUrl)})`
      ).catch(() => {
      });
    }
    const ts = tabsStateMap.get(profileId);
    if (ts && ts.tabs[0] && ts.activeId === 0) ts.tabs[0].url = navUrl;
    if (navUrl.includes("accounts/login/") && /#/.test(navUrl)) {
      console.warn(`[ebDiag:${profileId}] did-navigate-in-page hit accounts/login/# \u2014 scheduling 3s blank-screen check`);
      setTimeout(async () => {
        if (win2.isDestroyed()) return;
        const cur = win2.webContents.getURL();
        if (!cur.includes("accounts/login/")) {
          console.log(`[ebDiag:${profileId}] 3s check: already navigated away to "${cur}" \u2014 no recovery needed`);
          return;
        }
        let bodySnap = "{}";
        try {
          bodySnap = await win2.webContents.executeJavaScript(
            `JSON.stringify({ bodyLen: document.body.innerHTML.trim().length, children: document.body.children.length, title: document.title })`
          );
        } catch {
        }
        const has2FA = await win2.webContents.executeJavaScript(`
          !!(document.querySelector(
            'input[name="verificationCode"],input[name="verification_code"],' +
            'input[name="totp_code"],input[name="security_code"],' +
            'input[autocomplete="one-time-code"],input[inputmode="numeric"][maxlength="6"],' +
            'input[aria-label*="code" i],input[aria-label*="digit" i]'
          ))
        `).catch(() => false);
        if (has2FA) {
          console.log(`[ebDiag:${profileId}] 3s check: 2FA form visible \u2014 not interrupting. body=${bodySnap}`);
          return;
        }
        console.warn(`[ebDiag:${profileId}] 3s check: accounts/login/# with no 2FA form \u2014 recovering. body=${bodySnap}`);
        const sCks = await ses.cookies.get({ name: "sessionid", domain: ".instagram.com" }).catch(() => []);
        win2.webContents.loadURL(
          sCks.length > 0 ? "https://www.instagram.com/" : "https://www.instagram.com/accounts/login/"
        ).catch(() => {
        });
      }, 3e3);
    }
  });
  let _blankRecoveryCount = 0;
  win2.webContents.on("did-finish-load", async () => {
    try {
      if (win2.isDestroyed()) return;
      const url = win2.webContents.getURL();
      if (!url.startsWith("http")) return;
      let snapshot = "{}";
      try {
        snapshot = await win2.webContents.executeJavaScript(`
          JSON.stringify({
            childCount: document.body ? document.body.children.length : -1,
            bodyLen: document.body ? document.body.innerHTML.trim().length : -1,
            title: document.title.slice(0, 80),
            readyState: document.readyState,
          })
        `);
      } catch {
      }
      const diagSes = import_electron.session.fromPartition(`persist:eb-${profileId}`);
      const diagCks = await diagSes.cookies.get({ name: "sessionid", domain: ".instagram.com" }).catch(() => []);
      console.log(`[ebDiag:${profileId}] did-finish-load url="${url}" session=${diagCks.length > 0 ? "present" : "absent"} body=${snapshot}`);
      if (!url.includes("instagram.com")) {
        _blankRecoveryCount = 0;
        return;
      }
      let snap = {};
      try {
        snap = JSON.parse(snapshot);
      } catch {
      }
      if ((snap.bodyLen ?? 9999) > 200) {
        _blankRecoveryCount = 0;
        return;
      }
      const has2FA = await win2.webContents.executeJavaScript(`
        !!(document.querySelector(
          'input[name="verificationCode"],input[name="verification_code"],' +
          'input[name="totp_code"],input[name="security_code"],' +
          'input[autocomplete="one-time-code"],input[inputmode="numeric"][maxlength="6"],' +
          'input[aria-label*="code" i],input[aria-label*="digit" i]'
        ))
      `).catch(() => false);
      if (has2FA) {
        console.log(`[ebDiag:${profileId}] blank body but 2FA form present \u2014 not recovering`);
        return;
      }
      _blankRecoveryCount++;
      if (_blankRecoveryCount > 3) {
        console.warn(`[ebDiag:${profileId}] blank-screen recovery reached retry limit (${_blankRecoveryCount}) \u2014 stopping to avoid reload loop. User can manually reload.`);
        return;
      }
      console.warn(`[ebDiag:${profileId}] BLANK BODY on "${url}" (bodyLen=${snap.bodyLen ?? "?"},children=${snap.childCount ?? "?"}) \u2014 attempt ${_blankRecoveryCount}/3, recovering in 1500 ms to ${diagCks.length > 0 ? "feed" : "login"}`);
      await new Promise((r) => setTimeout(r, 1500));
      if (win2.isDestroyed()) return;
      if (win2.webContents.getURL() !== url) return;
      win2.webContents.loadURL(
        diagCks.length > 0 ? "https://www.instagram.com/" : "https://www.instagram.com/accounts/login/"
      ).catch(() => {
      });
    } catch (err) {
      console.warn(`[ebDiag:${profileId}] did-finish-load handler error (non-fatal):`, err);
    }
  });
  win2.webContents.on("did-fail-load", (_e, errorCode, errorDesc, validatedUrl, isMainFrame) => {
    if (win2.isDestroyed() || !isMainFrame) return;
    if (errorCode === -3) return;
    console.warn(`[ebDiag:${profileId}] did-fail-load url="${validatedUrl}" code=${errorCode} desc="${errorDesc}"`);
  });
  win2.webContents.on("render-process-gone", (_e, details) => {
    if (win2.isDestroyed()) return;
    console.error(`[ebDiag:${profileId}] render-process-gone reason="${details.reason}" exitCode=${details.exitCode}`);
  });
  win2.webContents.on("unresponsive", () => {
    if (win2.isDestroyed()) return;
    console.warn(`[ebDiag:${profileId}] page-unresponsive`);
  });
  win2.on("closed", () => {
    toolbarViewMap.delete(profileId);
    const ts = tabsStateMap.get(profileId);
    if (ts) {
      for (const v of ts.views.values()) {
        try {
          v.webContents.destroy?.();
        } catch {
        }
      }
    }
    tabsStateMap.delete(profileId);
  });
  if (win2.isDestroyed()) {
    _ebCrashLog(profileId, "GUARD-4: window destroyed before loadURL \u2014 returning early");
    return;
  }
  _ebCrashLog(profileId, "STEP-28: guard-4 passed, calling loadURL");
  if (silentMode) {
    _ebCrashLog(profileId, "STEP-29: silentMode \u2014 skipping initial loadURL (automation goto() will navigate)");
  } else if (profileId < 0) {
    win2.webContents.loadURL(initialUrl || "about:blank").catch(() => {
    });
    _ebCrashLog(profileId, `STEP-29: ghost loadURL called \u2014 ${initialUrl || "about:blank"}`);
  } else {
    const sessionCksForNav = await ses.cookies.get({ name: "sessionid", domain: ".instagram.com" });
    if (!win2.isDestroyed()) {
      const navTarget = sessionCksForNav.length > 0 ? "https://www.instagram.com/" : "https://www.instagram.com/accounts/login/";
      _ebCrashLog(profileId, `STEP-29: loadURL \u2192 ${navTarget} (sessionid=${sessionCksForNav.length > 0})`);
      win2.webContents.loadURL(navTarget).catch(() => {
      });
      _ebCrashLog(profileId, "STEP-30: loadURL called OK \u2014 openEbWindow complete");
    } else {
      _ebCrashLog(profileId, "GUARD-5: window destroyed before final loadURL after cookies.get");
    }
  }
  if (password) {
    let _autoFillBusy = false;
    win2.webContents.on("did-navigate", async (_e, navUrl) => {
      if (_autoFillBusy || win2.isDestroyed()) return;
      if (navUrl.startsWith("chrome-error://")) return;
      const onLogin = navUrl.includes("accounts/login/") && !navUrl.includes("two_factor");
      const on2FA = navUrl.includes("two_factor");
      if (!onLogin && !on2FA) return;
      _autoFillBusy = true;
      console.log(`[ebManager] @${username} \u2014 auto-fill detected ${on2FA ? "2FA" : "login"} page`);
      await new Promise((r) => setTimeout(r, 1500));
      if (win2.isDestroyed()) {
        _autoFillBusy = false;
        return;
      }
      try {
        if (onLogin) {
          const _afCkDetectJs = `(() => {
            const _CK_ACCEPT = ${JSON.stringify(_COOKIE_ACCEPT_LABELS)};
            function _isCkBtn(b) {
              if (!b || !b.getBoundingClientRect) return false;
              if (b.getBoundingClientRect().width <= 0) return false;
              const t = (b.innerText||b.textContent||'').trim().toLowerCase();
              return _CK_ACCEPT.indexOf(t) !== -1;
            }
            let b = document.querySelector('[data-cookiebanner="accept_button"]')
                 || document.querySelector('[data-testid="cookie-policy-banner-accept"]');
            if (!b) {
              const c = document.querySelector('[data-cookiebanner]') || document.querySelector('[class*="CookieBanner"],[class*="cookie-banner"],[id*="cookie"]');
              if (c) b = Array.from(c.querySelectorAll('button,[role="button"]')).find(_isCkBtn) || null;
            }
            if (!b) b = Array.from(document.querySelectorAll('button,[role="button"]')).find(_isCkBtn) || null;
            if (!b) return null;
            const r = b.getBoundingClientRect();
            return { x: Math.round(r.left + r.width/2), y: Math.round(r.top + r.height/2) };
          })()`;
          const ckPos = await win2.webContents.executeJavaScript(_afCkDetectJs).catch(() => null);
          if (ckPos) {
            console.log(`[ebManager] @${username} \u2014 auto-fill: cookie banner at (${ckPos.x},${ckPos.y}), human-click`);
            win2.webContents.focus();
            await humanMouseClick(win2.webContents, ckPos.x, ckPos.y);
            await new Promise((r) => setTimeout(r, 3e3));
            if (win2.isDestroyed()) {
              _autoFillBusy = false;
              return;
            }
          }
          try {
            win2.webContents.debugger.attach("1.3");
          } catch {
          }
          const _afFields = await win2.webContents.executeJavaScript(`
            (async () => {
              const wait = ms => new Promise(r => setTimeout(r, ms));
              let uInp, pInp, tries = 0;
              while (tries++ < 20) {
                uInp = document.querySelector('input[name="username"]');
                pInp = document.querySelector('input[name="password"]');
                if (uInp && pInp) break;
                await wait(500);
              }
              if (!uInp || !pInp) return null;
              const ur = uInp.getBoundingClientRect();
              const pr = pInp.getBoundingClientRect();
              return {
                u: { x: Math.round(ur.left + ur.width / 2), y: Math.round(ur.top + ur.height / 2) },
                p: { x: Math.round(pr.left + pr.width / 2), y: Math.round(pr.top + pr.height / 2) },
              };
            })()
          `).catch(() => null);
          if (_afFields) {
            try {
              const _d = win2.webContents.debugger;
              const _ms = (ms) => new Promise((r) => setTimeout(r, ms));
              await cdpTapGesture(_d, _afFields.u.x, _afFields.u.y);
              await _ms(150);
              await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", modifiers: 2, key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
              await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", modifiers: 2, key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
              await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Delete", code: "Delete", windowsVirtualKeyCode: 46 });
              await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Delete", code: "Delete", windowsVirtualKeyCode: 46 });
              await _ms(100);
              await typeTextCDP(_d, username);
              await cdpTapGesture(_d, _afFields.p.x, _afFields.p.y);
              await _ms(150);
              await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", modifiers: 2, key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
              await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", modifiers: 2, key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
              await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Delete", code: "Delete", windowsVirtualKeyCode: 46 });
              await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Delete", code: "Delete", windowsVirtualKeyCode: 46 });
              await _ms(100);
              await typeTextCDP(_d, password, { androidIme: true });
              for (let _bi = 0; _bi < 20; _bi++) {
                const _bp = await win2.webContents.executeJavaScript(`
                  (() => {
                    const b = document.querySelector('button[type="submit"]')
                      || Array.from(document.querySelectorAll('button')).find(b => /log[\\s-]*in|sign[\\s-]*in/i.test((b.innerText||b.textContent||'').trim()))
                      || document.querySelector('form button:not([type="button"])');
                    if (!b || b.disabled) return null;
                    const r = b.getBoundingClientRect();
                    if (r.width <= 0 || r.height <= 0) return null;
                    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
                  })()
                `).catch(() => null);
                if (_bp) {
                  await cdpTapGesture(_d, _bp.x, _bp.y);
                  break;
                }
                await _ms(250);
              }
            } catch (e) {
              console.warn(`[ebManager] @${username} CDP login fill failed:`, e?.message);
            }
          }
        } else if (on2FA && twoFAKey) {
          const code = generateTotp(twoFAKey);
          try {
            win2.webContents.debugger.attach("1.3");
          } catch {
          }
          const _af2Pos = await win2.webContents.executeJavaScript(`
            (async () => {
              const wait = ms => new Promise(r => setTimeout(r, ms));
              let inp, tries = 0;
              while (tries++ < 20) {
                inp = document.querySelector(
                  'input[name="verificationCode"], input[aria-label*="security" i], ' +
                  'input[aria-label*="code" i], input[autocomplete="one-time-code"]'
                );
                if (inp) break;
                await wait(500);
              }
              if (!inp) return null;
              const r = inp.getBoundingClientRect();
              if (r.width <= 0 || r.height <= 0) return null;
              return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
            })()
          `).catch(() => null);
          if (_af2Pos) {
            try {
              const _d = win2.webContents.debugger;
              const _ms = (ms) => new Promise((r) => setTimeout(r, ms));
              await cdpTapGesture(_d, _af2Pos.x, _af2Pos.y);
              await _ms(150);
              await typeTextCDP(_d, code, { minDelay: 40, maxDelay: 100 });
              for (let _bi = 0; _bi < 16; _bi++) {
                const _bp = await win2.webContents.executeJavaScript(`
                  (() => {
                    const b = document.querySelector('button[type="submit"]');
                    if (!b || b.disabled) return null;
                    const r = b.getBoundingClientRect();
                    if (r.width <= 0 || r.height <= 0) return null;
                    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
                  })()
                `).catch(() => null);
                if (_bp) {
                  await cdpTapGesture(_d, _bp.x, _bp.y);
                  break;
                }
                await _ms(250);
              }
            } catch (e) {
              console.warn(`[ebManager] @${username} CDP 2FA fill failed:`, e?.message);
            }
          }
        } else if (on2FA && !twoFAKey) {
          console.warn(`[ebManager] @${username} \u2014 2FA page detected but no 2FA key stored`);
        }
      } finally {
        await new Promise((r) => setTimeout(r, 9e4));
        _autoFillBusy = false;
      }
    });
  }
}
var _toolbarIpcRegistered = false;
function setupToolbarIpc() {
  if (_toolbarIpcRegistered) return;
  _toolbarIpcRegistered = true;
  import_electron.ipcMain.handle("eb-toolbar-cmd", async (event, cmd, payload) => {
    const sender = event.sender;
    let foundPid = 0;
    let foundWin = null;
    for (const [pid, tv] of toolbarViewMap.entries()) {
      if (!tv.webContents.isDestroyed() && tv.webContents === sender) {
        foundPid = pid;
        foundWin = ebMap.get(pid)?.win ?? null;
        break;
      }
    }
    if (!foundPid) {
      for (const [pid, entry] of ebMap.entries()) {
        if (!entry.win.isDestroyed() && entry.win.webContents === sender) {
          foundPid = pid;
          foundWin = entry.win;
          break;
        }
      }
    }
    if (!foundPid || !foundWin) return;
    const wc = getActiveWc(foundPid) ?? foundWin.webContents;
    const typeIntoFocused = async (text) => {
      try {
        wc.debugger.attach("1.3");
      } catch {
      }
      const _fpt = ebMap.get(foundPid)?.jsToken ?? "";
      const focusPos = await wc.executeJavaScript(`(function(){
        var el=window['__eq${_fpt}_li']||null;
        if(!el||el.tagName==='BUTTON'||el===document.body)return null;
        var r=el.getBoundingClientRect();
        if(r.width<=0||r.height<=0)return null;
        return {x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2)};
      })()`).catch(() => null);
      if (focusPos) {
        try {
          await cdpTapGesture(wc.debugger, focusPos.x, focusPos.y);
          await new Promise((r) => setTimeout(r, 60));
          await typeTextCDP(wc.debugger, text);
        } catch {
        }
      }
    };
    switch (cmd) {
      case "back":
        if (wc.navigationHistory?.canGoBack?.()) wc.navigationHistory.goBack();
        else if (wc.canGoBack?.()) wc.goBack();
        break;
      case "forward":
        if (wc.navigationHistory?.canGoForward?.()) wc.navigationHistory.goForward();
        else if (wc.canGoForward?.()) wc.goForward();
        break;
      case "reload":
        wc.reloadIgnoringCache();
        break;
      case "navigate":
        if (payload?.url) wc.loadURL(payload.url).catch(() => {
        });
        break;
      case "leak-check": {
        if (_serverPort) {
          const _lkEntry = ebMap.get(foundPid);
          const _lkProxy = _lkEntry?.proxy ? `&proxyHost=${encodeURIComponent(_lkEntry.proxy.host)}&proxyPort=${encodeURIComponent(_lkEntry.proxy.port)}` : "";
          const _lkUA = _lkEntry?.win ? `&ebUA=${encodeURIComponent(_lkEntry.win.webContents.getUserAgent())}` : "";
          wc.loadURL(`http://127.0.0.1:${_serverPort}/api/browser/leaks?profileId=${foundPid}${_lkProxy}${_lkUA}`).catch(() => {
          });
        }
        break;
      }
      case "login": {
        try {
          const r = await fetch(`http://127.0.0.1:${_serverPort}/api/profiles/${foundPid}`);
          const p = await r.json();
          const _lgUsr = p.username ?? "";
          const _lgPwd = p.password ?? "";
          try {
            wc.debugger.attach("1.3");
          } catch {
          }
          const _cdpFillLogin = async (targetWc) => {
            const _ms = (ms) => new Promise((res) => setTimeout(res, ms));
            const _d = targetWc.debugger;
            const _ckDetect = `(() => {
              function _ckOk(b){if(!b||!b.getBoundingClientRect)return false;if(b.getBoundingClientRect().width<=0)return false;var t=(b.innerText||b.textContent||'').trim().toLowerCase();return t.includes('cookie')&&!/decline|reject|refuse|necessary only|essential only/.test(t);}
              let b=document.querySelector('[data-cookiebanner="accept_button"]')||document.querySelector('[data-testid="cookie-policy-banner-accept"]');
              if(!b){const c=document.querySelector('[data-cookiebanner]')||document.querySelector('[class*="CookieBanner"],[class*="cookie-banner"],[id*="cookie"]');if(c)b=Array.from(c.querySelectorAll('button,[role="button"]')).find(_ckOk)||null;}
              if(!b)b=Array.from(document.querySelectorAll('button,[role="button"]')).find(_ckOk)||null;
              if(!b)return null;
              const r=b.getBoundingClientRect();
              if(r.width<=0||r.height<=0)return null;
              return {x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2)};
            })()`;
            for (let _ck = 0; _ck < 10; _ck++) {
              const _ckPos = await targetWc.executeJavaScript(_ckDetect).catch(() => null);
              if (_ckPos) {
                await cdpTapGesture(_d, _ckPos.x, _ckPos.y);
                await _ms(2e3);
                break;
              }
              await _ms(500);
            }
            const _flds = await targetWc.executeJavaScript(`
              (async () => {
                const wait = ms => new Promise(r => setTimeout(r, ms));
                let uInp, pInp, t = 0;
                while (t++ < 20) {
                  uInp = document.querySelector('input[name="username"]') || document.querySelector('input[autocomplete="username"]');
                  pInp = document.querySelector('input[type="password"]') || document.querySelector('input[autocomplete="current-password"]') || document.querySelector('input[name="password"]');
                  if (uInp && pInp) break;
                  await wait(300);
                }
                if (!uInp || !pInp) return 'navigate';
                const ur = uInp.getBoundingClientRect();
                const pr = pInp.getBoundingClientRect();
                return {
                  u: { x: Math.round(ur.left + ur.width / 2), y: Math.round(ur.top + ur.height / 2) },
                  p: { x: Math.round(pr.left + pr.width / 2), y: Math.round(pr.top + pr.height / 2) },
                };
              })()
            `).catch(() => "navigate");
            if (_flds === "navigate") return "navigate";
            await cdpTapGesture(_d, _flds.u.x, _flds.u.y);
            await _ms(120);
            await targetWc.executeJavaScript(
              `(document.querySelector('input[name="username"]')||document.querySelector('input[autocomplete="username"]'))?.focus()`
            ).catch(() => {
            });
            await _ms(150);
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", modifiers: 2, key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", modifiers: 2, key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Delete", code: "Delete", windowsVirtualKeyCode: 46 });
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Delete", code: "Delete", windowsVirtualKeyCode: 46 });
            await _ms(80);
            await _d.sendCommand("Input.insertText", { text: _lgUsr });
            await _ms(300);
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
            await _ms(60);
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
            await _ms(150);
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
            await _ms(60);
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
            await _ms(200);
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", modifiers: 2, key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", modifiers: 2, key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Delete", code: "Delete", windowsVirtualKeyCode: 46 });
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Delete", code: "Delete", windowsVirtualKeyCode: 46 });
            await _ms(80);
            await _d.sendCommand("Input.insertText", { text: _lgPwd });
            await _ms(300);
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
            await _ms(60);
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
            await _ms(150);
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
            await _ms(60);
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
            await _ms(300 + Math.floor(Math.random() * 200));
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
            await _ms(60);
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
            return "ok";
          };
          foundWin.focus();
          await new Promise((r2) => setTimeout(r2, 120));
          const _inline = await _cdpFillLogin(wc).catch(() => "navigate");
          if (_inline === "navigate") {
            const _fillAfterLoad = async () => {
              if (wc.isDestroyed()) return;
              await new Promise((res) => setTimeout(res, 1500));
              if (wc.isDestroyed()) return;
              try {
                wc.debugger.attach("1.3");
              } catch {
              }
              await _cdpFillLogin(wc).catch(() => {
              });
            };
            wc.once("did-finish-load", _fillAfterLoad);
            wc.loadURL("https://www.instagram.com/accounts/login/").catch(() => {
              wc.removeListener("did-finish-load", _fillAfterLoad);
            });
            break;
          }
          await new Promise((r2) => setTimeout(r2, 1e4));
          const _2faKey = (p.twoFASecretKey ?? "").trim();
          if (_2faKey) {
            try {
              wc.debugger.attach("1.3");
            } catch {
            }
            const _2faCode = generateTotp(_2faKey);
            const _ms2 = (ms) => new Promise((r2) => setTimeout(r2, ms));
            const _d2 = wc.debugger;
            const _OTP_SELS = [
              'input[autocomplete="one-time-code"]',
              'input[name="verificationCode"]',
              'input[name="verification_code"]',
              'input[name="security_code"]',
              'input[name="totp_code"]',
              'input[name="code"]',
              'input[inputmode="numeric"]',
              'input[inputmode="numeric"][maxlength="6"]',
              'input[maxlength="6"]',
              'input[aria-label*="security" i]',
              'input[aria-label*="code" i]',
              'input[aria-label*="verif" i]',
              'input[aria-label*="authenticat" i]',
              'input[type="tel"][maxlength="6"]',
              'input[data-testid*="verification" i]',
              'input[data-testid*="code" i]'
            ].join(",");
            let _otpPos = null;
            for (let _ti = 0; _ti < 10 && !_otpPos; _ti++) {
              _otpPos = await wc.executeJavaScript(`(function(){
                var el=document.querySelector(${JSON.stringify(_OTP_SELS)})||null;
                if(!el){
                  var all=Array.from(document.querySelectorAll('input'));
                  var visible=all.filter(function(i){
                    if(i.type==='password'||i.type==='email'||i.name==='username'||i.name==='password')return false;
                    var r=i.getBoundingClientRect();return r.width>0&&r.height>0;
                  });
                  if(visible.length===1){el=visible[0];}
                  else{el=visible.find(function(i){return i.type==='tel'||i.inputMode==='numeric'||/code|verif|otp|totp/i.test(i.name+' '+i.id+' '+i.placeholder);});}
                  var _li=window['__eq${ebMap.get(foundPid)?.jsToken ?? ""}_li'];if(!el&&_li&&_li.tagName==='INPUT')el=_li;
                }
                if(!el||el.tagName!=='INPUT')return null;
                var r=el.getBoundingClientRect();
                if(r.width<=0||r.height<=0)return null;
                return{x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2)};
              })()`).catch(() => null);
              if (!_otpPos) await _ms2(500);
            }
            if (_otpPos) {
              await cdpTapGesture(_d2, _otpPos.x, _otpPos.y);
              await _ms2(120);
            }
            for (let _ti = 0; _ti < 2; _ti++) {
              await _d2.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
              await _ms2(60);
              await _d2.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
              await _ms2(120);
            }
            await _d2.sendCommand("Input.insertText", { text: _2faCode });
            await _ms2(300);
            for (let _ti = 0; _ti < 3; _ti++) {
              await _d2.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
              await _ms2(60);
              await _d2.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
              await _ms2(120);
            }
            await _ms2(200);
            await _d2.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
            await _ms2(60);
            await _d2.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
          }
        } catch {
        }
        break;
      }
      case "new-tab": {
        const entry = ebMap.get(foundPid);
        const state = tabsStateMap.get(foundPid);
        if (!entry || entry.win.isDestroyed() || !state) break;
        const tabWin = entry.win;
        const newTabId = state.nextId++;
        const partition = ebPartition(foundPid);
        const tabView = new import_electron.BrowserView({
          webPreferences: {
            partition,
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true,
            // prevent window.require leak (see main EB window comment)
            // CRITICAL: without this, Chromium throttles timers/rAF/lazy-loading
            // for this BrowserView whenever the parent EB window is hidden,
            // minimized, or occluded on Windows — Instagram's virtualized feed,
            // story tray, and follow button never finish rendering, so every
            // DOM check silently returns undefined/empty. See EB Multi-Tab IPC
            // Fix Log in replit.md.
            backgroundThrottling: false
          }
        });
        state.views.set(newTabId, tabView);
        state.tabs.push({ id: newTabId, url: "https://www.google.com/", title: "New Tab" });
        const _pushNavUrl = (navUrl) => {
          const s = tabsStateMap.get(foundPid);
          if (!s) return;
          const tab = s.tabs.find((t) => t.id === newTabId);
          if (tab) tab.url = navUrl;
          if (s.activeId === newTabId) {
            const tv = toolbarViewMap.get(foundPid);
            if (tv && !tv.webContents.isDestroyed()) {
              tv.webContents.executeJavaScript(
                `window.updateUrl && window.updateUrl(${JSON.stringify(navUrl)})`
              ).catch(() => {
              });
            }
          }
        };
        tabView.webContents.on("did-navigate", (_e, u) => _pushNavUrl(u));
        tabView.webContents.on("did-navigate-in-page", (_e, u) => _pushNavUrl(u));
        tabView.webContents.on("page-title-updated", (_e, title) => {
          const s = tabsStateMap.get(foundPid);
          if (!s) return;
          const tab = s.tabs.find((t) => t.id === newTabId);
          if (tab) tab.title = title.slice(0, 25) || "New Tab";
          pushTabUpdate(foundPid);
        });
        tabView.webContents.on("context-menu", (_e, params) => {
          const tpl = [];
          if (params.editFlags.canCut) tpl.push({ role: "cut" });
          if (params.editFlags.canCopy) tpl.push({ role: "copy" });
          if (params.editFlags.canPaste) tpl.push({ role: "paste" });
          tpl.push({ type: "separator" }, { role: "selectAll" });
          import_electron.Menu.buildFromTemplate(tpl).popup({ window: tabWin });
        });
        tabView.webContents.on("dom-ready", () => tabView.webContents.executeJavaScript(buildPageUtilsJs(void 0, ebMap.get(foundPid)?.jsToken ?? "")).catch(() => {
        }));
        tabView.webContents.on("did-finish-load", () => tabView.webContents.executeJavaScript(buildPageUtilsJs(void 0, ebMap.get(foundPid)?.jsToken ?? "")).catch(() => {
        }));
        tabView.webContents.on("login", (event2, _req, _authInfo, callback) => {
          event2.preventDefault();
          const _tabEntry = ebMap.get(foundPid);
          callback(_tabEntry?.proxy?.user ?? "", _tabEntry?.proxy?.pass ?? "");
        });
        tabView.webContents.loadURL("https://www.google.com/").catch(() => {
        });
        switchToTab(foundPid, newTabId);
        break;
      }
      case "switch-tab": {
        if (payload?.id !== void 0) {
          const switchState = tabsStateMap.get(foundPid);
          const switchTabId = Number(payload.id);
          switchToTab(foundPid, switchTabId);
          if (switchState) {
            const tv = toolbarViewMap.get(foundPid);
            if (tv && !tv.webContents.isDestroyed()) {
              let url = "";
              if (switchTabId === 0) {
                url = foundWin.webContents.getURL();
              } else {
                const sv = switchState.views.get(switchTabId);
                url = sv && !sv.webContents.isDestroyed() ? sv.webContents.getURL() : "";
              }
              tv.webContents.executeJavaScript(
                `window.updateUrl && window.updateUrl(${JSON.stringify(url)})`
              ).catch(() => {
              });
            }
          }
        }
        break;
      }
      case "close-tab": {
        const closeState = tabsStateMap.get(foundPid);
        const closeId = Number(payload?.id ?? 0);
        if (!closeState || closeId === 0) break;
        const viewToClose = closeState.views.get(closeId);
        closeState.views.delete(closeId);
        closeState.tabs = closeState.tabs.filter((t) => t.id !== closeId);
        if (closeState.activeId === closeId) {
          const nextTab = closeState.tabs[closeState.tabs.length - 1];
          switchToTab(foundPid, nextTab?.id ?? 0);
        } else {
          pushTabUpdate(foundPid);
        }
        if (viewToClose && !viewToClose.webContents.isDestroyed()) {
          foundWin.removeBrowserView(viewToClose);
          try {
            viewToClose.webContents.destroy?.();
          } catch {
          }
        }
        break;
      }
      case "totp": {
        try {
          try {
            wc.debugger.attach("1.3");
          } catch {
          }
          const _r = await fetch(`http://127.0.0.1:${_serverPort}/api/profiles/${foundPid}`);
          const _p = await _r.json();
          const _key = (_p.twoFASecretKey ?? "").trim();
          if (_key) {
            const _code = generateTotp(_key);
            const _ms = (ms) => new Promise((res) => setTimeout(res, ms));
            const _d = wc.debugger;
            for (let _ti = 0; _ti < 2; _ti++) {
              await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
              await _ms(60);
              await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
              await _ms(120);
            }
            await _d.sendCommand("Input.insertText", { text: _code });
            await _ms(200);
            for (let _ti = 0; _ti < 3; _ti++) {
              await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
              await _ms(60);
              await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
              await _ms(120);
            }
            await _ms(200);
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
            await _ms(60);
            await _d.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
          }
        } catch {
        }
        break;
      }
      case "phone": {
        try {
          const r = await fetch(`http://127.0.0.1:${_serverPort}/api/settings`);
          const s = await r.json();
          const num = (s.preFilledPhoneNumber ?? "").trim();
          if (!num) break;
          try {
            wc.debugger.attach("1.3");
          } catch {
          }
          const _ms2 = (ms) => new Promise((res) => setTimeout(res, ms));
          const _d2 = wc.debugger;
          const _PHONE_SELS = [
            'input[name="mobile_number"]',
            'input[name="phone"]',
            'input[name="phone_number"]',
            'input[autocomplete="tel"]',
            'input[type="tel"]',
            'input[inputmode="tel"]',
            'input[aria-label*="phone" i]',
            'input[aria-label*="mobile" i]',
            'input[placeholder*="phone" i]',
            'input[placeholder*="mobile" i]'
          ].join(",");
          const phonePos = await wc.executeJavaScript(`(function(){
            var SELS=${JSON.stringify(_PHONE_SELS)};
            var el=document.querySelector(SELS)||null;
            if(!el){
              // Broader fallback: any visible text/tel input that isn't username/password
              var inputs=Array.from(document.querySelectorAll('input[type="text"],input[type="tel"],input:not([type])'));
              el=inputs.find(function(i){
                if(i.name==='username'||i.name==='password'||i.type==='password')return false;
                var r=i.getBoundingClientRect();
                return r.width>0&&r.height>0;
              })||null;
            }
            if(!el)return null;
            var r=el.getBoundingClientRect();
            if(r.width<=0||r.height<=0)return null;
            return{x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2)};
          })()`).catch(() => null);
          if (phonePos) {
            await cdpTapGesture(_d2, phonePos.x, phonePos.y);
            await _ms2(120);
            await _d2.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", modifiers: 2, key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
            await _d2.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", modifiers: 2, key: "a", code: "KeyA", windowsVirtualKeyCode: 65 });
            await _d2.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Delete", code: "Delete", windowsVirtualKeyCode: 46 });
            await _d2.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Delete", code: "Delete", windowsVirtualKeyCode: 46 });
            await _ms2(80);
            await typeTextCDP(_d2, num);
            await _d2.sendCommand("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
            await _ms2(50);
            await _d2.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
          } else {
            await typeIntoFocused(num);
          }
        } catch {
        }
        break;
      }
      case "email-user": {
        try {
          const r = await fetch(`http://127.0.0.1:${_serverPort}/api/profiles/${foundPid}`);
          const p = await r.json();
          const val = (p.emailValidationUsername ?? "").trim();
          if (val) await typeIntoFocused(val);
        } catch {
        }
        break;
      }
      case "email-pass": {
        try {
          const r = await fetch(`http://127.0.0.1:${_serverPort}/api/profiles/${foundPid}`);
          const p = await r.json();
          const val = (p.emailValidationPassword ?? "").trim();
          if (val) await typeIntoFocused(val);
        } catch {
        }
        break;
      }
      case "clear": {
        foundWin.destroy();
        await new Promise((r) => setTimeout(r, 200));
        ebMap.delete(foundPid);
        const ses = import_electron.session.fromPartition(ebPartition(foundPid));
        await ses.clearStorageData({
          storages: ["cookies", "localstorage", "indexdb", "filesystem", "cachestorage", "shadercache", "websql", "serviceworkers"]
        }).catch(() => {
        });
        const fp = cookieFilePath(foundPid);
        try {
          if (import_fs.default.existsSync(fp)) import_fs.default.unlinkSync(fp);
        } catch {
        }
        break;
      }
      default:
        break;
    }
  });
}
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let buf = "";
    req.on("data", (d) => {
      buf += d;
    });
    req.on("end", () => {
      try {
        resolve(buf ? JSON.parse(buf) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}
function send(res, code, data) {
  const body = JSON.stringify(data);
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(body);
}
function startEbIpcServer(serverPort2, cookiesDir, iconPath) {
  _serverPort = serverPort2;
  _cookiesDir = cookiesDir;
  _iconPath = iconPath;
  setupToolbarIpc();
  const server = import_http.default.createServer(async (req, res) => {
    const u = new URL(req.url ?? "/", "http://localhost");
    try {
      if (req.method === "GET" && u.pathname === "/eb/state") {
        const pid2 = Number(u.searchParams.get("profileId"));
        const e = ebMap.get(pid2);
        if (!e || e.win.isDestroyed()) return send(res, 200, { open: false, url: "" });
        return send(res, 200, { open: true, url: e.win.webContents.getURL() });
      }
      if (req.method === "GET" && u.pathname === "/eb/resolve-proxy") {
        const pid2 = Number(u.searchParams.get("profileId") ?? "-1");
        const testUrl = u.searchParams.get("url") || "https://api.ipify.org/";
        const entry = ebMap.get(pid2);
        if (!entry || entry.win.isDestroyed()) {
          return send(res, 200, { resolved: null, partition: null, storedProxy: null, error: "EB window not open" });
        }
        const ses = import_electron.session.fromPartition(entry.partition);
        const resolved = await ses.resolveProxy(testUrl).catch((e) => `ERROR: ${e?.message}`);
        const stored = entry.proxy;
        const proxyRules = stored ? buildProxyConfig(stored).proxyRules ?? "(no proxyRules)" : "direct://";
        console.log(`[EB:resolve-proxy] pid=${pid2} url=${testUrl} electron-resolved="${resolved}" applied-rules="${proxyRules}"`);
        return send(res, 200, {
          resolved,
          partition: entry.partition,
          proxyRules,
          storedProxy: stored ? {
            host: stored.host,
            port: stored.port,
            type: stored.type || "http",
            hasCredentials: !!stored.user,
            user: stored.user ? `${stored.user.slice(0, 2)}***` : null
          } : null
        });
      }
      if (req.method === "GET" && u.pathname === "/eb/ip-audits") {
        return send(res, 200, { audits: Array.from(_ebIpAudits.values()) });
      }
      if (req.method === "GET" && u.pathname === "/eb/browser-check") {
        const pid2 = Number(u.searchParams.get("profileId") ?? "-1");
        const entry = ebMap.get(pid2);
        if (!entry || entry.win.isDestroyed()) {
          return send(res, 200, {
            open: false,
            error: "EB window not open \u2014 open the browser for this account first, then re-run",
            checks: null,
            checkedAt: (/* @__PURE__ */ new Date()).toISOString()
          });
        }
        const wc = entry.win.webContents;
        const url = wc.getURL();
        let raw = {};
        try {
          raw = await wc.executeJavaScript(`(function () {
            const R = {};
            // \u2500\u2500 Electron globals (must all be absent) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
            R.webdriver  = navigator.webdriver;
            R.hasProcess = typeof window.process   !== 'undefined';
            // Instagram's login page defines window.require as their own AMD/Haste
            // module loader \u2014 it is NOT Electron's Node.js require.  Only flag as
            // an Electron leak if the require carries Node.js-specific properties
            // (main, cache, extensions) that Electron's native require has but
            // Instagram's module loader does not.
            R.hasRequire = typeof window.require !== 'undefined' && (
              typeof window.require.main       !== 'undefined' ||
              typeof window.require.cache      !== 'undefined' ||
              typeof window.require.extensions !== 'undefined'
            );
            R.hasModule  = typeof window.module    !== 'undefined';
            R.hasElectron = typeof window._electron !== 'undefined';
            // \u2500\u2500 Navigator \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
            R.userAgent           = navigator.userAgent;
            R.platform            = navigator.platform;
            R.vendor              = navigator.vendor;
            R.language            = navigator.language;
            R.languages           = Array.from(navigator.languages || []);
            R.hardwareConcurrency = navigator.hardwareConcurrency;
            R.deviceMemory        = navigator.deviceMemory || null;
            R.maxTouchPoints      = navigator.maxTouchPoints;
            R.doNotTrack          = navigator.doNotTrack;
            // \u2500\u2500 Touch \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
            R.ontouchstart  = 'ontouchstart'  in window;
            R.ontouchend    = 'ontouchend'    in window;
            R.pointerEvents = typeof window.PointerEvent !== 'undefined';
            // \u2500\u2500 Chrome object \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
            R.hasChromeObj       = typeof window.chrome !== 'undefined';
            R.chromeRuntimeOk    = !!(window.chrome && window.chrome.runtime && typeof window.chrome.runtime === 'object');
            R.chromeLoadTimesOk  = !!(window.chrome && typeof window.chrome.loadTimes === 'function');
            R.chromeCsiOk        = !!(window.chrome && typeof window.chrome.csi === 'function');
            // \u2500\u2500 Screen / viewport \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
            R.screenWidth      = screen.width;
            R.screenHeight     = screen.height;
            R.colorDepth       = screen.colorDepth;
            R.devicePixelRatio = window.devicePixelRatio;
            R.innerWidth       = window.innerWidth;
            R.innerHeight      = window.innerHeight;
            R.outerWidth       = window.outerWidth;
            R.outerHeight      = window.outerHeight;
            // \u2500\u2500 WebGL \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
            try {
              const c  = document.createElement('canvas');
              const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
              if (gl) {
                const ext = gl.getExtension('WEBGL_debug_renderer_info');
                R.webglVendor   = ext ? gl.getParameter(ext.UNMASKED_VENDOR_WEBGL)   : '(ext unavailable)';
                R.webglRenderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : '(ext unavailable)';
                R.webglVersion  = gl.getParameter(gl.VERSION);
                R.webglSLVersion = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
              } else { R.webglError = 'context null'; }
            } catch (e) { R.webglError = String(e); }
            // \u2500\u2500 Canvas noise check \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
            // Draw identical instructions twice; if canvas noise injection is
            // working, the data URLs will differ slightly between windows.
            try {
              const c = document.createElement('canvas');
              c.width = 300; c.height = 60;
              const ctx = c.getContext('2d');
              ctx.textBaseline = 'top';
              ctx.font = '18px Arial';
              ctx.fillStyle = '#f60';
              ctx.fillRect(0, 0, 300, 60);
              ctx.fillStyle = '#069';
              ctx.fillText('EquinoxNoise-\u2665', 2, 2);
              ctx.fillStyle = 'rgba(102,204,0,0.8)';
              ctx.fillText('EquinoxNoise', 4, 4);
              R.canvasSnip = c.toDataURL('image/png').substring(22, 120);
            } catch (e) { R.canvasError = String(e); }
            // \u2500\u2500 Network info hint \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
            try {
              const nc = navigator.connection;
              if (nc) { R.connEffType = nc.effectiveType; R.connType = nc.type; }
            } catch (_) {}
            // \u2500\u2500 Automation hints \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
            R.puppeteerDetect = !!(navigator.webdriver);
            // Check for an OWN-property descriptor on the navigator instance.
            // Real Chrome: Object.getOwnPropertyDescriptor(navigator,'webdriver') === undefined
            //              (the property lives on Navigator.prototype only).
            // Broken suppression: defineProperty on the instance creates an own
            // descriptor that detector scripts probe to identify automation tools
            // even when the returned value is false/undefined.
            try {
              R.webdriverOwnDesc = Object.getOwnPropertyDescriptor(navigator, 'webdriver') !== undefined;
            } catch (_) { R.webdriverOwnDesc = false; }
            R.permissions = null;
            try {
              // Checking notification permission synchronously
              R.permissions = Notification.permission;
            } catch (_) {}
            return R;
          })()`);
        } catch (e) {
          return send(res, 200, {
            open: true,
            url,
            error: `JS execution failed (page may still be loading): ${(e?.message ?? String(e)).slice(0, 120)}`,
            checks: null,
            checkedAt: (/* @__PURE__ */ new Date()).toISOString()
          });
        }
        const ua = String(raw.userAgent ?? "");
        const isMobileUA = /Android|iPhone|iPad/.test(ua);
        const platform = String(raw.platform ?? "");
        const checks = {};
        const leaks = [];
        if (raw.hasProcess) leaks.push("window.process");
        if (raw.hasRequire) leaks.push("window.require");
        if (raw.hasModule) leaks.push("window.module");
        if (raw.hasElectron) leaks.push("window._electron");
        if (raw.webdriver === true) leaks.push("navigator.webdriver=true");
        if (raw.webdriver !== false) leaks.push(`navigator.webdriver=${JSON.stringify(raw.webdriver)} (should be false)`);
        if (raw.webdriverOwnDesc) leaks.push("navigator.webdriver is an own-property (prototype-only in real Chrome)");
        checks.electronLeak = {
          title: "Electron Leak",
          status: leaks.length > 0 ? "fail" : "pass",
          label: leaks.length > 0 ? `EXPOSED: ${leaks.join(", ")} \u2014 Instagram login JS can detect Electron` : "Clean \u2014 no Electron globals visible to page JS",
          detail: {
            "window.process": String(raw.hasProcess),
            "window.require": String(raw.hasRequire),
            "window.module": String(raw.hasModule),
            "window._electron": String(raw.hasElectron),
            "navigator.webdriver": String(raw.webdriver)
          }
        };
        const tp = Number(raw.maxTouchPoints ?? 0);
        checks.touchEmulation = {
          title: "Touch Emulation",
          status: isMobileUA && tp === 0 ? "fail" : isMobileUA && !raw.ontouchstart ? "warn" : "pass",
          label: isMobileUA && tp === 0 ? `maxTouchPoints=0 but UA claims mobile \u2014 touch emulation NOT applied (login events will look wrong)` : isMobileUA && !raw.ontouchstart ? `maxTouchPoints=${tp} OK but ontouchstart not in window` : `maxTouchPoints=${tp} \u2014 touch emulation active`,
          detail: {
            maxTouchPoints: String(tp),
            ontouchstart: String(raw.ontouchstart),
            ontouchend: String(raw.ontouchend),
            isMobileUA: String(isMobileUA)
          }
        };
        const platformWrong = isMobileUA && (platform === "Win32" || platform === "Win64" || platform.toLowerCase().includes("windows"));
        checks.platformSpoof = {
          title: "Platform Spoof",
          status: platformWrong ? "fail" : "pass",
          label: platformWrong ? `navigator.platform="${platform}" contradicts Android UA \u2014 detectable by 2 lines of JS` : `navigator.platform="${platform}" \u2014 consistent with UA claim`,
          detail: {
            platform,
            expectedForAndroid: "Linux armv8l  /  Linux aarch64",
            isMobileUA: String(isMobileUA),
            userAgentSnip: ua.substring(0, 80)
          }
        };
        checks.chromeObject = {
          title: "Chrome Object",
          status: !raw.hasChromeObj ? "fail" : !raw.chromeRuntimeOk ? "warn" : "pass",
          label: !raw.hasChromeObj ? "window.chrome missing \u2014 fingerprinted as non-Chrome" : !raw.chromeRuntimeOk ? "window.chrome present but chrome.runtime structure is wrong" : "window.chrome + chrome.runtime look correct",
          detail: {
            hasChromeObj: String(raw.hasChromeObj),
            chromeRuntimeOk: String(raw.chromeRuntimeOk),
            chromeLoadTimes: String(raw.chromeLoadTimesOk),
            chromeCsi: String(raw.chromeCsiOk)
          }
        };
        const renderer = String(raw.webglRenderer ?? "").toLowerCase();
        const isSoft = renderer.includes("swiftshader") || renderer.includes("mesa") || renderer.includes("llvm") || renderer.includes("virgl") || renderer.includes("softpipe") || renderer.includes("lavapipe");
        checks.webglRenderer = {
          title: "WebGL Renderer",
          status: raw.webglError ? "warn" : isSoft ? "fail" : "pass",
          label: raw.webglError ? `WebGL query error: ${raw.webglError}` : isSoft ? `Software renderer: "${raw.webglRenderer}" \u2014 flags as VM/headless to Instagram` : `${raw.webglRenderer}`,
          detail: {
            vendor: String(raw.webglVendor ?? ""),
            renderer: String(raw.webglRenderer ?? ""),
            version: String(raw.webglVersion ?? "")
          }
        };
        const canvasSnip = String(raw.canvasSnip ?? "");
        checks.canvasNoise = {
          title: "Canvas Noise",
          status: raw.canvasError ? "warn" : canvasSnip.length > 10 ? "info" : "warn",
          label: raw.canvasError ? `Canvas error: ${raw.canvasError}` : "Canvas rendered \u2014 compare snips across two windows to verify noise is different per-session",
          detail: {
            canvasDataSnip: canvasSnip,
            note: "If noise injection is working, this string will differ between different account windows"
          }
        };
        console.log(`[EB:browser-check:${pid2}] url=${url} leaks=${leaks.length} touch=${tp} platform=${platform} renderer=${raw.webglRenderer}`);
        return send(res, 200, {
          open: true,
          url,
          profileId: pid2,
          checkedAt: (/* @__PURE__ */ new Date()).toISOString(),
          checks,
          raw
        });
      }
      if (req.method === "GET" && u.pathname === "/eb/header-check") {
        const pid2 = Number(u.searchParams.get("profileId") ?? "-1");
        const entry = ebMap.get(pid2);
        if (!entry || entry.win.isDestroyed()) {
          return send(res, 200, {
            open: false,
            error: "EB window not open \u2014 open the browser for this account first, then re-run",
            captures: [],
            checkedAt: (/* @__PURE__ */ new Date()).toISOString()
          });
        }
        wireHeaderCapture(entry.win.webContents, pid2);
        const captures = _headerCaptures.get(pid2) ?? [];
        if (captures.length === 0) {
          return send(res, 200, {
            open: true,
            url: entry.win.webContents.getURL(),
            profileId: pid2,
            checkedAt: (/* @__PURE__ */ new Date()).toISOString(),
            captures: [],
            checks: null,
            note: "No requests to instagram.com/facebook.com captured yet \u2014 navigate or re-run login, then re-check."
          });
        }
        const latest = captures[captures.length - 1];
        const h = Object.fromEntries(
          Object.entries(latest.headers).map(([k, v]) => [k.toLowerCase(), v])
        );
        const ua = h["user-agent"] ?? "";
        const isMobileUA = /Android|iPhone|iPad/.test(ua);
        const checks = {};
        const chMobile = h["sec-ch-ua-mobile"];
        const chMobileWrong = isMobileUA ? chMobile !== "?1" : chMobile === "?1";
        checks.chUaMobile = {
          title: "Sec-CH-UA-Mobile Consistency",
          status: chMobile === void 0 ? "warn" : chMobileWrong ? "fail" : "pass",
          label: chMobile === void 0 ? "Sec-CH-UA-Mobile header missing from the real request" : chMobileWrong ? `Sec-CH-UA-Mobile=${chMobile} contradicts User-Agent (isMobileUA=${isMobileUA}) \u2014 a real wire-level tell` : `Sec-CH-UA-Mobile=${chMobile} \u2014 consistent with UA`,
          detail: { "sec-ch-ua-mobile": String(chMobile), userAgentSnip: ua.slice(0, 80) }
        };
        const chPlatform = h["sec-ch-ua-platform"];
        const expectedPlatform = isMobileUA ? "Android" : null;
        const chPlatformWrong = expectedPlatform !== null && chPlatform !== `"${expectedPlatform}"` && chPlatform !== expectedPlatform;
        checks.chUaPlatform = {
          title: "Sec-CH-UA-Platform Consistency",
          status: chPlatform === void 0 ? "warn" : chPlatformWrong ? "fail" : "pass",
          label: chPlatform === void 0 ? "Sec-CH-UA-Platform header missing from the real request" : chPlatformWrong ? `Sec-CH-UA-Platform=${chPlatform} does not match expected "${expectedPlatform}"` : `Sec-CH-UA-Platform=${chPlatform} \u2014 consistent`,
          detail: { "sec-ch-ua-platform": String(chPlatform) }
        };
        const acceptLang = h["accept-language"] ?? "";
        checks.acceptLanguage = {
          title: "Accept-Language Header",
          status: acceptLang ? "pass" : "warn",
          label: acceptLang ? `Accept-Language: ${acceptLang}` : "Accept-Language header missing from the real outgoing request",
          detail: { "accept-language": acceptLang }
        };
        const alwaysRequired = ["sec-fetch-site", "sec-fetch-mode", "sec-fetch-dest"];
        const missingAlways = alwaysRequired.filter((k) => h[k] === void 0);
        const isNavigate = h["sec-fetch-mode"] === "navigate";
        const secFetchUser = h["sec-fetch-user"];
        const userHeaderWrong = isNavigate ? secFetchUser === void 0 : secFetchUser !== void 0;
        const secFetchIssues = [
          ...missingAlways,
          ...userHeaderWrong ? ["sec-fetch-user"] : []
        ];
        checks.secFetch = {
          title: "Sec-Fetch-* Headers",
          status: secFetchIssues.length > 0 ? "fail" : "pass",
          label: secFetchIssues.length > 0 ? isNavigate && secFetchUser === void 0 ? "Missing Sec-Fetch-User on a navigation request \u2014 real Chrome always sends it on top-level navigations" : !isNavigate && secFetchUser !== void 0 ? `Sec-Fetch-User present on a non-navigation (mode=${h["sec-fetch-mode"]}) request \u2014 real Chrome never sends it outside navigation` : `Missing: ${missingAlways.join(", ")} \u2014 real Chrome always sends Sec-Fetch-Site/Mode/Dest` : isNavigate ? "All Sec-Fetch-* headers present and correct for a navigation request" : `Sec-Fetch-Site/Mode/Dest present and correct for a ${h["sec-fetch-mode"]} request (Sec-Fetch-User correctly absent \u2014 not a navigation)`,
          detail: {
            "sec-fetch-site": String(h["sec-fetch-site"]),
            "sec-fetch-mode": String(h["sec-fetch-mode"]),
            "sec-fetch-dest": String(h["sec-fetch-dest"]),
            "sec-fetch-user": String(secFetchUser),
            isNavigationRequest: String(isNavigate)
          }
        };
        checks.userAgentHeader = {
          title: "User-Agent Header",
          status: ua ? "pass" : "fail",
          label: ua ? ua : "User-Agent header missing entirely \u2014 cannot have come from a real browser",
          detail: { "user-agent": ua }
        };
        const chUa = h["sec-ch-ua"];
        const chromeMajor = ua.match(/Chrome\/(\d+)/)?.[1];
        const chUaMismatch = !!chUa && !!chromeMajor && !chUa.includes(chromeMajor);
        checks.chUaBrands = {
          title: "Sec-CH-UA Brand List",
          status: chUa === void 0 ? "fail" : chUaMismatch ? "fail" : "pass",
          label: chUa === void 0 ? "Sec-CH-UA header missing \u2014 real Chrome sends this on every request" : chUaMismatch ? `Sec-CH-UA brand version doesn't include Chrome/${chromeMajor} from the User-Agent` : `Sec-CH-UA: ${chUa}`,
          detail: { "sec-ch-ua": String(chUa), chromeMajorFromUA: String(chromeMajor) }
        };
        const accept = h["accept"];
        const acceptEncoding = h["accept-encoding"];
        checks.acceptHeaders = {
          title: "Accept / Accept-Encoding",
          status: !accept || !acceptEncoding ? "fail" : "pass",
          label: !accept || !acceptEncoding ? `Missing: ${[!accept && "Accept", !acceptEncoding && "Accept-Encoding"].filter(Boolean).join(", ")}` : `Accept: ${accept} \xB7 Accept-Encoding: ${acceptEncoding}`,
          detail: { accept: String(accept), "accept-encoding": String(acceptEncoding) }
        };
        const cookieHeader = h["cookie"];
        checks.cookieHeader = {
          title: "Cookie Header",
          status: cookieHeader === void 0 ? "info" : cookieHeader.length === 0 ? "warn" : "pass",
          label: cookieHeader === void 0 ? "No Cookie header on this request (expected before any session cookies are set)" : cookieHeader.length === 0 ? "Cookie header present but EMPTY \u2014 a proxy or session issue may be stripping cookies" : `Cookie header present (${cookieHeader.split(";").length} cookie(s))`,
          detail: { cookiePresent: String(cookieHeader !== void 0), cookieCount: String(cookieHeader ? cookieHeader.split(";").length : 0) }
        };
        const headerCount = Object.keys(latest.headers).length;
        checks.headerCount = {
          title: "Header Count Sanity",
          status: headerCount < 8 ? "fail" : headerCount < 10 ? "warn" : "pass",
          label: `${headerCount} headers captured \u2014 real Chrome sends ~10-15 on an instagram.com request`,
          detail: { headerCount: String(headerCount), headerNames: Object.keys(latest.headers) }
        };
        checks.rawHeaders = {
          title: "All Real Request Headers (raw)",
          status: "info",
          label: `${headerCount} headers captured for ${latest.method} ${latest.url}`,
          detail: latest.headers
        };
        console.log(`[EB:header-check:${pid2}] url=${latest.url} headers=${Object.keys(latest.headers).length} captures=${captures.length}`);
        return send(res, 200, {
          open: true,
          url: entry.win.webContents.getURL(),
          profileId: pid2,
          checkedAt: (/* @__PURE__ */ new Date()).toISOString(),
          checks,
          captures
        });
      }
      if (req.method === "GET" && u.pathname === "/eb/cookies") {
        const pid2 = Number(u.searchParams.get("profileId"));
        const ses = import_electron.session.fromPartition(ebPartition(pid2));
        const c1 = await ses.cookies.get({ domain: ".instagram.com" });
        const c2 = await ses.cookies.get({ domain: "instagram.com" });
        const c3 = await ses.cookies.get({ domain: ".i.instagram.com" });
        const seen = /* @__PURE__ */ new Set();
        const all = [...c1, ...c2, ...c3].filter((c) => {
          if (seen.has(c.name)) return false;
          seen.add(c.name);
          return true;
        });
        return send(res, 200, { cookies: all.map((c) => ({ name: c.name, value: c.value })) });
      }
      const body = await parseBody(req);
      const pid = Number(body.profileId ?? 0);
      if (req.method === "POST" && u.pathname === "/eb/open") {
        const parsedFp = body.ebFingerprint ? typeof body.ebFingerprint === "string" ? JSON.parse(body.ebFingerprint) : body.ebFingerprint : null;
        openEbWindow({
          profileId: pid,
          username: body.username ?? String(pid),
          password: body.password,
          twoFAKey: body.twoFAKey,
          proxy: body.proxy,
          useHomeIp: body.useHomeIp === true,
          userAgent: body.userAgent,
          apiUA: body.apiUA,
          ebFingerprint: parsedFp,
          initialUrl: body.initialUrl ?? void 0,
          verifyMode: body.verifyMode === true,
          silentMode: body.silentMode === true
        }).catch((err) => console.error(`[eb:open:${pid}] openEbWindow error:`, err?.message ?? err));
        return send(res, 200, { ok: true });
      }
      if (req.method === "POST" && u.pathname === "/eb/focus") {
        const e = ebMap.get(pid);
        if (e && !e.win.isDestroyed()) {
          if (e.win.isMinimized()) e.win.restore();
          e.win.focus();
        }
        return send(res, 200, { ok: true });
      }
      if (req.method === "POST" && u.pathname === "/eb/close") {
        const e = ebMap.get(pid);
        if (e && !e.win.isDestroyed()) {
          if (pid >= 0) {
            const ses = import_electron.session.fromPartition(ebPartition(pid));
            await saveCookiesToFile(pid, ses);
          } else {
            try {
              import_fs.default.unlinkSync(cookieFilePath(pid));
            } catch {
            }
          }
          e.win.destroy();
        } else if (pid < 0) {
          try {
            import_fs.default.unlinkSync(cookieFilePath(pid));
          } catch {
          }
        }
        if (pid < 0) {
          const s = -pid;
          _ghostSignupAbortTokens.set(s, (_ghostSignupAbortTokens.get(s) ?? 0) + 1);
        }
        return send(res, 200, { ok: true });
      }
      if (req.method === "POST" && u.pathname === "/eb/navigate") {
        const e = ebMap.get(pid);
        if (e && !e.win.isDestroyed()) {
          const targetWc = getActiveWc(pid) ?? e.win.webContents;
          console.log(`[eb-ipc:${pid}] /eb/navigate \u2192 url="${body.url}" target=${targetWc === e.win.webContents ? "win.webContents (shell/no-tabs)" : "active tab BrowserView"}`);
          targetWc.loadURL(body.url).catch((err) => {
            console.log(`[eb-ipc:${pid}] /eb/navigate loadURL error: ${err?.message}`);
          });
        }
        return send(res, 200, { ok: true });
      }
      if (req.method === "POST" && u.pathname === "/eb/clear-session") {
        const partition = ebPartition(pid);
        const ses = import_electron.session.fromPartition(partition);
        for (const origin of ["https://www.instagram.com", "https://i.instagram.com"]) {
          await ses.clearStorageData({
            origin,
            storages: ["cookies", "localstorage", "indexdb", "serviceworkers", "cachestorage"]
          }).catch(() => {
          });
        }
        const allCks = await ses.cookies.get({ domain: ".instagram.com" }).catch(() => []);
        for (const c of allCks) {
          await ses.cookies.remove("https://www.instagram.com", c.name).catch(() => {
          });
          await ses.cookies.remove("https://instagram.com", c.name).catch(() => {
          });
        }
        const e = ebMap.get(pid);
        if (e && !e.win.isDestroyed()) {
          e.win.webContents.loadURL("https://www.instagram.com/accounts/login/").catch(() => {
          });
          console.log(`[clear-session:${pid}] Electron session cleared + window navigated to login`);
        } else {
          console.log(`[clear-session:${pid}] Electron session cleared (no open window)`);
        }
        return send(res, 200, { ok: true });
      }
      if (req.method === "POST" && u.pathname === "/eb/evaluate") {
        const e = ebMap.get(pid);
        if (!e || e.win.isDestroyed()) return send(res, 404, { error: "window not open" });
        const targetWc = getActiveWc(pid) ?? e.win.webContents;
        const targetKind = targetWc === e.win.webContents ? "win.webContents (shell/no-tabs)" : "active tab BrowserView";
        const targetUrl = (() => {
          try {
            return targetWc.getURL();
          } catch {
            return "(no getURL)";
          }
        })();
        const result = await targetWc.executeJavaScript(body.script).catch((err) => ({ __error: err?.message }));
        console.log(`[eb-ipc:${pid}] /eb/evaluate target=${targetKind} url="${targetUrl}" resultType=${typeof result} result=${JSON.stringify(result)?.slice(0, 200)}`);
        return send(res, 200, { result });
      }
      if (req.method === "POST" && u.pathname === "/eb/set-cookies") {
        const ses = import_electron.session.fromPartition(ebPartition(pid));
        for (const c of body.cookies ?? []) {
          await ses.cookies.set({
            url: "https://www.instagram.com",
            name: c.name,
            value: c.value,
            domain: c.domain ?? ".instagram.com",
            path: c.path ?? "/",
            secure: true,
            sameSite: "no_restriction"
          }).catch(() => {
          });
        }
        return send(res, 200, { ok: true });
      }
      if (req.method === "POST" && u.pathname === "/eb/delete-cookies") {
        const ses = import_electron.session.fromPartition(ebPartition(pid));
        for (const name of body.names ?? []) {
          await ses.cookies.remove("https://www.instagram.com", name).catch(() => {
          });
          await ses.cookies.remove("https://instagram.com", name).catch(() => {
          });
        }
        return send(res, 200, { ok: true });
      }
      if (req.method === "POST" && u.pathname === "/eb/silent-follow") {
        const targetUsername = (body.targetUsername ?? "").trim();
        if (!pid || !targetUsername) return send(res, 400, { error: "profileId and targetUsername required" });
        if (_sfInProgress.has(pid)) {
          _ipcLog(`[eb:silent-follow:${pid}] follow already in progress for this window \u2014 returning retry-next-cycle`);
          return send(res, 200, { ok: false, status: "follow_blocked", reason: "concurrent-limit \u2014 will retry automatically next cycle" });
        }
        _sfInProgress.add(pid);
        const ebEntry = ebMap.get(pid);
        const ebIsOpen = !!(ebEntry && !ebEntry.win.isDestroyed());
        let sfWin;
        let sfTempWin = null;
        if (ebIsOpen) {
          sfWin = ebEntry.win;
          _ipcLog(`[eb:silent-follow:${pid}] mode A \u2014 reusing open EB window for @${targetUsername}`);
        } else {
          const sfPartition = `persist:eb-${pid}`;
          const sfSes = import_electron.session.fromPartition(sfPartition);
          const rawCookies = body.igApiCookies ?? "";
          if (rawCookies) {
            const cookiePairs = rawCookies.split(";").map((s) => s.trim()).filter(Boolean);
            for (const pair of cookiePairs) {
              const eqIdx = pair.indexOf("=");
              if (eqIdx < 1) continue;
              const name = pair.slice(0, eqIdx).trim();
              const value = pair.slice(eqIdx + 1).trim();
              if (!name || !value) continue;
              try {
                await sfSes.cookies.set({
                  url: "https://www.instagram.com",
                  name,
                  value,
                  domain: ".instagram.com",
                  path: "/",
                  secure: true,
                  httpOnly: name === "sessionid" || name === "csrftoken",
                  sameSite: "no_restriction"
                });
              } catch (ckErr) {
                _ipcLog(`[WARN] [eb:silent-follow:${pid}] cookie inject failed for "${name}": ${ckErr?.message}`);
              }
            }
            _ipcLog(`[eb:silent-follow:${pid}] mode B \u2014 injected ${cookiePairs.length} cookies into session (${cookiePairs.map((p) => p.split("=")[0]).join(",")})`);
          } else {
            _ipcLog(`[WARN] [eb:silent-follow:${pid}] mode B \u2014 no igApiCookies provided; session will be unauthenticated`);
          }
          const bodyProxy = body.proxy;
          if (!bodyProxy?.host || !bodyProxy?.port) {
            _sfInProgress.delete(pid);
            _ipcLog(`[ERROR] [eb:silent-follow:${pid}] mode B \u2014 no proxy configured for this account; action aborted to prevent real IP leak`);
            return send(res, 400, { error: `No proxy configured for account ${pid} \u2014 action aborted to prevent real IP leak` });
          }
          try {
            await sfSes.clearHostResolverCache();
            await sfSes.setProxy(buildProxyConfig(bodyProxy));
          } catch (proxyErr) {
            _sfInProgress.delete(pid);
            _ipcLog(`[ERROR] [eb:silent-follow:${pid}] mode B \u2014 proxy set failed; action aborted to prevent real IP leak: ${proxyErr?.message}`);
            return send(res, 500, { error: `Proxy setup failed for account ${pid} \u2014 action aborted to prevent real IP leak: ${proxyErr?.message}` });
          }
          const { width: _sfSw } = eScreen.getPrimaryDisplay().workAreaSize;
          sfTempWin = new import_electron.BrowserWindow({
            width: 1280,
            height: 820,
            x: _sfSw + 10,
            // off the right edge of every monitor
            y: 0,
            show: false,
            skipTaskbar: true,
            webPreferences: {
              nodeIntegration: false,
              contextIsolation: true,
              sandbox: true,
              // prevent window.require leak
              partition: sfPartition,
              backgroundThrottling: false
            }
          });
          sfTempWin.showInactive();
          sfTempWin.webContents.on("login", (event, _rq, _auth, cb) => {
            event.preventDefault();
            cb(bodyProxy?.user ?? "", bodyProxy?.pass ?? "");
          });
          await armSilentWindowAntiDetection(sfTempWin, {
            browserUA: body.userAgent ?? null,
            apiUA: body.apiUA ?? null,
            ebFingerprint: body.ebFingerprint ?? null
          });
          sfWin = sfTempWin;
          _ipcLog(`[eb:silent-follow:${pid}] mode B \u2014 created off-screen background window (partition=${sfPartition}) for @${targetUsername}`);
        }
        const prevUrl = ebIsOpen ? (() => {
          try {
            const u2 = sfWin.webContents.getURL();
            return u2 && u2 !== "about:blank" ? u2 : "https://www.instagram.com/";
          } catch {
            return "https://www.instagram.com/";
          }
        })() : "https://www.instagram.com/";
        const sfCleanup = () => {
          if (sfTempWin) {
            try {
              if (!sfTempWin.isDestroyed()) sfTempWin.destroy();
            } catch {
            }
            sfTempWin = null;
          } else {
            try {
              sfWin.webContents.loadURL(prevUrl).catch(() => {
              });
            } catch {
            }
          }
        };
        let sfSettled = false;
        const sfWatchdog = setTimeout(() => {
          if (sfSettled) return;
          sfSettled = true;
          _sfInProgress.delete(pid);
          _ipcLog(`[ERROR] [eb:silent-follow:${pid}] WATCHDOG \u2014 handler exceeded 80s for @${targetUsername}`);
          sfCleanup();
          try {
            send(res, 200, { ok: false, status: "follow_blocked", reason: "watchdog_timeout \u2014 follow took too long" });
          } catch {
          }
        }, 8e4);
        const sfRespond = (status, payload) => {
          if (sfSettled) return;
          sfSettled = true;
          clearTimeout(sfWatchdog);
          send(res, status, payload);
        };
        const sfRestoreUrl = sfCleanup;
        try {
          const profileUrl = `https://www.instagram.com/${encodeURIComponent(targetUsername)}/`;
          _ipcLog(`[eb:silent-follow:${pid}] START target=@${targetUsername} prevUrl="${prevUrl.slice(0, 100)}" \u2192 ${profileUrl}`);
          const _sfT0 = Date.now();
          let sfNavError = null;
          const _sfLoadResult = await Promise.race([
            sfWin.webContents.loadURL(profileUrl).then(() => "ok").catch((e) => {
              sfNavError = e;
              return "err";
            }),
            new Promise((r) => setTimeout(() => r("timeout"), 3e4))
          ]);
          if (_sfLoadResult === "timeout") {
            try {
              sfWin.webContents.stop();
            } catch {
            }
            _ipcLog(`[WARN] [eb:silent-follow:${pid}] loadURL hit 30s cap at T+${Date.now() - _sfT0}ms \u2014 stopped navigation, proceeding with partially loaded page`);
          } else {
            _ipcLog(`[eb:silent-follow:${pid}] loadURL ${_sfLoadResult} in ${Date.now() - _sfT0}ms`);
          }
          if (sfNavError) {
            const msg = sfNavError.message ?? String(sfNavError);
            _ipcLog(`[WARN] [eb:silent-follow:${pid}] loadURL failed \u2014 ${msg}`);
            sfRestoreUrl();
            return sfRespond(200, { ok: false, status: "follow_blocked", reason: `Browser navigation failed: ${msg}` });
          }
          const landedUrl = (() => {
            try {
              return sfWin.webContents.getURL();
            } catch {
              return "";
            }
          })();
          const isLoginUrl = /instagram\.com(?:\/[a-z]{2}(?:-[a-z]{2})?)?\/accounts\/login/i.test(landedUrl) || landedUrl.includes("/accounts/onetap/") || landedUrl.includes("/accounts/suspended/");
          const isLoginDom = isLoginUrl ? false : await Promise.race([
            sfWin.webContents.executeJavaScript(`
              (function() {
                var pwdInput = document.querySelector('input[type="password"]');
                if (pwdInput && pwdInput.offsetParent !== null) return true;
                var btns = Array.from(document.querySelectorAll('button, [role="button"]'));
                for (var i = 0; i < btns.length; i++) {
                  var t = (btns[i].innerText || btns[i].textContent || '').trim().toLowerCase();
                  if (t === 'log in' || t.startsWith('continue as')) return true;
                }
                if (document.title.toLowerCase().includes('log in') ||
                    document.title.toLowerCase().includes('sign up')) return true;
                return false;
              })()
            `, true).catch(() => false),
            new Promise((r) => setTimeout(() => r(false), 5e3))
          ]);
          const isLoginPage = isLoginUrl || isLoginDom;
          const isCheckpointPage = isLoginPage ? false : await Promise.race([
            sfWin.webContents.executeJavaScript(`
              (function() {
                var url = location.href.toLowerCase();
                if (url.includes('/challenge/') || url.includes('/accounts/suspicious')) return true;
                var bodyText = (document.body ? document.body.innerText : '').toLowerCase();
                var markers = [
                  'we suspect automated behavior',
                  'we detected unusual activity',
                  "confirm it's you",
                  'help us confirm',
                  'suspicious activity',
                  'action blocked',
                  'try again later',
                ];
                return markers.some(function(m) { return bodyText.indexOf(m) !== -1; });
              })()
            `, true).catch(() => false),
            new Promise((r) => setTimeout(() => r(false), 5e3))
          ]);
          _ipcLog(`[eb:silent-follow:${pid}] landed \u2192 "${landedUrl.slice(0, 200)}" loginUrl=${isLoginUrl} loginDom=${isLoginDom} checkpoint=${isCheckpointPage}`);
          if (isCheckpointPage) {
            _ipcLog(`[WARN] [eb:silent-follow:${pid}] CHECKPOINT DETECTED on @${targetUsername}'s page \u2014 url="${landedUrl.slice(0, 200)}"`);
            sfRestoreUrl();
            return sfRespond(200, { ok: false, status: "checkpoint_detected", reason: "Instagram checkpoint/suspicious-activity page shown \u2014 halt further automation on this account until manually reviewed" });
          }
          if (isLoginPage) {
            const reason = isLoginDom ? "Continue-as overlay (DOM)" : "login redirect (URL)";
            _ipcLog(`[WARN] [eb:silent-follow:${pid}] SESSION EXPIRED \u2014 ${reason}. Account needs re-verify.`);
            sfRestoreUrl();
            return sfRespond(200, { ok: false, status: "follow_blocked", reason: "session_expired \u2014 browser session logged out" });
          }
          _ipcLog(`[eb:silent-follow:${pid}] polling for Follow button (T+${Date.now() - _sfT0}ms since loadURL start)`);
          let _btnOuterTimer;
          const btnInfo = await Promise.race([
            sfWin.webContents.executeJavaScript(`
              new Promise(function(resolve) {
                var tries = 0, MAX = 40; // 20 s
                function isFollow(el) {
                  var l = ((el.getAttribute ? el.getAttribute('aria-label') : '') || '').toLowerCase().trim();
                  var t = (el.innerText || el.textContent || '').replace(/\\s+/g, ' ').toLowerCase().trim();
                  // aria-label may be "Follow" OR "Follow @username" \u2014 starts-with handles both;
                  // exclude "following" (already following) and "follow request sent".
                  if (l && (l === 'follow' || l === 'follow back' || (l.startsWith('follow ') && !l.startsWith('following') && !l.startsWith('follow request')))) return true;
                  return t === 'follow' || t === 'follow back';
                }
                function isAlready(el) {
                  var l = ((el.getAttribute ? el.getAttribute('aria-label') : '') || '').toLowerCase().trim();
                  var t = (el.innerText || el.textContent || '').replace(/\\s+/g, ' ').toLowerCase().trim();
                  if (l && (l.startsWith('following') || l.startsWith('requested') || l.startsWith('follow request'))) return true;
                  return t === 'following' || t === 'requested';
                }
                function check() {
                  var cands = Array.from(document.querySelectorAll('button, [role="button"]'));
                  var followBtn = cands.find(function(b) { return !b.disabled && isFollow(b); });
                  if (followBtn) {
                    var r = followBtn.getBoundingClientRect();
                    if (r.width > 0 && r.height > 0) {
                      resolve({ found: true, x: r.left, y: r.top, w: r.width, h: r.height });
                      return;
                    }
                  }
                  var alreadyBtn = cands.find(function(b) { return isAlready(b); });
                  if (alreadyBtn) { resolve({ found: false, alreadyFollowing: true }); return; }
                  if (++tries >= MAX) { resolve({ found: false, timedOut: true }); return; }
                  setTimeout(check, 500);
                }
                check();
              })
            `, true).catch(() => ({ found: false, timedOut: true })),
            new Promise((r) => {
              _btnOuterTimer = setTimeout(() => {
                _ipcLog(`[WARN] [eb:silent-follow:${pid}] btnInfo poll hit 25s outer timeout`);
                r({ found: false, timedOut: true, contextDestroyed: true });
              }, 25e3);
            })
          ]);
          clearTimeout(_btnOuterTimer);
          if (btnInfo?.found) {
            const acctSeed = (pid * 2654435761 >>> 0) / 4294967296;
            const freshRect = await Promise.race([
              sfWin.webContents.executeJavaScript(`
                (function() {
                  var btn = Array.from(document.querySelectorAll('button, [role="button"]')).find(function(b) {
                    if (b.disabled) return false;
                    var l = ((b.getAttribute ? b.getAttribute('aria-label') : '') || '').toLowerCase().trim();
                    var t = (b.innerText || b.textContent || '').replace(/\\s+/g, ' ').toLowerCase().trim();
                    if (l && (l === 'follow' || l === 'follow back' || (l.startsWith('follow ') && !l.startsWith('following') && !l.startsWith('follow request')))) return true;
                    return t === 'follow' || t === 'follow back';
                  });
                  if (!btn) return null;
                  var r = btn.getBoundingClientRect();
                  if (r.width <= 0 || r.height <= 0) return null;
                  return { x: r.left, y: r.top, w: r.width, h: r.height };
                })()
              `, true).catch(() => null),
              new Promise((r) => setTimeout(() => r(null), 5e3))
            ]);
            const rect = freshRect ?? btnInfo;
            const tapX = Math.round(rect.x + (0.3 + acctSeed * 0.4) * rect.w);
            const tapY = Math.round(rect.y + (0.35 + acctSeed * 7919 % 0.3) * rect.h);
            const sfDbg = sfWin.webContents.debugger;
            let dbgAttached = false;
            const useCdp = !sfTempWin;
            try {
              if (useCdp) {
                try {
                  sfDbg.attach("1.3");
                  dbgAttached = true;
                } catch {
                }
              }
              let cdpOk = false;
              if (dbgAttached) {
                try {
                  await cdpTapGesture(sfDbg, tapX, tapY);
                  cdpOk = true;
                } catch {
                }
              }
              await Promise.race([
                sfWin.webContents.executeJavaScript(`
                  (function() {
                    var btn = Array.from(document.querySelectorAll('button, [role="button"]')).find(function(b) {
                      if (b.disabled) return false;
                      var l = ((b.getAttribute ? b.getAttribute('aria-label') : '') || '').toLowerCase().trim();
                      var t = (b.innerText || b.textContent || '').replace(/\\s+/g, ' ').toLowerCase().trim();
                      if (l && (l === 'follow' || l === 'follow back' || (l.startsWith('follow ') && !l.startsWith('following') && !l.startsWith('follow request')))) return true;
                      return t === 'follow' || t === 'follow back';
                    });
                    if (btn) { btn.click(); return true; }
                    return false;
                  })()
                `, true).catch(() => false),
                new Promise((r) => setTimeout(() => r(false), 3e3))
              ]);
              _ipcLog(`[eb:silent-follow:${pid}] click dispatched (cdp=${cdpOk}, js=always, tap=${tapX},${tapY})`);
              let confirmed = false;
              const confirmDeadline = Date.now() + 3e4;
              while (Date.now() < confirmDeadline) {
                await new Promise((r) => setTimeout(r, 300));
                const state = await Promise.race([
                  sfWin.webContents.executeJavaScript(`
                    (function() {
                      var cands = Array.from(document.querySelectorAll('button, [role="button"]'));
                      var done = cands.some(function(b) {
                        var l = ((b.getAttribute ? b.getAttribute('aria-label') : '') || '').toLowerCase().trim();
                        var t = (b.innerText || b.textContent || '').replace(/\\s+/g, ' ').toLowerCase().trim();
                        return (l && (l.startsWith('following') || l.startsWith('requested') || l.startsWith('follow request'))) || t === 'following' || t === 'requested';
                      });
                      var stillFollow = cands.some(function(b) {
                        var l = ((b.getAttribute ? b.getAttribute('aria-label') : '') || '').toLowerCase().trim();
                        var t = (b.innerText || b.textContent || '').replace(/\\s+/g, ' ').toLowerCase().trim();
                        return (l && (l === 'follow' || l === 'follow back' || (l.startsWith('follow ') && !l.startsWith('following') && !l.startsWith('follow request')))) || t === 'follow' || t === 'follow back';
                      });
                      return { done: done, stillFollow: stillFollow };
                    })()
                  `, true).catch(() => null),
                  new Promise((r) => setTimeout(() => r(null), 2e3))
                ]);
                if (state?.done) {
                  confirmed = true;
                  break;
                }
                if (!state?.stillFollow && !state?.done) {
                  confirmed = true;
                  break;
                }
              }
              if (!confirmed) {
                _ipcLog(`[WARN] [eb:silent-follow:${pid}] click sent but Following state NOT confirmed for @${targetUsername} \u2014 returning failure`);
                sfRestoreUrl();
                return sfRespond(200, { ok: false, status: "follow_blocked", reason: "tap_not_confirmed \u2014 click fired but Instagram did not register the follow" });
              }
            } finally {
              if (dbgAttached) try {
                sfDbg.detach();
              } catch {
              }
            }
            _ipcLog(`[eb:silent-follow:${pid}] followed @${targetUsername} \u2713 (tap ${tapX},${tapY} confirmed)`);
            sfRestoreUrl();
            return sfRespond(200, { ok: true });
          } else if (btnInfo?.alreadyFollowing) {
            _ipcLog(`[eb:silent-follow:${pid}] already following @${targetUsername}`);
            sfRestoreUrl();
            return sfRespond(200, { ok: true, status: "already_following", reason: "Already following" });
          } else {
            if (btnInfo?.contextDestroyed) {
              _ipcLog(`[WARN] [eb:silent-follow:${pid}] Follow button not found \u2014 renderer context destroyed (outer 25s timeout). Restoring URL.`);
              sfRestoreUrl();
              return sfRespond(200, { ok: false, status: "follow_blocked", reason: "Follow button not found on page" });
            }
            const _rcUrl = (() => {
              try {
                return sfWin.webContents.getURL();
              } catch {
                return "";
              }
            })();
            const _rcIsLoginUrl = /instagram\.com(?:\/[a-z]{2}(?:-[a-z]{2})?)?\/accounts\/login/i.test(_rcUrl) || _rcUrl.includes("/accounts/onetap/") || _rcUrl.includes("/accounts/suspended/");
            const _rcIsLoginDom = _rcIsLoginUrl ? false : await Promise.race([
              sfWin.webContents.executeJavaScript(`
                (function() {
                  var pwdInput = document.querySelector('input[type="password"]');
                  if (pwdInput && pwdInput.offsetParent !== null) return true;
                  var btns = Array.from(document.querySelectorAll('button,[role="button"]'));
                  for (var i = 0; i < btns.length; i++) {
                    var t = (btns[i].innerText || btns[i].textContent || '').trim().toLowerCase();
                    if (t === 'log in' || t.startsWith('continue as')) return true;
                  }
                  return false;
                })()
              `, true).catch(() => false),
              new Promise((r) => setTimeout(() => r(false), 3e3))
            ]);
            if (_rcIsLoginUrl || _rcIsLoginDom) {
              const _rcReason = _rcIsLoginDom ? "Continue-as overlay (DOM)" : "login redirect (URL)";
              _ipcLog(`[WARN] [eb:silent-follow:${pid}] SESSION EXPIRED (re-check after poll) \u2014 ${_rcReason} url="${_rcUrl.slice(0, 200)}"`);
              sfRestoreUrl();
              return sfRespond(200, { ok: false, status: "follow_blocked", reason: "session_expired \u2014 browser session logged out" });
            }
            _ipcLog(`[WARN] [eb:silent-follow:${pid}] Follow button not found on @${targetUsername}'s page (timed out after 20s) \u2014 url="${_rcUrl.slice(0, 200)}"`);
            sfRestoreUrl();
            return sfRespond(200, { ok: false, status: "follow_blocked", reason: "Follow button not found on page" });
          }
        } catch (sfErr) {
          _ipcLog(`[ERROR] [eb:silent-follow:${pid}] error: ${sfErr?.message}`);
          sfRestoreUrl();
          return sfRespond(200, { ok: false, status: "follow_blocked", reason: sfErr?.message ?? "Unknown error" });
        } finally {
          _sfInProgress.delete(pid);
          _ipcLog(`[eb:silent-follow:${pid}] done (in-progress cleared)`);
        }
      }
      if (req.method === "POST" && u.pathname === "/eb/silent-post") {
        const imageBase64 = body.imageBase64 ?? "";
        const caption = String(body.caption ?? "");
        if (!pid || !imageBase64) return send(res, 400, { error: "profileId and imageBase64 required" });
        const tmpPath = import_path.default.join(_cookiesDir, `silent-post-${pid}-${Date.now()}.jpg`);
        try {
          import_fs.default.writeFileSync(tmpPath, Buffer.from(imageBase64, "base64"));
        } catch (we) {
          return send(res, 500, { ok: false, message: `Failed to write temp image: ${we?.message}` });
        }
        const spEbEntry = ebMap.get(pid);
        const spEbIsOpen = !!(spEbEntry && !spEbEntry.win.isDestroyed());
        let spWin;
        let spTempWin = null;
        let _spTmpUnlinked = false;
        const _spSafeUnlink = () => {
          if (!_spTmpUnlinked) {
            _spTmpUnlinked = true;
            try {
              import_fs.default.unlinkSync(tmpPath);
            } catch {
            }
          }
        };
        if (spEbIsOpen) {
          spWin = spEbEntry.win;
          _ipcLog(`[eb:silent-post:${pid}] mode A \u2014 reusing open EB window`);
        } else {
          const spPartition = `persist:eb-${pid}`;
          const spSes = import_electron.session.fromPartition(spPartition);
          try {
            const cfPath = cookieFilePath(pid);
            if (import_fs.default.existsSync(cfPath)) {
              const rawCookies = JSON.parse(import_fs.default.readFileSync(cfPath, "utf8"));
              for (const c of rawCookies) {
                await spSes.cookies.set({
                  url: "https://www.instagram.com",
                  name: c.name,
                  value: c.value,
                  domain: c.domain ?? ".instagram.com",
                  path: c.path ?? "/",
                  secure: true,
                  sameSite: "no_restriction"
                }).catch(() => {
                });
              }
            }
          } catch {
          }
          let _spUA;
          let _spApiUA;
          let _spFingerprint = null;
          let _spProxyCreds = null;
          try {
            const proxyRes = await fetch(`http://127.0.0.1:${_serverPort}/api/profiles/${pid}/eb-proxy`);
            if (!proxyRes.ok) throw new Error(`eb-proxy fetch returned ${proxyRes.status}`);
            const pd = await proxyRes.json();
            if (!pd.proxy?.host || !pd.proxy?.port) {
              _spSafeUnlink();
              _ipcLog(`[ERROR] [eb:silent-post:${pid}] mode B \u2014 no proxy configured for this account; action aborted to prevent real IP leak`);
              return send(res, 400, { error: `No proxy configured for account ${pid} \u2014 action aborted to prevent real IP leak` });
            }
            _spProxyCreds = { user: pd.proxy.user, pass: pd.proxy.pass };
            await spSes.clearHostResolverCache().catch(() => {
            });
            await spSes.setProxy(buildProxyConfig(pd.proxy));
            if (pd.userAgent) _spUA = pd.userAgent;
            if (pd.apiUA) _spApiUA = pd.apiUA;
            if (pd.ebFingerprint) _spFingerprint = pd.ebFingerprint;
          } catch (proxyErr) {
            _spSafeUnlink();
            _ipcLog(`[ERROR] [eb:silent-post:${pid}] mode B \u2014 proxy fetch/set failed; action aborted to prevent real IP leak: ${proxyErr?.message}`);
            return send(res, 500, { error: `Proxy setup failed for account ${pid} \u2014 action aborted to prevent real IP leak: ${proxyErr?.message}` });
          }
          const { width: _spSw } = eScreen.getPrimaryDisplay().workAreaSize;
          spTempWin = new import_electron.BrowserWindow({
            width: 1280,
            height: 820,
            x: _spSw + 10,
            y: 0,
            // off right edge — never visible
            show: false,
            skipTaskbar: true,
            webPreferences: {
              nodeIntegration: false,
              contextIsolation: true,
              sandbox: true,
              // prevent window.require leak
              partition: spPartition,
              backgroundThrottling: false
            }
          });
          spTempWin.showInactive();
          spTempWin.webContents.on("login", (event, _rq, _auth, cb) => {
            event.preventDefault();
            cb(_spProxyCreds?.user ?? "", _spProxyCreds?.pass ?? "");
          });
          await armSilentWindowAntiDetection(spTempWin, {
            browserUA: _spUA ?? null,
            apiUA: _spApiUA ?? null,
            ebFingerprint: _spFingerprint ?? null
          });
          if (_spUA) spTempWin.webContents.setUserAgent(_spUA);
          spWin = spTempWin;
          _ipcLog(`[eb:silent-post:${pid}] mode B \u2014 created off-screen 1280\xD7820 window`);
        }
        const spPrevUrl = spEbIsOpen ? (() => {
          try {
            const u2 = spWin.webContents.getURL();
            return u2 && u2 !== "about:blank" ? u2 : "https://www.instagram.com/";
          } catch {
            return "https://www.instagram.com/";
          }
        })() : "https://www.instagram.com/";
        const spCleanup = () => {
          if (spTempWin) {
            try {
              if (!spTempWin.isDestroyed()) spTempWin.destroy();
            } catch {
            }
            spTempWin = null;
          } else {
            try {
              spWin.webContents.loadURL(spPrevUrl).catch(() => {
              });
            } catch {
            }
          }
          _spSafeUnlink();
        };
        let spSettled = false;
        const spWatchdog = setTimeout(() => {
          if (spSettled) return;
          spSettled = true;
          _ipcLog(`[ERROR] [eb:silent-post:${pid}] WATCHDOG \u2014 handler exceeded 120s`);
          spCleanup();
          try {
            send(res, 200, { ok: false, message: "watchdog_timeout \u2014 post took too long" });
          } catch {
          }
        }, 12e4);
        try {
          const dbg = spWin.webContents.debugger;
          try {
            dbg.attach("1.3");
          } catch {
          }
          await Promise.race([
            dbg.sendCommand("DOM.enable").catch(() => {
            }),
            new Promise((r) => setTimeout(r, 8e3))
          ]);
          _ipcLog(`[eb:silent-post:${pid}] navigating to instagram.com homepage`);
          await Promise.race([
            spWin.webContents.loadURL("https://www.instagram.com/").catch(() => {
            }),
            new Promise((r) => setTimeout(r, 3e4))
          ]);
          const spLoggedIn = await new Promise((resolve) => {
            let tries = 0;
            const t = setInterval(() => {
              const url = spWin.isDestroyed() ? "" : spWin.webContents.getURL();
              if (url.includes("instagram.com") && !url.includes("/accounts/login") && !url.includes("/auth_platform/") && url !== "about:blank") {
                clearInterval(t);
                resolve(true);
                return;
              }
              if (++tries >= 60) {
                clearInterval(t);
                resolve(false);
              }
            }, 500);
          });
          if (!spLoggedIn) throw new Error("Instagram page not ready \u2014 account not logged in");
          await spWin.webContents.executeJavaScript(`
            (function() {
              try { Object.defineProperty(document, 'visibilityState', { get: () => 'visible', configurable: true }); } catch (e) {}
              try { Object.defineProperty(document, 'hidden', { get: () => false, configurable: true }); } catch (e) {}
              document.dispatchEvent(new Event('visibilitychange'));
            })()
          `, true).catch(() => {
          });
          await new Promise((r) => setTimeout(r, 1e3));
          _ipcLog(`[eb:silent-post:${pid}] locating Create button (poll up to 20s)`);
          const spFindCreateJs = `
            (function() {
              var btn = null;
              // 1. aria-label exact matches (most reliable when sidebar is expanded)
              btn = document.querySelector('[aria-label="New post"], [aria-label="Create"], [aria-label="create"]');
              // 2. Broad aria-label substring \u2014 catches "Create" inside longer labels
              if (!btn) btn = document.querySelector('[aria-label*="reate"]');
              // 3. href-based
              if (!btn) btn = document.querySelector('a[href="/create/"], a[href*="/create"]');
              // 4. Visible text "Create" in any span/anchor (sidebar expanded)
              if (!btn) {
                var spans = Array.from(document.querySelectorAll('nav span, [role="navigation"] span, a span, div span'));
                var createSpan = spans.find(function(s) { return s.textContent.trim() === 'Create' && s.offsetHeight > 0; });
                if (createSpan) btn = createSpan.closest('a, [role="link"], [role="button"], button') || createSpan;
              }
              // 5. Any element (including collapsed icons) whose accessible text is "Create"
              if (!btn) {
                var els = Array.from(document.querySelectorAll('a, [role="link"], [role="button"], button'));
                btn = els.find(function(el) {
                  var lbl = (el.getAttribute('aria-label') || el.getAttribute('title') || '').toLowerCase();
                  return lbl === 'create' || lbl === 'new post' || lbl.includes('create post');
                }) || null;
              }
              // 6. SVG title matching
              if (!btn) {
                var titles = Array.from(document.querySelectorAll('svg title'));
                var ct = titles.find(function(t) { var tx = (t.textContent || '').toLowerCase(); return tx === 'create' || tx.includes('new post'); });
                if (ct) btn = ct.closest('a, [role="link"], button') || null;
              }
              if (!btn || btn.offsetHeight === 0) return { found: false, x: 0, y: 0 };
              var rect = btn.getBoundingClientRect();
              return { found: true, x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) };
            })()
          `;
          const spRealClick = async (x, y) => {
            await dbg.sendCommand("Input.dispatchMouseEvent", {
              type: "mousePressed",
              x,
              y,
              button: "left",
              clickCount: 1
            }).catch(() => {
            });
            await new Promise((r) => setTimeout(r, 60));
            await dbg.sendCommand("Input.dispatchMouseEvent", {
              type: "mouseReleased",
              x,
              y,
              button: "left",
              clickCount: 1
            }).catch(() => {
            });
          };
          let spClickedCreate = false;
          let spCreateOpenedDialogDirectly = false;
          const spCreateDeadline = Date.now() + 2e4;
          let spLastFoundButNotClicked = false;
          while (Date.now() < spCreateDeadline) {
            if (spWin.isDestroyed()) break;
            const spCreatePos = await spWin.webContents.executeJavaScript(spFindCreateJs, true).catch(() => ({ found: false, x: 0, y: 0 }));
            if (spCreatePos.found) {
              spLastFoundButNotClicked = true;
              await dbg.sendCommand("Input.dispatchMouseEvent", {
                type: "mouseMoved",
                x: spCreatePos.x,
                y: spCreatePos.y,
                button: "none",
                clickCount: 0
              }).catch(() => {
              });
              await new Promise((r) => setTimeout(r, 800));
              const spFreshPos = await spWin.webContents.executeJavaScript(spFindCreateJs, true).catch(() => ({ found: false, x: 0, y: 0 }));
              const clickX = spFreshPos.found ? spFreshPos.x : spCreatePos.x;
              const clickY = spFreshPos.found ? spFreshPos.y : spCreatePos.y;
              _ipcLog(`[eb:silent-post:${pid}] clicking Create nav item at (${clickX}, ${clickY}) via trusted CDP click`);
              await spRealClick(clickX, clickY);
              await new Promise((r) => setTimeout(r, 700));
              const spMenuOrDialogState = await spWin.webContents.executeJavaScript(`
                (function() {
                  var all = Array.from(document.querySelectorAll('button, [role="menuitem"], [role="option"], a, span'));
                  var menu = all.some(function(el) { return el.textContent.trim() === 'Post' && el.offsetHeight > 0; });
                  var bodyText = document.body.innerText || '';
                  var dialog = /select from computer/i.test(bodyText) || /create new post/i.test(bodyText) || /drag (photos|photo) and videos here/i.test(bodyText);
                  return { menu: menu, dialog: dialog };
                })()
              `, true).catch(() => ({ menu: false, dialog: false }));
              if (spMenuOrDialogState.menu || spMenuOrDialogState.dialog) {
                spClickedCreate = true;
                spCreateOpenedDialogDirectly = spMenuOrDialogState.dialog && !spMenuOrDialogState.menu;
                break;
              }
            }
            await new Promise((r) => setTimeout(r, 500));
          }
          if (!spClickedCreate) {
            const reason = spLastFoundButNotClicked ? "found the Create button and clicked it, but neither the Post dropdown nor the upload dialog ever opened" : "the Create button never appeared in the Instagram left nav after 20s \u2014 is the account logged in?";
            throw new Error(`Could not click Create button \u2014 ${reason}`);
          }
          await new Promise((r) => setTimeout(r, 500));
          if (spCreateOpenedDialogDirectly) {
            _ipcLog(`[eb:silent-post:${pid}] Create opened the upload dialog directly \u2014 no Post submenu on this account, skipping`);
          } else {
            _ipcLog(`[eb:silent-post:${pid}] clicking Post from submenu`);
            const spFindPostJs = `
              (function() {
                var all = Array.from(document.querySelectorAll('button, [role="menuitem"], [role="option"], a, span'));
                var postItem = all.find(function(el) {
                  return el.textContent.trim() === 'Post' && el.offsetHeight > 0;
                });
                if (!postItem) return { found: false, x: 0, y: 0 };
                var clickable = postItem.closest('button, a, [role="menuitem"]') || postItem;
                clickable.scrollIntoView({ behavior: 'instant', block: 'center' });
                var rect = clickable.getBoundingClientRect();
                return { found: true, x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) };
              })()
            `;
            let spClickedPost = false;
            const spPostDeadline = Date.now() + 1e4;
            while (Date.now() < spPostDeadline) {
              if (spWin.isDestroyed()) break;
              const spPostPos = await spWin.webContents.executeJavaScript(spFindPostJs, true).catch(() => ({ found: false, x: 0, y: 0 }));
              if (spPostPos.found) {
                await spRealClick(spPostPos.x, spPostPos.y);
                await new Promise((r) => setTimeout(r, 600));
                spClickedPost = true;
                break;
              }
              const spDialogAppeared = await spWin.webContents.executeJavaScript(`
                (function() {
                  var bodyText = document.body.innerText || '';
                  return /select from computer/i.test(bodyText) || /create new post/i.test(bodyText);
                })()
              `, true).catch(() => false);
              if (spDialogAppeared) {
                spClickedPost = true;
                break;
              }
              await new Promise((r) => setTimeout(r, 400));
            }
            if (!spClickedPost) throw new Error("Could not find Post option in the Create submenu");
          }
          await new Promise((r) => setTimeout(r, 2e3));
          _ipcLog(`[eb:silent-post:${pid}] arming file-chooser interception`);
          await dbg.sendCommand("Page.enable").catch(() => {
          });
          await dbg.sendCommand("Page.setInterceptFileChooserDialog", { enabled: true });
          const spFileChooserPromise = new Promise((resolve) => {
            let settled = false;
            const onMessage = (_event, method, params) => {
              if (method !== "Page.fileChooserOpened" || settled) return;
              settled = true;
              dbg.removeListener("message", onMessage);
              resolve(typeof params?.backendNodeId === "number" ? params.backendNodeId : null);
            };
            dbg.on("message", onMessage);
            setTimeout(() => {
              if (settled) return;
              settled = true;
              dbg.removeListener("message", onMessage);
              resolve(null);
            }, 15e3);
          });
          _ipcLog(`[eb:silent-post:${pid}] clicking "Select from Computer"`);
          const spFindSelectComputerJs = `
            (function() {
              var all = Array.from(document.querySelectorAll('button, [role="button"]'));
              var btn = all.find(function(el) {
                var t = (el.textContent || '').trim();
                return (t === 'Select from computer' || t === 'Select From Computer' || t === 'Select from Computer') && el.offsetHeight > 0;
              });
              if (!btn) return { found: false, x: 0, y: 0 };
              btn.scrollIntoView({ behavior: 'instant', block: 'center' });
              var rect = btn.getBoundingClientRect();
              return { found: true, x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) };
            })()
          `;
          let spClickedSelectComputer = false;
          const spSelectComputerDeadline = Date.now() + 15e3;
          while (Date.now() < spSelectComputerDeadline) {
            if (spWin.isDestroyed()) break;
            const spPos = await spWin.webContents.executeJavaScript(spFindSelectComputerJs, true).catch(() => ({ found: false, x: 0, y: 0 }));
            if (spPos.found) {
              await spRealClick(spPos.x, spPos.y);
              spClickedSelectComputer = true;
              break;
            }
            await new Promise((r) => setTimeout(r, 400));
          }
          if (!spClickedSelectComputer) {
            await dbg.sendCommand("Page.setInterceptFileChooserDialog", { enabled: false }).catch(() => {
            });
            throw new Error('Could not find "Select from Computer" button \u2014 Create new post dialog did not open');
          }
          _ipcLog(`[eb:silent-post:${pid}] waiting for intercepted file chooser`);
          const spBackendNodeId = await spFileChooserPromise;
          await dbg.sendCommand("Page.setInterceptFileChooserDialog", { enabled: false }).catch(() => {
          });
          if (spBackendNodeId == null) {
            throw new Error('File chooser never opened after clicking "Select from Computer" (native dialog interception timed out)');
          }
          await dbg.sendCommand("DOM.setFileInputFiles", {
            files: [tmpPath],
            backendNodeId: spBackendNodeId
          });
          _ipcLog(`[eb:silent-post:${pid}] image injected via intercepted file chooser`);
          await new Promise((r) => setTimeout(r, 2500));
          const spFindBtnPos = async (text) => spWin.webContents.executeJavaScript(`
              (function(t) {
                var all = Array.from(document.querySelectorAll('button, [role="button"], [type="submit"]'));
                var btn = all.find(function(el) { return (el.textContent || '').trim() === t && el.offsetHeight > 0; });
                if (!btn) return { found: false, x: 0, y: 0 };
                btn.scrollIntoView({ behavior: 'instant', block: 'center' });
                var rect = btn.getBoundingClientRect();
                return { found: true, x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) };
              })(${JSON.stringify(text)})
            `, true).catch(() => ({ found: false, x: 0, y: 0 }));
          const spClickBtnText = async (text, timeoutMs) => {
            const deadline = Date.now() + timeoutMs;
            while (Date.now() < deadline) {
              if (spWin.isDestroyed()) return false;
              const pos = await spFindBtnPos(text);
              if (pos.found) {
                await spRealClick(pos.x, pos.y);
                await new Promise((r) => setTimeout(r, 900));
                const stillThere = await spFindBtnPos(text);
                if (!stillThere.found) return true;
              }
              await new Promise((r) => setTimeout(r, 500));
            }
            return false;
          };
          const spClickBtnTextOnce = async (text, timeoutMs) => {
            const deadline = Date.now() + timeoutMs;
            while (Date.now() < deadline) {
              if (spWin.isDestroyed()) return false;
              const pos = await spFindBtnPos(text);
              if (pos.found) {
                await spRealClick(pos.x, pos.y);
                return true;
              }
              await new Promise((r) => setTimeout(r, 500));
            }
            return false;
          };
          _ipcLog(`[eb:silent-post:${pid}] clicking Next (crop)`);
          if (!await spClickBtnText("Next", 12e3)) throw new Error("Crop Next button not found");
          await new Promise((r) => setTimeout(r, 2e3));
          _ipcLog(`[eb:silent-post:${pid}] clicking Next (filter)`);
          await spClickBtnText("Next", 12e3);
          await new Promise((r) => setTimeout(r, 2e3));
          if (caption) {
            _ipcLog(`[eb:silent-post:${pid}] typing caption (${caption.length} chars)`);
            await spWin.webContents.executeJavaScript(`
              (function() {
                var el = document.querySelector("textarea[aria-label*='caption'], textarea[aria-label*='Caption']")
                  || document.querySelector("div[aria-label*='caption'] textarea")
                  || document.querySelector("div[contenteditable='true']")
                  || document.querySelector("textarea");
                if (el) { el.focus(); el.click(); }
              })()
            `, true).catch(() => {
            });
            await new Promise((r) => setTimeout(r, 300));
            for (const char of caption.slice(0, 2200)) {
              await dbg.sendCommand("Input.dispatchKeyEvent", { type: "char", text: char }).catch(() => {
              });
            }
            const spDropdownOpen = await spWin.webContents.executeJavaScript(`
              (function() {
                return !!document.querySelector('[role="listbox"], [role="option"], ul[id*="mention"], div[id*="mention"]');
              })()
            `, true).catch(() => false);
            if (spDropdownOpen) {
              _ipcLog(`[eb:silent-post:${pid}] mention/hashtag dropdown detected \u2014 dismissing with Escape`);
              await dbg.sendCommand("Input.dispatchKeyEvent", { type: "rawKeyDown", windowsVirtualKeyCode: 27, key: "Escape" }).catch(() => {
              });
              await dbg.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", windowsVirtualKeyCode: 27, key: "Escape" }).catch(() => {
              });
              await new Promise((r) => setTimeout(r, 500));
            }
          }
          _ipcLog(`[eb:silent-post:${pid}] clicking Share`);
          const spOvlKey = "__sp" + Math.random().toString(36).slice(2, 8);
          const spShareClickOk = await (async () => {
            const deadline = Date.now() + 15e3;
            while (Date.now() < deadline) {
              if (spWin.isDestroyed()) return false;
              const spSharePrep = await spWin.webContents.executeJavaScript(`
                  (function() {
                    var all = Array.from(document.querySelectorAll('button, [role="button"], [type="submit"]'));
                    var candidates = all.filter(function(el) {
                      return (el.textContent || '').trim() === 'Share' && el.offsetHeight > 0;
                    });
                    if (candidates.length === 0) return { found: false, x: 0, y: 0 };
                    // Pick topmost \u2014 the header Share button has the smallest Y
                    var btn = candidates.reduce(function(a, b) {
                      return a.getBoundingClientRect().top <= b.getBoundingClientRect().top ? a : b;
                    });
                    btn.scrollIntoView({ behavior: 'instant', block: 'nearest' });
                    var rect = btn.getBoundingClientRect();
                    var cx = Math.round(rect.left + rect.width / 2);
                    var cy = Math.round(rect.top + rect.height / 2);
                    // Disable pointer-events on any elements stacked above the
                    // Share button at its click point, so the CDP click reaches
                    // the button instead of being intercepted by an overlay.
                    var stack = document.elementsFromPoint(cx, cy);
                    var saved = [];
                    for (var i = 0; i < stack.length; i++) {
                      var el = stack[i];
                      if (el === btn || el.tagName === 'HTML' || el.tagName === 'BODY') break;
                      saved.push({ el: el, prev: el.style.pointerEvents });
                      el.style.pointerEvents = 'none';
                    }
                    window['${spOvlKey}'] = saved;
                    return { found: true, x: cx, y: cy };
                  })()
                `, true).catch(() => ({ found: false, x: 0, y: 0 }));
              if (!spSharePrep.found) {
                await new Promise((r) => setTimeout(r, 500));
                continue;
              }
              const spRestore = () => spWin.isDestroyed() ? Promise.resolve() : spWin.webContents.executeJavaScript(`
                  (function() {
                    var saved = window['${spOvlKey}'] || [];
                    for (var i = 0; i < saved.length; i++) {
                      saved[i].el.style.pointerEvents = saved[i].prev;
                    }
                    delete window['${spOvlKey}'];
                  })()
                `, true).catch(() => {
              });
              try {
                await spRealClick(spSharePrep.x, spSharePrep.y);
              } finally {
                await spRestore();
              }
              return true;
            }
            return false;
          })();
          if (!spShareClickOk) throw new Error("Share button not found");
          _ipcLog(`[eb:silent-post:${pid}] waiting for post-shared confirmation`);
          const spConfirmed = await new Promise((resolve) => {
            let tries = 0;
            const poll = setInterval(async () => {
              if (spWin.isDestroyed()) {
                clearInterval(poll);
                resolve(false);
                return;
              }
              const found = await spWin.webContents.executeJavaScript(`
                (function() {
                  var t = document.body.innerText || '';
                  return t.includes('Your post has been shared') || t.includes('Post shared');
                })()
              `, true).catch(() => false);
              if (found) {
                clearInterval(poll);
                resolve(true);
                return;
              }
              if (++tries >= 30) {
                clearInterval(poll);
                resolve(false);
              }
            }, 500);
          });
          if (spConfirmed) {
            _ipcLog(`[eb:silent-post:${pid}] clicking Done`);
            await spClickBtnTextOnce("Done", 5e3);
            await new Promise((r) => setTimeout(r, 500));
          }
          _ipcLog(`[eb:silent-post:${pid}] post completed \u2713`);
          spSettled = true;
          clearTimeout(spWatchdog);
          spCleanup();
          return send(res, 200, { ok: true, mediaId: String(Date.now()) });
        } catch (spErr) {
          if (spSettled) return;
          spSettled = true;
          clearTimeout(spWatchdog);
          _ipcLog(`[ERROR] [eb:silent-post:${pid}] error: ${spErr?.message}`);
          spCleanup();
          return send(res, 200, { ok: false, message: spErr?.message ?? "Unknown error" });
        }
      }
      if (req.method === "POST" && u.pathname === "/eb/silent-search") {
        const ssUsername = (body.username ?? "").trim();
        if (!pid || !ssUsername) return send(res, 400, { error: "profileId and username required" });
        const ssEbEntry = ebMap.get(pid);
        const ssEbIsOpen = !!(ssEbEntry && !ssEbEntry.win.isDestroyed());
        let ssWin;
        let ssTempWin = null;
        if (ssEbIsOpen) {
          ssWin = ssEbEntry.win;
          _ipcLog(`[eb:silent-search:${pid}] mode A \u2014 reusing open EB window`);
        } else {
          const ssPartition = `persist:eb-${pid}`;
          const ssSes = import_electron.session.fromPartition(ssPartition);
          const rawCookies = body.igApiCookies ?? "";
          if (rawCookies) {
            const cookiePairs = rawCookies.split(";").map((s) => s.trim()).filter(Boolean);
            for (const pair of cookiePairs) {
              const eqIdx = pair.indexOf("=");
              if (eqIdx < 1) continue;
              const name = pair.slice(0, eqIdx).trim();
              const value = pair.slice(eqIdx + 1).trim();
              if (!name || !value) continue;
              try {
                await ssSes.cookies.set({
                  url: "https://www.instagram.com",
                  name,
                  value,
                  domain: ".instagram.com",
                  path: "/",
                  secure: true,
                  httpOnly: name === "sessionid" || name === "csrftoken",
                  sameSite: "no_restriction"
                });
              } catch {
              }
            }
          }
          const bodyProxy = body.proxy;
          if (!bodyProxy?.host || !bodyProxy?.port) {
            _ipcLog(`[ERROR] [eb:silent-search:${pid}] mode B \u2014 no proxy configured for this account; action aborted to prevent real IP leak`);
            return send(res, 400, { error: `No proxy configured for account ${pid} \u2014 action aborted to prevent real IP leak` });
          }
          try {
            await ssSes.clearHostResolverCache();
            await ssSes.setProxy(buildProxyConfig(bodyProxy));
          } catch (proxyErr) {
            _ipcLog(`[ERROR] [eb:silent-search:${pid}] mode B \u2014 proxy set failed; action aborted to prevent real IP leak: ${proxyErr?.message}`);
            return send(res, 500, { error: `Proxy setup failed for account ${pid} \u2014 action aborted to prevent real IP leak: ${proxyErr?.message}` });
          }
          const { width: _ssSw } = eScreen.getPrimaryDisplay().workAreaSize;
          ssTempWin = new import_electron.BrowserWindow({
            width: 1280,
            height: 820,
            x: _ssSw + 10,
            y: 0,
            show: false,
            skipTaskbar: true,
            webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: true, partition: ssPartition, backgroundThrottling: false }
          });
          ssTempWin.showInactive();
          ssTempWin.webContents.on("login", (event, _rq, _auth, cb) => {
            event.preventDefault();
            cb(bodyProxy?.user ?? "", bodyProxy?.pass ?? "");
          });
          await armSilentWindowAntiDetection(ssTempWin, {
            browserUA: body.userAgent ?? null,
            apiUA: body.apiUA ?? null,
            ebFingerprint: body.ebFingerprint ?? null
          });
          ssWin = ssTempWin;
          _ipcLog(`[eb:silent-search:${pid}] mode B \u2014 created off-screen window for "${ssUsername}"`);
        }
        const ssPrevUrl = ssEbIsOpen ? (() => {
          try {
            const u2 = ssWin.webContents.getURL();
            return u2 && u2 !== "about:blank" ? u2 : "https://www.instagram.com/";
          } catch {
            return "https://www.instagram.com/";
          }
        })() : "https://www.instagram.com/";
        const ssCleanup = () => {
          if (ssTempWin) {
            try {
              if (!ssTempWin.isDestroyed()) ssTempWin.destroy();
            } catch {
            }
            ssTempWin = null;
          } else {
            try {
              ssWin.webContents.loadURL(ssPrevUrl).catch(() => {
              });
            } catch {
            }
          }
        };
        let ssSettled = false;
        const ssWatchdog = setTimeout(() => {
          if (ssSettled) return;
          ssSettled = true;
          _ipcLog(`[ERROR] [eb:silent-search:${pid}] WATCHDOG \u2014 exceeded 60s for "${ssUsername}"`);
          ssCleanup();
          try {
            send(res, 200, { ok: false });
          } catch {
          }
        }, 6e4);
        const ssRespond = (status, payload) => {
          if (ssSettled) return;
          ssSettled = true;
          clearTimeout(ssWatchdog);
          send(res, status, payload);
        };
        try {
          const currentUrl = (() => {
            try {
              return ssWin.webContents.getURL();
            } catch {
              return "";
            }
          })();
          const isOnInstagram = /instagram\.com/.test(currentUrl);
          if (!isOnInstagram) {
            _ipcLog(`[eb:silent-search:${pid}] navigating to instagram.com home`);
            await Promise.race([
              ssWin.webContents.loadURL("https://www.instagram.com/").catch(() => {
              }),
              new Promise((r) => setTimeout(r, 2e4))
            ]);
          }
          _ipcLog(`[eb:silent-search:${pid}] clicking Search nav button`);
          await Promise.race([
            ssWin.webContents.executeJavaScript(`
              (function() {
                var candidates = Array.from(document.querySelectorAll('a, [role="link"], [role="button"], button, span'));
                var btn = candidates.find(function(el) {
                  var label = (el.getAttribute('aria-label') || '').toLowerCase().trim();
                  var href  = (el.href || el.getAttribute('href') || '').toLowerCase();
                  var text  = (el.innerText || el.textContent || '').replace(/\\s+/g,' ').toLowerCase().trim();
                  return label === 'search' || href.includes('/search') || text === 'search';
                });
                if (btn) { btn.click(); return true; }
                return false;
              })()
            `, true).catch(() => false),
            new Promise((r) => setTimeout(r, 3e3))
          ]);
          let ssInput = false;
          const ssInputDeadline = Date.now() + 3e3;
          while (Date.now() < ssInputDeadline && !ssInput) {
            await new Promise((r) => setTimeout(r, 200));
            ssInput = await Promise.race([
              ssWin.webContents.executeJavaScript(`!!(document.querySelector('input[aria-label="Search input"], input[placeholder="Search"], [data-testid="search-input"], input[type="text"]'))`, true).catch(() => false),
              new Promise((r) => setTimeout(() => r(false), 500))
            ]);
          }
          if (!ssInput) {
            _ipcLog(`[WARN] [eb:silent-search:${pid}] search input not found after clicking nav \u2014 aborting`);
            ssCleanup();
            return ssRespond(200, { ok: false });
          }
          await ssWin.webContents.executeJavaScript(`
            (function() {
              var inp = document.querySelector('input[aria-label="Search input"], input[placeholder="Search"], [data-testid="search-input"], input[type="text"]');
              if (inp) { inp.focus(); inp.click(); return true; }
              return false;
            })()
          `, true).catch(() => false);
          _ipcLog(`[eb:silent-search:${pid}] typing "${ssUsername}" char by char`);
          for (const ch of ssUsername) {
            await ssWin.webContents.executeJavaScript(`
              (function() {
                var inp = document.querySelector('input[aria-label="Search input"], input[placeholder="Search"], [data-testid="search-input"], input[type="text"]');
                if (!inp) return;
                var nativeSet = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
                nativeSet.call(inp, inp.value + ${JSON.stringify(ch)});
                inp.dispatchEvent(new Event('input', { bubbles: true }));
                inp.dispatchEvent(new Event('change', { bubbles: true }));
              })()
            `, true).catch(() => {
            });
            await new Promise((r) => setTimeout(r, 50 + Math.floor(Math.random() * 100)));
          }
          _ipcLog(`[eb:silent-search:${pid}] waiting for search results dropdown`);
          let ssResultsReady = false;
          const ssResultsDeadline = Date.now() + 5e3;
          while (Date.now() < ssResultsDeadline && !ssResultsReady) {
            await new Promise((r) => setTimeout(r, 300));
            ssResultsReady = await Promise.race([
              ssWin.webContents.executeJavaScript(`
                (function() {
                  var items = document.querySelectorAll('[role="listbox"] [role="option"], [role="listbox"] a, [role="none"] a, .x9f619 a');
                  return items.length > 0;
                })()
              `, true).catch(() => false),
              new Promise((r) => setTimeout(() => r(false), 500))
            ]);
          }
          if (!ssResultsReady) {
            _ipcLog(`[WARN] [eb:silent-search:${pid}] no results appeared for "${ssUsername}" \u2014 still returning ok (search typed)`);
            ssCleanup();
            return ssRespond(200, { ok: true });
          }
          _ipcLog(`[eb:silent-search:${pid}] clicking exact match for "${ssUsername}" in results`);
          const ssClicked = await Promise.race([
            ssWin.webContents.executeJavaScript(`
              (function() {
                var target = ${JSON.stringify(ssUsername.toLowerCase())};
                var candidates = Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="listbox"] a, [role="none"] a, .x9f619 a, [tabindex="0"] span'));
                for (var i = 0; i < candidates.length; i++) {
                  var el = candidates[i];
                  var text = (el.innerText || el.textContent || '').replace(/\\s+/g,' ').toLowerCase().trim();
                  if (text === target || text.startsWith(target + '\\n') || text.startsWith(target + ' ')) {
                    el.click();
                    return true;
                  }
                }
                // Fallback: click first result
                if (candidates.length > 0) { candidates[0].click(); return true; }
                return false;
              })()
            `, true).catch(() => false),
            new Promise((r) => setTimeout(() => r(false), 3e3))
          ]);
          _ipcLog(`[eb:silent-search:${pid}] search complete \u2014 clicked=${ssClicked}; waiting for profile page to load before restoring URL`);
          if (ssClicked) {
            const navDeadline = Date.now() + 6e3;
            while (Date.now() < navDeadline) {
              await new Promise((r) => setTimeout(r, 300));
              const currentHref = await Promise.race([
                ssWin.webContents.executeJavaScript(`window.location.href`, true).catch(() => ""),
                new Promise((r) => setTimeout(() => r(""), 500))
              ]);
              if (currentHref && !/\/search\/|instagram\.com\/?$/.test(currentHref)) {
                _ipcLog(`[eb:silent-search:${pid}] navigated to profile: ${currentHref}`);
                break;
              }
            }
            await new Promise((r) => setTimeout(r, 3e3 + Math.floor(Math.random() * 2e3)));
          }
          ssCleanup();
          return ssRespond(200, { ok: true });
        } catch (ssErr) {
          _ipcLog(`[ERROR] [eb:silent-search:${pid}] error: ${ssErr?.message}`);
          ssCleanup();
          return ssRespond(200, { ok: false });
        }
      }
      if (req.method === "POST" && u.pathname === "/eb/auto-login") {
        let e = ebMap.get(pid);
        if (!e || e.win.isDestroyed()) {
          await openEbWindow({
            profileId: pid,
            username: body.username ?? String(pid),
            proxy: body.proxy,
            userAgent: body.userAgent
          });
          e = ebMap.get(pid);
        }
        const result = await doAutoLogin(pid, e.win, body.username, body.password, body.twoFAKey ?? "", body.userAgent);
        return send(res, 200, result);
      }
      if (req.method === "GET" && u.pathname === "/eb/silent-verify-status") {
        const statusPid = Number(u.searchParams.get("profileId") ?? "0");
        const result = _silentVerifyResults.get(statusPid);
        if (!result) return send(res, 200, { done: false, error: "unknown" });
        if (result.done) _silentVerifyResults.delete(statusPid);
        return send(res, 200, result);
      }
      if (req.method === "POST" && u.pathname === "/eb/run-leak-test") {
        const partition = ebPartition(pid);
        let leakWin = null;
        try {
          leakWin = new import_electron.BrowserWindow({
            show: false,
            width: 1280,
            height: 720,
            webPreferences: {
              partition,
              nodeIntegration: false,
              contextIsolation: true,
              sandbox: true,
              // prevent window.require leak
              backgroundThrottling: false
            }
          });
          leakWin.webContents.on("login", (event, _rq, _auth, cb) => {
            event.preventDefault();
            const _lkProxy = ebMap.get(pid)?.proxy;
            cb(_lkProxy?.user ?? "", _lkProxy?.pass ?? "");
          });
          const dataUrl = "data:text/html;charset=utf-8," + encodeURIComponent(body.html ?? "");
          await leakWin.loadURL(dataUrl);
          const deadline = Date.now() + 4e4;
          while (Date.now() < deadline) {
            await new Promise((r) => setTimeout(r, 500));
            const done = await leakWin.webContents.executeJavaScript("!!window._leakTestDone").catch(() => true);
            if (done) break;
          }
          const resultsJson = await leakWin.webContents.executeJavaScript("JSON.stringify(window.RESULTS || {})").catch(() => "{}");
          leakWin.destroy();
          leakWin = null;
          const rawResults = JSON.parse(resultsJson);
          const results = {};
          if (rawResults && typeof rawResults === "object") {
            for (const [k, v] of Object.entries(rawResults)) {
              if (v && typeof v === "object") {
                const entry = v;
                results[k] = {
                  status: typeof entry.status === "string" ? entry.status : "unknown",
                  label: typeof entry.label === "string" ? entry.label : String(entry.status ?? "?")
                };
              }
            }
          }
          const ICON = { pass: "\u2713", fail: "\u2717", warn: "\u26A0", info: "\u2139" };
          const KEY_ORDER = [
            "IP",
            "IPMatch",
            "WebRTC",
            "DNS",
            "UAMatch",
            "Bot",
            "Timezone",
            "Navigator",
            "Hardware",
            "Canvas",
            "Audio",
            "WebGL",
            "Fonts",
            "Network",
            "Battery",
            "Media",
            "Perms",
            "Speech",
            "Hints",
            "Timing"
          ];
          const missing = KEY_ORDER.filter((k) => !results[k]);
          const fails = KEY_ORDER.filter((k) => results[k]?.status === "fail");
          const warns = KEY_ORDER.filter((k) => results[k]?.status === "warn");
          const lines = KEY_ORDER.map((k) => {
            const r = results[k];
            if (!r) return `  ${k.padEnd(10)}: \u2014 (not captured)`;
            const icon = ICON[r.status] ?? "?";
            return `  ${k.padEnd(10)}: ${icon} ${r.label}`;
          });
          const headline = fails.length ? `\u2717 ${fails.length} FAIL${fails.length > 1 ? "S" : ""} \u2014 ${fails.join(", ")}` : warns.length ? `\u26A0 ${warns.length} WARN \u2014 ${warns.join(", ")}` : missing.length ? `\u26A0 INCOMPLETE \u2014 ${missing.length} checks not captured (${missing.join(", ")})` : `\u2713 ALL CLEAR (${KEY_ORDER.length}/${KEY_ORDER.length} checks)`;
          console.log(
            `[run-leak-test:${pid}] RESULTS \u2014 ${headline}
` + lines.join("\n")
          );
          return send(res, 200, { ok: true, results });
        } catch (err) {
          if (leakWin && !leakWin.isDestroyed()) {
            try {
              leakWin.destroy();
            } catch {
            }
          }
          console.error(`[run-leak-test:${pid}] error: ${err?.message}`);
          return send(res, 500, { error: err?.message });
        }
      }
      if (req.method === "POST" && u.pathname === "/eb/silent-verify") {
        console.log(`[silent-verify:${pid}] @${body.username} \u2014 handler entered`);
        const partition = ebPartition(pid);
        const ses = import_electron.session.fromPartition(partition);
        const setProxyWithTimeout = (cfg) => Promise.race([
          ses.setProxy(cfg),
          new Promise((_, rej) => setTimeout(() => rej(new Error("setProxy timeout (10s)")), 1e4))
        ]);
        if (body.proxy) {
          console.log(`[silent-verify:${pid}] @${body.username} \u2014 setProxy #1 (${body.proxy.host}:${body.proxy.port})`);
          await setProxyWithTimeout(buildProxyConfig(body.proxy));
          console.log(`[silent-verify:${pid}] @${body.username} \u2014 setProxy #1 done`);
          try {
            await ses.clearHostResolverCache();
          } catch {
          }
          await new Promise((r) => setTimeout(r, 150));
          console.log(`[silent-verify:${pid}] @${body.username} \u2014 setProxy #2`);
          await setProxyWithTimeout(buildProxyConfig(body.proxy));
          console.log(`[silent-verify:${pid}] @${body.username} \u2014 setProxy #2 done`);
          try {
            ses.setDnsOverHttpsConfig?.({ enabled: false });
          } catch {
          }
        } else {
          console.log(`[silent-verify:${pid}] @${body.username} \u2014 no proxy, setting direct`);
          await setProxyWithTimeout({ proxyRules: "direct://" });
          console.log(`[silent-verify:${pid}] @${body.username} \u2014 direct proxy set done`);
        }
        try {
          ses.setWebRTCIPHandlingPolicy("disable_non_proxied_udp");
        } catch {
        }
        const _preCheck = await ses.cookies.get({ name: "sessionid", domain: ".instagram.com" });
        if (_preCheck.length > 0) {
          console.log(`[silent-verify:${pid}] @${body.username} \u2014 live sessionid found BEFORE file load \u2014 skipping loadCookiesFromFile to preserve live session`);
          const c1 = await ses.cookies.get({ domain: ".instagram.com" });
          const c2 = await ses.cookies.get({ domain: "instagram.com" });
          const seen = /* @__PURE__ */ new Set();
          const cookies = [...c1, ...c2].filter((c) => {
            if (seen.has(c.name)) return false;
            seen.add(c.name);
            return true;
          }).map((c) => ({ name: c.name, value: c.value }));
          return send(res, 200, { ok: true, message: "Using existing EB session", cookies });
        }
        console.log(`[silent-verify:${pid}] @${body.username} \u2014 no live sessionid \u2014 loading cookies from file`);
        await loadCookiesFromFile(pid, ses);
        console.log(`[silent-verify:${pid}] @${body.username} \u2014 cookies loaded`);
        {
          const _pollDeadline = Date.now() + 1e4;
          while (!ebMap.has(pid) && Date.now() < _pollDeadline) {
            await new Promise((r) => setTimeout(r, 400));
          }
        }
        const _openEb = ebMap.get(pid);
        const _useVisible = !!(_openEb && !_openEb.win.isDestroyed());
        let _hiddenWin = null;
        let _verifyWin;
        if (_useVisible) {
          _verifyWin = _openEb.win;
          if (!_verifyWin.isVisible()) _verifyWin.show();
          _verifyWin.focus();
          console.log(`[silent-verify:${pid}] @${body.username} \u2014 visible EB window found, using it`);
        } else {
          _hiddenWin = new import_electron.BrowserWindow({
            width: 1280,
            height: 820,
            show: true,
            skipTaskbar: false,
            webPreferences: {
              nodeIntegration: false,
              contextIsolation: true,
              sandbox: true,
              // prevent window.require leak
              partition,
              backgroundThrottling: false
            }
          });
          _verifyWin = _hiddenWin;
          void (async () => {
            try {
              try {
                _hiddenWin.webContents.debugger.attach("1.3");
              } catch {
              }
              await _hiddenWin.webContents.debugger.sendCommand("Page.enable");
              await _hiddenWin.webContents.debugger.sendCommand("Page.addScriptToEvaluateOnNewDocument", { source: ELECTRON_LEAK_SUPPRESSOR_JS });
              await _hiddenWin.webContents.debugger.sendCommand("Page.addScriptToEvaluateOnNewDocument", { source: WEBRTC_BLOCKER_JS });
            } catch {
            }
          })();
          _hiddenWin.webContents.on("dom-ready", () => {
            _hiddenWin.webContents.executeJavaScript(WEBRTC_BLOCKER_JS).catch(() => {
            });
          });
          if (body.proxy) {
            _hiddenWin.webContents.on("login", (ev, _rq, _auth, cb) => {
              ev.preventDefault();
              cb(body.proxy.user ?? "", body.proxy.pass ?? "");
            });
          }
          if (body.userAgent) {
            _hiddenWin.webContents.setUserAgent(body.userAgent);
          }
          console.log(`[silent-verify:${pid}] @${body.username} \u2014 no open EB, using hidden window`);
        }
        _silentVerifyResults.set(pid, { done: false });
        send(res, 202, { pending: true, profileId: pid });
        console.log(`[silent-verify:${pid}] @${body.username} \u2014 202 sent, starting doAutoLogin (${_useVisible ? "visible EB" : "visible fallback window"})`);
        ;
        (async () => {
          try {
            const _activeWc = _useVisible ? getActiveWc(pid) : null;
            const _loginTarget = _useVisible ? { webContents: _activeWc ?? _verifyWin.webContents } : _verifyWin;
            const _wcUrl = (() => {
              try {
                return _loginTarget.webContents?.getURL?.() ?? "(no getURL)";
              } catch {
                return "(error)";
              }
            })();
            console.log(`[silent-verify:${pid}] @${body.username} \u2014 _loginTarget: _useVisible=${_useVisible} getActiveWc=${_activeWc ? "BrowserView" : "null"} wcUrl="${_wcUrl}"`);
            const loginResult = await doAutoLogin(pid, _loginTarget, body.username, body.password, body.twoFAKey ?? "", body.userAgent);
            const c1 = await ses.cookies.get({ domain: ".instagram.com" });
            const c2 = await ses.cookies.get({ domain: "instagram.com" });
            const seen = /* @__PURE__ */ new Set();
            const cookies = [...c1, ...c2].filter((c) => {
              if (seen.has(c.name)) return false;
              seen.add(c.name);
              return true;
            }).map((c) => ({ name: c.name, value: c.value }));
            console.log(`[silent-verify:${pid}] @${body.username} \u2014 doAutoLogin complete ok=${loginResult.ok}`);
            _silentVerifyResults.set(pid, { done: true, ...loginResult, cookies });
          } catch (err) {
            console.error(`[silent-verify:${pid}] @${body.username} \u2014 doAutoLogin threw: ${err?.message}`);
            _silentVerifyResults.set(pid, { done: true, ok: false, message: err?.message ?? "Silent verify error", cookies: [] });
          } finally {
            if (_hiddenWin) {
              try {
                _hiddenWin.destroy();
              } catch {
              }
            }
          }
        })();
        return;
      }
      if (req.method === "POST" && u.pathname === "/eb/input") {
        const e = ebMap.get(pid);
        if (!e || e.win.isDestroyed()) return send(res, 200, { ok: true, skipped: true });
        const wc = e.win.webContents;
        const { type, url, text, key } = body;
        switch (type) {
          case "navigate":
            if (url) wc.loadURL(url).catch(() => {
            });
            break;
          case "reload":
            wc.reloadIgnoringCache();
            break;
          case "back":
            if (wc.navigationHistory?.canGoBack?.()) wc.navigationHistory.goBack();
            else if (wc.canGoBack?.()) wc.goBack();
            break;
          case "forward":
            if (wc.navigationHistory?.canGoForward?.()) wc.navigationHistory.goForward();
            else if (wc.canGoForward?.()) wc.goForward();
            break;
          case "type":
          case "keydown":
            if (text || key) {
              const chars = text ?? key ?? "";
              const script = `(function(){
                const el = document.activeElement;
                if (!el) return;
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                  const setter = Object.getOwnPropertyDescriptor(
                    Object.getPrototypeOf(el), 'value'
                  )?.set;
                  if (setter) setter.call(el, el.value + ${JSON.stringify(chars)});
                  else el.value = el.value + ${JSON.stringify(chars)};
                  el.dispatchEvent(new Event('input', { bubbles: true }));
                  el.dispatchEvent(new Event('change', { bubbles: true }));
                } else {
                  el.dispatchEvent(new KeyboardEvent('keydown', { key: ${JSON.stringify(chars)}, bubbles: true }));
                }
              })()`;
              await wc.executeJavaScript(script).catch(() => {
              });
            }
            break;
          case "newTab":
            wc.loadURL(url ?? "https://www.instagram.com/").catch(() => {
            });
            break;
          default:
            break;
        }
        if (e.win.isMinimized()) e.win.restore();
        e.win.focus();
        return send(res, 200, { ok: true });
      }
      if (req.method === "POST" && u.pathname === "/eb/wipe") {
        const e = ebMap.get(pid);
        if (e && !e.win.isDestroyed()) {
          e.win.destroy();
          await new Promise((r) => setTimeout(r, 200));
        }
        ebMap.delete(pid);
        const ses = import_electron.session.fromPartition(ebPartition(pid));
        await ses.clearStorageData({
          storages: ["cookies", "localstorage", "indexdb", "filesystem", "cachestorage", "shadercache", "websql", "serviceworkers"]
        }).catch(() => {
        });
        const fp = cookieFilePath(pid);
        try {
          if (import_fs.default.existsSync(fp)) import_fs.default.unlinkSync(fp);
        } catch {
        }
        return send(res, 200, { ok: true });
      }
      if (req.method === "POST" && u.pathname === "/eb/ghost-warmup") {
        const e = ebMap.get(-1);
        if (!e || e.win.isDestroyed()) {
          return send(res, 200, { ok: false, error: "Ghost Browser is not open" });
        }
        send(res, 200, { ok: true });
        const {
          reelsMin = 1,
          reelsMax = 3,
          reelsIdleMin = 5,
          reelsIdleMax = 12
        } = body;
        const randInt = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const relayStep = (msg) => {
          if (_serverPort) {
            fetch(`http://127.0.0.1:${_serverPort}/api/signup/browser/warmup-step`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ msg })
            }).catch(() => {
            });
          }
        };
        const relayDone = () => {
          if (_serverPort) {
            fetch(`http://127.0.0.1:${_serverPort}/api/signup/browser/warmup-done`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({})
            }).catch(() => {
            });
          }
        };
        const _warmupEntry = ebMap.get(-1);
        if (_warmupEntry) _warmupEntry.warmupActive = true;
        (async () => {
          const wc = e.win.webContents;
          const WARMUP_COOKIE_LABELS = [
            "allow all cookies",
            "accept all cookies",
            "allow all",
            "accept all",
            "allow essential and optional cookies",
            "accept cookies",
            "allow cookies",
            "alle cookies akzeptieren",
            "accepter tout",
            "aceptar todo",
            "accetta tutto",
            "till\xE5t alla",
            "alle accepteren"
          ];
          const nav = (url) => new Promise((resolve) => {
            console.log(`[warmup] nav() START: ${url}`);
            let settled = false;
            const settle = (reason) => {
              if (settled) return;
              settled = true;
              wc.removeListener("did-finish-load", onFinish);
              wc.removeListener("did-fail-load", onFail);
              clearTimeout(timer);
              console.log(`[warmup] nav() SETTLE (${reason}): ${url}`);
              setTimeout(resolve, 1e3);
            };
            const onFinish = () => settle("did-finish-load");
            const onFail = (_e, code, desc) => {
              if (code === -3) {
                console.log(`[warmup] nav() ERR_ABORTED (ignored, still waiting): ${url}`);
                return;
              }
              settle(`did-fail-load code=${code} desc=${desc}`);
            };
            const timer = setTimeout(() => settle("30s timeout"), 3e4);
            wc.on("did-finish-load", onFinish);
            wc.on("did-fail-load", onFail);
            wc.loadURL(url).catch((err) => {
              console.log(`[warmup] nav() loadURL rejected (${err?.message}), still waiting: ${url}`);
            });
          });
          const js = (script) => wc.executeJavaScript(script).catch((err) => {
            console.log(`[warmup] executeJavaScript error (ignored): ${err?.message}`);
            return null;
          });
          const scrollFeed = () => js(`(function(){
            var dist = ${randInt(800, 2400)};
            var step  = Math.ceil(dist / 20);
            var i = 0;
            var t = setInterval(function(){
              window.scrollBy(0, step + Math.random() * 10 - 5);
              if (++i >= 20) clearInterval(t);
            }, 80 + Math.random() * 40);
          })()`);
          const dismissOverlay = async () => {
            const pos = await js(`(function(){
              function rect(el){
                if(!el)return null;
                var r=el.getBoundingClientRect();
                if(r.width<=0||r.height<=0)return null;
                return{x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2)};
              }
              var sels=[
                '[role="dialog"] button[aria-label="Close"]',
                '[role="dialog"] button[aria-label="close"]',
                '[role="presentation"] button[aria-label="Close"]',
                '[role="presentation"] button[aria-label="close"]',
                'button[aria-label="Close"]',
                'div[role="button"][aria-label="Close"]',
              ];
              for(var i=0;i<sels.length;i++){var p=rect(document.querySelector(sels[i]));if(p)return p;}
              // Fallback: detect "Never miss a post" / "See photos" sign-up wall by modal text,
              // then find an X/close button inside that modal (SVG-only or "Not now" label).
              var containers=Array.from(document.querySelectorAll('[role="dialog"],[role="presentation"]'));
              for(var c=0;c<containers.length;c++){
                var txt=(containers[c].innerText||containers[c].textContent||'').toLowerCase();
                if(txt.includes('sign up')||txt.includes('never miss')||txt.includes('see photos')||txt.includes('see videos')||txt.includes('log in to')){
                  var btns=Array.from(containers[c].querySelectorAll('button,div[role="button"]'));
                  for(var b=0;b<btns.length;b++){
                    var btxt=(btns[b].innerText||btns[b].textContent||'').trim().toLowerCase();
                    if(btxt===''||btxt==='\xD7'||btxt==='\u2715'||btxt==='not now'||btxt==='dismiss'||btxt==='close'||(btxt.length<4&&btns[b].querySelector('svg'))){
                      var p2=rect(btns[b]);if(p2)return p2;
                    }
                  }
                  // Last resort: first button that contains only an SVG (the X icon)
                  for(var b2=0;b2<btns.length;b2++){
                    if(btns[b2].querySelector('svg')&&!(btns[b2].innerText||btns[b2].textContent||'').trim().match(/[a-z]/i)){
                      var p3=rect(btns[b2]);if(p3)return p3;
                    }
                  }
                }
              }
              return null;
            })()`);
            if (pos && typeof pos === "object" && "x" in pos) {
              const p = pos;
              console.log(`[warmup] dismissOverlay: CDP click at (${p.x},${p.y})`);
              try {
                wc.debugger.attach("1.3");
              } catch {
              }
              try {
                await wc.debugger.sendCommand("Input.dispatchMouseEvent", {
                  type: "mousePressed",
                  x: p.x,
                  y: p.y,
                  button: "left",
                  clickCount: 1,
                  modifiers: 0
                });
                await sleep(80);
                await wc.debugger.sendCommand("Input.dispatchMouseEvent", {
                  type: "mouseReleased",
                  x: p.x,
                  y: p.y,
                  button: "left",
                  clickCount: 1,
                  modifiers: 0
                });
                console.log(`[warmup] dismissOverlay: done`);
                await sleep(700);
              } catch (err) {
                console.log(`[warmup] dismissOverlay: CDP error: ${err}`);
              }
            } else {
              console.log(`[warmup] dismissOverlay: no overlay found`);
            }
          };
          try {
            console.log(`[warmup] START \u2014 reels:${reelsMin}-${reelsMax}`);
            let reelUrls = [];
            if (_serverPort) {
              try {
                relayStep("Fetching trending reels\u2026");
                const r = await fetch(`http://127.0.0.1:${_serverPort}/api/signup/browser/trending-reels?n=${reelsMax + 2}`);
                const j = await r.json();
                if (Array.isArray(j.urls) && j.urls.length > 0) {
                  reelUrls = j.urls;
                  relayStep(`Got ${reelUrls.length} trending reel(s) via HikerAPI \u2713`);
                  console.log(`[warmup] HikerAPI reels: ${reelUrls.join(", ")}`);
                } else {
                  console.log(`[warmup] HikerAPI returned no urls: ${JSON.stringify(j)}`);
                }
              } catch (e2) {
                console.log(`[warmup] trending-reels fetch warning: ${e2?.message}`);
              }
            }
            if (reelUrls.length === 0) {
              relayStep("No HikerAPI reels \u2014 using Reels feed fallback");
              reelUrls = ["https://www.instagram.com/reels/"];
            }
            if (wc.isLoading()) {
              relayStep("Waiting for browser to initialize\u2026");
              console.log(`[warmup] initial wait: browser still loading`);
              await new Promise((res2) => {
                let done = false;
                const finish = () => {
                  if (!done) {
                    done = true;
                    clearTimeout(t);
                    wc.removeListener("did-finish-load", finish);
                    wc.removeListener("did-fail-load", failCb);
                    res2();
                  }
                };
                const failCb = (_e, code) => {
                  if (code === -3) {
                    console.log(`[warmup] initial wait: ERR_ABORTED (ignored)`);
                    return;
                  }
                  finish();
                };
                const t = setTimeout(() => {
                  console.log(`[warmup] initial wait: 8s timeout`);
                  finish();
                }, 8e3);
                wc.on("did-finish-load", finish);
                wc.on("did-fail-load", failCb);
              });
              console.log(`[warmup] initial wait: done`);
            } else {
              console.log(`[warmup] initial wait: browser already idle`);
            }
            await sleep(800);
            const reelCount = randInt(reelsMin, reelsMax);
            console.log(`[warmup] reelCount=${reelCount}, urls available=${reelUrls.length}`);
            for (let i = 0; i < reelCount; i++) {
              const url = reelUrls[i] ?? reelUrls[reelUrls.length - 1];
              const label = url.replace("https://www.instagram.com", "ig.com");
              relayStep(`Viewing trending reel ${i + 1}/${reelCount} \u2014 ${label}\u2026`);
              console.log(`[warmup] reel ${i + 1}/${reelCount}: nav to ${url}`);
              await nav(url);
              await sleep(1500 + Math.random() * 1e3);
              await js(`(function(){
                var ACCEPT = ${JSON.stringify(WARMUP_COOKIE_LABELS)};
                function ok(b){if(!b)return false;var r=b.getBoundingClientRect();if(r.width<=0)return false;return ACCEPT.indexOf((b.innerText||b.textContent||'').trim().toLowerCase())!==-1;}
                var btn=document.querySelector('[data-cookiebanner="accept_button"]')||Array.from(document.querySelectorAll('button,[role="button"],a')).find(ok);
                if(btn){btn.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));}
              })()`);
              await sleep(800);
              await js(`(function(){
                var els=document.querySelectorAll('[role="dialog"],[role="presentation"]');
                for(var i=0;i<els.length;i++){
                  var txt=(els[i].innerText||els[i].textContent||'').toLowerCase();
                  if(txt.includes('sign up')||txt.includes('never miss')||txt.includes('log in to')||txt.includes('see photos')||txt.includes('see videos')){
                    els[i].style.setProperty('display','none','important');
                    console.log('[warmup] CSS-hid overlay: '+txt.slice(0,40));
                  }
                }
              })()`);
              await sleep(300);
              const idleMs = randInt(reelsIdleMin, reelsIdleMax) * 1e3;
              const pollMs = 3e3;
              const polls = Math.max(1, Math.floor(idleMs / pollMs));
              console.log(`[warmup] reel ${i + 1}: watching ${idleMs}ms (${polls} polls)`);
              let reelRedirected = false;
              for (let p = 0; p < polls; p++) {
                await sleep(pollMs);
                const midUrl = wc.getURL();
                if (midUrl && !midUrl.includes("/reel/") && !midUrl.startsWith("about:")) {
                  const isLogin = midUrl.includes("accounts/login") || midUrl.includes("accounts/emailsignup");
                  const isHomepage = midUrl === "https://www.instagram.com/" || midUrl === "https://www.instagram.com";
                  const isChallenge = midUrl.includes("/challenge/") || midUrl.includes("update_risky_contactpoint");
                  const redirectType = isChallenge ? "CHALLENGE" : isLogin ? "LOGIN-PAGE" : isHomepage ? "HOMEPAGE" : "OTHER";
                  console.log(`[warmup] mid-watch REDIRECT [${redirectType}] poll=${p}/${polls} expected="${url}" got="${midUrl}"`);
                  relayStep(`\u26A0 Redirect [${redirectType}] at poll ${p + 1} \u2014 moving on`);
                  reelRedirected = true;
                  break;
                }
              }
              if (!reelRedirected) {
                const remainder = idleMs - polls * pollMs;
                if (remainder > 100) await sleep(remainder);
              }
              relayStep(`Reel ${i + 1}/${reelCount} done`);
            }
            console.log(`[warmup] COMPLETE`);
            relayStep("Warm-up complete \u2713");
          } catch (err) {
            console.log(`[warmup] CAUGHT ERROR: ${err?.message ?? String(err)}
${err?.stack ?? ""}`);
            relayStep(`Warm-up error: ${err?.message ?? "unknown"}`);
          } finally {
            relayDone();
            const _weDone = ebMap.get(-1);
            if (_weDone) _weDone.warmupActive = false;
          }
        })().catch((err) => {
          console.log(`[warmup] OUTER CATCH: ${err?.message ?? String(err)}`);
          const _weDone2 = ebMap.get(-1);
          if (_weDone2) _weDone2.warmupActive = false;
          relayDone();
        });
        return;
      }
      if (req.method === "POST" && u.pathname === "/eb/ghost-signup") {
        const {
          slot: _slot,
          email,
          username,
          password,
          dob,
          websitesToVisit = [],
          websitesMin = 1,
          websitesMax = 3,
          internalLinksMin = 2,
          internalLinksMax = 5,
          timeOnSiteMin = 1,
          timeOnSiteMax = 3,
          timeOnLinksMin = 1,
          timeOnLinksMax = 2,
          youtubeVideosMin = 0,
          youtubeVideosMax = 0,
          youtubeWatchMin = 2,
          youtubeWatchMax = 5
        } = body;
        const slot = Number(_slot ?? 1) || 1;
        const e = ebMap.get(-slot);
        if (!e || e.win.isDestroyed()) {
          return send(res, 200, { ok: false, error: `Ghost Browser slot ${slot} is not open` });
        }
        if (!email || !username || !password || !dob) {
          return send(res, 200, { ok: false, error: "email, username, password, and dob are required" });
        }
        send(res, 200, { ok: true });
        (async () => {
          _ghostSignupAbortTokens.set(slot, (_ghostSignupAbortTokens.get(slot) ?? 0) + 1);
          const _mySignupToken = _ghostSignupAbortTokens.get(slot);
          const isAborted = () => _ghostSignupAbortTokens.get(slot) !== _mySignupToken || e.win.isDestroyed();
          const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
          const sleepOrAbort = (ms) => new Promise((resolve, reject) => {
            const POLL = 500;
            let elapsed = 0;
            const check = () => {
              if (isAborted()) return reject(new Error("ghost-signup aborted"));
              elapsed += POLL;
              if (elapsed >= ms) return resolve();
              setTimeout(check, Math.min(POLL, ms - elapsed));
            };
            setTimeout(check, Math.min(POLL, ms));
          });
          const relay = (msg) => {
            console.log(`[ghost-signup slot=${slot}] ${msg}`);
            if (_serverPort) {
              fetch(`http://127.0.0.1:${_serverPort}/api/signup/browser/ghost-signup-step`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ msg, slot })
              }).catch(() => {
              });
            }
          };
          const relayDone = async () => {
            let harvestedCookies = null;
            try {
              if (!e.win.isDestroyed()) {
                const allCookies = await e.win.webContents.session.cookies.get({ url: "https://www.instagram.com" });
                const wantedNames = /* @__PURE__ */ new Set(["sessionid", "csrftoken", "ds_user_id", "mid", "ig_did", "ig_nrcb"]);
                const parts = allCookies.filter((c) => wantedNames.has(c.name)).map((c) => `${c.name}=${c.value}`);
                if (parts.some((p) => p.startsWith("sessionid="))) harvestedCookies = parts.join(";");
              }
            } catch {
            }
            if (_serverPort) {
              fetch(`http://127.0.0.1:${_serverPort}/api/signup/browser/ghost-signup-step`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  msg: "\u2705 Signup flow complete! Click 'Add to Equinox' to save the account.",
                  done: true,
                  slot,
                  cookies: harvestedCookies
                })
              }).catch(() => {
              });
            }
          };
          const wc = e.win.webContents;
          console.log(`[ghost-signup] IIFE started \u2014 wc ok=${!wc.isDestroyed()} serverPort=${_serverPort}`);
          try {
            wc.debugger.attach("1.3");
          } catch {
          }
          const _gpCN = Math.floor(Math.random() * 4294967295) >>> 0 || 1;
          const _gpAN = Math.floor(Math.random() * 4294967295) >>> 0 || 1;
          const _gpWGPU = [
            ["Qualcomm Technologies, Inc.", "Adreno (TM) 750"],
            ["Qualcomm Technologies, Inc.", "Adreno (TM) 735"],
            ["Qualcomm Technologies, Inc.", "Adreno (TM) 720"],
            ["Qualcomm Technologies, Inc.", "Adreno (TM) 740"],
            ["ARM", "Mali-G920 MC10"],
            ["ARM", "Mali-G715 MC5"],
            ["Google", "Tensor G3"],
            ["Google", "Tensor G4"]
          ];
          const [_gpWV, _gpWR] = _gpWGPU[Math.floor(Math.random() * _gpWGPU.length)];
          const _ghostCanvasScript = `(function(){
  var _CN=${_gpCN},_AN=${_gpAN};
  var _WV=${JSON.stringify(_gpWV)},_WR=${JSON.stringify(_gpWR)};
  try{
    HTMLCanvasElement.prototype.toDataURL=function(){
      if(!this.width||!this.height)return Object.getPrototypeOf(HTMLCanvasElement.prototype).toDataURL.apply(this,arguments);
      try{var c=document.createElement('canvas');c.width=this.width;c.height=this.height;var cx=c.getContext('2d');cx.drawImage(this,0,0);var d=cx.getImageData(0,0,c.width,c.height);d.data[(_CN*4)%d.data.length]^=1;cx.putImageData(d,0,0);return Object.getPrototypeOf(HTMLCanvasElement.prototype).toDataURL.apply(c,arguments);}catch(e2){return Object.getPrototypeOf(HTMLCanvasElement.prototype).toDataURL.apply(this,arguments);}
    };
    HTMLCanvasElement.prototype.toBlob=function(cb,type,quality){
      if(!this.width||!this.height){HTMLCanvasElement.prototype.toBlob.call(this,cb,type,quality);return;}
      try{var c=document.createElement('canvas');c.width=this.width;c.height=this.height;var cx=c.getContext('2d');cx.drawImage(this,0,0);var d=cx.getImageData(0,0,c.width,c.height);d.data[(_CN*4)%d.data.length]^=1;cx.putImageData(d,0,0);HTMLCanvasElement.prototype.toBlob.call(c,cb,type,quality);}catch(e2){HTMLCanvasElement.prototype.toBlob.call(this,cb,type,quality);}
    };
  }catch(e){}
  try{
    if(window.WebGLRenderingContext){WebGLRenderingContext.prototype.getParameter=function(p){if(p===0x9245)return _WV;if(p===0x9246)return _WR;return WebGLRenderingContext.prototype.getParameter.call(this,p);};}
    if(window.WebGL2RenderingContext){WebGL2RenderingContext.prototype.getParameter=function(p){if(p===0x9245)return _WV;if(p===0x9246)return _WR;return WebGL2RenderingContext.prototype.getParameter.call(this,p);};}
  }catch(e){}
  try{
    var _S=(_AN|1);
    AnalyserNode.prototype.getFloatFrequencyData=function(a){var _oGFF=AnalyserNode.prototype.getFloatFrequencyData;_oGFF.call(this,a);if(a&&a.length>0){var s=_S;for(var i=0;i<a.length;i++){s=Math.imul(1664525,s)+1013904223>>>0;a[i]+=(s/0x100000000)*0.0001-0.00005;}}};
    AnalyserNode.prototype.getByteFrequencyData=function(a){var _oGBF=AnalyserNode.prototype.getByteFrequencyData;_oGBF.call(this,a);if(a&&a.length>0){var s=_S;for(var i=0;i<a.length;i++){s=Math.imul(1664525,s)+1013904223>>>0;var v=a[i]+(s/0x100000000>0.5?1:0);a[i]=Math.max(0,Math.min(255,v));}}};
  }catch(e){}
})();`;
          try {
            await wc.debugger.sendCommand("Page.enable");
          } catch {
          }
          try {
            await wc.debugger.sendCommand("Page.addScriptToEvaluateOnNewDocument", { source: ELECTRON_LEAK_SUPPRESSOR_JS });
          } catch {
          }
          try {
            await wc.debugger.sendCommand("Page.addScriptToEvaluateOnNewDocument", { source: GHOST_MOUSE_BLOCKER_JS });
          } catch {
          }
          try {
            await wc.debugger.sendCommand("Page.addScriptToEvaluateOnNewDocument", { source: GHOST_SIGNUP_FP_PATCH_JS });
          } catch {
          }
          try {
            await wc.debugger.sendCommand("Page.addScriptToEvaluateOnNewDocument", { source: _ghostCanvasScript });
          } catch {
          }
          wc.executeJavaScript(GHOST_MOUSE_BLOCKER_JS).catch(() => {
          });
          wc.executeJavaScript(GHOST_SIGNUP_FP_PATCH_JS).catch(() => {
          });
          wc.executeJavaScript(_ghostCanvasScript).catch(() => {
          });
          wc.on("dom-ready", () => {
            wc.executeJavaScript(GHOST_MOUSE_BLOCKER_JS).catch(() => {
            });
            wc.executeJavaScript(GHOST_SIGNUP_FP_PATCH_JS).catch(() => {
            });
            wc.executeJavaScript(_ghostCanvasScript).catch(() => {
            });
          });
          const js = (script) => wc.executeJavaScript(script).catch((err) => {
            console.log(`[ghost-signup] js error: ${err?.message}`);
            return null;
          });
          const tap = async (x, y) => {
            try {
              await wc.debugger.sendCommand("Input.synthesizeTapGesture", {
                x,
                y,
                duration: 60,
                tapCount: 1,
                gestureSourceType: "touch"
              });
              await sleep(120);
            } catch {
              try {
                await wc.debugger.sendCommand("Input.dispatchMouseEvent", {
                  type: "mousePressed",
                  x,
                  y,
                  button: "left",
                  clickCount: 1,
                  modifiers: 0,
                  pointerType: "touch"
                });
                await sleep(80);
                await wc.debugger.sendCommand("Input.dispatchMouseEvent", {
                  type: "mouseReleased",
                  x,
                  y,
                  button: "left",
                  clickCount: 1,
                  modifiers: 0,
                  pointerType: "touch"
                });
              } catch {
              }
            }
          };
          const typeText = async (text, opts) => {
            try {
              await typeTextCDP(wc.debugger, text, { ...opts ?? {}, androidIme: true });
            } catch {
            }
          };
          const clearAndType = async (x, y, text) => {
            try {
              await js(`(function(){
                // elementFromPoint finds the exact element at the coordinates
                var el = document.elementFromPoint(${x}, ${y});
                // Walk up in case we hit a wrapper div instead of the input
                var found = el;
                while (found && found.tagName !== 'INPUT' && found.tagName !== 'TEXTAREA') {
                  found = found.parentElement;
                  if (!found || found === document.body) { found = el; break; }
                }
                if (found) { found.focus(); }
              })()`);
            } catch {
            }
            await tap(x, y);
            await sleep(400);
            try {
              await js(`(function(){
                var el = document.activeElement;
                if (!el || (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA')) {
                  el = document.elementFromPoint(${x}, ${y});
                }
                if (!el) return;
                var setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
                if (setter && setter.set) { setter.set.call(el, ''); }
                else { el.value = ''; }
                el.dispatchEvent(new Event('input',  { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
              })()`);
            } catch {
            }
            await sleep(120);
            try {
              await js(`(function(){
                var el = document.activeElement;
                if (!el || (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA')) {
                  el = document.elementFromPoint(${x}, ${y});
                }
                if (!el) return;
                el.setAttribute('autocomplete', 'off');
                el.setAttribute('autocorrect', 'off');
                el.setAttribute('autocapitalize', 'none');
                el.setAttribute('spellcheck', 'false');
              })()`);
            } catch {
            }
            try {
              await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "a", code: "KeyA", windowsVirtualKeyCode: 65, modifiers: 2 });
              await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "a", code: "KeyA", windowsVirtualKeyCode: 65, modifiers: 2 });
              await sleep(60);
              await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "Backspace", code: "Backspace", windowsVirtualKeyCode: 8, modifiers: 0 });
              await wc.debugger.sendCommand("Input.dispatchKeyEvent", { type: "keyUp", key: "Backspace", code: "Backspace", windowsVirtualKeyCode: 8, modifiers: 0 });
              await sleep(60);
            } catch {
            }
            try {
              await typeTextCDP(wc.debugger, text, { androidIme: true });
            } catch {
            }
            await sleep(300);
            try {
              const fieldVal = await js(`(function(){
                var el = document.activeElement;
                if (!el || (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA')) {
                  el = document.elementFromPoint(${x}, ${y});
                }
                return el ? el.value : null;
              })()`);
              relay(`[clearAndType] Field value after type: "${fieldVal}" (expected ${text.length} chars)`);
              if (typeof fieldVal === "string" && fieldVal !== text) {
                relay(`[clearAndType] Mismatch detected \u2014 force-setting to expected value`);
                try {
                  await js(`(function(){
                    var el = document.activeElement;
                    if (!el || (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA')) {
                      el = document.elementFromPoint(${x}, ${y});
                    }
                    if (!el) return;
                    var setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
                    var val = ${JSON.stringify(text)};
                    if (setter && setter.set) { setter.set.call(el, val); }
                    else { el.value = val; }
                    el.dispatchEvent(new Event('input',  { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                  })()`);
                } catch {
                }
              }
            } catch {
            }
          };
          const findByTextScript = (needles) => `(function(){
            var ns=${JSON.stringify(needles.map((n) => n.toLowerCase()))};
            var els=Array.from(document.querySelectorAll('button,a,div[role="button"],span[role="button"]'));
            for(var i=0;i<ns.length;i++){
              var el=els.find(function(e){return(e.innerText||e.textContent||'').trim().toLowerCase().includes(ns[i]);});
              if(el){var r=el.getBoundingClientRect();if(r.width>0&&r.height>0)return{x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2)};}
            }
            return null;
          })()`;
          const findInputScript = (attrs) => `(function(){
            var a=${JSON.stringify(attrs)};
            for(var i=0;i<a.length;i++){
              var sels=['[name="'+a[i]+'"]','[placeholder="'+a[i]+'"]','[aria-label="'+a[i]+'"]'];
              for(var s=0;s<sels.length;s++){var el=document.querySelector(sels[s]);if(el){var r=el.getBoundingClientRect();if(r.width>0&&r.height>0)return{x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2)};}}
            }
            // Fallback: first visible text/email/password input
            var inputs=Array.from(document.querySelectorAll('input[type="text"],input[type="email"],input[type="password"],input:not([type])'));
            for(var j=0;j<inputs.length;j++){var r2=inputs[j].getBoundingClientRect();if(r2.width>0&&r2.height>0)return{x:Math.round(r2.left+r2.width/2),y:Math.round(r2.top+r2.height/2)};}
            return null;
          })()`;
          const waitAndTap = async (needles, label, timeoutMs = 2e4) => {
            const start = Date.now();
            while (Date.now() - start < timeoutMs) {
              const pos = await js(findByTextScript(needles));
              if (pos) {
                relay(`Tapping "${label}"\u2026`);
                await tap(pos.x, pos.y);
                await sleep(900);
                return true;
              }
              await sleep(1200);
            }
            relay(`\u26A0 "${label}" not found after ${Math.round(timeoutMs / 1e3)}s`);
            return false;
          };
          const navAndWait = async (url) => {
            relay(`Navigating to ${url}\u2026`);
            await new Promise((resolve) => {
              let done = false;
              const finish = () => {
                if (!done) {
                  done = true;
                  clearTimeout(t);
                  wc.removeListener("did-finish-load", onFinish);
                  wc.removeListener("did-fail-load", onFail);
                  resolve();
                }
              };
              const onFinish = () => finish();
              const onFail = (_, code) => {
                if (code === -3) return;
                finish();
              };
              const t = setTimeout(finish, 25e3);
              wc.on("did-finish-load", onFinish);
              wc.on("did-fail-load", onFail);
              wc.loadURL(url).catch(() => {
              });
            });
            await sleep(2e3);
          };
          const _rndInt = (min, max) => min >= max ? min : min + Math.floor(Math.random() * (max - min + 1));
          const _shuffle = (arr) => {
            const a = [...arr];
            for (let i = a.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
          };
          if (websitesToVisit.length > 0) {
            const pickCount = Math.min(
              _rndInt(websitesMin, websitesMax),
              websitesToVisit.length
            );
            const sites = _shuffle(websitesToVisit).slice(0, pickCount);
            relay(`\u{1F310} Warm-up: visiting ${sites.length} website(s) before signup\u2026`);
            for (const siteUrl of sites) {
              if (isAborted()) break;
              try {
                relay(`\u{1F310} Warm-up: navigating to ${siteUrl}\u2026`);
                await new Promise((resolve) => {
                  let done = false;
                  const finish = () => {
                    if (!done) {
                      done = true;
                      clearTimeout(t);
                      wc.removeListener("did-finish-load", onF);
                      wc.removeListener("did-fail-load", onFail2);
                      resolve();
                    }
                  };
                  const onF = () => finish();
                  const onFail2 = (_, code) => {
                    if (code === -3) return;
                    finish();
                  };
                  const t = setTimeout(finish, 3e4);
                  wc.on("did-finish-load", onF);
                  wc.on("did-fail-load", onFail2);
                  wc.loadURL(siteUrl).catch(() => {
                  });
                });
                if (isAborted()) break;
                await sleep(2500);
                const _cookieAcceptScript = `(async function(){
                  var selectors = [
                    'button[id*="accept"]','button[id*="cookie"]','button[id*="consent"]',
                    'button[class*="accept"]','button[class*="cookie"]','button[class*="consent"]',
                    'button[class*="agree"]','button[class*="allow"]',
                    'a[id*="accept"]','a[class*="accept"]','a[class*="consent"]',
                    '#accept-all','#acceptAll','#accept_all','#cookieAccept',
                    '.cookie-accept','.cookieAccept','.cookie-ok','.accept-cookies',
                    '[data-testid="accept"]','[data-action*="accept"]',
                  ];
                  var texts = ['accept all','accept cookies','i agree','allow all','ok, i agree','agree','allow','accept','got it','i understand','dismiss','close'];
                  // Try selector match first
                  for (var s of selectors) {
                    var el = document.querySelector(s);
                    if (el) { el.click(); return 'selector:'+s; }
                  }
                  // Text content match on visible buttons/links
                  var candidates = Array.from(document.querySelectorAll('button,a,div[role="button"],span[role="button"]'));
                  for (var t of texts) {
                    var found = candidates.find(function(c){ return (c.innerText||c.textContent||'').trim().toLowerCase().startsWith(t); });
                    if (found) { found.click(); return 'text:'+t; }
                  }
                  return null;
                })()`;
                try {
                  const accepted = await wc.executeJavaScript(_cookieAcceptScript).catch(() => null);
                  if (accepted) relay(`\u{1F36A} Warm-up: accepted cookie consent (${accepted})`);
                } catch {
                }
                await sleep(1500);
                if (isAborted()) break;
                const siteWaitMs = _rndInt(timeOnSiteMin, timeOnSiteMax) * 60 * 1e3;
                relay(`\u23F1 Warm-up: spending ${Math.round(siteWaitMs / 6e4)} min on ${siteUrl}\u2026`);
                await sleepOrAbort(siteWaitMs);
                const linkCount = _rndInt(internalLinksMin, internalLinksMax);
                relay(`\u{1F517} Warm-up: clicking ${linkCount} internal link(s)\u2026`);
                for (let li = 0; li < linkCount; li++) {
                  try {
                    const _origin = new URL(siteUrl).origin;
                    const _linkScript = `(function(){
                      var links = Array.from(document.querySelectorAll('a[href]')).filter(function(a){
                        try { var h = new URL(a.href); return h.origin === '${_origin}' && h.pathname !== location.pathname && !a.href.includes('#'); } catch { return false; }
                      });
                      if (!links.length) return null;
                      var l = links[Math.floor(Math.random()*links.length)];
                      var r = l.getBoundingClientRect();
                      if (r.width > 0 && r.height > 0) { l.click(); return l.href; }
                      return null;
                    })()`;
                    const href = await wc.executeJavaScript(_linkScript).catch(() => null);
                    if (href) {
                      relay(`\u{1F517} Warm-up: clicked internal link \u2192 ${href}`);
                      await sleep(2500);
                      try {
                        await wc.executeJavaScript(_cookieAcceptScript).catch(() => null);
                      } catch {
                      }
                      const linkWaitMs = _rndInt(timeOnLinksMin, timeOnLinksMax) * 60 * 1e3;
                      await sleep(linkWaitMs);
                    }
                  } catch {
                  }
                }
              } catch (wErr) {
                if (isAborted()) {
                  relay("\u{1F6D1} Warm-up stopped \u2014 Ghost Browser was closed");
                  break;
                }
                relay(`\u26A0 Warm-up: error on ${siteUrl}: ${wErr?.message ?? String(wErr)}`);
              }
            }
            if (isAborted()) return;
            relay(`\u2705 Website warm-up complete`);
          }
          const _ytCount = _rndInt(youtubeVideosMin, youtubeVideosMax);
          if (_ytCount > 0) {
            if (isAborted()) return;
            try {
              relay(`\u{1F4FA} YouTube warm-up: watching ${_ytCount} video(s)\u2026`);
              try {
                await wc.debugger.sendCommand("Emulation.setDeviceMetricsOverride", {
                  width: 1280,
                  height: 800,
                  deviceScaleFactor: 1,
                  mobile: false,
                  screenWidth: 1280,
                  screenHeight: 800
                });
              } catch {
              }
              relay("\u{1F4FA} YouTube warm-up: navigating to YouTube\u2026");
              await new Promise((resolve) => {
                let done = false;
                const finish = () => {
                  if (!done) {
                    done = true;
                    clearTimeout(t);
                    wc.removeListener("did-finish-load", onF);
                    wc.removeListener("did-fail-load", onFail);
                    resolve();
                  }
                };
                const onF = () => finish();
                const onFail = (_, code) => {
                  if (code === -3) return;
                  finish();
                };
                const t = setTimeout(finish, 3e4);
                wc.on("did-finish-load", onF);
                wc.on("did-fail-load", onFail);
                wc.loadURL("https://www.youtube.com/?app=desktop").catch(() => {
                });
              });
              if (isAborted()) return;
              await sleep(3e3);
              const _ytConsentScript = `(async function(){
                var texts = ['accept all','i agree','agree to the use','accept the use','accept'];
                var cands = Array.from(document.querySelectorAll(
                  'button, div[role="button"], tp-yt-paper-button, ytd-button-renderer button'
                ));
                for (var i = 0; i < texts.length; i++) {
                  var found = cands.find(function(c){
                    return (c.innerText||c.textContent||'').trim().toLowerCase().startsWith(texts[i]);
                  });
                  if (found) { found.click(); return 'accepted:' + texts[i]; }
                }
                return null;
              })()`;
              try {
                const accepted = await wc.executeJavaScript(_ytConsentScript).catch(() => null);
                if (accepted) relay(`\u{1F36A} YouTube: dismissed consent overlay (${accepted})`);
              } catch {
              }
              relay(`\u{1F4FA} YouTube warm-up: waiting for page to load\u2026`);
              await new Promise((resolve) => {
                let done = false;
                const finish = () => {
                  if (!done) {
                    done = true;
                    clearTimeout(t);
                    wc.removeListener("did-finish-load", onF);
                    resolve();
                  }
                };
                const onF = () => finish();
                const t = setTimeout(finish, 12e3);
                wc.on("did-finish-load", onF);
              });
              await sleep(4e3);
              if (isAborted()) return;
              const _findVideoScript = `(function(){
                var thumbs = [];
                // Desktop YouTube selectors
                thumbs = Array.from(document.querySelectorAll(
                  'ytd-rich-item-renderer a#thumbnail[href],' +
                  'ytd-video-renderer a#thumbnail[href],' +
                  'ytd-compact-video-renderer a.ytd-thumbnail[href],' +
                  'a.ytd-thumbnail[href^="/watch"]'
                ));
                // Mobile YouTube selectors (ytm-* elements, used when window.innerWidth<=480)
                if (!thumbs.length) {
                  thumbs = Array.from(document.querySelectorAll(
                    'ytm-compact-video-renderer a.media-item-thumbnail-container[href],' +
                    'ytm-rich-item-renderer a[href*="/watch"],' +
                    'ytm-video-with-context-renderer a[href*="/watch"],' +
                    'ytm-slim-video-metadata-renderer a[href*="/watch"]'
                  ));
                }
                // Universal fallback: any /watch?v= link on the page
                if (!thumbs.length) {
                  thumbs = Array.from(document.querySelectorAll('a[href*="/watch?v="]'));
                }
                if (!thumbs.length) return null;
                var pick = thumbs[Math.floor(Math.random() * Math.min(8, thumbs.length))];
                var href = pick ? pick.getAttribute('href') : null;
                if (!href) return null;
                try { return new URL(href, 'https://www.youtube.com').href; } catch { return null; }
              })()`;
              for (let vi = 0; vi < _ytCount; vi++) {
                if (isAborted()) break;
                try {
                  let videoUrl = await wc.executeJavaScript(_findVideoScript).catch(() => null);
                  if (!videoUrl || typeof videoUrl !== "string") {
                    relay(`\u{1F4FA} YouTube warm-up: no videos on homepage, trying search page\u2026`);
                    await new Promise((resolve) => {
                      let done = false;
                      const finish = () => {
                        if (!done) {
                          done = true;
                          clearTimeout(t);
                          wc.removeListener("did-finish-load", onF);
                          resolve();
                        }
                      };
                      const onF = () => finish();
                      const t = setTimeout(finish, 15e3);
                      wc.on("did-finish-load", onF);
                      wc.loadURL("https://www.youtube.com/results?search_query=trending+videos+2024").catch(() => {
                      });
                    });
                    await sleep(3e3);
                    if (isAborted()) break;
                    videoUrl = await wc.executeJavaScript(_findVideoScript).catch(() => null);
                  }
                  if (!videoUrl || typeof videoUrl !== "string") {
                    relay(`\u{1F4FA} YouTube warm-up: no videos found, skipping remaining`);
                    break;
                  }
                  relay(`\u{1F4FA} YouTube warm-up: watching video ${vi + 1}/${_ytCount}\u2026`);
                  await new Promise((resolve) => {
                    let done = false;
                    const finish = () => {
                      if (!done) {
                        done = true;
                        clearTimeout(t);
                        wc.removeListener("did-finish-load", onF);
                        wc.removeListener("did-fail-load", onFail);
                        resolve();
                      }
                    };
                    const onF = () => finish();
                    const onFail = (_, code) => {
                      if (code === -3) return;
                      finish();
                    };
                    const t = setTimeout(finish, 2e4);
                    wc.on("did-finish-load", onF);
                    wc.on("did-fail-load", onFail);
                    wc.loadURL(videoUrl).catch(() => {
                    });
                  });
                  if (isAborted()) break;
                  await sleep(2500);
                  const watchMs = _rndInt(youtubeWatchMin, youtubeWatchMax) * 60 * 1e3;
                  relay(`\u{1F4FA} YouTube warm-up: watching for ${Math.round(watchMs / 6e4)} min\u2026`);
                  await sleepOrAbort(watchMs);
                  if (isAborted()) break;
                  if (vi < _ytCount - 1) {
                    await new Promise((resolve) => {
                      let done = false;
                      const finish = () => {
                        if (!done) {
                          done = true;
                          clearTimeout(t);
                          wc.removeListener("did-finish-load", onF);
                          wc.removeListener("did-fail-load", onFail);
                          resolve();
                        }
                      };
                      const onF = () => finish();
                      const onFail = (_, code) => {
                        if (code === -3) return;
                        finish();
                      };
                      const t = setTimeout(finish, 15e3);
                      wc.on("did-finish-load", onF);
                      wc.on("did-fail-load", onFail);
                      wc.loadURL("https://www.youtube.com/?app=desktop").catch(() => {
                      });
                    });
                    await sleep(3e3);
                  }
                } catch (ytVidErr) {
                  if (isAborted()) break;
                  relay(`\u26A0 YouTube warm-up: video ${vi + 1} error: ${ytVidErr?.message ?? String(ytVidErr)}`);
                }
              }
              if (!isAborted()) relay(`\u2705 YouTube warm-up complete`);
            } catch (ytErr) {
              if (!isAborted()) relay(`\u26A0 YouTube warm-up error: ${ytErr?.message ?? String(ytErr)}`);
            }
          }
          if (_ytCount > 0 || websitesToVisit.length > 0) {
            relay(`\u2705 All warm-up complete \u2014 starting Instagram signup now\u2026`);
          }
          if (isAborted()) return;
          try {
            relay("[mobile-setup] Forcing mobile layout via CDP (required for signup URL flow)\u2026");
            try {
              await wc.debugger.sendCommand("Emulation.setUserAgentOverride", {
                userAgent: `Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CURRENT_CHROME_MAJOR}.0.0.0 Mobile Safari/537.36`,
                acceptLanguage: "en-US,en;q=0.9",
                platform: "Linux armv8l",
                userAgentMetadata: {
                  brands: [
                    { brand: getChromeBuildInfo(CURRENT_CHROME_MAJOR).grease, version: getChromeBuildInfo(CURRENT_CHROME_MAJOR).greaseVer },
                    { brand: "Chromium", version: CURRENT_CHROME_MAJOR },
                    { brand: "Google Chrome", version: CURRENT_CHROME_MAJOR }
                  ],
                  fullVersionList: [
                    { brand: getChromeBuildInfo(CURRENT_CHROME_MAJOR).grease, version: getChromeBuildInfo(CURRENT_CHROME_MAJOR).greaseVer + ".0.0.0" },
                    { brand: "Chromium", version: getChromeBuildInfo(CURRENT_CHROME_MAJOR).full },
                    { brand: "Google Chrome", version: getChromeBuildInfo(CURRENT_CHROME_MAJOR).full }
                  ],
                  platform: "Android",
                  platformVersion: "14",
                  architecture: "arm",
                  model: "Pixel 8",
                  mobile: true,
                  bitness: "64",
                  wow64: false
                }
              });
              await wc.debugger.sendCommand("Emulation.setDeviceMetricsOverride", {
                width: 393,
                height: 851,
                deviceScaleFactor: 2.75,
                mobile: true,
                screenOrientation: { type: "portraitPrimary", angle: 0 }
              });
              await wc.debugger.sendCommand("Emulation.setTouchEmulationEnabled", {
                enabled: true,
                maxTouchPoints: 10
              });
              await wc.debugger.sendCommand("Emulation.setEmulatedMedia", {
                features: [
                  { name: "hover", value: "none" },
                  { name: "any-hover", value: "none" },
                  { name: "pointer", value: "coarse" },
                  { name: "any-pointer", value: "coarse" }
                ]
              });
              relay(`[mobile-setup] \u2705 Mobile UA=Pixel 8 Chrome/${CURRENT_CHROME_MAJOR} viewport=393x851 dpr=2.75 touch=on hover=none pointer=coarse`);
            } catch (mobileErr) {
              relay(`[mobile-setup] \u26A0 Could not set mobile layout: ${mobileErr?.message ?? String(mobileErr)} \u2014 desktop layout may be active, signup flow may fail`);
            }
            try {
              const _fpSnap = await wc.executeJavaScript(`(function(){
              var c=navigator.connection;
              return JSON.stringify({
                'ua':           navigator.userAgent.slice(0,80),
                'platform':     navigator.platform,
                'maxTouch':     navigator.maxTouchPoints,
                'hw':           navigator.hardwareConcurrency,
                'mem':          navigator.deviceMemory,
                'sw':           screen.width,
                'sh':           screen.height,
                'orientation':  screen.orientation?screen.orientation.type:'(none)',
                'winOri':       window.orientation,
                'dpr':          window.devicePixelRatio,
                'iw':           window.innerWidth,
                'ih':           window.innerHeight,
                'pointer':      window.matchMedia('(pointer:coarse)').matches,
                'hover':        window.matchMedia('(hover:none)').matches,
                'conn':         c?c.type:'(none)',
                'eff':          c?c.effectiveType:'(none)',
                'perf.mem':     typeof performance.memory,
                'kbd':          typeof navigator.keyboard,
                'ontouchstart': window.ontouchstart,
                'plugins':      navigator.plugins.length,
                'pdfViewer':    navigator.pdfViewerEnabled,
                'langs':        JSON.stringify(navigator.languages),
                'vvpW':         window.visualViewport?window.visualViewport.width:'(none)',
              });
            })()`);
              relay(`[fp-diag] ${_fpSnap}`);
            } catch (fpErr) {
              relay(`[fp-diag] snapshot failed: ${fpErr?.message}`);
            }
            await navAndWait("https://www.instagram.com/");
            relay("Checking for cookie banner\u2026");
            const COOKIE_LABELS = [
              "allow all cookies",
              "accept all cookies",
              "allow all",
              "accept all",
              "allow essential and optional cookies",
              "accept cookies",
              "allow cookies",
              "alle cookies akzeptieren",
              "accepter tout",
              "aceptar todo",
              "accetta tutto",
              "till\xE5t alla",
              "alle accepteren"
            ];
            const clickCookieAt = async (pos) => {
              await tap(pos.x, pos.y);
              await sleep(300);
              try {
                await js(`(function(){
                  var A=${JSON.stringify(COOKIE_LABELS)};
                  var b=document.querySelector('[data-cookiebanner="accept_button"]')||document.querySelector('[data-testid="cookie-policy-banner-accept"]');
                  if(!b){for(var e of document.querySelectorAll('button,[role="button"],a')){var t=(e.innerText||e.textContent||'').trim().toLowerCase();if(A.indexOf(t)!==-1){b=e;break;}}}
                  if(b){b.click();return true;}return false;
                })()`);
              } catch {
              }
            };
            {
              let initialPos = null;
              for (let poll = 0; poll < 14; poll++) {
                initialPos = await js(findByTextScript(COOKIE_LABELS));
                if (initialPos) break;
                await sleep(500);
              }
              if (!initialPos) {
                relay("\u2705 No cookie banner \u2014 proceeding\u2026");
              } else {
                let cookieDismissed = false;
                for (let attempt = 1; attempt <= 5; attempt++) {
                  const pos = await js(findByTextScript(COOKIE_LABELS));
                  if (!pos) {
                    cookieDismissed = true;
                    relay(`\u2705 Cookie banner dismissed (confirmed on attempt ${attempt})`);
                    break;
                  }
                  relay(`Accepting cookies\u2026 (attempt ${attempt}/5)`);
                  await clickCookieAt(pos);
                  await sleep(2e3);
                  const check = await js(findByTextScript(COOKIE_LABELS));
                  if (!check) {
                    cookieDismissed = true;
                    relay(`\u2705 Cookie banner dismissed (attempt ${attempt})`);
                    break;
                  }
                  relay(`Banner still visible after attempt ${attempt} \u2014 retrying\u2026`);
                  if (attempt < 5) await sleep(1e3);
                }
                if (!cookieDismissed) {
                  relay("\u274C Cookie banner could not be dismissed after 5 attempts. Please click 'Allow all cookies' manually and restart the signup flow.");
                  return;
                }
              }
              await sleep(3e3);
            }
            {
              const waitForUrl = async (condition, label, timeoutMs = 25e3) => {
                const start = Date.now();
                let lastUrl = "";
                while (Date.now() - start < timeoutMs) {
                  const url = wc.getURL();
                  if (url !== lastUrl) {
                    relay(`[url-gate] Waiting for "${label}" \u2014 URL: ${url}`);
                    lastUrl = url;
                  }
                  if (condition(url)) {
                    relay(`\u2705 [url-gate] Reached "${label}" \u2014 URL: ${url}`);
                    return true;
                  }
                  await sleep(600);
                }
                relay(`\u274C [url-gate] Timed out (${timeoutMs / 1e3}s) waiting for "${label}" \u2014 last URL: ${wc.getURL()}`);
                return false;
              };
              const dumpClickables = async (tag) => {
                const items = await js(`(function(){
                  return Array.from(document.querySelectorAll('button,a,div[role="button"],span[role="button"]'))
                    .map(function(e){return(e.innerText||e.textContent||'').trim().replace(/\\s+/g,' ').slice(0,80);})
                    .filter(function(t){return t.length>1;})
                    .slice(0,30);
                })()`);
                relay(`[debug/${tag}] Clickable elements: ${JSON.stringify(items)}`);
              };
              const curUrl = wc.getURL();
              relay(`[step2] URL at start of Step 2: ${curUrl}`);
              const onEmailForm = curUrl.includes("emailsignup") || curUrl.includes("signup/email");
              const onPhoneGate = !onEmailForm && (curUrl.includes("accounts/signup/phone") || curUrl.includes("accounts/signup") && !curUrl.includes("email"));
              const onHomepage = !onEmailForm && !onPhoneGate;
              relay(`[step2] onHomepage=${onHomepage}  onPhoneGate=${onPhoneGate}  onEmailForm=${onEmailForm}`);
              await dumpClickables("step2-start");
              if (onHomepage) {
                relay("[step2a] On homepage \u2014 looking for 'Sign up' button to CLICK (no URL teleport)\u2026");
                const SIGNUP_LABELS = [
                  "sign up",
                  "create new account",
                  "create account",
                  "get started",
                  "join now",
                  "s'inscrire",
                  "registrarse",
                  "iscriviti",
                  "registrieren"
                ];
                let reachedPhone = false;
                for (let attempt = 1; attempt <= 3 && !reachedPhone; attempt++) {
                  relay(`[step2a] Attempt ${attempt}/3 \u2014 searching for Sign Up button\u2026`);
                  await dumpClickables(`step2a-attempt${attempt}`);
                  const pos = await js(findByTextScript(SIGNUP_LABELS));
                  relay(`[step2a] Sign Up button found: ${pos ? `x=${pos.x} y=${pos.y}` : "NOT FOUND"}`);
                  if (!pos) {
                    relay(`[step2a] \u26A0 Sign Up button not found on attempt ${attempt} \u2014 waiting 2s before retry\u2026`);
                    await sleep(2e3);
                    continue;
                  }
                  relay(`[step2a] Resolving Sign Up target coords for touch-typed CDP click\u2026`);
                  const signupNavTarget = await js(`(function(){
                    var anchors = Array.from(document.querySelectorAll('a'));
                    // Priority 1: anchor with signup href \u2014 use its bounding rect centre
                    var byHref = anchors.find(function(a){
                      var h = a.getAttribute('href') || '';
                      return h.includes('/accounts/signup') && !h.includes('email') && !h.includes('phone') && !h.includes('login');
                    });
                    if (byHref) { var r=byHref.getBoundingClientRect(); if(r.width>0) return {x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2),found:'href:'+byHref.getAttribute('href')}; }
                    // Priority 2: visible button/link with signup text
                    var byText = Array.from(document.querySelectorAll('a,button,div[role="button"],span[role="button"]'))
                      .find(function(e){
                        var r = e.getBoundingClientRect();
                        if (r.width <= 0 || r.height <= 0) return false;
                        var t = (e.innerText||e.textContent||'').trim().toLowerCase();
                        return t === 'sign up' || t === 'create new account' || t === 'create account';
                      });
                    if (byText) { var r2=byText.getBoundingClientRect(); return {x:Math.round(r2.left+r2.width/2),y:Math.round(r2.top+r2.height/2),found:'text:'+(byText.textContent||'').trim().slice(0,40)}; }
                    return null;
                  })()`);
                  relay(`[step2a] Sign Up nav target: ${signupNavTarget ? JSON.stringify(signupNavTarget) : "null \u2014 no signup element found"}`);
                  if (signupNavTarget) {
                    const nx = signupNavTarget.x;
                    const ny = signupNavTarget.y;
                    try {
                      await wc.debugger.sendCommand("Input.dispatchMouseEvent", { type: "mousePressed", x: nx, y: ny, button: "left", clickCount: 1, modifiers: 0, pointerType: "touch" });
                      await sleep(60);
                      await wc.debugger.sendCommand("Input.dispatchMouseEvent", { type: "mouseReleased", x: nx, y: ny, button: "left", clickCount: 1, modifiers: 0, pointerType: "touch" });
                      relay(`[step2a] Touch-typed CDP click dispatched at (${nx},${ny})`);
                    } catch {
                    }
                  }
                  await tap(pos.x, pos.y);
                  await sleep(1500);
                  relay(`[step2a] Post-click URL: ${wc.getURL()}`);
                  reachedPhone = await waitForUrl(
                    (url) => url.includes("accounts/signup/phone") || url.includes("accounts/signup") && !url.includes("email"),
                    "/accounts/signup/phone",
                    2e4
                  );
                  if (!reachedPhone) {
                    relay(`[step2a] \u26A0 URL did not reach phone gate after attempt ${attempt} \u2014 URL: ${wc.getURL()}`);
                    const title = await js(`document.title`);
                    const snippet = await js(`document.body?.innerText?.slice(0,400)`);
                    relay(`[debug] Page title: ${title}`);
                    relay(`[debug] Page snippet: ${snippet}`);
                  }
                }
                if (!reachedPhone) {
                  relay("\u274C [step2a] Never reached /accounts/signup/phone after 3 click attempts \u2014 stopping.");
                  relay("[debug] Possible causes: Sign Up button not found, Instagram redirected to login, or SPA routing blocked click.");
                  return;
                }
                relay(`\u2705 [step2a] Confirmed on phone gate \u2014 URL: ${wc.getURL()}`);
                await sleep(1500);
              }
              if (!onEmailForm) {
                relay(`[step2b] On phone gate (URL: ${wc.getURL()}) \u2014 looking for 'Sign up with email' to CLICK\u2026`);
                await dumpClickables("step2b-phone-gate");
                const EMAIL_LABELS = [
                  "sign up with email",
                  "sign up with email address",
                  "use email",
                  "use email address",
                  "use your email address",
                  "email address"
                ];
                let reachedEmail = false;
                for (let attempt = 1; attempt <= 3 && !reachedEmail; attempt++) {
                  relay(`[step2b] Attempt ${attempt}/3 \u2014 searching for 'Sign up with email'\u2026`);
                  const emailPos2 = await js(findByTextScript(EMAIL_LABELS));
                  relay(`[step2b] 'Sign up with email' found: ${emailPos2 ? `x=${emailPos2.x} y=${emailPos2.y}` : "NOT FOUND"}`);
                  if (!emailPos2) {
                    relay(`[step2b] \u26A0 Not found on attempt ${attempt} \u2014 waiting 2s\u2026`);
                    await dumpClickables(`step2b-attempt${attempt}-not-found`);
                    await sleep(2e3);
                    continue;
                  }
                  relay(`[step2b] Resolving 'Sign up with email' coords for touch-typed CDP click\u2026`);
                  const emailNavTarget = await js(`(function(){
                    // Priority 1: anchor with emailsignup href
                    var byHref = Array.from(document.querySelectorAll('a')).find(function(a){
                      var h = a.getAttribute('href') || '';
                      return h.includes('emailsignup') || h.includes('signup/email');
                    });
                    if (byHref) { var r=byHref.getBoundingClientRect(); if(r.width>0) return {x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2),found:'href:'+byHref.getAttribute('href')}; }
                    // Priority 2: visible element with email signup text
                    var byText = Array.from(document.querySelectorAll('a,button,div[role="button"],span[role="button"]'))
                      .find(function(e){
                        var r = e.getBoundingClientRect();
                        if (r.width <= 0 || r.height <= 0) return false;
                        var t = (e.innerText||e.textContent||'').trim().toLowerCase();
                        return t.includes('sign up with email') || t.includes('use email') || t === 'email address';
                      });
                    if (byText) { var r2=byText.getBoundingClientRect(); return {x:Math.round(r2.left+r2.width/2),y:Math.round(r2.top+r2.height/2),found:'text:'+(byText.textContent||'').trim().slice(0,40)}; }
                    return null;
                  })()`);
                  relay(`[step2b] Email nav target: ${emailNavTarget ? JSON.stringify(emailNavTarget) : "null \u2014 no element found"}`);
                  if (emailNavTarget) {
                    const enx = emailNavTarget.x;
                    const eny = emailNavTarget.y;
                    try {
                      await wc.debugger.sendCommand("Input.dispatchMouseEvent", { type: "mousePressed", x: enx, y: eny, button: "left", clickCount: 1, modifiers: 0, pointerType: "touch" });
                      await sleep(60);
                      await wc.debugger.sendCommand("Input.dispatchMouseEvent", { type: "mouseReleased", x: enx, y: eny, button: "left", clickCount: 1, modifiers: 0, pointerType: "touch" });
                      relay(`[step2b] Touch-typed CDP click dispatched at (${enx},${eny})`);
                    } catch {
                    }
                  }
                  await tap(emailPos2.x, emailPos2.y);
                  await sleep(1500);
                  relay(`[step2b] Post-click URL: ${wc.getURL()}`);
                  reachedEmail = await waitForUrl(
                    (url) => url.includes("emailsignup") || url.includes("signup/email"),
                    "/accounts/signup/email",
                    2e4
                  );
                  if (!reachedEmail) {
                    relay(`[step2b] \u26A0 URL did not reach email form after attempt ${attempt} \u2014 URL: ${wc.getURL()}`);
                    const title2 = await js(`document.title`);
                    const snippet2 = await js(`document.body?.innerText?.slice(0,400)`);
                    relay(`[debug] Page title: ${title2}`);
                    relay(`[debug] Page snippet: ${snippet2}`);
                    await dumpClickables(`step2b-attempt${attempt}-after-fail`);
                  }
                }
                if (!reachedEmail) {
                  relay("\u274C [step2b] Never reached /accounts/signup/email after 3 click attempts \u2014 stopping.");
                  relay("[debug] Possible causes: 'Sign up with email' not found, wrong element tapped, or Instagram SPA routing failed.");
                  return;
                }
                relay(`\u2705 [step2b] Confirmed on email signup form \u2014 URL: ${wc.getURL()}`);
                await sleep(1500);
              }
              relay(`[step2] Step 2 complete \u2705 \u2014 URL: ${wc.getURL()}`);
            }
            relay("Waiting for email field\u2026");
            let emailPos = null;
            for (let poll = 0; poll < 10; poll++) {
              emailPos = await js(findInputScript([
                "emailOrPhone",
                "email",
                "Email",
                "Mobile Number or Email",
                "Mobile number or email address"
              ]));
              if (emailPos) break;
              await sleep(800);
            }
            if (!emailPos) {
              relay("\u274C Email field not found after 8 s \u2014 cookie banner may still be visible or page did not load correctly. Stopping.");
              return;
            }
            relay("\u2705 Email field found \u2014 filling\u2026");
            await clearAndType(emailPos.x, emailPos.y, email);
            await sleep(600);
            const nextOk = await waitAndTap(["next", "continue"], "Next (after email)");
            if (!nextOk) {
              relay("\u274C 'Next' button not found after email entry \u2014 stopping. The email may have been rejected or the form layout changed.");
              return;
            }
            await sleep(3500);
            relay("\u23F3 Waiting for verification code \u2014 use 'Fetch from IMAP' or type it manually and click 'Submit Code'\u2026");
            let verifyCode = "";
            const codeTimeout = Date.now() + 5 * 60 * 1e3;
            while (!verifyCode && Date.now() < codeTimeout) {
              try {
                if (_serverPort) {
                  const cr = await fetch(`http://127.0.0.1:${_serverPort}/api/signup/browser/ghost-code-peek?slot=${slot}`);
                  const cj = await cr.json();
                  if (cj.code) {
                    verifyCode = String(cj.code).trim();
                    break;
                  }
                }
              } catch {
              }
              await sleep(3e3);
            }
            if (!verifyCode) {
              relay("\u26A0 Timed out waiting for verification code (5 min)");
              return;
            }
            relay(`Got code: ${verifyCode} \u2014 entering\u2026`);
            await sleep(500);
            const codePos = await js(findInputScript([
              "code",
              "confirmationCode",
              "Confirmation code",
              "Enter confirmation code",
              "Verification code"
            ]));
            if (codePos) {
              await clearAndType(codePos.x, codePos.y, verifyCode);
              await sleep(500);
              await waitAndTap(["next", "confirm", "continue", "verify"], "Next (after code)");
              await sleep(3e3);
            } else {
              relay("\u26A0 Code input not found \u2014 entering via keyboard only");
              await typeText(verifyCode);
              await sleep(500);
              await waitAndTap(["next", "confirm", "continue"], "Next (after code)");
              await sleep(3e3);
            }
            let passwordFilled = false;
            {
              relay(`[debug] Checking for password page \u2014 URL: ${wc.getURL()}`);
              let pwPosEarly = await js(findInputScript([
                "password",
                "Password",
                "Create a password"
              ]));
              relay(`[debug] Password field detected: ${pwPosEarly ? `yes at ${pwPosEarly.x},${pwPosEarly.y}` : "no"}`);
              if (!pwPosEarly) {
                await sleep(1800);
                pwPosEarly = await js(findInputScript([
                  "password",
                  "Password",
                  "Create a password"
                ]));
                relay(`[debug] Password field after 1.8s wait: ${pwPosEarly ? `yes at ${pwPosEarly.x},${pwPosEarly.y}` : "no"}`);
              }
              if (pwPosEarly) {
                relay("Password page detected \u2014 filling password\u2026");
                await clearAndType(pwPosEarly.x, pwPosEarly.y, password);
                await sleep(800);
                const pwNextOk = await waitAndTap(["next", "continue"], "Next (after password)");
                if (!pwNextOk) relay("\u26A0 'Next' not found after password \u2014 Instagram may be showing a validation error. Check the browser window.");
                relay("Waiting for DOB page to appear after password\u2026");
                const dobReadyDeadline = Date.now() + 12e3;
                let dobReady = false;
                while (Date.now() < dobReadyDeadline) {
                  await sleep(700);
                  const curUrl = wc.getURL();
                  const hasDob = await js(`(function(){
                    var s=document.querySelector('select[aria-label*="Month"],select[aria-label*="month"],[aria-label*="Month"],[aria-label*="month"],select');
                    if(s){var r=s.getBoundingClientRect();if(r.width>0&&r.height>0)return true;}
                    // Also check for the password field being gone AND URL changed
                    var pw=document.querySelector('input[type="password"]');
                    return !pw || pw.getBoundingClientRect().width===0;
                  })()`);
                  relay(`[debug] DOB wait \u2014 URL: ${curUrl} | dobSignal: ${hasDob}`);
                  if (hasDob) {
                    dobReady = true;
                    break;
                  }
                }
                if (!dobReady) relay("\u26A0 DOB page did not appear within 12 s after password \u2014 proceeding anyway");
                await sleep(800);
                passwordFilled = true;
                relay(`[debug] Password step complete. URL now: ${wc.getURL()}`);
              }
            }
            relay(`[debug] Starting DOB step \u2014 URL: ${wc.getURL()}`);
            relay("Filling date of birth\u2026");
            const dobParts = dob.split("/");
            const dobDay = parseInt(dobParts[0] ?? "15", 10);
            const dobMonth = parseInt(dobParts[1] ?? "6", 10);
            const dobYear = parseInt(dobParts[2] ?? "1995", 10);
            const drumProbe = await js(`(function(){
              var cols=Array.from(document.querySelectorAll('[role="listbox"]'));
              if(!cols.length) return null;
              var result=[];
              for(var i=0;i<cols.length;i++){
                var col=cols[i];
                var items=Array.from(col.querySelectorAll('[role="option"]'));
                if(items.length<2) continue;
                var rect=col.getBoundingClientRect();
                if(!rect.width||!rect.height) continue;
                var r0=items[0].getBoundingClientRect();
                var r1=items.length>1?items[1].getBoundingClientRect():null;
                var itemH=r1?Math.abs(r1.top-r0.top):44;
                if(itemH<8) itemH=44;
                // Find currently centered item (visible in the column window)
                var midY=rect.top+rect.height/2,bestK=0,bestD=1e9;
                for(var k=0;k<items.length;k++){
                  var ir=items[k].getBoundingClientRect();
                  var d=Math.abs((ir.top+ir.height/2)-midY);
                  if(d<bestD){bestD=d;bestK=k;}
                }
                result.push({
                  label:(col.getAttribute('aria-label')||'').toLowerCase(),
                  cx:Math.round(rect.left+rect.width/2),
                  cy:Math.round(rect.top+rect.height/2),
                  items:items.map(function(it){return(it.innerText||it.textContent||'').trim();}),
                  curIdx:bestK,
                  itemH:Math.round(itemH)
                });
              }
              return result.length>=2?result:null;
            })()`);
            if (drumProbe && drumProbe.length >= 2) {
              relay(`[debug] DOB: drum picker detected (${drumProbe.length} columns)`);
              const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
              for (const col of drumProbe) {
                const lbl = col.label;
                const items = col.items;
                let targetIdx = -1;
                const isMonthCol = lbl.includes("month") || items.some((v) => monthNames.includes(v.toLowerCase()));
                const isYearCol = lbl.includes("year") || items.some((v) => parseInt(v) > 1900 && parseInt(v) < 2100);
                const isDayCol = lbl.includes("day") || !isMonthCol && !isYearCol;
                if (isMonthCol) {
                  targetIdx = items.findIndex((v) => {
                    const n = parseInt(v);
                    if (!isNaN(n)) return n === dobMonth;
                    return monthNames.indexOf(v.toLowerCase()) + 1 === dobMonth;
                  });
                } else if (isYearCol) {
                  targetIdx = items.findIndex((v) => parseInt(v) === dobYear);
                } else if (isDayCol) {
                  targetIdx = items.findIndex((v) => parseInt(v) === dobDay);
                }
                if (targetIdx === -1) {
                  relay(`[debug] DOB drum: col="${lbl}" \u2014 target not found in items, skipping`);
                  continue;
                }
                const delta = targetIdx - col.curIdx;
                if (delta === 0) {
                  relay(`[debug] DOB drum: col="${lbl}" already at target (idx=${targetIdx})`);
                  continue;
                }
                const yDist = -(delta * col.itemH);
                relay(`[debug] DOB drum: col="${lbl}" curIdx=${col.curIdx} targetIdx=${targetIdx} delta=${delta} yDist=${yDist} itemH=${col.itemH}`);
                try {
                  await wc.debugger.sendCommand("Input.synthesizeScrollGesture", {
                    x: col.cx,
                    y: col.cy,
                    xDistance: 0,
                    yDistance: yDist,
                    speed: 350 + Math.round(Math.random() * 100),
                    gestureSourceType: "touch"
                  });
                } catch (scrollErr) {
                  relay(`[debug] DOB drum scroll err: ${scrollErr?.message}`);
                }
                await sleep(500 + Math.round(Math.random() * 300));
              }
              await sleep(800);
            } else {
              await js(`(function(){
                var selects=Array.from(document.querySelectorAll('select'));
                for(var i=0;i<selects.length;i++){
                  var s=selects[i];
                  var opts=Array.from(s.options).map(function(o){return o.text||o.value;});
                  var hasMonthName=opts.some(function(o){return/january|february|march|april|may|june|july|august|september|october|november|december/i.test(o);});
                  var hasMonthNum=opts.some(function(o){return o.trim()==='1'||o.trim()==='01';});
                  if(hasMonthName||hasMonthNum){
                    for(var k=0;k<s.options.length;k++){
                      var ov=s.options[k].value;
                      if(ov===${dobMonth}||ov==='${String(dobMonth).padStart(2, "0")}'){
                        s.selectedIndex=k;s.dispatchEvent(new Event('change',{bubbles:true}));break;
                      }
                    }
                  } else if(opts.some(function(o){return parseInt(o)>1900&&parseInt(o)<2100;})){
                    for(var k2=0;k2<s.options.length;k2++){
                      if(s.options[k2].value=='${dobYear}'||s.options[k2].text=='${dobYear}'){
                        s.selectedIndex=k2;s.dispatchEvent(new Event('change',{bubbles:true}));break;
                      }
                    }
                  } else if(opts.some(function(o){return parseInt(o)>0&&parseInt(o)<=31;})){
                    for(var k3=0;k3<s.options.length;k3++){
                      if(s.options[k3].value=='${dobDay}'||s.options[k3].value==='${String(dobDay).padStart(2, "0")}'){
                        s.selectedIndex=k3;s.dispatchEvent(new Event('change',{bubbles:true}));break;
                      }
                    }
                  }
                }
                function setNativeVal(sel,val){var el=document.querySelector(sel);if(!el||el.tagName!=='SELECT')return;var nativeInputValueSetter=Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype,'value').set;nativeInputValueSetter.call(el,val);el.dispatchEvent(new Event('change',{bubbles:true}));}
                setNativeVal('[aria-label*="Month"],[aria-label*="month"]','${dobMonth}');
                setNativeVal('[aria-label*="Day"],[aria-label*="day"]','${dobDay}');
                setNativeVal('[aria-label*="Year"],[aria-label*="year"]','${dobYear}');
              })()`);
              await sleep(800);
              const dobDiag = await js(`(function(){
                var selects=Array.from(document.querySelectorAll('select')).filter(function(s){var r=s.getBoundingClientRect();return r.width>0;});
                var inputs=Array.from(document.querySelectorAll('input')).filter(function(i){
                  if(i.type==='hidden'||i.type==='submit'||i.type==='button'||i.type==='checkbox'||i.type==='radio') return false;
                  var r=i.getBoundingClientRect(); return r.width>0&&r.height>0;
                });
                return {selectCount:selects.length,inputs:inputs.map(function(i){return{type:i.type,placeholder:i.placeholder,aria:i.getAttribute('aria-label'),val:i.value};})};
              })()`);
              relay(`[debug] DOB DOM \u2014 selects:${dobDiag?.selectCount} visibleInputs:${JSON.stringify(dobDiag?.inputs)}`);
              if ((dobDiag?.selectCount ?? 0) === 0) {
                const dobTextInputPos = await js(`(function(){
                  var inputs=Array.from(document.querySelectorAll('input'));
                  var inp=inputs.find(function(i){
                    var lbl=(i.getAttribute('aria-label')||i.placeholder||i.getAttribute('name')||'').toLowerCase();
                    return lbl.includes('birthday')||lbl.includes('birth')||lbl.includes('mm/dd')||lbl.includes('dd/mm')||lbl.includes('date');
                  });
                  if(!inp){
                    inp=inputs.find(function(i){
                      if(i.type==='hidden'||i.type==='submit'||i.type==='button'||i.type==='checkbox'||i.type==='radio'||i.type==='password') return false;
                      var r=i.getBoundingClientRect(); return r.width>0&&r.height>0;
                    });
                  }
                  if(!inp) return null;
                  var r=inp.getBoundingClientRect();
                  return {x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2),placeholder:inp.placeholder,aria:inp.getAttribute('aria-label')};
                })()`);
                if (dobTextInputPos) {
                  const mm = String(dobMonth).padStart(2, "0");
                  const dd = String(dobDay).padStart(2, "0");
                  const dateStr = `${mm}/${dd}/${dobYear}`;
                  relay(`[debug] DOB text input at (${dobTextInputPos.x},${dobTextInputPos.y}) \u2014 tapping to check if picker opens\u2026`);
                  await tap(dobTextInputPos.x, dobTextInputPos.y);
                  await sleep(900);
                  const drumAfterTap = await js(`(function(){
                    var cols=Array.from(document.querySelectorAll('[role="listbox"]'));
                    if(!cols.length)return null;
                    var result=[];
                    for(var i=0;i<cols.length;i++){
                      var col=cols[i];var items=Array.from(col.querySelectorAll('[role="option"]'));
                      if(items.length<2)continue;
                      var rect=col.getBoundingClientRect();if(!rect.width||!rect.height)continue;
                      var r0=items[0].getBoundingClientRect();
                      var r1=items.length>1?items[1].getBoundingClientRect():null;
                      var itemH=r1?Math.abs(r1.top-r0.top):44;if(itemH<8)itemH=44;
                      var midY=rect.top+rect.height/2,bestK=0,bestD=1e9;
                      for(var k=0;k<items.length;k++){var ir=items[k].getBoundingClientRect();var d=Math.abs((ir.top+ir.height/2)-midY);if(d<bestD){bestD=d;bestK=k;}}
                      result.push({label:(col.getAttribute('aria-label')||'').toLowerCase(),cx:Math.round(rect.left+rect.width/2),cy:Math.round(rect.top+rect.height/2),items:items.map(function(it){return(it.innerText||it.textContent||'').trim();}),curIdx:bestK,itemH:Math.round(itemH)});
                    }
                    return result.length>=2?result:null;
                  })()`);
                  if (drumAfterTap && drumAfterTap.length >= 2) {
                    relay(`[debug] DOB: drum picker appeared after tap (${drumAfterTap.length} cols) \u2014 scrolling\u2026`);
                    const monthNamesM3 = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
                    for (const col of drumAfterTap) {
                      const lbl = col.label;
                      const items = col.items;
                      let targetIdx = -1;
                      const isMonthCol = lbl.includes("month") || items.some((v) => monthNamesM3.includes(v.toLowerCase()));
                      const isYearCol = lbl.includes("year") || items.some((v) => parseInt(v) > 1900 && parseInt(v) < 2100);
                      const isDayCol = lbl.includes("day") || !isMonthCol && !isYearCol;
                      if (isMonthCol) {
                        targetIdx = items.findIndex((v) => {
                          const n = parseInt(v);
                          if (!isNaN(n)) return n === dobMonth;
                          return monthNamesM3.indexOf(v.toLowerCase()) + 1 === dobMonth;
                        });
                      } else if (isYearCol) {
                        targetIdx = items.findIndex((v) => parseInt(v) === dobYear);
                      } else if (isDayCol) {
                        targetIdx = items.findIndex((v) => parseInt(v) === dobDay);
                      }
                      if (targetIdx === -1) {
                        relay(`[debug] DOB drum post-tap: col="${lbl}" target not found`);
                        continue;
                      }
                      const delta = targetIdx - col.curIdx;
                      if (delta === 0) {
                        relay(`[debug] DOB drum post-tap: col="${lbl}" already at target`);
                        continue;
                      }
                      relay(`[debug] DOB drum post-tap: col="${lbl}" delta=${delta} yDist=${-(delta * col.itemH)}`);
                      try {
                        await wc.debugger.sendCommand("Input.synthesizeScrollGesture", {
                          x: col.cx,
                          y: col.cy,
                          xDistance: 0,
                          yDistance: -(delta * col.itemH),
                          speed: 350 + Math.round(Math.random() * 100),
                          gestureSourceType: "touch"
                        });
                      } catch {
                      }
                      await sleep(500 + Math.round(Math.random() * 300));
                    }
                    await sleep(800);
                  } else {
                    relay(`[debug] DOB: no picker after tap \u2014 typing "${dateStr}" character by character\u2026`);
                    await clearAndType(dobTextInputPos.x, dobTextInputPos.y, dateStr);
                    await sleep(400);
                  }
                } else {
                  relay("\u26A0 DOB: no drum, no selects, no text input found \u2014 tapping Next anyway");
                }
              }
            }
            await waitAndTap(["set", "next", "continue"], "Set/Next (after DOB)");
            await sleep(2800);
            const _firstNames = ["Emma", "Liam", "Olivia", "Noah", "Ava", "James", "Sophia", "William", "Isabella", "Oliver", "Charlotte", "Benjamin", "Amelia", "Elijah", "Mia", "Lucas", "Harper", "Mason", "Evelyn", "Logan", "Abigail", "Ethan", "Emily", "Aiden", "Ella", "Jackson", "Elizabeth", "Sebastian", "Camila", "Mateo", "Luna", "Jack", "Sofia", "Owen", "Chloe", "Samuel", "Victoria", "Ryan", "Riley", "Daniel", "Aria", "Luke", "Madison", "Gabriel", "Layla", "Alexander", "Penelope", "Jayden", "Grace", "Christopher"];
            const _lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez", "Lee", "Gonzalez", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young", "Allen", "Sanchez", "Wright", "King", "Scott", "Green", "Baker", "Adams", "Nelson", "Hill", "Ramirez", "Campbell", "Mitchell", "Roberts", "Carter", "Phillips", "Evans", "Turner", "Torres", "Parker"];
            const _randFirst = _firstNames[Math.floor(Math.random() * _firstNames.length)];
            const _randLast = _lastNames[Math.floor(Math.random() * _lastNames.length)];
            const _fullName = `${_randFirst} ${_randLast}`;
            relay(`Name screen \u2014 filling "${_fullName}"\u2026`);
            const namePos = await js(`(function(){
              var inputs = Array.from(document.querySelectorAll('input'));
              var n = inputs.find(function(el){
                var a=(el.getAttribute('aria-label')||'').toLowerCase();
                var p=(el.placeholder||'').toLowerCase();
                var nm=(el.name||'').toLowerCase();
                return a.includes('name')||p.includes('name')||nm.includes('name')||nm==='fullName';
              });
              if(!n)return null;
              var r=n.getBoundingClientRect();
              return r.width>0&&r.height>0?{x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2)}:null;
            })()`);
            if (namePos) {
              await clearAndType(namePos.x, namePos.y, _fullName);
              await sleep(800);
            } else {
              relay("\u26A0 Name field not found \u2014 skipping name (field may not be present in this flow)");
            }
            const nameNextOk = await waitAndTap(["next", "continue", "skip"], "Next (after name)", 8e3);
            if (!nameNextOk) {
              await tap(400, 100);
              await sleep(500);
              await waitAndTap(["next", "continue"], "Next (after name, retry)");
            }
            await sleep(2800);
            relay("Filling username\u2026");
            const unamePos = await js(findInputScript([
              "username",
              "Username",
              "user name",
              "Choose a username"
            ]));
            if (unamePos) {
              await clearAndType(unamePos.x, unamePos.y, username);
              await sleep(1200);
              await waitAndTap(["next", "continue"], "Next (after username)");
              await sleep(2800);
            } else {
              relay("\u26A0 Username field not found");
            }
            if (!passwordFilled) {
              const pwPos = await js(findInputScript([
                "password",
                "Password",
                "Create a password"
              ]));
              if (pwPos) {
                relay("Filling password (late-stage)\u2026");
                await clearAndType(pwPos.x, pwPos.y, password);
                await sleep(500);
                await waitAndTap(["next", "continue"], "Next (after password)");
                await sleep(2800);
              }
            }
            relay("Accepting terms\u2026");
            await waitAndTap(["i agree", "agree to", "accept", "next", "continue", "done"], "I agree (terms)");
            await sleep(2e3);
            await relayDone();
          } catch (err) {
            relay(`\u26A0 Signup error: ${err?.message ?? String(err)}`);
            if (_serverPort) {
              fetch(`http://127.0.0.1:${_serverPort}/api/signup/browser/ghost-signup-step`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ msg: `\u26A0 Signup error: ${err?.message ?? String(err)}`, done: true, slot })
              }).catch(() => {
              });
            }
          }
        })().catch((err) => {
          console.log(`[ghost-signup] OUTER CATCH: ${err?.message ?? String(err)}`);
        });
        return;
      }
      send(res, 404, { error: "not found" });
    } catch (e) {
      send(res, 500, { error: e?.message ?? String(e) });
    }
  });
  server.requestTimeout = 0;
  server.headersTimeout = 0;
  refreshChromeVersion();
  setInterval(refreshChromeVersion, _CHROME_VERSION_CACHE_TTL).unref();
  return new Promise((resolve, reject) => {
    server.listen(0, "127.0.0.1", () => {
      const port = server.address().port;
      console.log(`[ebManager] IPC server started on port ${port}`);
      resolve(port);
    });
    server.on("error", reject);
  });
}
function focusEbWindow(profileId) {
  const e = ebMap.get(profileId);
  if (e && !e.win.isDestroyed()) {
    if (e.win.isMinimized()) e.win.restore();
    if (!e.win.isVisible()) e.win.show();
    e.win.focus();
  }
}

// src/main.ts
var import_electron3 = require("electron");
var _mainLogPath = "";
var _serverDebugLogPath = "";
function appendToMainLog(msg) {
  const line = `[${(/* @__PURE__ */ new Date()).toISOString()}] [MAIN] ${msg}`;
  try {
    process.stderr.write(line + "\n");
  } catch {
  }
  if (_mainLogPath) {
    try {
      import_fs2.default.appendFileSync(_mainLogPath, line + "\n");
    } catch {
    }
  }
  if (serverPort) {
    try {
      const body = JSON.stringify({ message: line });
      const req = require("http").request(
        {
          hostname: "127.0.0.1",
          port: serverPort,
          path: "/api/ipc-log",
          method: "POST",
          headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) }
        },
        () => {
        }
      );
      req.on("error", () => {
      });
      req.write(body);
      req.end();
    } catch {
    }
  }
}
process.on("uncaughtException", (err) => {
  const msg = `UNCAUGHT EXCEPTION: ${err?.stack || err?.message || String(err)}`;
  appendToMainLog(msg);
});
process.on("unhandledRejection", (reason) => {
  const msg = `UNHANDLED REJECTION: ${reason?.stack || reason?.message || String(reason)}`;
  appendToMainLog(msg);
});
var execAsync = (0, import_util.promisify)(import_child_process.exec);
var serverPort = 0;
var serverProc = null;
var win = null;
var tray = null;
var isQuitting = false;
var splashWin = null;
var splashIconDataUrl = "";
function findFreePort() {
  return new Promise((resolve, reject) => {
    const srv = import_net.default.createServer();
    srv.listen(0, "127.0.0.1", () => {
      const addr = srv.address();
      srv.close(() => resolve(addr.port));
    });
    srv.on("error", reject);
  });
}
var PREFERRED_PORT = 32988;
function getServerPort() {
  return new Promise((resolve) => {
    const probe = import_net.default.createServer();
    probe.listen(PREFERRED_PORT, "127.0.0.1", () => {
      probe.close(() => resolve(PREFERRED_PORT));
    });
    probe.on("error", () => {
      findFreePort().then(resolve).catch(() => resolve(19876));
    });
  });
}
function getUserDataPath() {
  const p = import_path2.default.join(import_electron2.app.getPath("userData"), "equinox-data");
  import_fs2.default.mkdirSync(p, { recursive: true });
  return p;
}
function getInstallDataPath() {
  return getUserDataPath();
}
function getLegacyInstallDataPath() {
  const p = import_electron2.app.isPackaged ? import_path2.default.dirname(import_electron2.app.getPath("exe")) : getUserDataPath();
  import_fs2.default.mkdirSync(p, { recursive: true });
  return p;
}
function migrateLegacyDataIfNeeded() {
  if (!import_electron2.app.isPackaged) return;
  const dataDir = getInstallDataPath();
  const legacyDir = getLegacyInstallDataPath();
  if (import_path2.default.resolve(dataDir) === import_path2.default.resolve(legacyDir)) return;
  const dbSrc = import_path2.default.join(legacyDir, "database.db");
  const dbDst = import_path2.default.join(dataDir, "database.db");
  if (!import_fs2.default.existsSync(dbDst) && import_fs2.default.existsSync(dbSrc)) {
    try {
      import_fs2.default.copyFileSync(dbSrc, dbDst);
      for (const ext of ["-wal", "-shm"]) {
        const src = dbSrc + ext;
        if (import_fs2.default.existsSync(src)) import_fs2.default.copyFileSync(src, dbDst + ext);
      }
      console.log(`[data] migrated legacy database from ${dbSrc} to ${dbDst}`);
    } catch (err) {
      console.error("[data] legacy database migration failed:", err);
    }
  }
  for (const name of ["backups", "browser-data"]) {
    const src = import_path2.default.join(legacyDir, name);
    const dst = import_path2.default.join(dataDir, name);
    if (!import_fs2.default.existsSync(dst) && import_fs2.default.existsSync(src)) {
      try {
        import_fs2.default.cpSync(src, dst, { recursive: true });
        console.log(`[data] migrated legacy ${name} from ${src} to ${dst}`);
      } catch (err) {
        console.error(`[data] legacy ${name} migration failed:`, err);
      }
    }
  }
}
function preserveLegacyDataBeforeUpdate() {
  if (!import_electron2.app.isPackaged) return;
  try {
    migrateLegacyDataIfNeeded();
    appendToMainLog("[data] preserved legacy state before Windows update");
  } catch (err) {
    appendToMainLog(`[data] pre-update legacy state preservation failed: ${String(err)}`);
  }
}
function getDatabasePath() {
  migrateLegacyDataIfNeeded();
  return import_path2.default.join(getInstallDataPath(), "database.db");
}
function getServerEntry() {
  if (import_electron2.app.isPackaged) {
    return import_path2.default.join(process.resourcesPath, "app", "dist", "server", "start.mjs");
  }
  return import_path2.default.join(__dirname, "..", "dist", "server", "start.mjs");
}
function getFrontendPath() {
  if (import_electron2.app.isPackaged) {
    return import_path2.default.join(process.resourcesPath, "app", "dist", "frontend", "public");
  }
  return import_path2.default.join(__dirname, "..", "dist", "frontend", "public");
}
function getIconPath() {
  if (import_electron2.app.isPackaged) {
    return import_path2.default.join(process.resourcesPath, "app", "dist", "assets", "icon.png");
  }
  return import_path2.default.join(__dirname, "..", "assets", "icon.png");
}
function getTrayIconPath() {
  if (process.platform === "win32") {
    if (import_electron2.app.isPackaged) {
      return import_path2.default.join(process.resourcesPath, "app", "dist", "assets", "icon.ico");
    }
    return import_path2.default.join(__dirname, "..", "assets", "icon.ico");
  }
  return getIconPath();
}
function buildSplashHtml(label, iconDataUrl) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{
  width:100%;height:100%;
  background:#ffffff;
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  font-family:'Segoe UI',system-ui,sans-serif;
  overflow:hidden;user-select:none;
}
img{width:88px;height:88px;margin-bottom:28px;border-radius:16px;}
.title{font-size:22px;font-weight:700;color:#0f172a;letter-spacing:0.02em;margin-bottom:6px;}
.label{font-size:11px;color:rgba(0,0,0,0.38);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:28px;}
.bar-track{width:220px;height:3px;background:rgba(0,0,0,0.10);border-radius:999px;overflow:hidden;}
.bar-fill{
  height:100%;width:45%;
  background:linear-gradient(90deg,transparent,#334155,transparent);
  border-radius:999px;
  animation:sweep 1.6s ease-in-out infinite;
}
@keyframes sweep{
  0%{transform:translateX(-200%);}
  100%{transform:translateX(620%);}
}
</style></head>
<body>
  <img src="${iconDataUrl}" />
  <div class="title">Equinox</div>
  <div class="label">${label}</div>
  <div class="bar-track"><div class="bar-fill"></div></div>
</body></html>`;
}
function createSplash(label = "Loading\u2026") {
  if (splashWin && !splashWin.isDestroyed()) {
    splashWin.close();
    splashWin = null;
  }
  try {
    if (!splashIconDataUrl) {
      splashIconDataUrl = import_electron2.nativeImage.createFromPath(getIconPath()).toDataURL();
    }
  } catch {
  }
  const { width, height } = import_electron2.screen.getPrimaryDisplay().workAreaSize;
  const W = 420, H = 300;
  splashWin = new import_electron2.BrowserWindow({
    width: W,
    height: H,
    x: Math.round((width - W) / 2),
    y: Math.round((height - H) / 2),
    frame: false,
    resizable: false,
    movable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    show: false,
    backgroundColor: "#ffffff",
    webPreferences: { nodeIntegration: false, contextIsolation: true }
  });
  splashWin.loadURL(
    `data:text/html;charset=utf-8,${encodeURIComponent(buildSplashHtml(label, splashIconDataUrl))}`
  );
  splashWin.once("ready-to-show", () => splashWin?.show());
}
function closeSplash() {
  if (splashWin && !splashWin.isDestroyed()) {
    splashWin.close();
    splashWin = null;
  }
}
function waitForServer(port, timeoutMs = 3e4) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function attempt() {
      const req = import_http2.default.get(`http://127.0.0.1:${port}/`, (res) => {
        res.resume();
        resolve();
      });
      req.setTimeout(1500, () => req.destroy());
      req.on("error", () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error("timeout waiting for server"));
        } else {
          setTimeout(attempt, 600);
        }
      });
    }
    attempt();
  });
}
function findChromiumPath() {
  console.log("[EB-DEBUG][findChromiumPath] platform=" + process.platform);
  if (process.platform === "win32") {
    const localAppData = process.env.LOCALAPPDATA || "";
    const programFiles = process.env.ProgramFiles || "C:\\Program Files";
    const programFilesX86 = process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)";
    console.log("[EB-DEBUG][findChromiumPath] LOCALAPPDATA=" + localAppData);
    console.log("[EB-DEBUG][findChromiumPath] ProgramFiles=" + programFiles);
    console.log("[EB-DEBUG][findChromiumPath] ProgramFiles(x86)=" + programFilesX86);
    const candidates = [
      import_path2.default.join(programFiles, "Google", "Chrome", "Application", "chrome.exe"),
      import_path2.default.join(programFilesX86, "Google", "Chrome", "Application", "chrome.exe"),
      import_path2.default.join(localAppData, "Google", "Chrome", "Application", "chrome.exe"),
      import_path2.default.join(programFiles, "Microsoft", "Edge", "Application", "msedge.exe"),
      import_path2.default.join(programFilesX86, "Microsoft", "Edge", "Application", "msedge.exe"),
      import_path2.default.join(localAppData, "Microsoft", "Edge", "Application", "msedge.exe"),
      import_path2.default.join(programFiles, "BraveSoftware", "Brave-Browser", "Application", "brave.exe")
    ];
    for (const p of candidates) {
      let exists = false;
      try {
        exists = import_fs2.default.existsSync(p);
      } catch {
      }
      console.log(`[EB-DEBUG][findChromiumPath] CHECK: ${p} \u2192 ${exists ? "FOUND \u2713" : "not found"}`);
      if (exists) {
        console.log("[EB-DEBUG][findChromiumPath] RESULT: " + p);
        return p;
      }
    }
    console.log("[EB-DEBUG][findChromiumPath] RESULT: NOT FOUND \u2014 no browser detected on this machine");
    return "";
  }
  const nixPath = process.env.CHROMIUM_PATH || "/nix/store/zi4f80l169xlmivz8vja8wlphq74qqk0-chromium-125.0.6422.141/bin/chromium";
  console.log("[EB-DEBUG][findChromiumPath] RESULT (Linux/Mac): " + nixPath);
  return nixPath;
}
function rotateLogs(logPath) {
  try {
    for (let i = 3; i >= 1; i--) {
      const older = logPath.replace(/(\.[^.]+)?$/, `.${i}$1`);
      const newer = i === 1 ? logPath : logPath.replace(/(\.[^.]+)?$/, `.${i - 1}$1`);
      if (import_fs2.default.existsSync(newer)) {
        try {
          import_fs2.default.renameSync(newer, older);
        } catch {
        }
      }
    }
  } catch {
  }
}
function startServer(port, logPath, ebIpcPort = 0) {
  rotateLogs(logPath);
  const entry = getServerEntry();
  const dbPath = getDatabasePath();
  const frontendPath = getFrontendPath();
  const chromiumPath = findChromiumPath();
  console.log("[EB-DEBUG][startServer] log file: " + logPath);
  console.log("[EB-DEBUG][startServer] CHROMIUM_PATH being passed to server: " + (chromiumPath || "(empty \u2014 browser not found)"));
  const nodeModulesPath = import_electron2.app.isPackaged ? import_path2.default.join(process.resourcesPath, "app", "node_modules") : "";
  serverProc = (0, import_child_process.spawn)(process.execPath, [entry], {
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      ELECTRON_RUN_AS_NODE: "1",
      PORT: String(port),
      HOST: "127.0.0.1",
      DATABASE_PATH: dbPath,
      FRONTEND_DIST_PATH: frontendPath,
      NODE_ENV: "production",
      LOG_LEVEL: "trace",
      LOG_FILE: logPath,
      // The instagram-private-api library uses the old `request-promise` HTTP library
      // which on Windows does not use the system certificate store.  Setting this
      // environment variable tells Node.js to skip TLS certificate verification so
      // that all outbound HTTPS calls to Instagram's API succeed regardless of the
      // Windows OpenSSL cert dashboard state.  This is safe in the Electron context
      // because all connections go to known Instagram endpoints.
      NODE_TLS_REJECT_UNAUTHORIZED: "0",
      ...nodeModulesPath ? { NODE_PATH: nodeModulesPath } : {},
      ...chromiumPath ? { CHROMIUM_PATH: chromiumPath } : {},
      ...ebIpcPort ? { EB_IPC_PORT: String(ebIpcPort) } : {},
      IDEVICE_BIN_DIR: import_electron2.app.isPackaged ? import_path2.default.join(process.resourcesPath, "bin", "win32") : import_path2.default.join(__dirname, "..", "..", "resources", "bin", "win32"),
      // Packaged installs run from an install directory that is often
      // read-only without admin rights (e.g. Program Files) — process.cwd()
      // there is NOT a safe place to write files. ADB auto-install / the
      // manual-path override both need a real writable folder, so point
      // them at userData like the database, logs, and cookies already do.
      ADB_TOOLS_DIR: import_path2.default.join(getUserDataPath(), "adb-tools"),
      // userData persists across app updates (unlike process.cwd() which
      // points at the install dir and is wiped on update). Pass it explicitly
      // so every route that stores per-device config can write there safely.
      EQUINOX_DATA_DIR: getUserDataPath()
    }
  });
  const logStream = import_fs2.default.createWriteStream(logPath, { flags: "w" });
  const sessionStart = `[${(/* @__PURE__ */ new Date()).toISOString()}] server-start: session started (v${import_electron2.app.getVersion()})
`;
  logStream.write(sessionStart);
  serverProc.stdout?.on("data", (d) => logStream.write(d));
  serverProc.stderr?.on("data", (d) => logStream.write(d));
  serverProc.on("exit", () => logStream.end());
}
function restartApp() {
  import_electron2.app.relaunch();
  isQuitting = true;
  import_electron2.app.quit();
}
var TRAY_MENU_HTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:100%;height:100%;overflow:hidden}
body{
  font-family:'Segoe UI',system-ui,sans-serif;
  font-size:13px;
  background:#ffffff;
  border:1px solid #b0b0b0;
  color:#1a1a1a;
  user-select:none;
  cursor:default;
}
.item{
  padding:7px 18px;
  white-space:nowrap;
}
.item:hover{background:#0078d4;color:#ffffff}
.sep{height:1px;background:#e0e0e0;margin:3px 0}
</style></head>
<body>
<div class="item" onclick="window.trayMenuAPI.openApp()">Open Equinox</div>
<div class="sep"></div>
<div class="item" onclick="window.trayMenuAPI.restartApp()">Restart Equinox</div>
<div class="sep"></div>
<div class="item" onclick="window.trayMenuAPI.closeApp()">Close Equinox</div>
</body></html>`;
var POPUP_W = 220;
var POPUP_H = 3 * 33 + 2 * 7;
var trayPopup = null;
function createTray() {
  const trayIconPath = getTrayIconPath();
  let icon;
  try {
    icon = import_electron2.nativeImage.createFromPath(trayIconPath);
    if (!trayIconPath.endsWith(".ico")) {
      icon = icon.resize({ width: 16, height: 16 });
    }
  } catch {
    icon = import_electron2.nativeImage.createEmpty();
  }
  tray = new import_electron2.Tray(icon);
  tray.setToolTip(`Equinox v${import_electron2.app.getVersion()}`);
  trayPopup = new import_electron2.BrowserWindow({
    width: POPUP_W,
    height: POPUP_H,
    frame: false,
    transparent: false,
    resizable: false,
    movable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    roundedCorners: false,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: import_path2.default.join(__dirname, "trayMenuPreload.js")
    }
  });
  trayPopup.loadURL(
    `data:text/html;charset=utf-8,${encodeURIComponent(TRAY_MENU_HTML)}`
  );
  trayPopup.on("blur", () => trayPopup?.hide());
  import_electron2.ipcMain.on("tray-open", () => {
    trayPopup?.hide();
    if (win?.isMinimized()) win?.restore();
    win?.show();
    win?.focus();
  });
  import_electron2.ipcMain.on("tray-restart", () => {
    trayPopup?.hide();
    restartApp();
  });
  import_electron2.ipcMain.on("tray-close", () => {
    trayPopup?.hide();
    isQuitting = true;
    import_electron2.app.quit();
  });
  tray.on("click", () => {
    trayPopup?.hide();
    if (win?.isMinimized()) {
      win.restore();
      win.focus();
    } else if (win?.isVisible()) {
      win.minimize();
    } else {
      win?.show();
      win?.focus();
    }
  });
  tray.on("right-click", () => {
    if (trayPopup?.isVisible()) {
      trayPopup.hide();
      return;
    }
    const bounds = tray.getBounds();
    const display = import_electron2.screen.getDisplayNearestPoint({ x: bounds.x, y: bounds.y });
    const workArea = display.workArea;
    let x = Math.round(bounds.x + bounds.width / 2 - POPUP_W / 2);
    let y = Math.round(bounds.y - POPUP_H - 4);
    x = Math.max(workArea.x, Math.min(x, workArea.x + workArea.width - POPUP_W));
    y = Math.max(workArea.y, Math.min(y, workArea.y + workArea.height - POPUP_H));
    trayPopup.setPosition(x, y);
    trayPopup.show();
    trayPopup.focus();
  });
}
var _updaterManualCheck = false;
var _updatePendingForInstall = false;
function setupAutoUpdater() {
  import_electron_updater.autoUpdater.autoDownload = true;
  import_electron_updater.autoUpdater.autoInstallOnAppQuit = true;
  import_electron_updater.autoUpdater.setFeedURL({
    provider: "github",
    owner: "dannyshaw88",
    repo: "Equinox",
    token: ""
  });
  import_electron_updater.autoUpdater.on("update-downloaded", () => {
    _updatePendingForInstall = true;
    if (!win) return;
    import_electron2.dialog.showMessageBox(win, {
      type: "info",
      title: "Update Ready",
      message: "Equinox has been updated. Restart now to apply?",
      buttons: ["Restart Now", "Later"],
      defaultId: 0
    }).then(({ response }) => {
      if (response === 0) {
        preserveLegacyDataBeforeUpdate();
        import_electron_updater.autoUpdater.quitAndInstall(false, true);
      }
    });
  });
  import_electron_updater.autoUpdater.on("update-not-available", () => {
    if (!_updaterManualCheck || !win) return;
    _updaterManualCheck = false;
    import_electron2.dialog.showMessageBox(win, {
      type: "info",
      title: "Up to Date",
      message: "You are up to date \u2014 Equinox is running the latest version.",
      buttons: ["OK"]
    });
  });
  import_electron_updater.autoUpdater.on("error", (err) => {
    const raw = String(err?.message || err);
    console.warn("[updater] error:", raw);
    if (!_updaterManualCheck || !win) return;
    _updaterManualCheck = false;
    let message;
    if (/401|bad credentials|unauthorized/i.test(raw)) {
      message = 'The update token has expired. To fix this:\n\n1. Generate a new GitHub personal access token with "repo" scope at github.com/settings/tokens\n2. Set it as the UPDATER_TOKEN secret in your GitHub repository (Settings \u2192 Secrets \u2192 Actions)\n3. Rebuild and install the new version\n\nUpdates will work normally in the new build.';
    } else if (/404|not found|no releases/i.test(raw)) {
      message = "No release has been published yet on GitHub. The update feed will become available after the first successful build publishes a release.";
    } else if (/ENOTFOUND|ECONNREFUSED|network|timeout|socket/i.test(raw)) {
      message = "Could not reach GitHub \u2014 check your internet connection and try again.";
    } else {
      message = raw.split(/\n/)[0].slice(0, 200);
    }
    import_electron2.dialog.showMessageBox(win, {
      type: "error",
      title: "Update Check Failed",
      message,
      buttons: ["OK"]
    });
  });
  setTimeout(() => {
    _updaterManualCheck = false;
    import_electron_updater.autoUpdater.checkForUpdates().catch((err) => {
      console.warn("[updater] background check failed:", err?.message ?? err);
    });
  }, 5e3);
}
var MAX_BACKUPS = 3;
var autoBackupTimer = null;
function getBackupsDir() {
  return import_path2.default.join(getInstallDataPath(), "backups");
}
function formatBackupId(d) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}_${p(d.getHours())}-${p(d.getMinutes())}-${p(d.getSeconds())}`;
}
async function runPsScript(script) {
  const tmp = import_path2.default.join(import_os.default.tmpdir(), `db-bak-${Date.now()}.ps1`);
  import_fs2.default.writeFileSync(tmp, script, "utf8");
  try {
    await execAsync(`powershell.exe -NoProfile -ExecutionPolicy Bypass -File "${tmp}"`);
  } finally {
    try {
      import_fs2.default.unlinkSync(tmp);
    } catch {
    }
  }
}
async function createBackupNow() {
  const backupsDir = getBackupsDir();
  const id = formatBackupId(/* @__PURE__ */ new Date());
  const backupFolder = import_path2.default.join(backupsDir, id);
  const dbSrc = getDatabasePath();
  const dbDst = import_path2.default.join(backupFolder, "backup.db");
  try {
    if (!import_fs2.default.existsSync(dbSrc)) {
      return { ok: false, error: "database.db not found" };
    }
    import_fs2.default.mkdirSync(backupFolder, { recursive: true });
    import_fs2.default.copyFileSync(dbSrc, dbDst);
    for (const ext of ["-wal", "-shm"]) {
      const src = dbSrc + ext;
      if (import_fs2.default.existsSync(src)) {
        try {
          import_fs2.default.copyFileSync(src, dbDst + ext);
        } catch {
        }
      }
    }
    const size = import_fs2.default.statSync(dbDst).size;
    const meta = { date: (/* @__PURE__ */ new Date()).toISOString(), size };
    import_fs2.default.writeFileSync(import_path2.default.join(backupFolder, "meta.json"), JSON.stringify(meta));
    pruneOldBackups(MAX_BACKUPS);
    return { ok: true, entry: { id, date: meta.date, size } };
  } catch (err) {
    try {
      import_fs2.default.rmSync(backupFolder, { recursive: true, force: true });
    } catch {
    }
    return { ok: false, error: String(err?.message ?? err) };
  }
}
function pruneOldBackups(keep) {
  const entries = listBackupsNow();
  for (const e of entries.slice(keep)) {
    try {
      import_fs2.default.rmSync(import_path2.default.join(getBackupsDir(), e.id), { recursive: true, force: true });
    } catch {
    }
  }
}
function listBackupsNow() {
  const dir = getBackupsDir();
  if (!import_fs2.default.existsSync(dir)) return [];
  return import_fs2.default.readdirSync(dir).filter((name) => {
    const d = import_path2.default.join(dir, name);
    if (!import_fs2.default.statSync(d).isDirectory()) return false;
    return import_fs2.default.existsSync(import_path2.default.join(d, "backup.db")) || import_fs2.default.existsSync(import_path2.default.join(d, "backup.zip"));
  }).sort((a, b) => b.localeCompare(a)).map((name) => {
    const metaPath = import_path2.default.join(dir, name, "meta.json");
    let date = name;
    let size = 0;
    try {
      const m = JSON.parse(import_fs2.default.readFileSync(metaPath, "utf8"));
      date = m.date;
      size = m.size;
    } catch {
      const dbFile = import_path2.default.join(dir, name, "backup.db");
      const zipFile = import_path2.default.join(dir, name, "backup.zip");
      try {
        size = import_fs2.default.statSync(import_fs2.default.existsSync(dbFile) ? dbFile : zipFile).size;
      } catch {
      }
    }
    return { id: name, date, size };
  });
}
function getLastBackupDate() {
  const entries = listBackupsNow();
  if (!entries.length) return null;
  try {
    return new Date(entries[0].date);
  } catch {
    return null;
  }
}
async function restoreBackupNow(id) {
  const backupFolder = import_path2.default.join(getBackupsDir(), id);
  const dbBackup = import_path2.default.join(backupFolder, "backup.db");
  const zipBackup = import_path2.default.join(backupFolder, "backup.zip");
  const dataDir = getInstallDataPath();
  const dbDst = getDatabasePath();
  const hasDb = import_fs2.default.existsSync(dbBackup);
  const hasZip = import_fs2.default.existsSync(zipBackup);
  if (!hasDb && !hasZip) return { ok: false, error: "Backup file not found" };
  try {
    if (serverProc) {
      serverProc.kill();
      serverProc = null;
    }
    await new Promise((r) => setTimeout(r, 1200));
    if (hasDb) {
      import_fs2.default.copyFileSync(dbBackup, dbDst);
      for (const ext of ["-wal", "-shm"]) {
        try {
          import_fs2.default.rmSync(dbDst + ext, { force: true });
        } catch {
        }
      }
    } else {
      if (process.platform === "win32") {
        await runPsScript([
          `$zip = '${zipBackup.replace(/'/g, "''")}'`,
          `$dst = '${dataDir.replace(/'/g, "''")}'`,
          `Expand-Archive -Path $zip -DestinationPath $dst -Force`
        ].join("\n"));
      } else {
        await execAsync(`unzip -o '${zipBackup.replace(/'/g, "'\\''")}' -d '${dataDir.replace(/'/g, "'\\''")}'`);
      }
    }
    import_electron2.app.relaunch();
    isQuitting = true;
    import_electron2.app.quit();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err?.message ?? err) };
  }
}
function deleteBackupNow(id) {
  const backupFolder = import_path2.default.join(getBackupsDir(), id);
  if (!import_fs2.default.existsSync(backupFolder)) return { ok: false, error: "Backup not found" };
  try {
    import_fs2.default.rmSync(backupFolder, { recursive: true, force: true });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err?.message ?? err) };
  }
}
function scheduleAutoBackup(enabled, intervalDays) {
  if (autoBackupTimer) {
    clearTimeout(autoBackupTimer);
    autoBackupTimer = null;
  }
  if (!enabled || intervalDays <= 0) return;
  const intervalMs = intervalDays * 24 * 60 * 60 * 1e3;
  const last = getLastBackupDate();
  const msSinceLast = last ? Date.now() - last.getTime() : Infinity;
  const runAndReschedule = () => {
    createBackupNow().finally(() => scheduleAutoBackup(enabled, intervalDays));
  };
  if (msSinceLast >= intervalMs) {
    setTimeout(runAndReschedule, 5e3);
  } else {
    autoBackupTimer = setTimeout(runAndReschedule, intervalMs - msSinceLast);
  }
}
async function initAutoBackup(port) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/settings`);
    const s = await res.json();
    scheduleAutoBackup(s.backupEnabled ?? false, s.backupIntervalDays ?? 7);
  } catch {
  }
}
var uiSettingsPath = () => import_path2.default.join(getUserDataPath(), "ui-settings.json");
function readUiSettings() {
  try {
    const p = uiSettingsPath();
    if (import_fs2.default.existsSync(p)) return JSON.parse(import_fs2.default.readFileSync(p, "utf8"));
  } catch {
  }
  return {};
}
function writeUiSettings(data) {
  try {
    import_fs2.default.writeFileSync(uiSettingsPath(), JSON.stringify(data), "utf8");
  } catch {
  }
}
function setupSettingsHandlers() {
  import_electron2.ipcMain.handle("settings-get", (_e, key) => readUiSettings()[key] ?? null);
  import_electron2.ipcMain.handle("settings-set", (_e, key, value) => {
    const data = readUiSettings();
    data[key] = value;
    writeUiSettings(data);
  });
  import_electron2.ipcMain.handle("settings-get-all", () => readUiSettings());
}
function setupBackupHandlers() {
  import_electron2.ipcMain.handle("backup-create", async () => createBackupNow());
  import_electron2.ipcMain.handle("backup-list", () => listBackupsNow());
  import_electron2.ipcMain.handle("backup-restore", async (_e, id) => restoreBackupNow(id));
  import_electron2.ipcMain.handle("backup-delete", (_e, id) => deleteBackupNow(id));
  import_electron2.ipcMain.handle("backup-open-dir", async () => {
    const dir = getBackupsDir();
    import_fs2.default.mkdirSync(dir, { recursive: true });
    const { shell: shell3 } = await import("electron");
    await shell3.openPath(dir);
  });
  import_electron2.ipcMain.on("backup-schedule-update", (_e, { enabled, intervalDays }) => {
    scheduleAutoBackup(enabled, intervalDays);
  });
  const pendingEbOpens = /* @__PURE__ */ new Set();
  import_electron2.ipcMain.handle("open-browser-window", async (_event, { profileId, username }) => {
    if (!profileId) return { blocked: false };
    if (pendingEbOpens.has(profileId)) return { blocked: false };
    pendingEbOpens.add(profileId);
    void (async () => {
      try {
        let proxy;
        let userAgent;
        let apiUA;
        let ebFingerprint;
        let useHomeIp = false;
        try {
          const r = await fetch(`http://127.0.0.1:${serverPort}/api/profiles/${profileId}/eb-proxy`);
          if (r.ok) {
            const data = await r.json();
            proxy = data.proxy || void 0;
            userAgent = data.userAgent || void 0;
            apiUA = data.apiUA || void 0;
            useHomeIp = !!data.useHomeIp;
            ebFingerprint = data.ebFingerprint ? typeof data.ebFingerprint === "string" ? JSON.parse(data.ebFingerprint) : data.ebFingerprint : void 0;
            if (proxy) {
              console.log(`[EB] Profile ${profileId}: proxy resolved \u2192 ${proxy.host}:${proxy.port}`);
            } else if (useHomeIp) {
              console.log(`[EB] Profile ${profileId}: useHomeIp=true \u2014 running DIRECT (home broadband)`);
            }
            if (!userAgent) {
              console.warn(`[EB] Profile ${profileId}: userAgentEmbedded is missing \u2014 EB will open with Electron default UA. Instagram may challenge the session.`);
            }
          } else {
            console.warn(`[EB] Profile ${profileId}: /eb-proxy fetch returned ${r.status} \u2014 EB will open with no UA override. Instagram may challenge the session.`);
          }
        } catch (fetchErr) {
          console.warn(`[EB] Profile ${profileId}: /eb-proxy fetch failed (${fetchErr?.message}) \u2014 EB will open with no UA override. Instagram may challenge the session.`);
        }
        await openEbWindow({
          profileId,
          username: username || String(profileId),
          proxy,
          useHomeIp,
          userAgent,
          apiUA,
          ebFingerprint
        });
      } catch (err) {
        console.error(`[EB] open-browser-window error for profile ${profileId}:`, err?.message);
      } finally {
        pendingEbOpens.delete(profileId);
      }
    })();
    return { blocked: false };
  });
  import_electron2.ipcMain.handle("clear-signup-browser-cache", async () => {
    try {
      const pid = -1;
      const existing = ebMap.get(pid);
      if (existing && !existing.win.isDestroyed()) {
        existing.win.destroy();
        await new Promise((r) => setTimeout(r, 200));
        ebMap.delete(pid);
      }
      const ses = import_electron3.session.fromPartition(`persist:eb-${pid}`);
      await ses.clearStorageData({
        storages: ["cookies", "localstorage", "cachestorage", "shadercache", "websql", "serviceworkers", "indexdb"]
      }).catch(() => {
      });
      await ses.clearCache().catch(() => {
      });
      const fp = cookieFilePath(pid);
      try {
        if (import_fs2.default.existsSync(fp)) import_fs2.default.unlinkSync(fp);
      } catch {
      }
      console.log("[EB] Signup browser cache cleared.");
    } catch (err) {
      console.error("[EB] clear-signup-browser-cache error:", err?.message);
    }
  });
  import_electron2.ipcMain.handle("open-signup-browser-window", async (_event, { username, userAgent, proxyHost, proxyPort, proxyUsername, proxyPassword, proxyType }) => {
    try {
      const proxy = proxyHost && proxyPort ? {
        host: proxyHost,
        port: Number(proxyPort),
        user: proxyUsername || void 0,
        pass: proxyPassword || void 0,
        type: proxyType || void 0
      } : void 0;
      await openEbWindow({
        profileId: -1,
        username: username || "Signup",
        proxy,
        userAgent
      });
    } catch (err) {
      console.error("[EB] open-signup-browser-window error:", err?.message);
    }
  });
  import_electron2.ipcMain.handle("focus-browser-window", (_event, profileId) => {
    focusEbWindow(profileId);
  });
}
async function createWindow() {
  win = new import_electron2.BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 960,
    minHeight: 600,
    title: `Equinox v${import_electron2.app.getVersion()}`,
    icon: getIconPath(),
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: import_path2.default.join(__dirname, "preload.js"),
      devTools: !import_electron2.app.isPackaged
    }
  });
  win.on("close", (event) => {
    if (!isQuitting) {
      event.preventDefault();
      win?.hide();
    }
  });
  const logPath = import_path2.default.join(import_path2.default.dirname(import_electron2.app.getPath("exe")), "logs.log");
  _mainLogPath = logPath;
  _serverDebugLogPath = import_path2.default.join(getInstallDataPath(), "equinox-debug.log");
  setEbLogPath(logPath);
  appendToMainLog(`app ready \u2014 v${import_electron2.app.getVersion()} pid=${process.pid}`);
  import_electron2.app.on("render-process-gone", (_e, contents, details) => {
    appendToMainLog(`RENDER PROCESS GONE: url=${contents.getURL()} reason=${details.reason} exitCode=${details.exitCode}`);
  });
  import_electron2.app.on("child-process-gone", (_e, details) => {
    appendToMainLog(`CHILD PROCESS GONE: type=${details.type} reason=${details.reason} exitCode=${details.exitCode}`);
  });
  serverPort = await getServerPort();
  const cookiesDir = import_path2.default.join(getInstallDataPath(), "browser-data");
  let ebIpcPort = 0;
  try {
    ebIpcPort = await startEbIpcServer(serverPort, cookiesDir, getIconPath());
    console.log(`[EB] Native IPC server started on port ${ebIpcPort}`);
  } catch (err) {
    console.error("[EB] Failed to start IPC server:", err);
  }
  startServer(serverPort, logPath, ebIpcPort);
  try {
    await waitForServer(serverPort);
    win.loadURL(`http://127.0.0.1:${serverPort}`);
  } catch {
    let logContent = "(no output captured)";
    try {
      logContent = import_fs2.default.readFileSync(logPath, "utf8").slice(-1200);
    } catch {
    }
    const escaped = logContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    win.loadURL(
      `data:text/html,<html><body style="font-family:monospace;padding:20px;background:%231a1a2e;color:%23fff"><h2 style="color:%23ff6b6b">Server failed to start</h2><p style="color:%23aaa;font-size:12px">Log: ${logPath}</p><pre style="background:%23111;padding:12px;border-radius:6px;font-size:11px;overflow:auto;white-space:pre-wrap">${escaped}</pre></body></html>`
    );
  }
  win.webContents.on("did-finish-load", () => {
    win?.webContents.executeJavaScript(
      `document.title = "Equinox v${import_electron2.app.getVersion()}";`
    ).catch(() => {
    });
  });
  win.once("ready-to-show", () => {
    closeSplash();
    win?.show();
    win?.maximize();
  });
  win.on("closed", () => {
    win = null;
  });
  win.webContents.on("context-menu", (_event, params) => {
    const menu = import_electron2.Menu.buildFromTemplate([
      { role: "cut", enabled: params.editFlags.canCut },
      { role: "copy", enabled: params.editFlags.canCopy },
      { role: "paste", enabled: params.editFlags.canPaste },
      { type: "separator" },
      { role: "selectAll", enabled: params.editFlags.canSelectAll }
    ]);
    menu.popup({ window: win });
  });
  createTray();
  setupSettingsHandlers();
  setupBackupHandlers();
  initAutoBackup(serverPort).catch(() => {
  });
  if (import_electron2.app.isPackaged) {
    try {
      setupAutoUpdater();
    } catch (e) {
      appendToMainLog(`[auto-updater] setup failed (non-fatal): ${e?.message ?? String(e)}`);
    }
  }
  import_electron2.ipcMain.handle("open-log", async () => {
    const { shell: shell3 } = await import("electron");
    const logFile = import_path2.default.join(import_path2.default.dirname(import_electron2.app.getPath("exe")), "logs.log");
    const err = await shell3.openPath(logFile);
    if (err) {
      await shell3.openPath(import_path2.default.join(import_electron2.app.getPath("userData"), "logs.log"));
    }
  });
  import_electron2.ipcMain.handle("open-csv-temp", async (_e, { content, filename }) => {
    appendToMainLog(`[export-api-calls] open-csv-temp IPC received \u2014 filename=${filename} contentLength=${content?.length ?? 0}`);
    try {
      const os2 = await import("os");
      const tmpPath = import_path2.default.join(os2.tmpdir(), filename);
      import_fs2.default.writeFileSync(tmpPath, content, "utf8");
      appendToMainLog(`[export-api-calls] CSV written to temp \u2014 ${tmpPath}`);
      const { shell: shell3 } = await import("electron");
      const err = await shell3.openPath(tmpPath);
      if (err) appendToMainLog(`[export-api-calls] shell.openPath error: ${err}`);
      return { opened: true, filePath: tmpPath };
    } catch (e) {
      appendToMainLog(`[export-api-calls] open-csv-temp THREW: ${e?.stack ?? e?.message ?? String(e)}`);
      throw e;
    }
  });
  import_electron2.ipcMain.handle("write-eqx-downloads", async (_e, files) => {
    const downloadsDir = import_electron2.app.getPath("downloads");
    appendToMainLog(`[export-eqx] write-eqx-downloads IPC received \u2014 fileCount=${files?.length ?? 0} downloadsDir=${downloadsDir}`);
    try {
      for (const { filename, data } of files) {
        const destPath = import_path2.default.join(downloadsDir, filename);
        const buffer = Buffer.from(data, "base64");
        import_fs2.default.writeFileSync(destPath, buffer);
        appendToMainLog(`[export-eqx] wrote ${filename} (${buffer.length} bytes) \u2192 ${destPath}`);
      }
      appendToMainLog(`[export-eqx] write-eqx-downloads complete \u2014 ${files.length} file(s) written to ${downloadsDir}`);
      return { count: files.length, folder: downloadsDir };
    } catch (e) {
      appendToMainLog(`[export-eqx] write-eqx-downloads THREW: ${e?.stack ?? e?.message ?? String(e)}`);
      throw e;
    }
  });
  import_electron2.ipcMain.handle("save-csv-dialog", async (_e, { content, filename }) => {
    appendToMainLog(`[export-api-calls] save-csv-dialog IPC received \u2014 filename=${filename} contentLength=${content?.length ?? 0}`);
    try {
      const fsSync = await import("fs");
      const defaultPath = import_path2.default.join(import_electron2.app.getPath("downloads"), filename);
      appendToMainLog(`[export-api-calls] showing save dialog \u2014 defaultPath=${defaultPath}`);
      const result = await import_electron2.dialog.showSaveDialog(win, {
        title: "Save CSV",
        defaultPath,
        filters: [
          { name: "CSV Files", extensions: ["csv"] },
          { name: "All Files", extensions: ["*"] }
        ]
      });
      appendToMainLog(`[export-api-calls] save dialog result \u2014 canceled=${result.canceled} filePath=${result.filePath ?? "none"}`);
      if (result.canceled || !result.filePath) return { saved: false };
      fsSync.writeFileSync(result.filePath, content, "utf8");
      appendToMainLog(`[export-api-calls] CSV written to disk \u2014 path=${result.filePath}`);
      return { saved: true, filePath: result.filePath };
    } catch (err) {
      appendToMainLog(`[export-api-calls] save-csv-dialog THREW: ${err?.stack ?? err?.message ?? String(err)}`);
      throw err;
    }
  });
  import_electron2.ipcMain.handle("open-folder-dialog", async () => {
    try {
      const result = await import_electron2.dialog.showOpenDialog({
        title: "Select media folder",
        properties: ["openDirectory"]
      });
      if (result.canceled || !result.filePaths.length) return { canceled: true };
      return { canceled: false, folder: result.filePaths[0] };
    } catch (err) {
      throw err;
    }
  });
  import_electron2.ipcMain.handle("count-folder-files", async (_e, folderPath) => {
    try {
      const { readdir } = await import("node:fs/promises");
      const MEDIA_EXTS = /* @__PURE__ */ new Set([
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".gif",
        ".heic",
        ".heif",
        ".avif",
        ".bmp",
        ".mp4",
        ".mov",
        ".avi",
        ".mkv",
        ".webm",
        ".m4v",
        ".3gp",
        ".wmv",
        ".flv",
        ".ts",
        ".mts",
        ".mpeg",
        ".mpg",
        ".f4v",
        ".ogv"
      ]);
      const entries = await readdir(folderPath, { withFileTypes: true });
      const count = entries.filter((e) => e.isFile() && MEDIA_EXTS.has(e.name.slice(e.name.lastIndexOf(".")).toLowerCase())).length;
      return { count };
    } catch {
      return { count: 0 };
    }
  });
  import_electron2.ipcMain.handle("pick-eqx-folder", async () => {
    appendToMainLog(`[export-eqx] pick-eqx-folder IPC received`);
    try {
      const result = await import_electron2.dialog.showOpenDialog({
        title: "Choose folder to save EQX files",
        properties: ["openDirectory", "createDirectory"]
      });
      appendToMainLog(`[export-eqx] pick-eqx-folder dialog result \u2014 canceled=${result.canceled} folder=${result.filePaths[0] ?? "none"}`);
      if (result.canceled || !result.filePaths.length) return { canceled: true };
      return { canceled: false, folder: result.filePaths[0] };
    } catch (err) {
      appendToMainLog(`[export-eqx] pick-eqx-folder THREW: ${err?.stack ?? err?.message ?? String(err)}`);
      throw err;
    }
  });
  import_electron2.ipcMain.handle("write-eqx-files", async (_e, { folder, files }) => {
    appendToMainLog(`[export-eqx] write-eqx-files IPC received \u2014 folder=${folder} fileCount=${files?.length ?? 0}`);
    try {
      for (const { filename, data } of files) {
        const destPath = import_path2.default.join(folder, filename);
        const buffer = Buffer.from(data, "base64");
        import_fs2.default.writeFileSync(destPath, buffer);
        appendToMainLog(`[export-eqx] wrote ${filename} (${buffer.length} bytes) \u2192 ${destPath}`);
      }
      appendToMainLog(`[export-eqx] write-eqx-files complete \u2014 ${files.length} file(s) written`);
      return { count: files.length };
    } catch (err) {
      appendToMainLog(`[export-eqx] write-eqx-files THREW: ${err?.stack ?? err?.message ?? String(err)}`);
      throw err;
    }
  });
  import_electron2.ipcMain.handle("export-eqx-folder", async (_e, files) => {
    const result = await import_electron2.dialog.showOpenDialog(win, {
      title: "Choose folder to save EQX files",
      properties: ["openDirectory", "createDirectory"]
    });
    if (result.canceled || !result.filePaths.length) return { canceled: true };
    const folder = result.filePaths[0];
    for (const { filename, data } of files) {
      const buffer = Buffer.from(data, "base64");
      import_fs2.default.writeFileSync(import_path2.default.join(folder, filename), buffer);
    }
    return { canceled: false, folder, count: files.length };
  });
  import_electron2.ipcMain.handle("get-autostart", () => {
    return import_electron2.app.getLoginItemSettings().openAtLogin;
  });
  import_electron2.ipcMain.handle("set-autostart", (_e, enable) => {
    import_electron2.app.setLoginItemSettings({ openAtLogin: enable });
    return import_electron2.app.getLoginItemSettings().openAtLogin;
  });
  import_electron2.ipcMain.handle("check-for-updates", async () => {
    if (!import_electron2.app.isPackaged) {
      import_electron2.dialog.showMessageBox(win, {
        type: "info",
        title: "Dev Mode",
        message: "Update checks only run in the packaged app.",
        buttons: ["OK"]
      });
      return;
    }
    try {
      _updaterManualCheck = true;
      await import_electron_updater.autoUpdater.checkForUpdates();
    } catch (err) {
      if (!_updaterManualCheck) return;
      _updaterManualCheck = false;
      const raw = String(err?.message || err);
      let message;
      if (/401|bad credentials|unauthorized/i.test(raw)) {
        message = 'The update token has expired. To fix this:\n\n1. Generate a new GitHub personal access token with "repo" scope at github.com/settings/tokens\n2. Set it as the UPDATER_TOKEN secret in your GitHub repository (Settings \u2192 Secrets \u2192 Actions)\n3. Rebuild and install the new version\n\nUpdates will work normally in the new build.';
      } else if (/404|not found|no releases/i.test(raw)) {
        message = "No release has been published yet on GitHub. The update feed will become available after the first successful build publishes a release.";
      } else if (/ENOTFOUND|ECONNREFUSED|network|timeout|socket/i.test(raw)) {
        message = "Could not reach GitHub \u2014 check your internet connection and try again.";
      } else {
        message = raw.split(/\n/)[0].slice(0, 300);
      }
      import_electron2.dialog.showMessageBox(win, {
        type: "error",
        title: "Update Check Failed",
        message,
        buttons: ["OK"]
      });
    }
  });
}
import_electron2.app.setName("Equinox");
import_electron2.app.setPath("userData", import_path2.default.join(import_electron2.app.getPath("appData"), "Equinox"));
if (process.platform === "win32") {
  import_electron2.app.setAppUserModelId("Equinox");
}
var gotTheLock = import_electron2.app.requestSingleInstanceLock();
if (!gotTheLock) {
  import_electron2.app.quit();
  process.exit(0);
}
import_electron2.app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});
import_electron2.app.commandLine.appendSwitch("disable-ipv6");
import_electron2.app.commandLine.appendSwitch("force-webrtc-ip-handling-policy", "disable_non_proxied_udp");
import_electron2.app.commandLine.appendSwitch("enforce-webrtc-ip-permission-check");
import_electron2.app.commandLine.appendSwitch("dns-prefetch-disable");
import_electron2.app.commandLine.appendSwitch("no-proxy-fallback");
import_electron2.app.commandLine.appendSwitch("disable-quic");
import_electron2.app.commandLine.appendSwitch("disable-features", "HappyEyeballsV3,IPv6Reachability,CalculateNativeWinOcclusion");
import_electron2.app.commandLine.appendSwitch("disable-renderer-backgrounding");
import_electron2.app.commandLine.appendSwitch("disable-blink-features", "AutomationControlled");
import_electron2.app.commandLine.appendSwitch("proxy-bypass-list", "127.0.0.1;[::1];localhost");
import_electron2.app.whenReady().then(() => {
  createSplash("Starting\u2026");
  createWindow();
});
import_electron2.app.on("before-quit", (event) => {
  isQuitting = true;
  const preserveUpdateState = _updatePendingForInstall;
  trayPopup?.destroy();
  trayPopup = null;
  tray?.destroy();
  tray = null;
  if (!serverProc) {
    if (preserveUpdateState) preserveLegacyDataBeforeUpdate();
    return;
  }
  event.preventDefault();
  win?.hide();
  createSplash("Closing\u2026");
  const proc = serverProc;
  serverProc = null;
  proc.kill("SIGTERM");
  setTimeout(() => {
    try {
      proc.kill("SIGKILL");
    } catch {
    }
    try {
      import_electron2.BrowserWindow.getAllWindows().forEach((w) => {
        try {
          w.destroy();
        } catch {
        }
      });
    } catch {
    }
    if (preserveUpdateState) preserveLegacyDataBeforeUpdate();
    process.exit(0);
  }, 2500);
});
import_electron2.app.on("window-all-closed", () => {
});
import_electron2.app.on("activate", () => {
  if (win === null) {
    createWindow();
  } else {
    if (win.isMinimized()) win.restore();
    win.show();
    win.focus();
  }
});

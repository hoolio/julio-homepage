// Choplogic analytics beacon.
//
// Fire-and-forget POST to our own analytics server.  Reads the endpoint
// from <meta name="chop-analytics" content="https://api.chopradio.com">.
// Without that meta tag the script silently no-ops, so it's safe to
// load in advance of the API being live.
//
// Honours Do-Not-Track and respects opt-out via localStorage flag
// 'chop_analytics_optout'.  No cookies are set on visitors.

(function () {
  'use strict';

  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;
  try { if (localStorage.getItem('chop_analytics_optout') === '1') return; } catch (e) { /* ignore */ }

  var meta = document.querySelector('meta[name="chop-analytics"]');
  var endpoint = meta && meta.content ? meta.content.replace(/\/$/, '') : '';
  if (!endpoint) return;

  function device() {
    if (matchMedia('(max-width: 700px)').matches) return 'mobile';
    if (matchMedia('(max-width: 1024px)').matches) return 'tablet';
    return 'desktop';
  }

  function refHost() {
    if (!document.referrer) return '';
    try {
      var h = new URL(document.referrer).hostname;
      // Don't count self-referrals
      if (h === location.hostname) return '';
      return h;
    } catch (e) { return ''; }
  }

  function send(name, data) {
    var body = JSON.stringify({
      path: location.pathname + location.search,
      ref: refHost(),
      device: device(),
      name: name || 'pageview',
      data: data || null,
    });
    // Prefer sendBeacon when available (survives unload, no CORS preflight).
    // Falls back to fetch with keepalive.
    try {
      if (navigator.sendBeacon) {
        var blob = new Blob([body], { type: 'application/json' });
        if (navigator.sendBeacon(endpoint + '/track', blob)) return;
      }
    } catch (e) { /* fall through */ }
    try {
      fetch(endpoint + '/track', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: body,
        credentials: 'omit',
        keepalive: true,
        mode: 'cors',
      }).catch(function () {});
    } catch (e) { /* swallow */ }
  }

  // Initial pageview, fired once the document is at least interactive
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { send(); }, { once: true });
  } else {
    send();
  }

  // Public API for custom events from anywhere on the page:
  //   window.Chop.track('cv_expanded')
  //   window.Chop.track('modal_opened', { piece: 'medium-is-the-problem' })
  window.Chop = window.Chop || {};
  window.Chop.track = function (name, data) {
    if (!name || typeof name !== 'string') return;
    send(name, data);
  };
})();

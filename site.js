/* ===== SITE CONFIGURATION ===== */
var SITE_CONFIG = {
  calendlyUrl: 'https://calendly.com/mbodjifatou',
  formspreeId: 'mdeagrer'
};

(function () {
  var book = document.getElementById('book-call');
  if (SITE_CONFIG.calendlyUrl.indexOf('YOUR-') === -1) {
    book.href = SITE_CONFIG.calendlyUrl;
    book.hidden = false;
  }
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (SITE_CONFIG.formspreeId.indexOf('YOUR_') === -1) {
    form.action = 'https://formspree.io/f/' + SITE_CONFIG.formspreeId;
    form.hidden = false;
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      status.className = 'form-status';
      status.textContent = 'Sending…';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
        .then(function (r) {
          if (r.ok) { form.reset(); status.textContent = 'Thank you, your message has been sent.'; }
          else { throw new Error('failed'); }
        })
        .catch(function () {
          status.className = 'form-status error';
          status.textContent = 'Something went wrong. Please write directly to the email address below.';
        });
    });
  }
})();

(function () {
  var btn = document.querySelector('.nav-toggle');
  var list = document.getElementById('nav-links');
  var links = list.querySelectorAll('a');
  btn.addEventListener('click', function () {
    var open = list.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  links.forEach(function (a) { a.addEventListener('click', function () { list.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    links.forEach(function (a) { var t = document.querySelector(a.getAttribute('href')); if (t) io.observe(t); });
  }
})();

/* Dépliage des détails (remplace les onclick inline ; aria-expanded tenu à jour) */
document.querySelectorAll('[data-toggle]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    var willOpen = panel.hidden;
    panel.hidden = !willOpen;
    btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    btn.textContent = willOpen ? btn.getAttribute('data-less') : btn.getAttribute('data-more');
  });
});

// Язык страницы: ?lang=ru в адресе, затем выбор с прошлого визита, затем язык браузера
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var query = (location.search.match(/[?&]lang=(ru|en)/) || [])[1];
  var browser = (navigator.language || 'en').slice(0, 2);
  var lang = query || saved || (browser === 'ru' || browser === 'kk' ? 'ru' : 'en');

  function apply(value) {
    root.lang = value;
    document.querySelectorAll('.langs button').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.lang === value));
    });
    var title = document.querySelector('meta[name="title-' + value + '"]');
    if (title) document.title = title.content;
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(lang);
    document.querySelectorAll('.langs button').forEach(function (button) {
      button.addEventListener('click', function () {
        apply(button.dataset.lang);
        try { localStorage.setItem('lang', button.dataset.lang); } catch (e) {}
      });
    });
  });
  root.lang = lang;
})();

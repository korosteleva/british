document.addEventListener("DOMContentLoaded", function () {
  var languageSelector = document.querySelector('.language-switcher-locale-url'),
    isRuAvailable = languageSelector.querySelector('li.ru a'),
    isEngAvailable = languageSelector.querySelector('li.eng a'),
    activeLanguage;

  console.log('isRuAvailable', isRuAvailable);
  console.log('isEngAvailable', isEngAvailable);

  if (!isRuAvailable) {
    //window.location.href = '/eng';
  } else if (!isEngAvailable) {
    //window.location.href = '/ru';
  } else {
    activeLanguage = languageSelector.querySelector('li.active a').getAttribute('xml:lang');
    console.log('activeLanguage', activeLanguage);
    document.querySelector('.lang-block').querySelector('a[data-lang="'+activeLanguage+'"]').addClass('active');
  }
});
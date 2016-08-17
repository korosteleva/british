(function ($) {

  $(document).ready(function () {
    var languageSelector = $('.language-switcher-locale-url'),
        isRuAvailable = languageSelector.find('li.ru a'),
        isEngAvailable = languageSelector.find('li.en a'),
        activeLanguageHolder, activeLanguage;

    activeLanguageHolder = languageSelector.find('li.active a');
    if (!activeLanguageHolder) {
      console.log('can not detect lang - redirect to /ru');
      window.location.href = '/ru';
    }

    activeLanguage = activeLanguageHolder.attr('xml:lang');

    if (activeLanguage === 'ru' && !isRuAvailable) {
      console.log('active lang ru, but not available - redirect to /ru');
      window.location.href = '/ru';
    }
    if (activeLanguage === 'en' && !isEngAvailable) {
      console.log('active lang en, but not available - redirect to /eng');
      window.location.href = '/eng';
    }

    console.log('active lang', activeLanguage);
    if (activeLanguage) {
      $('.js-lang-block').find('a[data-lang='+activeLanguage+']').addClass('active');
    }

  });


}(jQuery));
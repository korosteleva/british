(function ($) {

  $(document).ready(function () {
    var languageSelector = $('.language-switcher-locale-url'),
        isRuAvailable = languageSelector.find('li.ru a'),
        isEngAvailable = languageSelector.find('li.en a'),
        activeLanguageHolder, activeLanguage,

        linkRu, linkEng,
        customLangBlock = $('.js-lang-block');

    activeLanguageHolder = languageSelector.find('li.active a');
    if (!activeLanguageHolder) {
      window.location.href = '/ru';
    }

    activeLanguage = activeLanguageHolder.attr('xml:lang');

    if (activeLanguage === 'ru' && !isRuAvailable) {
      window.location.href = '/ru';
    }
    if (activeLanguage === 'en' && !isEngAvailable) {
      window.location.href = '/eng';
    }

    linkRu = isRuAvailable ? isRuAvailable.attr('href') : '/ru';
    linkEng = isEngAvailable ? isEngAvailable.attr('href') : '/eng';

    customLangBlock.find('a[data-lang="ru"]').attr('href', linkRu);
    customLangBlock.find('a[data-lang="en"]').attr('href', linkEng);

    customLangBlock.find('a[data-lang='+activeLanguage+']').addClass('active');

  });


}(jQuery));
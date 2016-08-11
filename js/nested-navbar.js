
$(function () {

	var eventName = 'click.customNavbar',
		$navbarLinks = $('#navbar-british-wrapper > .menu > li.expanded > a'),

		OPEN_CLASS = 'open',

		$topHeader = $('.navbar-british'),
		$toggleMenuBtn = $topHeader.find('.navbar-toggle[data-target="#navbar-british-collapse"]');

	function isSmallViewport () {
		return $('.js-custom-navbar').is(':visible');
	}

	function addMenuHandler() {

		removeMenuHandler();

		$navbarLinks.on(eventName, function (evt) {
			evt.preventDefault();

			$(this).closest('li').toggleClass(OPEN_CLASS);
		});
	}

	function removeMenuHandler() {
		$navbarLinks.off(eventName);
	}

	function manageMenuHandler() {
		if (isSmallViewport()) {
			addMenuHandler();

		} else {
			removeMenuHandler();
		}
	}

	manageMenuHandler();
	$(window).on('resize.customNavbar', function() {
		manageMenuHandler();
	});


	$toggleMenuBtn.on('click.customNavbar', function () {
		$topHeader.toggleClass('collapse-in');
	})

}());







(function (module) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		define([
			'jquery',
			'text!../shared/base/tabs/tab_dropdown.html'
		], module);
	} else {
		module(jQuery).init();
	}
})(function ($, undefined) {

	'use strict';

	return {

		options: {
			container: '.droptabs', // ul selector
			$container: null,

			dropdownHolder: 'li.dropdown',
			$dropdownHolder: null,

			dropdownSelector: 'ul',
			$dropdownSelector: null,

			dropdownTabsSelector: 'li',

			visibleTabsSelector: '>li:not(.dropdown)',

			openedDropdownClassname: '_opened',
			activeDropdownClassname: '_active'
		},


		init: function () {

			this.defineSelectors();

			this.manageTabs();

			// Manage tabs on window resize
			window.addEventListener('resize', (function () {
				this.manageTabs();
			}).bind(this));

			// Window click - close dropdown
			window.addEventListener('click', (function () {
				this.options.$dropdownHolder.removeClass(this.options.openedDropdownClassname);
			}).bind(this));

			// Dropdown inner links click - go to the page
			this.options.$dropdownHolder.on('click', 'li', function (evt) {
				evt.stopPropagation();
			});

			// Dropdown click - toggle visibility of dropdown
			this.options.$dropdownHolder.on('click', (function (evt) {
				evt.preventDefault();
				evt.stopPropagation();
				this.options.$dropdownHolder.toggleClass(this.options.openedDropdownClassname);
			}).bind(this));

		},

		/**
		 * Define necessary selectors
		 */
		defineSelectors: function () {

			this.options.$container = $(this.options.container);

			this.addDropdown();

			this.options.$dropdownHolder = this.options.$container.find(this.options.dropdownHolder);
			this.options.$dropdownSelector = this.options.$dropdownHolder.find(this.options.dropdownSelector);

		},

		/**
		 * Show or hide tabs depends of available space
		 */
		manageTabs: function () {

			if (this.getAvailableSpace() < 0) {
				this.hideSomeTabs();
			} else {
				this.showSomeTabs();
			}

			this.toggleDropdownVisibility();

			this.manageActiveTab();
		},

		/**
		 * Hides tabs depends of available space
		 */
		hideSomeTabs: function () {
			var availableSpace = this.getAvailableSpace(),
				visibleTabs = this.getVisibleTabs().get().reverse(); // start hide from 10 to 1

			$(visibleTabs).each((function (key, element) {
				if (availableSpace < 0) {
					availableSpace += $(element).outerWidth();
					$(element).prependTo(this.options.$dropdownSelector);
				}
			}).bind(this));
		},

		/**
		 * Shows tabs depends of available space
		 */
		showSomeTabs: function () {
			var availableSpace = this.getAvailableSpace(),
				dropdownTabs = this.getDropdownTabs();

			if (availableSpace > this.getHiddenElementWidth(dropdownTabs.first())) {
				$(dropdownTabs).each((function (key, element) {
					if (availableSpace > this.getHiddenElementWidth($(element))) {
						$(element).insertBefore(this.options.$dropdownHolder);
						availableSpace -= $(element).outerWidth();
					} else {
						return false;
					}
				}).bind(this));
			}
		},

		/**
		 * If dropdown is empty - hide it
		 * Else if dropdown has tabs - show it
		 */
		toggleDropdownVisibility: function () {
			if (this.getDropdownTabs().length <= 0) {
				this.options.$dropdownHolder.hide();
			} else {
				this.options.$dropdownHolder.show();
			}
		},

		manageActiveTab: function () {
			var dropdownTabs= this.getDropdownTabs(),
				hasActiveElement = false;

			$(dropdownTabs).each((function (key, element ) {
				if ($(element).hasClass(this.options.activeDropdownClassname)) {
					hasActiveElement = true;
				}
			}).bind(this));

			if (hasActiveElement) {
				this.options.$dropdownHolder.addClass(this.options.activeDropdownClassname);
			} else {
				this.options.$dropdownHolder.removeClass(this.options.activeDropdownClassname);
			}

		},

		/**
		 * @param $elementTab
		 * @returns {*|jQuery}
		 */
		getHiddenElementWidth: function ($elementTab) {
			var clonedElementTab = $elementTab.clone(),
				tempElementTabWidth;

			// clone target $elementTab to container to define element width
			clonedElementTab.appendTo(this.options.$container).css('position', 'fixed');
			tempElementTabWidth = $(clonedElementTab).outerWidth();

			// remove temp cloned element
			$(clonedElementTab).remove();

			return tempElementTabWidth;
		},

		/**
		 * Append dropdown element to container
		 */
		addDropdown: function () {
			//todo use template in amd-notation

			this.options.$container.append('<li class="dropdown">'+
				'<a href=""></a>'+
				'<ul></ul>'+
				'</li>');

		},

		/**
		 * Define free space for tabs
		 * @returns {number}
		 */
		getAvailableSpace: function () {
			return this.options.$container.outerWidth() - this.getVisibleTabsWidth();
		},

		/**
		 * Define visible tabs sum width
		 * @returns {number}
		 */
		getVisibleTabsWidth: function () {
			var visibleTabsWidth = 0,
				$visibleTabs = this.getVisibleTabs();

			$($visibleTabs).each(function () {
				visibleTabsWidth += parseInt($(this).outerWidth(), 10);
			});

			visibleTabsWidth = visibleTabsWidth + parseInt(this.options.$dropdownHolder.outerWidth(), 10);
			return visibleTabsWidth;
		},

		getVisibleTabs: function () {
			return this.options.$container.find(this.options.visibleTabsSelector);
		},

		getDropdownTabs: function () {
			return this.options.$dropdownSelector.find(this.options.dropdownTabsSelector);
		}
	};

});
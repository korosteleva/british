(function($) {

	$.fn.smartDropdown = function(o) {

		var SMART_DROPDOWN_CLASS = 'smart-dropdown',
			dropdownHtml =
				'<li class="expanded expanded-to-left smart-dropdown">' +

					'<a href="javascript:void(0)">' +
						'<button class="navbar-toggle">'+
							'<span class="icon-bar"></span>'+
							'<span class="icon-bar"></span>'+
							'<span class="icon-bar"></span>'+
						'</button>'+
						'Еще' +
					'</a>' +
					'<ul class="menu"></ul>' +
			'</li>',

			listContainer,
			$dropdownSelector, $dropdownSelectorMenu;

		listContainer = $(this);


		function initSmartDropdown() {

			_addSmartDropdown();

			_manageTabs();

			window.addEventListener('resize', function () {
				_manageTabs();
			});
		}

		function _manageTabs() {

			if (_isSmallViewport()) {
				_hideSmartTab();
				_showAllTabs();

			} else {

				if ( _getAvailableSpace() > 0) {
					_showSomeTabs();
				} else {
					_hideSomeTabs();
				}

				_checkSmartTabVisibility();
			}

		}


		function _hideSomeTabs() {

			var availableSpace = _getAvailableSpace(),
				visibleTabs = _getVisibleTabs().get().reverse(); // start hide from 10 to 1

			$(visibleTabs).each(function (key, element) {
				if (availableSpace < 0) {
					availableSpace += $(element).outerWidth();

					$(element).prependTo($dropdownSelectorMenu);
				}
			});
		}

		function _showSomeTabs() {
			var availableSpace = _getAvailableSpace(),
				dropdownTabs = _getDropdownTabs();

			if (availableSpace > _getHiddenElementWidth(dropdownTabs[0])) {
				$(dropdownTabs).each(function (key, element) {
					if (availableSpace > _getHiddenElementWidth($(element))) {
						$(element).insertBefore($dropdownSelector);
						availableSpace -= $(element).outerWidth();
					} else {
						return false;
					}
				});
			}
		}

		function _showAllTabs() {
			var dropdownTabs = _getDropdownTabs();

			$(dropdownTabs).each(function (key, element) {
				$(element).insertBefore($dropdownSelector);
			});
		}

		function _checkSmartTabVisibility() {
			var dropdownTabs = _getDropdownTabs();

			if (dropdownTabs.length === 0) {
				_hideSmartTab();
			} else {
				_showSmartTab();
			}
		}

		function _hideSmartTab() {
			$dropdownSelector.addClass('hidden');
		}
		function _showSmartTab() {
			$dropdownSelector.removeClass('hidden');
		}


		function _getAvailableSpace() {
			return listContainer.outerWidth() - _getVisibleTabsWidth();
		}

		function _getVisibleTabsWidth() {

			var visibleTabsWidth = 0,
				$visibleTabs = _getVisibleTabs();


			$($visibleTabs).each(function () {
				visibleTabsWidth += parseInt($(this).outerWidth(), 10);
			});

			visibleTabsWidth = visibleTabsWidth + parseInt($dropdownSelector.outerWidth(), 10);
			return visibleTabsWidth;

		}

		function _getVisibleTabs() {
			return listContainer.children('li:not(.' + SMART_DROPDOWN_CLASS + ')');
		}


		function _addSmartDropdown() {
			listContainer.append(dropdownHtml);

			$dropdownSelector = listContainer.find('li.' + SMART_DROPDOWN_CLASS);
			$dropdownSelectorMenu = $dropdownSelector.find('>ul');
		}

		function _getDropdownTabs() {
			return $dropdownSelectorMenu.find('>li');
		}

		function _getHiddenElementWidth($elementTab) {
			var clonedElementTab = $($elementTab).clone(),
				tempElementTabWidth;

			// clone target $elementTab to container to define element width
			clonedElementTab.appendTo(listContainer).css('position', 'fixed');
			tempElementTabWidth = $(clonedElementTab).outerWidth();

			// remove temp cloned element
			$(clonedElementTab).remove();

			return tempElementTabWidth;
		}

		function _isSmallViewport () {
			return $('.js-custom-navbar').is(':visible');
		}

		return initSmartDropdown();
	}

}(jQuery));
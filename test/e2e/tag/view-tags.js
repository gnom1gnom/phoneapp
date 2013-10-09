'use strict';

describe('View tags', function() {
	// tablica opcji selecta wygenerowanego dla facetu tags
	var tagsList = [
		['Tag foo'],
		['Tag bar'],
		['Tag baz'],
		['Tag blach'],
		['Tag fnord']
	];

	xit('should list all tags', function() {
		browser().navigateTo('/#/tags');
		expect(repeater('#tags li').count()).toEqual(tagsList.length);
		for (var i = 0; i < tagsList.length; i++) {
			expect(repeater('#tags li').row(i)).toEqual(tagsList[i]);
		}
	});

	xit('clicking on tag link should leed to product', function() {
		browser().navigateTo('/#/tags');
		element('#tags li:eq(0) a').click();
		expect(browser().location().path()).toEqual('/viewTag/1');
		expect(element('form #name').text()).toEqual(tagsList[0][0]);
	});
});
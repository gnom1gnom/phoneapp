'use strict';

describe('my app', function() {
	// tablica opcji selecta wygenerowanego dla facetu tags
	var tagsList = [
		['Tag foo'],
		['Tag bar'],
		['Tag baz'],
		['Tag blach'],
		['Tag fnord']
	];

	it('should list all tags', function() {
		browser().navigateTo('/#/tags');
		expect(repeater('#tags li').count()).toEqual(tagsList.length);
		for (var i = 0; i < tagsList.length; i++) {
			expect(repeater('#tags li').row(i)).toEqual(tagsList[i]);
		}
	});
});
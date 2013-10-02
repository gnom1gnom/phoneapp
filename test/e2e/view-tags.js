'use strict';

describe('my app', function() {
	// tablica opcji selecta wygenerowanego dla facetu tags
	var tagsList = [
		'Tag foo',
		'Tag bar',
		'Tag baz',
		'Tag blach',
		'Tag fnord'
	];

	it('should list all tags', function() {
		browser().navigateTo('/#/tags');
		var foundTags = element('#tags li').query(function(elements, done) {
			var tagsArray = [];
			// sprawdzamy poszczególne opcje
			elements.each(function(index) {
				tagsArray.push(elements[index].innerText);
			});

			done(null, tagsArray);
		});

		expect(foundTags).toEqual(tagsList);
	});
});
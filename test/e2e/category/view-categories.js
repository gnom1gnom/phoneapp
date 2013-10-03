'use strict';

describe('View categories', function() {
	// tablica opcji selecta wygenerowanego dla facetu categories
	var categoriesList = [
		['Kategoria A'],
		['Kategoria B'],
		['Kategoria C'],
		['Kategoria D'],
		['Kategoria E'],
		['Kategoria F'],
		['Kategoria G'],
		['Kategoria H'],
		['Kategoria I'],
		['Kategoria J'],
		['Kategoria K'],
		['Kategoria L'],
		['Kategoria M'],
		['Kategoria N']
	];

	it('should list all categories', function() {
		browser().navigateTo('/#/categories');
		expect(repeater('#categories li').count()).toEqual(categoriesList.length);
		for (var i = 0; i < categoriesList.length; i++) {
			expect(repeater('#categories li').row(i)).toEqual(categoriesList[i]);
		}
	});

	it('clicking on tag link should leed to product', function() {
		browser().navigateTo('/#/categories');
		element('#categories li:eq(0) a').click();
		expect(browser().location().path()).toEqual('/viewCategory/1');
		expect(element('form #name').text()).toEqual(categoriesList[0][0]);
	});
});
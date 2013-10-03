'use strict';

describe('Create, edit and delete category', function() {

	it('should create a category', function() {
		browser().navigateTo('/#/newCategory');
		input('category.name').enter('Testowa kategoria');
		element('#buttonSave').click();
		expect(browser().location().path()).toMatch(new RegExp(/^\/viewCategory\/\d+$/));
		expect(element('form #name').text()).toEqual('Testowa kategoria');
	});

	it('should edit the category', function() {
		element('#buttonEdit').click();
		input('category.name').enter('Testowa categoria nowa');
		element('#buttonSave').click();
		expect(browser().location().path()).toMatch(new RegExp(/^\/viewCategory\/\d+$/));
		expect(element('form #name').text()).toEqual('Testowa categoria nowa');
	});

	it('should delete the category', function() {
		element('#buttonDelete').click();
		element('button:contains("OK")').click();
		expect(browser().location().path()).toEqual('/categories');
	});
});
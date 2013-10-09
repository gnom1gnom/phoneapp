'use strict';

describe('Create, edit and delete tag', function() {

	it('should create a tag', function() {
		browser().navigateTo('/#/newTag');
		input('tag.name').enter('Testowy tag');
		element('#buttonSave').click();
		expect(browser().location().path()).toMatch(new RegExp(/^\/viewTag\/\d+$/));
		expect(element('form #name').text()).toEqual('Testowy tag');
	});

	it('should edit the tag', function() {
		element('#buttonEdit').click();
		input('tag.name').enter('Testowy tag nowy');
		element('#buttonSave').click();
		expect(browser().location().path()).toMatch(new RegExp(/^\/viewTag\/\d+$/));
		expect(element('form #name').text()).toEqual('Testowy tag nowy');
	});

	it('should delete the tag', function() {
		element('#buttonDelete').click();
		element('button:contains("OK")').click();
		expect(browser().location().path()).toEqual('/tags');
	});
});
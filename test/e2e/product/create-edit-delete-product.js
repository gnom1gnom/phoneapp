'use strict';

describe('Create, edit and delete product', function() {

	angular.scenario.dsl('jQueryFunction', function() {
		return function(selector, functionName /*, args */ ) {
			var args = Array.prototype.slice.call(arguments, 2);
			return this.addFutureAction(functionName, function($window, $document, done) {
				var $ = $window.$; // jQuery inside the iframe
				var elem = $(selector);
				if (!elem.length) {
					return done('Selector ' + selector + ' did not match any elements.');
				}
				done(null, elem[functionName].apply(elem, args));
			});
		};
	});

	it('should create a product', function() {
		browser().navigateTo('/#/newProduct');
		input('product.name').enter('Testowy produkt');
		input('product.stock').enter('12');
		jQueryFunction('#created', "focus");
		jQueryFunction('ul.dropdown-menu span:contains("07")', "click");
		input('product.price').enter('123.45');
		select('product.category').option("Kategoria A");
		select('addedTag').option("Tag foo");
		element('#buttonAddTag').click();
		input('product.description').enter('To jest przykaładowy produkt.');

		pause();
		element('#buttonSave').click();
		expect(browser().location().path()).toMatch(new RegExp(/^\/viewProduct\/\d+$/));
		expect(element('form #name').text()).toEqual('Testowy produkt');
	});

	it('should edit the product', function() {
		element('#buttonEdit').click();
		input('product.name').enter('Testowy produkt nowy');
		pause();
		element('#buttonSave').click();
		expect(browser().location().path()).toMatch(new RegExp(/^\/viewProduct\/\d+$/));
		expect(element('form #name').text()).toEqual('Testowy produkt nowy');
	});

	it('should delete the product', function() {
		element('#buttonDelete').click();
		pause();
		element('button:contains("OK")').click();
		expect(browser().location().path()).toEqual('/products');
	});
});
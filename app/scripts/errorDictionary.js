'use strict';

angular.module('phoneappApp.errorDictionary', [], ['$provide',
	function($provide) {
		$provide.value('$errorDictionary', {
			"HAS_DEPENDENT_PRODUCTS": "there are related products",
			"DUPLICATE": "object already exists",

			"UNKNOWN": "unknown reason",

			// returns an array of translated errors
			translate: function(errors) {
				var errorDictionary = this;
				var errorArray = [];

				if (_(errors).isUndefined() || _(errors).isNull())
					return errorArray;

				_(errors).each(function(value, key) {
					if (_(errorDictionary[value]).isUndefined())
						errorArray.push(value);
					else
						errorArray.push(errorDictionary[value]);
				});

				return errorArray;
			},

			describe: function(error) {
				try {
					if (_(error).isUndefined() || _(error).isNull())
						return this["UNKNOWN"];

					if (_(error.data).isUndefined() || _(error.data).isNull() || _(error.data.errors).isEmpty())
						return JSON.stringify(error);

					var errorArray = this.translate(error.data.errors);

					if (errorArray.lengt != 0)
						return errorArray.join(", ");
					else
						return JSON.stringify(error);
				} catch (err) {
					return err.message + ", " + JSON.stringify(error);
				}
			}
		});
	}
]);
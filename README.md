-------------------------------------------------------------------------
-------------------------------------------------------------------------
-------------------------------------------------------------------------
GET TAGS
	URL (GET)
		/tags

	RESPONSE
		[
			{
				"id"	:	"",
				"name"	:	""
			}
		]

-------------------------------------------------------------------------
GET TAG BY ID
	URL (GET)
		/tags/{id}

	RESPONSE
		{
			"id"	:	"",
			"name"	:	""
		}

-------------------------------------------------------------------------
ADD TAG
	URL (POST)
		/tags

	REQUEST
		{
			"name"	:	""	# nazwa tagu
		}

	RESPONSE
		{
			"id"	:	"",	# id stworzonego tagu
			"name"	:	""	# nazwa stworzonego tagu
		}

-------------------------------------------------------------------------
UPDATE TAG
	URL (PUT)
		/tags/{id}

	REQUEST
		{
			"name"	:	""	# nazwa tagu
		}

	RESPONSE
		{
			"id"	:	"",	# id zaktualizowanego tagu
			"name"	:	""	# nazwa zaktualizowanego tagu
		}

-------------------------------------------------------------------------
DELETE TAG BY ID
	URL (DELETE)
		/tags/{id}

	RESPONSE
		HTTPSTATUS 200

-------------------------------------------------------------------------
-------------------------------------------------------------------------
-------------------------------------------------------------------------
GET CATEGORIES
	URL (GET)
		/categories

	RESPONSE
		[
			{
				"id"	:	"",
				"name"	:	""
			}
		]

-------------------------------------------------------------------------
GET CATEGORY BY ID
	URL (GET)
		/categories/{id}

	RESPONSE
		{
			"id"	:	"",
			"name"	:	""
		}

-------------------------------------------------------------------------
ADD CATEGORY
	URL (POST)
		/categories

	REQUEST
		{
			"name"	:	""	# nazwa tagu
		}

	RESPONSE
		{
			"id"	:	"",	# id stworzonej kategorii
			"name"	:	""	# nazwa stworzonej kategorii
		}

-------------------------------------------------------------------------
UPDATE CATEGORY
	URL (PUT)
		/categories/{id}

	REQUEST
		{
			"name"	:	""	# nazwa tagu
		}

	RESPONSE
		{
			"id"	:	"",	# id zaktualizowanej kategorii
			"name"	:	""	# nazwa zaktualizowanej kategorii
		}

-------------------------------------------------------------------------
DELETE CATEGORY BY ID
	URL (DELETE)
		/categories/{id}

	RESPONSE
		HTTPSTATUS 200



dostępny
opis
cena
nazwa

wysukiwanie
nazwa opis kategoria tagi


do wprowadzania kategorii tagów produktów

import url from 'url';

const config = {
	"dev": {
		"protocol": "http",
		"hostname": "swapi.co",
		"port": 80,
		"pathname": "api",
	},
	"prod": {
		"protocol": "https",
		"hostname": "swapi.co",
		"port": 443,
		"pathname": "api",
	}
}

export const SWAPI_BASE_URL = url.format(config["prod"]);
// export const SWAPI_BASE_URL = 'http://swapi.co/api/';


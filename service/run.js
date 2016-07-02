'use strict';
const axios = require('axios');
const Parse = require('parse/node').Parse;

var config = require('./config.json');
Parse.initialize(config.APP_ID, config.JS_KEY, config.APP_ID);
/*
var peoples = new Array();
var People = new Parse.Object.extend("People", {"id": "string", "name": "string"});
var people1 = new People();
var people2 = new People();

people1.set("id", "1");
people1.set("name", "Bro");
peoples[0] = people1;
people2.set("id", "2");
people2.set("name", "Sis");
peoples[1] = people2;

Parse.Object.saveAll(peoples, {
	success: function(list) {
		console.log("success");
	},
	error: function(error) {
		console.log(error);
	}
});
*/
function exit() {
  process.exit();
}

function getName(item, type) {
	if (type === 'films') {
		return `${item.title}`;
	}
	return item.name;
}

function query(url, type, obj, resolve) {
	axios.get(url)
		.then(({ data }) => {
			data.results.forEach((item) => {
				const temp = item.url.split('/');
				const index = temp[temp.length - 2];
				const name = getName(item, type);
				obj[index] = name;
			});
			if (data.next) {
				query(data.next, type, obj, resolve)
			}
			else {
				resolve();
			}
		});
}

function loadAndSave({type}) {
	const promise = new Promise((resolve) => {
		const obj = {
			'__internal': type
		}
		
		new Promise((swapiResolve) => {
			query(`https://swapi.co/api/${type}/`, type, obj, swapiResolve);
		}).then(() => {
			console.log(`${type} ${Object.keys(obj).length}`);
			/*new Parse.Object.extend(type)().saveAll(obj).then(function(object) {
				console.log(object);
			});*/
		});
	});

	return promise;
}

try {
	const data = [
		{ type: 'people' },
		{ type: 'films' },
		{ type: 'starships' },
		{ type: 'vehicles' },
		{ type: 'species' },
		{ type: 'planets' }
	];
	const promises = [];
	data.forEach((item) => {
		promises.push(loadAndSave(item));
	});

	Promise.all(promises).then(exit);
} 
catch (e) {
  exit();
}

// var People = Parse.Object.extend("people");
// var pointer

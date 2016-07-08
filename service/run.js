'use strict';
const axios = require('axios');
const firebase = require('firebase');

var config = require('../config.json');

firebase.initializeApp(config);

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
			firebase.database().ref().child(type).set(obj).then(() => {
				resolve();
			});
		});
	});

	return promise;
}

function getSchema(cb) {
	axios
		.get(`https://swapi.co/api/`)
		.then((data) => {
			const result = [];
			Object.keys(data.data).map((field, i) => {
				result.push({ type: field});
			})
			return result;
		})
		.then((result) => {
			cb(result);
		})
}

try {
	getSchema((data) => {
		const promises = [];
		data.forEach((item) => {
			promises.push(loadAndSave(item));
		});

		Promise.all(promises).then(exit);
	});
} 
catch (e) {
  exit();
}

const detected = 'Private Browsing Mode Detected!';
const notDetected = 'Private Browsing Mode NOT Detected!';

/* Heavily borrowed from various news websites detection scripts */
/* https://gist.github.com/kdzwinel/783df9b129ae5c8443dd96c0d4ed9723 */


/* Run all the tests. Returns a boolean Promise */
function detectPrivateMode() {
	return Promise.all(
		[
		forChrome(), 
		forSafari(), 
		forFirefox()
		])
	.then(results => checkIfAnyTestsWorked(results));
}

function privateModeFound() {
	return new Promise(resolve => resolve(true));
}

function privateModeNotFound() {
return new Promise(resolve => resolve(false));
}

function forChrome() {
	return requestFileSystem();
}

function requestFileSystem() {
	if (window.webkitRequestFileSystem) {
		return new Promise(resolve => {
			window.webkitRequestFileSystem(
				window.TEMPORARY, 1,
				function() {
					console.debug("request fs found");
					resolve(false);
				},
				function() {
					console.debug("request fs not found");
					resolve(true);
				});
		});
	} 
	
	return privateModeNotFound();
}

function isSafari() {
	return /Safari/.test(window.navigator.userAgent)
}

function forSafari() {
	if (isSafari()) {
		if (window.safariIncognito) {
			return privateModeFound();
		} 
		return testLocalStorage();
	}
	return privateModeNotFound();
}

function testLocalStorage() {
	if (window.localStorage) {
		let is_private;
		try {
			window.openDatabase(null, null, null, null);
		} catch (e) {
			is_private = true;
		}
		try {
			window.localStorage.setItem('test', 1);
		} catch(e) {
			is_private = true;
		}
		if (typeof is_private === 'undefined') {
			is_private = false;
			window.localStorage.removeItem('test');
		}
		return new Promise(resolve => resolve(is_private));
	}
	return privateModeNotFound();
}

function isFF() {
	return /Firefox/.test(window.navigator.userAgent) 
	|| 'MozAppearance' in document.documentElement.style;
}

function testIndexedDB() {
	if (window.indexedDB) {
		return new Promise(resolve => {
			const on = function() {
				resolve(true);
			}
			off = function() {
				resolve(false);
			};
			const db = window.indexedDB.open('test');
			db.onsuccess = off;
			db.onerror = on;
			return;
		});
	}
	return privateModeNotFound();
}
function forFirefox() {
	if (isFF()) {
		return testIndexedDB();
	}
	return privateModeNotFound();
}

function writeToDom(message) {
	document.getElementById('detection').innerHTML = message;
}

function checkIfTrue(arg) {
	/* type coerce to boolean */
	return arg === true;
}

function checkIfAnyTestsWorked(testResults) {
	return new Promise((resolve, reject) => {
		if (testResults.some(checkIfTrue)) {
			resolve(detected);
		} else {
			reject(notDetected);
		}
	});
}

/* Run the detection functions and write to DOM */
detectPrivateMode()
.then(message => writeToDom(message))
.catch(error => writeToDom(error));
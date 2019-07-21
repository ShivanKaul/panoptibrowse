
const detected = 'Private Browsing Mode Detected!';
const notDetected = 'Private Browsing Mode NOT Detected!';

/* Heavily borrowed from various news websites detection scripts */
/* https://gist.github.com/kdzwinel/783df9b129ae5c8443dd96c0d4ed9723 */


/* Run all the tests. Returns a boolean Promise */
function detectPrivateMode() {
	return Promise.all([
		requestFileSystem(), 
		forSafari(), 
		forFirefox()
		])
	.then(results => checkIfAnyTestsWorked(results));
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
	} else {
		return new Promise(resolve => resolve(false));
	}
}

function isSafari() {
	return /Safari/.test(window.navigator.userAgent)
}

function forSafari() {
	if (window.localStorage && isSafari()) {
		let is_private;
		// One-off check for weird sports 2.0 polyfill
	    // This also impacts iOS Firefox and Chrome (newer versions), apparently
	    // @see bglobe-js/containers/App.js:116
	    if (window.safariIncognito) {
	    	is_private = true;
	    } else {
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
	    } 

	    if (typeof is_private === 'undefined') {
	    	is_private = false;
	    	window.localStorage.removeItem('test');
	    }
	    return new Promise(resolve => resolve(is_private));
	} else return new Promise(resolve => resolve(false));
}

function isMozilla() {
	return /Firefox/.test(window.navigator.userAgent) 
	|| 'MozAppearance' in document.documentElement.style;
}


function forFirefox() {
	if (window.indexedDB && isMozilla()) {
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
	else {
		return new Promise(resolve => resolve(false));
	}
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
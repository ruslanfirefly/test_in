var https = require('https');
var fs = require('fs');

var download = function(url, dest, cb) {
	var file = fs.createWriteStream(dest);
	var request = https.get(url, function(response) {
		response.pipe(file);
		file.on('finish', function() {
			file.close(cb);  // close() is async, call cb after close completes.
		});
	}).on('error', function(err) { // Handle errors
		fs.unlink(dest); // Delete the file async. (But we don't check the result)
		if (cb) cb(err.message);
	});
};

download("https://tf.zeroheight.com/api/token_file/2ded7ae99e48/share", "./props/tokens.json", ()=>{
	const StyleDictionary = require('style-dictionary').extend({
	source: ['./props/tokens.json'],
	platforms: {
		scss: {
			transformGroup: 'scss',
			buildPath: 'scss/',
			files: [{
				destination: '_variables.scss',
				format: 'scss/variables'
			}]
		}
	}
});

StyleDictionary.buildAllPlatforms();
})



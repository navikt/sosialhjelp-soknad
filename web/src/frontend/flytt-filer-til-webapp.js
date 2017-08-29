var fsextra = require('fs-extra');
var fs = require('fs');

fs.readdir('build/static', function (err, folders)  {
	folders.forEach(function(folder) {
		fs.readdir('build/static/' + folder, function (err, files) {
			var mainFile = files[0];

			if(mainFile) {
				var fileending = mainFile.split('.')[2];
				var filename =  mainFile.split('.')[0];
				fsextra.copy('build/static/' + folder + '/' + mainFile, '../main/webapp/statisk/' + folder + '/' +  filename +'.'+ fileending, function (err) {
					if(err){
						console.log('build/static/' + folder + '/' + mainFile);

						return console.error(err)
					} else {
						console.log("Kopiert " + 'build/static/' + folder + '/' + mainFile + ' til: ' + '../main/webapp/statisk/' + folder + '/' +  filename +'.'+ fileending);
					}
				});
			}
		})
	});
});

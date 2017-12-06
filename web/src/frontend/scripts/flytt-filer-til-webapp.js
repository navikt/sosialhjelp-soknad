var fsextra = require("fs-extra");
var fs = require("fs");
const path = require("path");

function copyFile(srcFile, outFile) {
	fsextra.copy(srcFile.join(path.sep), outFile.join(path.sep), function(err) {
		if (err) {
			console.log(srcFile);
			return console.error(err);
		} else {
			console.log("Kopiert " + srcFile + " til: " + outFile);
		}
	});
}

function flyttSVG() {
	const bildefolder = [".", "build", "soknadsosialhjelp", "statisk", "bilder"];

	fs.readdir(bildefolder.join(path.sep), function(err, files) {
		var mainFile = files[0];
		files.forEach(function(filename) {
			const srcFile = [
				".",
				"build",
				"soknadsosialhjelp",
				"statisk",
				"bilder",
				filename
			];
			const outFile = ["..", "main", "webapp", "statisk", "bilder", filename];
			copyFile(srcFile, outFile);
		});
	});
}

function flyttStatisk() {
	const mainFolder = [".", "build", "static"];
	fs.readdir(mainFolder.join(path.sep), function(err, folders) {
		folders.forEach(function(folder) {
			var dir = [".", "build", "static", folder];

			fs.readdir(dir.join(path.sep), function(err, files) {
				var mainFile = files[0];

				if (mainFile) {
					var fileending = mainFile.split(".")[2];
					var filename = mainFile.split(".")[0];
					var srcFile = [".", "build", "static", folder, mainFile];
					var outFile = [
						"..",
						"main",
						"webapp",
						"statisk",
						folder,
						filename + "." + fileending
					];
					fsextra.copy(srcFile.join(path.sep), outFile.join(path.sep), function(
						err
					) {
						if (err) {
							console.log("build/static/" + folder + "/" + mainFile);
							return console.error(err);
						} else {
							console.log(
								"Kopiert " +
									"build/static/" +
									folder +
									"/" +
									mainFile +
									" til: " +
									"../main/webapp/statisk/" +
									folder +
									"/" +
									filename +
									"." +
									fileending
							);
						}
					});
				}
			});
		});
	});
}

flyttStatisk();
flyttSVG();

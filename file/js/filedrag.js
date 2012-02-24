/*
filedrag.js - HTML5 File Drag & Drop demonstration
Featured on SitePoint.com
Developed by Craig Buckler (@craigbuckler) of OptimalWorks.net
*/
(function() {

	// getElementById
	function $id(id) {
		return document.getElementById(id);
	}




	// file drag hover
	function FileDragHover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");
	}


	// file selection
	function FileSelectHandler(e) {
		//hide drag div
		var filedrag = $id("filedrag");
//		filedrag.style.display = "none";

		// cancel event and hover styling
		FileDragHover(e);

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;

		// process all File objects
		for (var i = 0, f; f = files[i]; i++) {
			if(f.type!='')
				UploadFile(f);
		}

	}




	// upload JPEG files
	function UploadFile(file) {

		// following line is not necessary: prevents running on SitePoint servers
		if (location.host.indexOf("sitepointstatic") >= 0) return

		var xhr = new XMLHttpRequest();
		if (xhr.upload) {

			// create progress bar
			var o = $id("progressdiv");
			var pdiv = o.appendChild(document.createElement("div"));
			var progress = pdiv.appendChild(document.createElement("p"));
			progress.appendChild(document.createTextNode(file.name));


			// progress bar
			xhr.upload.addEventListener("progress", function(e) {
				var pc = parseInt((e.loaded* 100 / e.total));
				progress.style.width = pc + "%";
			}, false);

			// file received/failed
			xhr.onreadystatechange = function(e) {
				if (xhr.readyState == 4) {
					progress.className = (xhr.status == 200 ? "success" : "failure");
					pdiv.parentNode.removeChild(pdiv);
					//刷新文件列表
					reloadfilelist();
				}
			};

			// start upload
			xhr.open("POST", "upload.php?fname="+file.webkitRelativePath, true);
			xhr.setRequestHeader("X_FILENAME", file.name);
			xhr.send(file);

		}

	}
	
	//folder handler
	function FileFolderHandler(){
		
	}


	// initialize
	function Init() {

		var fileselect = $id("fileselect"),
			filedrag = $id("filedrag"),
			submitbutton = $id("submitbutton"),
			bodytest = $id("bodytest"),
			folderInput = $id("folderInput");

		// file select
		fileselect.addEventListener("change", FileSelectHandler, false);
		//folder upload
		folderInput.addEventListener("change",FileSelectHandler,false);

		// is XHR2 available?
		var xhr = new XMLHttpRequest();
		if (xhr.upload) {

			// file drop
			filedrag.addEventListener("dragover", FileDragHover, false);
			filedrag.addEventListener("dragleave", FileDragHover, false);
			filedrag.addEventListener("drop", FileSelectHandler, false);
			bodytest.addEventListener("dragover",showdragdiv,false);
//			filedrag.style.display = "block";

		}

	}

	// call initialization file
	if (window.File && window.FileList && window.FileReader) {
		Init();
	}
	function showdragdiv(){
		var filedrag = $id("filedrag");
		filedrag.style.display = "block";
	}


})();
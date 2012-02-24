<?php
/*
Server-side PHP file upload code for HTML5 File Drag & Drop demonstration
Featured on SitePoint.com
Developed by Craig Buckler (@craigbuckler) of OptimalWorks.net
*/
function createFolder($path) {
    if (!file_exists($path)) {
        createFolder(dirname($path));
        mkdir($path,0777);
    }
}

$fn = (isset($_SERVER['HTTP_X_FILENAME']) ? $_SERVER['HTTP_X_FILENAME'] : false);

if ($fn) {
    //uploaded file name include path
    $fname = $_GET['fname'];
    if ($fname!=''&& $fname!='undefined') {
        createFolder('uploads/'.dirname($fname));
        $targetfile = 'uploads/' . $fname;
    }else{
        $targetfile = 'uploads/'.$fn;
    }
	// AJAX call
	if (file_put_contents($targetfile,file_get_contents('php://input'))){
	    echo "ok";
	}else{
	    echo "failed";
	}
	

}
else {

	// form submit
	$files = $_FILES['fileselect'];

	foreach ($files['error'] as $id => $err) {
		if ($err == UPLOAD_ERR_OK) {
			$fn = $files['name'][$id];
			move_uploaded_file(
				$files['tmp_name'][$id],
				'uploads/' . $fn
			);
			echo "<p>File $fn uploaded.</p>";
		}
	}

}
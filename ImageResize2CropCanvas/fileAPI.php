
// $fileError = $_FILES['file']['error'];
//     if ( 0 < $fileError ) {
//         echo false;
//     }
//     else {
//         move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/' . $_FILES['file']['name']);
//         echo true;
//     }
//

<?php
	// requires php5
	define('UPLOAD_DIR', 'images/');
	$img = $_POST['imgBase64'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$file = UPLOAD_DIR . uniqid() . '.png';
	$success = file_put_contents($file, $data);
	print $success ? $file : 'Unable to save the file.';
?>

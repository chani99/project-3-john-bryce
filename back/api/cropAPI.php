<?php

$image_to_crop = $_POST['imagearray'];
$dst_x =0;
$dst_y =0;
$src_x = $image_to_crop['start_x'];
$src_y = $image_to_crop['start_y'];
$dst_h = $image_to_crop['width'];
$dst_w = $image_to_crop['heigth'];
$src_w =$src_x + $dst_w;
$src_h = $src_y + $dst_h;

// $dst_image = imagecreatetruecolor($dst_w, $dst_h);
// $src_image = imagecreatefromjpeg( "../uploads/$image_to_crop['name']");
// imagecopyresampled($dst_image, $src_image, $dst_x, $dst_y, $src_x, $src_y, $dst_w, $dst_h, $src_w, $src_h);
// imagejpeg("../uploads/$image_to_crop['name']");
echo $image_to_crop['name'];
    
?>
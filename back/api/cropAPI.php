<?php

$image_to_crop = $_REQUEST['activitiesArray'];

$dst_x =0;
$dst_y =0;
$src_x = $image_to_crop['start_x'];
$src_y = $image_to_crop['start_y'];
$dst_h = $image_to_crop['heigth'];
$dst_w = $image_to_crop['width'];
$src_w =$src_x + $dst_w;
$src_h = $src_y + $dst_h;
$name= $image_to_crop['name'];

$dst_image = imagecreatetruecolor($dst_w, $dst_h);
$src_image = imagecreatefromjpeg("../uploads/$name");
imagecopyresampled($dst_image, $src_image, $dst_x, $dst_y, $src_x, $src_y, $dst_w, $dst_h, $src_w, $src_h);
imagejpeg($dst_image, "../uploads/$name");
echo json_encode([true, $name]);

?>

<?php

class CropController {
    private $image_to_crop;

        
    
        function __construct($image_to_crop) {
            $this->image_to_crop = $image_to_crop;
        }


            function CropImage(){

                    $name = $this->image_to_crop['name'];
                    $dst_x = 0;
                    $dst_y = 0;
                    $src_x = $this->image_to_crop['start_x'];
                    $src_y = $this->image_to_crop['start_y'];
                    $dst_h = $this->image_to_crop['heigth'];
                    $dst_w = $this->image_to_crop['width'];
                    
                    $image_type = getimagesize("../uploads/$name");
                            if($image_type['mime'] == "image/jpeg"){
                                $im =imagecreatefromjpeg("../uploads/$name");
                            }else{
                                $im =imagecreatefrompng("../uploads/$name");
                            }
                    
                    $size = min(imagesx($im), imagesy($im));
                    $im2 = imagecrop($im, ['x' => $src_x, 'y' => $src_y, 'width' => $dst_w, 'height' => $dst_h]);
                    if ($im2 !== FALSE) {
                        $image_type = getimagesize("../uploads/$name");
                                if($image_type['mime'] == "image/jpeg"){
                                    imagejpeg($im2, "../uploads/C_$name");
                                }else{
                                    imagepng($im2, "../uploads/C_$name");
                                }
                        
                        $DeleteOriginal="../uploads/$name";
                        unlink($DeleteOriginal);
                        return [true, "C_".$name];

                    } else {
                        return  "error croping image";
                    }
                    
                
                }

    }

?>
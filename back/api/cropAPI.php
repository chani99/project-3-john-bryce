<?php
     require_once '../controllers/Crop_controller.php';
     

if (!isset($_REQUEST['activitiesArray'])){
        echo json_encode("faild loadin image");
    } else {
            $image_to_crop = $_REQUEST['activitiesArray'];
            $crop = new CropController($image_to_crop);
            $croped = $crop->CropImage();
            echo json_encode($croped);  
    }
    





?>
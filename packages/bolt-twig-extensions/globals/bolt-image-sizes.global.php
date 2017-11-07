<?php

class Twig_Extension_bolt_image_sizes extends Twig_Extension implements Twig_Extension_GlobalsInterface {
    public static $data;

    function __construct(){
        $documentRoot = getcwd();
        $json = file_get_contents($documentRoot . '/src/_data/image-sizes/image-sizes.data.json');
        self::$data = json_decode($json)->boltImageSizes;
    }

    public static function getImageSizes() {
        return self::$data;
    }

   public function getGlobals(){
        return array(
            'globalBoltImageSizes' => self::getImageSizes(),
        );
    }
}

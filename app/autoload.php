<?php

use Doctrine\Common\Annotations\AnnotationRegistry;
use Composer\Autoload\ClassLoader;

/**
 * @var ClassLoader $loader
 */
$loader = require __DIR__.'/../vendor_backend/autoload.php';

AnnotationRegistry::registerLoader(array($loader, 'loadClass'));

return $loader;

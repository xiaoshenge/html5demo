<?php
/**
 *@author:shenjian@ztgame.com
 *@encoding=UTF-8 ts=4 sw=4
 *@create:2012-2-24
 */
function getdir($path)
{
    $handle = opendir($path);
    $files = array();
    while (false !== ($file = readdir($handle))) {
        if ($file != '.' && $file != '..'){
            $files[] = array('name'=>$file,
                             'modified'=>date ("Y-m-d H:i:s", filemtime($path.$file)),
                             'type'=>mime_content_type($path.$file));
        }
    }
    closedir($handle);
    return $files;
}

$data = getdir("uploads/");
echo json_encode(array('data'=>$data));
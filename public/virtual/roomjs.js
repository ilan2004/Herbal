import './panolens.min.js';

if (typeof module === 'object') {window.module = module; module = undefined;}
var container = document.querySelector( '#container' );
/*panolens*/

var viewer = new PANOLENS.Viewer( { container: container , controlBar: true,  output: 'console' , autoHideInfospot: false, } );

/*panolens-end*/

viewer.addUpdateCallback(function(){});

/*panoramas*/

var AdobeStock_270072519 = new PANOLENS.ImagePanorama( "panoramas/AdobeStock_270072519.jpeg" );
AdobeStock_270072519.addEventListener('progress', function(e){
    $("#loading").show();
});
AdobeStock_270072519.addEventListener('load', function(e){
    //$("#loading").fadeOut();
});
AdobeStock_270072519.addEventListener('click', function(e){
});


var infospotAdobeStock_2700725190 = new PANOLENS.Infospot( 512, hotspotIcons[0].data, true );
        infospotAdobeStock_2700725190.position.set( -1578.32, -2259.52, 4164.73 );
        AdobeStock_270072519.add(infospotAdobeStock_2700725190);

infospotAdobeStock_2700725190.addEventListener('click', function(){

ChangePanorama('AdobeStock_591909826');

});

viewer.add( AdobeStock_270072519 );

var AdobeStock_591909826 = new PANOLENS.ImagePanorama( "panoramas/AdobeStock_591909826.jpeg" );
AdobeStock_591909826.addEventListener('progress', function(e){
    $("#loading").show();
});
AdobeStock_591909826.addEventListener('load', function(e){
    //$("#loading").fadeOut();
});
AdobeStock_591909826.addEventListener('click', function(e){
});


viewer.add( AdobeStock_591909826 );

$(document).ready(function(){ ChangePanorama('AdobeStock_270072519'); });


/*panoramas-end*/


function hideTemp(){
    $("#tmp").fadeOut();
    setTimeout(function(){
        $("#tmpcontent").html("");
    },1000);
}

function showMedia(type, content){
    switch(type){
        case 1 :
            //Image
            $("#tmpcontent").html("<img src='"+content+"' style='width: 100%;'>");
            $("#tmp").fadeIn();
            break;
        case 2 :
            //Video
            $("#tmpcontent").html("<video id='webvideo' controls autoplay style='width: 100%; height: 100%;'><source src='" +content+ "' type='video/mp4'> Your browser does not support the video tag. </video>");
            $("#tmp").fadeIn();
            break;
        case 3 :
            //Audio
            $("#tmpcontent").html("<audio controls style='width: 100%;'><source src='"+content+"' type='audio/ogg'>Your browser does not support the audio tag.</audio>");
            $("#tmp").fadeIn();
            break;
        case 4 :
            //PDF
            $("#tmpcontent").html("<iframe src='pdfjs/web/viewer.html?file=../../"+content+"' style='width: 100%; height: 99%;'></iframe>");
            $("#tmp").fadeIn();
            break;
    }
}



//Update Callback
viewer.addUpdateCallback(function(){
    
    /*viewerupdatecallback*/
if(viewer.panorama == AdobeStock_270072519){
}

if(viewer.panorama == AdobeStock_591909826){
}
/*viewerupdatecallback-end*/
    
    
});



var hotspotsvisible = true;
function ShowMyInfospot(hs, elid){
    var thehs = toScreenPosition(hs);
    if(thehs.z < 1){
        $("#" + elid).css({
            "top" : (thehs.y - ($("#" + elid).height()/2)) + "px",
            "left" : (thehs.x - ($("#" + elid).width()/2)) + "px",
        });
        if(hotspotsvisible)
            $("#" + elid).show();
    }else{
        $("#" + elid).hide();
    }
    
}

function toScreenPosition(obj)
{
    var vector = new THREE.Vector3();
    var widthHalf = 0.5 * innerWidth;
    var heightHalf = 0.5 * innerHeight;
    
    //obj.updateMatrixWorld();				
    vector.setFromMatrixPosition(obj.matrixWorld);
    
    
    vector.project(viewer.camera);

    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;

    
    return { 
        x: vector.x,
        y: vector.y,
        z: vector.z,
    };

};

var currentPanorama;
function ChangePanorama(panorama){
    currentPanorama = panorama;
    HideInfospots(); 
    $("#loading").fadeIn();
    //$(".customhotspot").fadeOut();
    setTimeout(function(){
        viewer.setPanorama(window[panorama]);
    }, 100);
    setTimeout(function(){
        $("#" + panorama).fadeIn();
        $("#loading").fadeOut();
    }, 1000);
    
}



function HideInfospots(){
    $(".customhotspot").fadeOut();
}

/*customjs*//*customjs-end*/

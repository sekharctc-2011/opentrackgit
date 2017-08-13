const electron = require('electron')

const desktopCapturer = electron.desktopCapturer;
const electronScreen = electron.screen;
const shell = electron.shell;

const fs = require('fs');
const os = require('os');
const path = require('path');

const screenshot = document.getElementById('screen-shot');
const screenshotmsg = document.getElementById('screenshot-path');

screenshot.addEventListener('click', function(event){
    screenshotmsg.textContent = 'Capturing screen sort...';
    const thumbSize = determineScreenShot();
    let options = { types: ['screen'], thumnailSize: thumbSize };
    if ($("#scid").val() != '') {
        fs.unlinkSync($("#scid").val());
    }
    
    desktopCapturer.getSources(options, function (error, sources) {
        if (error) return console.log(error.message);
        sources.forEach(function(source){
            // console.log(source.name);
            if (source.name === 'Entire screen' || source.name === 'Screen 1') {
                var randomNumberBetween0and19 = Math.floor(Math.random() * 200);
                const screenshotPath = path.join(os.tmpdir(), randomNumberBetween0and19 +'screenshot.png');
                
                fs.writeFile(screenshotPath, source.thumbnail.toPNG(), function(err){
                    if (err) return console.log(err.message);
                    console.log(screenshotPath);
                    //shell.openExternal('file://' + screenshotPath);
                    //load image in canvas
                    var ctx = $("canvas")[0].getContext("2d"),
                    img = new Image();  
                    img.onload = function(){
                        ctx.drawImage(img, 0, 0, 300, 300);
                        $("span").text("Loaded.");
                    };
                    //img.src = "http://photojournal.jpl.nasa.gov/jpeg/PIA17555.jpg";
                    
                    //////
                    var message = 'Saved screenshot' + screenshotPath;
                    screenshotmsg.textContent = message;
                    setTimeout(function () {
                        img.src = screenshotPath;
                        $("#scid").val(screenshotPath);
                        
                    }, 3000)
                })
            }
        });
    } );
});

function determineScreenShot(){
    const screenSize = electronScreen.getPrimaryDisplay().workAreaSize;
    const maxDimension = Math.max(screenSize.width, screenSize.height);

    return {
        width: maxDimension * window.devicePixelRatio,
        height: maxDimension * window.devicePixelRatio
    };
}

$("span").text("dddd...");


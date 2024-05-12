(() => {
    let animations = [];
    chrome.runtime.onMessage.addListener(async (obj, sender, response) => {
        
        //set 2x speed
        Array.from(document.getElementsByClassName("speed-control")).forEach(speedControl => {
            speedControl.getElementsByClassName("zb-checkbox")[0].children[0].click();
        });

        // Get all animations
        Array.from(document.getElementsByClassName("animation-player-content-resource interactive-activity-container")).forEach(animation => {
            const startButton = animation.getElementsByClassName("start-button")[0];
            if (startButton) {
                startButton.click();
            }
        });
        await sleep(2000);
        //Go through steps
        while(document.getElementsByClassName("pause-button").length > 0 || document.querySelectorAll(".play-button:not(.rotate-180)").length > 0){
            console.log("stepping");
            Array.from(document.querySelectorAll(".play-button:not(.rotate-180)")).forEach(playButton => {
                playButton.click();
            });
            await sleep(5000);
        }


    });
})();

function sleep(ms) {
    console.log("wait");
    return new Promise(resolve => setTimeout(resolve, ms));
}
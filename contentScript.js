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

        //get all true/false
        Array.from(document.getElementsByClassName("interactive-activity-container multiple-choice-content-resource")).forEach(multipleChoice =>{
            Array.from(multipleChoice.getElementsByClassName("question-set-question multiple-choice-question ember-view")).forEach(async multiQuestion => {
                multiQuestion.getElementsByClassName("question-choices")[0].querySelectorAll('input')[0].click();
                await sleep(1000);
                if(multiQuestion.getElementsByClassName("zb-explanation has-explanation correct").length !== 1){
                    multiQuestion.getElementsByClassName("question-choices")[0].querySelectorAll('input')[1].click();
                }
            });
        });
        
        //get all short answers

        Array.from(document.getElementsByClassName("zb-button  secondary              show-answer-button")).forEach(showAnswer =>{
            showAnswer.click();
            showAnswer.click();
        })

        await sleep(1000);

        Array.from(document.getElementsByClassName("interactive-activity-container short-answer-content-resource participation large ember-view")).forEach(shortAnswer => {
            Array.from(shortAnswer.getElementsByClassName("question-set-question short-answer-question ember-view")).forEach(async shortQuestion =>{
                var answer = shortQuestion.getElementsByClassName("forfeit-answer")[0].textContent.trim();
                shortQuestion.getElementsByClassName("ember-text-area ember-view zb-text-area hide-scrollbar")[0].value = answer;
                await sleep(1000);
                shortQuestion.getElementsByClassName("ember-text-area ember-view zb-text-area hide-scrollbar")[0].dispatchEvent(new Event('change'));
                shortQuestion.getElementsByClassName("zb-button  primary  raised            check-button")[0].click();
            });
        });
        


    });
})();

function sleep(ms) {
    console.log("wait");
    return new Promise(resolve => setTimeout(resolve, ms));
}
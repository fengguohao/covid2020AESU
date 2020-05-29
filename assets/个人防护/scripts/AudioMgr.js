// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        trainMusic:{
            default:null,
            type:cc.AudioClip
        },
        bump:{
            default:null,
            type:cc.AudioClip
        },
        openDoor:{
            default:null,
            type:cc.AudioClip
        },
        washHands:{
            default:null,
            type:cc.AudioClip
        },
        toliet:{
            default:null,
            type:cc.AudioClip
        }


    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.maxNum = cc.audioEngine.getMaxAudioInstance();
        this.audioPool = [];

 
        // check deprecated
        ['playMusic', 'playEffect'].forEach(function (name) {
            if (!cc.audioEngine[name]) {
                cc.warn('.' + name + ' is not found!');
            }
        });
        
     },

    start () {

    },

    playMusic(name){
        switch(name){
            case "trainMusic":
                this.play(this.trainMusic);
                break;
            case "bump":
                this.play(this.bump);
                break;
            case "openDoor":
                this.play(this.openDoor);
                break;
            case "washHands":
                this.play(this.washHands);
                break;
            case "toliet":
                this.play(this.toliet);
                break;
        }

    },
    stopAll () {
        cc.audioEngine.stopAll();
        this.audioPool = [];
        
    },
    play (audio) {
        if (!audio || this.audioPool.length === this.maxNum) return;
        var id = cc.audioEngine.play(audio, false, 1);
        this.audioPool.push(id);
        
 
        // set finish callback
        cc.audioEngine.setFinishCallback(id, this.removeAudio.bind(this, id));
    },
    removeAudio (id) {
        var idx = this.audioPool.indexOf(id);
        if (idx > -1) {
            this.audioPool.splice(idx, 1);
        }
        
    },
});

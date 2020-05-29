// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        winPic:cc.SpriteFrame,
        losePic:cc.SpriteFrame,
        panel:cc.Node,
        prompt:cc.Label,
        picBox:cc.Sprite,
        stage:null,
        overTip:null,
        successMusic:{
            default:null,
            type:cc.AudioClip
        },
        failClip:{
            default:null,
            type:cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        this.prompt.string="疫情在您的有力治理下得到控制。\n恭喜您，游戏通关";
        this.stage=cc.sys.localStorage.getItem("s_gameStage");
        this.overTip=cc.sys.localStorage.getItem("s_gameOver");
        cc.log(this.stage);
        this.panel.runAction(cc.moveTo(2,0,0).easing(cc.easeBackIn()));
        if(this.stage=="lose"){
            this.picBox.spriteFrame=this.losePic;
            this.current=cc.audioEngine.play(this.failClip, false, 1);
            if(this.overTip=="itemNotEnough"){
                this.prompt.string="由于物资储备严重不足，人们开始抗议，疫情无法控制。\n很抱歉，游戏失败";
            }
            else if(this.overTip=="numExceed"){
                this.prompt.string="患病人数过多，严重超过医院承载能力，疫情无法控制。\n很抱歉，游戏失败";
            }
            
        }
        else if(this.stage=="win"){
            this.current=cc.audioEngine.play(this.successMusic, false, 1);
            this.picBox.spriteFrame=this.winPic;
            this.prompt.string="疫情在您的有力治理下得到控制。\n恭喜您，游戏通关";
        }
    },

    againOnClick(){
        cc.director.loadScene("社区防疫");
    },

    exitOnClick(){
        cc.director.loadScene("衔接场景");
    },

    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    }
});

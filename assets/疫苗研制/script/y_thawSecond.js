// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        safeBox:cc.Node,
        itemLayOut:cc.Node,
        afterChange:cc.SpriteFrame,
        sceneControl:cc.Node,
        showTimeLabel:cc.Label,
        successClip:{
            default:null,
            type:cc.AudioClip
        },
        timeProcessClip:{
            default:null,
            type:cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.itemLayOut=this.itemLayOut.getComponent("y_itemControl");
        this.sceneControl=this.sceneControl.getComponent("y_sceneController");
    },

    putFinished(box){
        cc.audioEngine.playEffect(this.successClip,false);
       
        box.node.destroy();
        this.safeBox.getComponent(cc.Sprite).spriteFrame=this.afterChange;
        this.safeBox.width=330;
        this.safeBox.height=200;
        this.tempTime=30;
        cc.audioEngine.playEffect(this.timeProcessClip,false);
        this.scheduleOnce(function(){
            cc.audioEngine.playEffect(this.timeProcessClip,false);
        }.bind(this),5);
        this.schedule(function(){
            this.showTimeLabel.string=this.tempTime+"分钟";
            this.sceneControl.changeSidePrompt("解冻还需\n"+this.tempTime+"\n分钟\n请耐心等待");
            this.tempTime-=1;
           
        }.bind(this),0.33,30,1);
        this.scheduleOnce(function(){
            this.sceneControl.changeSidePrompt("解冻完成\n获得物品\n病毒样品\n裂解液\n移液管\n微离心管");
            this.showTimeLabel.string="";
            this.sceneControl.changeStage(2);
            
            
        }.bind(this),11.5);
    },

    
    // update (dt) {},
});

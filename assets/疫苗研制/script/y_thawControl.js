// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        stage:0,
        thawButton:cc.Node,
        beforeThaw:cc.Node,
        afterThaw:cc.Node,
        yangpinBox:cc.Node,
        itemLayOut:cc.Node,
        itemAdd:cc.Prefab,
        sceneControl:cc.Node,
        successClip:{
            default:null,
            type:cc.AudioClip
        }

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //stage 0:未开始操作  1:解冻开启
        this.stage=0;
        this.itemLayOut=this.itemLayOut.getComponent("y_itemControl");
        this.sceneControl=this.sceneControl.getComponent("y_sceneController");
    },



    thawButtonOnClick(){
        cc.audioEngine.playEffect(this.successClip,false);
        this.sceneControl.changeSidePrompt("操作的时候\n注意防护哦，\n不要冻伤自己，\n同时不要让病毒泄露哦");
        this.thawButton.getComponent(cc.Button).interactable=false;
        this.stage=1;
        var delayTime=0.8;
        var fadeAction=cc.fadeOut(delayTime);
        this.beforeThaw.runAction(fadeAction);
        
        this.scheduleOnce(function(){
            this.beforeThaw.active=false;
            this.afterThaw.active=true;
            var seq=cc.sequence(cc.fadeIn(1),cc.moveBy(1,-120,0));
            this.afterThaw.runAction(seq);
            this.yangpinBox.active=true;
            this.yangpinBox.runAction(cc.sequence(cc.fadeIn(1),cc.moveBy(1,130,0)));
            this.scheduleOnce(function(){
                 
                 this.itemLayOut.add(this.yangpinBox,"样品毒株",[this.beforeThaw,this.afterThaw],0.5);
                 this.scheduleOnce(function(){
                    this.sceneControl.changeStage(1);
                 }.bind(this),3.2);
                // this.scheduleOnce(function(){
                //     this.yangpinBox.runAction(cc.scaleBy(1,0.5));
                //      this.itemLayOut.addItem();
                //      this.yangpinBox.runAction(cc.moveTo(1,this.itemLayOut.getFinalLoc(this.node)));
                //      this.scheduleOnce(function(){
                //         this.itemLayOut.showItem(this.afterThaw.getComponent(cc.Sprite).spriteFrame); 
                //         this.yangpinBox.destroy();
                //      }.bind(this),2);
                // }.bind(this),1);

            }.bind(this),2);
            
        }.bind(this),delayTime+0.02);
        
    },



    // update (dt) {},
});

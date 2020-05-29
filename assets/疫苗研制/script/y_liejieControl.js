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
        //0:还未进行任何操作
        //1：将病毒从样品中取出
        //2：病毒注入微液管
        //3：取裂解液
        //4：裂解液注入微液管
        processing:0,
        itemLayOut:cc.Node,
        sceneControl:cc.Node,
        lixinguan1:cc.SpriteFrame,
        lixinguan2:cc.SpriteFrame,
        workButton:cc.Button,
        buttonLabel:cc.Label,
        successClip:{
            default:null,
            type:cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.workButton.node.active=false;
        this.itemLayOut=this.itemLayOut.getComponent("y_itemControl");
        this.sceneControl=this.sceneControl.getComponent("y_sceneController");
    },

    moveProcess(self,other){
        var selfName=self.name;
        var otherName=other.name;
        switch(this.stage){
            case 0:
                if((selfName=="已解冻毒株"&&otherName=="微量移液管")||(selfName=="微量移液管"&&otherName=="已解冻毒株")){
                    this.workButton.node.active=true;
                    this.processing=1;
                    this.buttonLabel.string="将病毒样品取出";
                    cc.audioEngine.playEffect(this.successClip,false);
                }
                break;
            case 1:
                if((selfName=="离心管"&&otherName=="微量移液管")||(selfName=="微量移液管"&&otherName=="离心管")){
                    this.workButton.node.active=true;
                    this.processing=1;
                    this.buttonLabel.string="将病毒样品\n注入离心管";
                    cc.audioEngine.playEffect(this.successClip,false);
                }
                break;
            case 2:
                if((selfName=="裂解液"&&otherName=="微量移液管")||(selfName=="微量移液管"&&otherName=="裂解液")){
                    this.workButton.node.active=true;
                    this.processing=1;
                    this.buttonLabel.string="将病毒裂解液取出";
                    cc.audioEngine.playEffect(this.successClip,false);
                }
                break;
            case 3:
                if((selfName=="离心管"&&otherName=="微量移液管")||(selfName=="微量移液管"&&otherName=="离心管")){
                    this.workButton.node.active=true;
                    this.processing=1;
                    this.buttonLabel.string="将裂解液\n注入离心管";
                    cc.audioEngine.playEffect(this.successClip,false);
                }
                break;
        }
    },
    

    workButtonOnClick(){
        if(this.processing==1){
            switch(this.stage){
                case 0:
                    var node=this.node.getChildByName("已解冻毒株");
                    if(node!=undefined){
                        
                        node.runAction(cc.fadeOut(0.5));
                        this.scheduleOnce(function(){node.destroy();}.bind(this),0.5);
                        this.stage=1;
                        this.processing=0;
                        this.workButton.node.active=false;
                        cc.audioEngine.playEffect(this.successClip,false);
                    }
                    
                    break;
                case 1:
                    var node=this.node.getChildByName("离心管");
                    if(node!=undefined){
                        node.getComponent(cc.Sprite).spriteFrame=this.lixinguan1;
                        this.stage=2;
                        this.processing=0;
                        this.workButton.node.active=false;
                        cc.audioEngine.playEffect(this.successClip,false);
                    }
                    break;
                case 2:
                    var node=this.node.getChildByName("裂解液");
                    if(node!=undefined){
                        node.runAction(cc.fadeOut(0.5));
                        this.scheduleOnce(function(){node.destroy();}.bind(this),0.5);
                        this.stage=3;
                        this.processing=0;
                        this.workButton.node.active=false;
                        cc.audioEngine.playEffect(this.successClip,false);
                    }
                    break;
                case 3:
                    var node1=this.node.getChildByName("离心管");
                    var node2=this.node.getChildByName("微量移液管");
                    cc.audioEngine.playEffect(this.successClip,false);
                    if(node1!=undefined&&node2!=undefined){
                        node1.getComponent(cc.Sprite).spriteFrame=this.lixinguan2;
                        node2.runAction(cc.fadeOut(0.5));
                        this.scheduleOnce(function(){node2.destroy();}.bind(this),1);
                        this.itemLayOut.add(node1,"混合试剂",[],1);
                        this.scheduleOnce(function(){
                            this.sceneControl.changeSidePrompt("请将病毒裂解液\n放在涡旋振荡器上\n进行震荡，\n充分混匀");
                            this.scheduleOnce(function(){
                                this.sceneControl.changeStage(3);
                            }.bind(this),2);
                            
                        }.bind(this),1.5);
                        this.stage=4;
                        this.processing=0;
                        this.workButton.node.active=false;
                    }
                    
                    break;
            }
        }
        
    }
    // update (dt) {},
});

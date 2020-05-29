// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        showStage:cc.Label,
        sceneControl:cc.Node,
        stage:0,
        successClip:{
            default:null,
            type:cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.stage=0;
        this.sceneControl=this.sceneControl.getComponent("y_sceneController");
    },



    moveProcess(self,other){
        if(this.stage==0){
            if((self.name=="微量移液管"&&other.name=="样品")||(self.name=="样品"&&other.name=="微量移液管")){
                cc.audioEngine.playEffect(this.successClip,false);
                this.showStage.string="吸取完成";
                this.node.getChildByName("样品").destroy();
                this.stage=1;
            }
        }
        if(this.stage==1){
            if((self.name=="微量移液管"&&other.name=="离心管")||(self.name=="离心管"&&other.name=="微量移液管")){
                cc.audioEngine.playEffect(this.successClip,false);
                this.showStage.string="注入完成";
                this.node.getChildByName("微量移液管").destroy();
                this.scheduleOnce(function(){
                    this.node.getChildByName("离心管").destroy();
                    this.scheduleOnce(function(){
                        this.sceneControl.changeStage(5);
                    }.bind(this),1);
                }.bind(this),1);

                this.stage=2;
            }
        }
    }
    // update (dt) {},
});

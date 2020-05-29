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
        successClip:{
            default:null,
            type:cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.sceneControl=this.sceneControl.getComponent("y_sceneController");
    },


    onCollisionEnter: function (other, self) {
        
        if(other.node.name=="混合试剂"){
            cc.audioEngine.playEffect(this.successClip,false);
            other.node.destroy();
            this.showStage.string="处理中，请等待";
            this.scheduleOnce(function(){
                this.showStage.string="处理完成";
                this.scheduleOnce(function(){
                    this.node.runAction(cc.fadeOut(1));
                }.bind(this),1);
            }.bind(this),2);

            this.scheduleOnce(function(){
                this.sceneControl.changeStage(4);
            }.bind(this),3.5);
            
        }
    },

    // update (dt) {},
});

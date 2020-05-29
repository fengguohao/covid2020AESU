// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        uicontrol:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    start () {
        this.uicontrol=this.uicontrol.getComponent("UIcontrol");
        this.scheduleOnce(function() {
            this.node.runAction(cc.moveTo(3.5, 780, 0));
            this.uicontrol.Walk(this.node,1,"down");

        }, 15);
        this.scheduleOnce(function() {
            this.node.runAction(cc.moveTo(40, 2600, 0));
            this.uicontrol.Walk(this.node,1,"right");


        }, 18.5);
        this.scheduleOnce(function() {
            
            this.uicontrol.Walk(this.node,1,"stop");


        },60);
    },

    onload () {
        
    },

    // update (dt) {},
});

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        showLabel:cc.Label,
        dataFrom:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

     update (dt) {
         this.showLabel.string="感染概率：\n"+this.dataFrom.getComponent("gamePlayer").infectPossibility + '%'/*+"  "+this.dataFrom.getComponent("gamePlayer").direction*/;
     },
});

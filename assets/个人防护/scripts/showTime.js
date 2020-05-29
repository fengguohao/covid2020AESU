// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.time = 0;
        var func = cc.callFunc(function() {
            this.time++;
        }.bind(this));
        var remain = cc.fadeTo(1, 255);
        this.node.runAction(cc.sequence([remain, func])).repeatForever();
        
    },

    start () {

    },

    update (dt) {
        var l = this.node.getComponent(cc.Label);
        l.string = "用时：" + this.time + "秒";
    },
});

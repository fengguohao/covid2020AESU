// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        promptBox: {
            default: null,
            type: cc.Node,
        },

        buttonConfirm: {
            default: null,
            type: cc.Node,
        },

        show: {
            default: null,
            type: cc.Node,
        },

        controlLimit: {
            default: null,
            type: cc.Node,
        },

        control: {
            default: null,
            type: cc.Node,
        },

        gamePlayer: {
            default: null,
            type: cc.Node,
        },
        audioMgr:{
            default: null,
            type: cc.Node,
        }

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onClick: function() {

        var gamePlayer = this.gamePlayer.getComponent('gamePlayer');

        if(Math.abs(this.gamePlayer.x - this.node.x) <= 100 && Math.abs(this.gamePlayer.y - this.node.y) <= 40 
        && gamePlayer.direction === 'left' && gamePlayer.direction !== 'down') {
            this.control.x = this.control.getComponent('UIcontrol').defaultPos.x;
            this.control.y = this.control.getComponent('UIcontrol').defaultPos.y;
            this.controlLimit.active = false;
            this.control.getComponent('UIcontrol').ontouch = 0;
            this.promptBox.active = true;
            this.buttonConfirm.active = true;
            var tell = this.show.getComponent(cc.Label);
            tell.string = "你已如厕~";
            this.audioMgr.playMusic("toliet");
            gamePlayer.hasReleased = true;
        }

        /*
        cc.log("洗手池的位置：", this.node.x, this.node.y);
        cc.log("玩家的位置：", this.gamePlayer.x, this.gamePlayer.y);
        cc.log("坐标差的绝对值：", Math.abs(this.gamePlayer.x - this.node.x), Math.abs(this.gamePlayer.y - this.node.y));
        */
    },

    start () {
        this.audioMgr=this.audioMgr.getComponent("AudioMgr");
    },

    // update (dt) {},
});

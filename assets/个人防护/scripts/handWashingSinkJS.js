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

    start () {
        this.audioMgr=this.audioMgr.getComponent("AudioMgr");
    },

    onClick: function() {

        var gamePlayer = this.gamePlayer.getComponent('gamePlayer');

        if(Math.abs(this.gamePlayer.x - this.node.x) <= 80 && Math.abs(this.gamePlayer.y - this.node.y) <= 60
         && gamePlayer.hasReleased === false && gamePlayer.direction !== "down" && gamePlayer.direction !== "right") {
            this.control.x = this.control.getComponent('UIcontrol').defaultPos.x;
            this.control.y = this.control.getComponent('UIcontrol').defaultPos.y;
            this.controlLimit.active = false;
            this.control.getComponent('UIcontrol').ontouch = 0;
            this.promptBox.active = true;
            this.buttonConfirm.active = true;
            var tell = this.show.getComponent(cc.Label);
            tell.string = "你已洗手~";
            gamePlayer.hasWashedHandsBefore = true;
            this.audioMgr.playMusic("washHands");
        }

        if(Math.abs(this.gamePlayer.x - this.node.x) <= 80 && Math.abs(this.gamePlayer.y - this.node.y) <= 60
         && gamePlayer.hasReleased === true && gamePlayer.direction !== "down" && gamePlayer.direction !== "right") {
            this.control.x = this.control.getComponent('UIcontrol').defaultPos.x;
            this.control.y = this.control.getComponent('UIcontrol').defaultPos.y;
            this.controlLimit.active = false;
            this.control.getComponent('UIcontrol').ontouch = 0;
            this.promptBox.active = true;
            this.buttonConfirm.active = true;
            var tell = this.show.getComponent(cc.Label);
            tell.string = "你已洗手~";
            gamePlayer.hasWashedHandsAfter = true;
            this.audioMgr.playMusic('washHands');
        }
        /*
        cc.log("是否已上厕所：", gamePlayer.hasReleased);
        cc.log("玩家的方向：", gamePlayer.direction);
        cc.log("洗手池的位置：", this.node.x, this.node.y);
        cc.log("玩家的位置：", this.gamePlayer.x, this.gamePlayer.y);
        cc.log("坐标差的绝对值：", Math.abs(this.gamePlayer.x - this.node.x), Math.abs(this.gamePlayer.y - this.node.y));
        */
    },

    // update (dt) {},
});

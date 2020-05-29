// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        buttonYes: {
            default: null,
            type: cc.Node,
        },

        buttonNo: {
            default: null,
            type: cc.Node,
        },

        buttonConfirm: {
            default: null,
            type: cc.Node,
        },

        promptBox: {
            default: null,
            type: cc.Node,
        },

        Neighbor01: {
            default: null,
            type: cc.TextAsset,
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
        hasAdded: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.promptBox.active = false;
        this.buttonYes.active = false;
        this.buttonNo.active = false;
        this.buttonConfirm.active = false;
        this.node.active = false;
        var neighbor = this.node.getComponent(cc.Label);

        this.hasLaunched = false;

        this.node.on("shortDistanceNeighbor", function() {

            if(this.hasAdded === false) {
                this.promptBox.active = true;
                this.buttonYes.active = true;
                this.buttonNo.active = true;
                this.node.active = true;
                this.node.getComponent(cc.Label).string = this.Neighbor01.text;
                this.control.x = this.control.getComponent('UIcontrol').defaultPos.x;
                this.control.y = this.control.getComponent('UIcontrol').defaultPos.y;
                this.controlLimit.active = false;
                
            }

            /*
            this.buttonYes.on(cc.Node.EventType.TOUCH_END, function() {
                //this.node.dispatchEvent(new cc.Event.EventCustom("yes"));
                this.gamePlayer.getComponent('gamePlayer').infectPossibility += 25;
                neighbor = null;
                this.promptBox.active = false;
                this.buttonYes.active = false;
                this.buttonNo.active = false;
                this.node.active = false;
                this.controlLimit.active = true;
                this.control.getComponent('UIcontrol').ontouch = 0;
            }, this);
            this.buttonNo.on(cc.Node.EventType.TOUCH_END, function() {
                //this.node.dispatchEvent(new cc.Event.EventCustom("no"));
                this.promptBox.active = false;
                this.buttonYes.active = false;
                this.buttonNo.active = false;
                this.node.active = false;
                this.hasLaunched = true;
                this.controlLimit.active = true;
                this.control.getComponent('UIcontrol').ontouch = 0;                
            }, this);
            */
            
        }, this);

        /*
        this.node.on("yes", function() {
            this.gamePlayer.getComponent('gamePlayer').infectPossibility += 25;
            neighbor = null;
            this.promptBox.active = false;
            this.buttonYes.active = false;
            this.buttonNo.active = false;
            this.node.active = false;
            this.controlLimit.active = true;
            this.control.getComponent('UIcontrol').ontouch = 0;
        }, this);

        this.node.on("no", function() {
            this.promptBox.active = false;
            this.buttonYes.active = false;
            this.buttonNo.active = false;
            this.node.active = false;
            this.hasLaunched = true;
            this.controlLimit.active = true;
            this.control.getComponent('UIcontrol').ontouch = 0;
        }, this);
        */
        
    },

    start () {

    },

    onClickYes: function() {
        this.gamePlayer.getComponent('gamePlayer').infectPossibility += 25;
        this.hasAdded = true;
        this.promptBox.active = false;
        this.buttonYes.active = false;
        this.buttonNo.active = false;
        this.node.active = false;
        this.controlLimit.active = true;
        this.control.getComponent('UIcontrol').ontouch = 0;
    },

    onClickNo: function() {
        this.promptBox.active = false;
        this.buttonYes.active = false;
        this.buttonNo.active = false;
        this.node.active = false;
        this.hasLaunched = true;
        this.controlLimit.active = true;
        this.control.getComponent('UIcontrol').ontouch = 0;
    },

    // update (dt) {},
});

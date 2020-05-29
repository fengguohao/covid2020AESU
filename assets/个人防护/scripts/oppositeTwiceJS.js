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

        npc: {
            default: null,
            type: cc.Node,
        },

        control: {
            default: null,
            type: cc.Node,
        },

        OppositeTwice01: {
            default: null,
            type: cc.TextAsset,
        },
        OppositeTwice02: {
            default: null,
            type: cc.TextAsset,
        },
        OppositeTwice03: {
            default: null,
            type: cc.TextAsset,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.promptBox.active = false;
        this.node.active = false;
        var oppositeTwice = this.node.getComponent(cc.Label);

        this.node.on("OppositeTwice01", function() {
            if(oppositeTwice !== null) {
                this.promptBox.active = true;
                this.node.active = true;
                cc.director.getScheduler().pauseTarget(this.npc);
                cc.director.getScheduler().pauseTarget(this.control);
                oppositeTwice.string = this.OppositeTwice01.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("OppositeTwice02"));
                }, this);
            }
        }, this);

        this.node.on("OppositeTwice02", function() {
            if(oppositeTwice != null) {
                oppositeTwice.string = this.OppositeTwice02.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("OppositeTwice03"));
                }, this);
            }
        }, this);

        this.node.on("OppositeTwice03", function() {
            if(oppositeTwice !== null) {
                oppositeTwice.string = this.OppositeTwice03.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("endOppositeTwice"));
                }, this);
            }
        }, this);

        this.node.on("endOppositeTwice", function() {
            oppositeTwice = null;
            this.promptBox.active = false;
            this.node.active = false;
            cc.director.getScheduler().resumeTarget(this.npc);
            cc.director.getScheduler().resumeTarget(this.control);
            this.node.off("OppositeTwice01", function() {
                if(oppositeTwice !== null) {
                    this.node.active = true;
                    oppositeTwice.string = this.OppositeTwice01.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("OppositeTwice02"));
                    }, this);
                }
            }, this);
            this.node.off("OppositeTwice02", function() {
                if(oppositeTwice != null) {
                    oppositeTwice.string = this.OppositeTwice02.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("OppositeTwice03"));
                    }, this);
                }
            }, this);
            this.node.off("OppositeTwice03", function() {
                if(oppositeTwice !== null) {
                    oppositeTwice.string = this.OppositeTwice03.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("endOppositeTwice"));
                    }, this);
                }
            }, this);
        }, this);
    },

    start () {

    },

    // update (dt) {},
});

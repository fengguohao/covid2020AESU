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

        SameOnce01: {
            default: null,
            type: cc.TextAsset,
        },
        SameOnce02: {
            default: null,
            type: cc.TextAsset,
        },
        SameOnce03: {
            default: null,
            type: cc.TextAsset,
        },
        SameOnce04: {
            default: null,
            type: cc.TextAsset,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.promptBox.active = false;
        this.node.active = false;
        var sameOnce = this.node.getComponent(cc.Label);

        this.node.on("SameOnce01", function() {
            if(sameOnce !== null) {
                this.promptBox.active = true;
                this.node.active = true;
                cc.director.getScheduler().pauseTarget(this.npc);
                cc.director.getScheduler().pauseTarget(this.control);
                sameOnce.string = this.SameOnce01.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("SameOnce02"));
                }, this);
            }
        }, this);

        this.node.on("SameOnce02", function() {
            if(sameOnce !== null) {
                sameOnce.string = this.SameOnce02.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("SameOnce03"));
                }, this);
            }  
        }, this);

        this.node.on("SameOnce03", function() {
            if(sameOnce !== null) {
                sameOnce.string = this.SameOnce03.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("SameOnce04"));
                }, this);
            }
        }, this);

        this.node.on("SameOnce04", function() {
            if(sameOnce !== null) {
                sameOnce.string = this.SameOnce04.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("endSameOnce"));
                }, this);
            }
        }, this);

        this.node.on("endSameOnce", function() {
            sameOnce = null;
            this.promptBox.active = false;
            this.node.active = false;
            cc.director.getScheduler().resumeTarget(this.npc);
            cc.director.getScheduler().resumeTarget(this.control);
            this.node.off("SameOnce01", function() {
                if(sameOnce !== null) {
                    this.node.active = true;
                    sameOnce.string = this.SameOnce01.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("SameOnce02"));
                    }, this);
                }
            }, this);
            this.node.off("SameOnce02", function() {
                if(sameOnce !== null) {
                    sameOnce.string = this.SameOnce02.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("SameOnce03"));
                    }, this);
                }  
            }, this);
            this.node.off("SameOnce03", function() {
                if(sameOnce !== null) {
                    sameOnce.string = this.SameOnce03.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("SameOnce04"));
                    }, this);
                }
            }, this);
            this.node.off("SameOnce04", function() {
                if(sameOnce !== null) {
                    sameOnce.string = this.SameOnce04.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("endSameOnce"));
                    }, this);
                }
            }, this);
        }, this);
    },

    start () {

    },

    // update (dt) {},
});

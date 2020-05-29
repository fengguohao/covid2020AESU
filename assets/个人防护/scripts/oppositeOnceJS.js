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

        OppositeOnce01: {
            default: null,
            type: cc.TextAsset,
        },
        OppositeOnce02: {
            default: null,
            type: cc.TextAsset,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.promptBox.active = false;
        this.node.active = false;
        var oppositeOnce = this.node.getComponent(cc.Label);

        this.node.on("OppositeOnce01", function() {
            if(oppositeOnce !== null) {
                this.promptBox.active = true;
                this.node.active = true;
                cc.director.getScheduler().pauseTarget(this.npc);
                cc.director.getScheduler().pauseTarget(this.control);
                oppositeOnce.string = this.OppositeOnce01.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("OppositeOnce02"));
                }, this);
            }     
        }, this);

        this.node.on("OppositeOnce02", function() {
            if(oppositeOnce !== null) {
                oppositeOnce.string = this.OppositeOnce02.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("endOppositeOnce"));
                }, this);
            }               
        }, this);

        this.node.on("endOppositeOnce", function() {
            oppositeOnce = null;
            this.promptBox.active = false;
            this.node.active = false;
            cc.director.getScheduler().resumeTarget(this.npc);
            cc.director.getScheduler().resumeTarget(this.control);
            this.node.off("OppositeOnce01", function() {
                if(oppositeOnce !== null) {
                    this.node.active = true;
                    oppositeOnce.string = this.OppositeOnce01.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("OppositeOnce02"));
                    }, this);
                }     
            }, this);
            this.node.off("OppositeOnce02", function() {
                if(oppositeOnce !== null) {
                    oppositeOnce.string = this.OppositeOnce02.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("endOppositeOnce"));
                    }, this);
                }   
            }, this);
        }, this);
    },

    start () {

    },

    // update (dt) {},
});

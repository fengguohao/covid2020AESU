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

        SameTwice01: {
            default: null,
            type: cc.TextAsset,
        },
        SameTwice02: {
            default: null,
            type: cc.TextAsset,
        },
        SameTwice03: {
            default: null,
            type: cc.TextAsset,
        },
        SameTwice04: {
            default: null,
            type: cc.TextAsset,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.promptBox.active = false;
        this.node.active = false;
        var sameTwice = this.node.getComponent(cc.Label);

        this.node.on("SameTwice01", function() {
            if(sameTwice !== null) {
                this.promptBox.active = true;
                this.node.active = true;
                cc.director.getScheduler().pauseTarget(this.npc);
                cc.director.getScheduler().pauseTarget(this.control);
                sameTwice.string = this.SameTwice01.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("SameTwice02"));
                }, this);
            }
        }, this);

        this.node.on("SameTwice02", function() {
            if(sameTwice !== null) {
                sameTwice.string = this.SameTwice02.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("SameTwice03"));
                }, this);
            }   
        }, this);

        this.node.on("SameTwice03", function() {
            if(sameTwice !== null) {
                sameTwice.string = this.SameTwice03.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("SameTwice04"));
                }, this);
            }    
        }, this);

        this.node.on("SameTwice04", function() {
            if(sameTwice !== null) {
                sameTwice.string = this.SameTwice04.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("endSameTwice"));
                }, this);
            }   
        }, this);

        this.node.on("endSameTwice", function() {
            sameTwice = null;
            this.promptBox.active = false;
            this.node.active = false;
            cc.director.getScheduler().resumeTarget(this.npc);
            cc.director.getScheduler().resumeTarget(this.control);
            this.node.off("SameTwice01", function() {
                if(sameTwice !== null) {
                    this.node.active = true;
                    sameTwice.string = this.SameTwice01.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("SameTwice02"));
                    }, this);
                }
            }, this);
            this.node.off("SameTwice02", function() {
                if(sameTwice !== null) {
                    sameTwice.string = this.SameTwice02.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("SameTwice03"));
                    }, this);
                }   
            }, this);
            this.node.off("SameTwice03", function() {
                if(sameTwice !== null) {
                    sameTwice.string = this.SameTwice03.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("SameTwice04"));
                    }, this);
                }    
            }, this);
            this.node.off("SameTwice04", function() {
                if(sameTwice !== null) {
                    sameTwice.string = this.SameTwice04.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("endSameTwice"));
                    }, this);
                }   
            }, this);
        }, this);
    },

    start () {

    },

    // update (dt) {},
});

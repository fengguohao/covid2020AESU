// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
        information01: {
            default: null,
            type: cc.TextAsset,
        },

        information02: {
            default: null,
            type: cc.TextAsset,
        },

        information03: {
            default: null,
            type: cc.TextAsset,
        },

        information04: {
            default: null,
            type: cc.TextAsset,
        },

        information05: {
            default: null,
            type: cc.TextAsset,
        },

        information06: {
            default: null,
            type: cc.TextAsset,
        },

        information: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        var l = this.information.getComponent(cc.Label);
        l.string = "";

        var appear = cc.fadeTo(1.5, 200);
        var disappear = cc.fadeOut(1.5);
        var remain = cc.fadeTo(4, 200);
        var interval = cc.fadeTo(15, 0);

        var func1 = cc.callFunc(function() {
            l.string = this.information01.text;
        }.bind(this));
        var func2 = cc.callFunc(function() {
            l.string = this.information02.text;
        }.bind(this));
        var func3 = cc.callFunc(function() {
            l.string = this.information03.text;
        }.bind(this));
        var func4 = cc.callFunc(function() {
            l.string = this.information04.text;
        }.bind(this));
        var func5 = cc.callFunc(function() {
            l.string = this.information05.text;
        }.bind(this));
        var func6 = cc.callFunc(function() {
            l.string = this.information06.text;
        }.bind(this));

        this.node.runAction(cc.sequence([func1, appear, func1, 
            remain, func2, remain, func3, remain, func4, remain, 
            func5, remain, func6, remain, disappear, interval])).repeatForever();

    },

    start () {

    },

    // update (dt) {},
});

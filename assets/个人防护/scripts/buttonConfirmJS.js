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

        controlLimit: {
            default: null,
            type: cc.Node,
        },

        control: {
            default: null,
            type: cc.Node,
        }

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onClick: function() {

        this.controlLimit.active = true;
        this.control.getComponent('UIcontrol').ontouch = 0;
        this.promptBox.active = false;
        this.buttonConfirm.active = false;
        
    },

    start () {

    },

    // update (dt) {},
});

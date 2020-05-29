// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        if(this.node.parent.name === 'antiviral') {
            if(this.node.parent.parent.getComponent('antiviral').cooling1 !== 0) {
                this.node.getComponent(cc.Label).string = this.node.parent.parent.getComponent('antiviral').cooling1;
            } else {
                this.node.getComponent(cc.Label).string = '';            
            }            
        } else if(this.node.parent.name === 'antiCK') {
            if(this.node.parent.parent.getComponent('antiviral').cooling2 !== 0) {
                this.node.getComponent(cc.Label).string = this.node.parent.parent.getComponent('antiviral').cooling2;
            } else {
                this.node.getComponent(cc.Label).string = '';            
            }            
        } else if(this.node.parent.name === 'kafeidoukuang') {
            if(this.node.parent.getComponent('huohua').cooling !== 0) {
                this.node.getComponent(cc.Label).string = this.node.parent.getComponent('huohua').cooling;
            } else {
                this.node.getComponent(cc.Label).string = '';            
            }            
        } else {
            if(this.node.parent.getComponent('bozhong').cooling !== 0) {
                this.node.getComponent(cc.Label).string = this.node.parent.getComponent('bozhong').cooling;
            } else {
                this.node.getComponent(cc.Label).string = '';            
            }            
        }
    },
});

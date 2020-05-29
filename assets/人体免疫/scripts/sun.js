// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        sunNum: 100,
        total: 100,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.sunNum = 100;
        if(this.node.parent.parent.parent.parent.name === 'Level02') {
            this.sunNum = 200;
        } else if(this.node.parent.parent.parent.parent.name === 'Level03') {
            this.sunNum = 800;
        }
        this.total = this.sunNum;
    },

    start () {

    },

    checkFailure: function() {
        if(this.total >= 4000) {
            this.node.parent.parent.getComponent('gameControl').gameStatus = 'fail';
        }
    },

    update (dt) {
        
        var str = '现有细胞因子：';
        str += this.sunNum;
        str += '\n';
        str += '累计细胞因子：';
        str += this.total;
        this.node.getComponent(cc.Label).string = str;
        this.checkFailure();
    },
});

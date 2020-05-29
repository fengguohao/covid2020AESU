// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        jiangshi: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        var str = '正常细胞总数：';
        if(this.node.parent.parent.parent.parent.name === 'Level01') {
            str += '10';
        } else if(this.node.parent.parent.parent.parent.name === 'Level02') {
            str += '22';
        } else if(this.node.parent.parent.parent.parent.name === 'Level03') {
            str += '36';
        }
        str += '\n';
        str += '已经死亡数量：';
        var deadNum = 0;
        for(var i = 0; i < this.jiangshi.getComponent('zou').num; i++) {
            if(this.jiangshi.getComponent('zou').normalCell[i].active === false) {
                deadNum++;
            }
        }
        str += deadNum.toString();
        this.node.getComponent(cc.Label).string = str;
    },
});

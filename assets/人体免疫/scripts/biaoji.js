// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        caodi: cc.Node,
        hasFlag: [],
        flagRow: [],
        flagCol: [],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        var rect = this.caodi.getComponent('juxing').rect;
        for(var i = 0; i < 5; i++) {
            for(var j = 0; j < 9; j++) {
                for(var k = 0; k < this.node.getComponent('bozhong').num; k++) {
                    var worldSpace = this.node.getComponent('bozhong').sunFlower[k].convertToWorldSpaceAR(cc.v2(0, 0));
                    if(rect[i][j].contains(worldSpace)) {
                        this.hasFlag[k] = true;
                        this.flagRow[k] = i;
                        this.flagCol[k] = j;
                    }
                }
                
            }
        }
    },
});

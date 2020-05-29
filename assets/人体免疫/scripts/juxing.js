// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        rect: {
            default: null,
        },
        isEmpty: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //cc.log(cc.winSize.width);
        var adjust = (cc.winSize.width - 960) / 2;
        this.rect = new cc.Rect();
        for(var i = 0; i < 5; i++) {
            this.rect[i] = new cc.Rect();
            for(var j = 0; j < 9; j++) {
                this.rect[i][j] = new cc.Rect();
            }
        }

        this.isEmpty = new Array();
        for(var i = 0; i < 5; i++) {
            this.isEmpty[i] = new Array();
            for(var j = 0; j < 9; j++) {
                this.isEmpty[i][j] = new Array();
            }
        }
        for(var i = 0; i < 5; i++) {
            for(var j = 0; j < 9; j++) {
                this.isEmpty[i][j] = true;
            }
        }

        this.rect[0][0] = new cc.Rect(50 + adjust, 460, 100, 100);
        this.rect[0][1] = new cc.Rect(150 + adjust, 460, 100, 100);
        this.rect[0][2] = new cc.Rect(250 + adjust, 460, 100, 100);
        this.rect[0][3] = new cc.Rect(350 + adjust, 460, 100, 100);
        this.rect[0][4] = new cc.Rect(450 + adjust, 460, 100, 100);
        this.rect[0][5] = new cc.Rect(550 + adjust, 460, 100, 100);
        this.rect[0][6] = new cc.Rect(650 + adjust, 460, 100, 100);
        this.rect[0][7] = new cc.Rect(750 + adjust, 460, 100, 100);
        this.rect[0][8] = new cc.Rect(850 + adjust, 460, 100, 100);

        this.rect[1][0] = new cc.Rect(50 + adjust, 360, 100, 100);
        this.rect[1][1] = new cc.Rect(150 + adjust, 360, 100, 100);
        this.rect[1][2] = new cc.Rect(250 + adjust, 360, 100, 100);
        this.rect[1][3] = new cc.Rect(350 + adjust, 360, 100, 100);
        this.rect[1][4] = new cc.Rect(450 + adjust, 360, 100, 100);
        this.rect[1][5] = new cc.Rect(550 + adjust, 360, 100, 100);
        this.rect[1][6] = new cc.Rect(650 + adjust, 360, 100, 100);
        this.rect[1][7] = new cc.Rect(750 + adjust, 360, 100, 100);
        this.rect[1][8] = new cc.Rect(850 + adjust, 360, 100, 100);

        this.rect[2][0] = new cc.Rect(50 + adjust, 260, 100, 100);
        this.rect[2][1] = new cc.Rect(150 + adjust, 260, 100, 100);
        this.rect[2][2] = new cc.Rect(250 + adjust, 260, 100, 100);
        this.rect[2][3] = new cc.Rect(350 + adjust, 260, 100, 100);
        this.rect[2][4] = new cc.Rect(450 + adjust, 260, 100, 100);
        this.rect[2][5] = new cc.Rect(550 + adjust, 260, 100, 100);
        this.rect[2][6] = new cc.Rect(650 + adjust, 260, 100, 100);
        this.rect[2][7] = new cc.Rect(750 + adjust, 260, 100, 100);
        this.rect[2][8] = new cc.Rect(850 + adjust, 260, 100, 100);

        this.rect[3][0] = new cc.Rect(50 + adjust, 160, 100, 100);
        this.rect[3][1] = new cc.Rect(150 + adjust, 160, 100, 100);
        this.rect[3][2] = new cc.Rect(250 + adjust, 160, 100, 100);
        this.rect[3][3] = new cc.Rect(350 + adjust, 160, 100, 100);
        this.rect[3][4] = new cc.Rect(450 + adjust, 160, 100, 100);
        this.rect[3][5] = new cc.Rect(550 + adjust, 160, 100, 100);
        this.rect[3][6] = new cc.Rect(650 + adjust, 160, 100, 100);
        this.rect[3][7] = new cc.Rect(750 + adjust, 160, 100, 100);
        this.rect[3][8] = new cc.Rect(850 + adjust, 160, 100, 100);

        this.rect[4][0] = new cc.Rect(50 + adjust, 60, 100, 100);
        this.rect[4][1] = new cc.Rect(150 + adjust, 60, 100, 100);
        this.rect[4][2] = new cc.Rect(250 + adjust, 60, 100, 100);
        this.rect[4][3] = new cc.Rect(350 + adjust, 60, 100, 100);
        this.rect[4][4] = new cc.Rect(450 + adjust, 60, 100, 100);
        this.rect[4][5] = new cc.Rect(550 + adjust, 60, 100, 100);
        this.rect[4][6] = new cc.Rect(650 + adjust, 60, 100, 100);
        this.rect[4][7] = new cc.Rect(750 + adjust, 60, 100, 100);
        this.rect[4][8] = new cc.Rect(850 + adjust, 60, 100, 100);
        
    },

    start () {
    },

    // update (dt) {},
});

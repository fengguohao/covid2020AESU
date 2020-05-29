// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        sunFlower: [cc.Node],
        sunNum: cc.Node,
        sp: {
            default: null,
            type: cc.SpriteFrame,
        },
        num: 0,
        caodi: {
            default: null,
            type: cc.Node,
        },
        TCellFrame: cc.Node,
        THelperCellFrame: cc.Node,
        TCytotoxicCellFrame: cc.Node,
        clip1: {
            default: null,
            type: cc.AudioClip,
        },
        clip2: {
            default: null,
            type: cc.AudioClip,
        },
        huohua: {
            default: null,
            type: cc.AnimationClip,
        },
        isSleeping: false,
        cooling: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var s;
        var i = -1;
        var rect = this.caodi.getComponent('juxing').rect;
        this.node.on(cc.Node.EventType.TOUCH_START, function() {
            i++;
            if(this.sunNum.getComponent('sun').sunNum >= 50 && this.isSleeping === false) {
                this.sunFlower[i] = new cc.Node();
                s = this.sunFlower[i].addComponent(cc.Sprite);
                s.spriteFrame = this.sp;
                this.sunFlower[i].parent = this.node;
            } else {
                cc.audioEngine.play(this.clip2, false, 1);
            }
        }.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
            if(this.sunFlower[i] !== undefined) {
                var delta = e.getDelta();
                this.sunFlower[i].x += delta.x;
                this.sunFlower[i].y += delta.y;
            }
        }.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, function() {
            if(this.sunFlower[i] !== undefined) {
                this.sunFlower[i].destroy();
            }
            i--;
        }.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function() {
            if(this.sunFlower[i] !== undefined) {
                var hasPut = false;
                for(var row = 0; row < 5; row++) {
                    for(var col = 0; col < 9; col++) {
                        for(var k = 0; k < this.TCellFrame.getComponent('bozhong').num; k++) {
                            var worldSpace = this.sunFlower[i].convertToWorldSpaceAR(cc.v2(0, 0));
                            if(rect[row][col].contains(worldSpace) && this.TCellFrame.getComponent('biaoji').hasFlag[k] === true &&
                            row === this.TCellFrame.getComponent('biaoji').flagRow[k] &&
                            col === this.TCellFrame.getComponent('biaoji').flagCol[k]) {
                                this.sunFlower[i].setPosition(this.caodi.convertToNodeSpaceAR(cc.v2(86.3 + col*100 + (cc.winSize.width-960)/2, 506.4 - row*100 + 30)));
                                this.sunFlower[i].parent = this.caodi;
                                this.num++;
                                hasPut = true;
                                this.sunNum.getComponent('sun').sunNum -= 50;
                                var ani = this.TCellFrame.getComponent('bozhong').sunFlower[k].addComponent(cc.Animation);
                                ani.addClip(this.huohua, 'Thuohua');
                                ani.node = this.TCellFrame.getComponent('bozhong').sunFlower[k];
                                ani.play('Thuohua');
                                this.activateT(i, k, row, col);
                                this.sleep();
                            }
                        }                   
                    }
                }
                if(hasPut === false) {
                    this.sunFlower[i].destroy();
                    i--;
                }
            } else {
                i--;
            }
        }.bind(this));
    },

    start () {

    },

    activateT: function(i, k, row, col) {
        this.scheduleOnce(function() {
            this.sunFlower[i].active = false;
            //活化T细胞
            this.TCellFrame.getComponent('bozhong').sunFlower[k].active = false;
            cc.audioEngine.play(this.clip1, false, 1);
            this.caodi.getComponent('juxing').isEmpty[row][col] = true;
            this.THelperCellFrame.getComponent('THelperCell').store++;
            this.TCytotoxicCellFrame.getComponent('TCytotoxicCell').store++;
        }, 2);
    },

    sleep: function() {
        this.cooling = 8;
        var start = cc.callFunc(function() {
            this.cooling--;
        }.bind(this))
        var remain = cc.fadeTo(1, 255);
        var stop = cc.callFunc(function() {
            if(this.cooling === 0) {
                this.isSleeping = false;
                this.node.color = new cc.Color(255, 255, 255);
                this.node.stopAllActions();
            }
        }.bind(this));
        this.isSleeping = true;
        this.node.color = new cc.Color(127, 127, 127);
        this.node.runAction(cc.sequence([remain, start, stop])).repeatForever();
    },

    // update (dt) {},
});

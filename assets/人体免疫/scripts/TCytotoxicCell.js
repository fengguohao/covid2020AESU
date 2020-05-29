// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        store: 0,
        num: 0,
        sunFlower: [cc.Node],
        sp: cc.SpriteFrame,
        caodi: cc.Node,
        sunNum: cc.Node,
        currentRow: null,
        currentCol: null,
        clip: {
            default: null,
            type: cc.AudioClip,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.store = 0;
        this.num = 0;
        this.currentRow = new Array();
        this.currentCol = new Array();
        var s;
        var i = -1;
        var rect = this.caodi.getComponent('juxing').rect;
        var isEmpty = this.caodi.getComponent('juxing').isEmpty;
        this.node.on(cc.Node.EventType.TOUCH_START, function() {
            i++;
            if(this.store > 0) {
                this.sunFlower[i] = new cc.Node();
                s = this.sunFlower[i].addComponent(cc.Sprite);
                s.spriteFrame = this.sp;
                this.sunFlower[i].parent = this.node;
            } else {
                cc.audioEngine.play(this.clip, false, 1);
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
                var worldSpace = this.sunFlower[i].convertToWorldSpaceAR(cc.v2(0, 0));
                var hasPut = false;
                //cc.log(worldSpace);
                for(var row = 0; row < 5; row++) {
                    for(var col = 0; col < 9; col++) {
                        if(isEmpty[row][col] === true && rect[row][col].contains(worldSpace)) {
                            this.sunFlower[i].setPosition(this.caodi.convertToNodeSpaceAR(cc.v2(86.3 + col*100 + (cc.winSize.width-960)/2, 506.4 - row*100)));
                            this.sunFlower[i].parent = this.caodi;
                            this.num++;
                            this.store--;
                            isEmpty[row][col] = false;
                            hasPut = true;
                            this.currentRow[i] = row;
                            this.currentCol[i] = col;
                            this.canMove(i);
                            this.canProduce(i);
                        }
                    }
                }
                if(hasPut === false) {
                    this,sunFlower[i].destroy();
                    i--;
                }
            } else {
                i--;
            }
        }.bind(this));

    },

    canMove: function(i) {
        var rect = this.caodi.getComponent('juxing').rect;
        var isEmpty = this.caodi.getComponent('juxing').isEmpty;
        this.sunFlower[i].on(cc.Node.EventType.TOUCH_START, function() {
            //cc.log('节点被触摸，i = ',i);
            var anotherWorldSpace = this.sunFlower[i].convertToWorldSpaceAR(cc.v2(0, 0));
            for(var ii = 0; ii < 5; ii++) {
                for(var jj = 0; jj < 9; jj++) {
                    if(rect[ii][jj].contains(anotherWorldSpace)) {
                        this.currentRow[i] = ii;
                        this.currentCol[i] = jj;
                    }
                }
            }
        }.bind(this));
        this.sunFlower[i].on(cc.Node.EventType.TOUCH_MOVE, function(e) {
            var delta = e.getDelta();
            this.sunFlower[i].x += delta.x;
            this.sunFlower[i].y += delta.y;
        }.bind(this));
        this.sunFlower[i].on(cc.Node.EventType.TOUCH_END, function() {
            //cc.log('节点取消移动，i = ',i);
            var anotherWorldSpace = this.sunFlower[i].convertToWorldSpaceAR(cc.v2(0, 0));
            var anotherHasPut = false;
            for(var anotherRow = 0; anotherRow < 5; anotherRow++) {
                for(var anotherCol = 0; anotherCol < 9; anotherCol++) {
                    if(isEmpty[anotherRow][anotherCol] === true && rect[anotherRow][anotherCol].contains(anotherWorldSpace)) {
                        this.sunFlower[i].setPosition(this.caodi.convertToNodeSpaceAR(cc.v2(86.3 + anotherCol*100 + (cc.winSize.width-960)/2, 506.4 - anotherRow*100)));
                        isEmpty[anotherRow][anotherCol] = false;
                        isEmpty[this.currentRow[i]][this.currentCol[i]] = true;
                        anotherHasPut = true;
                        this.currentRow[i] = anotherRow;
                        this.currentCol[i] = anotherCol;
                    }
                }
            }
            if(anotherHasPut === false) {
                this.sunFlower[i].setPosition(this.caodi.convertToNodeSpaceAR(cc.v2(86.3 + this.currentCol[i]*100 + (cc.winSize.width-960)/2, 506.4 - this.currentRow[i]*100)));
            }
        }.bind(this));
    },

    canProduce: function(i) {
        this.schedule(function() {
            if(this.sunFlower[i].active === true) {
                this.sunNum.getComponent('sun').sunNum += 25;
                this.sunNum.getComponent('sun').total += 25;
            }           
        }, 30, cc.macro.REPEAT_FOREVER, 15);
    },

    start () {

    },

    update (dt) {
        if(this.store === 0 && this.node.color != cc.Color(127, 127, 127)) {
            this.node.color = new cc.Color(127, 127, 127);
        } else if(this.store > 0 && this.node.color != cc.Color(255, 255, 255)) {
            this.node.color = new cc.Color(255, 255, 255);
        }        
    },
});

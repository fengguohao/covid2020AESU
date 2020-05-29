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
        sp: {
            default: null,
            type: cc.SpriteFrame,
        },
        i: -1,
        num: 0,
        caodi: {
            default: null,
            type: cc.Node,
        },
        sunNum: cc.Node,
        currentRow: null,
        currentCol: null,
        clip1: {
            default: null,
            type: cc.AudioClip,
        },
        clip2: {
            default: null,
            type: cc.AudioClip,
        },
        clip3: {
            default: null,
            type: cc.AudioClip,
        },
        isSleeping: [],
        cooling: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        for(var i = 0; i < 5; i++) {
            this.isSleeping[i] = false;
        }

        var rect = this.caodi.getComponent('juxing').rect;
        var isEmpty = this.caodi.getComponent('juxing').isEmpty;
        this.currentRow = new Array();
        this.currentCol = new Array();
        this.node.on(cc.Node.EventType.TOUCH_START, function() {
            this.i++;
            if(this.node.name === 'wandoukuang' && this.sunNum.getComponent('sun').sunNum >= 150 && this.isSleeping[0] === false) {
                this.conduct();
            } else if(this.node.name === 'dazuihuakuang' && this.sunNum.getComponent('sun').sunNum >= 50 && this.isSleeping[1] === false) {
                this.conduct();
                //cc.log(this.sunNum.getComponent('sun').sunNum);
            } else if(this.node.name === 'BCellkuang' && this.sunNum.getComponent('sun').sunNum >= 200 && this.isSleeping[2] === false) {
                this.conduct();
            } else if(this.node.name === 'TCellkuang' && this.sunNum.getComponent('sun').sunNum >= 200 && this.isSleeping[3] === false) {
                this.conduct();
            } else if(this.node.name === 'macrophagekuang' && this.sunNum.getComponent('sun').sunNum >= 100 && this.isSleeping[4] === false) {
                this.conduct();
            } else if(this.node.name === 'wandoukuang' && (this.sunNum.getComponent('sun').sunNum < 150 || this.isSleeping[0] === true)) {
                cc.audioEngine.play(this.clip2, false, 1);
            } else if(this.node.name === 'dazuihuakuang' && (this.sunNum.getComponent('sun').sunNum < 50 || this.isSleeping[1] === true)) {
                cc.audioEngine.play(this.clip2, false, 1);
            } else if(this.node.name === 'BCellkuang' && (this.sunNum.getComponent('sun').sunNum < 200 || this.isSleeping[2] === true)) {
                cc.audioEngine.play(this.clip2, false, 1);
            } else if(this.node.name === 'TCellkuang' && (this.sunNum.getComponent('sun').sunNum < 200 || this.isSleeping[3] === true)) {
                cc.audioEngine.play(this.clip2, false, 1);
            } else if(this.node.name === 'macrophagekuang' && (this.sunNum.getComponent('sun').sunNum < 100 || this.isSleeping[4] === true)) {
                cc.audioEngine.play(this.clip2, false, 1);
            }
        }.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
            if(this.sunFlower[this.i] !== undefined) {
                var delta = e.getDelta();
                this.sunFlower[this.i].x += delta.x;
                this.sunFlower[this.i].y += delta.y;
            }
        }.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, function() {
            if(this.sunFlower[this.i] !== undefined) {
                this.sunFlower[this.i].destroy();
                this.i--;
            } else {
                this.i--;
            }           
        }.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function() {
            if(this.sunFlower[this.i] !== undefined) {
                var worldSpace = this.sunFlower[this.i].convertToWorldSpaceAR(cc.v2(0, 0));
                var hasPut = false;
                //cc.log(worldSpace);
                for(var row = 0; row < 5; row++) {
                    for(var col = 0; col < 9; col++) {
                        if(isEmpty[row][col] === true && rect[row][col].contains(worldSpace)) {
                            this.sunFlower[this.i].setPosition(this.caodi.convertToNodeSpaceAR(cc.v2(86.3 + col*100 + (cc.winSize.width-960)/2, 506.4 - row*100)));
                            this.sunFlower[this.i].parent = this.caodi;
                            this.num++;
                            isEmpty[row][col] = false;
                            hasPut = true;
                            this.currentRow[this.i] = row;
                            this.currentCol[this.i] = col;
                            this.canMove(this.i);
                            this.canProduce(this.i);
                            cc.audioEngine.play(this.clip1, false, 1);
                            if(this.node.name === 'wandoukuang') {
                                this.sunNum.getComponent('sun').sunNum -= 150;
                                this.sleep('wandoukuang', 0);
                            } else if(this.node.name === 'dazuihuakuang') {
                                this.sunNum.getComponent('sun').sunNum -= 50;
                                this.sleep('dazuihuakuang', 1);
                            } else if(this.node.name === 'BCellkuang') {
                                this.sunNum.getComponent('sun').sunNum -= 200;
                                this.sleep('BCellkuang', 2);
                            } else if(this.node.name === 'TCellkuang') {
                                this.sunNum.getComponent('sun').sunNum -= 200;
                                this.sleep('TCellkuang', 3);
                            } else if(this.node.name === 'macrophagekuang') {
                                this.sunNum.getComponent('sun').sunNum -= 100;
                                this.sleep('macrophagekuang', 4);
                            }
                        }
                    }
                }
                if(hasPut === false) {
                    this.sunFlower[this.i].destroy();
                    this.i--;
                }                
            } else {
                this.i--;
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
                        cc.audioEngine.play(this.clip1, false, 1);
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
                cc.audioEngine.play(this.clip3, false, 1);
            }           
        }, 30, cc.macro.REPEAT_FOREVER, 15);
    },

    conduct: function() {
        var s;
        this.sunFlower[this.i] = new cc.Node();
        s = this.sunFlower[this.i].addComponent(cc.Sprite);
        s.spriteFrame = this.sp;
        this.sunFlower[this.i].parent = this.node;
        //cc.log(this.node.name);   
    },

    sleep: function(name, index) {
        var start = cc.callFunc(function() {
            this.cooling--;
        }.bind(this))
        var remain = cc.fadeTo(1, 255);
        var stop = cc.callFunc(function() {
            if(this.cooling === 0) {
                this.isSleeping[index] = false;
                this.node.color = new cc.Color(255, 255, 255);
                this.node.stopAllActions();
            }
        }.bind(this));
        if(name === 'wandoukuang') {
            this.isSleeping[0] = true;
            this.cooling = 10;
        } else if(name === 'dazuihuakuang') {
            this.isSleeping[1] = true;
            this.cooling = 8;      
        } else if(name === 'BCellkuang') {
            this.isSleeping[2] = true;
            this.cooling = 12;          
        } else if(name === 'TCellkuang') {
            this.isSleeping[3] = true;
            this.cooling = 8;         
        } else if(name === 'macrophagekuang') {
            this.isSleeping[4] = true;
            this.cooling = 6;           
        }
        this.node.color = new cc.Color(127, 127, 127);
        this.node.runAction(cc.sequence([remain, start, stop])).repeatForever();
    },

    start () {

    },

    // update (dt) {},
});

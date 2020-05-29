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
        jiangshi: cc.Node,
        isSleeping: [],
        sp1: cc.SpriteFrame,
        sp2: cc.SpriteFrame,
        swallowTime: [],
        clip1: {
            default: null,
            type: cc.AudioClip,
        },
        clip2: {
            default: null,
            type: cc.AudioClip,
        },
        tunshi1: {
            default: null,
            type: cc.AnimationClip,
        },
        tunshi2: {
            default: null,
            type: cc.AnimationClip,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    init: function() {
        for(var i = 0; i < this.node.getComponent('bozhong').num; i++) {
            if(this.isSleeping[i] !== true) {
                this.isSleeping[i] = false;
            }
            if(this.isSleeping[i] === false) {
                this.node.getComponent('bozhong').sunFlower[i].getComponent(cc.Sprite).spriteFrame = this.sp1;
            }
            if(this.isSleeping[i] === true) {
                this.node.getComponent('bozhong').sunFlower[i].getComponent(cc.Sprite).spriteFrame = this.sp2;
            }
            if(this.swallowTime[i] === undefined) {
                this.swallowTime[i] = 0;
            }
        }
    },

    check: function() {
        var dazuihua = this.node.getComponent('bozhong').sunFlower;
        for(var i = 0; i < this.node.getComponent('bozhong').num; i++) {
            for(var j = 0; j < this.jiangshi.getComponent('jingong').num; j++) {
                if(Math.abs(dazuihua[i].y - this.jiangshi.getComponent('jingong').jiangshi[j].y) <= 1 && 
                this.jiangshi.getComponent('jingong').jiangshi[j].x - dazuihua[i].x < 80 && dazuihua[i].active === true &&
                this.isSleeping[i] === false && this.jiangshi.getComponent('jingong').jiangshi[j].active === true &&
                this.jiangshi.getComponent('jingong').jiangshi[j].x >= dazuihua[i].x) {
                    this.jiangshi.getComponent('jingong').jiangshi[j].active = false;
                    if(this.node.name === 'dazuihuakuang') {
                        cc.audioEngine.play(this.clip1, false, 1);
                    } else if(this.node.name === 'macrophagekuang') {
                        cc.audioEngine.play(this.clip2, false, 1);
                    }
                    if(this.node.name === 'dazuihuakuang') {
                       var ani = dazuihua[i].addComponent(cc.Animation);
                       ani.addClip(this.tunshi1, 'tunshi1');
                       ani.node = dazuihua[i];
                       ani.play('tunshi1');
                    } else if(this.node.name === 'macrophagekuang') {
                        var ani = dazuihua[i].addComponent(cc.Animation);
                        ani.addClip(this.tunshi2, 'tunshi2');
                        ani.node = dazuihua[i];
                        ani.play('tunshi2');
                    }
                    for(var jj = 0; jj < this.jiangshi.getComponent('jingong').num; jj++) {
                        if(Math.abs(dazuihua[i].y - this.jiangshi.getComponent('jingong').jiangshi[jj].y) <= 1 &&
                        this.jiangshi.getComponent('jingong').jiangshi[jj].x - dazuihua[i].x < 80 && dazuihua[i].active === true &&
                        this.isSleeping[i] === false && this.jiangshi.getComponent('jingong').jiangshi[jj].active === true &&
                        this.jiangshi.getComponent('jingong').jiangshi[jj].x >= dazuihua[i].x &&
                        Math.abs(this.jiangshi.getComponent('jingong').jiangshi[jj].x - this.jiangshi.getComponent('jingong').jiangshi[j].x) < 1 &&
                        Math.abs(this.jiangshi.getComponent('jingong').jiangshi[jj].y - this.jiangshi.getComponent('jingong').jiangshi[j].y) < 1) {
                            this.jiangshi.getComponent('jingong').jiangshi[jj].active = false;
                        }
                    }
                    for(var jj = 0; jj < this.jiangshi.getComponent('piao').num; jj++) {
                        if(Math.abs(dazuihua[i].y - this.jiangshi.getComponent('piao').infectedCell[jj].y) <= 1 &&
                        this.jiangshi.getComponent('piao').infectedCell[jj].x - dazuihua[i].x < 80 && dazuihua[i].active === true &&
                        this.isSleeping[i] === false && this.jiangshi.getComponent('piao').infectedCell[jj].active === true &&
                        this.jiangshi.getComponent('piao').infectedCell[jj].x >= dazuihua[i].x &&
                        Math.abs(this.jiangshi.getComponent('piao').infectedCell[jj].x - this.jiangshi.getComponent('piao').infectedCell[j].x) < 1 &&
                        Math.abs(this.jiangshi.getComponent('piao').infectedCell[jj].y - this.jiangshi.getComponent('piao').infectedCell[j].y) < 1) {
                            this.jiangshi.getComponent('piao').infectedCell[jj].active = false;
                        }
                    }
                    this.isSleeping[i] = true;
                    this.swallowTime[i]++;
                    this.sleep(i);
                }
            }
        }
        for(var i = 0; i < this.node.getComponent('bozhong').num; i++) {
            for(var j = 0; j < this.jiangshi.getComponent('piao').num; j++) {
                if(Math.abs(dazuihua[i].y - this.jiangshi.getComponent('piao').infectedCell[j].y) <= 1 && 
                this.jiangshi.getComponent('piao').infectedCell[j].x - dazuihua[i].x < 80 && dazuihua[i].active === true &&
                this.isSleeping[i] === false && this.jiangshi.getComponent('piao').infectedCell[j].active === true &&
                this.jiangshi.getComponent('piao').infectedCell[j].x >= dazuihua[i].x) {
                    this.jiangshi.getComponent('piao').infectedCell[j].active = false;
                    if(this.node.name === 'dazuihuakuang') {
                        cc.audioEngine.play(this.clip1, false, 1);
                    } else if(this.node.name === 'macrophagekuang') {
                        cc.audioEngine.play(this.clip2, false, 1);
                    }
                    if(this.node.name === 'dazuihuakuang') {
                        var ani = dazuihua[i].addComponent(cc.Animation);
                        ani.addClip(this.tunshi1, 'tunshi1');
                        ani.node = dazuihua[i];
                        ani.play('tunshi1');
                    } else if(this.node.name === 'macrophagekuang') {
                         var ani = dazuihua[i].addComponent(cc.Animation);
                         ani.addClip(this.tunshi2, 'tunshi2');
                         ani.node = dazuihua[i];
                         ani.play('tunshi2');
                    }
                    for(var jj = 0; jj < this.jiangshi.getComponent('jingong').num; jj++) {
                        if(Math.abs(dazuihua[i].y - this.jiangshi.getComponent('jingong').jiangshi[jj].y) <= 1 &&
                        this.jiangshi.getComponent('jingong').jiangshi[jj].x - dazuihua[i].x < 80 && dazuihua[i].active === true &&
                        this.isSleeping[i] === false && this.jiangshi.getComponent('jingong').jiangshi[jj].active === true &&
                        this.jiangshi.getComponent('jingong').jiangshi[jj].x >= dazuihua[i].x &&
                        Math.abs(this.jiangshi.getComponent('jingong').jiangshi[jj].x - this.jiangshi.getComponent('jingong').jiangshi[j].x) < 1 &&
                        Math.abs(this.jiangshi.getComponent('jingong').jiangshi[jj].y - this.jiangshi.getComponent('jingong').jiangshi[j].y) < 1) {
                            this.jiangshi.getComponent('jingong').jiangshi[jj].active = false;
                        }
                    }
                    for(var jj = 0; jj < this.jiangshi.getComponent('piao').num; jj++) {
                        if(Math.abs(dazuihua[i].y - this.jiangshi.getComponent('piao').infectedCell[jj].y) <= 1 &&
                        this.jiangshi.getComponent('piao').infectedCell[jj].x - dazuihua[i].x < 80 && dazuihua[i].active === true &&
                        this.isSleeping[i] === false && this.jiangshi.getComponent('piao').infectedCell[jj].active === true &&
                        this.jiangshi.getComponent('piao').infectedCell[jj].x >= dazuihua[i].x &&
                        Math.abs(this.jiangshi.getComponent('piao').infectedCell[jj].x - this.jiangshi.getComponent('piao').infectedCell[j].x) < 1 &&
                        Math.abs(this.jiangshi.getComponent('piao').infectedCell[jj].y - this.jiangshi.getComponent('piao').infectedCell[j].y) < 1) {
                            this.jiangshi.getComponent('piao').infectedCell[jj].active = false;
                        }
                    }
                    this.isSleeping[i] = true;
                    this.swallowTime[i]++;
                    this.sleep(i);
                }
            }
        }
        for(var i = 0; i < this.node.getComponent('bozhong').num; i++) {
            for(var j = 0; j < this.jiangshi.getComponent('zou').num; j++) {
                if(Math.abs(dazuihua[i].y - this.jiangshi.getComponent('zou').normalCell[j].y) <= 1 && 
                this.jiangshi.getComponent('zou').normalCell[j].x - dazuihua[i].x < 80 && dazuihua[i].active === true &&
                this.isSleeping[i] === false && this.jiangshi.getComponent('zou').normalCell[j].active === true &&
                this.jiangshi.getComponent('zou').normalCell[j].x >= dazuihua[i].x) {
                    this.jiangshi.getComponent('zou').normalCell[j].active = false;
                    if(this.node.name === 'dazuihuakuang') {
                        cc.audioEngine.play(this.clip1, false, 1);
                    } else if(this.node.name === 'macrophagekuang') {
                        cc.audioEngine.play(this.clip2, false, 1);
                    }
                    if(this.node.name === 'dazuihuakuang') {
                       var ani = dazuihua[i].addComponent(cc.Animation);
                       ani.addClip(this.tunshi1, 'tunshi1');
                       ani.node = dazuihua[i];
                       ani.play('tunshi1');
                    } else if(this.node.name === 'macrophagekuang') {
                        var ani = dazuihua[i].addComponent(cc.Animation);
                        ani.addClip(this.tunshi2, 'tunshi2');
                        ani.node = dazuihua[i];
                        ani.play('tunshi2');
                    }
                    this.isSleeping[i] = true;
                    this.swallowTime[i]++;
                    this.sleep(i);
                }
            }
        }        
    },

    sleep: function(i) {
        this.scheduleOnce(function() {
            this.isSleeping[i] = false;
            if(this.swallowTime[i] === 5 && this.node.name === 'dazuihuakuang') {
                this.node.getComponent('bozhong').sunFlower[i].active = false;
                var row, col;
                var rect = this.caodi.getComponent('juxing').rect;
                for(var ii = 0; ii < 5; ii++) {
                    for(var jj = 0; jj < 9; jj++) {
                        if(rect[ii][jj].contains(this.node.getComponent('bozhong').sunFlower[i].convertToWorldSpaceAR(cc.v2(0, 0)))) {
                            row = ii;
                            col = jj;
                        }
                    }
                }
                this.caodi.getComponent('juxing').isEmpty[row][col] = true;
            }
            if(this.swallowTime[i] === 8 && this.node.name === 'macrophagekuang') {
                this.node.getComponent('bozhong').sunFlower[i].active = false;
                var row, col;
                var rect = this.caodi.getComponent('juxing').rect;
                for(var ii = 0; ii < 5; ii++) {
                    for(var jj = 0; jj < 9; jj++) {
                        if(rect[ii][jj].contains(this.node.getComponent('bozhong').sunFlower[i].convertToWorldSpaceAR(cc.v2(0, 0)))) {
                            row = ii;
                            col = jj;
                        }
                    }
                }
                this.caodi.getComponent('juxing').isEmpty[row][col] = true;
            }            
        }, 15);
    },

    update (dt) {
        this.init();
        this.check();
    },
});

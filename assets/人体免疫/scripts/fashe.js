// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        jiangshi: cc.Node,
        isSleeping: [],
        dou: [cc.Node],
        sp: cc.SpriteFrame,
        numOfDou: 0,
        clip: {
            default: null,
            type: cc.AudioClip,
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
                //cc.log('i =', i, this.isSleeping[i]);
            }
        }
    },

    check: function() {
        //var func = cc.callFunc(function() {}.bind(this));
        var wandou = this.node.getComponent('bozhong').sunFlower;
        for(var i = 0; i < this.node.getComponent('bozhong').num; i++) {
            for(var j = 0; j < this.jiangshi.getComponent('jingong').num; j++) {
                //cc.log(wandou[i].y, ' ', this.jiangshi.getComponent('jingong').jiangshi[j].y);
                //cc.log(wandou[i].x, ' ', this.jiangshi.getComponent('jingong').jiangshi[j].x);
                if(Math.abs(wandou[i].y - this.jiangshi.getComponent('jingong').jiangshi[j].y) <= 1 && 
                wandou[i].x <= this.jiangshi.getComponent('jingong').jiangshi[j].x && 
                this.isSleeping[i] === false && this.jiangshi.getComponent('jingong').jiangshi[j].active === true) {
                    this.attack(i, j);
                    this.isSleeping[i] = true;
                    this.sleep(i);
                    //wandou[i].runAction(cc.sequence([remain]));
                }
            }
        }
        for(var i = 0; i < this.node.getComponent('bozhong').num; i++) {
            for(var j = 0; j < this.jiangshi.getComponent('piao').num; j++) {
                if(Math.abs(wandou[i].y - this.jiangshi.getComponent('piao').infectedCell[j].y) <= 1 && 
                wandou[i].x <= this.jiangshi.getComponent('piao').infectedCell[j].x && 
                this.isSleeping[i] === false && this.jiangshi.getComponent('piao').infectedCell[j].active === true) {
                    this.attack(i, j);
                    this.isSleeping[i] = true;
                    this.sleep(i);
                }
            }
        }
        for(var i = 0; i < this.node.getComponent('bozhong').num; i++) {
            for(var j = 0; j < this.jiangshi.getComponent('zou').num; j++) {
                if(Math.abs(wandou[i].y - this.jiangshi.getComponent('zou').normalCell[j].y) <= 1 && 
                wandou[i].x <= this.jiangshi.getComponent('zou').normalCell[j].x && 
                this.isSleeping[i] === false && this.jiangshi.getComponent('zou').normalCell[j].active === true) {
                    this.attack(i, j);
                    this.isSleeping[i] = true;
                    this.sleep(i);
                }
            }
        }
    },

    attack: function(i, j) {
        this.dou[this.numOfDou] = new cc.Node();
        this.numOfDou++;
        var s = this.dou[this.numOfDou-1].addComponent(cc.Sprite);
        s.spriteFrame = this.sp;
        //this.dou[this.numOfDou-1].parent = this.node.getComponent('bozhong').sunFlower[i].parent;
        this.dou[this.numOfDou-1].setPosition(cc.v2(this.node.getComponent('bozhong').sunFlower[i].getPosition().x, this.node.getComponent('bozhong').sunFlower[i].getPosition().y));
        this.dou[this.numOfDou-1].parent = this.node.getComponent('bozhong').sunFlower[i].parent;
        //cc.log(cc.v2(this.node.getComponent('bozhong').sunFlower[i].getPosition()));
    },

    sleep: function(i) {
        this.scheduleOnce(function() {
            this.isSleeping[i] = false;
        }, 1.5);
    },

    douMoving: function() {
        for(var i = 0; i < this.numOfDou; i++) {
            this.dou[i].x += 1;
        }
    },

    douChecking: function() {
        for(var i = 0; i < this.numOfDou; i++) {
            for(var j = 0; j < this.jiangshi.getComponent('jingong').num; j++) {
                if(this.jiangshi.getComponent('jingong').jiangshi[j].x - this.dou[i].x < 1.5 && 
                this.dou[i].active === true && this.jiangshi.getComponent('jingong').jiangshi[j].active === true &&
                Math.abs(this.dou[i].y - this.jiangshi.getComponent('jingong').jiangshi[j].y) < 1) {
                    this.jiangshi.getComponent('jingong').HP[j] -= 1;
                    cc.audioEngine.play(this.clip, false, 1);
                    this.dou[i].active = false;
                }
            }
        }
        for(var i = 0; i < this.numOfDou; i++) {
            for(var j = 0; j < this.jiangshi.getComponent('piao').num; j++) {
                if(this.jiangshi.getComponent('piao').infectedCell[j].x - this.dou[i].x < 1.5 && 
                this.dou[i].active === true && this.jiangshi.getComponent('piao').infectedCell[j].active === true &&
                Math.abs(this.dou[i].y - this.jiangshi.getComponent('piao').infectedCell[j].y) < 1) {
                    this.jiangshi.getComponent('piao').HP[j] -= 1;
                    cc.audioEngine.play(this.clip, false, 1);
                    this.dou[i].active = false;
                }
            }
        }
        for(var i = 0; i < this.numOfDou; i++) {
            for(var j = 0; j < this.jiangshi.getComponent('zou').num; j++) {
                if(this.jiangshi.getComponent('zou').normalCell[j].x - this.dou[i].x < 1.5 && 
                this.jiangshi.getComponent('zou').normalCell[j].x >= this.dou[i].x &&
                this.dou[i].active === true && this.jiangshi.getComponent('zou').normalCell[j].active === true &&
                Math.abs(this.dou[i].y - this.jiangshi.getComponent('zou').normalCell[j].y) < 1) {
                    var temp = Math.random();
                    //cc.log(temp);
                    if(temp < 0.55) {
                        this.jiangshi.getComponent('zou').HP[j] -= 1;
                        cc.audioEngine.play(this.clip, false, 1);
                        this.dou[i].active = false;
                    }
                }
            }
        }
    },

    update (dt) {
        this.init();
        this.check();
        this.douMoving();
        this.douChecking();
    },
});

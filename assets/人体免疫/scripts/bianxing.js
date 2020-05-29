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
        sp: cc.SpriteFrame,
        changeTime: [],
        clip: {
            default: null,
            type: cc.AudioClip,
        },
        liejie:{
            default:null,
            type:cc.AnimationClip,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    init: function() {
        for(var i = 0; i < this.node.getComponent('TCytotoxicCell').num; i++) {
            if(this.changeTime[i] === undefined) {
                this.changeTime[i] = 0;
            }
        }
    },

    check: function() {
        var TCytotoxicCell = this.node.getComponent('TCytotoxicCell').sunFlower;
        for(var i = 0; i < this.node.getComponent('TCytotoxicCell').num; i++) {
            for(var j = 0; j < this.jiangshi.getComponent('piao').num; j++) {
                if(TCytotoxicCell[i].active === true && this.jiangshi.getComponent('piao').infectedCell[j].active === true &&
                Math.abs(TCytotoxicCell[i].y - this.jiangshi.getComponent('piao').infectedCell[j].y) <= 1 &&
                this.jiangshi.getComponent('piao').infectedCell[j].x >= TCytotoxicCell[i].x &&
                this.jiangshi.getComponent('piao').infectedCell[j].x - TCytotoxicCell[i].x <= 20 &&
                this.jiangshi.getComponent('piao').hasChanged[j] === false) {
                    this.transform(i, j);
                }
            }
        }
    },

    transform: function(i, j) {
        this.changeTime[i]++;
        this.jiangshi.getComponent('piao').HP[j] -= 5;
        this.jiangshi.getComponent('piao').infectedCell[j].getComponent(cc.Sprite).spriteFrame = this.sp;
        this.jiangshi.getComponent('piao').hasChanged[j] = true;
        cc.audioEngine.play(this.clip, false, 1);
        var ani = this.jiangshi.getComponent('piao').infectedCell[j].addComponent(cc.Animation);
        ani.addClip(this.liejie,'liejie');
        ani.node = this.jiangshi.getComponent('piao').infectedCell[j];
        ani.play('liejie');
        if(this.changeTime[i] === 5) {
            this.node.getComponent('TCytotoxicCell').sunFlower[i].active = false;
        }
    },

    update (dt) {
        this.init();
        this.check();
    },
});

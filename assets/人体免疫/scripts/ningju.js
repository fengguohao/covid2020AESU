// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        hasActivated: [],
        hasCohered: [],
        caodi: cc.Node,
        jiangshi: cc.Node,
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
            if(this.hasActivated[i] === undefined) {
                this.hasActivated[i] = false;
            }
            if(this.hasCohered[i] === undefined) {
                this.hasCohered[i] = false;
            }
        }
    },

    checkActivated: function() {
        for(var i = 0; i < this.node.getComponent('bozhong').num; i++) {
            if(this.hasActivated[i] === true && this.hasCohered[i] === false) {
                this.checkEnemy(i);//
            }
        }
    },

    checkEnemy: function(i) {
        var flag = false;
        for(var ii = 0; ii < this.jiangshi.getComponent('jingong').num; ii++) {
            if(Math.abs(this.jiangshi.getComponent('jingong').jiangshi[ii].y - this.node.getComponent('bozhong').sunFlower[i].y) <= 1 &&
            this.jiangshi.getComponent('jingong').jiangshi[ii].x > this.node.getComponent('bozhong').sunFlower[i].x &&
            this.jiangshi.getComponent('jingong').jiangshi[ii].x - this.node.getComponent('bozhong').sunFlower[i].x < 150 &&
            this.hasCohered[i] === false && this.jiangshi.getComponent('jingong').jiangshi[ii].active === true) {
                flag = true;
                this.cohere(i);//
            }
        }
        for(var ii = 0; ii < this.jiangshi.getComponent('piao').num; ii++) {
            if(Math.abs(this.jiangshi.getComponent('piao').infectedCell[ii].y - this.node.getComponent('bozhong').sunFlower[i].y) <= 1 &&
            this.jiangshi.getComponent('piao').infectedCell[ii].x > this.node.getComponent('bozhong').sunFlower[i].x &&
            this.jiangshi.getComponent('piao').infectedCell[ii].x - this.node.getComponent('bozhong').sunFlower[i].x < 150 &&
            this.jiangshi.getComponent('piao').hasChanged[ii] === true && flag === false && this.hasCohered[i] === false &&
            this.jiangshi.getComponent('jingong').jiangshi[ii].active === true) {
                this.cohere(i);
            }
        }
    },

    cohere: function(i) {
        for(var ii = 0; ii < this.jiangshi.getComponent('jingong').num; ii++) {
            if(Math.abs(this.jiangshi.getComponent('jingong').jiangshi[ii].x - this.node.getComponent('bozhong').sunFlower[i].x) < 150 &&
            Math.abs(this.jiangshi.getComponent('jingong').jiangshi[ii].y - this.node.getComponent('bozhong').sunFlower[i].y) < 150) {
                this.jiangshi.getComponent('jingong').jiangshi[ii].stopAllActions();
                var co = cc.moveTo(1, this.node.getComponent('bozhong').sunFlower[i].getPosition());
                this.jiangshi.getComponent('jingong').jiangshi[ii].runAction(co);
                this.hasCohered[i] = true;
                cc.audioEngine.play(this.clip, false, 1);
            }
        }
        for(var ii = 0; ii < this.jiangshi.getComponent('piao').num; ii++) {
            if(Math.abs(this.jiangshi.getComponent('piao').infectedCell[ii].x - this.node.getComponent('bozhong').sunFlower[i].x) < 150 &&
            Math.abs(this.jiangshi.getComponent('piao').infectedCell[ii].y - this.node.getComponent('bozhong').sunFlower[i].y) < 150 &&
            this.jiangshi.getComponent('piao').hasChanged[ii] === true) {
                this.jiangshi.getComponent('piao').infectedCell[ii].stopAllActions();
                var co = cc.moveTo(1, this.node.getComponent('bozhong').sunFlower[i].getPosition());
                cc.log(this.jiangshi.getComponent('piao').infectedCell[ii]);
                this.jiangshi.getComponent('piao').infectedCell[ii].runAction(co);//
                this.hasCohered[i] = true;
                cc.audioEngine.play(this.clip, false, 1);
            }
        }
        this.scheduleOnce(function() {
            this.caodi.getComponent('juxing').isEmpty[this.node.getComponent('bozhong').currentRow[i]][this.node.getComponent('bozhong').currentCol[i]] = true;
            this.node.getComponent('bozhong').sunFlower[i].active = false;
            //cc.log(this.node.getComponent('bozhong').currentRow[i]);
            //cc.log(this.node.getComponent('bozhong').currentCol[i]);
        }, 1);
    },

    update (dt) {
        this.init();
        this.checkActivated();
    },
});

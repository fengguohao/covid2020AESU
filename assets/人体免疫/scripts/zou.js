// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        normalCell: [cc.Node],
        caodi: cc.Node,
        sp: {
           default: null,
           type: cc.SpriteFrame,
        },
        HP: [],
        num: 0,
        duration: 27,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       //cc.log(cc.winSize.width/2);
        if(this.node.parent.parent.parent.name === 'Level01') {
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 13);
    
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 14 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 16 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 19 + this.duration);
    
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 16 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 20 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 22 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 25 + this.duration * 2);
        }
        
        if(this.node.parent.parent.parent.name === 'Level02') {
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 13);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 14 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 16 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 19 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 21 + this.duration);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 18 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 26 + this.duration * 2);
            
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 20 + this.duration * 3);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 24 + this.duration * 3);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 27 + this.duration * 3);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 30 + this.duration * 3);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 33 + this.duration * 3);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 22 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 24 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 27 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 32 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 34 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 38 + this.duration * 4);
        }

        if(this.node.parent.parent.parent.name === 'Level03') {
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 13);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 14 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 16 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 19 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 21 + this.duration);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 16 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 25 + this.duration * 2);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 18 + this.duration * 3);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 21 + this.duration * 3);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 23 + this.duration * 3);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 26 + this.duration * 3);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 28 + this.duration * 3);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 23 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 27 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 29 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 32 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 34 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 38 + this.duration * 4);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 27 + this.duration * 5);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 30 + this.duration * 5);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 38 + this.duration * 5);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 31 + this.duration * 6);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 34 + this.duration * 6);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 38 + this.duration * 6);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 40 + this.duration * 6);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 44 + this.duration * 6);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 35 + this.duration * 7);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 37 + this.duration * 7);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 39 + this.duration * 7);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 42 + this.duration * 7);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 47 + this.duration * 7);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 49 + this.duration * 7);
        }
    },

    add: function(i) {
        var s;
        var random;
        random = Math.floor(Math.random() * 5);
        this.num++;
        this.normalCell[i] = new cc.Node();
        this.HP[i] = 10;
        s = this.normalCell[i].addComponent(cc.Sprite);
        s.spriteFrame = this.sp;
        this.normalCell[i].parent = this.caodi;
        //this.normalCell[i].setPosition(this.caodi.convertToNodeSpaceAR(cc.v2(960, 506.4 - random * 100)));
        this.normalCell[i].setPosition(480, 186.4 - random * 100);
        //this.normalCell[i].runAction(cc.moveTo(42, this.caodi.convertToNodeSpaceAR(cc.v2(-64, 506.4 - random * 100))));
        this.normalCell[i].runAction(cc.moveTo(60, (cc.v2(-960, 186.4 - random * 100))));        
    },

    start () {

    },

    checkDead: function() {
        for(var i = 0; i < this.num; i++) {
            if(this.HP[i] <= 0) {
                this.normalCell[i].active = false;
            }
        }        
    },

    checkFailure: function() {
        var deadNum = 0;
        for(var i = 0; i < this.num; i++) {
            if(this.normalCell[i].active === false) {
                deadNum++;
            }
        }
        if(this.node.parent.parent.parent.name === 'Level01') {
            if(deadNum >= 5) {
                this.caodi.getComponent('gameControl').gameStatus = 'fail';
            }
        } else if(this.node.parent.parent.parent.name === 'Level02') {
            if(deadNum >= 11) {
                this.caodi.getComponent('gameControl').gameStatus = 'fail';
            }
        } else if(this.node.parent.parent.parent.name === 'Level03') {
            if(deadNum >= 18) {
                this.caodi.getComponent('gameControl').gameStatus = 'fail';
            }
        }
    },

    update (dt) {
        this.checkDead();
        this.checkFailure();
    },
});

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        infectedCell: [cc.Node],
        caodi: cc.Node,
        sp: {
           default: null,
           type: cc.SpriteFrame,
        },
        HP: [],
        num: 0,
        hasChanged: [],
        duration: 33,
        hasDestroyedAll: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        if(this.node.parent.parent.parent.name === 'Level01') {
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 12);
    
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 14 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 15 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 17 + this.duration);
    
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 16 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 22 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 24 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 26 + this.duration * 2);            
        }

        if(this.node.parent.parent.parent.name === 'Level02') {
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 12);
    
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 14 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 15 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 17 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 20 + this.duration);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 16 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 18 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 24 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 28 + this.duration * 2);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 20 + this.duration * 3);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 22 + this.duration * 3);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 27 + this.duration * 3);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 24 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 26 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 30 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 32 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 38 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 40 + this.duration * 4);
        }

        if(this.node.parent.parent.parent.name === 'Level03') {
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 12);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 14 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 15 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 20 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 21 + this.duration);
    
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
    
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 20 + this.duration * 3);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 22 + this.duration * 3);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 26 + this.duration * 3);
    
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 24 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this),25 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 26 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 28 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 30 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 32 + this.duration * 4);
    
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 27 + this.duration * 5);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 29 + this.duration * 5);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 30 + this.duration * 5);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 32 + this.duration * 5);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 36 + this.duration * 5);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 40 + this.duration * 5);
    
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 30 + this.duration * 6);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 32 + this.duration * 6);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 33 + this.duration * 6);
    
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 32 + this.duration * 7);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 36 + this.duration * 7);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 38 + this.duration * 7);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 42 + this.duration * 7);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 46 + this.duration * 7);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 50 + this.duration * 7);
        }

    },

    add: function(i) {
        var s;
        var random;
        random = Math.floor(Math.random() * 5);
        this.num++;
        this.infectedCell[i] = new cc.Node();
        this.HP[i] = 10;
        s = this.infectedCell[i].addComponent(cc.Sprite);
        s.spriteFrame = this.sp;
        this.infectedCell[i].parent = this.caodi;
        //this.infectedCell[i].setPosition(this.caodi.convertToNodeSpaceAR(cc.v2(960, 506.4 - random * 100)));
        this.infectedCell[i].setPosition(480, 186.4 - random * 100);
        //this.infectedCell[i].runAction(cc.moveTo(40, this.caodi.convertToNodeSpaceAR(cc.v2(0, 506.4 - random * 100))));
        this.infectedCell[i].runAction(cc.moveTo(40, (cc.v2(-480, 186.4 - random * 100))));
    },

    start () {

    },

    checkChange: function() {
        for(var i = 0; i < this.num; i++) {
            if(this.hasChanged[i] === undefined) {
                this.hasChanged[i] = false;
            }
        }
    },

    checkDead: function() {
        for(var i = 0; i < this.num; i++) {
            if(this.HP[i] <= 0) {
                this.infectedCell[i].active = false;
            }
        }        
    },

    checkDestroyAll: function() {
        if(this.num === 8 && this.node.parent.parent.parent.name === 'Level01') {
            for(var i = 0; i < this.num; i++) {
                if(this.infectedCell[i].active === true) {
                    return;
                }
            }
            this.hasDestroyedAll = true;
        }

        if(this.num === 18 && this.node.parent.parent.parent.name === 'Level02') {
            for(var i = 0; i < this.num; i++) {
                if(this.infectedCell[i].active === true) {
                    return;
                }
            }
            this.hasDestroyedAll = true;
        }

        if(this.num === 33 && this.node.parent.parent.parent.name === 'Level03') {
            for(var i = 0; i < this.num; i++) {
                if(this.infectedCell[i].active === true) {
                    return;
                }
            }
            this.hasDestroyedAll = true;
        }
    },

    checkFailure: function() {
        for(var i = 0; i < this.num; i++) {
            if(this.infectedCell[i].x < 0.1 - 480) {
                this.caodi.getComponent('gameControl').gameStatus = 'fail';
            }
        }
    },
        
    update (dt) {
        this.checkChange();
        this.checkDead();
        this.checkDestroyAll();
        this.checkFailure();
        //cc.log(this.num, this.hasDestroyedAll);
    },
});

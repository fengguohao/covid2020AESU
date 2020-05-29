// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       jiangshi: [cc.Node],
       caodi: cc.Node,
       sp: {
           default: null,
           type: cc.SpriteFrame,
       },
       HP: [],
       num: 0,
       duration: 30,
       hasDestroyedAll: false,
       lastWave: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        if(this.node.parent.parent.parent.name === 'Level01') {
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 10);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 16);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 20);
    
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 10 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 16 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 20 + this.duration);
    
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 18 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 20 + this.duration * 2);            
        }

        if(this.node.parent.parent.parent.name === 'Level02') {
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 10);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 16);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 20);
            
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 10 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 16 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 20 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 24 + this.duration);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 16 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 20 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 26 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 30 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 35 + this.duration * 2);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 20 + this.duration * 3);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 26 + this.duration * 3);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 30 + this.duration * 3);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 24 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 28 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 34 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 40 + this.duration * 4);

        }

        if(this.node.parent.parent.parent.name === 'Level03') {
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 10);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 16);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 20);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 10 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 14 + this.duration);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 16 + this.duration);
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
            }.bind(this), 22 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 26 + this.duration * 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 30 + this.duration * 2);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 18 + this.duration * 3);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 24 + this.duration * 3);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 26 + this.duration * 3);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 22 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 24 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 30 + this.duration * 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 34 + this.duration * 4);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 26 + this.duration * 5);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 30 + this.duration * 5);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 35 + this.duration * 5);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 40 + this.duration * 5);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 42 + this.duration * 5);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 30 + this.duration * 6);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 34 + this.duration * 6);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 39 + this.duration * 6);

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 32 + this.duration * 7);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 36 + this.duration * 7);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 40 + this.duration * 7);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 48 + this.duration * 7);
        }

    },

    add: function(i) {
        var s;
        var random;
        random = Math.floor(Math.random() * 5);
        this.num++;
        this.jiangshi[i] = new cc.Node();
        this.HP[i] = 5;
        s = this.jiangshi[i].addComponent(cc.Sprite);
        s.spriteFrame = this.sp;
        this.jiangshi[i].parent = this.caodi;
//      this.jiangshi[i].setPosition(this.caodi.convertToNodeSpaceAR(cc.v2(960, 506.4 - random * 100)));
        this.jiangshi[i].setPosition(480, 186.4 - random * 100);        
        //this.jiangshi[i].runAction(cc.moveTo(40, this.caodi.convertToNodeSpaceAR(cc.v2(0, 506.4 - random * 100))));
        this.jiangshi[i].runAction(cc.moveTo(40, (cc.v2(-480, 186.4 - random * 100))));
    },

    addInfectedCell: function() {
        var s;
        var random;
        random = Math.floor(Math.random() * 5);
        this.node.getComponent('piao').infectedCell[this.node.getComponent('piao').num] = new cc.Node();
        this.node.getComponent('piao').HP[this.node.getComponent('piao').num] = 10;
        s = this.node.getComponent('piao').infectedCell[this.node.getComponent('piao').num].addComponent(cc.Sprite);
        s.spriteFrame = this.node.getComponent('piao').sp;
        this.node.getComponent('piao').infectedCell[this.node.getComponent('piao').num].parent = this.caodi;
        //this.node.getComponent('piao').infectedCell[this.node.getComponent('piao').num].setPosition(this.caodi.convertToNodeSpaceAR(cc.v2(960, 506.4 - random * 100)));
        this.node.getComponent('piao').infectedCell[this.node.getComponent('piao').num].setPosition(480, 186.4 - random * 100);
        //this.node.getComponent('piao').infectedCell[this.node.getComponent('piao').num].runAction(cc.moveTo(40, this.caodi.convertToNodeSpaceAR(cc.v2(0, 506.4 - random * 100))));
        this.node.getComponent('piao').infectedCell[this.node.getComponent('piao').num].runAction(cc.moveTo(40, (cc.v2(-480, 186.4 - random * 100))));
        this.node.getComponent('piao').num++;        
    },

    addNormalCell: function() {
        var s;
        var random;
        random = Math.floor(Math.random() * 5);
        this.node.getComponent('zou').normalCell[this.node.getComponent('zou').num] = new cc.Node();
        this.node.getComponent('zou').HP[this.node.getComponent('zou').num] = 10;
        s = this.node.getComponent('zou').normalCell[this.node.getComponent('zou').num].addComponent(cc.Sprite);
        s.spriteFrame = this.node.getComponent('zou').sp;
        this.node.getComponent('zou').normalCell[this.node.getComponent('zou').num].parent = this.caodi;
        //this.node.getComponent('zou').normalCell[this.node.getComponent('zou').num].setPosition(this.caodi.convertToNodeSpaceAR(cc.v2(960, 506.4 - random * 100)));
        this.node.getComponent('zou').normalCell[this.node.getComponent('zou').num].setPosition(480, 186.4 - random * 100);
        //this.node.getComponent('zou').normalCell[this.node.getComponent('zou').num].runAction(cc.moveTo(40, this.caodi.convertToNodeSpaceAR(cc.v2(0, 506.4 - random * 100))));
        this.node.getComponent('zou').normalCell[this.node.getComponent('zou').num].runAction(cc.moveTo(60, (cc.v2(-960, 186.4 - random * 100))));
        this.node.getComponent('zou').num++;        
    },

    start () {

    },

    checkDead: function() {
        for(var i = 0; i < this.num; i++) {
            if(this.HP[i] <= 0) {
                this.jiangshi[i].active = false;
            }
        }
    },

    checkDestroyAll: function() {
        if(this.num === 8 && this.node.parent.parent.parent.name === 'Level01') {
            for(var i = 0; i < this.num; i++) {
                if(this.jiangshi[i].active === true) {
                    return;
                }
            }
            this.hasDestroyedAll = true;
        }

        if(this.num === 19 && this.node.parent.parent.parent.name === 'Level02') {
            for(var i = 0; i < this.num; i++) {
                if(this.jiangshi[i].active === true) {
                    return;
                }
            }
            this.hasDestroyedAll = true;
        }

        if(this.num === 31 && this.node.parent.parent.parent.name === 'Level03') {
            for(var i = 0; i < this.num; i++) {
                if(this.jiangshi[i].active === true) {
                    return;
                }
            }
            this.hasDestroyedAll = true;
        }
    },

    checkLaunchLastWave: function() {
        if(this.hasDestroyedAll === true && this.lastWave === false &&
        this.node.getComponent('piao').hasDestroyedAll === true &&
        this.node.parent.parent.parent.name === 'Level01') {
            this.lastWave = true;

            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 2);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 4);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 5);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 7);
            this.scheduleOnce(function() {
                this.add(this.num);
            }.bind(this), 10);

            this.scheduleOnce(function() {
                this.addInfectedCell();          
            }.bind(this), 2);
            this.scheduleOnce(function() {
                this.addInfectedCell();          
            }.bind(this), 3);
            this.scheduleOnce(function() {
                this.addInfectedCell();          
            }.bind(this), 6);
            this.scheduleOnce(function() {
                this.addInfectedCell();          
            }.bind(this), 9);

            this.scheduleOnce(function() {
                this.addNormalCell();
            }.bind(this), 3);
            this.scheduleOnce(function() {
                this.addNormalCell();
            }.bind(this), 8);
        }

        if(this.hasDestroyedAll === true && this.lastWave === false &&
            this.node.getComponent('piao').hasDestroyedAll === true &&
            this.node.parent.parent.parent.name === 'Level02') {
                this.lastWave = true;
                this.scheduleOnce(function() {
                    this.add(this.num);
                }.bind(this), 2);
                this.scheduleOnce(function() {
                    this.add(this.num);
                }.bind(this), 4);
                this.scheduleOnce(function() {
                    this.add(this.num);
                }.bind(this), 7);
                this.scheduleOnce(function() {
                    this.add(this.num);
                }.bind(this), 9);
                this.scheduleOnce(function() {
                    this.add(this.num);
                }.bind(this), 13);
                this.scheduleOnce(function() {
                    this.add(this.num);
                }.bind(this), 17);

                this.scheduleOnce(function() {
                    this.addInfectedCell();          
                }.bind(this), 2);
                this.scheduleOnce(function() {
                    this.addInfectedCell();          
                }.bind(this), 3);
                this.scheduleOnce(function() {
                    this.addInfectedCell();          
                }.bind(this), 6);
                this.scheduleOnce(function() {
                    this.addInfectedCell();          
                }.bind(this), 9);
                this.scheduleOnce(function() {
                    this.addInfectedCell();          
                }.bind(this), 12);
                this.scheduleOnce(function() {
                    this.addInfectedCell();          
                }.bind(this), 15);
                this.scheduleOnce(function() {
                    this.addInfectedCell();          
                }.bind(this), 16);
                this.scheduleOnce(function() {
                    this.addInfectedCell();          
                }.bind(this), 18);

                this.scheduleOnce(function() {
                    this.addNormalCell();
                }.bind(this),3);
                this.scheduleOnce(function() {
                    this.addNormalCell();
                }.bind(this), 8);
                this.scheduleOnce(function() {
                    this.addNormalCell();
                }.bind(this), 13);
                this.scheduleOnce(function() {
                    this.addNormalCell();
                }.bind(this), 14);
                
            }

            if(this.hasDestroyedAll === true && this.lastWave === false &&
            this.node.getComponent('piao').hasDestroyedAll === true &&
            this.node.parent.parent.parent.name === 'Level03') {
                this.lastWave = true;
                this.scheduleOnce(function() {
                    this.add(this.num);
                }.bind(this), 2);
                this.scheduleOnce(function() {
                    this.add(this.num);
                }.bind(this), 4);
                this.scheduleOnce(function() {
                    this.add(this.num);
                }.bind(this), 5);
                this.scheduleOnce(function() {
                    this.add(this.num);
                }.bind(this), 7);
                this.scheduleOnce(function() {
                    this.add(this.num);
                }.bind(this), 10);
                this.scheduleOnce(function() {
                    this.add(this.num);
                }.bind(this),15);
                this.scheduleOnce(function() {
                    this.add(this.num);
                }.bind(this), 18);
                this.scheduleOnce(function() {
                    this.add(this.num);
                }.bind(this), 20);

                this.scheduleOnce(function() {
                    this.addInfectedCell();          
                }.bind(this), 2);
                this.scheduleOnce(function() {
                    this.addInfectedCell();          
                }.bind(this), 3);
                this.scheduleOnce(function() {
                    this.addInfectedCell();          
                }.bind(this), 8);
                this.scheduleOnce(function() {
                    this.addInfectedCell();          
                }.bind(this), 12);
                this.scheduleOnce(function() {
                    this.addInfectedCell();          
                }.bind(this), 16);
                this.scheduleOnce(function() {
                    this.addInfectedCell();          
                }.bind(this), 17);
                this.scheduleOnce(function() {
                    this.addInfectedCell();          
                }.bind(this), 18);
                this.scheduleOnce(function() {
                    this.addInfectedCell();          
                }.bind(this), 21);

                this.scheduleOnce(function() {
                    this.addNormalCell();
                }.bind(this), 3);
                this.scheduleOnce(function() {
                    this.addNormalCell();
                }.bind(this), 11);
                this.scheduleOnce(function() {
                    this.addNormalCell();
                }.bind(this), 16);
                this.scheduleOnce(function() {
                    this.addNormalCell();
                }.bind(this), 19);
            }
    },

    checkFailure: function() {
        for(var i = 0; i < this.num; i++) {
            if(this.jiangshi[i].x < 0.1 - 480) {
                this.caodi.getComponent('gameControl').gameStatus = 'fail';
            }
        }
    },

    checkSuccess: function() {
        /*
        var flag = true;
        if(this.node.parent.parent.parent.name === 'Level01' && this.num === 13 &&
        this.node.getComponent('piao').num === 12) {
            for(var i = 0; i < this.num; i++) {
                if(this.jiangshi[i].active === true) {
                    flag = false;
                }
            }
            for(var i = 0; i < this.node.getComponent('piao').num; i++) {
                if(this.node.getComponent('piao').infectedCell[i].active === true) {
                    flag = false;
                }
            }
        } else if(this.node.parent.parent.parent.name === 'Level02' && this.num === 25 &&
        this.node.getComponent('piao').num === 26) {
            for(var i = 0; i < this.num; i++) {
                if(this.jiangshi[i].active === true) {
                    flag = false;
                }
            }
            for(var i = 0; i < this.node.getComponent('piao').num; i++) {
                if(this.node.getComponent('piao').infectedCell[i].active === true) {
                    flag = false;
                }
            }
        } else if(this.node.parent.parent.parent.name === 'Level03' && this.num === 39 &&
        this.node.getComponent('piao').num === 41) {
            for(var i = 0; i < this.num; i++) {
                if(this.jiangshi[i].active === true) {
                    flag = false;
                }
            }
            for(var i = 0; i < this.node.getComponent('piao').num; i++) {
                if(this.node.getComponent('piao').infectedCell[i].active === true) {
                    flag = false;
                }
            }
        }
        if(this.lastWave === false) {
            flag = false;
        }
        if(this.node.parent.parent.parent.name === 'Level01' && (this.num < 13 ||
        this.node.getComponent('piao').num < 12)) {
            flag = false;
        } else if(this.node.parent.parent.parent.name === 'Level02' && (this.num < 25 ||
        this.node.getComponent('piao').num < 26)) {
            flag = false;
        } else if(this.node.parent.parent.parent.name === 'Level03' && this.num < 39 ||
        this.node.getComponent('piao').num < 41) {
            flag = false;
        }
        if(flag === true) {
            this.caodi.getComponent('gameControl').gameStatus = 'succeed';
        }
        */
       if(this.lastWave === false) {
           return;
       }
       if(this.node.parent.parent.parent.name === 'Level01') {
           if(this.num !== 13 || this.node.getComponent('piao').num !== 12) {
               return;
           }
           for(var i = 0; i < 13; i++) {
               if(this.jiangshi[i].active === true) {
                   return;
               }
           }
           for(var i = 0; i < 12; i++) {
               if(this.node.getComponent('piao').infectedCell[i].active === true) {
                   return;
               }
           }
           this.caodi.getComponent('gameControl').gameStatus = 'succeed';
       }
        if(this.node.parent.parent.parent.name === 'Level02') {
           if(this.num !== 25 || this.node.getComponent('piao').num !== 26) {
                   return;
           }
           for(var i = 0; i < 25; i++) {
               if(this.jiangshi[i].active === true) {
                   return;
                }
            }
           for(var i = 0; i < 26; i++) {
              if(this.node.getComponent('piao').infectedCell[i].active === true) {
                   return;
                }
            }
            this.caodi.getComponent('gameControl').gameStatus = 'succeed';
        }
        if(this.node.parent.parent.parent.name === 'Level03') {
            if(this.num !== 39 || this.node.getComponent('piao').num !== 41) {
            return;
        }
        for(var i = 0; i < 39; i++) {
            if(this.jiangshi[i].active === true) {
                return;
            }
        }
        for(var i = 0; i < 41; i++) {
            if(this.node.getComponent('piao').infectedCell[i].active === true) {
                return;
            }
        }
        this.caodi.getComponent('gameControl').gameStatus = 'succeed';
        }              
    },

    update (dt) {
        this.checkDead();
        this.checkDestroyAll();
        this.checkLaunchLastWave();
        this.checkFailure();
        this.checkSuccess();
        //cc.log(this.num, this.node.getComponent('piao').num, this.node.getComponent('piao').hasDestroyedAll);
    },
});

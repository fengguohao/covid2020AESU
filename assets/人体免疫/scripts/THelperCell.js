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
        sunFlower: [cc.Node],
        sp: cc.SpriteFrame,
        spAfterActivate: cc.SpriteFrame,
        caodi: cc.Node,
        BCellFrame: cc.Node,
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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.store = 0;
        var s;
        var i = -1;
        var rect = this.caodi.getComponent('juxing').rect;
        this.node.on(cc.Node.EventType.TOUCH_START, function() {
            i++;
            if(this.store > 0) {
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
                        for(var k = 0; k < this.BCellFrame.getComponent('bozhong').num; k++) {
                            var worldSpace = this.sunFlower[i].convertToWorldSpaceAR(cc.v2(0, 0));
                            if(rect[row][col].contains(worldSpace) && this.BCellFrame.getComponent('biaoji').hasFlag[k] === true &&
                            row === this.BCellFrame.getComponent('biaoji').flagRow[k] &&
                            col === this.BCellFrame.getComponent('biaoji').flagCol[k]) {
                                this.sunFlower[i].setPosition(this.caodi.convertToNodeSpaceAR(cc.v2(86.3 + col*100 + (cc.winSize.width-960)/2, 506.4 - row*100 + 30)));
                                this.sunFlower[i].parent = this.caodi;
                                this.store--;
                                hasPut = true;
                                var ani = this.BCellFrame.getComponent('bozhong').sunFlower[k].addComponent(cc.Animation);
                                ani.addClip(this.huohua, 'Bhuohua');
                                ani.node = this.BCellFrame.getComponent('bozhong').sunFlower[k];
                                ani.play('Bhuohua');                                
                                this.activateB(i, k);
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

    activateB: function(i, k) {
        this.scheduleOnce(function() {
            this.sunFlower[i].active = false;
            //活化B细胞
            this.BCellFrame.getComponent('ningju').hasActivated[k] = true;
            this.BCellFrame.getComponent('bozhong').sunFlower[k].getComponent(cc.Sprite).spriteFrame = this.spAfterActivate;
            cc.audioEngine.play(this.clip1, false, 1);            
        }, 2);
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

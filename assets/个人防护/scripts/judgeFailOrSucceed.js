// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        gamePlayer: {
            default: null,
            type: cc.Node,
        },
        promptBox: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },

    judgeFail: function() {
        /*
        var flag = false;
        if(this.gamePlayer.getComponent('gamePlayer').infectPossibility >= 40) {
            flag = true;
        }
        if(780 <= this.gamePlayer.x && this.gamePlayer.x <= 890 &&
        170 <= this.gamePlayer.y && this.gamePlayer.y <= 240) {
            if(this.gamePlayer.getComponent('gamePlayer').hasReleased === true) {
                if(this.gamePlayer.getComponent('gamePlayer').hasWashedHandsBefore === false ||
                this.gamePlayer.getComponent('gamePlayer').hasWashedHandsAfter) {
                    flag = true;
                }
            }
        }
        if(flag === true) {
            this.promptBox.active = true;
            this.promptBox.getChildByName('show').getComponent(cc.Label).string = 'fail';
            this.promptBox.getChildByName('buttonConfirm').active = true;
        }
        */
        if(this.gamePlayer.getComponent('gamePlayer').infectPossibility >= 40) {
            this.promptBox.active = true;
            this.promptBox.getChildByName('show').getComponent(cc.Label).string = '你的染病概率已经很高了，请重新再来！';
            this.promptBox.getChildByName('buttonConfirm').active = true;
            this.promptBox.getChildByName('buttonConfirm').on(cc.Node.EventType.TOUCH_END, function() {
                cc.director.loadScene('衔接场景');
            }.bind(this));            
        }
        if(780 <= this.gamePlayer.x && this.gamePlayer.x <= 890 &&
        170 <= this.gamePlayer.y && this.gamePlayer.y <= 240 && this.gamePlayer.getComponent('gamePlayer').hasReleased === true) {
            if(this.gamePlayer.getComponent('gamePlayer').hasWashedHandsBefore === false) {
                this.promptBox.active = true;
                this.promptBox.getChildByName('show').getComponent(cc.Label).string = '推开卫生间的门时可能会沾染到病毒，如厕前请洗手，此次游戏失败~';
                this.promptBox.getChildByName('buttonConfirm').active = true;
                this.promptBox.getChildByName('buttonConfirm').on(cc.Node.EventType.TOUCH_END, function() {
                    cc.director.loadScene('衔接场景');
                }.bind(this));                
            } else if(this.gamePlayer.getComponent('gamePlayer').hasWashedHandsAfter === false) {
                this.promptBox.active = true;
                this.promptBox.getChildByName('show').getComponent(cc.Label).string = '推开卫生间的门时可能会沾染到病毒，如厕后忘记洗手了哦，此次游戏失败~';
                this.promptBox.getChildByName('buttonConfirm').active = true;
                this.promptBox.getChildByName('buttonConfirm').on(cc.Node.EventType.TOUCH_END, function() {
                    cc.director.loadScene('衔接场景');
                }.bind(this));                
            }
        }       

    },

    judgeSucceed: function() {
        if(780 <= this.gamePlayer.x && this.gamePlayer.x <= 890 &&
        170 <= this.gamePlayer.y && this.gamePlayer.y <= 240 &&
        this.gamePlayer.getComponent('gamePlayer').hasReleased === true &&
        this.gamePlayer.getComponent('gamePlayer').hasWashedHandsBefore === true &&
        this.gamePlayer.getComponent('gamePlayer').hasWashedHandsAfter === true) {
            this.promptBox.active = true;
            this.promptBox.getChildByName('show').getComponent(cc.Label).string = '恭喜你达成了目标，防护成功！';
            this.promptBox.getChildByName('buttonConfirm').active = true;
            this.promptBox.getChildByName('buttonConfirm').on(cc.Node.EventType.TOUCH_END, function() {
                cc.director.loadScene('衔接场景');
            }.bind(this));            
        }
    },

    onClickReturn: function() {
        cc.director.loadScene('衔接场景');
    },

    update (dt) {
        this.judgeFail();
        this.judgeSucceed();
    },
});

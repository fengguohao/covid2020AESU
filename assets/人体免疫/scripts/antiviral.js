// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        clip1: {
            default: null,
            type: cc.AudioClip,
        },
        clip2:{
            default: null,
            type: cc.AudioClip,
        },
        clip3:{
            default: null,
            type: cc.AudioClip,
        },
        jiangshi:cc.Node,
        caodi:cc.Node,
        sunnum:cc.Node,
        num1:0,
        num2:0,
        isSleeping1: false,
        isSleeping2: false,
        cooling1: 0,
        cooling2: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {

    },

    kill:function(){
        if(this.num1<3 && this.isSleeping1 === false){
            for(var j = 0; j < this.jiangshi.getComponent('jingong').num; j++){
                this.jiangshi.getComponent('jingong').jiangshi[j].active = false;
            }
            for(var j = 0; j < this.jiangshi.getComponent('piao').num; j++){
                this.jiangshi.getComponent('piao').infectedCell[j].active = false;
            }
            for(var j = 0; j < this.jiangshi.getComponent('zou').num; j++){
                if(this.jiangshi.getComponent('zou').normalCell[j].x >= -480) {
                    this.jiangshi.getComponent('zou').normalCell[j].active = false;                    
                }
            }
            this.num1+=1;
            cc.audioEngine.play(this.clip1, false, 1);

            this.cooling1 = 60;
            this.isSleeping1 = true;
            var start = cc.callFunc(function() {
                this.cooling1--;
            }.bind(this))
            var remain = cc.fadeTo(1, 255);
            var stop = cc.callFunc(function() {
                if(this.cooling1 === 0) {
                    this.isSleeping1 = false;
                    this.node.color = new cc.Color(255, 255, 255);
                    this.node.stopAllActions();
                }
            }.bind(this));
            this.node.getChildByName('antiviral').getChildByName('Background').color = new cc.Color(127, 127, 127);
            this.node.getChildByName('antiviral').getChildByName('Background').runAction(cc.sequence([remain, start, stop])).repeatForever();            
        }
        else{
            cc.audioEngine.play(this.clip3, false, 1);
        }
    },
    
    use:function(){
        if(this.num2<3 && this.isSleeping2 === false){
            if(this.sunnum.getComponent('sun').total>=200){
                this.sunnum.getComponent('sun').total-=200;
            }
            else{
                this.sunnum.getComponent('sun').total=0;
            }
            this.num2+=1;
            cc.audioEngine.play(this.clip2, false, 1);

            this.cooling2 = 45;
            this.isSleeping2 = true;
            var start = cc.callFunc(function() {
                this.cooling2--;
            }.bind(this))
            var remain = cc.fadeTo(1, 255);
            var stop = cc.callFunc(function() {
                if(this.cooling2 === 0) {
                    this.isSleeping2 = false;
                    this.node.color = new cc.Color(255, 255, 255);
                    this.node.stopAllActions();
                }
            }.bind(this));
            this.node.getChildByName('antiCK').getChildByName('Background').color = new cc.Color(127, 127, 127);
            this.node.getChildByName('antiCK').getChildByName('Background').runAction(cc.sequence([remain, start, stop])).repeatForever(); 
        }
        else{
            cc.audioEngine.play(this.clip3, false, 1);
        }
    },

    //update (dt) {
    //},
});

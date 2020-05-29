// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        yindao:cc.Node,
        bar:cc.Button,
        picPlace:cc.Sprite,
        message:cc.Label,
        sheqv:cc.SpriteFrame
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    showPanel(frame,message){
        this.yindao.active=true;
        this.picPlace.spriteFrame=frame;
        this.message.string=message;
    },
    sheqvOnClick(){
        this.showPanel(this.sheqv,"快来社区帮我们控制疫情吧！(点此继续)");
        this.bar.node.on("click",function(){cc.director.loadScene("社区防疫")},this);
    }
    // update (dt) {},
});

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        mySprite:cc.Sprite,
        myAtlas:cc.SpriteAtlas,
    },

    // LIFE-CYCLE CALLBACKS:

    //onLoad () {},
    click1:function(){
        this.mySprite.spriteFrame = this.myAtlas.getSpriteFrame('NK介绍');
    },
    click2:function(){
         this.mySprite.spriteFrame = this.myAtlas.getSpriteFrame('WBC介绍');
    },
    click3:function(){
        this.mySprite.spriteFrame = this.myAtlas.getSpriteFrame('巨噬细胞介绍');
    },
    click4:function(){
        this.mySprite.spriteFrame = this.myAtlas.getSpriteFrame('树突状细胞介绍');
    },
    click5:function(){
        this.mySprite.spriteFrame = this.myAtlas.getSpriteFrame('B细胞介绍');
    },
    click6:function(){
        this.mySprite.spriteFrame = this.myAtlas.getSpriteFrame('T细胞介绍');
    },
    click7:function(){
        this.mySprite.spriteFrame = this.myAtlas.getSpriteFrame('辅助T细胞介绍');
    },
    click8:function(){
        this.mySprite.spriteFrame = this.myAtlas.getSpriteFrame('细胞毒性T细胞介绍');
    },
    click9:function(){
        this.mySprite.spriteFrame = this.myAtlas.getSpriteFrame('细胞因子介绍');
    },
    click10:function(){
        this.mySprite.spriteFrame = this.myAtlas.getSpriteFrame('抗病毒药物');
    },
    click11:function(){
        this.mySprite.spriteFrame = this.myAtlas.getSpriteFrame('细胞因子抑制剂介绍');
    },
    click12:function(){
        this.mySprite.spriteFrame = this.myAtlas.getSpriteFrame('病毒介绍');
    },
    click13:function(){
        this.mySprite.spriteFrame = this.myAtlas.getSpriteFrame('感染细胞介绍');
    },
    click14:function(){
        this.mySprite.spriteFrame = this.myAtlas.getSpriteFrame('规则介绍');
    },
    click15:function(){
        cc.director.loadScene("人体免疫(总)");
    },

    start () {

    },

    //update (dt) { this.click2;},
});

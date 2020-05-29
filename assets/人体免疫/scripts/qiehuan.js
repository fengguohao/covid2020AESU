// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        /*
        if(cc.sys.localStorage.getItem('hasPassed') === 1){
            this.node.getChildByName('level02').getComponent(cc.Button).interactable = true;
            this.node.getChildByName('level03').getComponent(cc.Button).interactable = false;
        }
        else{
            this.node.getChildByName('level02').getComponent(cc.Button).interactable = false;
            this.node.getChildByName('level03').getComponent(cc.Button).interactable = false;
        }
        if(cc.sys.localStorage.getItem('hasPassed') === 2){
            this.node.getChildByName('level03').getComponent(cc.Button).interactable = true;
        }
        else{
            this.node.getChildByName('level03').getComponent(cc.Button).interactable = false;
        }
        */
        if(cc.sys.localStorage.getItem('hasPassed') === null) {
            cc.sys.localStorage.setItem('hasPassed', 0);
        }
        cc.log(cc.sys.localStorage.getItem('hasPassed'));
        if(cc.sys.localStorage.getItem('hasPassed') === '0') {
            this.node.getChildByName('level01').getComponent(cc.Button).interactable = true;
            this.node.getChildByName('level01').getChildByName('Background').color = new cc.Color(255, 255, 255);
            this.node.getChildByName('level02').getComponent(cc.Button).interactable = false;
            this.node.getChildByName('level02').getChildByName('Background').color = new cc.Color(127, 127, 127);
            this.node.getChildByName('level03').getComponent(cc.Button).interactable = false;
            this.node.getChildByName('level03').getChildByName('Background').color = new cc.Color(127, 127, 127);            
        } else if(cc.sys.localStorage.getItem('hasPassed') === '1') {
            this.node.getChildByName('level01').getComponent(cc.Button).interactable = true
            this.node.getChildByName('level01').getChildByName('Background').color = new cc.Color(255, 255, 255);
            this.node.getChildByName('level02').getComponent(cc.Button).interactable = true;
            this.node.getChildByName('level02').getChildByName('Background').color = new cc.Color(255, 255, 255);
            this.node.getChildByName('level03').getComponent(cc.Button).interactable = false;
            this.node.getChildByName('level03').getChildByName('Background').color = new cc.Color(127, 127, 127);            
        } else if(cc.sys.localStorage.getItem('hasPassed') === '2' || cc.sys.localStorage.getItem('hasPassed') === '3') {
            this.node.getChildByName('level01').getComponent(cc.Button).interactable = true
            this.node.getChildByName('level01').getChildByName('Background').color = new cc.Color(255, 255, 255);
            this.node.getChildByName('level02').getComponent(cc.Button).interactable = true;
            this.node.getChildByName('level02').getChildByName('Background').color = new cc.Color(255, 255, 255);
            this.node.getChildByName('level03').getComponent(cc.Button).interactable = true;
            this.node.getChildByName('level03').getChildByName('Background').color = new cc.Color(255, 255, 255);
        }
    },

    start () {

    },
    onclickbutton1:function(){
        cc.director.loadScene("Level01");
    },

    onclickbutton2:function(){
        cc.director.loadScene("Level02");
    },

    onclickbutton3:function(){
        cc.director.loadScene("Level03");
    },
    onclickbutton4:function(){
        cc.director.loadScene("衔接场景");
    },
    onclickbutton5:function(){
        cc.director.loadScene("tujian");
    },
    // update (dt) {},
});

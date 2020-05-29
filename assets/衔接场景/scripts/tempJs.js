// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        resizableNode:[cc.Node],
        gerenfanghu:cc.Node,
        yiMiaoYanZhi:cc.Node,
        sheQvFangYi:cc.Node,
        yaoYanPanel:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         cc.director.preloadScene("个人防护");
         cc.director.preloadScene("疫苗研制");
         cc.director.preloadScene("社区防疫");
         this.node.getChildByName('personalProtectionPageview').active = false;
     },

    start () {
        var speed=20;
        var time=2;
        for(var i=0;i<this.resizableNode.length;i++){
            if(i%2==0){
                this.resizableNode[i].runAction(cc.sequence(cc.moveBy(time,0,-speed),cc.moveBy(time,0,speed)).repeatForever());
            }
            else{
                this.resizableNode[i].runAction(cc.sequence(cc.moveBy(time,0,speed),cc.moveBy(time,0,-speed)).repeatForever());
            }
            
        }
    },

    buttonCtrl(event){
        // if(event.target.name === '个人防护') {
        //     this.node.getChildByName('personalProtectionPageview').active = true;
        // } else if(event.target.name === '人体免疫(总)') {
        //     cc.director.loadScene('人体免疫(总)');
        // }else if()


        switch(event.target.name){
            case "个人防护":
                this.node.getChildByName('personalProtectionPageview').active = true;
                break;
            case "人体免疫(总)":
                cc.director.loadScene('人体免疫(总)');
                break;
            case "社区防疫":
                this.node.getChildByName('sheqvPageview').active = true;
                break;
            case "疫苗研制":
                this.node.getChildByName('yimiaoPageview').active = true;
                break;
            case "谣言破除":
                this.node.getChildByName('yaoyanPageview').active = true;
                break;
            case "家园":
                cc.director.loadScene('家园');
                break;
            case "退出":
                cc.game.end();
                break;
        }
    },

    onClickPersonalProtection: function() {
        cc.director.loadScene('个人防护');
    },

    onClickYiMiao(){
        cc.director.loadScene('疫苗研制');
    },

    onClickSheQv(){
        cc.director.loadScene('社区防疫');
    },

    onClickYaoYan(){
        cc.director.loadScene('谣言破除');
    },
    // exitFun(){
    //     cc.game.end();
    // }
});

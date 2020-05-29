// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        sideButton:cc.Node,
        scene:cc.Node,
        layout:cc.Node,
        test:cc.Label,
        labelX:100,
        labelY:300,


    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // this.labelX=0;
        // this.labelY=0;
        // var a=this.createNewTemplate(["1222222222","456","789"],[this.addTest,this.addTest,this.addTest],0);
        //var a=this.createNewTemplate(["1222222222","456"],[this.addTest,this.addTest],0);
        
    },



    createNewTemplate(sideButtonList,funList,startAxis){
        var buttonList=new Array();
        var sc=cc.instantiate(this.layout);
        sc.active=true;
        sc.getComponent(cc.Layout).startAxis=startAxis;
        if(startAxis==0){
            sc.setContentSize(150*sideButtonList.length+50,40);
            sc.getComponent(cc.Layout).paddingLeft=50;
            sc.getComponent(cc.Layout).paddingTop=0;
        }
        if(startAxis==1){
            sc.setContentSize(100,65*sideButtonList.length+30);
            sc.getComponent(cc.Layout).paddingTop=0;
            sc.getComponent(cc.Layout).paddingLeft=0;
        }
        
        cc.director.getScene().addChild(sc);
        buttonList.push(sc);
        var nodeTemp;
        for(var i=0;i<sideButtonList.length;i++){
            
            nodeTemp=cc.instantiate(this.sideButton);
            sc.addChild(nodeTemp,i+1,sideButtonList[i]);
            nodeTemp.active=true;
            
            nodeTemp.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string=sideButtonList[i];
            nodeTemp.on('click',funList[i].bind(this));
            buttonList.push(nodeTemp);
        }
        return buttonList;
    },


    addTest(){
        this.test.string+=1;
    },


    // update (dt) {},
});

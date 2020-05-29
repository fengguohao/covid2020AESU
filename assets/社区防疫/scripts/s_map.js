// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //这里处理各个按钮的事件
        s_globalParameter:cc.Node,
        num:0,
        hospital:cc.Button,
        office:cc.Button,
        store:cc.Button,
        test:cc.Label,
        officeJs:cc.Node,
        hospitalJs:cc.Node,
        storeJs:cc.Node,
        stage:"null",
        retPanel:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.director.resume();
        //this.s_placeTemplate=this.s_placeTemplate.getComponent("s_placeTemplate");
        this.officeJs=this.officeJs.getComponent("s_office");
        this.hospitalJs=this.hospitalJs.getComponent("s_hospital");
        this.storeJs=this.storeJs.getComponent("s_store");

        this.hospital.node.runAction(cc.sequence(cc.scaleBy(1,1.25),cc.scaleBy(1,0.8)).repeat(6));
        this.store.node.runAction(cc.sequence(cc.scaleBy(1,1.25),cc.scaleBy(1,0.8)).repeat(6));
        this.office.node.runAction(cc.sequence(cc.scaleBy(1,1.25),cc.scaleBy(1,0.8)).repeat(6));
    },



    hospitalOnClick(){

       this.hospitalJs.showHospital();
       this.stage="hospital";
    },
    

    officeOnClick(){

        this.officeJs.showOffice();
        this.stage="office";
    },

    storeOnclick(){

        this.storeJs.showStore();
        this.stage="store";
    },

    closeAll(){
        this.stage="null";
    },
     update (dt) {
        
     },



     returnButtonOnClick(){
        cc.director.pause();
        this.retPanel.active=true;
     },

     cancelRet(){
        this.retPanel.active=false;
        cc.director.resume();
     },
     exitForSure(){
        cc.director.resume();
        cc.director.loadScene("衔接场景");
     }
});

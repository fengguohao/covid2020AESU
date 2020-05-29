// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        stage:100,
        time:10,
        processing:true,
        showLabel:cc.Label,
        globalStage:cc.Node
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // this.schedule(function(){
        //     this.reset(10);
        // }.bind(this),10);
        this.globalStage=this.globalStage.getComponent("r_globalStage");
    },

    reset(time){
        this.node.getComponent(cc.ProgressBar).progress=1;
        this.time=time;
        this.stage=parseInt(this.node.getComponent(cc.ProgressBar).progress*this.time*10)/10;
        
    },

    update (dt) {
        if(this.processing){
            this.stage=parseInt(this.node.getComponent(cc.ProgressBar).progress*this.time*10)/10;
            if(this.stage<0){this.stage=0}
            if(this.stage==0&&this.globalStage.nowStage==0){this.globalStage.exceedTime();this.globalStage.nowStage=2;}
            this.showLabel.string=this.stage;
            this.node.getComponent(cc.ProgressBar).progress-=(dt/this.time);
        }
        
    },
});

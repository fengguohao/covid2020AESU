// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
        speed:cc.Node,
        selectRet:cc.Node

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.timeDur1=15;
        this.timeDur2=13;
        this.speed.getComponent(cc.Button).interactable=false;
        this.speed.opacity=60;
        this.selectRet.getComponent(cc.Button).interactable=false;
        this.selectRet.opacity=60;

        

        this.speed.getComponent(cc.Button).schedule(function(){
            if(this.speed.getComponent(cc.Button).interactable==false){
                if(Math.random()>0.4){
                    this.speed.getComponent(cc.Button).interactable=true;
                    this.speed.opacity=255;
                    cc.director.getScheduler().pauseTarget(this.speed.getComponent(cc.Button));
                    
                }
            }
            
        }.bind(this),this.timeDur1);
        this.selectRet.getComponent(cc.Button).schedule(function(){
            if(this.selectRet.getComponent(cc.Button).interactable==false){
                if(Math.random()>0.4){
                    this.selectRet.getComponent(cc.Button).interactable=true;
                    this.selectRet.opacity=255;
                    cc.director.getScheduler().pauseTarget(this.selectRet.getComponent(cc.Button));
                }
            }
            
        }.bind(this),this.timeDur2);
    },
    

    onClickFunSpeed(){
        this.speed.getComponent(cc.Button).interactable=false;
        this.speed.opacity=60;
        
        cc.director.getScheduler().resumeTarget(this.speed.getComponent(cc.Button));
    },

    onClickFunRet(){
        this.selectRet.getComponent(cc.Button).interactable=false;
        this.selectRet.opacity=60;
        cc.director.getScheduler().resumeTarget(this.selectRet.getComponent(cc.Button));
    },

    // update (dt) {},
});

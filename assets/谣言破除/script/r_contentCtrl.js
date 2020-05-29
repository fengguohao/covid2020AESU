// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        content:cc.Label,
        trueButton:cc.Button,
        falseButton:cc.Button,
        ansStage:cc.Label,
        promotion:cc.Label,
        mContent:{
            default:null,
            type:cc.JsonAsset
        },
        rumorContent:null,
        trueAnsFrame:cc.SpriteFrame,
        falseAnsFrame:cc.SpriteFrame,
        nowAns:0,
        nowTag:0,
        globalStage:cc.Node,
        count:0,
        trueAudio:{
            default:null,
            type:cc.AudioClip
        },
        falseAudio:{
            default:null,
            type:cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
        
        this.rumorContent = this.mContent.json.content;
        this.globalStage=this.globalStage.getComponent("r_globalStage");
        this.nextContent();
        
        
    },

    nextContent(){
        this.count+=1;
        this.ansStage.node.active=false;
        this.promotion.node.active=false;
        this.trueButton.interactable=true;
        this.falseButton.interactable=true;
        this.nowTag=parseInt(Math.random()*this.rumorContent.length);
        this.content.string="第"+this.count+"题 "+this.rumorContent[this.nowTag].message;
        this.nowAns=this.rumorContent[this.nowTag].ans;
        this.promotion.string=this.rumorContent[this.nowTag].promotion;
    },

    chooseAns(event){
        var temp=0;
        this.ansStage.node.active=true;
        if(event.target.name=="yes"){temp=1;}
        if(event.target.name=="no"){temp=0;}
        if(temp==this.nowAns){
           
            cc.audioEngine.playEffect(this.trueAudio,false);
            this.ansStage.string="答对了√";
            this.ansStage.node.color=new cc.Color(0, 204, 0);
            this.globalStage.callNext();
            this.scheduleOnce(function(){
                this.nextContent();
            }.bind(this),3);
        }
        else{
            
            cc.audioEngine.playEffect(this.falseAudio,false);
            this.ansStage.string="答错了×";
            this.ansStage.node.color=new cc.Color(255, 0, 0);
            this.globalStage.failure();
            this.globalStage.callTimeShow();
        }
        this.promotion.node.active=true;
        this.trueButton.interactable=false;
        this.falseButton.interactable=false;
        
        
    },

    exceedTimeChange(){
        this.ansStage.node.active=true;
        
        cc.audioEngine.playEffect(this.falseAudio,false);
        this.ansStage.string="时间耗尽了";
        this.ansStage.node.color=new cc.Color(255, 0, 0);
        this.promotion.node.active=true;
        this.trueButton.interactable=false;
        this.falseButton.interactable=false;
    }
    // update (dt) {},
});

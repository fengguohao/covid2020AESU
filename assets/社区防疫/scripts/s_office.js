// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        office:cc.Node,
        s_map:cc.Node,
        showContent:cc.Node,
        passageRead:cc.WebView,
        policyDecideContent:cc.Layout,
        policyContent:cc.Node,
        advocacyContent:cc.Node,
        policyList:[cc.String],
        testRate:0,
        nowStageContent:cc.Node,
        infoPrompt:cc.Label,
        s_globalParameter:cc.Node,
        policyStage:[],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    showOffice(){
        this.office.active=true;

        this.policyDecide();
    },

    policyDecide(){
        if(this.s_map.stage=="office"){
            this.closeReadpassage();
            this.nowStageClose();
            this.closeAdvocacy();

            this.policyDecideContent.node.active=true;

        }
    },
    closePolicyDecide(){
        this.policyDecideContent.node.active=false;
    },
    advocacyCenter(){
        if(this.s_map.stage=="office"){
            this.closeReadpassage();
            this.closePolicyDecide();
            this.nowStageClose();

            this.advocacyContent.active=true;
        }
    },
    closeAdvocacy(){
        this.advocacyContent.active=false;
    },
    readPassage(){
        if(this.s_map.stage=="office"){
            this.closePolicyDecide();
            this.nowStageClose();
            this.closeAdvocacy();

            this.passageRead.node.active=true;
            
        }
    },
    closeReadpassage(){
        this.passageRead.node.active=false;
    },
    nowStage(){
        if(this.s_map.stage=="office"){
            this.closePolicyDecide();
            this.closeReadpassage();
            this.closeAdvocacy();

            this.nowStageContent.active=true;
            
        }
    },
    nowStageClose(){
        this.nowStageContent.active=false;
    },


    closeOffice(){
        this.s_map.closeAll();
        this.office.active=false;

    },


    //policy的效果写在这里
    policyButton(button){
        var temp=parseInt(button.target.getParent().name.charAt(6))-1;
        var promotionStr="";
        if(this.policyStage[temp]!=1){
            if(this.policyStage[temp]==0){
                this.showInfo("同一条政策不能频繁使用\n请过一会再试吧");
            }
            if(this.policyStage[temp]==-1){
                this.showInfo("此操作已超过可用上限");
            }
        }
        else if(this.policyCost[temp]>this.s_globalParameter.money){
            this.showInfo("资金不足，请筹备好资金再来试试吧");
        }
        else{
            
            this.policyStage[temp]=0;
            if(this.policyTime[temp]>this.timeLimit[temp]){
                this.showInfo("此操作已超过可用上限");
                this.policyStage[temp]=-1;
                return;
            }
            this.policyTime[temp]+=1;
            this.scheduleOnce(function(){
                this.policyStage[temp]=1;
            }.bind(this),20);
            switch(temp){
                case 0:
                    this.showInfo("使用成功，资金稍后到账");
                    this.scheduleOnce(function(){
                        var num=Math.floor(Math.random()*10)+30;
                        this.s_globalParameter.money+=num;
                        this.showInfo("上级拨款"+num+"万元到账");
                        
                    }.bind(this),5);
                    break;
                case 1:
                    var num=Math.floor(Math.random()*30)+50;
                    this.showInfo("使用成功，募集资金"+num+"万元");
                    this.s_globalParameter.money+=num;
                    break;
                case 2:
                    if(this.s_globalParameter.spreadIndex-0.04>=1){
                        this.s_globalParameter.spreadIndex-=0.04;
                    }
                    else{
                        this.s_globalParameter.spreadIndex=1;
                    }
                    this.showInfo("限制了外来人口的活动");
                    break;
                case 3:
                    if(this.s_globalParameter.spreadIndex-0.07>=1){
                        this.s_globalParameter.spreadIndex-=0.07;
                    }
                    else{
                        this.s_globalParameter.spreadIndex=1;
                    }
                    this.showInfo("限制了人们出行");
                    break;
                case 4:
                    if(this.s_globalParameter.spreadIndex-0.05>=1){
                        this.s_globalParameter.spreadIndex-=0.05;
                    }
                    else{
                        this.s_globalParameter.spreadIndex=1;
                    }
                    this.showInfo("娱乐场所已关闭");
                    break;
                case 5:
                    if(this.s_globalParameter.spreadIndex-0.04>=1){
                        this.s_globalParameter.spreadIndex-=0.04;
                    }
                    else{
                        this.s_globalParameter.spreadIndex=1;
                    }
                    this.showInfo("广泛推行了居家隔离");
                    break;
                case 6:
                    if(this.s_globalParameter.spreadIndex-0.04>=1){
                        this.s_globalParameter.spreadIndex-=0.04;
                    }
                    else{
                        this.s_globalParameter.spreadIndex=1;
                    }
                    this.showInfo("加强了宣传");
                    break;
                default:
                    this.showInfo("无效请求");
            }

            this.s_globalParameter.money-=this.policyCost[temp];
        }

        
    },

    showInfo(str){
        this.infoPrompt.node.active=true;
        this.infoPrompt.node.parent.active=true;
        this.infoPrompt.string=str;
        
        this.scheduleOnce(function(){
            this.infoPrompt.node.active=false;
            this.infoPrompt.node.parent.active=false;
        },2);
    },

    start () {
        this.s_map=this.s_map.getComponent("s_map");
        this.s_globalParameter=this.s_globalParameter.getComponent("s_globalParameter");
        this.policyList=this.policyContent.getChildren();

        var policyList=["请求上级拨款","募集资金","限制外来人口","限制出行","关闭娱乐场所","疑似患者居家隔离","加强疫情宣传"];
        this.policyCost=[20,50,30,40,30,20,30];
        this.policyStage=[1,1,1,1,1,1,1];//1可用，0不可用
        this.policyTime=[0,0,0,0,0,0,0];
        this.timeLimit=[5,5,5,5,5,5,];
        var introduction=["请求上级拨款\n可缓解资金压力","向社会募捐,\n可缓解资金压力",
        "可以减小\n疫情的\n传播风险","最大程度上\n减少接触",
        "减小疫情的\n传播风险","尽可能减少\n病毒传播",
        "提高人们的\n防范意识"
        ];
        for(var i=0;i<this.policyList.length;i++){
            this.policyList[i].getChildByName("name").getComponent(cc.Label).string=policyList[i];
            this.policyList[i].getChildByName("cost").getComponent(cc.Label).string=this.policyCost[i];
            this.policyList[i].getChildByName("introduction").getComponent(cc.Label).string=introduction[i];
        }
        
    },

     update (dt) {
         
     },
});

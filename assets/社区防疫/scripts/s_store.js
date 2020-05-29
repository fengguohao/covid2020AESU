// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        store:cc.Node,
        s_map:cc.Node,
        itemList:cc.Node,
        s_globalParameter:cc.Node,
        infoPrompt:cc.Label,
        errPrompt:cc.Label,

        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},


    showStore(){
        this.store.active=true;

        
    },


    closeStore(){
        this.s_map.closeAll();
        this.store.active=false;

    },



    itemButton(button){
        var i=parseInt(button.target.getParent().name.charAt(6))-1;
        if(this.itemCost[i]<=this.s_globalParameter.money){
            if(this.nowHave[i]==0){
                this.s_globalParameter.spreadIndex-=this.rateCause[i];
            }
            this.showInfo(this.itemListName[i]+"购买成功");
            this.nowHave[i]+=1;
            this.s_globalParameter.money-=this.itemCost[i];
        }
        else{
            this.showInfo("金钱不足，请筹集资金后购买");
        }

    
    
    },



    start () {
        this.s_globalParameter=this.s_globalParameter.getComponent("s_globalParameter");
        this.s_map=this.s_map.getComponent("s_map");
        this.itemList=this.itemList.getChildren();
        this.itemListName=["口罩","消毒液","N95口罩","蔬菜","肉类","大米","饮用水"];
        this.rateCause=[0,0,0,0,0,0,0];
        this.itemCost=[5,2,1,1,10,5,1];
        this.nowHave=[10,10,10,10,20,20,10];
        this.everyDayNeed=[1,1,1,1,1,2,1];
        this.measureWord=["万个","千瓶","千个","吨","吨","吨","万瓶"];
        
        for(var i=0;i<this.itemList.length;i++){
            this.itemList[i].getChildByName("name").getComponent(cc.Label).string=this.itemListName[i];
            this.itemList[i].getChildByName("introduction").getComponent(cc.Label).string=this.itemCost[i]+"万元"+"(1"+this.measureWord[i]+")";
        }
        this.schedule(function(){
            var flag=0;
            for(var i=0;i<this.nowHave.length;i++){
                if(this.nowHave[i]-this.everyDayNeed[i]>=0){
                    this.nowHave[i]-=this.everyDayNeed[i];
                }
                
                if(this.nowHave[i]/this.everyDayNeed[i]<3){
                    flag=flag>1?flag:1;
                    
                }
                if(this.nowHave[i]==0&&i>=0&&i<=2){
                    flag=flag>2?flag:2;
                    
                    this.rateCause[i]+=0.06;
                    this.s_globalParameter.spreadIndex+=0.06;
                    
                    if(this.rateCause[i]>0.18){
                        flag=3;
                        
                        //结算页待完成
                    }
                }
                
            }
            //粮食检查
            var flag2=1;
            for(var i=3;i<=5;i++){
                if(this.nowHave[i]!=0){
                    flag2=0;
                    break;
                }
            }
            
            if(flag==3){
                this.errPro("由于物资短缺，疫情更加严重了");
                this.scheduleOnce(function(){
                    this.s_globalParameter.gameOverEvent("itemNotEnough");
                }.bind(this),1);
               
            }
            
            if(flag==2){this.errPro("有重要防疫物资已耗尽，请速去商店查看");}
            if(flag==1){this.errPro("物资告急，请速去商店查看");}
            if(flag2==1){
                this.errPro("粮食全部耗尽，游戏失败");
                this.scheduleOnce(function(){
                    this.s_globalParameter.gameOverEvent("itemNotEnough");
                }.bind(this),1);
                
            }
            
        }.bind(this),15);
    },

     update (dt) {
        for(var i=0;i<this.itemList.length;i++){
            this.itemList[i].getChildByName("needAndNow").getComponent(cc.Label).string="现有"+this.nowHave[i]+this.measureWord[i]+"\n日需"+this.everyDayNeed[i]+this.measureWord[i];
        }
        
     },

     showInfo(str){
        this.infoPrompt.node.active=true;
        this.infoPrompt.string=str;
        
        this.scheduleOnce(function(){
            this.infoPrompt.node.active=false;
        },2);
    },


     errPro(content){
         this.errPrompt.node.active=true;
         this.errPrompt.node.parent.active=true;
         this.errPrompt.string=content;
         this.scheduleOnce(function(){
            this.errPrompt.node.active=false;
            this.errPrompt.node.parent.active=false;
         }.bind(this),5);
     },

     
});

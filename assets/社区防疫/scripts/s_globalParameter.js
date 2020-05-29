// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //如果方便的话，参数显示也可以在这里处理
        
        moneyLabel:cc.Label,
        timeLabel:cc.Label,
        //显示状态参数板块
        showBar:cc.Node,
        showLabel:cc.Label,
        timeOut:1,
        //显示状态：0未显示，1运动中，2正在显示
        stage:0,
        //历史疫情变化
        showNumChange:cc.Label,
        //时间信息
        showTime:cc.Label,
        promotion:cc.Label,
        storeJs:cc.Node,

        //进度
        gameTime:0,

        //传播系数，自然增长率，初始1.8
        spreadIndex:0,

        //感染人数
        injuredNum:0,
        injuredArray:[],
        //感染速度
        injuredSpeed:0,

        //隔离人数
        separatedNum:0,
        separatedArray:[],
        //隔离速度
        separatedSpeed:0,
        //治疗速度
        
        cureSpeed:0,
        cureArray:0,
        //死亡速度
        deathSpeed:0,
        deathArray:0,



        //居民满意度
        rSatisfaction:0,
        //信心指数
        confidenceIndex:0,
        //医院最大容纳人数
        hospitalNum:50,
        
        //医疗运转能力系数
        mCapability:0,
        
        
        //潜在传播者，由检查决定，显示在自然增长率上
        potentialNum:0,
        //防护意识,影响自然增长率-0.03，最多-0.15
        awarenessIndex:0,
        //防护措施,影响自然增长率-0.04最多-0.2
        measureScore:0,

        money:100,
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.money=100;
        this.storeJs=this.storeJs.getComponent("s_store");
        //参数初始化
        this.injuredNum=10;
        this.separatedNum=0;
        this.spreadIndex=1.8;
        this.mCapability=0.6;
        this.hospitalNum=50;
        this.fullInjured=10;
        this.fullDeath=0;
        this.gameTime=0;
        
        this.injuredArray=new Array();
        this.injuredDetla=new Array();
        this.separatedArray=new Array();
        this.cureArray=new Array();
        this.deathArray=new Array();
        this.injuredArray[0]=this.injuredNum;
        this.injuredDetla[0]=this.injuredNum;
        this.separatedArray[0]=0;
        this.callPromotion("告急！！告急！！\n社区内发现有人感染了病毒,\n请立即做好防控准备，\n下方可以查看当前疫情信息，\n点击不同地点以采取相应措施",5);
        this.schedule(function(){
            this.promotion.node.parent.height=60;
            
            //本期治疗人数计算

            var newCureSpeed=0;
            for(var i=0;i<this.gameTime;i++){
                if(this.separatedArray[i]>0){
                    if(this.gameTime-i<=14){
                        
                        
                        var temp=Math.ceil(Math.pow((this.gameTime-i)/14,3)*(this.separatedArray[i])*this.mCapability);
                        
                        newCureSpeed+=temp;
                        this.separatedArray[i]=this.separatedArray[i]-temp>=0?this.separatedArray[i]-temp:0;
                        this.injuredDetla[i]-=temp;
                    }
                    else{
    
                        var temp=Math.ceil((Math.random(0.2)+0.8)*(this.separatedArray[i])*this.mCapability);
                        newCureSpeed+=temp;
                        this.separatedArray[i]=this.separatedArray[i]-temp>=0?this.separatedArray[i]-temp:0;
                        this.injuredDetla[i]-=temp;
                    }
                    
                }
                
                
            }
            this.cureSpeed=Math.round(newCureSpeed);
            this.separatedNum=this.sumUp(this.separatedArray);
            this.cureArray[this.gameTime]=this.cureSpeed;

            //本期死亡人数计算
            var newDeathNum=(this.injuredNum-this.separatedNum)*0.05;
            for(var i=0;i<this.gameTime;i++){
                if(this.separatedArray[i]>0&&this.injuredArray[i]>=0){
                    if(this.gameTime-i<=14){
                        var temp=Math.round(Math.pow((this.gameTime-i)/14,3)*(this.separatedArray[i])*(1-this.mCapability));
                        newDeathNum+=(temp>=this.separatedArray[i]?this.separatedArray[i]:temp);
                        this.injuredDetla[i]-=(temp>=this.separatedArray[i]?this.separatedArray[i]:temp);
                        this.separatedArray[i]-=(temp>=this.separatedArray[i]?this.separatedArray[i]:temp);
                    }
                    else{
                        var temp=Math.floor((Math.random(0.5)+0.5)*(this.separatedArray[i])*(1-this.mCapability));
                        newCureSpeed+=(temp>=this.separatedArray[i]?this.separatedArray[i]:temp);
                        this.injuredDetla[i]-=(temp>=this.separatedArray[i]?this.separatedArray[i]:temp);
                        this.separatedArray[i]-=(temp>=this.separatedArray[i]?this.separatedArray[i]:temp);
                        
                    }
                }
            }
            this.deathSpeed=Math.round(newDeathNum);
            if(this.deathSpeed<0){this.deathSpeed=0;}
            this.deathArray[this.gameTime]=this.deathSpeed;
            this.separatedNum=this.sumUp(this.separatedArray);
            

            //隔离人数变化
            for(var i=0;i<this.gameTime;i++){
                if(this.injuredDetla[i]>=this.separatedArray[i]){
                    var temp=0;
                    if(this.gameTime-i>7){
                        temp=(this.injuredDetla[i]-this.separatedArray[i]);
                        this.separatedArray[i]=temp;
                    }
                    else{
                        temp=(this.injuredDetla[i]-this.separatedArray[i])*0.8;
                        
                    }
                    
                    this.separatedArray[i]+=Math.floor(temp);
                    
                    
                    if(this.sumUp(this.separatedArray)>=this.hospitalNum){
                        this.separatedArray[i]-=Math.floor(temp);
                        this.separatedArray[i]+=this.hospitalNum-this.sumUp(this.separatedArray);
                        break;
                    }
                    
                    }
            }
            this.separatedNum=this.sumUp(this.separatedArray);

            
            

            //this.spreadIndex=(this.injuredNum/(this.separatedNum+1))>1.8||(this.injuredNum/(this.separatedNum+1))<1?1.4:(this.separatedNum/this.injuredNum);
            //感染增速等于（感染人数-隔离人数）*自然增长率；自然增长率=传播系数-1

            if(this.injuredNum>this.separatedNum){
                this.injuredSpeed=Math.round((this.injuredNum-this.separatedNum)*(this.spreadIndex-1));
            }
            else{
                this.injuredSpeed=0;
            }
            this.fullInjured+=this.injuredSpeed;
            //
            //治疗速度和医院最大负载有关,和历史感染人数有关

            
            //全局时间统计
            this.gameTime+=1;
            //感染人数变化
            var newInjuredNum=Math.round(this.injuredNum+this.injuredSpeed-this.deathSpeed-this.cureSpeed);
           this.fullDeath+=this.deathSpeed;
        
            this.injuredNum=newInjuredNum>0?newInjuredNum:0;
            this.injuredArray[this.gameTime]=this.injuredNum;
            this.injuredDetla[this.gameTime]=this.injuredSpeed>0?this.injuredSpeed:0;
            this.separatedArray[this.gameTime]=0;
            
            if(this.gameTime<3&&this.stage==0){
                this.callPromotion("第"+this.gameTime+"天疫情信息已更新\n可在下方疫情实况板块查看",2);
            }
            else{
                this.callPromotion("第"+this.gameTime+"天疫情信息已更新\n今日新增病例"+this.injuredDetla[this.gameTime]+"例",2);
            }

            //信息展示：1.昨日今日感染人数，2.时间
            this.showNumChange.string="\n现存感染人数   "+this.injuredNum;
            this.showNumChange.string+="\n今日新增"+this.injuredDetla[this.gameTime]+"\n今日治愈"+this.cureSpeed+"\n今日死亡"+this.deathSpeed+"\n现有在院"+this.separatedNum+"\n累计患病"+this.fullInjured+"\n累计死亡"+this.fullDeath;
            this.showTime.string="距离首个病例发生已过去"+this.gameTime+"天";



           
        }.bind(this),15);
        
        this.schedule(function(){
            var temp=Math.floor(Math.random()*10+10);
            this.money+=temp;
            this.callPromotion("上级常规拨款"+temp+"万元到账",2);
        }.bind(this),23);

        

    },

    update(dt){
        this.moneyLabel.string="现有金钱\n"+this.money+"万元";
        this.timeLabel.string="第"+this.gameTime+"天";
        if(this.injuredNum==0){
            this.winEvent();
        }
        if(this.injuredNum>30000){
            this.gameOverEvent("numExceed");
        }

    },


    sumUp(array)
    {
        var sum=0;
        for(var i=0;i<array.length;i++){
            sum+=array[i];
        }
        return sum;
    },

    needShow(){
        
        var temp=cc.director.getScene().getChildren("Canvas")[0].height/2;
        if(this.stage==0){
            this.showBar.runAction(cc.moveBy(this.timeOut,cc.v2(0,temp+250)).easing(cc.easeBackIn()));
            this.stage=1;
            this.scheduleOnce(function(){
                this.stage=2;
                this.showLabel.string="隐藏";
            },this.timeOut);
        }
        if(this.stage==2){
            this.showBar.runAction(cc.moveBy(this.timeOut,cc.v2(0,-temp-250)).easing(cc.easeBackIn()));
            this.stage=1;
            this.scheduleOnce(function(){
                this.stage=0;
                this.showLabel.string="疫情实况";
            },this.timeOut);
        }
        

    },

    callPromotion(content,time){
        this.promotion.node.active=true;
        this.promotion.node.parent.active=true;
        this.promotion.string=content;
        this.scheduleOnce(function(){
            this.promotion.node.active=false;
            this.promotion.node.parent.active=false;
        }.bind(this),time);
    },


    //type:"itemNotEnough","numExceed"
    gameOverEvent(type){
        cc.sys.localStorage.setItem("s_gameStage","lose");
        cc.sys.localStorage.setItem("s_gameOver",type);
        cc.log("game over",type);
        cc.director.loadScene("社区结算界面");
    },
    

    winEvent(){
        cc.sys.localStorage.setItem("s_gameStage","win");
        cc.log("win");
        cc.director.loadScene("社区结算界面");
        
    }
});

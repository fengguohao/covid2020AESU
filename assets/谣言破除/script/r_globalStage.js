// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        total:cc.Label,
        totalTime:cc.Label,
        ResuCount:cc.Label,
        content:cc.Node,
        resuNum:0,
        time:0,
        finishNum:0,
        goingOn:true,
        bar:cc.Node,
        choosePanel:cc.Node,
        choosePromotion:cc.Label,
        resume:cc.Node,
        giveup:cc.Node,
        exit:cc.Node,
        again:cc.Node,
        nowStage:0,
        //0正常答题，1答题错误，等待复活，3等待下一题目
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.content=this.content.getComponent("r_contentCtrl");
        this.choosePanel.active=false;
        this.bar=this.bar.getComponent("r_bar");
        this.resuNum=5;
        this.ResuCount.string="复活机会"+this.resuNum+"次";
        //字段maxAnsNum,minTime(先看答案数目是否变多了)
        
    },

    

    update (dt) {
        if(this.goingOn){
            this.time+=dt;
            this.totalTime.string="总用时"+parseInt(this.time*10)/10+"秒";
        }
    },

    callNext(){
        this.nowStage=3;
        this.finishNum+=1;
        this.goingOn=false;
        this.totalTime.string="读读原因吧";
        this.total.string="回答正确"+this.finishNum+"个";
        this.bar.reset(3);

        this.scheduleOnce(function(){
            this.goingOn=true;
            this.nowStage=0;
            this.bar.reset(10);
        }.bind(this),3);
    },

    callTimeShow(){
        this.bar.reset(3);
    },
    failure(){
        this.nowStage=1;
        if(this.resuNum>0){
            //this.bar.processing=false;
            this.goingOn=false;
            this.totalTime.string="读读原因吧";
            this.scheduleOnce(function(){
                this.choosePromotion.string="答题错误，是否复活？"
                this.choosePanel.active=true;
                this.choosePanel.width=700;
                this.choosePanel.height=360;
                this.choosePanel.runAction(cc.sequence(cc.scaleBy(0.3,1.2),cc.scaleBy(0.3,0.82)));
                this.resume.active=true;
                this.giveup.active=true;
                this.again.active=false;
                this.exit.active=false;
            }.bind(this),3);
        }
        else{
           // this.bar.processing=false;
            this.goingOn=false;
            this.totalTime.string="读读原因吧";

            this.scheduleOnce(function(){
                if(cc.sys.localStorage.getItem('r_maxAnsNum')!=null){
                    this.choosePromotion.string="本次答对题目"+this.finishNum+"个，"
                    +"总用时"+parseInt(this.time*10)/10+"秒\n"+"历史最佳：答对"+cc.sys.localStorage.getItem('r_maxAnsNum')+"个，总用时"
                    +cc.sys.localStorage.getItem('r_minTime')+
                    "秒\n"+"您已经没有复活机会了"
                }
                else{
                    this.choosePromotion.string="您已经没有复活机会了";
                }
                this.choosePanel.active=true;
                this.choosePanel.width=700;
                this.choosePanel.height=360;
                this.choosePanel.runAction(cc.sequence(cc.scaleBy(0.3,1.2),cc.scaleBy(0.3,0.82)));
                this.resume.active=false;
                this.giveup.active=false;
                this.again.active=true;
                this.exit.active=true;
                this.storageInfo();
            }.bind(this),3);
        }
    },

    exceedTime(){
        this.content.exceedTimeChange();
        
            this.goingOn=false;
            this.totalTime.string="读读原因吧";
            this.callTimeShow();
            this.scheduleOnce(function(){
                if(this.resuNum>0){
                    this.choosePromotion.string="时间耗尽，是否复活？"
                    this.resume.active=true;
                    this.giveup.active=true;
                    this.again.active=false;
                    this.exit.active=false;
                }
                else{
                    this.choosePromotion.string="您已经没有复活机会了";
                    this.resume.active=false;
                    this.giveup.active=false;
                    this.again.active=true;
                    this.exit.active=true;
                    this.storageInfo();
                }
                this.choosePanel.width=700;
                this.choosePanel.height=360;
                this.choosePanel.active=true;
                this.choosePanel.runAction(cc.sequence(cc.scaleBy(0.3,1.2),cc.scaleBy(0.3,0.82)));
                
            }.bind(this),3);
    },
    resumeOnClick(){
        this.resuNum-=1;
        this.goingOn=true;
        this.ResuCount.string="复活机会"+this.resuNum+"次";
        this.content.nextContent();
        this.bar.processing=true;
        this.bar.reset(10);
        this.choosePanel.active=false;
        this.nowStage=0;
    },
    againOnClick(){
        cc.director.loadScene("谣言破除");
    },
    giveUpOnClick(){
        if(cc.sys.localStorage.getItem('r_maxAnsNum')!=null){
            this.choosePromotion.string="本次答对题目"+this.finishNum+"个，"
            +"总用时"+parseInt(this.time*10)/10+"秒\n"+"历史最佳：答对"+cc.sys.localStorage.getItem('r_maxAnsNum')+"个，总用时"
            +cc.sys.localStorage.getItem('r_minTime')+
            "秒\n"+"要再来一次吗？"
        }
        else{
            this.choosePromotion.string="要再来一次吗？";
        }
        this.choosePanel.active=true;
        this.choosePanel.width=700;
        this.choosePanel.height=360;
        this.choosePanel.runAction(cc.sequence(cc.scaleBy(0.3,1.2),cc.scaleBy(0.3,0.82)));
        this.resume.active=false;
        this.giveup.active=false;
        this.again.active=true;
        this.exit.active=true;
        this.storageInfo();
    },
    exitOnClick(){
        
        cc.director.loadScene("衔接场景");
    },

    storageInfo(){

        if(cc.sys.localStorage.getItem('r_maxAnsNum')==null){
            cc.sys.localStorage.setItem('r_maxAnsNum',this.finishNum);
            cc.sys.localStorage.setItem('r_minTime',parseInt(this.time*10)/10);
        }
        else if(parseInt(cc.sys.localStorage.getItem('r_maxAnsNum'))<this.finishNum
        ||(parseInt(cc.sys.localStorage.getItem('r_maxAnsNum'))==this.finishNum
        &&parseFloat(cc.sys.localStorage.getItem('r_minTime'))>parseInt(this.time*10)/10)){
            cc.sys.localStorage.setItem('r_maxAnsNum',this.finishNum);
            cc.sys.localStorage.setItem('r_minTime',parseInt(this.time*10)/10);
        }

    }

});

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        hospital:cc.Node,
        s_map:cc.Node,
        improvingCheck:0,
        checkCount:0,
        capacityCount:0,
        improvingCapacity:0,
        improveingAbility:0,
        s_globalParameter:cc.Node,
        zhuangtai:cc.Label,
        infoPrompt:cc.Label,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},



    showHospital(){
        this.hospital.active=true;

        
    },

    start () {
        this.improvingCapacity=0;
        this.improvingCheck=0;
        this.capacityCount=0;
        this.checkCount=0;
        this.s_map=this.s_map.getComponent("s_map");
        this.s_globalParameter=this.s_globalParameter.getComponent("s_globalParameter");
    },


    closeHospital(){
        this.s_map.closeAll();
        this.hospital.active=false;

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


    improveCapacity(){
        if(this.improvingCapacity==0&&this.s_globalParameter.money>=30){
            this.improvingCapacity=1;
            this.s_globalParameter.money-=30;
            this.showInfo("医院正在扩建");
            this.scheduleOnce(function(){
                this.checkCount+=1;
                this.improvingCapacity=0;
                this.s_globalParameter.hospitalNum+=this.s_globalParameter.injuredNum*0.1>100?parseInt(this.s_globalParameter.injuredNum*0.1):100;
                this.showInfo("扩建成功，容量"+this.s_globalParameter.hospitalNum);
            }.bind(this),10);
        }
        else{
            if(this.s_globalParameter.money<30){
                this.showInfo("金钱不足，请稍后再试");
            }
            else{
                this.showInfo("医院正在扩建中，请稍后再试");
            }
        }
    },



    improveCheck(){
        if(this.improvingCheck==0&&this.s_globalParameter.money>=20){
            this.s_globalParameter.money-=20;
            this.improvingCheck=1;
            this.showInfo("正在努力提高检测能力");
            this.scheduleOnce(function(){
                this.s_globalParameter.spreadIndex-=0.03;      
                this.improvingCheck=0;          
            }.bind(this),10);
        }
        else{
            if(this.s_globalParameter.money<20){
                this.showInfo("金钱不足，请稍后再试");
            }
            else{
                this.showInfo("操作失败，请稍后再试");
            }
        }
    },

    improveAbility(){
        if(this.improveingAbility==0&&this.s_globalParameter.money>=10){
            this.s_globalParameter.money-=10;
            this.improveingAbility=1;
            this.showInfo("正在购买设备");
            this.scheduleOnce(function(){
                if(this.s_globalParameter.mCapability+0.1<=1)
                {
                    this.s_globalParameter.mCapability+=0.1;
                }
                else{
                    this.s_globalParameter.mCapability=1;
                }
                this.improveingAbility=0;
            }.bind(this),10);
        }
        else{
            if(this.s_globalParameter.money<10){
                this.showInfo("金钱不足，请稍后再试");
            }
            else{
                this.showInfo("操作失败，请稍后再试");
            }
        }
    },
     update (dt) {
        this.zhuangtai.string="当前医院总容量："+this.s_globalParameter.hospitalNum+
        "\n实际在院患者："+this.s_globalParameter.separatedNum+
        "\n载荷率"+parseInt(this.s_globalParameter.separatedNum*100/this.s_globalParameter.hospitalNum)+"%";
     },
});

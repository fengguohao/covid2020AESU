// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    //neighborSeat为邻座，others为其他乘客
    properties: {
        neighborSeat: cc.Node,
        others: [cc.Node],
        tip: [cc.Label],
        isMoving:[0,0,0,0,0,0,0,0,0],
        stage:null,
        //随机移动出现时间
        timeForMove:20,
        //移动持续时间
        timeDur:20,
        //移动距离限制模块还要完善
        count:null,
        typeNum:null,
        uicontrol:cc.Node

        
    },

    // LIFE-CYCLE CALLBACKS:
    // checkFun(random,disX,disY){
    //     for(var i=0;i<9;i++){
    //         if(i!=random){
    //             if(Math.abs(this.others[i].x-disX-this.others[random].x)<80&&Math.abs(this.others[i].y-disY-this.others[random].y)<80){
    //                 return false;
    //             }
    //         }
    //     }
    //     return true;
    // },


    

    onLoad () {
        //给neighborSeat和others添加并初始化isVisited, speed, dirX, dirY等属性
        //isVisited用于判断该乘客是否已经计算过增加的概率了
        //目前乘客初始化位置待定
        this.typeNum=[1,2,3,4,1,2,3,4,1];
        this.timeDurIndex=[0,0,0,0,0,0,0,0,0];
        this.speed=40;
        this.uicontrol=this.uicontrol.getComponent("UIcontrol");
        this.isMoving=[0,0,0,0,0,0,0,0,0];
        this.count=new Array();
        this.stage=new Array();
        for(var i=0;i<9;i++){
            this.stage[i]=new Array();
            for(var j=0;j<=2;j++){
                this.stage[i][j]=0;
            }
        }
        this.timeForMove=3;
        this.timeDur=1;
        // this.neighborSeat.x = 300;
        // this.neighborSeat.y = 200;
        this.neighborSeat.isVisited = false;
        this.neighborSeat.isVisitedSameOnce = false;
        this.neighborSeat.isVisitedOppositeOnce = false;
        this.neighborSeat.isVisitedOppositeTwice = false;
        this.neighborSeat.speed = 33;
        this.neighborSeat.dirX = 1;
        this.neighborSeat.dirY = 0;
        this.neighborSeat.direction = 'right';
        // this.others[0].x = 0;
        // this.others[0].y = 0;
        // this.others[1].x = -200;
        // this.others[1].y = 280;
        // this.others[2].x = -120;
        // this.others[2].y = 100;
        // this.others[3].x = 0;
        // this.others[3].y = -200;
        // this.others[4].x = 120;
        // this.others[4].y = 80;
        // this.others[5].x = 200;
        // this.others[5].y = -100;
        // this.others[6].x = 350;
        // this.others[6].y = 0;
        // this.others[7].x = 450;
        // this.others[7].y = -200;
        // this.others[8].x = 550;
        // this.others[8].y = 250;
        
        for(var i = 0; i <= 8; i++) {
            this.others[i].isVisitedSameOnce = false;
            this.others[i].isVisitedOppositeOnce = false;
            this.others[i].isVisitedOppositeTwice = false;
            this.others[i].isVisited = false;
            this.others[i].speed = 33;
            this.others[i].dirX = 1;
            this.others[i].dirY = 0;
            this.others[i].direction = 'right';
            //this.tip[i].active = false;
        } 

    },

    start () {
        this.schedule(function(){
            

            if(this.count.length==0){
                var a=this.randomSelect();
                if(a!=-1){
                    this.count[this.count.length]=a;
                }
                
                
            }
            else{
                //console.log(this.count);
                if(this.count.length<6){
                    if(Math.random()<0.75){
                        var a=this.count[parseInt(Math.random()*this.count.length,10)];
                        if(a!=null){
                            //console.log(a+" " +this.check(a)+"  "+this.stage[a][0]);

                            this.move(a);
                        }
                    }
                    else{
                        var a=this.randomSelect();
                        if(a!=-1){
                            this.count[this.count.length]=a;
                        }
                    }
                }
                else{
                    var a=this.count[parseInt(Math.random()*this.count.length,10)];
                        if(a!=null){
                            //console.log(a+" " +this.check(a)+"  "+this.stage[a][0]);

                            this.move(a);}
                }
                
            }
            
        }.bind(this),this.timeForMove);
    },

    randomSelect(){
        var randomNum=parseInt(Math.random()*9,10);
        var flag=true;
        for(var i=0;i<this.count.length;i++){
            if(this.count[i]==randomNum){
                flag=false;
                break;
            }
        }
        if(this.count.length>=5&&!flag){
            return -1;
        }
        while(!flag&&this.count.length<5){
            randomNum=parseInt(Math.random()*9,10);
            flag=true;
            for(var i=0;i<this.count.length;i++){
                if(this.count[i]==randomNum){
                    flag=false;
                    break;
                }
            }
        }
        return randomNum;
    },
    
    check(index,step){
        var left=1,right=1;
        for(var i=0;i<9;i++){
            if(i!=index){
                var d=Math.abs(this.others[index].y-this.others[i].y);
                if(this.others[index].x<this.others[i].x&&this.others[index].x+step+25>this.others[i].x&&d<20){
                    right=0;
                    break;
                }
            }
        }
        for(var i=0;i<9;i++){
            if(i!=index){
                var d=Math.abs(this.others[index].y-this.others[i].y);
                if(this.others[index].x-step-25<this.others[i].x&&this.others[index].x>this.others[i].x&&d<20){
                    left=0;
                    break;
                }
            }
        }
        if(left==0&&right==0){
            if(this.stage[index][2]==0){
                return "back";
            }
            else{
                if(Math.random()>0.5){
                    return "back";
                }
                return "wait";
            }
            
        }
        if(left!=0&&right!=0){
            if(Math.random()<0.3){
                return "left";
            }
            else if(Math.random()>0.7){
                return "right";
            }
            return "back";
        }
        return left==0?"right":"left";
    
    },
    
    moveX(index,step,stage){
        
        var dx=0;
        switch(stage){
            case "left":
                dx=-step;
                this.stage[index][2]=dx+this.stage[index][2];
                this.stage[index][0]=2;
                this.others[index].direction="left";
                this.uicontrol.Walk(this.others[index],this.typeNum[index],this.others[index].direction);
                break;
            case "right":
                dx=step;
                this.stage[index][2]=dx+this.stage[index][2];
                this.stage[index][0]=2;
                this.others[index].direction="right";
                this.uicontrol.Walk(this.others[index],this.typeNum[index],this.others[index].direction);
                break;
            case "back":
                dx=-this.stage[index][2];
                this.stage[index][2]=0;
                // this.stage[index][0]=1;
                if(dx>0){
                    this.others[index].direction="right";
                    this.uicontrol.Walk(this.others[index],this.typeNum[index],this.others[index].direction);
                }
                if(dx<0){
                    this.others[index].direction="left";
                    this.uicontrol.Walk(this.others[index],this.typeNum[index],this.others[index].direction);
                }
                break;
        }	
            //console.log(index+" stage2 "+this.stage[index][2]+"dx"+dx);
        var actionBy = cc.moveBy(Math.abs(dx)/this.speed,cc.v2(dx,0));
        this.others[index].runAction(actionBy);	
        var directionT=this.others[index].direction;
        this.scheduleOnce(function(){
           
            this.uicontrol.stopSome(this.others[index],this.typeNum[index],directionT);
            this.timeDurIndex[index]-=Math.abs(dx)/this.speed;
        },Math.abs(dx)/this.speed);
        this.timeDurIndex[index]+=Math.abs(dx)/this.speed;
        
    },
    
    moveY(index,step,stage){
        
        // this.scheduleOnce(function() {
            
        // }.bind(this), this.others[index].getNumberOfRunningActions()*this.timeDur);
        var dy=0;
            switch(stage){
                case "go":
                    if(this.others[index].y>0){
                        dy=-step;
                    }
                    else{
                        dy=step;
                    }
                    this.stage[index][1]=dy;
                    //console.log("第"+index+"个"+(this.others[index].y));
                    break;
                case "back":
                    dy=-this.stage[index][1];
                    this.stage[index][1]=0;
                    break;
        
                }
        //console.log(dy+" y方向分量"+index);
        if(dy>0){
            this.others[index].direction="up";
        }
        if(dy<0){
            this.others[index].direction="down";
        }
        this.uicontrol.Walk(this.others[index],this.typeNum[index],this.others[index].direction);
        this.timeDurIndex[index]+=Math.abs(dy)/this.speed;
        var actionBy = cc.moveBy(Math.abs(dy)/this.speed,cc.v2(0,dy));
        this.others[index].runAction(actionBy);	
        var directionT=this.others[index].direction;
         this.scheduleOnce(function(){
             
             this.others[index].direction="right";
             this.uicontrol.Walk(this.others[index],this.typeNum[index],this.others[index].direction);
         }.bind(this),Math.abs(dy)/this.speed);
         this.scheduleOnce(function(){
            
             this.uicontrol.stopSome(this.others[index],this.typeNum[index],this.others[index].direction);
             this.timeDurIndex[index]-=Math.abs(dy)/this.speed;
        }.bind(this),Math.abs(dy)/this.speed+0.1);
       
        
        
        
    },
    
    moveBack(index){
        if(this.stage[index][0]==2){
            
            this.moveX(index,0,"back");
            this.scheduleOnce(function() {
                this.moveY(index,150,"back");
            }, this.timeDurIndex[index]);
                
            
        }
        else{
            this.moveY(index,150,"back");
        }
            
        
    },
    
    move(index){
        
        if(this.stage[index][0]==0){
            this.moveY(index,150,"go");
            //console.log(index+"成功离开noveY");
            
            this.stage[index][0]=1;
        }
        else if((this.stage[index][0]==1||this.stage[index][0]==2)&&this.others[index].getNumberOfRunningActions()==0){
            var step=Math.random()*400
            switch(this.check(index,step)){
                case "back":
                    this.moveBack(index);
                    this.stage[index][0]=0;
                    for(var i=0;i<this.count.length;i++){
                        if(this.count[i]==index){
                            this.count.splice(i,1);
                            break;
                            
                        }
                    }
                    //console.log ("直接返回");
                    break;
                case "left":
                    this.moveX(index,step,"left");
                    //console.log ("左转");
                    break;
                case "right":
                    this.moveX(index,step,"right");
                    //console.log ("右转");
                    break;
    
            }
        }

    },
    // onCollisionEnter: function (other, self) {
    //     this.node.destroy();
    // },

    update (dt) {

        //不再需要，上面已经加入了方向检测

        // //更新方向
        // if(this.dirX === -1 && this.dirY === 0) {
        //     this.direction = 'left';
        // } else if(this.dirX === 1 && this.dirY === 0) {
        //     this.direction = 'right';
        // } else if(this.dirX === 0 && this.dirY === -1) {
        //     this.direction = 'down';
        // } else if(this.dirX === 0 && this.dirY === 1) {
        //     this.direction = 'up';
        // }


    },

    selectBack(){

        for(var index=0;index<this.count.length;index++){
            var a=this.count[index];

            if(Math.random()>0.2&&this.others[a].getNumberOfRunningActions()==0){

                this.moveBack(a);
                    this.stage[a][0]=0;
                    for(var i=0;i<this.count.length;i++){
                        if(this.count[i]==a){
                            this.count.splice(i,1);
                            break;
                            
                        }
                    }
            }
        }
    },


});

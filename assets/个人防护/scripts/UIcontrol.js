// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //功能：用节点控制另一个节点移动
        //绑定节点即可运行
        //控制的节点
        gamePlayer:{
            default:null,
            type:cc.Node
        },
        //受控节点
        controlBar:{
            default:null,
            type:cc.Node
        },
        backGround:{
            default:null,
            type:cc.Node
        },
        controlPos:cc.Vec2,
        defaultPos:cc.Vec2,
        touchPoint:cc.Vec2,
        speed:50,
        ontouch:0,
        dirY:0,
        dirX:0,
        //控制摇杆半径
        controlRadius:100,
        gamePlayerjs:cc.Component,

        neighborShortDistance: cc.Node,
        
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         //启动碰撞组件
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = true;
        this.defaultPos=this.controlBar.getPosition();
         //速度
        this.speed=50;
        //控制摇杆半径
        this.controlRadius=100;
        //获取gamePlayerjs的控制权限
        this.gamePlayerjs=this.gamePlayer.getComponent('gamePlayer');

         //下面的内容控制了节点行为
        //点按开始
         this.controlBar.on(cc.Node.EventType.TOUCH_START,function(event){
            this.ontouch=1;
         },this);
         //点按中，控制gamePlayer运行，并且将方向(direction)传给了gamePlayer
         //在点按中检测距离
         this.controlBar.on(cc.Node.EventType.TOUCH_MOVE,function(event){
            this.neighborShortDistance.getComponent('neighborJS').hasLaunched = false;
            this.controlPos=this.controlBar.getParent().convertToNodeSpaceAR(event.getTouches()[0].getLocation());
             if(this.controlPos.sub(this.defaultPos).mag()<=this.controlRadius){
                this.controlBar.setPosition(this.controlPos);
             }
             else {
                 var vecFrom=this.defaultPos.sub(this.controlPos);
                 this.controlBar.setPosition(this.defaultPos.sub(vecFrom.div(vecFrom.mag()/this.controlRadius)));
             }
             //确定绝对方向
             this.dirX=this.controlPos.x-this.defaultPos.x;
             this.dirY=this.controlPos.y-this.defaultPos.y;
             if(Math.abs(this.dirX)>Math.abs(this.dirY)){
                 this.dirX=-this.dirX/Math.abs(this.dirX);
                 this.dirY=0;
             }
             else{
                this.dirY=-this.dirY/Math.abs(this.dirY);
                this.dirX=0;
             }
            
             
    
         },this);
         //点按结束，重置控制摇杆
         this.controlBar.on(cc.Node.EventType.TOUCH_END,function(event){
            this.controlBar.setPosition(this.defaultPos);
            this.ontouch=0;
        },this);
         this.controlBar.on(cc.Node.EventType.TOUCH_CANCEL,function(event){
             this.controlBar.setPosition(this.defaultPos);
             this.ontouch=0;
         },this);

         //屏幕滑动调整
         this.backGround.on(cc.Node.EventType.TOUCH_START,function(event){
            this.touchPoint=event.getTouches()[0].getLocation();
         },this);
         this.backGround.on(cc.Node.EventType.TOUCH_MOVE,function(event){
             var pos1=event.getTouches()[0].getLocation();
             var dmove=cc.v2(this.touchPoint.x-pos1.x,0)
             this.backGround.setPosition(this.backGround.getPosition().sub(dmove));
            this.touchPoint=pos1;
            if(Math.abs(this.backGround.x)+this.backGround.parent.width/2>this.backGround.width/2){
                if(this.backGround.x<0){
                    this.backGround.x=this.backGround.parent.width/2-this.backGround.width/2;
                }
                if(this.backGround.x>0){
                    this.backGround.x=this.backGround.width/2-this.backGround.parent.width/2;
                }
            }
            
            
         },this);
         this.backGround.on(cc.Node.EventType.TOUCH_END,function(event){
             this.touchPoint=null;
         },this);
         /*
         this.schedule(function(){
            this.gamePlayerjs.judgeDistance();
            this.gamePlayerjs.judgeNeighbor();
         },0.5);
         */

         
     },

    start () {
        
    },

    onEnable() {
        this.neighborShortDistance.getComponent('neighborJS').hasLaunched = false;
    },


    update (dt) {
        
        //更新gamePlayer位置
        if(this.ontouch==1){
            var xplus=0;
            var yplus=0;
            var onBump=this.gamePlayerjs.onBump;
            switch(onBump){
                case 1:
                    //上边界
                    yplus=Math.abs(this.speed*this.dirY*dt);
                    xplus=0;
                    //播放碰撞音效
                    break;
                case 2:
                    //下边界
                    yplus=-Math.abs(this.speed*this.dirY*dt);
                    xplus=0;
                    //播放碰撞音效
                    break;
                case 3:
                    xplus=Math.abs(this.speed*this.dirX*dt);
                    yplus=0;
                    //播放碰撞音效
                    break;
                case 4:
                    xplus=-Math.abs(this.speed*this.dirX*dt);
                    yplus=0;
                    //播放碰撞音效
                    break;
                default:
                    xplus=0;
                    yplus=0;
            }

            
            // console.log(onBump);
            // if(this.gamePlayer.y+this.backGround.y>=320){
            //     yplus=1;
            // }
            // if(this.gamePlayer.y+this.backGround.y<=-320){
            //     yplus=-1;
            // }
            
            //防止出画的处理+地图移动处理
            if((this.gamePlayer.x+this.backGround.x<-300&&this.dirX==1||this.gamePlayer.x+this.backGround.x>300&&this.dirX==-1)){
                // if((Math.abs(this.backGround.x)+this.backGround.parent.width/2<this.backGround.width/2+20)
                if((Math.abs(this.backGround.x)+this.backGround.parent.width/2>this.backGround.width/2+2)){
                    if(this.backGround.x*this.dirX<0){
                        this.backGround.setPosition(this.backGround.getPosition().sub(cc.v2(-1*this.speed*this.dirX*dt+xplus,0)));
                        this.gamePlayer.setPosition(this.gamePlayer.getPosition().sub(cc.v2(this.speed*this.dirX*dt+xplus,this.speed*this.dirY*dt+yplus)));
                    }
                    else{
                        this.gamePlayer.setPosition(this.gamePlayer.getPosition().sub(cc.v2(this.speed*this.dirX*dt+xplus,this.speed*this.dirY*dt+yplus)));
                    }
                }
                else {
                    this.backGround.setPosition(this.backGround.getPosition().sub(cc.v2(-1*this.speed*this.dirX*dt+xplus,0)));
                    this.gamePlayer.setPosition(this.gamePlayer.getPosition().sub(cc.v2(this.speed*this.dirX*dt+xplus,this.speed*this.dirY*dt+yplus)));
                }
                
            }
            else{
                this.gamePlayer.setPosition(this.gamePlayer.getPosition().sub(cc.v2(this.speed*this.dirX*dt+xplus,this.speed*this.dirY*dt+yplus)));
            }
           
            //将方向信息传给gamePlayer
            if(this.dirX === -1 && this.dirY === 0) {
                this.gamePlayerjs.direction = 'right';
                this.Walk(this.gamePlayer,2,this.gamePlayerjs.direction);
            } else if(this.dirX === 1 && this.dirY === 0) {
                this.gamePlayerjs.direction = 'left';
                this.Walk(this.gamePlayer,2,this.gamePlayerjs.direction);
            } else if(this.dirX === 0 && this.dirY === -1) {
                this.gamePlayerjs.direction = 'up';
                this.Walk(this.gamePlayer,2,this.gamePlayerjs.direction);
            } else if(this.dirX === 0 && this.dirY === 1) {
                this.gamePlayerjs.direction = 'down';
                this.Walk(this.gamePlayer,2,this.gamePlayerjs.direction);
            }
            //检测距离
            
        }else{
            this.Walk(this.gamePlayer,2,"stop");
        }
    },

     //快速回位的事件回调
    moveRet(){
        if((Math.abs(this.backGround.parent.width/4-this.gamePlayer.x)+this.backGround.parent.width/2>this.backGround.width/2)){
            if(this.gamePlayer.x>0){
                this.backGround.x=this.backGround.parent.width/2-this.backGround.width/2;
            }
            if(this.gamePlayer.x<0){
                this.backGround.x=this.backGround.width/2-this.backGround.parent.width/2;
            }
        }
        else{
            this.backGround.x=this.backGround.parent.width/4-this.gamePlayer.x;
        }
        
     },

     Walk(people,npcType,direction){
        var animCtrl = people.getComponent(cc.Animation);
        var now=0;
        if(animCtrl.currentClip!=null){
            now=animCtrl.currentClip.name;
        }
         if(now!="npc"+npcType+direction&&direction!="stop"||(now=="npc"+npcType+direction&&animCtrl.getAnimationState(now)._isPlaying==false)){
            animCtrl.play("npc"+npcType+direction);
         }
         if(direction=="stop"){
             animCtrl.stop();
         }
        
        
     },
     stopSome(people,npctype,direction){
        var animCtrl = people.getComponent(cc.Animation);
        animCtrl.stop("npc"+npctype+direction);
     },

     speedUp(){
         this.speed=100;
         this.scheduleOnce(function(){
             this.speed=50;
         }.bind(this),5);
     }
});

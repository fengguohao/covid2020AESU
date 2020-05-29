// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        referenceNode:{
            default:null,
            type:cc.Node
        },
        //被传染的概率
        infectPossibility: 1,
        //关联提示框
        //sameOnce: cc.Node,
        //sameTwice: cc.Node,
        //oppositeOnce: cc.Node,
        //oppositeTwice: cc.Node,
        neighbor: cc.Node,
        neighborShortDistance: cc.Node,
        //关联其他乘客
        npc: cc.Node,
        //移动方向
        direction:cc.String,
        //走廊宽度的一半
        corridorWidth:85,
        //走廊长度的一半
        corridorLength:360,
        //面对面最小距离
        faceDisLim:100,
        //一般距离
        faceDis:480,
        //邻座距离
        neighborDis:60,
        //可能性我实在分不出来了，最好分一下

        chechLabel:cc.Label,

        onBump:0,

        hasWashedHandsBefore: false,
        hasWashedHandsAfter: false,
        hasReleased: false,
        audioMgr:cc.Node



    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.npc = this.npc.getComponent('npc');
        this.direction = 'left';
        this.corridorWidth=85;//好像有点小
        this.corridorLength=360;
        this.faceDisLim=100;
        this.faceDis=480;
        this.neighborDis=60;
        this.audioMgr=this.audioMgr.getComponent("AudioMgr");
        this.scheduleOnce(function(){
            this.audioMgr.playMusic("trainMusic");
        }.bind(this),5);

        this.lastY = 75;

    },

    // start () {
    // },

    update (dt) {
        this.judgeDistance();
        this.judgeNeighbor();
    },

    //判断gamePlayer和npc的距离
    judgeDistance: function() {
        var npc = this.npc.getComponent('npc');
        //console.log(this.npc.others[0].x-this.node.x);
        
        
        for(var i = 0; i <= 8; i++) {
            var Dx=this.node.x - npc.others[i].x;
            var Dy=this.node.y - npc.others[i].y;
            //console.log(npc.others[i].isVisited);
            //从背后距离不足够大的情况
            if(npc.others[i].isVisited === false && npc.others[i].direction === this.direction && 
                (this.direction === 'left' && this.node.x < npc.others[i].x ||
                 this.direction === 'right' && this.node.x > npc.others[i].x)) {

                if(Math.abs(this.node.x - npc.others[i].x) <= this.corridorLength && 
                Math.abs(this.node.y) <= this.corridorWidth && Math.abs(npc.others[i].y) <= this.corridorWidth) {

                    if(npc.others[i].isVisitedSameOnce === true) {
                        this.infectPossibility += 4;
                    } else {
                        this.infectPossibility += 7;
                    }
                    npc.others[i].isVisited = true;

                    //弹出提示框
                    //this.sameTwice.dispatchEvent(new cc.Event.EventCustom("SameTwice01"));
                    //npc.tip[i].string = "背后有人距离最近";
                    /*
                    cc.log("others", i, "isVisited", npc.others[i].isVisited);
                    cc.log("others", i, "isVisitedSameOnce", npc.others[i].isVisitedSameOnce);
                    cc.log("others", i, "isVisitedOppositeOnce", npc.others[i].isVisitedOppositeOnce);
                    cc.log("others", i, "isVisitedOppositeTwice", npc.others[i].isVisitedOppositeTwice);
                    */
                    /*
                    cc.log("gamePlayer.direction", this.direction);
                    cc.log("others", i, npc.others[i].direction);
                    cc.log("背后有人距离最近");
                    */
                }
                else if(this.corridorLength < Math.abs(this.node.x - npc.others[i].x) && 
                Math.abs(this.node.x - npc.others[i].x) <= 2*this.corridorLength && 
                Math.abs(this.node.y) <= this.corridorWidth && Math.abs(npc.others[i].y) <= this.corridorWidth) {
                    
                    if(npc.others[i].isVisitedSameOnce === false) {
                        this.infectPossibility += 3;
                    }
                    npc.others[i].isVisitedSameOnce = true;
                    /*
                    cc.log("others", i, "isVisited", npc.others[i].isVisited);
                    cc.log("others", i, "isVisitedSameOnce", npc.others[i].isVisitedSameOnce);
                    cc.log("others", i, "isVisitedOppositeOnce", npc.others[i].isVisitedOppositeOnce);
                    cc.log("others", i, "isVisitedOppositeTwice", npc.others[i].isVisitedOppositeTwice);
                    */
                    /*
                    cc.log("gamePlayer.direction", this.direction);
                    cc.log("others", i, npc.others[i].direction);
                    cc.log("背后有人");
                    */
                    //弹出提示框
                    //this.sameOnce.dispatchEvent(new cc.Event.EventCustom("SameOnce01"));
                    //npc.tip[i].string = "背后有人";

                }
            }

            //面对面距离不够大的情况
            else if(npc.others[i].isVisited === false && 
                (npc.others[i].direction === 'left' && this.direction === 'right' && this.node.x < npc.others[i].x || 
                npc.others[i].direction === 'right' && this.direction === 'left' && this.node.x > npc.others[i].x )) {

                if(Math.abs(this.node.x - npc.others[i].x) <= this.faceDisLim && 
                Math.abs(this.node.y) <= this.corridorWidth && 
                Math.abs(npc.others[i].y) <= this.corridorWidth) {

                    if(npc.others[i].isVisitedOppositeOnce === true && npc.others[i].isVisitedOppositeTwice === true) {
                        this.infectPossibility += 10;
                    } else if(npc.others[i].isVisitedOppositeOnce === true && npc.others[i].isVisitedOppositeTwice === false) {
                        this.infectPossibility += 20;
                    } else if(npc.others[i].isVisitedOppositeOnce === false && npc.others[i].isVisitedOppositeTwice === true) {
                        this.infectPossibility += 10;
                    } else {
                        this.infectPossibility += 25;
                    }
                    npc.others[i].isVisited = true;
                    /*
                    cc.log("others", i, "isVisited", npc.others[i].isVisited);
                    cc.log("others", i, "isVisitedSameOnce", npc.others[i].isVisitedSameOnce);
                    cc.log("others", i, "isVisitedOppositeOnce", npc.others[i].isVisitedOppositeOnce);
                    cc.log("others", i, "isVisitedOppositeTwice", npc.others[i].isVisitedOppositeTwice);
                    */
                    /*
                    cc.log("gamePlayer.direction", this.direction);
                    cc.log("others", i, npc.others[i].direction);
                    cc.log("正面有人距离最近");
                    */

                   //npc.tip[i].string = "正面有人距离最近";
                }
                else if(this.faceDisLim < Math.abs(this.node.x - npc.others[i].x) && Math.abs(this.node.x - npc.others[i].x) <= 
                this.faceDis && Math.abs(this.node.y) <= this.corridorWidth && Math.abs(npc.others[i].y) <= this.corridorWidth) {

                    if(npc.others[i].isVisitedOppositeTwice === false) {
                        if(npc.others[i].isVisitedOppositeOnce === true) {
                            this.infectPossibility += 10;
                        } else {
                            this.infectPossibility += 15;
                        }
                        npc.others[i].isVisitedOppositeTwice = true;
                    }

                    //弹出提示框
                    //this.oppositeTwice.dispatchEvent(new cc.Event.EventCustom("OppositeTwice01"));
                    //npc.tip[i].string = "正面有人距离比较近";
                    /*
                    cc.log("others", i, "isVisited", npc.others[i].isVisited);
                    cc.log("others", i, "isVisitedSameOnce", npc.others[i].isVisitedSameOnce);
                    cc.log("others", i, "isVisitedOppositeOnce", npc.others[i].isVisitedOppositeOnce);
                    cc.log("others", i, "isVisitedOppositeTwice", npc.others[i].isVisitedOppositeTwice);
                    */
                    /*
                    cc.log("gamePlayer.direction", this.direction);
                    cc.log("others", i, npc.others[i].direction);
                    cc.log("正面有人距离比较近");
                    */
                }
                else if(Math.abs(this.node.x - npc.others[i].x) > this.faceDis && Math.abs(this.node.y) <= this.corridorWidth && Math.abs(npc.others[i].y) <= this.corridorWidth) {
                    
                    if(npc.others[i].isVisitedOppositeOnce === false) {
                        this.infectPossibility += 5;
                    }
                    npc.others[i].isVisitedOppositeOnce = true;

                    //弹出提示框
                    //this.oppositeOnce.dispatchEvent(new cc.Event.EventCustom("OppositeOnce01"));
                    //npc.tip[i].string = "正面有人";
                    /*
                    cc.log("others", i, "isVisited", npc.others[i].isVisited);
                    cc.log("others", i, "isVisitedSameOnce", npc.others[i].isVisitedSameOnce);
                    cc.log("others", i, "isVisitedOppositeOnce", npc.others[i].isVisitedOppositeOnce);
                    cc.log("others", i, "isVisitedOppositeTwice", npc.others[i].isVisitedOppositeTwice);
                    */
                    /*
                    cc.log("gamePlayer.direction", this.direction);
                    cc.log("others", i, npc.others[i].direction);
                    cc.log("正面有人");
                    */
                }
            }
            else {
                //npc.tip[i].string = "";
            }

            if(npc.others[i].direction === this.direction && 
                (this.direction === 'left' && this.node.x < npc.others[i].x ||
                 this.direction === 'right' && this.node.x > npc.others[i].x)) {

                if(Math.abs(this.node.x - npc.others[i].x) <= this.corridorLength && 
                Math.abs(this.node.y) <= this.corridorWidth && Math.abs(npc.others[i].y) <= this.corridorWidth) {

                    //弹出提示
                    npc.tip[i].string = "背后有人距离最近";
                    
                }
                else if(this.corridorLength < Math.abs(this.node.x - npc.others[i].x) && 
                Math.abs(this.node.x - npc.others[i].x) <= 2*this.corridorLength && 
                Math.abs(this.node.y) <= this.corridorWidth && Math.abs(npc.others[i].y) <= this.corridorWidth) {
                
                    //弹出提示
                    npc.tip[i].string = "背后有人";

                }
            }

            //面对面距离不够大的情况
            else if( 
                (npc.others[i].direction === 'left' && this.direction === 'right' && this.node.x < npc.others[i].x || 
                npc.others[i].direction === 'right' && this.direction === 'left' && this.node.x > npc.others[i].x )) {

                if(Math.abs(this.node.x - npc.others[i].x) <= this.faceDisLim && 
                Math.abs(this.node.y) <= this.corridorWidth && 
                Math.abs(npc.others[i].y) <= this.corridorWidth) {

                   npc.tip[i].string = "正面有人距离最近";
                }
                else if(this.faceDisLim < Math.abs(this.node.x - npc.others[i].x) && Math.abs(this.node.x - npc.others[i].x)
                 <= this.faceDis && Math.abs(this.node.y) <= this.corridorWidth && Math.abs(npc.others[i].y) <= this.corridorWidth) {
                    
                    //弹出提示
                    npc.tip[i].string = "正面有人距离比较近";
                
                }
                else if(Math.abs(this.node.x - npc.others[i].x) > this.faceDis && Math.abs(this.node.y) <= this.corridorWidth 
                && Math.abs(npc.others[i].y) <= this.corridorWidth) {

                    //弹出提示
                    npc.tip[i].string = "正面有人";
                   
                }
            }
            else {
                npc.tip[i].string = "";
            }
        }
        // console.info(this.direction);
        // console.info(this.infectPossibility);
    },

    //判断邻座是否有人
    judgeNeighbor: function() {

        var npc=this.npc.getComponent('npc');
        //cc.log("玩家的y坐标：", this.node.y);
        //cc.log("邻座的y坐标：", npc.neighborSeat.y);
        if(Math.abs(this.node.y - npc.neighborSeat.y) <= this.neighborDis && 
        this.neighborShortDistance.getComponent('neighborJS').hasLaunched === false
        && npc.neighborSeat.x <= 790) {

            //弹出提示框
            if(this.direction == 'down' && Math.abs(this.lastY - this.node.y) >=10) {
                this.neighborShortDistance.dispatchEvent(new cc.Event.EventCustom("shortDistanceNeighbor"));
                this.lastY = this.node.y;
            }
            //this.neighborShortDistance.dispatchEvent(new cc.Event.EventCustom("shortDistanceNeighbor"));
        }
    },

    onCollisionEnter: function (other, self) {

        if(this.onBump==0){
            this.audioMgr.playMusic("bump");

        }
         this.onBump=other.tag;

     },
    onCollisionExit: function (){
         this.onBump=0;
     },
 
});

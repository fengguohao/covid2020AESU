// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        movable:false,
        defaultParent:cc.Node,
        defaultPos:null,
        stageNode:cc.Node,
        startLoc:null,
        lastMove:null,
        onBump:0,
        moveOutClip:{
            default:null,
            type:cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      this.defaultParent=this.node.parent;  
      this.defaultPos=this.node.getPosition();
    },


    callBindEvent(){
        this.node.on(cc.Node.EventType.TOUCH_START,function(){
            cc.audioEngine.playEffect(this.moveOutClip,false);
            this.node.opacity=255;
            if(this.node.parent==this.defaultParent){
               
                this.startLoc=this.stageNode.convertToNodeSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.getPosition()));
                this.node.parent=this.stageNode;
                this.node.setPosition(this.startLoc);
                this.lastMove=this.startLoc;

            }
            else{
                this.startLoc=this.node.getPosition();
                this.lastMove=this.startLoc;
            }
            
        },this)

        this.node.on(cc.Node.EventType.TOUCH_MOVE,function(event){
            var pos=this.stageNode.convertToNodeSpaceAR(event.getTouches()[0].getLocation());
            this.node.setPosition(this.node.getPosition().add(pos.sub(this.lastMove)));
            this.lastMove=pos;
        },this);

        this.node.on(cc.Node.EventType.TOUCH_END,function(event){
            if(this.onBump==1){
                this.node.parent=this.defaultParent;
                this.node.setPosition(this.defaultPos);
                this.lastMove=null;
                this.startLoc=null;
            }
            else{
                this.lastMove=null;
                this.startLoc=null;
            }
        },this);
    },


    onCollisionEnter: function (other, self) {
        
        if(this.node.parent.name=="裂解"){
            this.node.parent.getComponent("y_liejieControl").moveProcess(self.node,other.node);
        }
        if(this.node.parent.name=="分层"){
            this.node.parent.getComponent("y_fencengControl").moveProcess(self.node,other.node);
        }
         this.onBump=other.tag;
         

     },
    onCollisionExit: function (){
         this.onBump=0;
     },
    // update (dt) {},
});

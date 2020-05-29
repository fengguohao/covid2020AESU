// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        itemAdd:cc.Prefab,
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },


    getNode(name){
        return this.node.getChildByName(name);
    },

    addItem(){
        var tPrefab = cc.instantiate(this.itemAdd);   
        tPrefab.parent = this.node;
    },

    getFinalLoc(node){
        var loc=node.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(this.node.getChildren()[this.node.getChildren().length-1].getPosition()))
        return loc;
    },

    showItem(frame,name){
        this.node.getChildren()[this.node.getChildren().length-1].getComponent(cc.Sprite).spriteFrame=frame;
        this.node.getChildren()[this.node.getChildren().length-1].getChildByName("label").getComponent(cc.Label).string=name;
        this.node.getChildren()[this.node.getChildren().length-1].name=name;
        
       
    },

    setParent(name,sceneNode){
        
        this.node.getChildByName(name).getComponent("y_item").stageNode=sceneNode;
    },
    setMovable(name){
        this.node.getChildByName(name).getComponent("y_item").callBindEvent();
    },
    add(itemNode,name,destroyList,scale){
        this.scheduleOnce(function(){
            itemNode.runAction(cc.scaleBy(1,scale));
             this.addItem();
             itemNode.runAction(cc.moveTo(1,this.getFinalLoc(itemNode.parent)));
             this.scheduleOnce(function(){
                this.showItem(itemNode.getComponent(cc.Sprite).spriteFrame,name); 
                itemNode.destroy();
                for(var i=0;i<destroyList.length;i++){
                    destroyList[i].destroy();
                }
             }.bind(this),2);
        }.bind(this),1);
    },

    normalAdd(spriteFramePic,name){
        this.addItem();
        this.showItem(spriteFramePic,name); 
    },
    // update (dt) {},
});

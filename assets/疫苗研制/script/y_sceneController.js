// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        topPrompt:cc.Label,
        sidePrompt:cc.Label,
        thawSceneSecondPart:cc.Node,
        liejieScene:cc.Node,
        zhendangScene:cc.Node,
        fencengScene:cc.Node,
        pcrScene:cc.Node,
        cellTest:cc.Node,
        finally:cc.Node,
        itemLayOut:cc.Node,

        stage:0,
        simpleBox:cc.SpriteFrame,
        liejieLiquid:cc.SpriteFrame,
        pipette:cc.SpriteFrame,
        centrifugeTube:cc.SpriteFrame,
        centrifugeTube2:cc.SpriteFrame,
        centrifugeTube3:cc.SpriteFrame,
        successClip:{
            default:null,
            type:cc.AudioClip
        },
        finalClip:{
            default:null,
            type:cc.AudioClip
        }
        //0:解冻
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.director.getCollisionManager().enabled = true;
        this.itemLayOut=this.itemLayOut.getComponent("y_itemControl");
    },
    changeTopPrompt(str){
        this.topPrompt.string=str;
    },
    changeSidePrompt(str){
        this.sidePrompt.string=str;
    },


    callExit(){
        this.scheduleOnce(function(){
            cc.audioEngine.playEffect(this.finalClip,false);
            this.finally.active=true;
            this.finally.runAction(cc.moveTo(1,0,0));
        }.bind(this),5);
    },
    changeStage(num){
        this.stage=num;
        switch(num){
            case 1:
                
                this.changeTopPrompt("样品解冻");
                this.itemLayOut.setParent("样品毒株",this.thawSceneSecondPart);
                this.itemLayOut.setMovable("样品毒株");
                this.changeSidePrompt("请将样品拖放入\n生物安全柜\n进行解冻");
                this.thawSceneSecondPart.active=true;
                break;
            case 2:
                this.thawSceneSecondPart.active=false;
                this.liejieScene.active=true;
                this.changeTopPrompt("病毒裂解");
                this.itemLayOut.normalAdd(this.simpleBox,"已解冻毒株");
                this.itemLayOut.setParent("已解冻毒株",this.liejieScene);
                this.itemLayOut.setMovable("已解冻毒株");
                this.itemLayOut.normalAdd(this.liejieLiquid,"裂解液");
                this.itemLayOut.setParent("裂解液",this.liejieScene);
                this.itemLayOut.setMovable("裂解液");
                this.itemLayOut.normalAdd(this.pipette,"微量移液管");
                this.itemLayOut.setParent("微量移液管",this.liejieScene);
                this.itemLayOut.setMovable("微量移液管");
                this.itemLayOut.normalAdd(this.centrifugeTube,"离心管");
                this.itemLayOut.setParent("离心管",this.liejieScene);
                this.itemLayOut.setMovable("离心管");
                this.scheduleOnce(function(){
                    this.changeSidePrompt('核酸相当于病毒的"身份证",\n在研究前首先要提取核酸。\n请将病毒样品取到微离心管中,\n注入裂解液');
                }.bind(this),2);
                break;
            case 3:
                this.changeTopPrompt("核酸提取");
                this.liejieScene.active=false;
                this.zhendangScene.active=true;
                this.itemLayOut.setParent("混合试剂",this.zhendangScene);
                this.itemLayOut.setMovable("混合试剂");
                break;
            case 4:
                this.zhendangScene.active=false;
                this.fencengScene.active=true;
                this.itemLayOut.normalAdd(this.pipette,"微量移液管");
                this.itemLayOut.setParent("微量移液管",this.fencengScene);
                this.itemLayOut.setMovable("微量移液管");
                this.itemLayOut.normalAdd(this.centrifugeTube,"离心管");
                this.itemLayOut.setParent("离心管",this.fencengScene);
                this.itemLayOut.setMovable("离心管");
                this.itemLayOut.normalAdd(this.centrifugeTube2,"样品");
                this.itemLayOut.setParent("样品",this.fencengScene);
                this.itemLayOut.setMovable("样品");
                this.changeSidePrompt("病毒的蛋白质外壳已瓦解，\n病毒的核酸流出\n经过震荡离心处理后\n病毒核酸大量\n存在于在下层，\n请将其取出");
                break;
            case 5:
                this.changeTopPrompt("荧光定量PCR检测");
                this.fencengScene.active=false;
                this.pcrScene.active=true;
                this.itemLayOut.normalAdd(this.centrifugeTube3,"样品");
                this.itemLayOut.setParent("样品",this.pcrScene);
                this.itemLayOut.setMovable("样品");
                this.changeSidePrompt("荧光定量PCR检测\n是通过荧光染料或荧光标记\n的特异性的探针，\n对PCR产物进行标记跟踪\n借助这项技术\n我们可以检测当前\n样品是否是所需病毒");
                break;
            case 6:
                this.pcrScene.active=false;
                this.cellTest.active=true;
                this.changeSidePrompt("PCR检测已通过\n确认是所需病毒\n符合疫苗研制要求\n可以进行扩增");
                this.scheduleOnce(function(){
                    this.changeTopPrompt("扩增实验");
                    cc.audioEngine.playEffect(this.successClip,false);
                    this.changeSidePrompt("接下来病毒将被接种到\n'细胞工厂'中进行检测\n左侧的瓶子便是细胞工厂\n我们能够通过检测\n病毒的侵染状况\n进而判断病毒活性");
                    this.scheduleOnce(function(){
                        //this.cellTest.active=false;
                        cc.audioEngine.playEffect(this.successClip,false);
                        this.changeTopPrompt("后续步骤");
                        this.changeSidePrompt("疫苗研制的过程是非常复杂的\n进行到这一步\n我们仅能获取到可能\n可以进行疫苗制造的毒株\n后面还要进行大量的检测");
                        this.scheduleOnce(function(){
                            cc.audioEngine.playEffect(this.successClip,false);
                            this.changeSidePrompt("包括灭活病毒盲传三代检测\n多期的动物实验、人体实验\n有效性评价安全性评价等等");
                            this.scheduleOnce(function(){

                                this.changeSidePrompt("科研的过程是艰辛而又复杂的\n让我们向奋战在一线的\n科研工作者致敬");
                                this.callExit();
                            }.bind(this),5);
                        }.bind(this),5);
                    }.bind(this),5);
                }.bind(this),5);


        }
    },

    returnOnClick(){
        cc.director.loadScene("衔接场景");
    },

    againCtrl(){
        cc.director.loadScene("疫苗研制");
    },

    exitCtrl(){
        cc.director.loadScene("衔接场景");
    }
});

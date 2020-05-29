// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        gameStatus: 'gaming',
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.gameStatus = 'gaming';
        this.node.parent.getChildByName('Box').active = false;
    },

    start () {

    },

    handleFailure: function() {
        if(this.gameStatus === 'fail') {
            //以下是游戏失败需要进行的操作
            this.node.parent.getChildByName('Box').active = true;
            this.node.parent.getChildByName('Box').getChildByName('back').getComponent(cc.Label).string = '很遗憾，游戏失败！';
        }
    },

    handleSuccess: function() {
        if(this.gameStatus === 'succeed') {
            //以下是成功过关需要进行的操作
            this.node.parent.getChildByName('Box').active = true;
            this.node.parent.getChildByName('Box').getChildByName('back').getComponent(cc.Label).string = '恭喜你，成功过关！';
            //'hasPassed'是字符串键值，在板块总场景也要用这个名字，'hasPassed'的初始值为0
            if(this.node.parent.parent.name === 'Level01' && cc.sys.localStorage.getItem('hasPassed') === '0') {
                cc.sys.localStorage.setItem('hasPassed', 1);
            } else if(this.node.parent.parent.name === 'Level02' && cc.sys.localStorage.getItem('hasPassed') === '1') {
                cc.sys.localStorage.setItem('hasPassed', 2);
            } else if(this.node.parent.parent.name === 'Level03' && cc.sys.localStorage.getItem('hasPassed') === '2') {
                cc.sys.localStorage.setItem('hasPassed', 3);
            }
        }
    },

    onClick: function() {
        cc.director.loadScene('人体免疫(总)');
    },

    update (dt) {
        this.handleFailure();
        this.handleSuccess();
    },
});

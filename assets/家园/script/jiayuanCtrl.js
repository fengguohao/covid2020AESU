// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        newsPanel:cc.Node,
        ourMessage:cc.Node,
        webBox:cc.WebView,
        now:0,
        news:0,
        nowLabel:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        this.getOnlinePackage();
        this.news=["https://ncov.dxy.cn/ncovh5/view/pneumonia"];
        this.newsTitle=["丁香园疫情实况"];
        this.now=0;
        this.webBox.url=this.news[this.now];
        this.nowLabel.string=this.newsTitle[this.now];
        
    },

    getOnlinePackage(){
        var url = "https://www.fguohao.top/urlpackage.json";
        var request =cc.loader.getXMLHttpRequest();/*用new创建一个XHR对象*/
        request.open("GET",url);/*设置XHR对象的请求方法与路径*/
        request.send(null);/*设置XHR对象不发送数据到服务器*/
        request.onload = function() {/*设置当获XHR对象获取到返回信息后执行以下代码*/

        if(request.status == 200) {/*如果返回的状态为200，即为成功获取数据*/
                /*获取DOM中id为luck的p元素*/
            var jsoncontent = JSON.parse(request.responseText);/*将获取的信息解析为json对象*/
            this.news=jsoncontent.content;
            this.newsTitle=jsoncontent.name;
        }
        else{
            this.nowLabel.string="您未连接到网络";
        }
        if(this.news==null){
            this.news=["https://ncov.dxy.cn/ncovh5/view/pneumonia"];
            this.newsTitle=["丁香园疫情实况"];
        }
        
        this.now=0;
        this.webBox.url=this.news[this.now];
        this.nowLabel.string=this.newsTitle[this.now];

}.bind(this);



    },

    previousNews(){
        if(this.now==0){
            this.nowLabel.string="前面没有了哦";
        }
        else{
            this.now-=1;
            this.webBox.url=this.news[this.now];
            this.nowLabel.string=this.newsTitle[this.now];
        }
        
    },

    nextNews(){
        if(this.now==this.news.length-1){
            this.nowLabel.string="后面没有了哦";
        }
        else{
            this.now+=1;
            this.webBox.url=this.news[this.now];
            this.nowLabel.string=this.newsTitle[this.now];
        }
    },

    openNews(){
        this.newsPanel.active=true;
    },

    closeNews(){
        this.newsPanel.active=false;
    },

    openMessage(){
        this.ourMessage.active=true;
    },
    closeMessage(){
        this.ourMessage.active=false;
    },

    returnBack(){
        cc.director.loadScene("衔接场景");
    }
    // update (dt) {},
});

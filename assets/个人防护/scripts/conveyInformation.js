// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        information: {
            default: null,
            type: cc.Node,
        },

        buttonYes: {
            default: null,
            type: cc.Node,
        },

        buttonNo: {
            default: null,
            type: cc.Node,
        },

        //SameOnce系列
        SameOnce01: {
            default: null,
            type: cc.TextAsset,
        },
        SameOnce02: {
            default: null,
            type: cc.TextAsset,
        },
        SameOnce03: {
            default: null,
            type: cc.TextAsset,
        },
        SameOnce04: {
            default: null,
            type: cc.TextAsset,
        },

        //SameTwice系列
        SameTwice01: {
            default: null,
            type: cc.TextAsset,
        },
        SameTwice02: {
            default: null,
            type: cc.TextAsset,
        },
        SameTwice03: {
            default: null,
            type: cc.TextAsset,
        },
        SameTwice04: {
            default: null,
            type: cc.TextAsset,
        },

        //OppositeOnce系列
        OppositeOnce01: {
            default: null,
            type: cc.TextAsset,
        },
        OppositeOnce02: {
            default: null,
            type: cc.TextAsset,
        },

        //OppositeTwice系列
        OppositeTwice01: {
            default: null,
            type: cc.TextAsset,
        },
        OppositeTwice02: {
            default: null,
            type: cc.TextAsset,
        },
        OppositeTwice03: {
            default: null,
            type: cc.TextAsset,
        },

        shortDistanceNeighbor: {
            default: null,
            type: cc.TextAsset,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.node.active = false;
        //this.buttonYes.node.active = false;
        //this.buttonNo.node.active = false;
        var sameOnce = this.information.getComponent(cc.Label);
        var sameTwice = this.information.getComponent(cc.Label);
        var oppositeOnce = this.information.getComponent(cc.Label);
        var oppositeTwice = this.information.getComponent(cc.Label);
        var neighbor = this.information.getComponent(cc.Label);

        //后面有人距离较近
        this.node.on("SameOnce01", function() {
            if(sameOnce !== null) {
                this.node.active = true;
                sameOnce.string = this.SameOnce01.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("SameOnce02"));
                }, this);
            }
        }, this);

        this.node.on("SameOnce02", function() {
            if(sameOnce !== null) {
                sameOnce.string = this.SameOnce02.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("SameOnce03"));
                }, this);
            }  
        }, this);

        this.node.on("SameOnce03", function() {
            if(sameOnce !== null) {
                sameOnce.string = this.SameOnce03.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("SameOnce04"));
                }, this);
            }
        }, this);

        this.node.on("SameOnce04", function() {
            if(sameOnce !== null) {
                sameOnce.string = this.SameOnce04.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("endSameOnce"));
                }, this);
            }
        }, this);

        this.node.on("endSameOnce", function() {
            sameOnce = null;
            this.node.active = false;
            this.node.off("SameOnce01", function() {
                if(sameOnce !== null) {
                    this.node.active = true;
                    sameOnce.string = this.SameOnce01.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("SameOnce02"));
                    }, this);
                }
            }, this);
            this.node.off("SameOnce02", function() {
                if(sameOnce !== null) {
                    sameOnce.string = this.SameOnce02.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("SameOnce03"));
                    }, this);
                }  
            }, this);
            this.node.off("SameOnce03", function() {
                if(sameOnce !== null) {
                    sameOnce.string = this.SameOnce03.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("SameOnce04"));
                    }, this);
                }
            }, this);
            this.node.off("SameOnce04", function() {
                if(sameOnce !== null) {
                    sameOnce.string = this.SameOnce04.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("endSameOnce"));
                    }, this);
                }
            }, this);
        }, this);

        //后面有人距离很近
        this.node.on("SameTwice01", function() {
            if(sameTwice !== null) {
                this.node.active = true;
                sameTwice.string = this.SameTwice01.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("SameTwice02"));
                }, this);
            }
        }, this);

        this.node.on("SameTwice02", function() {
            if(sameTwice !== null) {
                sameTwice.string = this.SameTwice02.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("SameTwice03"));
                }, this);
            }   
        }, this);

        this.node.on("SameTwice03", function() {
            if(sameTwice !== null) {
                sameTwice.string = this.SameTwice03.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("SameTwice04"));
                }, this);
            }    
        }, this);

        this.node.on("SameTwice04", function() {
            if(sameTwice !== null) {
                sameTwice.string = this.SameTwice04.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("endSameTwice"));
                }, this);
            }   
        }, this);

        this.node.on("endSameTwice", function() {
            sameTwice = null;
            this.node.active = false;
            this.node.off("SameTwice01", function() {
                if(sameTwice !== null) {
                    this.node.active = true;
                    sameTwice.string = this.SameTwice01.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("SameTwice02"));
                    }, this);
                }
            }, this);
            this.node.off("SameTwice02", function() {
                if(sameTwice !== null) {
                    sameTwice.string = this.SameTwice02.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("SameTwice03"));
                    }, this);
                }   
            }, this);
            this.node.off("SameTwice03", function() {
                if(sameTwice !== null) {
                    sameTwice.string = this.SameTwice03.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("SameTwice04"));
                    }, this);
                }    
            }, this);
            this.node.off("SameTwice04", function() {
                if(sameTwice !== null) {
                    sameTwice.string = this.SameTwice04.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("endSameTwice"));
                    }, this);
                }   
            }, this);
        }, this);

        //正面有人距离较近
        this.node.on("OppositeOnce01", function() {
            if(oppositeOnce !== null) {
                this.node.active = true;
                oppositeOnce.string = this.OppositeOnce01.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("OppositeOnce02"));
                }, this);
            }     
        }, this);

        this.node.on("OppositeOnce02", function() {
            if(oppositeOnce !== null) {
                oppositeOnce.string = this.OppositeOnce02.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("endOppositeOnce"));
                }, this);
            }               
        }, this);

        this.node.on("endOppositeOnce", function() {
            oppositeOnce = null;
            this.node.active = false;
            this.node.off("OppositeOnce01", function() {
                if(oppositeOnce !== null) {
                    this.node.active = true;
                    oppositeOnce.string = this.OppositeOnce01.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("OppositeOnce02"));
                    }, this);
                }     
            }, this);
            this.node.off("OppositeOnce02", function() {
                if(oppositeOnce !== null) {
                    oppositeOnce.string = this.OppositeOnce02.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("endOppositeOnce"));
                    }, this);
                }   
            }, this);
        }, this);

        //正面有人距离很近
        this.node.on("OppositeTwice01", function() {
            if(oppositeTwice !== null) {
                this.node.active = true;
                oppositeTwice.string = this.OppositeTwice01.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("OppositeTwice02"));
                }, this);
            }
        }, this);

        this.node.on("OppositeTwice02", function() {
            if(oppositeTwice != null) {
                oppositeTwice.string = this.OppositeTwice02.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("OppositeTwice03"));
                }, this);
            }
        }, this);

        this.node.on("OppositeTwice03", function() {
            if(oppositeTwice !== null) {
                oppositeTwice.string = this.OppositeTwice03.text;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.node.dispatchEvent(new cc.Event.EventCustom("endOppositeTwice"));
                }, this);
            }
        }, this);

        this.node.on("endOppositeTwice", function() {
            oppositeTwice = null;
            this.node.active = false;
            this.node.off("OppositeTwice01", function() {
                if(oppositeTwice !== null) {
                    this.node.active = true;
                    oppositeTwice.string = this.OppositeTwice01.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("OppositeTwice02"));
                    }, this);
                }
            }, this);
            this.node.off("OppositeTwice02", function() {
                if(oppositeTwice != null) {
                    oppositeTwice.string = this.OppositeTwice02.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("OppositeTwice03"));
                    }, this);
                }
            }, this);
            this.node.off("OppositeTwice03", function() {
                if(oppositeTwice !== null) {
                    oppositeTwice.string = this.OppositeTwice03.text;
                    this.node.on(cc.Node.EventType.TOUCH_END, function() {
                        this.node.dispatchEvent(new cc.Event.EventCustom("endOppositeTwice"));
                    }, this);
                }
            }, this);
        }, this);

        //邻座有人
        this.node.on("shortDistanceNeighbor", function() {
            if(neighbor !== null) {
                this.node.active = true;
                this.buttonYes.node.active = true;
                this.buttonNo.node.active = true;
                neighbor.string = this.shortDistanceNeighbor.text;
            }
            
            this.buttonYes.node.on(cc.Node.EventType.TOUCH_END, function() {
                this.node.dispatchEvent(new cc.Event.EventCustom("yes"));
            }, this);
            this.buttonNo.node.on(cc.Node.EventType.TOUCH_END, function() {
                this.node.dispatchEvent(new cc.Event.EventCustom("no"));
            }, this);
            
        }, this);

        this.node.on("yes", function() {
            //被传染概率增加（未写）
            neighbor = null;
            this.node.active = false;
            this.buttonYes.node.active = false;
            this.buttonNo.node.active = false;
        }, this);

        this.node.on("no", function() {
            this.node.active = false;
            this.buttonYes.node.active = false;
            this.buttonNo.node.active = false;
        }, this);

    },

    start () {

    },

    // update (dt) {},
});

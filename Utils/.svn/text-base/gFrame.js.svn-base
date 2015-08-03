var _$={};//gFrame namespace

String.prototype.contains=function(str){
    //return this.search(str)!=-1;
    return this.indexOf(str)!=-1;
};

window.requestAnimationFrame=requestAnimationFrame || webkitRequestAnimationFrame ||
    mozRequestAnimationFrame || msRequestAnimationFrame || oRequestAnimationFrame;
/*window.cancelRequestAnimationFrame=cancelRequestAnimationFrame || webkitCancelRequestAnimationFrame ||
    mozCancelRequestAnimationFrame || msCancelRequestAnimationFrame || oCancelRequestAnimationFrame;*/

//Gobj is game object,initial by only one parameter props
Function.prototype.extends=function(addInObject){
    //father call extends to produce child
    var father=this;
    //Create child self as constructor function
    var child=function(props){
        //Remove redundant properties from proto chain by props==undefined
        if (props){
            //Execute old constructor
            father.call(this,props);
            //Add new into child constructor
            addInObject.constructorPlus.call(this,props);//this.constructorPlus(props)
        }
    };
    //Inherit prototype from father
    child.prototype=new father();
    child.prototype.constructor=child;
    /*//We don't need properties constructed by {}, constructor not changed;
    child.prototype.__proto__=father.prototype;//__proto__ isn't supported by IE9 and IE10, IE11 supports*/
    //Add new functions into child.prototype
    for (var attr in addInObject.prototypePlus){
        child.prototype[attr]=addInObject.prototypePlus[attr];
    }
    /*****Add super&inherited pointer for instance*****/
    //The upper constructor is super
    child.prototype.super=father;
    //Behaviors including constructor are inherited by child, can find depreciated
    child.prototype.inherited=father.prototype;//Behavior always in prototype
    /*****Generate super&inherited pointer link*****/
    child.super=father;
    child.inherited=father.prototype;
    //Below is constructor link:
    //Mutalisk.constructor.(prototype.constructor).(prototype.constructor)
    return child;
};

//Extend Audio
Audio.prototype.playFromStart=function(){
    this.pause();
    this.currentTime=0;
    this.play();
};

/**************** Add to _$ namespace *******************/

_$.requestAnimationFrame=requestAnimationFrame || webkitRequestAnimationFrame ||
    mozRequestAnimationFrame || msRequestAnimationFrame || oRequestAnimationFrame;

_$.extends=function(father,addInObject){
    //Create child self as constructor function
    var child=function(props){
        father.apply(this,arguments);
        //Add new into child constructor
        addInObject.constructorPlus.call(this,props);//eval(addInObject.constructorPlusStr);
    };
    //Inherit prototype from father
    child.prototype=new father();
    child.prototype.constructor=child;
    //Add new functions into child.prototype
    for (var attr in addInObject.prototypePlus){
        child.prototype[attr]=addInObject.prototypePlus[attr];
    }
    return child;
};

//_$.mixin == $.extend
_$.mixin=function(){
    switch (arguments.length){
        case 0:
            return {};
        default:
            var dist=arguments[0];
            for (var N=1;N<arguments.length;N++){
                var addIn=arguments[N];
                for (var attr in addIn){
                    dist[attr]=addIn[attr];
                }
            }
            return dist;
    }
};
//Can only copy one level, copy reference
_$.copy=function(obj){
    //Auto detect obj/array
    return _$.mixin(new obj.constructor(),obj);
};
//Full traverse copy, copy one level when ref=true
_$.clone=function(obj,ref){
    //Auto detect obj/array
    var dist=new obj.constructor();
    for (var attr in obj){
        //Cannot just assign pointer if it's object type
        if (typeof(obj[attr])=="object" && !ref) {
            dist[attr]=_$.clone(obj[attr]);
        }
        //Can only assign simple type(number/boolean/string)
        else dist[attr]=obj[attr];
        //dist[attr]=(typeof(obj[attr])=="object")?_$.clone(obj[attr]):obj[attr];
    }
    return dist;
};

//Template
_$.templates={
    src:{},
    //register ?id as ?tempStr
    register:function(id,tempStr){
        var tempObj={};
        tempObj.tempStr=tempStr;
        //Auto search for params
        tempObj.params=tempStr.match(/\${2}\w{1,}\${2}/g);// /RegExp/go,NoStop
        _$.templates.src[id]=tempObj;
    },
    //apply template ?id with ?values
    applyOn: function(id,values) {
        var valueArray=[].concat(values);//Convert to array
        var src=_$.templates.src[id];//Get src template object
        var result=src.tempStr;//Get original template
        for (var N=0;N<Math.min(valueArray.length,src.params.length);N++){
            result=result.replace(src.params[N],valueArray[N]);
        }
        return result;
    }
};

_$.traverse=function(obj,func){
    for (var attr in obj){
        if (typeof(obj[attr])=="object"){
            _$.traverse(obj[attr],func);
        }
        else {
            //Callback
            func(obj[attr]);
        }
    }
};

_$.matrixOperation=function(matrix,operation){
    for (var attr in matrix){
        if (typeof(matrix[attr])=="object"){//array or object
            _$.matrixOperation(matrix[attr],operation);
        }
        else {
            matrix[attr]=operation(matrix[attr]);
        }
    }
};

//Map traverse for array
_$.mapTraverse=function(array,operation){
    var operationTraverse=function(n){
        if (n instanceof Array) return n.map(operationTraverse);
        else return operation(n);
    };
    return array.map(operationTraverse);
};

//Array equals array
_$.arrayEqual=function(arr1,arr2){
    if (arr1.length==arr2.length){
        for (var n=0;n<arr1.length;n++){
            //Content not same
            if (arr1[n]!=arr2[n]) return false;
        }
        return true;
    }
    //Length not same
    else return false;
};

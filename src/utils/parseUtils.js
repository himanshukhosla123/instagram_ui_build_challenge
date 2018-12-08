export function StrToJSON(str){
    let a=null;
    try{
        // if(a && typeof str == "string")
        a=JSON.parse(str);
    }
    catch(e){
        a=null;
    }
    // console.log("return",a);
    return a;
}

export function objCopy(obj){
    let a=null;
    try{
        // if(a && typeof str == "string")
        a=JSON.parse(JSON.stringify(obj));
    }
    catch(e){
        a=null;
    }
    // console.log("return",a);
    return a;
}
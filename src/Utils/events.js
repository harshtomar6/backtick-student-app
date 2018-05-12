let sub = {}
export function addListener(event,fn){
    //console.log(event,fn);
    sub[event] = fn
    console.log(sub);

     
}
export function eventDispatch(event){
    return sub[event]()
}

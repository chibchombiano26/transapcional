
export class util{
    
    constructor() {       
        
    }

    objectToArray(obj){
        let array = [];
        for (let key in obj) {                
            if (obj.hasOwnProperty(key)) { 
                let element = obj[key];
                array.push(element);
            }
        }

        return array;
    }

}
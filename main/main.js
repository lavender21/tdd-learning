/**
 * Created by lavender on 17-4-12.
 */
"use strict";

function generateStringType(str) {
    if (isNaN(str)){
        return "is not number";
    }
    if (parseInt(str).toString() === str){
        return Number(str)%2 === 0 ? "is even" : "is odd";
    }else{
        return "is number";
    }
}
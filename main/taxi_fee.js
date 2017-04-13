/**
 * Created by lavender on 17-4-13.
 */

function calculateTaxiFee(distance, waitingTime) {
    let taxiFee = 0;
    if (distance <= 2){
        taxiFee = 6;
    }else if(distance > 2 && distance < 8){
        taxiFee = Math.round((distance-2) * 0.8 + 6);
    }
    return taxiFee;
}
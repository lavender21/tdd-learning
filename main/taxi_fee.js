/**
 * Created by lavender on 17-4-13.
 */

function calculateTaxiFee(distance, waitingTime) {
    let taxiFee = 0;
    if (distance <= 2){
        taxiFee = 6;
    }else if(distance > 2 && distance < 8){
        taxiFee = (distance-2) * 0.8 + 6;
    }else if(distance > 8){
        taxiFee = (distance-2) * 0.8 +(distance-8) * 0.4 + 6;
    }
    taxiFee += waitingTime * 0.25;
    return Math.round(taxiFee);
}
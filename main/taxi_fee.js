/**
 * Created by lavender on 17-4-13.
 */

function calculateTaxiFee(distance, waitingTime) {
    let taxiFee = 0;
    if (distance <= 2){
        taxiFee = 6;
    }
    return taxiFee;
}
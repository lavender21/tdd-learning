/**
 * Created by lavender on 17-4-13.
 */

function calculateTaxiFee(distance, waitingTime) {
    let taxiFee = 0;
    const START_PRICE = 6;
    const EACH_KM_PRICE = 0.8;
    const START_DISTANCE = 2;
    const MIDDLE_DISTANCE = 8;
    const MULTIPLE = 0.5;
    const WAIT_PRICE = 0.25;
    if (distance > 0){
        taxiFee = START_PRICE;
    }
    if(distance > START_DISTANCE){
        taxiFee += (distance-START_DISTANCE) * EACH_KM_PRICE;
    }
    if(distance > MIDDLE_DISTANCE){
        taxiFee += (distance-MIDDLE_DISTANCE) * EACH_KM_PRICE * MULTIPLE;
    }
    taxiFee += waitingTime * WAIT_PRICE;
    return Math.round(taxiFee);
}
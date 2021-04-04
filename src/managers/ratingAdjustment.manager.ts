import { configuration } from './../configuration';

const adjustMMR = (currentMMR: number, gameModeName: string, placement: number) => {
    var gameMode = configuration.gameModes.find(g => g.name === gameModeName);
    if (gameMode === undefined)
        throw new Error(`Game mode ${gameMode} was not defined in the configuration`);
    
    let minMMR, maxMMR;
    if (gameMode.maximumRating > gameMode.minimumRating) {
        minMMR = gameMode.minimumRating;
        maxMMR = gameMode.maximumRating;
    } else {
        minMMR = gameMode.maximumRating;
        maxMMR = gameMode.minimumRating;
    }

    if (currentMMR <= minMMR)
        return minMMR;
    
    if (currentMMR >= maxMMR)
        return maxMMR;

    const adjustment = gameMode.ratingAdjustments.find(r => {
        let lower, higher;
        if (r.startRating > r.endRating) {
            lower = r.endRating;
            higher = r.startRating;
        } else {
            lower = r.startRating;
            higher = r.endRating;
        }

        return currentMMR >= lower && currentMMR <= higher;
    });
    if (adjustment === undefined)
        throw new Error(`MMR '${currentMMR}' was not covered by any rating adjustments for game mode '${gameMode}'`);

    const placementDetails = adjustment.placements.find(p => p.placement === placement);
    if (placementDetails === undefined)
        throw new Error(`Placement '${placement}' was not covered by game mode adjustment`);

    const newMMR = Math.min(Math.max(currentMMR + placementDetails.adjustment, minMMR), maxMMR);
    return newMMR;
}

export { adjustMMR }
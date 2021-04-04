interface IConfiguration {
    gameModes: Array<IGameMode>;
}

interface IGameMode {
    name: string;
    maximumRating: number;
    minimumRating: number;
    ratingAdjustments: Array<IRatingAdjustment>;
}

interface IRatingAdjustment {
    startRating: number;
    endRating: number;
    placements: Array<IPlacement>;
}

interface IPlacement {
    placement: number;
    adjustment: number;
}

class Configuration implements IConfiguration {
    gameModes: Array<IGameMode>;

    set = (config: IConfiguration) => {
        this.gameModes = config.gameModes;
    }

    validate = () => {
        this.gameModes.forEach(gm => {
            if (gm.maximumRating < 0)
                throw new Error(`maximumRating '${gm.maximumRating}' cannot be negative`);
        
            if (gm.minimumRating < 0)
                throw new Error(`minimumRating '${gm.minimumRating}' cannot be negative`);
        
            gm.ratingAdjustments.forEach(ra => {
                if (ra.startRating < 0)
                    throw new Error(`startRating '${ra.startRating}' cannot be negative`);
        
                if (ra.endRating < 0)
                    throw new Error(`endRating '${ra.endRating}' cannot be negative`);
        
                if (ra.startRating === ra.endRating)
                    throw new Error(`startRating '${ra.startRating}' cannot match end rating '${ra.endRating}'`);
            });
        });
    }
}

const configuration = new Configuration();

export { Configuration, IConfiguration, configuration }
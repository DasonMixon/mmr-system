import { IConfiguration, Configuration } from './../src/configuration';

describe('set', function () {
    it('Should set the current configuration with the provided one', function () {
        const currentConfig: Configuration = new Configuration();
        currentConfig.gameModes = new Array();
        currentConfig.gameModes.push({
            name: 'gm1',
            minimumRating: 100,
            maximumRating: 500,
            ratingAdjustments: new Array()
        });

        const newConfig: IConfiguration = {
            gameModes: new Array()
        };
        newConfig.gameModes.push({
            name: 'gm2',
            minimumRating: 1,
            maximumRating: 55,
            ratingAdjustments: new Array()
        });

        currentConfig.set(newConfig);
        expect(currentConfig.gameModes.length).toBe(1);
        expect(currentConfig.gameModes[0].name).toBe('gm2');
        expect(currentConfig.gameModes[0].minimumRating).toBe(1);
        expect(currentConfig.gameModes[0].maximumRating).toBe(55);
    });
});
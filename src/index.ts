import { IConfiguration, configuration } from './configuration';
import { adjustMMR } from './managers/ratingAdjustment.manager';
import { matchPlayerGroups, IGroup, IGroupMatch } from './managers/matchmaking.manager';

const configure = (config: IConfiguration) => {
    configuration.set(config);
    configuration.validate();
}

export { configure, adjustMMR, matchPlayerGroups, IGroup, IGroupMatch, IConfiguration }
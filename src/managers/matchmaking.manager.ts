import _ from 'lodash';

interface IGroup {
    players: Array<{ MMR: number }>;
    priority: number;
    meanMMR?: number;
}

interface IGroupMatch {
    baseMMR: number | null;
    groups: Array<IGroup>;
}

const matchPlayerGroups = (groups: Array<IGroup>, count: number, range: number): Array<IGroupMatch> => {
    const orderedGroups = _.orderBy(groups, (item) => [
        _.meanBy(item.players, (player) => player.MMR),
        item.priority
    ]);
    orderedGroups.forEach(g => g.meanMMR = _.meanBy(g.players, (player) => player.MMR));

    let potentialGroupMatches: Array<IGroupMatch>;
    let currentGroupMatchIndex = 0;
    let currentGroupMatchPlayerCount = 0;
    let iterations = 0;
    while(orderedGroups.length > 0 && iterations < 20) {
        orderedGroups.forEach(group => {
            if (potentialGroupMatches.length !== currentGroupMatchIndex + 1)
                potentialGroupMatches.push({ baseMMR: null, groups: new Array() });

            if (currentGroupMatchPlayerCount < count) {
                if (currentGroupMatchPlayerCount + group.players.length <= count) {
                    if (potentialGroupMatches[currentGroupMatchIndex].baseMMR === null)
                        potentialGroupMatches[currentGroupMatchIndex].baseMMR = group.meanMMR;
                    
                    let low, high;
                    low = potentialGroupMatches[currentGroupMatchIndex].baseMMR - range;
                    high = potentialGroupMatches[currentGroupMatchIndex].baseMMR + range;
                    if (group.meanMMR >= low && group.meanMMR <= high) {
                        potentialGroupMatches[currentGroupMatchIndex].groups.push(group);
                        currentGroupMatchPlayerCount += group.players.length;
                        _.remove(orderedGroups, group);
                    }
                }
            }
    
            if (currentGroupMatchPlayerCount === count) {
                currentGroupMatchIndex += 1;
            }
        });

        iterations += 1;
    }

    const finalGroups = potentialGroupMatches.filter(g => {
        const playerCount = g.groups.map(m => m.players.length).reduce((a, b) => a + b, 0);
        return playerCount === count;
    });

    return finalGroups;
}

export { matchPlayerGroups, IGroup, IGroupMatch }
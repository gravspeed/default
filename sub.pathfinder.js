
module.exports = {
    run: function () {
        for (var room in Memory.roomInfo) {

            var sources = Game.rooms[room].find(FIND_SOURCES)

            //sources.sort(function (a, b) { return Game.spawns['Spawn1'].pos.getRangeTo(b.pos) - Game.spawns['Spawn1'].pos.getRangeTo(a.pos) })
            //Memory.soureclisttest = sources

            sources.push(Game.rooms[room].controller)
            for (var source in sources) {
                //console.log(Game.rooms[room].controller.pos.getRangeTo(sources[source].pos))


                let goals = _.map(Game.rooms[room].find(FIND_SOURCES), function (source) {
                    // We can't actually walk on sources-- set `range` to 1 so we path 
                    // next to it.
                    return { pos: source.pos, range: 1 };
                });


                let ret = PathFinder.search(
                    Game.spawns['Spawn1'].pos, sources[source],
                    {
                        // We need to set the defaults costs higher so that we
                        // can set the road cost lower in `roomCallback`
                        plainCost: 2,
                        swampCost: 10,

                        roomCallback: function (roomName) {

                            let room = Game.rooms[roomName];
                            // In this example `room` will always exist, but since PathFinder 
                            // supports searches which span multiple rooms you should be careful!
                            if (!room) return;
                            let costs = new PathFinder.CostMatrix;

                            _.filter(room.find(FIND_CONSTRUCTION_SITES), (site) => site.structureType == STRUCTURE_ROAD).forEach(function (structure) {
                                //console.log(structure.pos)
                                costs.set(structure.pos.x, structure.pos.y, 1);
                            });


                            room.find(FIND_STRUCTURES).forEach(function (structure) {
                                if (structure.structureType === STRUCTURE_ROAD) {
                                    // Favor roads over plain tiles
                                    costs.set(structure.pos.x, structure.pos.y, 1);
                                } else if (structure.structureType !== STRUCTURE_CONTAINER &&
                                    (structure.structureType !== STRUCTURE_RAMPART ||
                                        !structure.my)) {
                                    // Can't walk through non-walkable buildings
                                    costs.set(structure.pos.x, structure.pos.y, 0xff);
                                }
                            });


                            return costs;
                        },
                    }
                );

                for (var point in ret.path) {
                    //console.log(ret.path[point].y)
                    Game.rooms[room].createConstructionSite(ret.path[point].x, ret.path[point].y, STRUCTURE_ROAD);
                }
            }

        }
    }
}




//Game.rooms.w3n3.createConstructionSite(10, 15, STRUCTURE_ROAD);
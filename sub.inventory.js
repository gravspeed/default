
module.exports = {
    run: function () {

        if (!Memory.roomInfo) {
            Memory.roomInfo = {}
        }
        for (var i in Game.rooms) {
            if (!Memory.roomInfo[i]) {
                Memory.roomInfo[i] = {}
            }
            if (!Memory.roomInfo[i].creepCount) {
                Memory.roomInfo[i].creepCount = {}
            }

            var roomCreeps = Game.rooms[i].find(FIND_MY_CREEPS)
            Memory.roomInfo[i].creepCount.harvester = _.filter(roomCreeps, (creep) => creep.memory.role == 'harvester').length
            Memory.roomInfo[i].creepCount.carrier = _.filter(roomCreeps, (creep) => creep.memory.role == 'carrier').length
            Memory.roomInfo[i].creepCount.upgrader = _.filter(roomCreeps, (creep) => creep.memory.role == 'upgrader').length
            Memory.roomInfo[i].creepCount.builder = _.filter(roomCreeps, (creep) => creep.memory.role == 'builder').length


            Memory.roomInfo[i].constructionSites = Game.rooms[i].find(FIND_CONSTRUCTION_SITES)
            Memory.roomInfo[i].sourceList = Game.rooms[i].find(FIND_SOURCES)
            Memory.roomInfo[i].structures = Game.rooms[i].find(FIND_STRUCTURES)

        }
    }
}











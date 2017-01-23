var roleCarrier = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.carry && creep.carry.energy == 0) {
            creep.memory.carry = false;
            creep.say('collect');
        }
        if (!creep.memory.carry && creep.carry.energy == creep.carryCapacity) {
            creep.memory.carry = true;
            creep.say('carry');
        }

        if (creep.memory.carry) {
            var targets = creep.room.find(FIND_STORAGE);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        else {

            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
};

module.exports = roleCarrier;
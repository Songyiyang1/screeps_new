var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {

        var actionWEnergy = require('action.workerEnergy');

        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.say('🚧 build');
        }

        if (creep.memory.working) {
            var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            var targets1 = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (object) => {
                    return object.hits < object.hitsMax && object.structureType != STRUCTURE_WALL;
                }
            });
            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    });
                }
                creep.repair(targets1);
            } else if (targets1) {
                if (creep.repair(targets1) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets1, {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    });
                }
            } else {
                creep.moveTo(17, 17);
            }
        } else {
            actionWEnergy.run(creep);
        }
    }
};

module.exports = roleBuilder;
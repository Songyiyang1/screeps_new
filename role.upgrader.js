const actionWEnergy = require("action.workerEnergy");
var roleUpgrader = {

        /** @param {Creep} creep **/
        run: function (creep) {


            var actionWEnergy = require('action.workerEnergy');


            if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.working = false;
                creep.say('🔄 harvest');
            }
            if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
                creep.memory.working = true;
                creep.say('⚡ upgrade');
            }

            if (creep.memory.working) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var link = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: object => {
                        return object.structureType == STRUCTURE_LINK && object.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (link) {
                    if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(link);
                    }
                } else {
                    actionWEnergy.run(creep);
                }
            }
        }
    }
;

module.exports = roleUpgrader;
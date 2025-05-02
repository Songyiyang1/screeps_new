var actionWEnergy = {
    /** @param {Creep} creep **/
    run: function (creep) {
        var drop = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        creep.pickup(drop);
        var store = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.store[RESOURCE_ENERGY] > 100;
            }
        });
        if (creep.room.controller.level <= 4 && drop) {
            creep.moveTo(drop);
        } else if (store) {
            if (creep.withdraw(store, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(store, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};
module.exports = actionWEnergy;
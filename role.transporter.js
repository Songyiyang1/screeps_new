var roleTansporter = {
    /** @param {Creep} creep **/
    run: function(creep){
        //find resource and move to it
        if (creep.store.getUsedCapacity()){
            creep.memory.storing = true;
        }else{
            creep.memory.storing = false;
        }
        if(!creep.memory.storing){
            var dropped_resources=creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            var stored_resources=creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            if(dropped_resources){
                creep.pickup(dropped_resources)
                creep.moveTo(dropped_resources, {visualizePathStyle: {stroke: '#ffffff'}});
            }else if(stored_resources){
                creep.withdraw(stored_resources, RESOURCE_ENERGY);
                creep.moveTo(stored_resources, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else{
            var storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN || structure.structureType==STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY);
                }
            });
            creep.transfer(storage, RESOURCE_ENERGY);
            creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};
module.exports = roleTansporter;
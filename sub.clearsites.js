
module.exports = {
    run: function () {
        for (var room in Game.rooms) {
            var sites = Game.rooms[room].find(FIND_CONSTRUCTION_SITES)
            for (var site in sites) {
                //console.log(sites[site])
                sites[site].remove()
            }
        }
    }
} 
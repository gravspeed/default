
module.exports = {
    run: function () {
        for (var room in Memory.roomInfo) {
            if (!Memory.roomInfo[room].buildQueue) {
                Memory.roomInfo[room].buildQueue = {}
            }

        }
    }
}
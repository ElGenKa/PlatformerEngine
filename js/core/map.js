function initMap(map) {
    var decoration = [];
    var blocks = [];
    var npc = [];
    maps[map].forEach(function (item) {
        entity = eval("new " + item.t + "(" + item.x + "," + item.y + ")");
        if (entity.attrs.name === 'decoration') {
            decoration.push(entity);
        } else if (entity.attrs.name === 'npcEnemy') {
            npc.push(entity)
        } else {
            blocks.push(entity);
        }
    });
    var mapGroup = new Konva.Group({
        name: 'mapGroup'
    });
    decoration.forEach(function (item) {
        mapGroup.add(item);
    });
    blocks.forEach(function (item) {
        mapGroup.add(item);
    });

    var drag = false;
    if (engine.editor === 1)
        npc.forEach(function (item) {
            mapGroup.add(item);
        });
    else
        npc.forEach(function (item) {
            layerHits.add(item);
        });

    layerHits.add(mapGroup);
}
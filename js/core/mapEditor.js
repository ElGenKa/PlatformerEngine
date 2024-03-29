var engine;

engine = {
    images: {},
    selectMap: null,
    renderFrame: 0,
    editor: 1,
    npcs: [],
    keys: {
        a: false,
        s: false,
        d: false,
        w: false
    },
    ini: function () {
        engine.loadImages(sources);
        var selMap = localStorage.getItem('selectMap');
        if (selMap) {
            engine.selectMap = selMap;
        } else
            engine.selectMap = 0;

        $('.mapSelector').on('click', function (item) {
            localStorage.setItem('selectMap', $(item.currentTarget).data('map'));
            location.reload();
        });
    },

    render: function () {
        layerHits.clear();
        if (this.keys.a) {
            this.cameraMoveX(-5);
        }
        if (this.keys.s) {
            this.cameraMoveY(5);
        }
        if (this.keys.d) {
            this.cameraMoveX(5);
        }
        if (this.keys.w) {
            this.cameraMoveY(-5);
        }
        this.renderFrame += 1;
        layerHits.draw();
    },

    cameraMoveX: function (x) {
        this.moveAllEntities((x * -1));
    },

    cameraMoveY: function (y) {
        this.moveAllEntities(0, (y * -1));
    },

    moveAllEntities: function (x = 0, y = 0) {
        var moveDis = {x: 0, y: 0};
        layerHits.children.each(function (item) {
            if (item.attrs.name !== 'player') {
                moveDis.x = x;
                moveDis.y = y;
                item.move(moveDis);
            }
        });
    },

    loadImages: function (sources) {
        var assetDir = 'assets/';
        engine.images = {};
        for (var src in sources) {
            if (sources[src].count > 0) {
                engine.images[src] = {count: sources[src].count};
                for (var i = 0; i < sources.count; i++) {
                    engine.images[src].image[i] = new Image();
                    engine.images[src].image[i].src = assetDir + sources[src].image[i];
                }
            } else {
                engine.images[src] = new Image();
                engine.images[src].src = assetDir + sources[src];
            }
        }
    },

    keyDown: function (keyPressed) {
        switch (keyPressed) {
            case 65: //A
                engine.keys.a = true;
                break;
            case 83: //S
                engine.keys.s = true;
                break;
            case 68: //D
                engine.keys.d = true;
                break;
            case 87: //W
                engine.keys.w = true;
                break;
        }
    },

    keyUp: function (keyPressed) {
        switch (keyPressed) {
            case 65: //A
                engine.keys.a = false;
                break;
            case 83: //S
                engine.keys.s = false;
                break;
            case 68: //D
                engine.keys.d = false;
                break;
            case 87: //W
                engine.keys.w = false;
                break;
        }
    },

    download: function () {
        var res = layerHits.children;
        var contentTemp = [];
        res.forEach(function (item) {
            var name = item.name();
            if (name == 'mapGroup') {
                item.children.each(function (itemEach) {
                    console.log(itemEach.attrs.tNpc);
                    var useName;
                    if(itemEach.name() === 'npcEnemy'){
                        useName = itemEach.attrs.tNpc;
                    }else{
                        useName = itemEach.attrs.t;
                    }
                    contentTemp.push({
                        x: itemEach.x(),
                        y: itemEach.y(),
                        t: useName
                    });
                });
                /*}else{
                    contentTemp.push({x: item.x(), y: item.y(), t: item.attrs.t, tNpc: item.attrs.tNpc});
                }*/
            }
        });
        var content = JSON.stringify(contentTemp);
        var fileName = 'map.txt';
        var a = document.createElement("a");
        var file = new Blob([content], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    },

    newPlatform: function () {
        //console.log(layerHits.children);
        var mapGroup = layerHits.find('.mapGroup')[0];
        mapGroup.add(new PlatformSmall(300 - mapGroup.x(), 300 - mapGroup.y()));
        //layerHits.add();
    },

    selected: null,
    acceptBlock() {
        console.log(engine.selected);
        var entity = eval("new " + $('#object_t').val() + "(" + engine.selected.x() + "," + engine.selected.y() + ")");
        engine.selected.destroy();
        var mapGroup = layerHits.find('.mapGroup')[0];
        mapGroup.add(entity);
        console.log(entity);
    },

    deleteBlock() {
        engine.selected.destroy();
    }

};
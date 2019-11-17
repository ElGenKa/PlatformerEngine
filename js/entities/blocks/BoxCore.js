class BoxCore {
    constructor(x,y,w,h,image,name){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = image;
        this.name = name;
        return this.draw();
    }
    draw(){
        var drag = false;
        if (engine.editor === 1)
            drag = true;
        var group = new Konva.Group({
            x: this.x,
            y: this.y,
            draggable: drag,
            t: this.name,
            name: 'box',
            width: this.w,
            height: this.h
        });

        var entity;
        if(this.image.count === 1) {
            entity = new Konva.Image({
                image: this.image.image,
                x: 0,
                y: 0,
                width: this.w,
                height: this.h,
                parent: group
            });
            group.add(entity);
        }else{
            for(var i = 0; i<this.image.count; i++){
                entity = new Konva.Image({
                    image: this.image.image[i],
                    x: 70*i,
                    y: 0,
                    width: this.w / this.image.count,
                    height: this.h,
                    parent: group
                });
                group.add(entity);
            }
        }

        var hitBox;
        //HitBox
        //left
        hitBox = new Konva.Rect({
            x: 0,
            y: 0,
            width: 3,
            height: this.h,
            name: 'HitBoxLeft',
            id: 'hitBox',
            fill: 'hellow'
        });
        group.add(hitBox);
        //Right
        hitBox = new Konva.Rect({
            x: this.w - 3,
            y: 0,
            width: 3,
            height: this.h,
            name: 'HitBoxRight',
            id: 'hitBox',
            fill: 'hellow'
        });
        group.add(hitBox);
        //Top
        hitBox = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.w,
            height: 3,
            name: 'HitBoxTop',
            id: 'hitBox',
            fill: 'hellow'
        });
        group.add(hitBox);
        //Down
        hitBox = new Konva.Rect({
            x: 0,
            y: this.h-3,
            width: this.w,
            height: 3,
            name: 'HitBoxDown',
            id: 'hitBox',
            fill: 'hellow'
        });
        group.add(hitBox);

        group.attrs.upd = function (itemSender) {
            mapChildrensBullet.each(function (item) {
                var itemR = item.getClientRect();
                if (!engine.Intersection(itemR, itemSender)) {
                    item.attrs.classId.live = false;
                    item.attrs.classId.entity.destroy();
                }
            });
        };
        //group.attrs.upd();
        return group;
    }
}
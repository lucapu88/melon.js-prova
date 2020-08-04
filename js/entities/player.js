game.Player = me.Entity.extend({
    init: function (x, y, settings) {
      // call the constructor
      this._super(me.Entity, "init", [x, y, settings]);
     //   var image = me.loader.getImage("pipottino");
        // define a basic walking animation (using all frames)
        this.renderable.addAnimation("walk", [15, 16, 17, 18, 19, 20]);
        this.renderable.addAnimation("stand", [15]);
        this.renderable.setCurrentAnimation("stand");
     //   this._super(me.Sprite, "init", [me.game.viewport.width / 2 - image.width / 2, me.game.viewport.height - image.height - 20, { image: image }]);
        this.velx = 450;
        this.vely = 450;
        this.maxX = me.game.viewport.width - this.width;
    },

    update: function (time) {
        this._super(me.Entity, "update", [time]);
        // if (me.input.isKeyPressed("left")) {
        //   this.pos.x -= this.velx * time / 1000;
        // }
        if (me.input.isKeyPressed("right")) {
          this.pos.x += this.velx * time / 1000;
          if (!this.renderable.isCurrentAnimation("walk")) {
           this.renderable.setCurrentAnimation("walk");
         }
        }
        // if (me.input.isKeyPressed("up")) {
        //   this.pos.y -= this.vely * time / 1000;
        // }
        // if (me.input.isKeyPressed("down")) {
        //   this.pos.y += this.vely * time / 1000;
        // }

        this.pos.x = me.Math.clamp(this.pos.x, 0, this.maxX);
        console.log(this.body);
        return true;
    }
});
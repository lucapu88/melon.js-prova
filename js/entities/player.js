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
        me.event.subscribe('/moveto', this.moveTo.bind(this));
    },

    moveTo: function (x, y) {
      var dest = new me.Vector2d(x - this.width / 2, y - this.height / 2); 
      this.destination = dest;

      this.vel = dest.clone().sub(this.pos).normalize().scale(450);
      this.walking = true;
    },

    update: function (time) {
        this._super(me.Entity, "update", [time]);
        if (this.walking == true) {
          var dot1 = this.pos.dotProduct(this.destination);
          this.pos.add(this.vel.clone().scale(time / 1000));
          var dot2 = this.pos.dotProduct(this.destination);
          var d = this.destination.length2();
          if ((dot1 > d && dot2 <= d) || (dot1 < d && dot2 >= d)) {
            this.walking = false;
            this.pos.setV(this.destination);
          }
        }
        // if (me.input.isKeyPressed("left")) {
        //   this.pos.x -= this.velx * time / 1000;
        // }
        // if (me.input.isKeyPressed("right")) {
        //   this.pos.x += this.velx * time / 1000;
        //   if (!this.renderable.isCurrentAnimation("walk")) {
        //    this.renderable.setCurrentAnimation("walk");
        //  }
        // }
        // if (me.input.isKeyPressed("up")) {
        //   this.pos.y -= this.vely * time / 1000;
        // }
        // if (me.input.isKeyPressed("down")) {
        //   this.pos.y += this.vely * time / 1000;
        // }

        this.pos.x = me.Math.clamp(this.pos.x, 0, this.maxX);
        return true;
    }
});
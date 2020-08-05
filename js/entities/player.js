game.Player = me.Entity.extend({
    init: function (x, y, settings) {
      // call the constructor
      this._super(me.Entity, "init", [x, y, settings]);
     //   var image = me.loader.getImage("pipottino");
        // define a basic walking animation (using all frames)
        this.renderable.addAnimation("walk", [14, 15, 16, 17, 18, 19, 20]);
        this.renderable.addAnimation("walk_up", [7, 9, 10, 11, 12, 13]);
        this.renderable.addAnimation("walk_down", [0, 1, 2, 3, 4, 5, 6]);
        this.renderable.addAnimation("stand", [6]);
        this.renderable.setCurrentAnimation("stand");
     //   this._super(me.Sprite, "init", [me.game.viewport.width / 2 - image.width / 2, me.game.viewport.height - image.height - 20, { image: image }]);
        this.velx = 450;
        this.vely = 450;
        this.maxX = me.game.viewport.width - this.width;
        me.event.subscribe('/moveto', this.moveTo.bind(this));
        me.event.subscribe('/moveend', this.moveEnd.bind(this));
    },

    moveTo: function (x, y) {
      /**
       * x è il punto di origine dell'asse x dell'entity
       * y è il punto di origine dell'asse y dell'entity
       * Vector2d costruisce un nuovo oggetto vettore
       * il nuovo vettore è uguale a: x - la larghezza dell'entity diviso 2, y - l'altezza dell'entity diviso 2
       * 0 - 64 /2 = 32  
       */
      console.log("UP: " + this.initXY.x);
      
      var dest = new me.Vector2d(x - this.width / 2, y - this.height / 2); 
      this.destination = dest;

      this.vel = dest.clone().sub(this.pos).normalize().scale(450);
      this.walking = true;
      this.renderable.setCurrentAnimation("walk");
      if ((this.destination.y - this.initXY.y) > 0) {
        this.renderable.setCurrentAnimation("walk_down");
      } else {
        this.renderable.setCurrentAnimation("walk_up");
      }

      console.log("DOWN: " + this.destination);
      // console.log((this.destination.x - this.initXY.x) > 0);
      // console.log((this.destination.y - this.initXY.y) > 0);
    },

    moveEnd: function (x, y) {
      var dest = new me.Vector2d(x - this.width / 2, y - this.height / 2);
      this.initXY = dest;
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
            this.renderable.setCurrentAnimation("stand");
          }
        }

        this.pos.x = me.Math.clamp(this.pos.x, 0, this.maxX);
        return true;
    }
});
game.PlayScreen = me.Stage.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
      //  me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);
        me.levelDirector.loadLevel("grass");
       // me.game.world.addChild("mainPlayer");

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.registerPointerEvent("pointerdown", me.game.viewport, 
        function(ev){
          me.event.publish('/moveto',[ev.gameX, ev.gameY]);
        });
      //  me.input.bindPointer(me.input.KEY.RIGHT);
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.SPACE, "shoot", true);
    },
    checkIfLoss : function (y) {
        if (y >= this.player.pos.y) {
           this.reset();
        }
    },


    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.UP);
        me.input.unbindKey(me.input.KEY.DOWN);
        me.input.unbindKey(me.input.KEY.SPACE);
    }
});
game.PlayScreen = me.Stage.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
      //  me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);
        me.levelDirector.loadLevel("grass");
       // me.game.world.addChild("mainPlayer");
        me.input.registerPointerEvent("pointerdown", me.game.viewport, 
        function(ev){
         me.event.publish('/moveto',[ev.gameX, ev.gameY]);
           //console.log(ev.clientX, ev.clientY);
          //  console.log(ev);
        });
        me.input.registerPointerEvent("pointerup", me.game.viewport, 
        function(ev){
         me.event.publish('/moveend',[ev.gameX, ev.gameY]);
           //console.log(ev.clientX, ev.clientY);
          //  console.log(ev);
        });
    
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {

    }
});
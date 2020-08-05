/*
 * Define the game namespace
 */
var game = (function() {
  "use strict"

  return {

    data: {
      score : 0
    },

    onload() {
      if (!me.video.init(1200, 600, {wrapper : "screen", scale : "flex-width", scaleMethod : "fit"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
      }

      me.audio.init("mp3,ogg");

      me.loader.preload(game.resources, () => this.onResourcesLoaded());
    },

    onResourcesLoaded() {
      me.state.set(me.state.PLAY, new game.PlayScreen());
      //register entity object
      me.pool.register("mainPlayer", game.Player);

      // Start the game.
      me.state.change(me.state.PLAY);
    }
  };

}());

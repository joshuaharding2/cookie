// autoclicker.js (mod by Joshua Harding)
(function(){

    // create global
    if (!window.autoclicker) window.autoclicker = {};

    // assign methods
    Object.assign(window.autoclicker, {
      
        interval: null,
        start: function(){
            this.stop();
            if (!Game.prefs.autoclickerOn) return;
            //if (!Game.Has("autoclicker")) return;
            if (Game.prefs.autoclickerCps === 0) return;
            var delay = 1000 / Game.prefs.autoclickerCps;
            this.interval = setInterval(function(){
                try {
                    Game.ClickCookie({preventDefault: function(){}}, null, true);
                } catch(e){ console.log(e); }
            }, delay);
        },

        stop: function(){
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        },

        toggle: function(){
          if (Game.prefs.autoclickerOn) {
              this.start();
          } else {
              this.stop();
          }
          Game.UpdateMenu();
          Game.toSave = true;
        },

        setCPS: function(newCPS){
            newCPS = parseInt(newCPS,10) || 1;
            Game.prefs.autoclickerCps = Math.min(Math.max(1, newCPS), Game.prefs.autoclickerCpsCap);
            if (Game.prefs.autoclickerOn) {
                this.stop();
                this.start();
            }
            Game.UpdateMenu();
            Game.toSave = true;
        },

        setHotkey: function(newKey){
            if (!newKey) return;
            Game.prefs.autoclickerHotkey = newKey.toUpperCase();
            Game.UpdateMenu();
            Game.toSave = true;
        }
    });

    document.addEventListener("keydown", function(e) {
      if (e.key.toUpperCase() === Game.prefs.autoclickerHotkey.toUpperCase()) {
        Game.Toggle('autoclickerOn','autoclickerOnButton',['Autoclicker ON','Autoclicker OFF']);
        autoclicker.toggle();
      }
    });
})();

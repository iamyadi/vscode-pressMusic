var fs               = require('fs')
  , findExec         = require('find-exec')
  , spawn            = require('child_process').spawn
  , players          = [
      'afplay',
      'mplayer',
                        'mpg123',
                        'mpg321',
                        'play',
                        'omxplayer',
                        'aplay',
                        'cmdmp3'
                       ];
const path = require('path');

class Play{
    opts: any;
    players: any;
    player: any;
    urlRegex: RegExp;
    constructor(opts: any){
        this.opts = opts || {};
        this.players       = opts.players       || players;
        this.player        = opts.player        || findExec(this.players);
        this.urlRegex      = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/i;
    }
    play(what:any, options:any, next?:any){
          next  = next || function(){};
          next  = typeof options === 'function' ? options : next;
          options = typeof options === 'object' ? options : {};
          options.stdio = 'ignore';
          options.volume = 20;
      
          var isURL = this.player === 'mplayer' && this.urlRegex.test(what);
      
          if (!what) {return next(new Error("No audio file specified"));};
      
          if (!this.player){
            return next(new Error("Couldn't find a suitable audio player"));
          }

          var args = Array.isArray(options[this.player]) ? options[this.player].concat(what) : [what];
          const videoPath = args.map((pathString: string)=>{
            return path.join(__dirname, pathString);
          });
          var process = spawn(this.player, videoPath, options);
          if (!process) {
            next(new Error("Unable to spawn process with " + this.player));
            return null;
          }
          process.on('close',function(err: any){ 
              next(err && !err.killed ? err : null); });
          return process;
        };
    test(){
        this.play('./music/test.mp3', {});
    }
}

const player = new Play({});
export default player;

montageDefine("1ea3c23","core/media-controller",{dependencies:["./core","./target","./logger"],factory:function(e,t){e("./core").Montage;var n=e("./target").Target,i=e("./logger").logger("mediacontroller");t.MediaController=n.specialize({STOPPED:{value:0,writable:!1},PLAYING:{value:1,writable:!1},PAUSED:{value:2,writable:!1},EMPTY:{value:3,writable:!1},_TIMEUPDATE_FREQUENCY:{value:.25},_mediaController:{value:null},mediaController:{get:function(){return this._mediaController||(this._mediaController=new window.MediaController,this._installControlEventHandlers()),this._mediaController},set:function(e){this._mediaController!==e&&(this._mediaController&&this._removeControlEventHandlers(),this._mediaController=e,this._installControlEventHandlers())}},_status:{value:3},status:{get:function(){return this._status},set:function(e){e!==this._status&&(i.isDebug&&i.debug("MediaController:status: "+e),this._status=e)}},_position:{value:null},position:{set:function(e,t){this._position=e,t||(this._pauseTime=null,this.currentTime=e)},get:function(){return this._position}},_duration:{value:null},duration:{set:function(e){return isNaN(e)?(i.isDebug&&i.debug("MediaController:setDuration: duration is not valid"),void 0):(i.isDebug&&i.debug("MediaController:setDuration: duration="+e),this._duration=e,void 0)},get:function(){return this._duration}},autoplay:{value:!1},play:{value:function(){i.isDebug&&i.debug("MediaController:play()"),0!==this.mediaController.currentTime&&(this.mediaController.currentTime=0),this.mediaController.play(),this._pauseTime=null}},_pauseTime:{value:null},pause:{value:function(){i.isDebug&&i.debug("MediaController:pause()"),this._pauseTime=this.mediaController.currentTime,this.mediaController.pause()}},unpause:{value:function(){i.isDebug&&i.debug("MediaController:unpause()"),null!==this._pauseTime&&(this.mediaController.currentTime=this._pauseTime),this.mediaController.unpause()}},playPause:{value:function(){i.isDebug&&i.debug("MediaController:playPause()");var e=this.status===this.PLAYING,t=this.status===this.PAUSED;return this.playbackRate=this.mediaController.defaultPlaybackRate,e?this.pause():t?this.unpause():this.play(),!e}},_playbackRate:{value:1},playbackRate:{get:function(){return this._playbackRate},set:function(e){this._playbackRate!==e&&(this._playbackRate=e,this.mediaController.playbackRate=this._playbackRate)}},currentTime:{get:function(){return this.mediaController.currentTime},set:function(e){if(this.status!==this.EMPTY)try{if(isNaN(this.mediaController.duration))return i.error("MediaController:set currentTime: duration is not valid"),void 0;i.isDebug&&i.debug("current time: "+this.mediaController.currentTime+", new time: "+e);var t=this.mediaController.currentTime;t!==e&&(this.mediaController.currentTime=e)}catch(n){i.error("MediaController:Exception in set currentTime"+this.mediaController.currentTime)}}},rewind:{value:function(){this.status===this.PLAYING&&(i.isDebug&&i.debug("MediaController:rewind()"),this.playbackRate=-4)}},fastForward:{value:function(){this.status===this.PLAYING&&(i.isDebug&&i.debug("MediaController:fastForward()"),this.playbackRate=4)}},stop:{value:function(){i.isDebug&&i.debug("MediaController:stop()"),this.mediaController.pause(),this._pauseTime=null,this.status=this.STOPPED,this.position=0}},volume:{get:function(){return 100*this.mediaController.volume},set:function(e){var t=e;t===void 0?t=50:t>100?t=100:0>t&&(t=0),this.mediaController.volume=t/100}},volumeIncrease:{value:function(){this.volume+=10}},volumeDecrease:{value:function(){this.volume-=10}},toggleMute:{value:function(){this.mute=!this.mute}},mute:{get:function(){return this.mediaController.muted},set:function(e){e!==this.mediaController.muted&&(this.mediaController.muted=e)}},handleLoadedmetadata:{value:function(){return i.isDebug&&i.debug("MediaController:handleLoadedmetadata: PLAYING="+(this.status===this.PLAYING)+" duration="+this.mediaController.duration),isNaN(this.mediaController.duration)?(i.isDebug&&i.debug("MediaController:handleLoadedmetadata: duration is not valid"),void 0):(this.duration=this.mediaController.duration,this.autoplay?(i.isDebug&&i.debug("MediaController:handleLoadedmetadata: autoplay"),this.play()):this.status=this.STOPPED,void 0)}},_lastCurrentTime:{value:0},handleTimeupdate:{value:function(){if(this.status!==this.STOPPED){var e=this.mediaController.currentTime;Object.getPropertyDescriptor(this,"position").set.call(this,e,!0)}}},handlePlay:{value:function(){i.isDebug&&i.debug("MediaController:handlePlay"),this.status=this.PLAYING}},handlePlaying:{value:function(){i.isDebug&&i.debug("MediaController:handlePlaying: PLAYING"),this.status=this.PLAYING}},handlePause:{value:function(){this.status!==this.STOPPED?(i.isDebug&&i.debug("MediaController:handlePause: PAUSED"),this.status=this.PAUSED):i.isDebug&&i.debug("MediaController:handlePause: STOPPED")}},handleEnded:{value:function(){i.isDebug&&i.debug("MediaController:handleEnded"),this.mediaController.pause(),this.status=this.STOPPED}},handleAbort:{value:function(){i.isDebug&&i.debug("MediaController:handleAbort: STOPPED"),this.status=this.STOPPED}},handleError:{value:function(e){i.isDebug&&i.debug("MediaController:handleError: STOPPED");var t=e.target.error;if(this.status=this.STOPPED,t)switch(t.code){case t.MEDIA_ERR_ABORTED:console.error("You aborted the video playback.");break;case t.MEDIA_ERR_NETWORK:console.error("A network error caused the video download to fail part-way.");break;case t.MEDIA_ERR_DECODE:console.error("The video playback was aborted due to a corruption problem or because the video used features your browser did not support.");break;case t.MEDIA_ERR_SRC_NOT_SUPPORTED:console.error("The selected video could not be loaded, either because the server or network failed, the format is not supported, or no video has been selected.");break;default:console.error("An unknown error occurred.")}}},handleEmptied:{value:function(){i.isDebug&&i.debug("MediaController:handleEmptied: STOPPED"),this.status=this.STOPPED}},_installControlEventHandlers:{value:function(){this.mediaController.addEventListener("loadedmetadata",this),this.mediaController.addEventListener("timeupdate",this),this.mediaController.addEventListener("play",this),this.mediaController.addEventListener("playing",this),this.mediaController.addEventListener("pause",this),this.mediaController.addEventListener("abort",this),this.mediaController.addEventListener("error",this),this.mediaController.addEventListener("emptied",this),this.mediaController.addEventListener("ended",this)}},_removeControlEventHandlers:{value:function(){this.mediaController.removeEventListener("loadedmetadata",this),this.mediaController.removeEventListener("timeupdate",this),this.mediaController.removeEventListener("play",this),this.mediaController.removeEventListener("playing",this),this.mediaController.removeEventListener("pause",this),this.mediaController.removeEventListener("abort",this),this.mediaController.removeEventListener("error",this),this.mediaController.removeEventListener("emptied",this),this.mediaController.removeEventListener("ended",this)}},constructor:{value:function(){this.super()}}},{blueprintModuleId:e("./core")._blueprintModuleIdDescriptor,blueprint:e("./core")._blueprintDescriptor})}});
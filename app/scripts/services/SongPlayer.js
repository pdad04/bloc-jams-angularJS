(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    /**
    * @desc Album object
    * @type {object}
    */
    var currentAlbum = Fixtures.getAlbum();


    /**
    * @desc Buzz object audio file
    * @type {object}
    */
    var currentBuzzObject = null;

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {object} song
    */
    var setSong = function(song) {
      if(currentBuzzObject) {
        stopSong();
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };

    /**
    * @function playSong
    * @desc play song and set playing to true
    * @param {object} song
    */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    }

    var stopSong = function(){
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    }

    /**
    * @function getSongIndex
    * @desc gets index of the song
    * @param {object} song
    * @return index
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    }

    /**
    * @desc Active song object from list of songs
    * @type {object}
    */
    SongPlayer.currentSong = null;

    /**
    * @function play
    * @desc if SongPlayer.currentSong is not song calls setSong and playSong. Otherwise checks if currentBuzzObject isPaused, if so calls playSong
    * @param {object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if(SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if(SongPlayer.currentSong === song) {
          if(currentBuzzObject.isPaused()) {
            playSong(song);
          }
      }
    };

    /**
    * @function pause
    * @desc pauses song and sets playing to false
    * @param {object} song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    * @function previous
    * @desc moves back to previous song
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if(currentSongIndex < 0){
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function next
    * @desc move to next song
    */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if(currentSongIndex > currentAlbum.songs.length - 1){
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    }

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer',['Fixtures',SongPlayer]);
})();

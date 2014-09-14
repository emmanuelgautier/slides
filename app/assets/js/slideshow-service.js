(function(){
  'use strict';

  slidesApp.factory('$slideshow', function($socket, $slideshare){

    var _room = null,

        bind = {
          previous: function(){
            $slideshare.slide.current -= 1;

            $socket.slides.emit('to', { to: $slideshare.slide.current });
          },

          next: function(){
            $slideshare.slide.current += 1;

            $socket.slides.emit('to', { to: $slideshare.slide.current });
          },

          to: function(slide){
            $slideshare.slide.current = slide;

            $socket.slides.emit('to', { to: $slideshare.slide.current });
          }
        },

        action = {
          to: function(slide) {
            slide = parseInt(slide);

            $slideshare.slide.current = slide;

            $slideshare.slideshow.to(slide);
          }
        },

        start = function(room){
          _room = room;

          $socket.slides.join(room.token)
                        .on('to', action.to);

          $slideshare.slideshow.bind.previous(bind.previous);
          $slideshare.slideshow.bind.next(bind.next);
          $slideshare.slideshow.bind.to(bind.to);
        };

        return {
          start: start
        }
  });
}());

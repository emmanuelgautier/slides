define([], function() {
  'use strict';

  var _slide = {
    number: 42,
    current: 1
  },

  slideshow = function() {
    var _bind = {},

        _discard_action = {
          previous: false,
          next: false,
          to: false
        },

        postMessage = function(name, message) {
          var payload = name;

          if(message)
            payload = payload + '_' + message;

          $('#slideshare_iframe').get(0).contentWindow.postMessage(payload, '*');
        },

        receiveMessage = function(e) {
          var message = e.originalEvent.data,
              messageComponents = message.split('_'),
              messageName = messageComponents[0],
              values = messageComponents.slice(1);

          switch(messageName) {
            case 'previous':
              if(_discard_action.previous) {
                _discard_action.previous = false;

                return;
              }

              _discard_action.to = true;

              if(typeof _bind.previous === 'function')
                _bind.previous();

              break;

            case 'next':
              if(_discard_action.next) {
                _discard_action.next = false;

                return;
              }

              _discard_action.to = true;

              if(typeof _bind.next === 'function')
                _bind.next();

              break;

            case 'slidechanged':
              if(_discard_action.to) {
                _discard_action.to = false;

                return;
              }

              var slide = parseInt(values[0]);

              if(slide === (_slide.current - 1)) {
                _discard_action.previous = true;

                if(typeof _bind.previous === 'function')
                  _bind.previous();

                return;
              }

              if(slide === (_slide.current + 1)){
                _discard_action.next = true;

                if(typeof _bind.next === 'function')
                  _bind.next();

                return;
              }

              if(typeof _bind.to === 'function')
                _bind.to(slide);

              break;

            default: break;
          }
        };

    self = function(){
      $(window).bind('message', receiveMessage);
    }();

    return {
      first: function() {
        postMessage('first');
      },

      previous: function() {
        postMessage('previous');
      },

      next: function() {
        postMessage('next');
      },

      last: function() {
        postMessage('last');
      },

      to: function(slide) {
        postMessage('jumpTo', slide);
      },

      bind: {
        first: function(callback) {
          _bind.first = callback;
        },

        previous: function(callback) {
          _bind.previous = callback;
        },

        next: function(callback) {
          _bind.next = callback;
        },

        last: function(callback) {
          _bind.last = callback;
        },

        to: function(callback) {
          _bind.to = callback;
        }
      }
    };
  };

  var slideshowObject = slideshow();

  return {
    slide: _slide,
    slideshow: slideshowObject
  };
});

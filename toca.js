$.fn.extend({
  toca: function (options) {
    if (options == 'destroy') {
      return this.each(function () {
        $(this).off('.toca');
      });
    }

    options = options || {};
    
    var getXY = function(e) {
      var ret = {x:0,y:0};
      if(e.pageX && e.pageY) {
        ret.x = e.pageX;
        ret.y = e.pageY;
      }
      else if(e.originalEvent.touches) {
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        ret.x = touch.pageX;
        ret.y = touch.pageY;
      }
      return ret;
    }
    
    var getEvent = function(type,e) {
      var event = $.Event(type);
      event.originalEvent = e.originalEvent;
      
      event.pageX = getXY(e).x;
      event.pageY = getXY(e).y;
      
      return event;
    }

    return this.each(function () {
      var $this = $(this);
      $this.off('.toca');

      var on = function (event, callback) {
        if (options.selector) {
          return $this.on(event, options.selector, callback);
        } else {
          return $this.on(event, callback);
        }
      };

      var overElement = function (event) {
        // Get x and y for the event
        var x = getXY(event).x;
        var y = getXY(event).y;

        // Get target area
        var elx = $(event.target).offset().left;
        var ely = $(event.target).offset().top;
        var w = $(event.target).outerWidth();
        var h = $(event.target).outerHeight();

        // Determine if event is within target area
        return x >= elx && x <= elx + w && y >= ely && y <= ely + h;
      };
      
      // TODO: have option to track touchmove to find out when you're no longer over the element

      var hovering = false;
      if (options.hoverdelay) {
        var hovertimerid = 0;

        on('touchstart.toca', function (event) {
          event.preventDefault();
          hovertimerid = window.setTimeout(function () {
            if (hovering) return;
            $this.trigger(getEvent('hoverin',event));
            hovering = true;
          }, options.hoverdelay * 1);
        });
        on('mouseenter.toca', function (event) {
          if (hovering) return;
          hovering = true;
          $this.trigger(getEvent('hoverin',event));
        });
        on('touchend.toca', function (event) {
          event.preventDefault();
          window.clearTimeout(hovertimerid);
          if (hovering) {
            hovering = false;
          
            $this.trigger(getEvent('hoverout',event));
          }
          if (overElement(event)) {
            $this.trigger(getEvent('tap',event));
          }
        });
        on('mouseleave.toca touchcancel.toca', function (event) {
          event.preventDefault();
          window.clearTimeout(hovertimerid);
          if (!hovering) return;
          hovering = false;

          $this.trigger(getEvent('hoverout',event));
        });
        on('mouseup.toca', function (event) {
          if (overElement(event)) {
            $this.trigger(getEvent('tap',event));
          }
        });
      } else {
        on('mouseenter.toca touchstart.toca', function (event) {
          event.preventDefault();
          if (hovering) return;
          hovering = true;
          $this.trigger(getEvent('hoverin',event));
        });

        on('touchend.toca', function (event) {
          event.preventDefault();
          if (hovering) {
            hovering = false;
            $this.trigger(getEvent('hoverout',event));
          }
          if (overElement(event)) {
            $this.trigger(getEvent('tap',event));
          }
        });
        on('mouseleave.toca touchcancel.toca', function (event) {
          event.preventDefault();
          if (!hovering) return;
          hovering = false;

          $this.trigger(getEvent('hoverout',event));
        });
        on('mouseup.toca', function (event) {
          if (overElement(event)) {
            $this.trigger(getEvent('tap',event));
          }
        });
      }
    });
  }
});

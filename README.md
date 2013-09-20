toca.js
===============

jQuery plugin which adds click and hover events that work on any device, desktop or mobile.

```js
$("#myelement").toca()
  .on('hoverin',function(event) {
    console.log('hover in');
  })
  .on('hoverout',function(event) {
    console.log('hover out');
  })
  .on('tap',function(event) {
    console.log('tap');
  });
```

Why use toca.js?
---------------------

If you want to have hover events but are worried about touchscreen support, toca.js can help.

Common uses are:
*   Hover audio
*   Tooltips
*   Drop down menus


How does hover work on a touch device???
----------------------

If toca.js is used on a touchscreen device:

*  When the user starts touching an element, `hover in` is fired.
*  When the user stops touching an element, `hover out` is fired.
*  If the user starts and stops touching an element, `click` is fired.

A lot of times, hover events are used to give the user more information 
before they decide to click something.  To keep the same experience on
touchscreens, the `click` event in toca.js can be cancelled several ways:

*  The user moves their finger and releases outside the target area.
*  The `touchcancel` event is fired (e.g. by a notification popping up)

;(function(window, document, navigator) {
  'use strict';
  const TOP_LEFT = 'top-left';
  const TOP_RIGHT = 'top-right';
  const BOTTOM_LEFT = 'bottom-left';
  const BOTTOM_RIGHT = 'bottom-right';
  const ACTIVE = 'active';
  const INACTIVE = 'inactive';

  let glio = {
    // glio status
    statusTopLeft: 'inactive',
    statusTopRight: 'inactive',
    statusBottomLeft: 'inactive',
    statusBottomRight: 'inactive',
    // public method
    $public: {
      init(direction, callback) => {
        document.body.addEventListener('mousemove', (event) => {
          let pointX = event.pageX,
              pointY = event.pageY,
              isTopLeftInactive = glio.getDirection(direction, TOP_LEFT)
                                  && (glio.statusTopLeft === INACTIVE),
              isTopRightInactive = glio.getDirection(direction, TOP_RIGHT)
                                   && (glio.statusTopRight === INACTIVE),
              isBottomRightInactive = glio.getDirection(direction, BOTTOM_RIGHT)
                                      && (glio.statusBottomRight === INACTIVE),
              isBottomLeftInactive = glio.getDirection(direction, BOTTOM_LEFT)
                                     && (glio.statusBottomLeft === INACTIVE);
          if (isTopLeftInactive) {
            glio.callTopleft(pointX, pointY, callback);
          } else if (isTopRightInactive) {
            glio.callTopRight(pointX, pointY, callback);
          } else if (isBottomRightInactive) {
            glio.callBottomRight(pointX, pointY, callback);
          } else if (isBottomRightInactive) {
            glio.callBottomLeft(pointX, pointY, callback);
          }
        });
      }
    },
    // the value of top-right screen, for use when user pass the mouse in the area
    getWidthRightValue() => {
      let screenWidthFragment = glio.getScreenWidthFragment(),
          topRightValue = (screenWidthFragment * 12) - screenWidthFragment;
      return topRightValue;
    },
    // get the value of top height
    getTopHeight() => {
      let sHeight = 50;
      return sHeight;
    },
    // The value of total screen width are divided in parts
    getScreenWidthFragment() => {
      let screenWidthFragment = (parseInt(window.innerWidth, 10) / 12);
      return screenWidthFragment;
    },
    // The value of total screen height are divided in parts
    getScreenHeightFragment() => {
      let screenHeightFragment = (parseInt(window.innerHeight, 10) / 12);
      return screenHeightFragment;
    },
    // the height value of bottom. this value is the same, independent the direction
    getBottomHeightValue() => {
      let screenHeightFragment = glio.getScreenHeightFragment(),
          bottomRightValue = (screenHeightFragment * 12) - screenHeightFragment;
      return bottomRightValue;
    },
    // verify if direction who user is the same of directions who glio have
    getDirection(directionUser, direction) => directionUser === direction,
    /*
     * Functions of each direction
     */
    callTopleft(x, y, callback) => {
      if (x <= glio.getScreenWidthFragment() && (y <= glio.getTopHeight())) {
        glio.statusTopLeft = ACTIVE;
        callback();
      };
      return glio;
    },
    callTopRight(x, y, callback) => {
      if (x > glio.getWidthRightValue() && (y <= glio.getTopHeight())) {
        glio.statusTopRight = ACTIVE;
        callback();
      };
      return glio;
    },
    callBottomRight(x, y, callback) => {
      if (x >= glio.getWidthRightValue() && (y >= glio.getBottomHeightValue())) {
        glio.statusBottomRight = ACTIVE;
        callback();
      };
      return glio;
    },
    callBottomLeft(x, y, callback) => {
      if (x <= glio.getScreenWidthFragment() && (y >= glio.getBottomHeightValue())) {
        glio.statusBottomLeft = ACTIVE;
        callback();
      };
      return glio;
    }
  };
  if (!window.glio) {
    window.glio = glio.$public;
  }
}(window, document, navigator));

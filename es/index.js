function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

import React, { useRef, forwardRef } from "react";
import { useRect } from "@reach/rect";
import { assignRef } from "@reach/utils";

var getStyles = function getStyles(position, targetRect, popoverRect) {
  var needToMeasurePopup = !popoverRect;

  if (needToMeasurePopup) {
    return {
      visibility: "hidden"
    };
  }

  return position(targetRect, popoverRect);
};

function positionDefault(targetRect, popoverRect) {
  var _getCollisions = getCollisions(targetRect, popoverRect),
    directionUp = _getCollisions.directionUp,
    directionRight = _getCollisions.directionRight;

  return {
    left: directionRight
      ? targetRect.right - popoverRect.width + window.pageXOffset + "px"
      : targetRect.left + window.pageXOffset + "px",
    top: directionUp
      ? targetRect.top - popoverRect.height + window.pageYOffset + "px"
      : targetRect.top + targetRect.height + window.pageYOffset + "px"
  };
}

function getCollisions(targetRect, popoverRect, offsetLeft, offsetBottom) {
  if (offsetLeft === void 0) {
    offsetLeft = 0;
  }

  if (offsetBottom === void 0) {
    offsetBottom = 0;
  }

  var collisions = {
    top: targetRect.top - popoverRect.height < 0,
    right: window.innerWidth < targetRect.left + popoverRect.width - offsetLeft,
    bottom:
      window.innerHeight <
      targetRect.bottom + popoverRect.height - offsetBottom,
    left: targetRect.left - popoverRect.width < 0
  };
  var directionRight = collisions.right && !collisions.left;
  var directionUp = collisions.bottom && !collisions.top;
  return {
    directionRight: directionRight,
    directionUp: directionUp
  };
}

var Popover = forwardRef(function Popover(_ref, forwardedRef) {
  var targetRef = _ref.targetRef,
    _ref$position = _ref.position,
    position = _ref$position === void 0 ? positionDefault : _ref$position,
    style = _ref.style,
    rest = _objectWithoutPropertiesLoose(_ref, [
      "targetRef",
      "position",
      "style"
    ]);

  var popoverRef = useRef();
  var popoverRect = useRect(popoverRef);
  var targetRect = useRect(targetRef);
  return React.createElement(
    "div",
    _extends(
      {
        "data-reach-popover": "",
        ref: function ref(node) {
          assignRef(popoverRef, node);
          assignRef(forwardedRef, node);
        },
        style: _extends(
          {},
          style,
          {
            position: "absolute"
          },
          getStyles(position, targetRect, popoverRect)
        )
      },
      rest
    )
  );
});
export default Popover;

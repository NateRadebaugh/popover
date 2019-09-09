"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rect = require("@reach/rect");

var _utils = require("@reach/utils");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  if (obj != null) {
    var hasPropertyDescriptor =
      Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor
          ? Object.getOwnPropertyDescriptor(obj, key)
          : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  }
  newObj["default"] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

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

var Popover = (0, _react.forwardRef)(function Popover(_ref, forwardedRef) {
  var targetRef = _ref.targetRef,
    _ref$position = _ref.position,
    position = _ref$position === void 0 ? positionDefault : _ref$position,
    style = _ref.style,
    rest = _objectWithoutPropertiesLoose(_ref, [
      "targetRef",
      "position",
      "style"
    ]);

  var popoverRef = (0, _react.useRef)();
  var popoverRect = (0, _rect.useRect)(popoverRef);
  var targetRect = (0, _rect.useRect)(targetRef);
  return _react["default"].createElement(
    "div",
    _extends(
      {
        "data-reach-popover": "",
        ref: function ref(node) {
          (0, _utils.assignRef)(popoverRef, node);
          (0, _utils.assignRef)(forwardedRef, node);
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
var _default = Popover;
exports["default"] = _default;

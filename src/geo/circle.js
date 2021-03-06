var D3 = require("../core/core"),
    D3GeoCartesian = require("./cartesian"),
    d3_radians = D3._radians,
    d3_degrees = D3._degrees,
    _u03c0 = D3._u03c0,
    d3_geo_spherical = require("./spherical")._spherical,
    d3_geo_cartesian = D3GeoCartesian._cartesian,
    d3_geo_cartesianNormalize = D3GeoCartesian._cartesianNormalize,
    _u03b5 = D3._u03b5;

var D3GeoCircle = function() {
  var origin = [0, 0],
      angle,
      precision = 6,
      interpolate;

  function circle() {
    var center = typeof origin === "function" ? origin.apply(this, arguments) : origin,
        rotate = require("./rotation")._rotation(-center[0] * d3_radians, -center[1] * d3_radians, 0).invert,
        ring = [];

    interpolate(null, null, 1, {
      point: function(x, y) {
        ring.push(x = rotate(x, y));
        x[0] *= d3_degrees, x[1] *= d3_degrees;
      }
    });

    return {type: "Polygon", coordinates: [ring]};
  }

  circle.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    return circle;
  };

  circle.angle = function(x) {
    if (!arguments.length) return angle;
    interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians);
    return circle;
  };

  circle.precision = function(_) {
    if (!arguments.length) return precision;
    interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians);
    return circle;
  };

  return circle.angle(90);
};

// Interpolates along a circle centered at [0°, 0°], with a given radius and
// precision.
function d3_geo_circleInterpolate(radians, precision) {
  var cr = Math.cos(radians),
      sr = Math.sin(radians);
  return function(from, to, direction, listener) {
    if (from != null) {
      from = d3_geo_circleAngle(cr, from);
      to = d3_geo_circleAngle(cr, to);
      if (direction > 0 ? from < to: from > to) from += direction * 2 * _u03c0;
    } else {
      from = radians + direction * 2 * _u03c0;
      to = radians;
    }
    var point;
    for (var step = direction * precision, t = from; direction > 0 ? t > to : t < to; t -= step) {
      listener.point((point = d3_geo_spherical([
        cr,
        -sr * Math.cos(t),
        -sr * Math.sin(t)
      ]))[0], point[1]);
    }
  };
}

// Signed angle of a cartesian point relative to [cr, 0, 0].
function d3_geo_circleAngle(cr, point) {
  var a = d3_geo_cartesian(point);
  a[0] -= cr;
  d3_geo_cartesianNormalize(a);
  var angle = Math.acos(Math.max(-1, Math.min(1, -a[1])));
  return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - _u03b5) % (2 * Math.PI);
}

D3GeoCircle._circleInterpolate = d3_geo_circleInterpolate;

module.exports = D3GeoCircle;

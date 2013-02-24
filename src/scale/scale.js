var D3Scale = {};

function d3_scaleExtent(domain) {
  var start = domain[0], stop = domain[domain.length - 1];
  return start < stop ? [start, stop] : [stop, start];
}

function d3_scaleRange(scale) {
  return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
}

D3Scale._scaleExtent = d3_scaleExtent;
D3Scale._scaleRange = d3_scaleRange;

module.exports = D3Scale;

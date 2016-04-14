var cycleThrough = function(o, currentPos, delta) {
  var oLength = 0;
  if (o.length != undefined) {
    oLength = o.length;
  } else {
    return false;
  }
  if ((currentPos + delta) >= oLength) ( delta -= oLength );
  if ((currentPos + delta) < 0) ( delta += oLength );
  return currentPos + delta;
}

module.exports = cycleThrough;

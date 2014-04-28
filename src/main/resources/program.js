
function doHellix() {
   var loc = location;
   var a=8;
   var b=1;
   var startX=loc.blockX;
   var startY = loc.blockY;
   var startZ = loc.blockZ;

   for (var i=0; i<200; i++) {
      var t = i/a;
      var x = a*Math.cos(t);
      var z = a*Math.sin(t);
      var y = b*t;
      loc.setX(startX + x);
      loc.setY(startY + y);
      loc.setZ(startZ + z);
      world.getBlockAt(loc).type = DIRT;
   }
}


function doToro() {
   var loc = location;
   var R=20;
   var r=4;
   var startX=loc.blockX;
   var startY = loc.blockY;
   var startZ = loc.blockZ;

   for (var i=0; i<200; i++) {
    for (var j=0; j<200; j++) {
      var t = i/R;
      var u = j/r;
      var x = Math.cos(t)*(R + r*Math.cos(u));
      var z = Math.sin(t)*(R + r*Math.cos(u));
      var y = r*Math.sin(u);
      loc.setX(startX + x);
      loc.setY(startY + y);
      loc.setZ(startZ + z);
      world.getBlockAt(loc).type = DIRT;
    }
   }
}


function doSphere() {

   var loc = location;
   var r=4;
   var startX=loc.blockX;
   var startY = loc.blockY;
   var startZ = loc.blockZ;

   for (var i=0; i<200; i++) {
    for (var j=0; j<200; j++) {
      var t = i/r;
      var u = j/r;
      var x = Math.cos(t)*r*Math.sin(u);
      var z = Math.cos(t)*r*Math.cos(u);
      var y = r*Math.sin(t);
      loc.setX(startX + x);
      loc.setY(startY + y);
      loc.setZ(startZ + z);
      world.getBlockAt(loc).type = DIRT;
    }
   }
}

doSphere();


"Script complete!";
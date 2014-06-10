var draw = {};

draw["helix"] = function() {
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
      world.getBlockAt(loc).type = Material.DIRT;
   }
}


draw["toro"] = function() {
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
      world.getBlockAt(loc).type = Material.RED_ROSE;
    }
   }
}

draw["torelix"] = function() {
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
      var y = r*Math.sin(u) + i/2;
      loc.setX(startX + x);
      loc.setY(startY + y);
      loc.setZ(startZ + z);
      world.getBlockAt(loc).type = y > i/2 ? Material.AIR : Material.SAND;
    }
   }
}


draw["cube"] = function(mat) {
   var loc = location;
   var r=4;
   var startX=loc.blockX;
   var startY = loc.blockY;
   var startZ = loc.blockZ;

   loc.setX(startX + 2);
   world.getBlockAt(loc).type = Material[mat];
}

draw["sphere"] = function() {

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
      world.getBlockAt(loc).type = loc.blockY > startY ? Material.GLASS : Material.STONE;
    }
   }
}

draw["lake"] = function() {
   var loc = location;
   var startX=loc.blockX;
   var startZ = loc.blockZ;
   var maxSize = 30;

   for (var i = 0; i < maxSize; i+=2) {
      var x = startX - maxSize/2 + i;
      for (var j = 0; j < maxSize; j+=2){
         var z = startZ - maxSize/2 + j;
         if (surrounded(x, z, maxSize)) {
            loc.setX(x);
            loc.setZ(z);
            world.getBlockAt(loc).type = Material.DIRT;
         }
      }
   }

   function surrounded(x, z, max){
       var loc = location;
       loc.setX(x); loc.setZ(z);
       var edges=0;
       for(var i=0; i<max/2; i++){
          loc.setX(x+i);
          if(world.getBlockAt(loc).type != Material.AIR){
             edges++;
             break;
          }
       }
       for(var i=0; i<max/2; i--){
          loc.setX(x+i);
          if(world.getBlockAt(loc).type != Material.AIR){
             edges++;
             break;
          }
       }
       loc.setX(x);
       for(var i=0; i<max/2; i++){
          loc.setZ(z+i);
          if(world.getBlockAt(loc).type != Material.AIR){
             edges++;
             break;
          }
       }
       for(var i=0; i<max/2; i--){
          loc.setZ(z+i);
          if(world.getBlockAt(loc).type != Material.AIR){
             edges++;
             break;
          }
       }
       return edges==4;
   }
}

if(draw[args[0]]) {
   draw[args[0]](args[1]);
} else {
   player.sendMessage("No such figure: " + args[0]);
}

"Script complete!";
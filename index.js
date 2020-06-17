const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input2.gcode'),
    output: false,//process.stdout,
    console: false
});

let prevcoords = [];
let prevtheta = 0;

readInterface.on('line', function(line) {
    if (line.trim().startsWith("G")){
        const tokens = line.split(/\s+/);
     
        const x = Number(tokens[1].replace("X",""));
        const y = Number(tokens[2].replace("Y",""));
        const coords = [x,y];
        let angle = 0;

        if (prevcoords.length > 0){
            angle = calculateTheta(prevcoords, coords);
        }else{
            prevcoords = coords;
        }
        if (Math.abs(angle) > 5){
            console.log(`M3 S0`);
            console.log(`G0 Z:${Math.round(angle)}`);
            console.log(`M3 S1000`);
        }else if (Math.abs(angle) >= 0){
            console.log(`${line} Z:${Math.round(angle)}`);
        }else{
            console.log(line);
        }
        
    }else{
        console.log(line);
    }
});

const calculateTheta = (previous, current)=>{
    
    const _quad = quadrant(previous, current);
    let theta = 0;

    const dx = Math.abs(current[0]-previous[0]);
    const dy = Math.abs(current[1]-previous[1]);
    
    //NEED TO DISTINGUISH BETWEEN CURRENT ANGLE FROM 0 AND DELTA FROM LAST ANGLE, AS THEY ARE TWO DIFFERENT THINGS!

    switch (_quad){
        case -1:
            //TODO: check this!!
            theta = prevtheta;
            prevcoords = current; 
            return 0;

        case 0:
            
            theta = Math.atan(dx/dy)
            console.log("quad 0" , deg(theta));
            break;

        case 1:
            //console.log("1--> dx:", dx , "dy", dy);
            theta = Math.PI/2 + Math.atan(dy/dx);
            console.log("quad 1" , deg(theta));
            break;

        case 2:
            
            theta = Math.PI + Math.atan(dx/dy);
            console.log("quad 2" , deg(theta));
            break;

        default:
            //console.log("3--->dx:", dx , "dy", dy);
            theta  = ((3*Math.PI) / 2) + Math.atan(dy/dx);
            console.log("quad 3" , deg(theta));
    }

    const dir = prevtheta < theta ? 1 : -1;
    const tomove =  deg(Math.abs(theta-prevtheta));
    const currentangle = deg(theta);

    console.log("current angle is now", currentangle);
    console.log("previous angle was", deg(prevtheta));
    console.log("so to move is ", tomove);

    prevtheta = theta;

    prevcoords = current;   
    return dir * tomove;
    
    
    
    
}

const deg = (rads)=>{
    return (180/Math.PI) * rads;
}

const quadrant = (previous, current)=>{
    const dx = current[0] - previous[0];
    const dy = current[1] - previous[1];
  
    //if (dx == 0 && dy==0){
     //   return -1;
   // }
   //TODO - fix whern dx =0 or dy==0
    console.log("current", current, "previous", previous, "dx,dy", dx,dy);
   
    if (dx >= 0 && dy > 0){
        return 0;
    }
    else if (dx > 0 && dy <= 0){
        return 1;
    }
    else  if (dx <= 0 && dy <0){
        return 2;
    }
    else  if (dx<0 && dy >= 0) {
        return 3;
    }
    console.log("returning -1!!!!!");
    return -1;
}
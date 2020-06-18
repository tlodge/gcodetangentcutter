const fs = require('fs');
const readline = require('readline');
const FIDELITY = 0.5;

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.gcode'),
    output: false,//process.stdout,
    console: false
});

let prevcoords = [];
let prevtheta = 0;
let linebuffer = [];

readInterface.on('line', function(line) {
    if (line.trim().startsWith("G")){
        const tokens = line.split(/\s+/);
     
        const x = Number(tokens[1].replace("X",""));
        const y = Number(tokens[2].replace("Y",""));
        const coords = [x,y];
        let angle = 0;

        if (prevcoords.length > 0){
            
            if (Math.abs(coords[0] - prevcoords[0]) >= FIDELITY ||  Math.abs(coords[1] - prevcoords[1]) >= FIDELITY){
                angle = calculateTheta(prevcoords, coords);
                prevcoords = coords;
                console.log(`${line} Z:${Math.round(angle)}`);
                //for (const line of linebuffer){
                //    console.log(line);
                //}
                linebuffer = [];
            }else{
                //
                linebuffer.push(line)
            }
            
        }else{
            prevcoords = coords;
            console.log(line);
        }
    }else{
        //for (const line of linebuffer){
        //    console.log(line);
        //}
        console.log(line);
    }
    //for (const line of linebuffer){
    //    console.log(line);
    //}
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
            //theta = prevtheta;
            prevcoords = current; 
            return 0;

        case 0:
            
            theta = Math.atan(dx/dy)
            //console.log("quad 0" , deg(theta));
            break;

        case 1:
        //current [ 223.59, 115.37 ] previous [ 223.57, 115.37 ] dx,dy 0.020000000000010232 0
        //quad 1 90
            
        //console.log("1--> dx:", dx , "dy", dy);
            theta = Math.PI/2 + Math.atan(dy/dx);
            //console.log("quad 1" , deg(theta));
            break;

        case 2:
            
            theta = Math.PI + Math.atan(dx/dy);
            //console.log("quad 2" , deg(theta));
            break;

        default:
            //console.log("3--->dx:", dx , "dy", dy);
            theta  = ((3*Math.PI) / 2) + Math.atan(dy/dx);
            //console.log("quad 3" , deg(theta));
    }

    const dir = prevtheta < theta ? 1 : -1;
    const tomove =  deg(Math.abs(theta-prevtheta));
    const currentangle = deg(theta);

    //console.log("current angle is now", currentangle);
    //console.log("previous angle was", deg(prevtheta));
    //console.log("so to move is ", tomove);

    prevtheta = theta;

    prevcoords = current;   
    return dir * tomove;
    
    
    
    
}

const deg = (rads)=>{
    return (180/Math.PI) * rads;
}

//need to only operate on shifts in steps where dx or dy > 1, else no point in turning blade.  So look ahead until eithe dx of dy reaches 1, then set the 
//rotation angle to the resulting trajectory.  Otherwise with very tiny deltas, blade will oscillate back and forth.

const quadrant = (previous, current)=>{
    const dx = current[0] - previous[0];
    const dy = current[1] - previous[1];
  
    //if (dx == 0 && dy==0){
     //   return -1;
   // }
   //TODO - fix whern dx =0 or dy==0
    //console.log("current", current, "previous", previous, "dx,dy", dx,dy);
   
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
    
    return -1;
}
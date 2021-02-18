//global variables
let ctx;
let fps=7;
let button = document.getElementById('clapbtn');
const CANVAS_WIDTH=800;
const CANVAS_HEIGHT=550;
let dogclap=false;
// const dog_w;
// const dog_h;



//start function
function startAll(){
    gamearea.start();
    dog = new SPRITEIMAGE(0,0,10212,1565,5,100,320,210,150,'./img/walksprite.png')
    dogClapping = new SPRITEIMAGE(0,0,2000,1500,2,100,100,110,150,'./img/clapping.png')
    background = new imageBuilder(0,0,CANVAS_WIDTH,CANVAS_HEIGHT,'img/bg2.jpg')

    button.addEventListener('click',()=>{
        dogclap=true;
        setTimeout(()=>{
            dogclap=false;
        },4000)
    })
}



//gamearea object
var gamearea = {
    canvas:document.getElementById('gameCanvas'),
   
    start:function(){
        this.ctx=this.canvas.getContext('2d'),
        this.canvas.style.border='2px solid';
       
        this.interval=setInterval(()=>{
            drawSprite()
        },1000/fps)
    },
    clear:function(){
        ctx=this.ctx;
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    },
    stop:function(){
        clearInterval(this.interval)
    }

}





//drawSprite

function drawSprite(){//draw function draws everything on the canvas
    gamearea.clear()
    background.draw()
    if(!dogclap){
        dog.draw()
    }else{
        dogClapping.x=dog.x+dog.width/2;
        dogClapping.y=dog.y;
        dogClapping.draw()
    }

    if(!dogclap){
        dog.Move()
       }
    
}


//constructor functions

class SPRITEIMAGE{//constructor function for the dog spritesheet
    constructor(srcX,srcY,spritewidth,spriteheight,col,x,y,width,height,src){
        this.srcX=srcX;
        this.srcY=srcY;
        this.swidth=spritewidth/col;
        this.sheight = spriteheight;
        this.x=x;
        this.y=y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = src;
        this.moveleft=false;
        
        this.curFrame = 0;
        this.frameCount = col;
      
    }
    draw(){
     this.updateFrame()

       ctx.drawImage(this.image,this.srcX,this.srcY,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
      
        }
        
    updateFrame(){
        if(this.curFrame>=this.frameCount){
            this.curFrame=0;     
        }
        this.srcX = this.curFrame*this.swidth;
        this.curFrame++;
    }
  
    Move(){///to move the dog left and right!
        
         if(this.moveleft){
            this.x-=12;
            this.image.src='./img/walksprite2.png'
         }else{
             this.x+=12;
             this.image.src='./img/walksprite.png'
         } 
         if(this.x<=0){
            this.moveleft=false;
        }    
        if(this.x+this.width>=CANVAS_WIDTH){
            this.moveleft=true;
        }  
               
            
    }

}


class imageBuilder{//......................ECMA6 clss/object constructor...........
    constructor(x,y,width,height,src){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.image = new Image();
        this.image.src = src;  
    }
    draw(){
         ctx.drawImage(this.image,this.x, this.y, this.width, this.height);
    }

}
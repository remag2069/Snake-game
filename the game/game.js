
let size=25;
let width=1500-25;
let height=700-25;
let speed=25
let SRT=200
let c=document.getElementById("c");
let ctx=c.getContext('2d');
let ax=25+25*Math.floor(Math.random() * 59);
let ay=25+25*Math.floor(Math.random() * 27);
let score=0
let l=document.getElementById('l')

function copy(x,y) 
{
    for (i=0;i<x.length;i++)
    {
        x[i]=y[i]
    }
    
}

class body
{
    constructor(body)
    {
        this.prev=body
        if(body==null)
        {    
            this.x=(width+25)/2-size
            this.y=(height+25)/2-size
            this.vx=speed
            this.vy=0
        }
        else
        {
            if (this.prev.vx>0)
            {
                this.x=body.x-size
                this.y=body.y
                this.head=false
            }
            else if (this.prev.vx<0)
            {
                this.x=body.x+size
                this.y=body.y
                this.head=false
            }
            else if (this.prev.vy>0)
            {
                this.x=body.x
                this.y=body.y-size
                this.head=false
            }
            else if (this.prev.vy<0)
            {
                this.x=body.x
                this.y=body.y+size
                this.head=false
            }
            
        }
    }
    move()
    {
        this.px=this.x
        this.py=this.y
        if(this.prev==null)
        {    
            this.x=this.x+this.vx
            this.y=this.y+this.vy            
            ctx.fillStyle='yellow'
            ctx.fillRect(this.x,this.y,size,size)

        }
        else
        {
            this.x=this.prev.px
            this.y=this.prev.py
            ctx.fillStyle='green'
            ctx.fillRect(this.x,this.y,size-1,size-1)
        }   
        
    
    }

}
snake=[]
first=new body()
snake.push(first)

function eaten()
{
    t= new body(snake[snake.length-1])
    snake.push(t)
    ax=25+25*Math.floor(Math.random() * 59);
    ay=25+25*Math.floor(Math.random() * 27);
}

function background()
{
    ctx.fillStyle='blue'
    ctx.fillRect(0,0,width+300,height+400)
    ctx.fillStyle='black'
    ctx.fillRect(25,25,width,height)
}

function is_alive() 
{
    for (i=1;i<snake.length;i++)
    {
        if (snake[0].x==snake[i].x && snake[0].y==snake[i].y)
        {
            console.log('dead')
            return false
        }
    }
    if(snake[0].x>width || snake[0].x<=0 || snake[0].y<=0 || snake[0].y> height)
    {
        console.log('dead')
        return false
    }
    else
    {
        return true
    }
    
}

function has_eaten()
{
    // console.log('eating')
    if (snake[0].x==ax && snake[0].y==ay)
    {
        console.log('eaten')
        eaten()
        score++
    }
    // l.innerText=score
}

let k =true;
function draw()
{
    
    if (k)
    {
        background()
        for (i=0;i<snake.length;i++)
        {
            snake[i].move()
        }
        k=is_alive()
        ctx.fillStyle='red'
        ctx.fillRect(ax,ay,25,25)
        has_eaten()
    }
    else
    {
        console.log('score: '+String(score));
    }
    
}

window.setInterval(draw,SRT)

function dir(event)
{
    // console.log(event.keyCode)
    switch (event.keyCode) {
        case 37:
            snake[0].pvx=snake[0].vx
            snake[0].pvy=snake[0].vy
            snake[0].vx-=speed
            snake[0].vy=0
            break;
        case 38:
            snake[0].pvx=snake[0].vx
            snake[0].pvy=snake[0].vy
            snake[0].vy-=speed
            snake[0].vx=0
            break;
        case 40:
            snake[0].pvx=snake[0].vx
            snake[0].pvy=snake[0].vy
            snake[0].vy+=speed
            snake[0].vx=0
            break;
        case 39:
            snake[0].pvx=snake[0].vx
            snake[0].pvy=snake[0].vy
            snake[0].vx+=speed
            snake[0].vy=0
            break;
        case 32:
            for(i=0;i<2;i++)
            {
                eaten()
                // console.log(Math.random())
            }
        default:
            break;
    }

}

window.addEventListener('keydown',dir)
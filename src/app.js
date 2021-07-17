document.addEventListener('DOMContentLoaded',()=>{
    const scoreDisplay=document.getElementById("score")
    const width=28;
    let score=0;
    const grid=document.querySelector('.grid')
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
      ]
     const squares=[];
      // 0 - pac-dots
      // 1 - wall
      // 2 - ghost-lair
      // 3 - power-pellet
      // 4 - empty

    function createBoard()
    {
        for(let i=0;i<layout.length;i++)
        {
            const square=document.createElement('div');
            grid.appendChild(square);
            squares.push(square);

            if(layout[i]===0)
                squares[i].classList.add("pac-dot");
            else if(layout[i]===1)
                squares[i].classList.add('wall');
            else if(layout[i]===2)
                squares[i].classList.add('ghost-lair');
            else if(layout[i]===3)
                squares[i].classList.add('power-pellet');
        }
    }

    createBoard();

    let pacmanposi=490;
    squares[pacmanposi].classList.add('pac-man')
    function checkMove(i)
    {
        if(squares[i].classList.contains('wall') || 
        squares[i].classList.contains('ghost-lair'))
            return false;
        else 
            return true;
    }
    function movePacman(e)
    {
        squares[pacmanposi].classList.remove('pac-man');
        switch(e.keyCode){
            case 37:
                if(checkMove(pacmanposi-1)&& pacmanposi%width!==0)pacmanposi-=1;
                else if((pacmanposi-1)===363)
                    pacmanposi=391;
                break
            case 38:
                if(checkMove(pacmanposi-width)&& pacmanposi-width>=0)pacmanposi-=width;
                break
            case 39:
                if(checkMove(pacmanposi+1)&& pacmanposi%width<width-1)pacmanposi+=1;
                else if((pacmanposi+1)===392)
                    pacmanposi=364;
                break
            case 40:
                if(checkMove(pacmanposi+width)&& pacmanposi+width<width*width)pacmanposi+=width;
                break
        }
        squares[pacmanposi].classList.add('pac-man');
        pacDotEaten();
        pacPowerUp();
        checkWin();
    
    }
    
    document.addEventListener('keydown',movePacman);
    function pacDotEaten()
    {
        if(squares[pacmanposi].classList.contains('pac-dot'))
        {
            score++;
            scoreDisplay.innerHTML=score;
            squares[pacmanposi].classList.remove('pac-dot');
        }
    }
    function pacPowerUp(){
        if(squares[pacmanposi].classList.contains('power-pellet'))
        {
            score+=10
            ghosts.forEach(ghost=>ghost.isScared=true)
            setTimeout(unScareGhosts,10000)
            squares[pacmanposi].classList.remove('power-pellet');
        }
    }
    function unScareGhosts()
    {
        ghosts.forEach(ghost=>ghost.isScared=false)
    }
    class Ghost{
        constructor(name,startIndex,speed){
            this.name=name;
            this.startIndex=startIndex;
            this.speed=speed;
            this.currentIndex=startIndex;
            this.timerId=NaN;
            this.isScared=false;
        }
    }

    ghosts=[
            new Ghost('blinky',348,200),
            new Ghost('pinky',376,250),
            new Ghost('inky',351,230),
            new Ghost('clyde',379,300)
        ]
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.name);
        squares[ghost.currentIndex].classList.add('ghost');
    });
    ghosts.forEach(ghost=>{
        const directions=[-1,+1,-width,+width];
        let direction=directions[Math.floor(Math.random()*directions.length)];
        
        ghost.timerId=setInterval(function()
        {
            if(ghost.isScared && (squares[ghost.currentIndex].classList.contains('pac-man')||squares[pacmanposi].classList.contains('scared-ghost')))
            {
                squares[ghost.currentIndex].classList.remove(ghost.name,'ghost','scared-ghost')
                ghost.currentIndex=ghost.startIndex;
                squares[ghost.currentIndex].classList.add(ghost.name,'ghost')
            }
            
            if(!squares[ghost.currentIndex+direction].classList.contains('wall') && !squares[ghost.currentIndex+direction].classList.contains('ghost'))
            {
                squares[ghost.currentIndex].classList.remove('ghost',ghost.name,'scared-ghost');
                ghost.currentIndex+=direction;
                squares[ghost.currentIndex].classList.add('ghost',ghost.name);
            }
            else{
                direction=directions[Math.floor(Math.random()*directions.length)];
            }
            if(ghost.isScared)
            {
                squares[ghost.currentIndex].classList.add('scared-ghost');
            }
            checkGameOver();
        },ghost.speed)
    })
    function checkGameOver()
    {
        if(squares[pacmanposi].classList.contains('ghost') && !squares[pacmanposi].classList.contains('scared-ghost'))
        {
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keydown',movePacman)
            squares[pacmanposi].classList.remove('pac-man');
            setTimeout(function(){
                alert('GameOver');
            },500)
        }
    }
    function checkWin(){
        if(score===274)
        {
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keydown',movePacman)
            setTimeout(function(){
                alert('You Won');
            },500)   
        }
    }
})
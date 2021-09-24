document.addEventListener('DOMContentLoaded', () => {
  const scoreDisplay=document.getElementById("score")
  const startButton=document.getElementById("start-button")
  const width = 28
  let score=0;
  let checkdead;
  const timercm=14000;
  let modef;
  const grid = document.querySelector('.grid')
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
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  const squares = []
  let mode='scatter'
  const scatter=[26,729,755,1];
  const chase=[0,2,+width,-width];

  //create your board
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement('div')
      grid.appendChild(square)
      squares.push(square)

      //add layout to the board
      if(layout[i]===0){
        squares[i].classList.add("pac-dot");
        squares[i].innerHTML='.';
      }
      else if(layout[i] === 1) {
        squares[i].classList.add('wall')
      }
      else if(layout[i]===2)
      {
        squares[i].classList.add('ghost-lair')
      }
      else if(layout[i]===3)
        squares[i].classList.add('power-pellet');
    }
  }
  //draw pacman onto the board
  createBoard()
  let pacmanposi=490;
  squares[pacmanposi].classList.add('pac-man')
  squares[pacmanposi].classList.add('pac-man-right')
  
  function startGame()
  {
    document.addEventListener('keydown',movePacman);
    ghosts.forEach(ghost =>moveGhosts(ghost));
    //switch between 'scatter mode' and 'chase mode' every 30 seconds
    modef=setInterval(changeMode,timercm)

  }
  startButton.addEventListener('click',startGame);
  function checkMove(i)
  {
      if(squares[i].classList.contains('wall') || 
      squares[i].classList.contains('ghost-lair'))
          return false;
      else 
          return true;
  }
  function removePacman()
  {
    squares[pacmanposi].classList.remove('pac-man')
    squares[pacmanposi].classList.remove('pac-man-right')
    squares[pacmanposi].classList.remove('pac-man-left')
    squares[pacmanposi].classList.remove('pac-man-up')
    squares[pacmanposi].classList.remove('pac-man-down')
  }
  function movePacman(e)
  {
    removePacman()
    switch(e.keyCode)
    {
      case 37://leftkey
          if(checkMove(pacmanposi-1)&& pacmanposi%width!==0)
          {
            pacmanposi-=1;
            squares[pacmanposi].classList.add('pac-man-left');
          }
          else if((pacmanposi-1)===363)
          {
            pacmanposi=391;
            squares[pacmanposi].classList.add('pac-man-right');
          }
          else squares[pacmanposi].classList.add('pac-man-left');
          break
      case 38://up
          if(checkMove(pacmanposi-width)&& pacmanposi-width>=0)
          {
            pacmanposi-=width;
          }
          squares[pacmanposi].classList.add('pac-man-up');
          break
      case 39://right
          if(checkMove(pacmanposi+1)&& pacmanposi%width<width-1){
            pacmanposi+=1;
            squares[pacmanposi].classList.add('pac-man-right');
          }
          else if((pacmanposi+1)===392)
          {
            pacmanposi=364;
            squares[pacmanposi].classList.add('pac-man-left');
          }
          else squares[pacmanposi].classList.add('pac-man-right');
          break
      case 40://down
          if(checkMove(pacmanposi+width)&& pacmanposi+width<width*width)pacmanposi+=width;
          squares[pacmanposi].classList.add('pac-man-down');
          break
    }
      squares[pacmanposi].classList.add('pac-man');
      if(mode==='chase')
      {
        for(let i=0;i<chase.length;i++)
        {
          ghosts[i].target=pacmanposi+chase[i];
        }
      }
      pacPowerUp();
      pacDotEaten();
      checkWin();
  }
  
  
  function pacDotEaten()
  {
    if(squares[pacmanposi].classList.contains('pac-dot'))
    {
        score++;
        scoreDisplay.innerHTML=score;
        squares[pacmanposi].innerHTML='';
        squares[pacmanposi].classList.remove('pac-dot');
    }
  }

  function pacPowerUp()
  {
    if(squares[pacmanposi].classList.contains('power-pellet') && !ghosts[0].isScared)
    {
        score+=10
        scoreDisplay.innerHTML=score;
        ghosts.forEach(ghost=>ghost.isScared=true)
        checkdead=setInterval(function(){
          ghosts.forEach(ghost => {
            if(squares[ghost.currentIndex].classList.contains('pac-man')|| squares[pacmanposi].classList.contains['ghost'])
            {
              squares[ghost.currentIndex].classList.remove(ghost.name,'ghost','scared-ghost')
              ghost.currentIndex=ghost.startIndex;
              squares[ghost.currentIndex].classList.add(ghost.name,'ghost','scared-ghost')
            }
          });
        },100)
        setTimeout(unScareGhosts,10000)
        squares[pacmanposi].classList.remove('power-pellet');
    }
  }
  function unScareGhosts()
  {
    clearInterval(checkdead);
    ghosts.forEach(ghost=>{
      ghost.isScared=false
      squares[ghost.currentIndex].classList.remove('scared-ghost')
    })
  }

  
  //function to convert index value in coords(X,Y)
  function getCoordinates(index) {
    return [index % width, Math.floor(index / width)]
  }
  //calculate distance between two points
  function getDistance(x1,y1,x2,y2)
  {
    return (x1-x2)*(x1-x2)+(y1-y2)*(y1-y2);
  }

  class Ghost{
    constructor(name,startIndex,speed,target){
      this.name=name;
      this.startIndex=startIndex;
      this.speed=speed;
      this.currentIndex=startIndex;
      this.timerId=NaN;
      this.isScared=false;
      this.target=target;
      this.lastMove=1;
    }
  }
  ghosts=[
    new Ghost('blinky',348,200,26),
    new Ghost('pinky',376,250,729),
    new Ghost('inky',351,230,755),
    new Ghost('clyde',379,300,1)
  ]
  ghosts.forEach(ghost=>{
    squares[ghost.currentIndex].classList.add(ghost.name)
    squares[ghost.currentIndex].classList.add('ghost');
  });

  

  //move ghosts logic
  function moveGhosts(ghost) {
    const directions =  [-width,-1,+width,+1,]
    ghost.timerId = setInterval(function() {
      var low=2000; 
      var ans=-ghost.lastMove;//sets default movement direction to reverse of current direction
      let targX, targY;
      if(squares[ghost.currentIndex].classList.contains('ghost-lair'))//if ghost is in ghost lair sets its target as ghost lair entrance
      {
        targX=13 
        targY =10
      }
      else{
        [targX, targY] = getCoordinates(ghost.target)
      }
      if(ghost.isScared)//if in scared state ghosts starts moving randomly
      {
        squares[ghost.currentIndex].classList.add('scared-ghost');
        direction=directions[Math.floor(Math.random()*directions.length)];
        if(!squares[ghost.currentIndex+direction].classList.contains('wall') && !squares[ghost.currentIndex+direction].classList.contains('ghost'))
        {
          squares[ghost.currentIndex].classList.remove('ghost',ghost.name,'scared-ghost');
          ghost.currentIndex+=direction;
          squares[ghost.currentIndex].classList.add('ghost',ghost.name,'scared-ghost');
        } 
        else
        {
          direction=directions[Math.floor(Math.random()*directions.length)];
        }
      }
      else
      {
        for(var dir of directions)//get direction from which target distance is lowest
        {
          if  ( (!squares[ghost.currentIndex + dir].classList.contains('ghost-lair') || squares[ghost.currentIndex].classList.contains('ghost-lair') ) && !squares[ghost.currentIndex + dir].classList.contains('ghost') && !squares[ghost.currentIndex + dir].classList.contains('wall') && dir!=(-ghost.lastMove) && ghost.currentIndex + dir!=391) 
          {
            
            const [ghostX, ghostY] = getCoordinates(ghost.currentIndex + dir)
            var dist=getDistance(ghostX,ghostY,targX,targY);
            if(dist<low)
            {
              ans=dir;
              low=dist;
            }
          }
        }
        //moves in that direction
        squares[ghost.currentIndex].classList.remove(ghost.name,'ghost','scared-ghost')
        ghost.currentIndex+=ans;
        ghost.lastMove=ans;//record ghost 's move
        squares[ghost.currentIndex].classList.add(ghost.name,'ghost')
      }
      checkGameOver();
    },ghost.speed)
  }

  function changeMode()
  {
    if(mode=='chase')
    {
      for(let i=0;i<scatter.length;i++)
      {
        ghosts[i].target=scatter[i];
      }
      mode='scatter'
    }
    else
    {
      for(let i=0;i<scatter.length;i++)
      {
        ghosts[i].target=pacmanposi+chase[i];
      }
      mode='chase'
    }
  }
  
  function checkGameOver()
  {
    if(squares[pacmanposi].classList.contains('ghost') && !squares[pacmanposi].classList.contains('scared-ghost'))
    {
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        clearInterval(modef)
        document.removeEventListener('keydown',movePacman)
        removePacman();
        setTimeout(function(){
            alert('GameOver');
        },500)
    }
  }
  function checkWin(){
    if(score===274)
    {
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        clearInterval(modef)
        document.removeEventListener('keydown',movePacman)
        setTimeout(function(){
            alert('You Won');
        },500)   
    }
  }
})

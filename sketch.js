function setup()
{
    //creating striker,playermallet and compmallet
    striker = createSprite(200, 200, 10, 10);
    playerMallet = createSprite(200, 50, 50, 10);
    compMallet = createSprite(200, 350, 50, 10);
    //giving colour
    striker.shapeColor = "white";
    playerMallet.shapeColor = "red";
    compMallet.shapeColor = "blue";
    //creating goal sprites
    goal1 = createSprite(200, 28, 100, 20);
    goal2 = createSprite(200, 372, 100, 20);
    goal1.shapeColor = "yellow";
    goal2.shapeColor = "yellow";
    //variables of different states
    gameState="serve";
    playerScore=0;
    compScore=0;

    edges=createEdgeSprites();
}
function draw() {
    background("green");

    //score
    fill("black");
    text(playerScore,30,190);
    text(compScore,30,220);
    //creating boundries
    stroke("white");
    strokeWeight(5);
    line(397, 0, 397, 400);
    line(2, 0, 2, 400);
    line(0, 2, 400, 2);
    line(0, 397, 400, 397);
    line(385, 0, 385, 400);
    line(15,0,15, 400); 
    line(0, 15, 400, 15);
    line(0, 385, 400, 385);
    //bounce off
    striker.bounceOff(playerMallet);
    striker.bounceOff(edges);
    striker.bounceOff(compMallet);
    playerMallet.bounceOff(edges);

    //movement controls for payerMallet
    //draw net
    drawNet();
    if (gameState==="serve") 
    {
        fill("black");
        textSize(24);
        text("Press SPACE To Strike", 70, 190);
    }
    if (keyDown("space")&&gameState==="serve") 
    {
        serve();
        gameState="play";
    }
    if (keyDown("right")) 
    {
        playerMallet.x=playerMallet.x+10;
    }
    if (keyDown("left")) 
    {
        playerMallet.x=playerMallet.x-10;
    }
    if (keyDown("up")) 
    {
        if (playerMallet.y>25) 
        {
            playerMallet.y = playerMallet.y-10;
        }
    }
    if (keyDown("down")) {
        if (playerMallet.y<120) 
        {
            playerMallet.y = playerMallet.y+10;
        }
    }
    //compMallet
    compMallet.x=striker.x;
    if (striker.isTouching(goal1) || striker.isTouching(goal2)) {
        if (striker.isTouching(goal1)) 
        {
            compScore=compScore+1;
        }
        if (striker.isTouching(goal2)) 
        {
            playerScore=playerScore+1;
        }
        reset();
        gameState="serve";
    }
    if ((compScore===5) ||(playerScore===5)) {
        //push();
        stroke("black")
        fill("yellow")
        textSize(20)
        text("Game Over",150,160);
        text("Press R to Restart",120,190);
        //pop();
        gameState="over";
    }
    if (keyDown("r") && gameState==="over") {
        playerScore=0;
        compScore=0;
        gameState="serve";
    }
    drawSprites();
}

function drawNet() {
    for (var i = 0; i < 400; i=i+20) 
    {
        //push();
        stroke("black");
        strokeWeight(2); 
        line(i, 200,i+10, 200);
        //pop();
    }
}
function serve() {
    striker.velocityX=3;
    striker.velocityY =4;
}
function reset() {
    striker.x = 200;
    striker.y = 200;
    striker.velocityX = 0;
    striker.velocityY = 0;
}


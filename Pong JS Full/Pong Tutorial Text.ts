

/*
Directions: Complete the following project by entering in the code within the guide.
Remeber to fill the blanks in the comments to earn full credit.
*/

// Establishing a variable for players_connected allows us to manipulate the game between _____-_____ and mutliplayer. 
let players_connected = 1;

//Creating a background image as the court allows the player to see the visual split in the screen.
/*
Using scene.___________ and scene.__________ as the _________ of the image.create function means the coder does not need to refer to the specific size of 
the screen in order to create an image that covers the screen.
*/
let Background = image.create(scene.screenWidth(), scene.screenHeight());

//This for loop is used to set specific pixals within the a different color within the background image. 
for (let index = 0; index <= scene.screenHeight(); index++) {
    if (index % 6 < 4) {
        Background.setPixel(scene.screenWidth() / 2, index, 1);
    };
};
//If this is written correctly is the net is a (solid/dotted) line.
//This code sets the created image as our background. 
scene.setBackgroundImage(Background);

//Creating the player sprite using the assets preloaded into this project
let Player1 = sprites.create(assets.image`Player 1`, SpriteKind.Player);

//Setting the Player 1 position to the (left/right) side of the screen. 
Player1.setPosition(8, 60);

//Assigning Player 1 controller set to the Player 1
//Which movement value is the set value for the Player 1 Sprite
controller.moveSprite(Player1, 0, 100);

//Locking the Sprite on the screen.
Player1.setStayInScreen(true);

//Establishing the Player 2 Sprite and assigning it to the preloaded asset. 
let Player2 = sprites.create(assets.image`Player 2`, SpriteKind.Player);
//Setting Player 2 Sprite Position
Player2.setPosition(152, 60);
//Locking Player 2 Sprite on screen
Player2.setStayInScreen(true);


//Creating Ball as projectile Spritekind and assigning it gated random values for the vx and vy properties. 
let ball = sprites.createProjectileFromSprite(assets.image`Ball`, Player1, randint(50, 75), randint(25, 50));

//Move ball in front of Player upon starting
ball.x += 3;
//Locking ball on screen and adding in bounce effect
ball.setBounceOnWall(true);

/*This code displays the movement of the ball for testing purposes. 
Feel free to set it to true and see how the ball adjusts it's movement as it moves accross the screen. */
ball.setFlag(SpriteFlag.ShowPhysics, false);

//Setting the scores for both Players
info.player1.setScore(0);
info.player2.setScore(0);



//Creating the core mechanic for the player to interact with the ball
//Establishment of Overlap Code using the SpriteKinds of __________ and ___________ 
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    
    //Using a (negative/positive) value to invert the (x/y) axis
    otherSprite.vx = -1.1 * otherSprite.vx;
    //Slight adjustment for the balls vertical movement. 
    otherSprite.vy = 1.1 * otherSprite.vy;
    //Play defined sound effect to add emphisis on interaction
    music.playTone(494, music.beat(BeatFraction.Half));
});


// CPU Player Algorithm 
//Game.onUpate function used to update the game every frame. 
game.onUpdate(function () {
    //The CPU Player only activates when the ball is on the (left/right) side of the net and the player varible is set to ______
    // == is used to compare exact numbers where = is used to set numbers
    if (ball.x > scene.screenWidth() / 2 && players_connected == 1) {
        //This if statement activates if the ball is (left/right) the player 2 sprite
        if (ball.y > Player2.y) {
            //This moves the CPU controlled sprite (up/down)
            Player2.y += 2;
        } else {
            //This moves the CPU controlled sprite (up/down)
            Player2.y += -2;
        }
    }
});


//Core gameplay code for scoring mechanics. 
game.onUpdate(function () {
    
    // If the ball is ______ of the _______ spirte then 
    if (ball.x > Player2.right) {
        // Change ____________________
        info.player1.changeScoreBy(1)
        // Play ______________
        music.jumpUp.play()
        //Reset ____________ of ball to _____________ sprite
        ball.setPosition(Player1.x + 3, Player1.y)
        //Set _______ and _________ of ball to _________ values between __________ and _________
        ball.setVelocity(randint(50, 75), randint(25, 50))
    }// If the ball is ______ of the _______ spirte then
    else if (ball.x < Player1.left) {
        // Change ___________________
        info.player2.changeScoreBy(1)
        // Play ____________________ 
        music.jumpUp.play()
        //Reset ____________ of ball to _____________ sprite
        ball.setPosition(Player2.x - 3, Player2.y)
        //Set _______ and _________ of ball to _________ values between __________ and _________
        ball.setVelocity(randint(-75, -50), randint(25, 50))
    }
});

//______ and ______ are the only two buttons that are using in this game. 
//With that in mind, we need to establish the ability for another player to join the game if they want to.
//We can establish this ability through creating conditions based on the possible Player 2 inputs.
//MakeCode Arcade has a built-in Player 2 controller set using the keys [I,J,K,L,U,O]

//If the ____ button on the Player 2 controller set is pressed then
controller.player2.onButtonEvent(ControllerButton.down, ControllerButtonEvent.Pressed, function () {
    //Adjust the players_connected variable
    players_connected = 2;
    //Set the player two controller set to the Player2 sprite
    //set the VX value to ___ locking the (horizontal/vertical) movement
    controller.player2.moveSprite(Player2, 0, 100);
});
controller.player2.onButtonEvent(ControllerButton.up, ControllerButtonEvent.Pressed, function () {
    //Adjust the players_connected variable
    players_connected = 2;
    //Set the player two controller set to the Player2 sprite
    controller.player2.moveSprite(Player2, 0, 100)
})






//Setting Tilemap
tiles.setTilemap(tilemap`level1`);

//Turning off walls for all Acid Tiles
for (let value of tiles.getTilesByType(assets.tile`acid`)) {
    tiles.setWallAt(value, false);
};

//Setting Background Image
scene.setBackgroundImage(assets.image`background`);

//Establishing Player Sprite
//Check the assets and pick your truck by replacing # in `truck#`!!!
let truck = sprites.create(assets.image`truck#`, SpriteKind.Player);

//Create Gravity using ay
truck.ay = 500;

//Setting forward movement speed
truck.vx = 100;

//Keep truck in screen
scene.cameraFollowSprite(truck);

//Establishing Animation for Truck
//Check the assets and pick your truck by replacing # in `truck# animation`!!!
animation.runImageAnimation(truck, assets.animation`truck# animated`, 100, true);
    

//Jump Controls on "A" Pressed
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    truck.vy = -200
    //Extra music effect to embelish player action
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
});

//Go Button to Restart Movement if Stopped
controller.right.onEvent(ControllerButtonEvent.Pressed, function (){
    truck.vx = 100;
});

//Win Game Condition of making to the end of the tunnal
scene.onOverlapTile(SpriteKind.Player, assets.tile`empty cave`, function (sprite, location) {
    game.over(true);
});

//Lose Game Condition of hitting spikes
scene.onOverlapTile(SpriteKind.Player, assets.tile`spikes`, function (sprite, location) {
    game.over(false);
});

//Lose Game Condition of hitting acid
scene.onOverlapTile(SpriteKind.Player, assets.tile`acid`, function (sprite, location) {
    game.over(false);
});




//Phase 1: Startup Elements 

//Step 1
scene.setBackgroundColor(9)
//Step 2
tiles.setTilemap(tilemap`level1`)
//Step 3
let bigTurkey = sprites.create(assets.image`bigTurkey`, SpriteKind.Player)
//Step 4
controller.moveSprite(bigTurkey, 100, 0)
//Step 5
bigTurkey.ay = 500
//Step 6
scene.cameraFollowSprite(bigTurkey)
//Step 7
tiles.placeOnRandomTile(bigTurkey, assets.tile`start`)
//Step 8
carnival.startTimer()


//Phase 2: Player Controls
//Step 9
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    //Step 10
    bigTurkey.vy = -300
})
//Remember to close your {} & ()!!

//Phase 3: Extras Elements and Implimentation

//Step 11
let freeTurkeys: Sprite = null

//Step 12
namespace SpriteKind {
    //Step 13
    export const Rescued = SpriteKind.create()
}









//Step 14
scene.onOverlapTile(SpriteKind.Player, assets.tile`cage`, function (sprite, location) {
    //Step 15
    info.changeScoreBy(1)
    //Step 16
    tiles.setTileAt(location, assets.tile`transparency17`)
    //Step 17
    freeTurkeys = sprites.create(assets.image`turkey`, SpriteKind.Rescued)
    //Step 18
    tiles.placeOnTile(freeTurkeys, location)
    //Step 19
    freeTurkeys.follow(sprite)
})
//Remember to close your {} & ()!!

//Phase 4: We are in the Endgame now.
//Step 20
scene.onOverlapTile(SpriteKind.Player, sprites.swamp.swampTile16, function (sprite, location) {
    //Step 21
    carnival.onGameOverExpanded(carnival.WinTypes.Timed)
})








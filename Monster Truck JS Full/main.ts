tiles.setTilemap(tilemap`level1`)
scene.setBackgroundImage(assets.image`background`)
for (let value of tiles.getTilesByType(assets.tile`acid`)) {
    tiles.setWallAt(value, false)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`empty cave`, function (sprite, location) {
    game.over(true)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    truck.vy = -200
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`spikes`, function (sprite, location) {
    game.over(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`spikes-up`, function (sprite, location) {
    game.over(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`acid`, function (sprite, location) {
    game.over(false)
})
let truck: Sprite = null
truck = sprites.create(assets.image`truck1`, SpriteKind.Player)
truck.ay = 500
truck.vx = 100
scene.cameraFollowSprite(truck)
animation.runImageAnimation(
truck,
assets.animation`truck3 animated`,
100,
true
)

namespace SpriteKind {
    export const Collectable = SpriteKind.create()
    export const Squeaker = SpriteKind.create()
    export const StatusBar = SpriteKind.create()
    export const Ball = SpriteKind.create()
    export const Booth = SpriteKind.create()
    export const Mouse = SpriteKind.create()
    export const Crosshair = SpriteKind.create()
    export const Moon = SpriteKind.create()
    export const Text = SpriteKind.create()
}
info.onCountdownEnd(function () {
    game.over(true, effects.confetti)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    tiles.placeOnRandomTile(mySprite, assets.tile`Start`)
    sprites.destroyAllSpritesOfKind(SpriteKind.Squeaker)
    distraction = false
    squeaker = false
    info.changeLifeBy(-1)
    rubyspeed = 20
    info.startCountdown(10)
})
// Overlap for Player and Collectable
sprites.onOverlap(SpriteKind.Player, SpriteKind.Collectable, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    tiles.placeOnRandomTile(otherSprite, assets.tile`Spawn`)
    // otherSprite.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()));
    info.startCountdown(10)
    rubyspeed += 2
    if (!(squeaker)) {
        ruby = sprites.create(assets.image`Ruby`, SpriteKind.Enemy)
        tiles.placeOnRandomTile(ruby, assets.tile`Start`)
        ruby.follow(mySprite, rubyspeed)
        football = sprites.create(assets.image`Football`, SpriteKind.Squeaker)
        randrug = tiles.getTileLocation(randint(3, 12), randint(3, 12))
        tiles.placeOnTile(football, randrug)
        squeaker = true
    }
})
info.onLifeZero(function () {
    game.over(true, effects.clouds)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Squeaker, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    distraction = false
    squeaker = false
    info.changeScoreBy(5)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Squeaker, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
    distraction = true
    rubyspeed += 2
})
let randrug: tiles.Location = null
let football: Sprite = null
let ruby: Sprite = null
let squeaker = false
let distraction = false
let rubyspeed = 0
let mySprite: Sprite = null
// Main Game Setup
scene.setBackgroundColor(12)
tiles.setCurrentTilemap(tilemap`Arena Demo`)
mySprite = sprites.create(assets.image`Ezra`, SpriteKind.Player)
tiles.placeOnRandomTile(mySprite, assets.tile`Start`)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(false)
scene.cameraFollowSprite(mySprite)
let balloons = sprites.create(assets.image`Balloons`, SpriteKind.Collectable)
tiles.placeOnRandomTile(balloons, assets.tile`Spawn`)
info.startCountdown(10)
rubyspeed = 20
forever(function () {
    if (squeaker) {
        if (distraction) {
            ruby.follow(football, rubyspeed)
        } else {
            ruby.follow(mySprite, rubyspeed)
        }
    }
})

controller.player2.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function () {
    players = 2
    controller.player2.moveSprite(Player2, 0, 100)
})
controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    players = 2
    controller.player2.moveSprite(Player2, 0, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.vx = -1.1 * otherSprite.vx
    otherSprite.vy = 1.1 * otherSprite.vy
    music.playTone(494, music.beat(BeatFraction.Half))
})
let Player2: Sprite = null
let players = 0
players = 1
let Background = image.create(scene.screenWidth(), scene.screenHeight())
for (let index = 0; index <= scene.screenHeight(); index++) {
    if (index % 6 < 4) {
        Background.setPixel(scene.screenWidth() / 2, index, 1)
    }
}
scene.setBackgroundImage(Background)
let Player1 = sprites.create(assets.image`Player 1`, SpriteKind.Player)
Player1.setPosition(8, 60)
controller.moveSprite(Player1, 0, 100)
Player1.setStayInScreen(true)
Player2 = sprites.create(assets.image`Player 2`, SpriteKind.Player)
Player2.setPosition(152, 60)
Player2.setStayInScreen(true)
let projectile = sprites.createProjectileFromSprite(assets.image`Ball`, Player1, randint(50, 75), randint(25, 50))
projectile.x += 3
projectile.setBounceOnWall(true)
projectile.setFlag(SpriteFlag.ShowPhysics, false)
info.player1.setScore(0)
info.player2.setScore(0)
game.onUpdate(function () {
    if (projectile.x > scene.screenWidth() / 2 && players == 1) {
        if (projectile.y > Player2.y) {
            Player2.y += 2
        } else {
            Player2.y += -2
        }
    }
})
game.onUpdate(function () {
    if (projectile.x > Player2.right) {
        info.player1.changeScoreBy(1)
        music.jumpUp.play()
        projectile.setPosition(Player1.x + 3, Player1.y)
        projectile.setVelocity(randint(50, 75), randint(25, 50))
    } else if (projectile.x < Player1.left) {
        info.player2.changeScoreBy(1)
        music.jumpUp.play()
        projectile.setPosition(Player2.x - 3, Player2.y)
        projectile.setVelocity(randint(-75, -50), randint(25, 50))
    }
})

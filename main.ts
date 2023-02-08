namespace SpriteKind {
    export const block = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.setVelocity(sprite.vx, -1 * sprite.vy)
})
function getPos (sprite: Sprite, otherSprite: Sprite) {
    if (sprite.x < otherSprite.x - 8 || sprite.x > otherSprite.x + 8) {
        direction = 1
    } else {
        direction = 0
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.block, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    getPos(sprite, otherSprite)
    if (direction == 1) {
        sprite.setVelocity(-1 * sprite.vx, sprite.vy)
    } else {
        sprite.setVelocity(sprite.vx, -1 * sprite.vy)
    }
    otherSprite.destroy()
})
let direction = 0
let tile: Sprite = null
let tilePick = 0
let x = 0
let paddle = sprites.create(assets.image`Gunner`, SpriteKind.Player)
paddle.setPosition(79, 100)
paddle.setStayInScreen(true)
controller.moveSprite(paddle, 100, 0)
let projectile = sprites.createProjectileFromSprite(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 9 9 9 . . . . . . . 
    . . . . . 9 6 7 6 9 . . . . . . 
    . . . . 9 6 7 6 7 6 9 . . . . . 
    . . . . 1 7 1 7 1 7 1 . . . . . 
    . . . . 8 6 7 6 7 6 8 . . . . . 
    . . . . . 8 6 7 6 8 . . . . . . 
    . . . . . . 8 8 8 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, paddle, 50, -55)
projectile.setFlag(SpriteFlag.DestroyOnWall, false)
projectile.setBounceOnWall(true)
for (let index = 0; index <= 9; index++) {
    for (let index2 = 0; index2 <= 2; index2++) {
        x = index * 18
        if (index2 % 2 == 1) {
            x = index * 18 + 8
        }
        tilePick = randint(0, 2)
        if (tilePick == 0) {
            tile = sprites.create(assets.image`myImage`, SpriteKind.block)
        } else if (tilePick == 1) {
            tile = sprites.create(assets.image`Cat`, SpriteKind.block)
        } else {
            tile = sprites.create(assets.image`Bone`, SpriteKind.block)
        }
        tile.setPosition(x, index2 * 18 + 20)
    }
}
info.setScore(1)
scene.setBackgroundColor(7)
direction = 1
forever(function () {
    if (projectile.bottom > 119) {
        game.over(false, effects.bubbles)
    }
    if (info.score() == 30) {
        game.over(true, effects.bubbles)
    }
})

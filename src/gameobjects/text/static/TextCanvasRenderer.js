/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Renders this Game Object with the Canvas Renderer to the given Camera.
 * The object will not render if any of its renderFlags are set or it is being actively filtered out by the Camera.
 * This method should not be called directly. It is a utility function of the Render module.
 *
 * @method Phaser.GameObjects.Text#renderCanvas
 * @since 3.0.0
 * @private
 *
 * @param {Phaser.Renderer.Canvas.CanvasRenderer} renderer - A reference to the current active Canvas renderer.
 * @param {Phaser.GameObjects.Text} src - The Game Object being rendered in this call.
 * @param {number} interpolationPercentage - Reserved for future use and custom pipelines.
 * @param {Phaser.Cameras.Scene2D.Camera} camera - The Camera that is rendering the Game Object.
 * @param {Phaser.GameObjects.Components.TransformMatrix} parentMatrix - This transform matrix is defined if the game object is nested
 */
var TextCanvasRenderer = function (renderer, src, interpolationPercentage, camera, parentMatrix)
{
    if (src.text === '')
    {
        return;
    }
    
    var ctx = renderer.currentContext;

    var alpha = camera.alpha * src.alpha;

    if (alpha === 0)
    {
        //  Nothing to see, so abort early
        return;
    }
    
    //  Blend Mode
    ctx.globalCompositeOperation = renderer.blendModes[src.blendMode];

    //  Alpha
    ctx.globalAlpha = alpha;

    var canvas = src.canvas;

    ctx.save();

    if (parentMatrix)
    {
        parentMatrix.copyToContext(ctx);
    }

    var tx = src.x - camera.scrollX * src.scrollFactorX;
    var ty = src.y - camera.scrollY * src.scrollFactorY;

    if (camera.roundPixels)
    {
        tx |= 0;
        ty |= 0;
    }

    ctx.translate(tx, ty);

    ctx.rotate(src.rotation);

    ctx.scale(src.scaleX, src.scaleY);

    ctx.translate(canvas.width * (src.flipX ? 1 : 0), canvas.height * (src.flipY ? 1 : 0));

    ctx.scale(src.flipX ? -1 : 1, src.flipY ? -1 : 1);

    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, -src.displayOriginX, -src.displayOriginY, canvas.width / src.style.resolution, canvas.height / src.style.resolution);

    ctx.restore();
};

module.exports = TextCanvasRenderer;

var orientations = {};
    orientations.up = 0;
    orientations.right = 1;
    orientations.down = 2;
    orientations.left = 3;

    orientations.upleft = 4;
    orientations.upright = 5;
    orientations.downright = 6;
    orientations.downleft = 7;

var rotateAroundOrder = [];
    rotateAroundOrder.push(orientations.up);
    rotateAroundOrder.push(orientations.upright);
    rotateAroundOrder.push(orientations.right);
    rotateAroundOrder.push(orientations.downright);
    rotateAroundOrder.push(orientations.down);
    rotateAroundOrder.push(orientations.downleft);
    rotateAroundOrder.push(orientations.left);
    rotateAroundOrder.push(orientations.upleft);

/*  rotateAroundOrder.step0 = orientations.up;
    rotateAroundOrder.step1 = orientations.upright;
    rotateAroundOrder.step2 = orientations.right;
    rotateAroundOrder.step3 = orientations.downright;
    rotateAroundOrder.step4 = orientations.down;
    rotateAroundOrder.step5 = orientations.downleft;
    rotateAroundOrder.step6 = orientations.left;
    rotateAroundOrder.step7 = orientations.upleft;*/

var enemyFollowStates = {};
    enemyFollowStates.idle = 0;
    enemyFollowStates.patrol = 1;
    enemyFollowStates.lookAround = 2;
    enemyFollowStates.followPlayer = 3;
    enemyFollowStates.traceStepsBack = 4;

var movementStrategyStatus = {};
    movementStrategyStatus.starting = 0;
    movementStrategyStatus.moving = 1;
    movementStrategyStatus.finished = 2;


var stealthStates = {};
    stealthStates.visible = 0;
    stealthStates.hidden = 1;
    stealthStates.seen = 2;
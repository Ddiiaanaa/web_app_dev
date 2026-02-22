console.log("function: triangle(val1, \"type1\", val2, \"type2\").\ntypes: \"leg\" (\u043A\u0430\u0442\u0435\u0442), \"hypotenuse\" (\u0433\u0456\u043F\u043E\u0442\u0435\u043D\u0443\u0437\u0430), \"adjacent angle\" (\u043F\u0440\u0438\u043B\u0435\u0433\u043B\u0438\u0439 \u043A\u0443\u0442), \"opposite angle\" (\u043F\u0440\u043E\u0442\u0438\u043B\u0435\u0436\u043D\u0438\u0439 \u043A\u0443\u0442), \"angle\" (\u0433\u043E\u0441\u0442\u0440\u0438\u0439 \u043A\u0443\u0442).\nexsample: triangle(7, \"leg\", 18, \"hypotenuse\");");
function triangle(val1, type1, val2, type2) {
    if (val1 === void 0) { val1 = 3; }
    if (type1 === void 0) { type1 = "leg"; }
    if (val2 === void 0) { val2 = 4; }
    if (type2 === void 0) { type2 = "leg"; }
    var validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Warning: The element type is incorrect.");
        return "failed";
    }
    if (val1 <= 0 || val2 <= 0) {
        return "Zero or negative input";
    }
    var a = 0, b = 0, c = 0, alpha = 0, beta = 0;
    var toRadians = function (deg) { return deg * Math.PI / 180; };
    var toDegrees = function (rad) { return rad * 180 / Math.PI; };
    if (type1 === "leg" && type2 === "leg") {
        a = val1;
        b = val2;
        c = Math.sqrt(a * a + b * b);
        alpha = toDegrees(Math.atan(a / b));
        beta = 90 - alpha;
    }
    else if ((type1 === "leg" && type2 === "hypotenuse") ||
        (type2 === "leg" && type1 === "hypotenuse")) {
        var leg = type1 === "leg" ? val1 : val2;
        var hyp = type1 === "hypotenuse" ? val1 : val2;
        if (leg >= hyp) {
            console.log("Attention: The leg cannot be greater than or equal to the hypotenuse.");
            return "failed";
        }
        c = hyp;
        a = leg;
        b = Math.sqrt(c * c - a * a);
        alpha = toDegrees(Math.asin(a / c));
        beta = 90 - alpha;
    }
    else if ((type1 === "leg" && type2 === "adjacent angle") ||
        (type2 === "leg" && type1 === "adjacent angle")) {
        var leg = type1 === "leg" ? val1 : val2;
        var angle = type1 === "adjacent angle" ? val1 : val2;
        if (angle >= 90 || angle <= 0)
            return "Invalid angle";
        b = leg;
        beta = angle;
        alpha = 90 - beta;
        a = b * Math.tan(toRadians(beta));
        c = b / Math.cos(toRadians(beta));
    }
    else if ((type1 === "leg" && type2 === "opposite angle") ||
        (type2 === "leg" && type1 === "opposite angle")) {
        var leg = type1 === "leg" ? val1 : val2;
        var angle = type1 === "opposite angle" ? val1 : val2;
        if (angle >= 90 || angle <= 0)
            return "Invalid angle";
        a = leg;
        alpha = angle;
        beta = 90 - alpha;
        b = a / Math.tan(toRadians(alpha));
        c = a / Math.sin(toRadians(alpha));
    }
    else if ((type1 === "hypotenuse" && type2 === "angle") ||
        (type2 === "hypotenuse" && type1 === "angle")) {
        var hyp = type1 === "hypotenuse" ? val1 : val2;
        var angle = type1 === "angle" ? val1 : val2;
        if (angle >= 90 || angle <= 0)
            return "Invalid angle";
        c = hyp;
        alpha = angle;
        beta = 90 - alpha;
        a = c * Math.sin(toRadians(alpha));
        b = c * Math.cos(toRadians(alpha));
    }
    else {
        console.log("Warning: Incompatible type pair specified.");
        return "failed";
    }
    if (a <= 0 || b <= 0 || c <= 0 || a + b <= c || a + c <= b || b + c <= a) {
        return "Invalid triangle dimensions";
    }
    if (alpha < 1 || beta < 1) {
        return "Triangle too degenerate (angle too small)";
    }
    console.log("\na = ".concat(Number(a.toFixed(4)), " \nb = ").concat(Number(b.toFixed(4)), "\nc = ").concat(Number(c.toFixed(4)), "\nalpha = ").concat(Number(alpha.toFixed(4)), "\nbeta = ").concat(Number(beta.toFixed(4)), "\n"));
    return "success";
}
window.triangle = triangle;

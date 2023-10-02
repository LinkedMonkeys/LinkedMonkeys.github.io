var diameter1;
var diameter2;
var growing;

function setup() {
  createCanvas(500, 500);

  diameter1 = 1;
  diameter2 = width / 2;
  growing = true;
}

function draw() {
  background(0);
  fill(255);
  rect(width / 2, 0, width / 2, height);

  circleAnchoredAtPoint(width / 2, height / 2, diameter1, true);
  fill(0);
  circleAnchoredAtPoint(width / 2, height / 2, diameter2, false);

  if (diameter1 > width / 2) {
    growing = false;
  }

  if (diameter1 < 1) {
    growing = true;
  }

  if (growing) {
    diameter1++;
    diameter2--;
  } else {
    diameter1--;
    diameter2++;
  }
}

function circleAnchoredAtPoint(x, y, diameter, onLeft) {
  if (onLeft) {
    ellipse(x - diameter / 2, y, diameter, diameter);
  } else {
    ellipse(x + diameter / 2, y, diameter, diameter);
  }
}

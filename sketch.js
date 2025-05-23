let facemesh;
let video;
let predictions = [];
const points = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
const additionalPoints = [76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184];

function setup() {
  createCanvas(640, 480).position((windowWidth - 640) / 2, (windowHeight - 480) / 2);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', results => {
    predictions = results;
  });
}

function modelReady() {
  console.log('Facemesh model loaded!');
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // Draw the first set of points using beginShape and vertex
    stroke('#ffb3c6');
    strokeWeight(15);
    noFill();

    beginShape();
    for (let i = 0; i < points.length; i++) {
      const [x, y] = keypoints[points[i]];
      vertex(x, y);
    }
    endShape(CLOSE);

    // Draw the additional points using line
    stroke('#ffb3c6');
    strokeWeight(15);
    for (let i = 0; i < additionalPoints.length - 1; i++) {
      const [x1, y1] = keypoints[additionalPoints[i]];
      const [x2, y2] = keypoints[additionalPoints[i + 1]];
      line(x1, y1, x2, y2);
    }
  }
}

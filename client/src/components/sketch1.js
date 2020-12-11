import "react-p5-wrapper";

export default function sketch1(p) {
  let canvas;
  //var song = p5.loadSound();

  p.setup = () => {
    canvas = p.createCanvas(300, 300);
    p.noStroke();
  };

  p.draw = () => {
    p.background("orangered");
    p.ellipse(150, 150, 100, 100);
  };

  // p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
  //   if (canvas)
  //     //Make sure the canvas has been created
  //     p.fill(newProps.color);
  // };
}

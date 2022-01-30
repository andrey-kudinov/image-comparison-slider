# Image comparison slider

Image Comparison Slider is a slider that can be controlled, can be pulled by the customer to show less of the before image and a more noteworthy measure of the after image, and the a different way. These types of image comparison sliders are quite popular at the moment and very effective in showing the differences between 2 images. They are useful in many industries to make comparisons between two images, usually a before-after kind, with the two images superimposed on each other.

### Commands

| Command    | Description           |
| ---------- | --------------------- |
| yarn       | Install dependencies  |
| yarn dev   | Serve with hot reload |
| yarn build | Build project         |
| yarn lint  | Run eslint            |

### Props

| Name           | Type   | Required     | Description                            |
| -------------- | ------ | ------------ | -------------------------------------- |
| imageLeft      | string | **Required** | URL of left image to use               |
| imageRight     | string | **Required** | URL of after image to use              |
| blurRightImage | string | option       | filter: `blur(${**blurRightImage**}px) |
| handleText     | string | option       | handler text                           |
| titleLeft      | string | option       | left title                             |
| titleRight     | string | option       | right title                            |

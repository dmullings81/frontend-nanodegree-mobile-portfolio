# Website Performance Optimization portfolio project

The fourth project in the Udacity Front End Web Developer nanodegree program was to optimize a portfolio website. The first part required us to optimize the PageSpeed Insights score for index.html to 90 or higher. The second required us to optimize the pizza.html to run at a consisten 60fps, and have the pizzas resize at under 10ms.

## Usage

To run the site open the file index.html. Some animations use JavaScript so make sure JavaScript is enabled in your browser. PageSpeed Insights score of 96 on mobile and 97 on desktop! Only remaining fixes are server-side.

## Gulp usage

The task runner Gulp has been used to optimize the site.

Type the following commands into your command line in the root directory (where gulpfile.js is located). All working files are located in the 'src' directory, and running gulp tasks will output to the 'dist' directory.

gulp sass
Compiles any sass files into css files.

gulp scripts
Concatenates & minifies JavaScript files into all.js and all.min.js. Gzip functionality currently commented out.

gulp html
Minifies and inlines any associated CSS files. Gzip functionality currently commented out.

gulp styles
Minifies CSS files. Gzip functionality currently commented out.

gulp images
Minifies images.

gulp scripts-views, gulp html-views, gulp styles-views, gulp images-views
Run the same tasks as above but in the views directory. Necessary to keep directory structure for reviewers.

gulp watch
Watches for changes in any of the above files and runs associated tasks.

gulp
Runs all of the above.

## Pizza page optimizations

Now running at a steady 60fps! Resize the pizzas using the slider now takes about 1ms!

### 'Movers' elements

* Reduced number of mover elements created from 200 to 25.
* Added the backface-visibility: hidden CSS attribute to force them into seperate composite layers. This meant that the browser wasn't required to paint the whole page each time the element moved.
* Subtracted half the window width from the basicLeft variable for use in the updatePositions function.

### updatePositions function

* Replaced querySelectorAll with getElementsByClassName which is considerably faster.
* Removed from the for loop the calculation to find scrollTop divided by 1250, and an array of values for use in the phase calculation.
* Stored the variable items.length outisde of the loop (attribute to http://www.html5rocks.com/en/tutorials/speed/html5/)
* Replaced the CSS style 'left' which triggers layout, paint and composite, with transform, which only triggers composite. Found on csstriggers.com. The syntax for this can be attributed to Udacity user 'mcs' (https://discussions.udacity.com/t/project-4-how-do-i-optimize-the-background-pizzas-for-loop/36302).

#### requestAnimationFrame

* Used requestAnimationFrame to run the updatePositions function at a steady rate.
* Added a running variable to ensure requestAnimationFrame did not run after scrolling was completed.
(attribute to https://www.kirupa.com/html5/animating_with_requestAnimationFrame.htm)

### resizePizzas function

* Instead of calculating the size difference when resizing, I used the switch statement to return a percentage based on the size value.
* Said percentage was then used in the changePizzaSizes function as the width attribute of the pizza containers.
* Replaced querySelectorAll with getElementsByClassName which is considerably faster.
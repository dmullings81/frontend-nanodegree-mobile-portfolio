Website Performance Optimization portfolio project
==================================================

## Synopsis

This is my fourth project in the Udacity frontend nanodegree program, which
focuses on web optimization.  You can view the final project
[here](http://tneisinger.github.io/frontend-nanodegree-mobile-portfolio).

The source code for this project can be found in src/ while the optimized code
is saved in the dist/ directory.

## Setup

The final project can be seen
[here](http://tneisinger.github.io/frontend-nanodegree-mobile-portfolio).  If
you would like to install and run this project on your local machine, clone
this repo and open the dist/index.html file in your favorite web browser.

All source code for this project is located in the src/ directory.  This
project uses npm and grunt to minify images and source code and place them into
the dist/ directory.  If you wish to modify the source code, it is recommended
that you use grunt to re-minify the source code and save it into the dist/
directory.

## Optimizations of views/js/main.js

Two main features were addressed in optimizing the pizza.html page:

1. The animation of the background pizzas when the page is scrolled
2. The resizing of the foreground pizzas when the input slider is adjusted.

To improve the scrolling animation of the background pizzas, I performed the
following optimizations:

- Remove superfluous pizzas from the background. (Reduced from 200 to 50)
- Move animating javascript into a requestAnimationFrame function.
- Move calculations and element selections out of for-loops where possible.
- Use getElementsByClassName instead of querySelectorAll.
- Use transform for animation rather than left, right, top, or bottom.
- Store all the moving pizzas in a global variable to avoid repeated lookups.

To improve the responsiveness of the resizable foreground pizzas, I performed
the following optimizations:

- Modify changePizzaSizes function to prevent forced synchronous layouts.
- Simplify the changePizzaSizes function, removing extra calculations.
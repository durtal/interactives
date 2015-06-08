Derby Sectionals Visualisation
==============================

An attempt to create an interactive visualisation/explanation/analysis of the 2015 Derby.

### About

This visualisation displays the sectionals of runners in the 2015 Derby.  It uses AngularJS and D3 to create and manage the various interactive elements.  I also used R to get data for the elevation profile of the Derby course.

This started out when I made a gif of a circle running over the elevation profile of the Derby course, it sat dormant for a while, until last week, when I started building fleshing out the idea, it quickly grew, and the Javascript behind the scenes can probably be cleaned up and streamlined, but I am still learning.

Visualising a horse race, or any race, wasn't as easy as I'd anticipated.  The idea of the gif, a re-animated race would likely hide runners, so I used the sectional data I manually collected, and plotted the times horses recorded at each sectional.  This in itself had issues, as it was a static snapshot, failing to show whether horses were either accelerating up or slowing down.  As a race progresses the time increases, but it is the leader that you want to reference, so plotting leaders at two sectionals is problematic.  

So the main visualisation shows the cumulative time each runner had recorded at each sectional, showing it's position relative to its rivals, but the visualisation allows some interactivity.  The primary plot links to other elements which further explain what is happening, including a slopegraph visualisation showing the position of runners behind the leader at the previous sectional compared to current sectional.

The Sectionals data is available in the data folder, file called **Derby2015.json**, it contains cumulative times, individual sectionals, sectional positions, finishing speeds, seconds behind leader, lengths behind leader.  Also in that folder is sectionals for the Oaks.

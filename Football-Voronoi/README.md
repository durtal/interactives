Football + Voronoi
==================

A short post, looking at Football and Voronoi diagrams, and the potential use of those diagrams to analyse teams and players, and the space on a football pitch during a game.  Unfortunately there is no actual tracking data, so it's just a thought experiment, but interesting nonetheless.

### NBA Court plot

I wanted to add the court lines to the final NBA plot, and was a little surprised that there wasn't anything that could be copied and pasted using D3.  So in the [nba-court-lines.json](https://github.com/durtal/interactives/blob/master/Football-Voronoi/data/nba-court-lines.json) file I've included the main straight lines and circles found on a court (the 3point arc could obviously use some work).  X and Y coords are on a scale of 0 to 1, so more flexible, how these are plotted in my post can be seen [here](https://github.com/durtal/interactives/blob/master/Football-Voronoi/scripts/directives/nba-voronoi.js#L25-L62).

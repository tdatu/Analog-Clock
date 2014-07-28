Analog-Clock
============

An SVG Analog clock. 


	Created By: Anthony Datu
	Purpose: Modular Analog Clock
	Date: 07/16/2014
	Notes: This works in conjunction with moment.js and moment-timezone.js
	How to use: 
		1) In html create <div id="clock"><svg></svg></div>
		2) Set div's height and width equal to each other(e.g 400px by 400px)
		3) Call new Clock() to instantiate object
		4) Call method generate("#clock","Manila") <--- City is optional, if no city 
		time will default to Local time.
	
	Clock Description:
		Between 6 am - 5pm, clock color is orange, otherwise gray. 

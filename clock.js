/**
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
**/


function Clock() {
	var id;
	var city;
	var zone;
	var time_adj = [];
	
	this.getTime = function(){
		var timeDegrees = [];
		
		if(city === 'local'){
			timeDegrees['hour'] = parseInt(moment().format('h')) * 30 + (parseInt(moment().format('mm')) * .5);
			timeDegrees['minute'] = parseInt(moment().format('mm')) * 6;
			timeDegrees['second'] = parseInt(moment().format('ss')) * 6;
			
		}
		else if(time_adj.length > 0){
			
		}
		else{
			zone = city;
			timeDegrees['hour'] = parseInt(moment.tz(zone).format('h')) * 30 + (parseInt(moment.tz(zone).format('mm')) * .5);
			timeDegrees['minute'] = parseInt(moment.tz(zone).format('mm')) * 6;
			timeDegrees['second'] = parseInt(moment.tz(zone).format('ss')) * 6;

		}
		
		return timeDegrees;	
	}, 

	
	this.dayOrNight = function(){

		var time;
		
		if(city === 'local'){
			time = parseInt(moment().format('HH')) > 17 || parseInt(moment().format('HH')) < 6 ? 'night' : 'day';
		}else{
			time = parseInt(moment.tz(zone).format('HH')) > 17 || parseInt(moment.tz(zone).format('HH')) < 6 ? 'night' : 'day';
		}
		
		return time;
	},
	
	this.dateTicker = function(){
		var result;
		if(arguments[0] === undefined){
			if(zone){
				result = moment.tz(zone).format('ddd D');
			}else{
				result = moment().format('ddd D');
			}
		}else{		// digital clock
			if(zone){
				result = moment.tz(zone).format('HH:mm');
			}else{

				result = moment().format('HH:mm');
			}
		}
		
		return result;
	},
	
	this.formatCity = function(){
		var formatted = city.replace(/^(\w+\/)*/gi,'');
		return formatted.replace("_", " ");
	},
	
	
	
	this.generate = function(){
		id = arguments[0];
		city = arguments[1] != undefined ? arguments[1] : "local" ;
		
		var el = document.querySelector(id);
		var height = el.clientHeight;
		var width = height;
	
		var ns = "http://www.w3.org/2000/svg";
		var position = height/2;
		
		/** Get Clock hands angles **/
		var time = this.getTime();
		var color = this.dayOrNight() === "night" ? "#005753" : "#FF760D";
		
		/** create clock face doms **/
		var svg = el.firstElementChild;
		var circle = document.createElementNS(ns, "circle");
		var dot = document.createElementNS(ns, "circle");
		var hourHand = document.createElementNS(ns, "line");
		var minuteHand = document.createElementNS(ns, "line");
		var secondHand = document.createElementNS(ns, "line");
		var datetext = document.createElementNS(ns, "text");
		datetext.appendChild( document.createTextNode(this.dateTicker()));
		var digitalclock = document.createElementNS(ns, "text");
		digitalclock.appendChild( document.createTextNode(this.dateTicker("get")));
		var cityName = document.createElementNS(ns,"text");
		cityName.appendChild(document.createTextNode(this.formatCity()));
		
		/**
		var numbers = [];
		for (var i = 1; i > 12; i++){
			numbers[i] = document.createElementNS(ns, "text");
			numbers[i].innerHTML = i;
			numbers[i].setAttribute("x", )
		} 
		**/
		
		/** Set the Attributes **/
		//Container
		svg.setAttribute("height", height);
		svg.setAttribute("width", width);
		
		//Clock face
		circle.setAttribute("cx", height/2);
		circle.setAttribute("cy", height/2);
		circle.setAttribute("r", (height/2 - (height * .035)));
		circle.setAttribute("fill", "transparent");
		circle.setAttribute("stroke", color);
		circle.setAttribute("stroke-width", (height * .035));
		
		//Clock center dot
		dot.setAttribute("cx", height/2);
		dot.setAttribute("cy", height/2);
		dot.setAttribute("r", (height * .033));
		dot.setAttribute("fill", color);

		
		//Hour Hand
		hourHand.setAttribute("x1", position);
		hourHand.setAttribute("y1", position);
		hourHand.setAttribute("x2", position);
		hourHand.setAttribute("y2", ((height/2) - (height/2 * .35)));
		hourHand.setAttribute("stroke", color);
		hourHand.setAttribute("stroke-width", (height * .04) + 'px');
		hourHand.setAttribute("stroke-linecap", 'round');
		hourHand.setAttribute("stroke-opacity", '.4');
		hourHand.setAttribute("fill", "transparent");
		hourHand.setAttribute("transform", "rotate( " + time['hour'] + " " + position +" " + position +")");
		
		//Minute Hand
		minuteHand.setAttribute("x1", height/2);
		minuteHand.setAttribute("y1", height/2);
		minuteHand.setAttribute("x2", height/2);
		minuteHand.setAttribute("y2", ((height/2) - (height/2 * .70)));
		minuteHand.setAttribute("stroke", color);
		minuteHand.setAttribute("stroke-width", (height * .03) + 'px');
		minuteHand.setAttribute("stroke-linecap", 'round');
		minuteHand.setAttribute("stroke-opacity", '.4');
		minuteHand.setAttribute("fill", "transparent");
		minuteHand.setAttribute("transform", "rotate( " + time['minute'] + " " + position +" " + position +")");
		
		//Second Hand
		secondHand.setAttribute("x1", height/2);
		secondHand.setAttribute("y1", height/2);
		secondHand.setAttribute("x2", height/2);
		secondHand.setAttribute("y2", ((height/2) - (height/2 * .80)));
		secondHand.setAttribute("stroke", color);
		secondHand.setAttribute("stroke-width", (height * .01) + 'px');
		secondHand.setAttribute("stroke-linecap", 'round');
		secondHand.setAttribute("stroke-opacity", '.4');
		secondHand.setAttribute("fill", "transparent");
		secondHand.setAttribute("transform", "rotate( " + time['second'] + " " + position +" " + position +")");
		
		//Text Date
		datetext.setAttribute("x", (width * .12));
		datetext.setAttribute("y", ((height/2) + (height * .1)));
		datetext.setAttribute("font-size", height / 2 * .13);
		datetext.setAttribute("fill", color);
		
		//Digital clock
		digitalclock.setAttribute("x",(width * .12));
		digitalclock.setAttribute("y", ((height/2) + (height * .16)));
		digitalclock.setAttribute("font-size", height / 2 * .16);
		digitalclock.setAttribute("fill", color);
		digitalclock.setAttribute("class", "digital");
		
		//City Name
		cityName.setAttribute("x", (width * .12));
		cityName.setAttribute("y", ((height/2) + (height * .2)));
		cityName.setAttribute("font-size", (height / 2 * .1));
		cityName.setAttribute("fill", color);
		cityName.setAttribute("class", "digital");
	

		/** Append the clock to the div **/	
		svg.appendChild(circle);
		svg.appendChild(datetext);
		svg.appendChild(digitalclock);
		svg.appendChild(cityName);
		svg.appendChild(hourHand);
		svg.appendChild(minuteHand);
		svg.appendChild(secondHand);
		svg.appendChild(dot);
		el.appendChild(svg);
		
		this._start(this);
	},
	
	this.updateHands = function(){
		//console.log(id);
		var div = document.querySelector(id);
		var cir = div.querySelectorAll("circle");
		var hands = div.querySelectorAll("line");	//Get SVG child nodes (clock hands) 
		var text = div.querySelectorAll("text");
		var position = div.clientHeight / 2;
		
		//Get the angles 
		var time = this.getTime();
		
		//console.log(time['second']);
		//update clock hands angles & text info
		hands[0].setAttribute("transform", "rotate( " + time['hour'] + " " + position +" " + position +")");
		hands[1].setAttribute("transform", "rotate( " + time['minute'] + " " + position +" " + position +")");
		hands[2].setAttribute("transform", "rotate( " + time['second'] + " " + position +" " + position +")");
		text[0].innerHTML = this.dateTicker();
		text[1].innerHTML = this.dateTicker("digitclock");
		
		var color = this.dayOrNight() === "night" ? "#005753" : "#FF760D";
		//update hands color
		for(var i = 0; i < hands.length; i++){
			hands[i].setAttribute("stroke", color);
		}
		
		//update texts color
		text[0].setAttribute("fill", color);
		text[1].setAttribute("fill", color);
		text[2].setAttribute("fill", color);
		
		cir[0].setAttribute("stroke", color);
		cir[1].setAttribute("fill", color);
	},
	
	this.adjustTime = function(time){
		time_adj['hr']  = time[0];
		time_adj['min'] = time[1];
		
	},
	
	this._start = function(obj){
		timer[id] = setInterval(function(){obj.updateHands()},1000);
	}
}
			


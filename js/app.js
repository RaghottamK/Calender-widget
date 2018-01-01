'use strict';

var CalendarConstructor = function() {
	this.date = new Date();
	this.currentYear = this.date.getFullYear();
	this.currentMonth = this.date.getMonth();
	this.daysShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
	this.monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	
};

CalendarConstructor.prototype.createNewElement = function(element, className) {
	var el = document.createElement(element);
	el.classList.add(className);
	return el;
}

CalendarConstructor.prototype.monthData = function(month, year) {
	var monthData = {
		year: year,
		month: month,
		// Number of days in current month
		monthDaysCount: function() {
			var _this = this;
			var daysCount = new Date(_this.year, _this.month + 1, 0).getDate();
			return daysCount;
  	},
		// Get week day for every day in the month 0 to 6.
		weekDay: function(d) {
			var _this = this;
			var dayNum = new Date(_this.year, _this.month, d);
			return dayNum.getDay();
		}
	};
  
	return monthData;
};

CalendarConstructor.prototype.getMonthName = function(monthNumber) {
	for	( var i = 0; i < this.monthNames.length; i++ ) {
		if ( i === monthNumber ) {
			return this.monthNames[i];
		}
	}
}

CalendarConstructor.prototype.distributeDays = function(monthData, tbody) {
	var day = 1;
	var dayCount = monthData.monthDaysCount();
	
		while ( day < dayCount ) {
			var weekRow = document.createElement("tr");
			for (var i = 0; i < 7; i++) {
				if (monthData.weekDay(day) == i) {
					weekRow.innerHTML += "<td>" + day + "</td>";
					day++;
				} else {
					weekRow.innerHTML += "<td></td>";
				}
				if ( day > dayCount ) {
					break;
				}
			}
			tbody.appendChild(weekRow);
		}
}

CalendarConstructor.prototype.createMonthTableBody = function(monthData) {
	var tbody = this.createNewElement("tbody", "calendar-body");
	this.distributeDays(monthData, tbody);
	return tbody;
}

CalendarConstructor.prototype.createMonthTableHead = function() {
	var thead = this.createNewElement("thead", "calendar-header");
	var tr = this.createNewElement("tr", "calendar-row");
	
	for	( var i = 0; i < this.daysShort.length; i++ ) {
		tr.innerHTML += "<th>" + this.daysShort[i] + "</th>";
	}		

	thead.appendChild(tr);
	return thead;
}

CalendarConstructor.prototype.createMonthTableWrap = function(monthData) {
	var div = this.createNewElement("div", "calendar-month");
	var table = this.createNewElement("table", "calendar");
	table.appendChild(this.createMonthTableHead());
	table.appendChild(this.createMonthTableBody(monthData));
	div.appendChild(table);
	return div;	
}

CalendarConstructor.prototype.createMonthNameWrap = function(monthData) {
	var div = this.createNewElement("div", "calendar-month-name");
	var span = this.createNewElement("span", "month-name");
	span.innerHTML = "<b>" + this.getMonthName(monthData.month) + "</b> " + monthData.year;	
	div.appendChild(span);
	return div;	
}

CalendarConstructor.prototype.createMonthWrapper = function(monthData) {
	var div = this.createNewElement("div", "calendar-wrap");
	div.appendChild(this.createMonthNameWrap(monthData));
	div.appendChild(this.createMonthTableWrap(monthData));
	return div;	
}

CalendarConstructor.prototype.updateMonthData = function(monthData, counter) {
	if (counter !== 0) {
		if (monthData.month < 11) {
			monthData.month++
		} else {
			monthData.month = 0;
			monthData.year++;
		}
    }
    this.counter++;
	return monthData;
}

CalendarConstructor.prototype.parseInputData = function(id, month, year) {
    this.startMonth = month > 11 || month === undefined ? this.currentMonth : month;
    this.startMonthsYear = year < 1970 || year === undefined ? this.currentYear : year;
	this.containerId = id;
}

CalendarConstructor.prototype.renderCalendar = function(id, month, year) {
	this.parseInputData(id, month, year);
	var monthData = this.monthData(this.startMonth, this.startMonthsYear);
    var calendarContainer = document.getElementById(this.containerId);
    this.counter = 0;
    var updatedData = this.updateMonthData(monthData, this.counter);
	calendarContainer.appendChild(this.createMonthWrapper(updatedData));
}

var calendar = new CalendarConstructor();

calendar.renderCalendar("calendar", 2017, 9);
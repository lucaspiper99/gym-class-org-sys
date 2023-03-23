Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

$(document).ready(function() {
    
    var weekDaysMap = {
        11: "Tuesday",
        12: "Wednesday",
        13: "Thursday",
        14: "Friday",
        15: "Saturday",
        16: "Sunday",
        17: "Monday"
    };
    
var meta = {
    // ExerciseAction
    "ExerciseAction": 'itemscope itemtype="https://schema.org/ExerciseAction"',
    "name": 'itemprop="name"',
    "SportsEvent": 'itemprop="sportsEvent" itemscope itemtype="https://schema.org/SportsEvent"',
    "doorTime": 'itemprop="doorTime"',
    "keywords": 'itemprop="keywords"',
    // ExercisePlan
    "ExercisePlan": 'itemprop="exercisePlan" itemscope itemtype="https://schema.org/ExercisePlan"',
    "QuantitativeValue": 'itemprop="activityDuration" itemscope itemtype="https://schema.org/QuantitativeValue"',
    "value": 'itemprop="value"',
    "Audience": 'itemprop="audience" itemscope itemtype="https://schema.org/Audience"',
    "audienceType": 'itemprop="audienceType"',
    "additionalVariable": 'itemprop:"additionalVariable"',
    // HealthClub
    "HealthClub": 'itemprop="location" itemscope itemtype="https://schema.org/HealthClub"',
    "address": 'itemprop="address"',
    "areaServed": 'itemprop="areaServed"'
    }

    
    var loadAllClasses = function () {
        for (var i = 0; i < data.length; i++) {
            var dayOfTheWeek = weekDaysMap[+data[i].start_time.substr(8, length=2)];
            var newCard = `<div class="card" style="width: 16rem; margin: .5rem;">
                                <div class="card-body mb-0" ${meta["ExerciseAction"]}>

                                    <h5 class="card-title" ${meta["name"]}>${data[i].class_name}</h5>
                                    <hr>

                                    <span class="mb-0" ${meta["SportsEvent"]}>
                                    
                                        <span ${meta["HealthClub"]}>
                                            <h6 class="card-subtitle mb-2 text-muted" ${meta["name"]}>
                                                ${data[i].health_club_name}
                                            </h6>

                                            <p class="card-text"><small><span class="locationValue" ${meta["areaServed"]}>${data[i].area}</span>: <span ${meta["address"]}>${data[i].address}</span></small></p>
                                        </span>
                                        <br>
                                        <p class="card-text"><small><time class="text-dark dayOfTheWeekValue">${dayOfTheWeek}</time> at <time ${meta["doorTime"]} class="text-dark startTimeValue" datetime=${data[i].start_time} >${data[i].start_time.substr(11, length=5)}</time> for <span ${meta["ExercisePlan"]}><span class="text-dark" ${meta["QuantitativeValue"]}><span class="durationValue" ${meta["value"]}>${+data[i].duration_value}</span> min</span>
                                        <br>
                                        <span ${meta["Audience"]}><span class="text-dark difficultyValue" ${meta["audienceType"]}>${data[i].audience_type}</span> level</span>
                                        <br>
                                        <span class="text-dark muscleGroupValue" ${meta["additionalVariable"]}>${data[i].muscle_group}</span></small></p></span>
                                        </span>
                                </div>
                            </div>`;
            $('#classList').append(newCard);
        }
    }
    
    var showFilter = function (property, value) {
        $('#searchContainer').hide();
        $('#filterLabel').html(property+': <b>'+value+'</b>');
        $('#activeFilterDiv1').show();
        $('#activeFilterDiv2').show();
    }
    
    // load all classes when page loads
    loadAllClasses();
    
    var activeFilterDivs = `<div class="d-flex col-md-10 justify-content-center align-items-center" id="activeFilterDiv1">
                                <h3 id="filterLabel" class="text-dark"></h3>
                            </div>
                            <div class="d-flex col-md-1 align-items-center" id="activeFilterDiv2">
                            </div>`;
    $('#mainBar').append(activeFilterDivs);
    $('#activeFilterDiv1').hide();
    $('#activeFilterDiv2').hide();
    
    // Sidebar toggle
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
    
    // Search bar toggle
    $('#searchInput').on('keyup', function () {
        var value = $(this).val().toLowerCase();
        $('#classList > .card').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
    
    // All Classes toggle
    $('#allClasses').on('click', function () {
        $('#classList > .card').show();
        $('#searchContainer').show();
    });
    
    // Location toggle
    $('#locationSubmenu > * > a').on('click', function () {
        var location = $(this).attr('id');
        $('#classList > .card').filter(function () {
            $(this).toggle($(this).find('.locationValue').text().toLowerCase() === location);
        });
        showFilter('Location', location.capitalize());
    });
    
    
    // toggle class cards when selecting muscle groups in the sidebar menu
    $('#muscleGroupSubmenu > * > a').on('click', function () {
        var muscleGroup = $(this).attr('id');
        $('#classList > .card').filter(function () {
            console.log($(this).find('.muscleGroupValue').text());
            $(this).toggle($(this).find('.muscleGroupValue').text().toLowerCase().indexOf(muscleGroup) > -1);
        });
        showFilter('Muscle Group', muscleGroup.capitalize());
    });
    
    // toggle class cards when selecting difficulty in the sidebar menu
    $('#difficultySubmenu > * > a').on('click', function () {
        var difficulty = $(this).attr('id');
        $('#classList > .card').filter(function () {
            console.log($(this).find('.difficultyValue').text());
            $(this).toggle($(this).find('.difficultyValue').text().toLowerCase() === difficulty);
        });
        showFilter('Difficulty level', difficulty.capitalize());
    });
    
    // toggle class cards when selecting the start time in the sidebar menu
    $('#startTimeSubmenu > * > a').on('click', function () {
        var timeInterval = $(this).attr('id').split("-").map(x=>+x);
        $('#classList > .card').filter(function () {
            $(this).toggle(+$(this).find('.startTimeValue').text().substr(0, 2) >= timeInterval[0] && +$(this).find('.startTimeValue').text().substr(0, 2) < timeInterval[1]);
        });
        showFilter('Start time', $(this).text().split(" ")[0].capitalize());
    });
    
    // toggle class cards when selecting the duration in the sidebar menu
    $('#durationSubmenu > * > a').on('click', function () {
        var durationInterval = $(this).attr('id').split("-").map(x=>+x);
        $('#classList > .card').filter(function () {
            $(this).toggle(+$(this).find('.durationValue').text().split(" ")[0] > durationInterval[0] && +$(this).find('.durationValue').text().split(" ")[0] <= durationInterval[1]);
        });
        showFilter('Duration', $(this).text().split("(")[0].trim().capitalize());
    });
    
    
    // toggle class cards when selecting the duration in the sidebar menu
    $('#dayOfTheWeekSubmenu > * > a').on('click', function () {
        var dayOfTheWeek = $(this).attr('id');
        $('#classList > .card').filter(function () {
            console.log($(this).find('.dayOfTheWeekValue').text().toLowerCase());
            $(this).toggle($(this).find('.dayOfTheWeekValue').text().toLowerCase() === dayOfTheWeek);
        });
        showFilter('Day of the Week', dayOfTheWeek.capitalize());
    });
    
    
});

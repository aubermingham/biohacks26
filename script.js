/**
 * Categories of app
 * Schedules - History - Visualizations - Alarms - Settings
 */

const COLOR_PRIMARY = "#FFFBFF";
const COLOR_ACCENT = "#F46036";
const COLOR_HIGHLIGHT = "#FCCA46";
const COLOR_DARK = "#390040";
const COLOR_MUTED = "#542344";

const phoneScreen = document.getElementById("phone-screen");

if (phoneScreen) {
	const app = document.createElement("main");
	app.className = "phone-app";
	app.style.setProperty("--color-primary", COLOR_PRIMARY);
	app.style.setProperty("--color-accent", COLOR_ACCENT);
	app.style.setProperty("--color-highlight", COLOR_HIGHLIGHT);
	app.style.setProperty("--color-dark", COLOR_DARK);
	app.style.setProperty("--color-muted", COLOR_MUTED);

	const categoryNav = document.createElement("nav");
	categoryNav.className = "category-nav";
	categoryNav.setAttribute("aria-label", "App categories");

	const categoryList = document.createElement("div");
	categoryList.className = "category-list";
	categoryList.setAttribute("role", "tablist");

	const content = document.createElement("div");
	content.id = "content";
	content.className = "app-content";
	content.setAttribute("role", "tabpanel");
	content.setAttribute("aria-live", "polite");

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const now = Date.now();
    const randomAlarmOffset = () => Math.floor(Math.random() * 6) * hour
        + Math.floor(Math.random() * 60) * minute;
    const alarmEvents = [
        {
            message: "Feed Line is Blocked",
            severity: "critical",
            triggeredAt: new Date(now - 8 * day - randomAlarmOffset())
        },
        {
            message: "Air Detected in Feed Set Line",
            severity: "warning",
            triggeredAt: new Date(now - 7 * day - randomAlarmOffset())
        },
        {
            message: "Feed Set Should Not be Connected to Patient While Priming",
            severity: "critical",
            triggeredAt: new Date(now - 5 * day - randomAlarmOffset())
        },
        {
            message: "Delete Feed Confirmation",
            severity: "info",
            triggeredAt: new Date(now - 4 * day - randomAlarmOffset())
        },
        {
            message: "Current Feed Program Overlaps Scheduled Feed",
            severity: "warning",
            triggeredAt: new Date(now - 2 * day - randomAlarmOffset())
        },
        {
            message: "Feed Program is Ready to Begin",
            severity: "info",
            triggeredAt: new Date(now - day - randomAlarmOffset())
        },
        {
            message: "Ending a Running Feed",
            severity: "warning",
            triggeredAt: new Date(now - 8 * hour - randomAlarmOffset())
        },
        {
            message: "Battery is Very Low (5%)",
            severity: "critical",
            triggeredAt: new Date(now - hour - randomAlarmOffset())
        },
        {
            message: "Critical System Error Occurred",
            severity: "critical",
            triggeredAt: new Date(now - 12 * minute - randomAlarmOffset())
        }
    ];

    function clearContent() {
        [...content.children].forEach((child) => child.remove());
    }

    function handleHomeClick() {
        clearContent();

        const homeHeader = document.createElement("header");
        homeHeader.className = "home-header";

        const homeDate = document.createElement("p");
        homeDate.className = "home-date";
        homeDate.textContent = new Date().toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric"
        });

        const homeTitle = document.createElement("h1");
        homeTitle.textContent = "Overview";

        const homeSubtitle = document.createElement("p");
        homeSubtitle.textContent = "Pump management application for patients and clinicians. Quickly review your next feed, today's progress, and your symptom rating.";
        homeHeader.append(homeDate, homeTitle, homeSubtitle);

        const alertSection = document.createElement("section");
        alertSection.className = "home-alert";
        const latestAlarm = [...alarmEvents]
            .sort((first, second) => second.triggeredAt - first.triggeredAt)[0];
        alertSection.dataset.severity = latestAlarm.severity;

        const alertLabel = document.createElement("p");
        alertLabel.className = "home-alert-label";
        alertLabel.textContent = latestAlarm.severity === "info" ? "Latest update" : "Latest alert";

        const alertTitle = document.createElement("h2");
        alertTitle.textContent = latestAlarm.message;

        const alertTime = document.createElement("p");
        alertTime.className = "home-alert-time";
        const elapsedMinutes = Math.max(1, Math.floor((Date.now() - latestAlarm.triggeredAt) / minute));
        const elapsedTime = elapsedMinutes < 60
            ? `${elapsedMinutes} minute${elapsedMinutes === 1 ? "" : "s"} ago`
            : `${Math.floor(elapsedMinutes / 60)} hour${Math.floor(elapsedMinutes / 60) === 1 ? "" : "s"} ago`;
        alertTime.textContent = `Triggered ${elapsedTime}`;

        const alarmButton = document.createElement("button");
        alarmButton.className = "home-action-button";
        alarmButton.type = "button";
        alarmButton.textContent = "Review alarms";
        alarmButton.addEventListener("click", () => {
            const alarmsTab = Array.from(categoryList.querySelectorAll(".category-button"))
                .find((button) => button.textContent === "Alarms");
            alarmsTab?.click();
        });

        alertSection.append(alertLabel, alertTitle, alertTime, alarmButton);

        const nextFeedSection = document.createElement("section");
        nextFeedSection.className = "home-section";

        const nextFeedHeading = document.createElement("div");
        nextFeedHeading.className = "home-section-heading";

        const nextFeedTitle = document.createElement("h2");
        nextFeedTitle.textContent = "Next feed";

        const todayLabel = document.createElement("span");
        todayLabel.textContent = "Today";
        nextFeedHeading.append(nextFeedTitle, todayLabel);

        const nextFeedCard = document.createElement("div");
        nextFeedCard.className = "home-feed-card";

        const feedName = document.createElement("p");
        feedName.className = "home-feed-name";
        feedName.textContent = "Weekday Routine";

        const feedTime = document.createElement("p");
        feedTime.className = "home-feed-time";
        feedTime.textContent = "12:00 PM";

        const feedDetails = document.createElement("div");
        feedDetails.className = "home-feed-details";
        feedDetails.innerHTML = "<span>Volume <strong>10 mL</strong></span><span>Rate <strong>8 mL/min</strong></span>";

        const scheduleButton = document.createElement("button");
        scheduleButton.className = "home-action-button home-action-secondary";
        scheduleButton.type = "button";
        scheduleButton.textContent = "View schedule";
        scheduleButton.addEventListener("click", () => {
            const schedulesTab = Array.from(categoryList.querySelectorAll(".category-button"))
                .find((button) => button.textContent === "Schedules");
            schedulesTab?.click();
        });

        nextFeedCard.append(feedName, feedTime, feedDetails, scheduleButton);
        nextFeedSection.append(nextFeedHeading, nextFeedCard);

        const symptomSection = document.createElement("section");
        symptomSection.className = "home-section home-symptom-section";

        const symptomTitle = document.createElement("h2");
        symptomTitle.className = "home-symptom-title";
        symptomTitle.textContent = "Rate your symptoms for today";

        const symptomPrompt = document.createElement("p");
        symptomPrompt.className = "home-symptom-prompt";
        symptomPrompt.textContent = "How severe have your symptoms felt today?";

        const ratingGroup = document.createElement("div");
        ratingGroup.className = "home-rating-options";
        ratingGroup.setAttribute("role", "group");
        ratingGroup.setAttribute("aria-label", "Today's symptom severity, from 1 mild to 5 severe");

        const ratingLabels = document.createElement("div");
        ratingLabels.className = "home-rating-labels";
        const mildLabel = document.createElement("span");
        mildLabel.textContent = "Mild";
        const severeLabel = document.createElement("span");
        severeLabel.textContent = "Severe";
        ratingLabels.append(mildLabel, severeLabel);

        const ratingStatus = document.createElement("p");
        ratingStatus.className = "home-rating-status";
        ratingStatus.setAttribute("role", "status");

        const saveRatingButton = document.createElement("button");
        saveRatingButton.className = "home-action-button home-rating-save";
        saveRatingButton.type = "button";
        saveRatingButton.textContent = "Save today's rating";
        saveRatingButton.disabled = true;

        let selectedRating = null;
        const ratingButtons = [];
        for (let rating = 1; rating <= 5; rating += 1) {
            const ratingButton = document.createElement("button");
            ratingButton.className = "home-rating-option";
            ratingButton.type = "button";
            ratingButton.textContent = String(rating);
            ratingButton.setAttribute("aria-label", `${rating} out of 5`);
            ratingButton.setAttribute("aria-pressed", "false");
            ratingButton.addEventListener("click", () => {
                selectedRating = rating;
                ratingButtons.forEach((button, index) => {
                    const isSelected = index + 1 === selectedRating;
                    button.setAttribute("aria-pressed", String(isSelected));
                    button.classList.toggle("is-selected", isSelected);
                });
                saveRatingButton.disabled = false;
                ratingStatus.textContent = "";
            });
            ratingButtons.push(ratingButton);
            ratingGroup.append(ratingButton);
        }

        saveRatingButton.addEventListener("click", () => {
            if (selectedRating !== null) {
                ratingStatus.textContent = `Today's symptom rating saved: ${selectedRating} out of 5.`;
            }
        });

        symptomSection.append(
            symptomTitle,
            symptomPrompt,
            ratingGroup,
            ratingLabels,
            saveRatingButton,
            ratingStatus
        );

        const progressSection = document.createElement("section");
        progressSection.className = "home-section home-progress-section";

        const progressHeading = document.createElement("div");
        progressHeading.className = "home-section-heading";

        const progressTitle = document.createElement("h2");
        progressTitle.textContent = "Today's progress";

        const progressCount = document.createElement("span");
        progressCount.textContent = "1 of 3 feeds";
        progressHeading.append(progressTitle, progressCount);

        const progressBar = document.createElement("progress");
        progressBar.className = "home-progress-bar";
        progressBar.max = 3;
        progressBar.value = 1;
        progressBar.setAttribute("aria-label", "One of three feeds completed");

        const progressTimes = document.createElement("p");
        progressTimes.className = "home-progress-times";
        progressTimes.textContent = "Completed 7:00 AM · Next 12:00 PM";

        progressSection.append(progressHeading, progressBar, progressTimes);
        content.append(homeHeader, alertSection, nextFeedSection, symptomSection, progressSection);
    }

	function handleSchedulesClick() {
        clearContent();

        const schedulesTitle = document.createElement("h1");
        schedulesTitle.textContent = "Schedules";
        schedulesTitle.classList.add('visualizations-title');
        content.appendChild(schedulesTitle);
		
        const schedulesLabel = document.createElement("p");
        schedulesLabel.classList.add('visualizations-intro');
        schedulesLabel.textContent = "View and manage your schedules below.";
        content.appendChild(schedulesLabel);

        let schedulesList = [
            {
                name: "Weekday Routine",
                days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                times: [
                    {
                        timeBegin: "07:00 AM",
                        timeEnd: "07:02 AM",
                        volume: "10mL",
                        rate: "8mL/min"
                    },
                    {
                        timeBegin: "12:00 PM",
                        timeEnd: "12:02 PM",
                        volume: "10mL",
                        rate: "7mL/min"
                    },
                    {
                        timeBegin: "06:00 PM",
                        timeEnd: "06:02 PM",
                        volume: "10mL",
                        rate: "5mL/min"
                    }
                ]
            },
            {
                name: "Weekend Routine",
                days: ["Saturday", "Sunday"],
                times: [
                    {
                        timeBegin: "09:00 AM",
                        timeEnd: "09:02 AM",
                        volume: "8mL",
                        rate: "5mL/min"
                    },
                    {
                        timeBegin: "01:00 PM",
                        timeEnd: "01:02 PM",
                        volume: "15mL",
                        rate: "4mL/min"
                    },
                    {
                        timeBegin: "08:00 PM",
                        timeEnd: "08:02 PM",
                        volume: "9mL",
                        rate: "5mL/min"
                    }
                ]
            }
        ]

        for(let schedule of schedulesList) {
            const scheduleDiv = document.createElement("div");
            scheduleDiv.className = "schedule-item";
            //scheduleDiv.style.border = `1px solid ${COLOR_ACCENT}`;
            scheduleDiv.innerHTML = `
                <h3>${schedule.name}</h3>
                <p>Days: ${schedule.days.join(", ")}</p>
                <p>Meal Times:</p>
                <ul>
                    ${schedule.times.map(time => `<li>${time.timeBegin} - ${time.timeEnd} ${time.volume} @ ${time.rate}</li>`).join("")}
                </ul>
            `;
            content.appendChild(scheduleDiv);
        }

	}

	function handleHistoryClick() {
        clearContent();

        const historyTitle = document.createElement("h1");
        historyTitle.textContent = "Trends";
        content.appendChild(historyTitle);

        const historyLevels = [
            { value: 1, label: "None", color: "#FFFBFF", textColor: COLOR_DARK },
            { value: 2, label: "Minimal", color: "#DCEBFF", textColor: COLOR_DARK },
            { value: 3, label: "Moderate", color: "#9CC5FF", textColor: COLOR_DARK },
            { value: 4, label: "Severe", color: "#4C8DDA", textColor: COLOR_PRIMARY },
            { value: 5, label: "Significant", color: "#24558A", textColor: COLOR_PRIMARY }
        ];
        const dayLevels = [
            1, 3, 2, 4, 1, 5, 2, 3, 1, 4, 2, 2, 5, 3, 1, 4,
            3, 2, 1, 5, 4, 2, 3, 1, 4, 5, 2, 3, 1, 4, 2
        ];
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstWeekday = new Date(year, month, 1).getDay();
        const mondayOffset = (firstWeekday + 6) % 7;

        const title = document.createElement("h2");
        title.className = "history-title";
        title.textContent = today.toLocaleDateString(undefined, {
            month: "long",
            year: "numeric"
        });

        const legend = document.createElement("div");
        legend.className = "history-legend";
        legend.setAttribute("aria-label", "History color key");

        historyLevels.forEach((level) => {
            const keyItem = document.createElement("div");
            keyItem.className = "history-key-item";

            const swatch = document.createElement("span");
            swatch.className = "history-swatch";
            swatch.style.backgroundColor = level.color;
            swatch.setAttribute("aria-hidden", "true");

            const keyLabel = document.createElement("span");
            keyLabel.textContent = `${level.value} = ${level.label}`;

            keyItem.append(swatch, keyLabel);
            legend.append(keyItem);
        });

        const calendar = document.createElement("div");
        calendar.className = "history-calendar";
        calendar.setAttribute("role", "grid");
        calendar.setAttribute("aria-label", `History for ${title.textContent}`);

        ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((dayName) => {
            const weekday = document.createElement("span");
            weekday.className = "history-weekday";
            weekday.setAttribute("role", "columnheader");
            weekday.textContent = dayName;
            calendar.append(weekday);
        });

        for (let blankDay = 0; blankDay < mondayOffset; blankDay += 1) {
            const blankCell = document.createElement("span");
            blankCell.className = "history-day history-day-empty";
            blankCell.setAttribute("aria-hidden", "true");
            calendar.append(blankCell);
        }

        for (let day = 1; day <= daysInMonth; day += 1) {
            const value = dayLevels[(day - 1) % dayLevels.length];
            const level = historyLevels.find((item) => item.value === value);
            const dayCell = document.createElement("span");
            dayCell.className = "history-day";
            dayCell.setAttribute("role", "gridcell");
            dayCell.textContent = String(day);
            dayCell.title = `Day ${day}: level ${level.value} (${level.label})`;
            dayCell.style.backgroundColor = level.color;
            dayCell.style.color = level.textColor;
            dayCell.style.borderColor = level.value === 1 ? "#D8D3DA" : level.color;
            calendar.append(dayCell);
        }

        content.append(title, legend, calendar);

        const archiveButton = document.createElement("button");
        archiveButton.className = "archive-button";
        archiveButton.type = "button";
        archiveButton.textContent = "View Archive";

        archiveButton.addEventListener("click", () => {
            alert("Archive feature is not implemented yet.");
        });

        content.append(archiveButton);
	}

	function handleVisualizationsClick() {
        clearContent();

        const graphs = [
            {
                title: "Calories delivered per day",
                xValues: [0,1,2,3,4,5,6], 
                yValues: [1800, 2000, 1900, 2100, 2200, 2000, 2300] 
            },
            {
                title: "Feeding intolerance risk scoring",
                xValues: [0,1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 
                yValues: [0.1,0.1,0.2,0.1,0.1,0.3,0.2,0.1,0.1,0.2,0.3,0.4,0.5,0.4,0.3,0.2,0.1,0.1,0.2,0.1] 
            }
        ];

        const title = document.createElement("h1");
        title.className = "visualizations-title";
        title.textContent = "Visualizations";

        const instructions = document.createElement("p");
        instructions.className = "visualizations-intro";
        instructions.textContent = "Insights for clinicians and patients";

        const chartList = document.createElement("div");
        chartList.className = "visualizations-list";

        const svgNamespace = "http://www.w3.org/2000/svg";
        const createSvgElement = (name, attributes = {}) => {
            const element = document.createElementNS(svgNamespace, name);
            Object.entries(attributes).forEach(([attribute, value]) => {
                element.setAttribute(attribute, String(value));
            });
            return element;
        };

        graphs.forEach((graph, graphIndex) => {
            const chart = document.createElement("section");
            chart.className = "visualization-chart";

            const chartTitle = document.createElement("h2");
            chartTitle.className = "visualization-chart-title";
            chartTitle.textContent = graph.title;
            chart.append(chartTitle);

            const chartBody = document.createElement("div");
            chartBody.className = "visualization-chart-body";

            if (graph.xValues.length === 0 && graph.yValues.length === 0) {
                const emptyState = document.createElement("p");
                emptyState.className = "chart-empty-state";
                emptyState.textContent = "Your line graph will appear here.";
                chartBody.append(emptyState);
            } else if (
                graph.xValues.length !== graph.yValues.length
                || graph.xValues.length < 2
                || !graph.xValues.every(Number.isFinite)
                || !graph.yValues.every(Number.isFinite)
            ) {
                const error = document.createElement("p");
                error.className = "chart-error";
                error.textContent = "Enter at least two matching numeric X and Y values.";
                chartBody.append(error);
            } else {
                const svgWidth = 320;
                const svgHeight = 190;
                const plot = { left: 42, right: 308, top: 14, bottom: 154 };
                const minX = Math.min(...graph.xValues);
                const maxX = Math.max(...graph.xValues);
                const minY = Math.min(...graph.yValues);
                const maxY = Math.max(...graph.yValues);
                const xRange = maxX - minX || 1;
                const yRange = maxY - minY || 1;
                const points = graph.xValues.map((xValue, index) => ({
                    x: plot.left + ((xValue - minX) / xRange) * (plot.right - plot.left),
                    y: plot.bottom - ((graph.yValues[index] - minY) / yRange) * (plot.bottom - plot.top)
                }));

                const svg = createSvgElement("svg", {
                    class: "line-chart-svg",
                    viewBox: `0 0 ${svgWidth} ${svgHeight}`,
                    role: "img",
                    "aria-label": `${graph.title} line chart`
                });

                for (let tick = 0; tick <= 4; tick += 1) {
                    const fraction = tick / 4;
                    const gridY = plot.top + fraction * (plot.bottom - plot.top);
                    const gridX = plot.left + fraction * (plot.right - plot.left);
                    const yValue = maxY - fraction * (maxY - minY);
                    const xValue = minX + fraction * (maxX - minX);

                    svg.append(
                        createSvgElement("line", {
                            x1: plot.left,
                            y1: gridY,
                            x2: plot.right,
                            y2: gridY,
                            class: "chart-grid-line"
                        }),
                        createSvgElement("line", {
                            x1: gridX,
                            y1: plot.top,
                            x2: gridX,
                            y2: plot.bottom,
                            class: "chart-grid-line"
                        })
                    );

                    const yTickLabel = createSvgElement("text", {
                        x: plot.left - 7,
                        y: gridY + 3,
                        class: "chart-axis-label",
                        "text-anchor": "end"
                    });
                    yTickLabel.textContent = Number(yValue.toPrecision(3)).toString();

                    const xTickLabel = createSvgElement("text", {
                        x: gridX,
                        y: plot.bottom + 17,
                        class: "chart-axis-label",
                        "text-anchor": "middle"
                    });
                    xTickLabel.textContent = Number(xValue.toPrecision(3)).toString();
                    svg.append(yTickLabel, xTickLabel);
                }

                svg.append(
                    createSvgElement("line", {
                        x1: plot.left,
                        y1: plot.top,
                        x2: plot.left,
                        y2: plot.bottom,
                        class: "chart-axis-line"
                    }),
                    createSvgElement("line", {
                        x1: plot.left,
                        y1: plot.bottom,
                        x2: plot.right,
                        y2: plot.bottom,
                        class: "chart-axis-line"
                    })
                );

                const linePath = points
                    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`)
                    .join(" ");
                svg.append(createSvgElement("path", {
                    d: linePath,
                    class: `chart-line chart-line-${graphIndex + 1}`
                }));

                points.forEach((point) => {
                    svg.append(createSvgElement("circle", {
                        cx: point.x,
                        cy: point.y,
                        r: 3,
                        class: `chart-point chart-point-${graphIndex + 1}`
                    }));
                });

                chartBody.append(svg);
            }

            chart.append(chartBody);
            chartList.append(chart);
        });

        const generateButton = document.createElement("button");
        generateButton.className = "home-action-button visualizations-generate-button";
        generateButton.type = "button";
        generateButton.textContent = "Generate visualization...";

        content.append(title, instructions, chartList, generateButton);
	}

	function handleAlarmsClick() {
        clearContent();

        const title = document.createElement("h1");
        title.className = "alarm-history-title";
        title.textContent = "Alarm History";

        const alarmList = document.createElement("div");
        alarmList.className = "alarm-list";
        alarmList.setAttribute("aria-label", "Alarm trigger history");

        [...alarmEvents]
            .sort((first, second) => second.triggeredAt - first.triggeredAt)
            .forEach((event) => {
                const alarmItem = document.createElement("article");
                alarmItem.className = "alarm-event";
                alarmItem.dataset.severity = event.severity;

                const heading = document.createElement("div");
                heading.className = "alarm-event-heading";

                const message = document.createElement("h2");
                message.className = "alarm-event-message";
                message.textContent = event.message;

                const severity = document.createElement("span");
                severity.className = "alarm-event-severity";
                severity.textContent = event.severity;

                const triggeredAt = document.createElement("time");
                triggeredAt.className = "alarm-event-time";
                triggeredAt.dateTime = event.triggeredAt.toISOString();
                triggeredAt.textContent = event.triggeredAt.toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit"
                });

                heading.append(message, severity);
                alarmItem.append(heading, triggeredAt);
                alarmList.append(alarmItem);
            });

        content.append(title, alarmList);
	}

	function handleSettingsClick() {
        clearContent();

        const title = document.createElement("h1");
        title.className = "settings-title";
        title.textContent = "Settings";

        const intro = document.createElement("p");
        intro.className = "settings-intro";
        intro.textContent = "Manage device alerts and display preferences.";

        const notificationSection = document.createElement("section");
        notificationSection.className = "settings-section";

        const notificationHeading = document.createElement("h2");
        notificationHeading.className = "settings-section-title";
        notificationHeading.textContent = "Notifications";
        notificationSection.append(notificationHeading);

        const notificationOptions = [
            { label: "Alarm notifications", description: "Receive system and feed alerts", checked: true },
            { label: "Sound alerts", description: "Play a tone when an alarm occurs", checked: true },
            { label: "Vibration", description: "Vibrate for critical alerts", checked: false }
        ];

        notificationOptions.forEach((option) => {
            const row = document.createElement("label");
            row.className = "settings-toggle-row";

            const text = document.createElement("span");
            text.className = "settings-row-text";

            const label = document.createElement("strong");
            label.textContent = option.label;

            const description = document.createElement("span");
            description.textContent = option.description;
            text.append(label, description);

            const toggle = document.createElement("input");
            toggle.type = "checkbox";
            toggle.checked = option.checked;
            toggle.setAttribute("aria-label", option.label);

            row.append(text, toggle);
            notificationSection.append(row);
        });

        const soundSection = document.createElement("section");
        soundSection.className = "settings-section";

        const soundHeading = document.createElement("h2");
        soundHeading.className = "settings-section-title";
        soundHeading.textContent = "Alert volume";

        const volumeRow = document.createElement("div");
        volumeRow.className = "settings-volume-row";

        const volumeSlider = document.createElement("input");
        volumeSlider.id = "alert-volume";
        volumeSlider.type = "range";
        volumeSlider.min = "0";
        volumeSlider.max = "100";
        volumeSlider.value = "65";

        const volumeOutput = document.createElement("output");
        volumeOutput.htmlFor = volumeSlider.id;
        volumeOutput.textContent = `${volumeSlider.value}%`;
        volumeSlider.setAttribute("aria-label", "Alert volume");
        volumeSlider.addEventListener("input", () => {
            volumeOutput.textContent = `${volumeSlider.value}%`;
        });

        volumeRow.append(volumeSlider, volumeOutput);
        soundSection.append(soundHeading, volumeRow);

        const displaySection = document.createElement("section");
        displaySection.className = "settings-section";

        const displayHeading = document.createElement("h2");
        displayHeading.className = "settings-section-title";
        displayHeading.textContent = "Display";

        const unitsRow = document.createElement("label");
        unitsRow.className = "settings-select-row";

        const unitsText = document.createElement("span");
        unitsText.className = "settings-row-text";
        const unitsLabel = document.createElement("strong");
        unitsLabel.textContent = "Volume units";
        const unitsDescription = document.createElement("span");
        unitsDescription.textContent = "Choose how feed volumes are shown";
        unitsText.append(unitsLabel, unitsDescription);

        const unitsSelect = document.createElement("select");
        unitsSelect.setAttribute("aria-label", "Volume units");
        ["mL", "fl oz"].forEach((unit) => {
            const option = document.createElement("option");
            option.value = unit;
            option.textContent = unit;
            unitsSelect.append(option);
        });
        unitsRow.append(unitsText, unitsSelect);
        displaySection.append(displayHeading, unitsRow);

        const deviceSection = document.createElement("section");
        deviceSection.className = "settings-section settings-device-section";

        const deviceHeading = document.createElement("h2");
        deviceHeading.className = "settings-section-title";
        deviceHeading.textContent = "Device";

        const deviceInfo = document.createElement("dl");
        deviceInfo.className = "settings-device-info";
        [
            ["Status", "Connected"],
            ["Model", "Vesco Q Pump"],
            ["Software", "Version 2.4.1"]
        ].forEach(([term, value]) => {
            const termElement = document.createElement("dt");
            termElement.textContent = term;
            const valueElement = document.createElement("dd");
            valueElement.textContent = value;
            deviceInfo.append(termElement, valueElement);
        });

        deviceSection.append(deviceHeading, deviceInfo);
        content.append(title, intro, notificationSection, soundSection, displaySection, deviceSection);
	}

	const categories = [
		{ label: "Home", handler: handleHomeClick },
		{ label: "Schedules", handler: handleSchedulesClick },
		{ label: "History", handler: handleHistoryClick },
		{ label: "Visualizations", handler: handleVisualizationsClick },
		{ label: "Alarms", handler: handleAlarmsClick },
		{ label: "Settings", handler: handleSettingsClick }
	];

    const tabExplanations = {
        Home: "<p>This page provides a quick overview of the system. However, the most important part is the symptom rating: in a real environment, multiple categories of symptoms should be collected to best draw conclusions on how to optimize the patient's nutrition. Future tabs could include exact collections on the nutritional macros delivered for easy management.</p><img src=\"assets/tech-stack-diagram.png\"/>",
        Schedules: "<p>This quick overview of feeding schedules are dynamically modified by machine learning models to control rate and volume adjustments.</p><img src=\"assets/ml-periodic-diagram.png\" /><img src=\"assets/ml-continuous-diagram.png\" />",
        History: "<p>This calendar presents a quick monthly view of symptom levels per day, and could also be modified to include other information such as nutrition provided.</p>",
        Visualizations: "<p>These graphs are examples of possible trends that could be useful in analysis for clinical practice.<br /><br /><br />Using machine learning algorithms in enteral nutrition has already promising results in the literature, so we believe their application has some potential for accurate polished solutions. See the papers here:</p><ul><li><a href=\"https://www.nature.com/articles/s41467-025-66200-1\">NutriSighT: Interpretable Transformer Model for Dynamic Prediction of Underfeeding Enteral Nutrition in Mechanically Ventilated Patients</a></li><li><a href=\"https://pmc.ncbi.nlm.nih.gov/articles/PMC12237648/\" target=\"_blank\">Machine learning-based predictive model for enteral nutrition-associated diarrhea in ICU patients and its nursing applications</a></li><li><a href=\"https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6340580\" target=\"_blank\">Explainable Machine Learning to Predict Enteral Feeding Intolerance in Critically Ill Patients: A Retrospective Cohort Study of Whey Peptide-Based and Standard Formulas</a></li></ul>",
        Alarms: "<p>This feature is here to help the user have all information replicated on both the pump and the application, allowing for seamless information access anywhere.</p>",
        Settings: "<p>Simple settings for customizing the app.</p>"
    };

    const helpToggle = document.createElement("button");
    helpToggle.className = "tab-help-toggle";
    helpToggle.type = "button";
    helpToggle.textContent = "!";
    helpToggle.setAttribute("aria-label", "Show tab explanation");
    helpToggle.setAttribute("aria-controls", "tab-help-panel");
    helpToggle.setAttribute("aria-expanded", "false");

    const helpPanel = document.createElement("aside");
    helpPanel.id = "tab-help-panel";
    helpPanel.className = "tab-help-panel";
    helpPanel.setAttribute("aria-live", "polite");
    helpPanel.hidden = true;

    const helpHeading = document.createElement("h2");
    helpHeading.className = "tab-help-heading";

    const helpDescription = document.createElement("p");
    helpDescription.className = "tab-help-description";
    helpPanel.append(helpHeading, helpDescription);

    function updateTabExplanation(label) {
        helpHeading.textContent = `${label} explanation`;
        helpDescription.innerHTML = tabExplanations[label];
    }

    updateTabExplanation(categories[0].label);

    helpToggle.addEventListener("click", () => {
        helpPanel.hidden = !helpPanel.hidden;
        helpToggle.setAttribute("aria-expanded", String(!helpPanel.hidden));
        helpToggle.setAttribute(
            "aria-label",
            helpPanel.hidden ? "Show tab explanation" : "Hide tab explanation"
        );
    });

	categories.forEach((category, index) => {
		const button = document.createElement("button");
		button.className = "category-button";
		button.type = "button";
		button.id = `category-${index}`;
		button.textContent = category.label;
		button.setAttribute("role", "tab");
		button.setAttribute("aria-controls", content.id);
		button.setAttribute("aria-selected", String(index === 0));
		button.tabIndex = index === 0 ? 0 : -1;

		button.addEventListener("click", () => {
			categoryList.querySelectorAll(".category-button").forEach((item) => {
				item.setAttribute("aria-selected", "false");
				item.tabIndex = -1;
			});

			button.setAttribute("aria-selected", "true");
			button.tabIndex = 0;
			category.handler();
            updateTabExplanation(category.label);
		});

		categoryList.append(button);
	});

	categoryNav.append(categoryList);
	app.append(categoryNav, content);
	phoneScreen.replaceChildren(app);
    phoneScreen.parentElement.append(helpToggle, helpPanel);

    handleHomeClick(); // Initialize with Home content
} else {
	console.error('Phone app could not start: missing element with id "phone-screen".');
}
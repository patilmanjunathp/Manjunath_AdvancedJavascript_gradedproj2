let url ='https://raw.githubusercontent.com/patilmanjunathp/Manjunath_AdvancedJavascript_gradedproj2/main/Manjunath_AdvancedJavascript_gradedproj2/Data.json'
let nextButton = document.querySelector(".next");
let prevButton = document.querySelector(".previous");
let searchBox = document.querySelector(".search-box");
let page = 0;
let searchJson = {}
let isSearch = false

nextButton.addEventListener('click', handleNext);
prevButton.addEventListener('click', handlePrevious);
searchBox.addEventListener('keypress', handleSearch);

window.onload = function() {
	fetch(url)
	    .then((response) => response.json())
		.then((jsonData) => { showDetails(page,jsonData); });
}; 


function handleNext(evt){
    page = page + 1
	fetch(url)
	    .then((response) => response.json())
		.then((jsonData) => { showDetails(page,jsonData); });
}

function handlePrevious(evt){

    page = page - 1
	fetch(url)
	    .then((response) => response.json())
		.then((jsonData) => { showDetails(page,jsonData); });
}

function handleSearch(evt){
	if (evt.keyCode == 13){
		fetch(url)
	    	.then((response) => response.json())
			.then((jsonData) => { searchJob(searchBox.value,jsonData); });	
    }
}

function changeStyle(className,styleToChange){
	var bg = document.getElementsByClassName(className);
	for(var i = 0; i < bg.length; i++) { 
		bg[i].style.display=styleToChange
	}
}

function searchJob(job, jsonData){
	searchJson['resume'] = []
	numberofResume = 0
	page = 0
	if (job == ""){
		isSearch = false
		jsonResponse = jsonData
		numberofResume = jsonResponse.resume.length;
		changeStyle('container','inline-block')
		changeStyle('error','none')
		page = 0;
		showDetails(page, jsonResponse);
	}
	else {
		for (let i=0; i < jsonData['resume'].length; i++){
			appliedForInResume = jsonData['resume'][i]['basics']['AppliedFor']
			if (appliedForInResume.toLowerCase() === job.toLowerCase()){
				searchJson['resume'].push(jsonData['resume'][i])
			}
		}
		if (searchJson['resume'].length != 0){
			isSearch = true
			numberofResume = searchJson.resume.length;
			showDetails(page, searchJson);
		}
		else{
			changeStyle('container','none')
			changeStyle('error','inline-block')
			changeStyle('previous','none')
			changeStyle('next','none')
		}
	}
}

function showDetails(pageNumber,jsonResponse){
	id = pageNumber
	numberofResume = jsonResponse.resume.length;
	if (isSearch == true){
		jsonResponse = searchJson
		numberofResume = searchJson.resume.length;
	}
	changeStyle('previous','none')
	changeStyle('next','none')
	if (jsonResponse['resume'].length == 1){
		changeStyle('previous','none')
		changeStyle('next','none')
	}
	else if (pageNumber == 0){
		changeStyle('container','inline-block')
		changeStyle('error','none')
		changeStyle('next','inline-block')
	}
	else if (pageNumber == numberofResume - 1){
		changeStyle('previous','inline-block')
	}
	else {
		changeStyle('previous','inline-block')
		changeStyle('next','inline-block')
	}
	//top-side
	nameCandidate = jsonResponse['resume'][id]['basics']['name']
	appliedFor = jsonResponse['resume'][id]['basics']['AppliedFor']
	document.getElementById('name').innerText = nameCandidate
	document.getElementById('applied-for').innerText = "Applied for:" + appliedFor


	//personal info
	basicInfo = jsonResponse['resume'][id]['basics']
	personalInfo = "<li>" + basicInfo['phone'] + "</li>"  
				+ "<li>" + basicInfo['email'] + "</li>"  
				+ "<a href=\"" + basicInfo['profiles']['url'] + "\">" + "LinkedIn" + "</a>"
	document.getElementById('personal-info').innerHTML = personalInfo

	//technical skill
	technicalSkillValues = jsonResponse['resume'][id]['skills']['keywords']
	technicalSkill = '' 
	for (let i = 0; i < technicalSkillValues.length; i++) { 
		technicalSkill = technicalSkill + "<li>" + technicalSkillValues[i] + "</li>"
	}
	document.getElementById('technical-skills').innerHTML = technicalSkill

	//hobbies 
	hobbiesValues = jsonResponse['resume'][id]['interests']['hobbies']
	hobbies = ''
	for (let i = 0; i < hobbiesValues.length; i++) { 
		hobbies = hobbies + "<li>" + hobbiesValues[i] + "</li>"
	}
	document.getElementById('hobbies').innerHTML = hobbies

	//work experience
	workExperienceValues = jsonResponse['resume'][id]['work']
	workExperience = "<li><b>Company Name:</b>" + workExperienceValues['Company Name'] + "</li>"
					+ "<li><b>Position:</b>" + workExperienceValues['Position'] + "</li>"
					+ "<li><b>Start Date:</b>" + workExperienceValues['Start Date'] + "</li>"
					+ "<li><b>End Date:</b>" + workExperienceValues['End Date'] + "</li>"
					+ "<li><b>Summary:</b>" + workExperienceValues['Summary'] + "</li>"
	document.getElementById('workexperience').innerHTML = workExperience

	//Projects
	projectValues = jsonResponse['resume'][id]['projects']
	project = "<li><b>" + projectValues['name'] + ":</b>" + projectValues['description'] + "</li>"
	document.getElementById('projects').innerHTML = project

	//Education
	educationValues = jsonResponse['resume'][id]['education']
	education = ''
	Object.entries(educationValues).forEach((entry) => {
		const [eductaionStage, stageValue] = entry;
		stageValueConcat = '';
		Object.entries(stageValue).forEach((valueEntry) => {
			const [key, value] = valueEntry;
			stageValueConcat =  stageValueConcat + value + ", "
		});
		education = education + "<li><b>" + eductaionStage + ": </b>" + stageValueConcat + "</li>"
	}); 
	document.getElementById('education').innerHTML = education

	//Internship
	internshipValues = jsonResponse['resume'][id]['Internship']
	internship = ''
	Object.entries(internshipValues).forEach((entry) => {
		const [type, value] = entry;
		internship = internship + "<li><b>" + type + ": </b>" + value + "</li>"
	}); 
	document.getElementById('internship').innerHTML = internship

	//Achievements
	achievementsValues = jsonResponse['resume'][id]['achievements']['Summary']
	achievements = ''
	for (let i = 0; i < achievementsValues.length; i++) { 
		achievements = achievements + "<li>" + achievementsValues[i] + "</li>"
	}
	document.getElementById('achievements').innerHTML = achievements	
}

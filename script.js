function selectYear(year) {
    document.getElementById('second-year-container').style.display = 'none';
    if (year === 'second') {
        document.getElementById('second-year-container').style.display = 'block';
    }
}

document.getElementById('add-subject-btn').addEventListener('click', function() {
    const subjectRow = document.createElement('div');
    subjectRow.classList.add('subject-row');

    const subjectSelect = document.createElement('select');
    subjectSelect.innerHTML = `
        <option value="" disabled selected>Select Subject</option>
        <option value="DAA">Design and Analysis of Algorithms</option>
        <option value="MSAT">Measurement Science and Techniques</option>
        <option value="CN">Computer Networks</option>
        <option value="AI">Artificial Intelligence</option>
        <option value="DBMS">Database Management Systems</option>
        <option value="MANPRO">Manufacturing Processes</option>
        <option value="EDP2">Engineering Design Project - 2</option>
    `;
    subjectRow.appendChild(subjectSelect);

    const gradeSelect = document.createElement('select');
    gradeSelect.innerHTML = `
        <option value="" disabled selected>Select Grade</option>
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C">C</option>
        <option value="E">E</option>
    `;
    subjectRow.appendChild(gradeSelect);

    document.getElementById('subjects-container').appendChild(subjectRow);
});

document.getElementById('calculate-btn').addEventListener('click', function() {
    const subjectsContainer = document.getElementById('subjects-container');
    const subjectRows = subjectsContainer.getElementsByClassName('subject-row');
    let subjects = [];
    let grades = [];
    let gradeFactors = {"A+" : 10, "A" : 10, "A-" : 9, "B" : 8, "B-" : 7, "C" : 6, "E" : 5};
    let credits = {"DAA" : 4, "MSAT" : 4, "AI" : 4, "CN" : 3, "MANPRO" : 3, "DBMS" : 4, "EDP2" : 3};

    for (let row of subjectRows) {
        let subjectSelect = row.getElementsByTagName('select')[0];
        let gradeSelect = row.getElementsByTagName('select')[1];
        if (subjectSelect.value && gradeSelect.value) {
            subjects.push(credits[subjectSelect.value]);
            grades.push(gradeFactors[gradeSelect.value]);
        }
    }

    let gpa = calculateGPA(subjects, grades);

    document.getElementById('gpa-result').textContent = gpa.toFixed(2);
    document.getElementById('result-container').style.display = 'block';

    if (gpa >= 9.50) {
        document.getElementById('music').src = "./assets/King baldwin song.mp3";
        document.getElementById('music').play();
        document.getElementById('cat-image').src = "./assets/king-baldwin.gif";
    }
    else if (gpa <= 8.00) {
        document.getElementById('music').src = "./assets/sad-music.mp3";
        document.getElementById('music').play();
        document.getElementById('cat-image').src = "./assets/sad-cat.png";
    }
    else if (gpa > 8.00) {
        document.getElementById('music').src = "./assets/Happi song.mp3";
        document.getElementById('music').play();
        document.getElementById('cat-image').src = "./assets/happy.gif";
    }
});

function calculateGPA(subjects, grades) {
    // GPA calculation logic
    if (grades.length === 0) return 0;
    let gpa = 0;
    let sum = 0;
    let cred = 0;
    for (let i=0; i < subjects.length; i++) {
        sum += (subjects[i] * grades[i]);
        cred += subjects[i];
    }
    gpa = sum / cred;
    return gpa;
}

// // Close the modal when the user clicks on X
// document.getElementsByClassName('close-btn')[0].onclick = function() {
//     document.getElementById('gpa-modal').style.display = 'none';
// }

// // Close the modal when the user clicks anywhere outside of the modal
// window.onclick = function(event) {
//     if (event.target === document.getElementById('gpa-modal')) {
//         document.getElementById('gpa-modal').style.display = 'none';
//     }
// }
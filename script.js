document.addEventListener('DOMContentLoaded', () => {
  // 🎯 Persisted Fields
  const fields = ['Name', 'email', 'DOB', 'phone', 'Address', 'Hobbies', 'language', 'linkedin', 'education_10', 'education_12', 'education_Degree', 'skills', 'experienceContainer', 'projectContainer', 'certificationContainer'];

  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    const storedValue = localStorage.getItem(id);
    if (storedValue) el.value = storedValue;

    el.addEventListener('input', e => {
      localStorage.setItem(id, e.target.value);
    });
  });

  // 🌗 Theme Persistence
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);

  // 🖼️ Profile Picture Load
  const profilePicPreview = document.getElementById('profilePicPreview');
  const savedPic = localStorage.getItem('profilePic');

  if (savedPic && profilePicPreview) {
    profilePicPreview.src = savedPic;
    profilePicPreview.style.display = 'block';
  }

  const profilePicInput = document.getElementById('profilePicInput');
  if (profilePicInput && profilePicPreview) {
    profilePicInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (event) {
        const dataURL = event.target.result;
        localStorage.setItem('profilePic', dataURL);
        profilePicPreview.src = dataURL;
        profilePicPreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    });
  }
});

// 🌗 Toggle Theme
function toggleTheme() {
  const newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// ✅ Validate Form Fields
function validate() {
  let valid = true;
  const requiredFields = ['Name', 'email', 'phone', 'DOB', 'Address', 'language', 'Hobbies', 'educationContainer', 'education_10', 'education_12', 'education_Degree', 'skills'];

  requiredFields.forEach(id => {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) {
      el?.classList.add('invalid');
      valid = false;
    } else {
      el.classList.remove('invalid');
    }
  });

  return valid;
}

function generateResume() {
  // Validate basic fields
  const name = document.getElementById('Name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const dob = document.getElementById('DOB').value;
  const address = document.getElementById('Address').value;
  const language = document.getElementById('language').value;
  const hobbies = document.getElementById('Hobbies').value;
  const skills = document.getElementById('skills').value;

  if (!name || !email || !phone || !dob || !address || !language || !hobbies || !skills) {
    alert("Please fill all required fields.");
    return;
  }

  // Populate resume
  document.getElementById('rName').innerText = name;
  document.getElementById('remail').innerText = email;
  document.getElementById('rphone').innerText = phone;
  document.getElementById('rDOB').innerText = dob;
  document.getElementById('rAddress').innerText = address;
  document.getElementById('rlanguage').innerText = language;
  document.getElementById('rHobbies').innerText = hobbies;
  document.getElementById('rSkills').innerText = skills;

  // Optional: experience, projects, certifications
  document.getElementById('rExperience').innerText = document.getElementById('experienceContainer').value || '';
  document.getElementById('rProjects').innerText = document.getElementById('projectContainer').value || '';
  document.getElementById('rCertifications').innerText = document.getElementById('certificationContainer').value || '';

  updateResume();

  // Show resume
  const resume = document.getElementById('resume');
  resume.style.display = 'block';
  resume.scrollIntoView({ behavior: 'smooth' });

  const download = document.getElementById('download-btn');
  download.style.display = 'block';
}


// 📚 Add Education Entry
function addEducation() {
  const educationContainer = document.getElementById('educationContainer');
  if (!educationContainer) return;

  const div = document.createElement('div');
  div.className = 'education-item';
  div.style.marginBottom = '8px';
  div.innerHTML = `
    <input type="text" placeholder="School/University" class="edu-school" style="width:45%; margin-right: 5%;"/> 
    <input type="text" placeholder="Degree/10th/12th" class="edu-degree" style="width:45%;"/>
    <input type="text" placeholder="Year" class="edu-year" style="width:100%; margin-top:4px;"/>
    <select class="edu-status" style="width:100%; margin-top:4px;">
      <option value="Pass">Pass</option>
      <option value="Present">Present</option>
    </select>

    <button type="button" onclick="this.parentElement.remove(); updateResume();" style="margin-top:4px;">Remove</button>
  `;

  div.querySelectorAll('input').forEach(input => input.oninput = updateResume);
  educationContainer.appendChild(div);
  updateResume();
}

// Experience
const experienceContainer = document.getElementById('experienceContainer');
function addExperience() {
  const div = document.createElement('div');
  div.className = 'experience-item';
  div.style.marginBottom = '10px';
  div.innerHTML = `
        <input type="text" placeholder="Job Title" class="exp-title" style="width:48%; margin-right:4%;"/>
        <input type="text" placeholder="Company" class="exp-company" style="width:48%;"/>
        <input type="text" placeholder="Duration" class="exp-duration" style="width:100%; margin-top:4px;"/>
        <textarea placeholder="Description" class="exp-desc" style="width:100%; margin-top:4px;" rows="3"></textarea>
      `;
  div.querySelectorAll('input, textarea').forEach(input => input.oninput = updateResume);
  experienceContainer.appendChild(div);
  updateResume();
}

// Projects
const projectContainer = document.getElementById('projectContainer');
function addProject() {
  const div = document.createElement('div');
  div.className = 'project-item';
  div.style.marginBottom = '8px';
  div.innerHTML = `
        <input type="text" placeholder="Project Title" class="proj-title" style="width:48%; margin-right:4%;">
        <input type="text" placeholder="Link (optional)" class="proj-link" style="width:48%;"/><br/>
        <textarea placeholder="Description" class="proj-desc" style="width:100%; margin-top:4px;" rows="3"></textarea>
      `;
  div.querySelectorAll('input, textarea').forEach(input => input.oninput = updateResume);
  projectContainer.appendChild(div);
  updateResume();
}

// Certifications
const certificationContainer = document.getElementById('certificationContainer');
function addCertification() {
  const div = document.createElement('div');
  div.className = 'cert-item';
  div.style.marginBottom = '8px';
  div.innerHTML = `
        <input type="text" placeholder="Certification Name" class="cert-title" style="width:70%; margin-right:4%;"/>
        <input type="text" placeholder="Year" class="cert-year" style="width:26%;"/>
      `;
  div.querySelectorAll('input').forEach(input => input.oninput = updateResume);
  certificationContainer.appendChild(div);
  updateResume();
}

function updateResume() {
  // 🔁 Update Education
  const eduItems = document.querySelectorAll('#educationContainer .education-item');
  const rEducation = document.getElementById('rEducation');
  rEducation.innerHTML = ''; // Clear previous
  eduItems.forEach(item => {
    const school = item.querySelector('.edu-school')?.value || '';
    const degree = item.querySelector('.edu-degree')?.value || '';
    const year = item.querySelector('.edu-year')?.value || '';
    const status = item.querySelector('.edu-status')?.value || '';
    const div = document.createElement('div');
    div.textContent = `${school} - ${degree}  ${status}--(${year})`;
    rEducation.appendChild(div);
  });

  // 🔁 Update Experience
  const expItems = document.querySelectorAll('#experienceContainer .experience-item');
  const rExperience = document.getElementById('rExperience');
  rExperience.innerHTML = '';
  expItems.forEach(item => {
    const title = item.querySelector('.exp-title')?.value || '';
    const company = item.querySelector('.exp-company')?.value || '';
    const duration = item.querySelector('.exp-duration')?.value || '';
    const desc = item.querySelector('.exp-desc')?.value || '';
    const div = document.createElement('div');
    div.innerHTML = `<strong>${title}</strong> at ${company} (${duration})<br><em>${desc}</em>`;
    rExperience.appendChild(div);
  });

  // 🔁 Update Projects
  const projItems = document.querySelectorAll('#projectContainer .project-item');
  const rProjects = document.getElementById('rProjects');
  rProjects.innerHTML = '';
  projItems.forEach(item => {
    const title = item.querySelector('.proj-title')?.value || '';
    const link = item.querySelector('.proj-link')?.value || '';
    const desc = item.querySelector('.proj-desc')?.value || '';
    const div = document.createElement('div');
    div.innerHTML = `<strong>${title}</strong> ${link ? `(<a href="${link}" target="_blank">${link}</a>)` : ''}<br><em>${desc}</em>`;
    rProjects.appendChild(div);
  });

  // 🔁 Update Certifications
  const certItems = document.querySelectorAll('#certificationContainer .cert-item');
  const rCertifications = document.getElementById('rCertifications');
  rCertifications.innerHTML = '';
  certItems.forEach(item => {
    const title = item.querySelector('.cert-title')?.value || '';
    const year = item.querySelector('.cert-year')?.value || '';
    const div = document.createElement('div');
    div.textContent = `${title} (${year})`;
    rCertifications.appendChild(div);
  });
}


// 🔃 Drag-and-Drop Reordering
function initDrag() {
  const sections = document.querySelectorAll('.resume-section');
  sections.forEach(section => {
    section.draggable = true;

    section.ondragstart = e => {
      e.dataTransfer.setData('text/plain', section.dataset.section);
      section.classList.add('dragging');
    };

    section.ondragend = () => section.classList.remove('dragging');

    section.ondragover = e => e.preventDefault();

    section.ondrop = e => {
      e.preventDefault();
      const fromSectionName = e.dataTransfer.getData('text');
      const from = document.querySelector(`[data-section="${fromSectionName}"]`);
      const to = e.currentTarget;
      if (from && to && from !== to) {
        to.parentNode.insertBefore(from, to.nextSibling);
      }
    };
  });
}

// 🖨️ Export Resume to PDF
function saveToPDF() {
  const element = document.getElementById('resume');
  if (!element) return;

  element.style.display = 'block';
  window.scrollTo(0, 0);

  setTimeout(() => {
    const opt = {
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  }, 300);


}

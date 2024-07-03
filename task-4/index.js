function MenuShow(icon) {
    var element = document.querySelector(icon);
    var display = element.style.display;
    if (display == "flex") {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
}



document.addEventListener("DOMContentLoaded", function () {
    fetch("index.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.cards.map((d) => {
                populateCards(d);
            })
        })
        .catch((error) => {
            console.error("Error fetching JSON data: ", error);
        })
})


function populateCards(d) {
    const cardContainer = document.querySelector(".courses-container")
    const card = document.createElement("div")
    card.className = "course-card"
    
    const cardTop = document.createElement("div")
    cardTop.className = "course-card-top"

    const courseImg = document.createElement("div")
    courseImg.className = "course-Image"
    const imgTag = document.createElement("img")
    imgTag.src = d.image;    //
    courseImg.appendChild(imgTag)

    const courseDesc = document.createElement("div")
    courseDesc.className = "course-desc"
    const cardHeading = document.createElement("p")
    cardHeading.className = "card-heading"
    cardHeading.innerHTML = `
                    ${d.title}
                    <span class="iconify" data-icon="emojione:star" data-width="24" data-height="24"></span>
                `

    const courseRow1 = document.createElement("p")
    courseRow1.className = "course-desc-row-1"
    courseRow1.innerHTML = `
                  <span>${d.subject} | ${d.grade} <span>${d.addition}</span></span>
                `

    const courseRow2 = document.createElement("p")
    courseRow2.className = "course-desc-row-2"
    courseRow2.innerHTML = `
                    <span><b>${d.units}</b> Units</span> &nbsp
                    <span><b>${d.lessons}</b> Lessons</span> &nbsp
                    <span><b>${d.lessons}</b> Topics</span>                  
                    `

    const dropdownBox = document.createElement("select")
    dropdownBox.className = "dropdown-box class-dropdown-box"
    dropdownBox.innerHTML =  `
                  <select class="dropdown-box class-dropdown-box" id="" name="">
                    <option value="course-name">${d.courseName}</option>
                  </select>
            `
    const courseRow3 = document.createElement("p")
    courseRow3.className = "course-desc-row-3"
    courseRow3.innerHTML = `
             ${d.info.totalStudents && d.info.totalStudents} students  |  ${
      d.info.duration && d.info.duration
    }
          `

    courseDesc.appendChild(cardHeading)
    courseDesc.appendChild(courseRow1)
    d.units && courseDesc.appendChild(courseRow2)
    courseDesc.appendChild(dropdownBox)
    d.info && courseDesc.appendChild(courseRow3)

    
    cardTop.appendChild(courseImg)
    cardTop.appendChild(courseDesc)

    const cardBotton = document.createElement("div")
    cardBotton.className = "course-card-bottom"
    cardBotton.innerHTML = `
                <span class="iconify" data-icon="ion:eye" data-width="24" data-height="24"></span>
                <span class="iconify" data-icon="mdi:calendar" data-width="24" data-height="24"></span>
                <span class="iconify" data-icon="streamline:calendar-star-solid" data-width="20" data-height="20"></span>
                <span class="iconify" data-icon="majesticons:analytics" data-width="24" data-height="24"></span>
    `

    card.appendChild(cardTop)
    card.appendChild(cardBotton)
    cardContainer.appendChild(card)
}
  
















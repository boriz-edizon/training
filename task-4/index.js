document.addEventListener("DOMContentLoaded", function () {
    fetch("index.json")
        .then((response) => {
            response.json();
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
    const cardContainer = document.querySeelctor(".courses-container")
    const card = document.createElement("div")
    card.className = "course-card"
    
    const cardTop = document.createElement("div")
    cardTop.className = "course-card-top"

    const courseImg = document.createElement("div")
    courseImg.className = course-Image
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



    const cardBotton = document.createElement("div")
    cardBotton.className = "course-card-bottom"
    

    card.appendChild(cardTop)
    card.appendChild(cardBotton)
    cardContainer.appendChild(card)
}





document.addEventListener("DOMContentLoaded", function () {
    fetch("index.json")
      .then((response) => {
        response.json();
      })
      .then((data) => {
        data.cards.map((d) => {
          populateCards(d);
        });
      })
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
      });
  });
  
  function populateCards(d) {
  
  
    const cContents = document.createElement("div");
    cContents.className = "cContents";
    const cc1 = document.createElement("p");
    cc1.className = "cc-1";
    cc1.textContent = d.title;
    const cc2 = document.createElement("p");
    cc2.className = "cc-2";
    cc2.innerHTML = `
              ${d.subject} | ${d.garde} <span>${d.addition}</span>
            `;
    const cc3 = document.createElement("p");
    cc3.className = "cc-3";
    cc3.innerHTML = `
              <span>4</span> Units <span>18</span> Lessons <span>24</span> Topics
            `;
    const cc4 = document.createElement("div");
    cc4.className = "cc-4";
    cc4.innerHTML = `
              <select name="course" id="course">
                    <option value="course_name">Course Name</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
            `;
  
    const cc5 = document.createElement("p");
    cc5.className = "cc-5";
    cc5.innerText = `
             ${d.info.totalStudents && d.info.totalStudents} students  |  ${
      d.info.duration && d.info.duration
    }
          `;
    cContents.appendChild(cc1);
    cContents.appendChild(cc2);
    cContents.appendChild(cc3);
    cContents.appendChild(cc4);
    d.info && cContents.appendChild(cc5);
  
    const star = document.createElement("img");
    star.className = "star";
    star.src = "images/favourite.svg";
  
    courseItemsMain.appendChild(cimage);
    courseItemsMain.appendChild(cContents);
    courseItemsMain.appendChild(star);
  
    const courseItemsIcons = document.createElement("div");
    courseItemsIcons.className = "courseItemsIcons";
    courseItemsIcons.innerHTML = `
              <button>
                <i class="fa-solid fa-eye fa-xl" style="color: #63e6be"></i>
              </button>
              <button disabled>
                <i
                  class="fa-solid fa-calendar-days fa-xl"
                  style="color: #63e6be"
                ></i>
              </button>
              <button disabled>
                <i
                  class="fa-solid fa-bag-shopping fa-xl"
                  style="color: #63e6be"
                ></i>
              </button>
              <button>
                <i
                  class="fa-solid fa-chart-simple fa-xl"
                  style="color: #63e6be"
                ></i>
              </button>
            `;
  
    card.appendChild(courseItemsMain);
    card.appendChild(courseItemsIcons);
  
    ele1.appendChild(card);
  }
  
  function populateAnnouncements() {}
  
  function populateNotifications() {}
  
















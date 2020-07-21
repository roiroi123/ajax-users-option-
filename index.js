$("#select").val(localStorage.getItem("optionVal")); //local storage

const mapping = {
  firstName: { path: "name.first", isVisible: true },
  lastName: { path: "name.last", isVisible: true },
  city: { path: "location.city", isVisible: true },
  address: { path: "location.street.name", isVisible: true },
  src: { path: "picture.large", isVisible: true },
  gender: { path: "gender", isVisible: true },
  email: { path: "email", isVisible: true },
};

async function init() {
  try {
    const selectVal = localStorage.getItem("optionVal");
    const response = await getUsers({
      url: `https://randomuser.me/api/?results=${selectVal}`,
    });
    const { results } = response;
    console.log(results);
    draw(results);
  } catch (err) {
    console.log(err);
    alert(`message: ${err.statusText} , status: ${err.status}`);
  }
}

function draw(arrOfObjects) {
  const mappedUsers = arrOfObjects.map((user) => {
    return getMappedUser(user);
  });
  const usersCard = drawCards(mappedUsers);
  console.log(usersCard);
  $("#container").append(usersCard);
}

function getMappedUser(user) {
  const keyValueMappingArray = Object.entries(mapping);
  return keyValueMappingArray.reduce((mappedUser, KEYVALUEPAIR_ARRAY) => {
    const [key, settingObj] = KEYVALUEPAIR_ARRAY;
    const { path } = settingObj;
    return { ...mappedUser, [key]: getValueFromPath(path, user) };
  }, {});
}

function getValueFromPath(path, user) {
  const splittedPath = path.split(".");
  const theRequestedValue = splittedPath.reduce((currentUser, partOfPath) => {
    const isValueExist = currentUser[partOfPath];
    return isValueExist ? currentUser[partOfPath] : "Not Availble";
  }, user);
  return theRequestedValue;
}

function drawCards(users) {
  $("#container").html("");
  const drawed = users.map((user) => {
    const userCard = $(`<div class = "card"></div>`).css({
      width: "18rem",
    });
    const userImgUrl = user.src;
    const userImg = $(`<img class = "card-img-top" src =${userImgUrl}></img>`);
    const cardBody = $(`<div class="card-body"></div>`);
    const cardTitle = $(
      `<h5 class="card-title font-weight-bold">${user.firstName} ${user.lastName}</h5>`
    );
    const cardText = $(
      `<p class="card-text">${(user.firstName, " ", user.lastName)} is a  ${
        user.gender
      }</p>`
    );
    const cardPopulation = $(
      `<p class="text-muted"> Lives in : ${user.city} Adress :${user.address} </p>`
    );
    const cardEmail = $(`<a class="text-nowrap"> email : ${user.email}  </a>`);
    const deleteBtn = $(`<input type="button" id ="delete"  >`)
      .addClass("btn btn-danger")
      .val("X")
      .css({ display: "block" });
    deleteBtn.click(() => {
      userCard.fadeOut("slow", () => {
        userCard.remove();
      });
    });

    userCard.append(deleteBtn, userImg, cardBody);
    cardBody.append(cardTitle, cardText, cardPopulation, cardEmail);
    return userCard;
  });
  return drawed;
}

init();

$("#select").on("change", () => {
  init();
  window.localStorage.setItem("optionVal", $("#select").val());
  console.log(localStorage.getItem("optionVal"));
});

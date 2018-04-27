let currentPeople = people1;
let lastPeople = people3;
let isFriendsShown = null;
let input = document.getElementById("mytext");
showDialog(people1);

function showDialog(who) {
   currentPeople = who;
   let ul = document.getElementById('messages').getElementsByTagName('ul')[0];
   ul.innerHTML = "";
   for (let i = 0; i < who.messages.length; i++) {
      let li = document.createElement('li');
      let message;
      if (who.messages[i].who == "me") {
         message =
            '<div class="messages__container messages__container-my">' +
              '<div class="messages__ava messages__ava-my">' +
                '<img src="' + me.avatar + '" />' +
              '</div>' +
              '<div class="messages__body messages__body-my">' +
                '<div>' +
                  '<p class="messages__text">' + who.messages[i].text + '</p>' +
                  '<p class="messages__time"><small>' + who.messages[i].time + '</small></p>' +
                '</div>' +
              '</div>' +
            '</div>';
      } else {
         message =
            '<div class="messages__container messages__container-friend">' +
            '<div class="messages__ava messages__ava-friend">' +
            '<img src="' + who.avatar + '" />' +
            '</div>' +
            '<div class="messages__body messages__body-friend">' +
            '<div>' +
            '<p class="messages__text">' + who.messages[i].text + '</p>' +
            '<p class="messages__time"><small>' + who.messages[i].time + '</small></p>' +
            '</div>' +
            '</div>' +
            '</div>';
      }

      li.innerHTML = message;
      ul.appendChild(li);
      ul.scrollTop += 1000;
   }
   // Add class active
   document.getElementById(currentPeople.name).classList.add('friends__container-active');
   document.getElementById(lastPeople.name).classList.remove('friends__container-active');
   lastPeople = who;
   hideFriends();
}

function sendMessage() {
   let inputValue = document.getElementById('mytext').value;
   if (inputValue == "" || inputValue == " ") {
      return;
   }
   let time = formatTime(new Date());

   let newMessage = {
      who: "me",
      time: time,
      text: inputValue
   }
   currentPeople.messages.push(newMessage);
   input.value = "";
   showDialog(currentPeople);
   if (currentPeople == people2) {
      getBotAnsver(inputValue);
   }
}


function getBotAnsver(message) {
   let botAnsver;
   switch (message) {
      case "hi":
         botAnsver = "Hello! Nice to reed you!)"
         break;
      case "football":
         botAnsver = "How are you? Do you want to go to the football tomorrow?"
         break;
      case "wish":
         botAnsver = "Good luck!"
         break;
      case "by":
         botAnsver = "By! Have a nice day!"
         break;
      default:
         botAnsver = "\[Commands: hi, wish, by, football\]"
   }

   let botMessage = {
      who: "friend",
      time: formatTime(new Date()),
      text: botAnsver
   }
   currentPeople.messages.push(botMessage);
   showDialog(currentPeople);
}

function formatTime(date) {
   let hours = date.getHours();
   let minutes = date.getMinutes();
   let day = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
   return hours + ':' + minutes + ' [' + day + ']';
}

// Submit on enter press
input.addEventListener("keyup", function(event) {
   event.preventDefault();
   if (event.keyCode === 13) {
      document.getElementById("addBtn").click();
   }
});

function showFriends() {
   if (!isFriendsShown) {
      document.getElementById("friends").classList.add('friends-show');
      isFriendsShown = true;
   } else {
      hideFriends();
   }
}

function hideFriends() {
   if (isFriendsShown) {
      document.getElementById("friends").classList.remove('friends-show');
      isFriendsShown = false;
   }
}

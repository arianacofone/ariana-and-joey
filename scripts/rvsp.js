
  var name = '';
  var name1 = '';
  var name2 = '';

  document.addEventListener("DOMContentLoaded", function(){
  // Handler when the DOM is fully loaded
    var url = window.location + '';
    var urlAux = url.split('=');
    name = decodeURI(urlAux[1]);
    var names = name.split('&');
    name1 = names[0].trim();
    name2 = names[1].trim();
    document.getElementById("names").innerHTML = name;

  });


  function rsvping(rsvpValue) {
    if (rsvpValue == 2) {
      document.getElementById("rsvpForm").style.display = 'block';
      document.getElementById("rsvpDetails").style.display = 'block';
      document.getElementById("onePerson").style.display = 'none';

    } else if(rsvpValue == 1) {
      document.getElementById("rsvpForm").style.display = 'block';
      document.getElementById("rsvpDetails").style.display = 'block';
      document.getElementById("onePerson").style.display = 'block';
      document.getElementById("guestA").innerHTML = name1;
      document.getElementById("name1").setAttribute('value', name1);

      document.getElementById("guestB").innerHTML = name2;
      document.getElementById("name2").setAttribute('value', name2);
    }
    else {
      document.getElementById("rsvpForm").style.display = 'block';
      document.getElementById("rsvpDetails").style.display = 'none';
    }
  }

  var firebaseRefYes = new Firebase('https://wedding-9b676.firebaseio.com/couples/yes');
  var firebaseRefNo = new Firebase('https://wedding-9b676.firebaseio.com/couples/no');
  var formField = document.getElementById('rsvpForm');
  let time = moment().format('LLLL');

  formField.addEventListener("submit", function(event) {
      event.preventDefault();
      rsvpValue = document.querySelector('input[name="response"]:checked').value;

      var rsvp = {};
      if(rsvpValue == 2) {
        rsvp = {
          time: time,
          guests: name,
          quantity: rsvpValue,
          food: formField.food.value,
          phone: formField.telephone.value,
          misc: formField.misc.value,
        }
        firebaseRefYes.push(rsvp);
      } else if(rsvpValue == 1) {
        var attendingGuest = document.querySelector('input[name="guest"]:checked').value;
        rsvp = {
          time: time,
          guests: name,
          attendingGuest: attendingGuest,
          quantity: rsvpValue
        }
        firebaseRefYes.push(rsvp);
      } else {
        rsvp = {
          time: time,
          guests: name,
          quantity: rsvpValue
        }
        firebaseRefNo.push(rsvp);
      }
      console.log(rsvp)


      var rsvpDiv = document.getElementById("rsvp");
      document.body.removeChild(rsvpDiv);

      // var h2 = document.createElement("h2");
      // and give it some content
      var thankYou = document.getElementById("thankYou").display = 'block';
      // add the text node to the newly created div
      // document.body.appendChild(thankYou);

      setTimeout(function () {

        window.location.href = "/"; //will redirect to your blog page (an ex: blog.html)
     }, 3000);
  });

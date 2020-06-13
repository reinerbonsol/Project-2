$("#share").append('<form action="sharer.php" method="POST">');
$("#share form").append('<div class="appm">Save this</div>');
$("#share form").append('<input type="text" placeholder="Name" name="routename" id="rname"/>');
$("#share form").append('<input type="text" placeholder="description" id="rdescription" name="routedescription" class="address"/>');
$("#share form").append('<input type="text" placeholder="tags" id="tags" name="routetags"/>');
$("#share form").append('<br><input type="submit" id="savebutton" value="Save" />');
$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  //create forms



  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});

//GENERATE FORM AND POPULATE INPUT DATA

var down = document.getElementById("GFG_DOWN");
function GFG_Fun() {
   
    // Create a form dynamically
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "submit.php");

    // Create an input element for emailID
    var ID = document.createElement("input");
    ID.setAttribute("type", "text");
    ID.setAttribute("name", "emailID");
    ID.setAttribute("placeholder", "E-Mail ID");

    // Create an input element for password
    var PWD = document.createElement("input");
    PWD.setAttribute("type", "password");
    PWD.setAttribute("name", "password");
    PWD.setAttribute("placeholder", "Password");

    // Create a submit button
    var s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit");

    // Append the email_ID input to the form
    form.append(ID);
   
    // Append the password to the form
    form.append(PWD);
   
    // Append the button to the form
    form.append(s);

    document.getElementsByTagName("body")[0]
   .appendChild(form);
}


//Sample for populating form inputs
const populateForm = () => {
    const formData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        message: 'Hello, World!'
      };

      // Set the value of each input element
      document.getElementById('firstName').value = formData.firstName;
      document.getElementById('lastName').value = formData.lastName;
      document.getElementById('email').value = formData.email;
      document.getElementById('message').value = formData.message;

}

//method to generate random IDs
const createForm = () => {

}

const generate_wID = () => {

}

const generate_dID = () => {

}

const generate_cID = () => {

}

const generate_olID = () => {

}

const generate_olwID = () => {

}

const generate_olquantity = () => {

}



// alert("This is an external js file");
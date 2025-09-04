console.log("Registration form");

document.querySelector("form").addEventListener("submit", function () {
  let fname = document.querySelector('input[name="firstName"]').value;
  let email = document.querySelector('input[name="email"]').value;
  let password = document.querySelector('input[name="password"]').value;
  let c_password = document.querySelector('input[name="confirm"]').value;
  let mobile = document.querySelector('input[name="mobile"]').value;

  if (fname === "") {
    alert("First name is required");
  }

  if (!/^[A-Za-z]+$/.test(fname)) {
    alert("First name must contain only letters");
  }

  if (!email.includes("@")) {
    alert("Enter a valid email");
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long");
  }

  if (password !== c_password) {
    alert("Passwords do not match");
  }

  if (!/^[0-9]{10}$/.test(mobile)) {
    alert("Enter a valid 10-digit mobile number");
  }

  alert("Form submitted successfully!");
  this.submit();
});

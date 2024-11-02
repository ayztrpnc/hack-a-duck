document.getElementById('personal-info-form').addEventListener('submit', function(event) {
    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    // Validate email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      event.preventDefault(); // Prevent form submission
      return;
    }
  
    // Validate password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      event.preventDefault(); // Prevent form submission
      return;
    }
  
    
  });
  
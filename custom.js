    // Function to store form data in web storage
    function storeData() {
        var name = document.getElementById('name').value;
        var miles = document.getElementById('miles').value;
        var startDate = document.getElementById('startDate').value;
        var milesPerDay = document.getElementById('milesPerDay').value;
  
        var formData = {
          name: name,
          miles: miles,
          startDate: startDate,
          milesPerDay: milesPerDay
        };
  
        localStorage.setItem('walkData', JSON.stringify(formData));
      }
  
      // Function to load stored data
      function loadStoredData() {
        var storedData = localStorage.getItem('walkData');
  
        if (storedData) {
          var formData = JSON.parse(storedData);
  
          document.getElementById('name').value = formData.name;
          document.getElementById('miles').value = formData.miles;
          document.getElementById('startDate').value = formData.startDate;
          document.getElementById('milesPerDay').value = formData.milesPerDay;
        }
      }
  
      // Load stored data when the page loads
      loadStoredData();
  
      // Function to store challenge miles in web storage
      function storeChallengeMiles(challengeMiles) {
        localStorage.setItem('challengeMiles', challengeMiles.toString());
      }
  
      // Function to load stored challenge miles
      function loadChallengeMiles() {
        var challengeMiles = localStorage.getItem('challengeMiles');
        if (challengeMiles) {
          document.getElementById('challengeMiles').value = challengeMiles;
        }
      }
  
      // Function to store challenge duration in web storage
      function storeChallengeDuration(challengeDuration) {
        localStorage.setItem('challengeDuration', challengeDuration.toString());
      }
  
      // Function to load stored challenge duration
      function loadChallengeDuration() {
        var challengeDuration = localStorage.getItem('challengeDuration');
        if (challengeDuration) {
          document.getElementById('challengeDuration').value = challengeDuration;
        }
      }
  
      // Load stored challenge miles and duration
      loadChallengeMiles();
      loadChallengeDuration();
  
      // Save settings form submission
      document.getElementById('settingsForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
  
        var challengeMiles = document.getElementById('challengeMiles').value;
        var challengeDuration = document.getElementById('challengeDuration').value;
  
        // Store challenge miles and duration
        storeChallengeMiles(challengeMiles);
        storeChallengeDuration(challengeDuration);
  
        alert('Settings saved successfully!');
      });
  
      document.getElementById('walkForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
  
        // Retrieve user input
        var name = document.getElementById('name').value;
        var miles = parseFloat(document.getElementById('miles').value);
        var startDate = new Date(document.getElementById('startDate').value);
        var milesPerDay = parseFloat(document.getElementById('milesPerDay').value);
  
        // Retrieve challenge miles and duration from storage
        var challengeMiles = parseFloat(localStorage.getItem('challengeMiles')) || 1000;
        var challengeDuration = parseInt(localStorage.getItem('challengeDuration')) || 1;
  
        // Calculate estimated finish date
        var daysRemaining = Math.ceil((challengeMiles - miles) / milesPerDay);
        var estimatedFinishDate = new Date(startDate.getTime() + (daysRemaining * 24 * 60 * 60 * 1000));
        var formattedFinishDate = estimatedFinishDate.toDateString();
  
        // Calculate maximum allowed finish date
        var maxFinishDate = new Date(startDate.getTime() + (challengeDuration * 365 * 24 * 60 * 60 * 1000));
  
        // Display the result
        var result = document.getElementById('result');
        var alertContainer = document.getElementById('alertContainer');
  
        if (daysRemaining > (challengeDuration * 365)) {
          // Display a warning alert if estimated finish date exceeds the challenge duration
          alertContainer.innerHTML = '<div class="alert alert-warning" role="alert">Warning: Your estimated finish date is more than ' + challengeDuration + ' year(s) from your start date. You might not be able to complete the challenge in the given time.</div>';
        } else {
          alertContainer.innerHTML = ''; // Clear any previous alert
        }
  
        result.innerHTML = 'Hi ' + name + ', based on your current progress, you are estimated to finish your ' + challengeMiles + '-mile walk on ' + formattedFinishDate + '.';
  
        // Store the form data in web storage
        storeData();
      });
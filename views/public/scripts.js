/*!
 * Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      offset: 74,
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });

  document
    .getElementById("travelForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Extract user input from the form
      var userPreferences = {
        continent: document.getElementById("continent").value,
        climate: document.getElementById("climate").value,
        vacationType: document.getElementById("vacationType").value,
        budgetRange: document.getElementById("budgetRange").value,
      };

      // Process the preferences to generate recommendations
      generateTravelRecommendations(userPreferences);
    });
  document
    .getElementById("test123")
    .addEventListener("click", async () => {
      try {
          const response = await fetch('/getAllDestinations', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          const data = await response.json();
          console.log('Database response:', data);
      } catch (error) {
          console.error('Error:', error);
      }
  });
});

async function generateTravelRecommendations(preferences) {
  // List of travel destinations with their attributes
  try {
      const response = await fetch('/generateDestinations', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(preferences)
      });
      const data = await response.json();
      console.log('Database response:', data);
      displayRecommendations(data);
  } catch (error) {
      console.error('Error:', error);
  }
  // Filter destinations based on user preferences
  // var recommendedDestinations = destinations.filter(function (destination) {
  //   return (
  //     (preferences.continent === "" ||
  //       destination.continent === preferences.continent) &&
  //     (preferences.climate === "" ||
  //       destination.climate === preferences.climate) &&
  //     (preferences.vacationType === "" ||
  //       destination.vacationType === preferences.vacationType) &&
  //     (preferences.budgetRange === "" ||
  //       destination.budgetRange === preferences.budgetRange)
  //   );
  // });

  // Display the results to the user
}

function displayRecommendations(recommendations) {
  // Identify the section where recommendations will be displayed
  var recommendationsSection = document.getElementById("recommendations");

  // Clear previous recommendations
  recommendationsSection.innerHTML = "";

  // Loop through each recommendation and create HTML elements to display them
  recommendations.forEach(function (destination) {
    // Create container for each destination
    var destinationCard = document.createElement("div");
    destinationCard.className = "destination-card";
    destinationCard.classList.add('text-center')
    destinationCard.classList.add('points-dest')
    // Add an image for the destination
    var destinationImage = document.createElement("img");
    destinationImage.src = destination.image;
    destinationImage.alt = destination.name;
    destinationCard.appendChild(destinationImage);

    // Add destination name
    var destinationName = document.createElement("h3");
    destinationName.classList.add('section-subheading') 
    destinationName.textContent = destination.name;
    destinationCard.appendChild(destinationName);

    // Add highlight of the destination
    var destinationHighlight = document.createElement("p");
    destinationHighlight.textContent = destination.highlight;
    destinationCard.appendChild(destinationHighlight);

    // Add a detailed description of the destination
    var destinationDescription = document.createElement("p");
    destinationDescription.textContent = destination.description;
    destinationCard.appendChild(destinationDescription);

    // Add continent information
    var continentInfo = document.createElement("p");
    continentInfo.innerHTML =
      "<strong>Continent:</strong> " + destination.continent;
    destinationCard.appendChild(continentInfo);

    // Add climate information
    var climateInfo = document.createElement("p");
    climateInfo.innerHTML = "<strong>Climate:</strong> " + destination.climate;
    destinationCard.appendChild(climateInfo);

    // Add vacation type information
    var vacationTypeInfo = document.createElement("p");
    vacationTypeInfo.innerHTML =
      "<strong>Vacation Type:</strong> " + destination.vacationType;
    destinationCard.appendChild(vacationTypeInfo);

    // Add budget range
    var budgetRange = document.createElement("p");
    budgetRange.innerHTML =
      "<strong>Budget Range:</strong> " + destination.budgetRange;
    destinationCard.appendChild(budgetRange);

    // Add tourist level
    var touristLevel = document.createElement("p");
    touristLevel.innerHTML =
      "<strong>Tourist Level:</strong> " + destination.touristLevel;
    destinationCard.appendChild(touristLevel);

    // Add currency information
    var currencyInfo = document.createElement("p");
    currencyInfo.innerHTML =
      "<strong>Currency:</strong> " + destination.currency;
    destinationCard.appendChild(currencyInfo);

    // Add a list of activities/what to do
    var activitiesHeading = document.createElement("h4");
    activitiesHeading.textContent = "Activities/What to do:";
    destinationCard.appendChild(activitiesHeading);

    var activitiesList = document.createElement("ul");
    destination.activities.forEach(function (activity) {
      var activityItem = document.createElement("li");
      activityItem.textContent = activity;
      activitiesList.appendChild(activityItem);
    });
    destinationCard.appendChild(activitiesList);

    // Append the card to the recommendations section
    recommendationsSection.appendChild(destinationCard);
  });

  // Scroll to the recommendations section
  recommendationsSection.scrollIntoView({ behavior: "smooth" });
  
 
}

  
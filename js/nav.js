"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}
$navLogin.on("click", navLoginClick);


/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUser.text(`${currentUser.username}`).show();
}

//Open the submit story form when user clicks on submit in nav bar

function navSubmitStory(evt) {
   console.debug("navSubmitStory", evt);
   hidePageComponents();
   $("#submit-story-container").show();
   $allStoriesList.show();
}
$("#nav-submit-story").on("click", navSubmitStory);


//Show the User Favorites list when user clicks on favorites in nav bar

function navFavorites(evt) {
   console.debug("navFavorites", evt);
   hidePageComponents();
   putFavoritesOnPage();
}
$navFavorites.on("click", navFavorites)


//Show the User submitted stories list when user clicks on my stories in nav bar

function navMyStories(evt) {
   console.debug("navMyStories", evt);
   hidePageComponents();
   putUserStoriesOnPage();
}
$navUserStories.on("click", navMyStories);


//Show User profile info on click of username

function navProfileClick(evt) {
   console.debug("navProfileClick");
   hidePageComponents();
   $navUserProfileSection.show();
}
$navUser.on("click", navProfileClick);
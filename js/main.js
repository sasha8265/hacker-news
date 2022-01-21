"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $favoriteStories = $("#favorite-stories");
const $userStories = $("#user-stories");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");

const $newStoryContainer = $("#submit-story-container");
const $newStoryForm = $('#new-story-form');

const $navLogin = $("#nav-login");
const $navUser = $("#nav-user-profile");
const $navUserProfileSection = $("#user-profile-section");
const $navFavorites = $("#nav-favorites");
const $navUserStories = $("#nav-user-stories");
const $navLogOut = $("#nav-logout");

/** Hide all components on the page so we can show select components on demand */

function hidePageComponents() {
  const components = [
   $allStoriesList,
   $loginForm,
   $signupForm,
   $favoriteStories,
   $userStories,
   $newStoryContainer,
   $navUserProfileSection
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

$(start);

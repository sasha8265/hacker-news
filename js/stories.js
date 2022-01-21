"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showDeleteButton = false) {
  // console.debug("generateStoryMarkup", story);

   const hostName = story.getHostName();

   //checks if there is a user logged in and returns true/false
   const showHeart = Boolean(currentUser);

   return $(`
      <li id="${story.storyId}">
      ${showDeleteButton ? deleteButtonHTML() : ""}
      ${showHeart ? heartIconType(story, currentUser) : ""}
         <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
         </a>
         <small class="story-hostname">(${hostName})</small>
         <small class="story-author">by ${story.author}</small>
         <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** USER STORIES - Gets new story data from the #new-story-form on submit, and puts on main page. */

async function addNewStoryToPage(evt) {
   console.debug("addNewStoryToPage");
   // evt.preventDefault();

   const title = $("#new-story-title").val();
   const author = $("#new-story-author").val();
   const url = $("#new-story-url").val();
   const username = currentUser.username;
   const storyData = { title, author, url, username };

   let newStory = await storyList.addStory(currentUser,
      storyData);

   const $newStory = generateStoryMarkup(newStory);
   $allStoriesList.prepend($newStory);
   
   $newStoryForm.trigger("reset").slideUp(400);

}
$newStoryForm.on("submit", addNewStoryToPage);


/** USER STORIES - on nav click, displays user created stories*/
function putUserStoriesOnPage(evt) {
   console.debug("putUserStoriesOnPage");

   $userStories.empty();

   if (currentUser.ownStories.length === 0) {
      $userStories.append("<h5>You haven't added any stories yet!");
   } else {
      for (let story of currentUser.ownStories) {
         const $story = generateStoryMarkup(story, true);
         $userStories.append($story);
      }
   }
   $userStories.show();
}

/** SET UP TRASHCAN ICON HTML */
function deleteButtonHTML() {
   return `<i class="fas fa-trash-alt delete-icon"></i>`
}


/** DELETE USER STORY - on trash icon click, delete the user story and regenerate the user story list */
async function deleteStory(evt) {
   console.debug("deleteStory");

   const $target = $(evt.target);
   const $closestStory = $target.closest("li");
   const storyId = $closestStory.attr("id");

   await storyList.removeStory(currentUser, storyId);
   await putUserStoriesOnPage();
}

$userStories.on("click", ".delete-icon", deleteStory);



/** FAVORITE STORIES - on icon click, add story to favorites page*/
function putFavoritesOnPage() {
   console.debug("putFavoritesOnPage");

   $favoriteStories.empty();

   if (currentUser.favorites.length === 0) {
      $favoriteStories.append("<h5>No Favorites Added Yet!");
   } else {
      for (let story of currentUser.favorites) {
         const $story = generateStoryMarkup(story);
         $favoriteStories.append($story);
      }
   }
   $favoriteStories.show();
}



/** SET UP HEART ICON HTML - depending on favorite status */
function heartIconType(story, user) {
   const isFavorite = user.checkIfFavorite(story);
   const heartType = isFavorite ? "fas" : "far";
   return `<i class="fav-icon ${heartType} fa-heart"></i>`
}


/** TOGGLE FAVORITE / UNFAVORITE STORIES */
async function toggleFavoriteState(evt) {
   console.debug("toggleFavoriteState");

   const $target = $(evt.target);
   const $closestStory = $target.closest("li");
   const storyId = $closestStory.attr("id");
   const story = storyList.stories.find(function (s) {
      return s.storyId === storyId;
   });

   if ($target.hasClass("fas")){
      await currentUser.removeFavorite(story);
      $target.closest("i").toggleClass("fas far");
   } else {
      //not a favorite - add to favorites and change empty icon to filled
      await currentUser.addFavorite(story);
      $target.closest("i").toggleClass("fas far");
   }
}
$allStoriesList.on("click", ".fav-icon", toggleFavoriteState);
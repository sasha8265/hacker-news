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

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
         <i class="fav-icon far fa-heart"></i>
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

/** Gets new story data from the #new-story-form on submit, and puts on page. */

async function addNewStoryToPage(evt) {
   console.debug("addNewStoryToPage");
   evt.preventDefault();

   const title = $("#new-story-title").val();
   const author = $("#new-story-author").val();
   const url = $("#new-story-url").val();
   const username = currentUser.username;
   const storyData = { title, author, url, username };

   let newStory = await storyList.addStory(currentUser,
      storyData);

   const $newStory = generateStoryMarkup(newStory);
   $allStoriesList.prepend($newStory);
   
   $('#new-story-form').trigger("reset")
}
$("#new-story-form").on("submit", addNewStoryToPage);


/** FAVORITE STORIES - on icon click, add story to favorites list*/
function addToFavorites(evt) {
   console.debug("addToFavorites");

}


/** FAVORITE STORIES */
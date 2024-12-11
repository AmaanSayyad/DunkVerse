import React, { useState } from 'react';

const StoryBar = ({ stories }) => {
  const [activeStory, setActiveStory] = useState(null);

  const handleStoryClick = (story) => {
    setActiveStory(story); // Set the active story
    console.log(`Story ${story.id} clicked`);

    // Automatically clear the active story after 3 seconds
    setTimeout(() => {
      setActiveStory(null);
    }, 1000);
  };

  return (
    <div>
      {/* Story Bar */}
      <div className="flex overflow-x-auto gap-story-gap p-4 bg-dark rounded-lg">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleStoryClick(story)}
          >
            {/* Story Avatar */}
            <div
              className={`story-avatar ${
                story.isActive ? 'story-active' : 'border-2 border-light'
              }`}
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full rounded-story-circle object-cover"
              />
            </div>
            {/* Story Title */}
            <span className="text-2xs text-center text-white mt-2 w-16 truncate">
              {story.title}
            </span>
          </div>
        ))}
      </div>

      {/* Active Story Modal */}
      {activeStory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="relative">
            <img
              src={activeStory.image}
              alt={activeStory.title}
              className="max-w-full max-h-screen rounded-lg"
            />
            <span className="absolute top-4 right-4 text-white font-bold">
              {activeStory.title}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryBar;

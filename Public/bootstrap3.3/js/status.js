const allStories = [
    {
      thumbUrl: "./images/WhatsApp Image 2023-02-22 at 7.19.36 PM.jpeg",
      imageUrl: "https://t4.ftcdn.net/jpg/04/69/45/81/360_F_469458115_RwQ4QaoWUKbf3PflKMPL51Hz0kIzWH5C.jpg",
      title: "feeling",
    },
  
    {
      thumbUrl: "./images/WhatsApp Image 2023-02-22 at 7.21.55 PM.jpeg",
      imageUrl: "https://images.unsplash.com/photo-1589476993333-f55b84301219?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3RhcmJ1Y2tzfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
      title: "In stackbucks",
    },
  
    {
      thumbUrl: "./images/WhatsApp Image 2023-02-22 at 7.30.39 PM.jpeg",
      imageUrl: "https://thumbs.dreamstime.com/b/beach-goa-india-5393913.jpg",
      title: "Enjoying Holidays",
    },
  
    {
      thumbUrl: "./images/WhatsApp Image 2023-02-22 at 7.51.11 PM.jpeg",
      imageUrl: "https://www.euttaranchal.com/tourism/timthumb.php?src=/tourism/photos/kedarnath-2802883.jpg&w=400&h=275",
      title: "kedarnath",
    },
  
    {
      thumbUrl: "images/5-thumb.png",
      imageUrl: "https://img.freepik.com/premium-photo/mixed-veg-masala-maggie-noodles-instant-noodles-cooked-with-veggies-then-served-bowl-rustic-wooden-background-selective-focus_726363-1122.jpg",
      title: "Eating Maggi",
    },
  
    {
      thumbUrl: "https://cdn.pixabay.com/photo/2016/11/18/13/53/idol-1834688__480.jpg",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZr6VdEaTPT5exVX_haXW0mJb59oXpk8fVBiTrblFq&s",
      title: "My new pet",
    },
  
    {
      thumbUrl: "./images/WhatsApp Image 2023-02-22 at 9.35.36 PM.jpeg",
      imageUrl: "https://thumbs.dreamstime.com/b/navratri-festival-garba-dandiya-dance-calgary-alberta-canada-hindu-festival-dedicated-to-worship-goddess-127995807.jpg",
      title: "Garba night",
    },
  
    {
      thumbUrl: "https://i.pinimg.com/474x/0a/0d/64/0a0d6425b397fd24f92b5d14d5c13023.jpg",
      imageUrl: "https://www.shutterstock.com/image-photo/homemade-dosa-dhosa-masala-plain-260nw-1597787986.jpg",
      title: "Eating Dosa",
    },
    {
        thumbUrl: "https://hindi.cdn.zeenews.com/hindi/sites/default/files/styles/zm_700x400/public/2022/07/17/1226249-collage-maker-17-jul-2022-05.44-pm.jpg?itok=R6WN8zQr",
        imageUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBob25lfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        title: "My new Phone",
      },
      {
        thumbUrl: "https://images.unsplash.com/photo-1600703136783-bdb5ea365239?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmVkJTIwZmxvd2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        imageUrl: "https://t4.ftcdn.net/jpg/03/05/35/65/360_F_305356563_RjpA8bNIfjd2s78JpTt3Ed6hKWPUBOwS.jpg",
        title: "Eating Pani Puri",
      },
  ];
  
  const storiesContainer = document.querySelector(".stories-container");
  const storyFull = document.querySelector(".story-full");
  const storyFullImage = document.querySelector(".story-full img");
  const storyFullTitle = document.querySelector(".story-full .title");
  const closeBtn = document.querySelector(".story-full .close-btn");
  const leftArrow = document.querySelector(".story-full .left-arrow");
  const rightArrow = document.querySelector(".story-full .right-arrow");
  
  let currentIndex = 0;
  let timer;
  
  allStories.forEach((s, i) => {
    const content = document.createElement("div");
    content.classList.add("content");
  
    const img = document.createElement("img");
    img.setAttribute("src", s.thumbUrl);
  
    storiesContainer.appendChild(content);
    content.appendChild(img);
  
    content.addEventListener("click", () => {
      currentIndex = i;
      storyFull.classList.add("active");
      storyFullImage.setAttribute("src", s.imageUrl);
  
      if (!s.title) {
        storyFullTitle.style.display = "none";
      } else {
        storyFullTitle.style.display = "block";
        storyFullTitle.innerHTML = s.title;
      }
  
      clearInterval(timer);
      timer = setInterval(nextStory, 5000);
    });
  });
  
  closeBtn.addEventListener("click", () => {
    storyFull.classList.remove("active");
  });
  
  leftArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
  
      storyFullImage.setAttribute("src", allStories[currentIndex].imageUrl);
  
      if (!allStories[currentIndex].title) {
        storyFullTitle.style.display = "none";
      } else {
        storyFullTitle.style.display = "block";
        storyFullTitle.innerHTML = allStories[currentIndex].title;
      }
  
      clearInterval(timer);
      timer = setInterval(nextStory, 5000);
    }
  });
  
  const nextStory = () => {
    if (currentIndex < allStories.length - 1) {
      currentIndex += 1;
  
      storyFullImage.setAttribute("src", allStories[currentIndex].imageUrl);
  
      if (!allStories[currentIndex].title) {
        storyFullTitle.style.display = "none";
      } else {
        storyFullTitle.style.display = "block";
        storyFullTitle.innerHTML = allStories[currentIndex].title;
      }
    }
  };
  
  rightArrow.addEventListener("click", () => {
    nextStory();
    clearInterval(timer);
    timer = setInterval(nextStory, 5000);
  });
  
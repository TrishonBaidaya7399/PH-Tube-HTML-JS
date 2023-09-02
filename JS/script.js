
let sortByViews = false; 
let currentCategory = 'all'; 

const categoryData = {
    all: [],
    music: [],
    comedy: [],
    drawing: [],
};

const loadCard = async (category_id = 1000) => {
    console.log(category_id);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await res.json();
    const videos = data.data;
    console.log(videos);
  
  categoryData[currentCategory] = videos;

  displayVideos(categoryData[currentCategory]);
};



const displayVideos = videos => {
    const cardContainer = document.getElementById('card-container');
    // Clear the existing content in cardContainer
    cardContainer.innerHTML = '';
    //sorting of data if clicked on sort by view
       if (sortByViews) {
        // Sort videos by views in descending order
        videos.sort((a, b) => {
            const viewA = parseInt(a.others.views.replace('k', '')); 
            const viewB = parseInt(b.others.views.replace('k', '')); 
            return viewB - viewA;
        });
    }
    if (videos.length !== 0) {
        videos.forEach(video => {
            cardContainer.classList.add('grid','grid-cols-1','md:grid-cols-2','lg:grid-cols-4');

            // Posted date
            function convertSecondsToTimeAgo(seconds) {
                const hours = Math.floor(seconds / 3600);
                const remainingSeconds = seconds % 3600;
                const minutes = Math.floor(remainingSeconds / 60);

                let result = '';
                if (hours > 0) {
                    result += `${hours}hrs `;
                }
                if (minutes > 0) {
                    result += `${minutes}min `;
                }

                if (result === '') {
                    result = 'just now';
                } else {
                    result += 'ago';
                }

                return result;
            }

            // Example usage:
            const postedDateSeconds = video.others.posted_date;
            const convertedTimeAgo = convertSecondsToTimeAgo(postedDateSeconds);

            
            const videoCard = document.createElement('div');
            videoCard.classList.add('card', 'mx-auto');
            videoCard.innerHTML = `
                <figure class="relative cursor-pointer">
                    <img id="card_thumbnail" src="${video?.thumbnail}" alt="" class="rounded-xl w-[300px] h-[200px]" />
                    <h1 class="absolute rounded bottom-[10px] right-[10px] py-1 px-2 bg-black text-white text-[10px]">${convertedTimeAgo}</h1>
                </figure>
                <div class="card-body pt-[20px] pl-0">
                    <div class="card-title">
                        <img id="card_profile_picture_${video.id}" src="${video.authors[0].profile_picture}" alt="" class="rounded-full w-[40px] h-[40px]">
                        <h1 id="card-title">${video?.title}</h1>
                    </div>
                    <div class="flex flex-row justify-start gap-2">
                        <div>
                            <p class="w-auto card_profile_name pl-[46px] text-gray-500 text-[16px]">${video.authors[0].profile_name}</p>
                        </div>
                        <div>
                            <img id="card_verified_${video.id}" src="./images/verified.png" alt="" class="w-[20px] h-[20px] ${video.authors[0].verified ? '' : 'hidden'}">
                        </div>
                    </div>
                    <div class="card-actions justify-start">
                        <p class="card-view pl-[46px] text-gray-500 text-[16px]">${video.others.views}</p>
                    </div>
                </div>
            `;

            // Append the div element to the card container
            cardContainer.appendChild(videoCard);
        });
    } else {
        const errorCard = document.createElement('div');
        cardContainer.classList.remove('grid', 'grid-cols-4');
        errorCard.classList.add('error-card', 'flex', 'flex-col', 'items-center', 'justify-center', 'h-[400px]');
        errorCard.innerHTML = `
            <img class="w-[140px] h-[140px]" src="./images/Icon.png" alt="">
            <div class="text-center">
                <h1 class="text-[32px] font-bold">Oops!! Sorry, There is no </h1>
                <h1 class="text-[32px] font-bold">content here</h1>
            </div>
        `;

        // Append the div element to the card container
        cardContainer.appendChild(errorCard);
    }
};

const btnSortByView = document.getElementById('btn-sort-by-view');
btnSortByView.addEventListener('click', () => {
    sortByViews = true; 
    displayVideos(categoryData[currentCategory]); 
    btnSortByView.style.backgroundColor ='#FF1F3D'
    btnSortByView.style.color ='white'
    btnSortByView.innerText='Sorted'
});

const btnAll = document.getElementById('btn-all');
btnAll.addEventListener('click', () => {
    currentCategory = 'all'; 
    loadCard(1000); 
});

const btnMusic = document.getElementById('btn-music');
btnMusic.addEventListener('click', () => {
    currentCategory = 'music'; 
    loadCard(1001); 
});

const btnComedy = document.getElementById('btn-comedy');
btnComedy.addEventListener('click', () => {
    currentCategory = 'comedy'; 
    loadCard(1003); 
});
const btnDrawing = document.getElementById('btn-drawing');
btnDrawing.addEventListener('click', () => {
    currentCategory = 'drawing'; 
    loadCard(1005); 
});

document.addEventListener('DOMContentLoaded', () => {
    // Set the "All" button as active by adding the 'active' class
    const btnAll = document.getElementById('btn-all');
    btnAll.classList.add('active');
    
    // Load data for the default category without sorting by views
    loadCard();
});







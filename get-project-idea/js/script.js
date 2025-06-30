document.addEventListener("DOMContentLoaded", () => {
    const projectSection = document.getElementById("projectSection");
    const exploreBtn = document.getElementById("exploreBtn");
    const filterDropdown = document.getElementById("filterDropdown");

    exploreBtn.addEventListener("click", () => {
        const offset = 140; // Adjust this value for how much to hide the top of the section
        const sectionPosition = projectSection.getBoundingClientRect().top + window.scrollY;

        // Scroll with offset
        window.scrollTo({
            top: sectionPosition - offset,
            behavior: "smooth",
        });
    });


    const projectData = [
        {
            id: "Tag Analyzer and Organizer",
            name: "Tag Analyzer and Organizer",
            description:
                "This tool allows users to track and analyze the number of tags (such as HTML, XML, or any custom tags) used in a given file or webpage. It generates a comprehensive database of tags, providing detailed insights into their usage. This data can then be accessed to generate reports, optimize content for web pages, or streamline tagging practices for SEO purposes. This tool allows users to track and analyze the number of tags (such as HTML, XML, or any custom tags) used in a given file or webpage. It generates a comprehensive database of tags, providing detailed insights into their usage. This data can then be accessed to generate reports, optimize content for web pages, or streamline tagging practices for SEO purposes.",
            img: "https://plus.unsplash.com/premium_photo-1676150789920-da4613e518e3?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Web Development",
        },
        {
            id: "Drone Dashboard for Agriculture",
            name: "Drone Dashboard for Agriculture",
            description:
                "This app revolutionizes farming by using drones for precision spraying of pesticides or water. It ensures complete field coverage with no overlap or wastage, while preventing spillage outside the selected boundary. The process is seamless: prepare the drone, connect it to the app via Wi-Fi, sync with a local map (e.g., Google Maps) for clear visuals, select the field area to spray, and start with a single tap. The app guarantees even distribution, making drone-based farming more efficient, eco-friendly, and resource-saving.",
            img: "https://plus.unsplash.com/premium_photo-1664478063149-295e8449a105?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Agriculture",
        },
        {
            id: "Smart Chess: Learn with Tech",
            name: "Smart Chess: Learn with Tech",
            description:
                "An innovative project to help chess learners improve their skills by combining technology with traditional chessboards. The mobile app will use computer vision (OpenCV) to track moves on a physical chessboard, alerting users if they make an incorrect move and suggesting legal moves to enhance learning. It will also integrate with a chess engine (via Chess.js) for game analysis and improvement tips. By bridging the gap between physical gameplay and digital assistance, this app aims to make chess learning more interactive, accessible, and effective for players at all levels.",
            img: "img/chessimg.jpg",
            category: "Game Development",
        },
        {
            id: "TaskMaster: A Simple To-Do Web App",
            name: "TaskMaster: A Simple To-Do Web App",
            description:
                "TaskMaster is a user-friendly to-do web app designed to help users manage their tasks effectively. With an intuitive interface, users can easily create, edit, and delete tasks, categorize them, and mark them as completed. The app offers features like task prioritization, deadlines, and reminders, ensuring that nothing is forgotten. Tasks are stored locally in the browser or can be synced with an online database for easy access across devices. Whether it's for personal productivity or team collaboration, TaskMaster makes organizing daily tasks straightforward and efficient.",
            img: "https://images.unsplash.com/1/iphone-4-closeup.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Web Development",
        },
        {
            id: "Personalized Health Monitoring System",
            name: "Personalized Health Monitoring System",
            description:
                "This project uses data from wearable devices like fitness bands or smartwatches to monitor health metrics such as heart rate, steps, sleep patterns, and calorie intake. By applying predictive analytics, the system identifies early warning signs of health issues like irregular heart rhythms or fatigue. It also provides personalized recommendations to improve health, such as adjusting sleep schedules, increasing exercise, or managing stress.",
            img: "https://images.unsplash.com/photo-1640622659144-18a1fd885123?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Health",
        },
        {
            id: "Smart Urban Traffic Management",
            name: "Smart Urban Traffic Management",
            description:
                "In metropolitan areas, traffic congestion is a major problem. This project involves collecting real-time traffic data from GPS devices, road sensors, and cameras. Using machine learning models, it predicts traffic density and congestion patterns. The solution can optimize traffic signals, suggest less congested routes to drivers, and even propose infrastructure improvements for long-term benefits.",
            img: "https://images.unsplash.com/photo-1490855680410-49b201432be4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFRyYWZmaWN8ZW58MHx8MHx8fDA%3D",
            category: "Transportation",
        },
        {
            id: "Dynamic Pricing Engine for E-commerce",
            name: "Dynamic Pricing Engine for E-commerce",
            description:
                "This project focuses on developing an intelligent pricing system for online stores. Using data like competitor prices, seasonal trends, user browsing behavior, and inventory levels, a machine learning model can dynamically adjust product prices. For example, if a product is in high demand but stock is low, the system can increase the price to maximize revenue while balancing customer satisfaction.",
            img: "https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "E-commerce",
        },
        {
            id: "AI-Powered Legal Document Summarizer",
            name: "AI-Powered Legal Document Summarizer",
            description:
                "Legal documents are often lengthy and complex. Using Natural Language Processing (NLP), this project aims to build a tool that extracts key points and generates concise summaries. It could highlight clauses, deadlines, and obligations while maintaining accuracy. This tool can be especially useful for lawyers, businesses, and individuals needing quick insights from contracts or agreements.",
            img: "https://plus.unsplash.com/premium_photo-1661371722601-649566b65add?q=80&w=1814&auto=format&fit=crop&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "AI & NLP",
        },
        {
            id: "Emotion Detection from Speech",
            name: "Emotion Detection from Speech",
            description:
                "This project involves creating a machine learning model that can analyze speech recordings and identify emotional tones such as happiness, sadness, anger, or stress. By combining audio processing and ML techniques, the tool can have applications in customer service (e.g., detecting frustrated customers), mental health support (e.g., tracking emotional well-being), and entertainment (e.g., dynamic game responses).",
            img: "https://plus.unsplash.com/premium_photo-1697474429751-abb0a7057980?q=80&w=2070&auto=format&fit=crop&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "AI & ML",
        },
        {
            id: "Crop Yield Prediction System",
            name: "Crop Yield Prediction System",
            description:
                "Using agricultural data such as soil properties, historical weather, and crop types, this project develops a machine learning model to predict crop yields. This can help farmers and policymakers make informed decisions about planting strategies, resource allocation, and market planning. Satellite images and IoT sensors can be integrated for real-time updates and precision agriculture.",
            img: "https://plus.unsplash.com/premium_photo-1664303828953-3e8ef4ac44e2?q=80&w=2071&auto=format&fit=crop&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Agriculture",
        },
        {
            id: "Fraud Detection in Insurance Claims",
            name: "Fraud Detection in Insurance Claims",
            description:
                "Insurance fraud costs companies billions annually. This project uses historical claims data and machine learning techniques to identify patterns that are indicative of fraud, such as inconsistencies in reporting, unusual claim amounts, or frequent claims from the same individual. The model can flag suspicious cases for further investigation, improving efficiency and reducing costs.",
            img: "https://plus.unsplash.com/premium_photo-1663076053540-6b212f864e22?q=80&w=2070&auto=format&fit=crop&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Finance",
        },
        {
            id: "Customized Learning Path Generator",
            name: "Customized Learning Path Generator",
            description:
                "This project designs a recommendation system for online learning platforms. Using data on user preferences, performance, and goals, the system suggests personalized courses and learning materials. For instance, if a user struggles with specific concepts in programming, the model can recommend tutorials or practice exercises to address those gaps, creating an adaptive learning experience.",
            img: "https://images.unsplash.com/photo-1472220625704-91e1462799b2?q=80&w=2070&auto=format&fit=crop&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Education",
        },
        {
            id: "Waste Sorting and Recycling Analyzer",
            name: "Waste Sorting and Recycling Analyzer",
            description:
                "With an increasing focus on sustainability, this project aims to automate waste sorting using image recognition. By training a model on images of recyclable and non-recyclable materials, the system can identify and categorize items like plastic, glass, paper, and metal. This solution can be implemented in recycling plants to improve sorting efficiency and reduce human error.",
            img: "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?q=80&w=1974&auto=format&fit=crop&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Sustainability",
        },
        {
            id: "Real-Time Sentiment Analysis for Brands",
            name: "Real-Time Sentiment Analysis for Brands",
            description:
                "This project develops a tool that collects and analyzes social media data, reviews, and customer feedback in real time. Using NLP and sentiment analysis, the model identifies public opinion about a brand, including positive, negative, and neutral sentiments. Businesses can use these insights to track the success of marketing campaigns, respond to crises, or improve their products and services.",
            img: "https://plus.unsplash.com/premium_photo-1676673189412-56a98d221c11?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Marketing",
        },
    ];

    // Function to dynamically add categories to the dropdown
    function updateFilterOptions() {
        const uniqueCategories = ["all", ...new Set(projectData.map((p) => p.category))];

        filterDropdown.innerHTML = uniqueCategories
            .map((category) => `<option value="${category}">${category}</option>`)
            .join("");
    }

    // Function to filter projects by category
    function filterProjects(category) {
        const filteredProjects =
            category === "all" ? projectData : projectData.filter((p) => p.category === category);

        renderCards(filteredProjects);
    }

    // Add event listener to the filter dropdown
    filterDropdown.addEventListener("change", (e) => {
        filterProjects(e.target.value);
    });

    // Function to render project cards
    function renderCards(data) {
        projectSection.innerHTML = ""; // Clear existing content

        data.forEach((project) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("data-project-id", project.id);

            card.innerHTML = `
                <div class="category-label">${project.category}</div>
                    <img src="${project.img}" alt="Project Image" class="card-img" />
                    <h3>${project.name}</h3>
                    `;
            projectSection.appendChild(card);
        });

        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
            card.addEventListener("click", () => {
                const projectId = card.getAttribute("data-project-id");
                lastScrollPosition = window.scrollY; // Save scroll position
                loadProjectPage(projectId);
            });
        });
    }

    // Function to add a new project (updates both projectData and filter options)
    function addProject(project) {
        projectData.push(project);
        updateFilterOptions();
        renderCards(projectData);
    }

    const projectDetails = document.getElementById("project-details");
    const backButton = document.getElementById("back-button");
    const detailsContent = document.getElementById("details-content");

    function loadProjectPage(projectId) {
        const project = projectData.find((p) => p.id === projectId);
        if (project) {
            detailsContent.innerHTML = `
        <div class="category-label">${project.category}</div>
        <h2>${project.name}</h2>
        <p><strong>Description:</strong> ${project.description}</p>
    `;
        } else {
            detailsContent.innerHTML = `<p>Project details not found.</p>`;
        }
        document.querySelector(".card-container").style.display = "none"; // Hide cards
        projectDetails.classList.add("active"); // Show full page
    }

    let lastScrollPosition = 0;

    //back to last visit project page
    backButton.addEventListener("click", () => {
        projectDetails.classList.remove("active");
        detailsContent.innerHTML = ""; // Clear content
        document.querySelector(".card-container").style.display = "grid"; // Show cards
        window.scrollTo(0, lastScrollPosition); // Restore scroll position
    });


    // Initialize
    updateFilterOptions();
    renderCards(projectData);

    // Example: Adding a new project
    addProject({
        id: "ai-assistant",
        name: "AI Virtual Assistant",
        description:
            "An AI-powered virtual assistant to help manage tasks, schedule meetings, and provide recommendations.",
        img: "https://plus.unsplash.com/premium_photo-1661659623415-2144eaba42b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Artificial Intelligence",
    });
    addProject({
        id: "weather-app",
        name: "Weather Forecast App",
        description:
            "A weather app that provides real-time updates, forecasts, and weather alerts for users worldwide.",
        img: "https://plus.unsplash.com/premium_photo-1664303017917-71ebeb42343d?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Web Development",
    });
    addProject({
        id: "recipe-hub",
        name: "Recipe Hub: Your Digital Cookbook",
        description:
            "A comprehensive platform where users can explore a vast collection of recipes from around the world. Users can upload their own recipes, categorize them by cuisine or meal type, and share them with the community. Advanced features include personalized meal planners, grocery lists, and filters for dietary preferences such as vegan, keto, or gluten-free.",
        img: "https://images.unsplash.com/photo-1601315379734-425a469078de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVjaXBlfGVufDB8fDB8fHww",
        category: "Web Development",
    });
    
    addProject({
        id: "habit-tracker",
        name: "Habit Tracker",
        description:
            "A web application designed to help users cultivate positive habits and break bad ones. It features a visually appealing interface with streak trackers, motivational quotes, and gamification elements. Users can set goals, receive daily reminders, and monitor their progress through detailed analytics and charts.",
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Productivity",
    });
    
    addProject({
        id: "virtual-art-gallery",
        name: "Virtual Art Gallery",
        description:
            "An innovative platform for artists and art lovers, featuring a 3D virtual gallery to showcase digital and traditional artworks. Users can interact with the gallery by zooming into paintings, reading detailed descriptions, and exploring artist biographies. Includes features like a virtual auction system and online purchasing options.",
        img: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=2044&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Arts & Culture",
    });
    
    addProject({
        id: "language-exchange",
        name: "Language Exchange Platform",
        description:
            "A social platform connecting users from different countries to practice languages with each other. Features include text, voice, and video chat options, along with a real-time translation tool and language-specific exercises. Gamified elements like badges and leaderboards keep users motivated to learn.",
        img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Education",
    });
    
    addProject({
        id: "pet-adoption",
        name: "Pet Adoption Website",
        description:
            "A platform that bridges the gap between animal shelters and potential adopters. Users can browse profiles of available pets, filter by species, age, and location, and contact shelters directly. The platform includes a blog section with tips on pet care, training, and adoption success stories.",
        img: "https://images.unsplash.com/photo-1543206890-69843998edd0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Social Good",
    });
    
    addProject({
        id: "freelancer-portfolio",
        name: "Freelancer Portfolio Builder",
        description:
            "An intuitive tool for freelancers to create and manage stunning online portfolios. Includes customizable templates, an integrated project showcase, and analytics to track profile views and client engagement. Users can also receive client reviews and manage their work history on the platform.",
        img: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Business",
    });
    
    addProject({
        id: "travel-planner",
        name: "Travel Planner App",
        description:
            "A feature-rich travel planning application allowing users to create detailed itineraries. Includes integration with Google Maps for route planning, hotel and flight booking options, and recommendations for local attractions. Users can save itineraries, share them with friends, and receive notifications for upcoming trips.",
        img: "https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Travel",
    });
    
    addProject({
        id: "fitness-dashboard",
        name: "Fitness Dashboard",
        description:
            "An all-in-one fitness dashboard that syncs with wearable devices to track health metrics such as heart rate, steps, and calories burned. Features personalized workout recommendations, goal tracking, and community challenges to encourage healthy competition among users.",
        img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Health & Wellness",
    });
    
    addProject({
        id: "event-organizer",
        name: "Event Organizer Web App",
        description:
            "An online platform for planning and managing events. Users can create events, manage guest lists, send invites, and track RSVPs. Includes features for scheduling, ticket sales, and integration with social media for promotions.",
        img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Event Management",
    });
    
    addProject({
        id: "eco-friendly-tips",
        name: "Eco-Friendly Living Tips",
        description:
            "A web app providing actionable tips and resources for sustainable living. Features include eco-friendly product recommendations, a blog with green lifestyle ideas, and a community forum for sharing experiences and advice on reducing environmental impact.",
        img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Sustainability",
    });
});
# City Hunter

City Hunter is a Vue.js-based application that gamifies city exploration and local marketing. This demo focuses on the player-side experience for completing a single scavenger hunt, powered by Google Maps Platform and photorealistic 3D Maps.  

This project was developed for the [Google 3D Maps Hackathon](https://google3dmaps.devpost.com/). Check out our submission on [Devpost](https://google3dmaps.devpost.com/) for more details.

---

## Features

### Current Demo Features
- **Interactive Scavenger Hunt**: Players can select a hotspot, navigate to the destination, and complete a single hunt experience.
- **Immersive Navigation**: Powered by Google 3D Maps, the navigation offers lifelike visuals and intuitive guidance.
- **Check-In and Rewards**: Players can check in at the destination and receive static, placeholder rewards.

### Planned Features
- **Business-Side Management**: Tools for businesses to create scavenger hunts and customize their maps.
- **Social Integration**: Sharing achievements and collaborating with friends for group hunts.
- **Expanded Player Features**: Multi-hunt support and dynamic reward systems.

---

## How to Run the Demo

#### Prerequisites
- **Node.js** and **npm** installed on your machine.
- A valid **Google Maps API Key** from the [Google Cloud Console](https://console.cloud.google.com/).

#### Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone https://github.com/Esprz/CityHunter.git
   cd city-hunter
    ```
2. **Install Dependencies**
   ```bash
   npm install
    ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the city-hunter folder.
   - Add your Google Maps API key:
     ```bash
     VUE_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
     ```

4. **Run the Development Server**
   ```bash
   npm run serve
    ```
5. **Access the Application**
   ```bash
   Open your browser and go to `http://localhost:5173`.
    ```

## Testing Instructions

1. Visit the live demo of the application at [City Hunter Demo](https://city-hunter.vercel.app/).  
   - **Note**: Always start from the main link `https://city-hunter.vercel.app/`. Starting from specific paths (e.g., `https://city-hunter.vercel.app/hunt`) is not supported and may result in unexpected behavior.  
2. Follow the red tutorial card and click the arrow to complete the tutorial steps.  
3. Click **‘I’m ready to start’** to begin the scavenger hunt.  
4. Click the **magnifying glass icon** on the To-Do card header to view the list of all hotspots.  
5. Click the **down arrow** to return to the hunt map.  
6. Click the **marker with a coffee mug** to view the polygon-outlined hotspot and store details.  
7. Click the **magnify button** to maximize the store details card.  
8. Click the **close icon** to restore the store details card to its original size.  
9. Click the **Get Direction** button to start the first journey.  

   - In this demo, a default start location is set, and movement is emulated.  
   - Pay attention to the distance widget as it decreases while moving towards the destination.  

10. After reaching the destination, take a photo or upload a check-in photo to complete the check-in.  
    - Upon successful check-in:
      - An icon will appear in the Achieved widget.
      - One icon in the To-Do widget will decrease.  
      - The distance and walk time in the blue widget will automatically update for the next stop.  
      - Alternatively, you can drag the map and click on another store’s marker to set it as the next stop manually.  

11. Feel free to explore other stores.  
12. After completing 1/3 of the stores, different reward pop-up cards will appear, and you will become eligible to redeem coupons.  
    
Enjoy your scavenger hunt! 🎉

---  

## Challenges Faced

1. **Navigation in 3D Maps**:  
   - The 3D Maps library does not natively support navigation or directions, which posed a challenge in providing users with a seamless travel experience. To address this, we emulated movement by breaking routes into smaller segments and combining custom logic with FlyCameraTo. This approach allowed us to simulate smooth and dynamic navigation, creating an engaging experience for users.

2. **Building Highlighting**:  
   - Highlighting specific buildings required us to estimate their outlines, as no native API exists to retrieve building outlines directly from addresses or locations. We overcame this by developing a custom function to calculate the approximate positions of the building's vertices, enabling us to draw polygons and effectively highlight hotspots within the application.

3. **Performance Optimization for 3D Maps and Elements**:  
   - Loading 3D Maps and other 3D elements was initially slow, leading to rendering delays. To improve performance, we utilized Pinia to store preloaded map and 3D element states, reducing unnecessary render cycles and ensuring faster interactions.  
   - Additionally, we used Pinia to manage various UI states and store-related information, such as user progress and hotspot visibility, providing a more efficient and responsive user experience.


---  

## Future Enhancements  

- **Multi-Hunt Functionality**: Allow players to embark on multiple hunts and track progress.  
- **Business Features**: Develop a dashboard for businesses to manage scavenger hunts.  
- **Dynamic Rewards**: Implement a backend system for real-time, customized rewards.  
- **First-Person Navigation**: Add immersive navigation features with first-person views to enhance user engagement.  

---  

City Hunter is just beginning its journey, offering a glimpse into the exciting potential of gamified city exploration. Stay tuned for more features and updates!  

# City Hunter

City Hunter is a Vue.js-based application that gamifies city exploration and local marketing. This demo focuses on the player-side experience for completing a single scavenger hunt, powered by Google Maps Platform and photorealistic 3D Maps.  

This project was developed for the [Google 3D Maps Hackathon](https://google3dmaps.devpost.com/). 
Check out our submission on [Devpost](https://devpost.com/software/city-hunter-i25zc3/) for more details.

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

1. **Access the Demo**  
   Visit the live demo at [City Hunter Demo](https://city-hunter.vercel.app/).  
   - **Important**: Always start from the main link: `https://city-hunter.vercel.app/`. Starting from specific paths (e.g., `https://city-hunter.vercel.app/hunt`) is not supported and may result in unexpected behavior.  

2. **Complete the Tutorial**  
   Follow the red tutorial card and click the arrow to complete each tutorial step.

3. **Start the Hunt**  
   Click **‘I’m ready to start’** to begin the scavenger hunt adventure.

4. **View Hotspots List**  
   - Click the **magnifying glass icon** on the To-Do card header to see all hotspots.  
   - Click the **down arrow** to return to the hunt map.

5. **Explore Hotspots**  
   - Click any **marker** or the top destination name widget to view the hotspot's polygon outline and store details.  
   - **Recommended Starting Point**: Golden Bakery (the default first stop, croissant with a coffee mug marker).  

6. **Interact with Store Details**  
   - Click the **magnify button** to maximize the store details card.  
   - Use the **close icon** to restore the card to its original size.

7. **Start Your Journey**  
   - On the **store details card**, click **Get Direction** to begin navigating to your first destination.  
   - **Note**: In the full version, the app would use real-time user location and provide actual navigation based on movement. However, for this demo, a default start location is set, and movement is simulated to showcase the functionality.  
   - Watch the distance widget as it updates, showing progress toward your destination.

8. **Check-In at the Destination**  
   - Take or upload a photo to check in upon arrival.  
   - After a successful check-in:
     - An icon will appear in the Achieved widget.
     - The To-Do widget's remaining count will decrease.
     - The distance and walk time in the blue widget will update for your next destination.  
   - **Optional**: You can click on another store’s marker to manually set it as the next stop. Dragging the map is optional for easier navigation.

9. **Explore More**  
   - Feel free to discover other stores and landmarks.

10. **Earn Rewards**  
    - Complete 1/3 of the stores to unlock rewards and redeem coupons through pop-up cards.

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

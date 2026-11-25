class DogSpotlight extends HTMLElement {
    
    static get observedAttributes() {
        return ["compact"];
    }

    attributeChangedCallback(name, oldValue, newValue){
        
        // checks whether the attribute that triggered attributeChangedCallback() is named
        // compact
        if (name === "compact"){
            const image = this.querySelector("img");

            // if image exists
            if (image) {
                if (this.hasAttribute("compact")){
                    image.style.width = "200px";
                } else {
                    image.style.width = "400px";
                }
            }
        }
    }
    
    connectedCallback() {
        const dogs = [
                    {   
                        breed: "golden retriever",
                        image: "images/golden-retriever.jpg"
                    },
                    {
                        breed: "german shepherd",
                        image: "images/german-shepherd.jpg"
                    },
                    {
                        breed: "corgi",
                        image: "images/corgi.jpg"
                    }];

        const heading = document.createElement("h3");
        heading.textContent = "dog spotlight";

        const image = document.createElement("img");
        image.src = dogs[0].image;
        image.alt = dogs[0].breed;
        image.style.width = this.hasAttribute("compact") ? "200px" : "400px";

        const breed = document.createElement("p");
        breed.textContent = dogs[0].breed;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Surprise me with a dog";

        //creates a par element
        const status = document.createElement("p");
        //set initial text, adds text to par
        status.textContent = "Discover a new dog!";
        //adds an accessibility attribute to par
        //role = "status", tells assistive tech (like screen readers)
        //that this element contains status info that may change
        status.setAttribute("role", "status");

        this.appendChild(heading);
        this.appendChild(image);
        this.appendChild(breed);
        this.appendChild(button);
        this.appendChild(status);

        button.addEventListener("click", async () => {
            status.textContent = "loading another dog..."
            button.disabled = true;


            try {
                // waits for the API to return a message
                const response = await fetch("https://dog.ceo/api/breeds/image/random");
                
                if (!response.ok){
                    throw new Error("API request failed");
                }
            
                // waits for the response body to be converted into a JS obj
                const data = await response.json();

                if (!data || typeof data.message !== "string"){
                    throw new Error("Invalid API response");
                }

                const imageURL = new URL(data.message);

                if (imageURL.protocol !== "https:"){
                    throw new Error("Invalid image URL");
                }
                
                const parts = imageURL.pathname.split("/");
                const breedName = parts[2] ? parts[2].replaceAll("-", " ") : "unknown breed";

                image.src = imageURL.href;
                image.alt = `Photo of a ${breedName}`;
                breed.textContent = breedName;

                status.textContent = "New dog loaded!";
            } catch (error){
                status.textContent = "Could not load dog :(. Try again."
            } finally {
                button.disabled = false;
            }

        });
    }
}

customElements.define("dog-spotlight", DogSpotlight);

const toggleButton = document.querySelector('#toggle-view');
const spotlight = document.querySelector("dog-spotlight");

toggleButton.hidden = false;

function applyMode(mode) {

    let isCompact;

    if (mode === "compact") {
        isCompact = true;
    } else {
        isCompact = false;
    }

    spotlight.toggleAttribute("compact", isCompact);
    toggleButton.setAttribute("aria-checked", isCompact);
}

try {
    const savedMode = localStorage.getItem("hw5-dog-spotlight-mode");

    applyMode(savedMode);
} catch (error) {
    applyMode("expanded");
    console.warn("Could not retrieve view preference.");
}

toggleButton.addEventListener("click", () => {
    const mode = spotlight.hasAttribute("compact") ? "expanded" : "compact";

    applyMode(mode);

    try {
        localStorage.setItem("hw5-dog-spotlight-mode", mode);
    } catch (error) {
        console.warn("Could not save view preference.");
    }
});
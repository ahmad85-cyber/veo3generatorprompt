document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const addCharacterBtn = document.getElementById('add-character-btn');
    const changeTitleBtn = document.getElementById('change-title-btn');
    const changeStyleBtn = document.getElementById('change-style-btn');
    const resetBtn = document.getElementById('reset-btn');
    let characterCount = 1;

    // --- Event Listeners ---
    generateBtn.addEventListener('click', generatePrompts);
    addCharacterBtn.addEventListener('click', addCharacter);
    changeTitleBtn.addEventListener('click', changeTitle);
    changeStyleBtn.addEventListener('click', changeStyle);
    resetBtn.addEventListener('click', resetForm);

    // --- Core Functions ---
    function generatePrompts() {
        // --- Get General Scene Info ---
        const sceneTitle = document.getElementById('scene-title').value.trim();
        const setting = document.getElementById('setting').value.trim();
        const cameraStyle = document.getElementById('camera-style').value.trim();
        const lighting = document.getElementById('lighting').value.trim();
        const artStyle = document.getElementById('art-style').value.trim();
        const visualQuality = document.getElementById('visual-quality').value.trim();
        const visualDetails2 = document.getElementById('visual-details-2').value.trim();
        const mood = document.getElementById('mood').value.trim();
        const ambience = document.getElementById('ambience').value.trim();
        const negativePrompt = document.getElementById('negative-prompt').value.trim();

        let indonesianPrompt = `JUDUL SCENE: ${sceneTitle}\n\n`;
        let englishPrompt = `A ${visualQuality || '4K'}, ${artStyle || 'cinematic, realistic'} video titled "${sceneTitle}".\n\n`;

        // --- Get Character Info ---
        const characters = document.querySelectorAll('.character-form');
        characters.forEach((charForm, index) => {
            const charNum = index + 1;
            const desc = charForm.querySelector(`#char-desc-${charNum}`).value.trim();
            const voice = charForm.querySelector(`#char-voice-${charNum}`).value.trim();
            const action = charForm.querySelector(`#char-action-${charNum}`).value.trim();
            const expression = charForm.querySelector(`#char-expression-${charNum}`).value.trim();
            const dialogue = charForm.querySelector(`#char-dialogue-${charNum}`).value.trim();

            indonesianPrompt += `--- KARAKTER ${charNum} ---\n`;
            indonesianPrompt += `DESKRIPSI: ${desc}\n`;
            indonesianPrompt += `SUARA: ${voice}\n`;
            indonesianPrompt += `AKSI: ${action}\n`;
            indonesianPrompt += `EKSPRESI: ${expression}\n`;
            indonesianPrompt += `DIALOG: ${dialogue}\n\n`;

            englishPrompt += `--- CHARACTER ${charNum} ---\n`;
            englishPrompt += `DESCRIPTION: ${desc}\n`;
            englishPrompt += `VOICE: ${voice}\n`;
            englishPrompt += `ACTION: ${action}\n`;
            englishPrompt += `EXPRESSION: ${expression}\n`;
            englishPrompt += `DIALOGUE (in Indonesian): ${dialogue.replace(/DIALOG dalam Bahasa Indonesia: Karakter berkata:/i, '').trim()}\n\n`;
        });
        
        // --- Append Scene Details to Prompts ---
        indonesianPrompt += `--- DETAIL SCENE ---\n`;
        indonesianPrompt += `LATAR & WAKTU: ${setting}\n`;
        indonesianPrompt += `GAYA KAMERA: ${cameraStyle}\n`;
        indonesianPrompt += `PENCAHAYAAN: ${lighting}\n`;
        indonesianPrompt += `GAYA VIDEO/ART STYLE: ${artStyle}\n`;
        indonesianPrompt += `KUALITAS VISUAL: ${visualQuality}\n`;
        if (visualDetails2) {
            indonesianPrompt += `DETAIL VISUAL TAMBAHAN 2: ${visualDetails2}\n`;
        }
        indonesianPrompt += `SUASANA: ${mood}\n`;
        indonesianPrompt += `SUARA LINGKUNGAN: ${ambience}\n\n`;
        indonesianPrompt += `NEGATIVE PROMPT: ${negativePrompt}\n`;

        englishPrompt += `--- SCENE DETAILS ---\n`;
        englishPrompt += `SETTING & TIME: ${setting}\n`;
        englishPrompt += `CAMERA STYLE: ${cameraStyle}\n`;
        englishPrompt += `LIGHTING: ${lighting}\n`;
        englishPrompt += `ART STYLE: ${artStyle}\n`;
        englishPrompt += `VISUAL QUALITY: ${visualQuality}\n`;
        if (visualDetails2) {
            englishPrompt += `ADDITIONAL VISUAL DETAILS 2: ${visualDetails2}\n`;
        }
        englishPrompt += `MOOD: ${mood}\n`;
        englishPrompt += `AMBIENCE: ${ambience}\n\n`;
        englishPrompt += `NEGATIVE PROMPT: Avoid the following: ${negativePrompt}\n`;

        // --- Display Prompts ---
        document.getElementById('output-indonesian').value = indonesianPrompt;
        document.getElementById('output-english').value = englishPrompt;
    }

    function resetForm() {
        // Clear all input fields and textareas
        const inputs = document.querySelectorAll('input[type="text"], textarea, input[type="file"]');
        inputs.forEach(input => {
            if (input.type === 'file') {
                input.value = '';
            } else {
                input.value = '';
            }
        });

        // Clear output areas
        document.getElementById('output-indonesian').value = '';
        document.getElementById('output-english').value = '';

        // Remove additional characters
        const charactersContainer = document.getElementById('characters-container');
        const additionalCharacters = charactersContainer.querySelectorAll('.character-form:not(#character-1)');
        additionalCharacters.forEach(char => char.remove());

        // Reset character count
        characterCount = 1;

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function addCharacter() {
        characterCount++;
        const charactersContainer = document.getElementById('characters-container');
        const newCharacterForm = document.createElement('div');
        newCharacterForm.className = 'character-form';
        newCharacterForm.id = `character-${characterCount}`;
        newCharacterForm.innerHTML = `
            <h3>Character ${characterCount}</h3>
            <div class="input-group">
                <label for="char-desc-${characterCount}">2. Deskripsi Karakter Inti</label>
                <textarea id="char-desc-${characterCount}" rows="6" placeholder="Deskripsi untuk karakter ${characterCount}"></textarea>
            </div>
            <div class="input-group">
                <label for="char-voice-${characterCount}">3. Detail Suara Karakter</label>
                <textarea id="char-voice-${characterCount}" rows="5" placeholder="Detail suara untuk karakter ${characterCount}"></textarea>
            </div>
            <div class="input-group">
                <label for="char-action-${characterCount}">4. Aksi Karakter</label>
                <input type="text" id="char-action-${characterCount}" placeholder="Aksi untuk karakter ${characterCount}">
            </div>
            <div class="input-group">
                <label for="char-expression-${characterCount}">5. Ekspresi Karakter</label>
                <input type="text" id="char-expression-${characterCount}" placeholder="Ekspresi untuk karakter ${characterCount}">
            </div>
             <div class="input-group">
                <label for="char-dialogue-${characterCount}">10. Dialog Karakter</label>
                <textarea id="char-dialogue-${characterCount}" rows="3" placeholder="Dialog untuk karakter ${characterCount}"></textarea>
            </div>
            <button class="remove-char-btn" data-char-id="${characterCount}">Remove Character</button>
        `;
        charactersContainer.appendChild(newCharacterForm);

        // Add event listener for the new remove button
        newCharacterForm.querySelector('.remove-char-btn').addEventListener('click', (e) => {
            const charIdToRemove = e.target.getAttribute('data-char-id');
            document.getElementById(`character-${charIdToRemove}`).remove();
        });
    }

    function changeTitle() {
        const newTitle = document.getElementById('new-title-input').value.trim();
        if (newTitle) {
            document.getElementById('main-title').textContent = newTitle;
            document.title = newTitle; // Also update the page title
        }
    }

    function changeStyle() {
        const styleInput = document.getElementById('new-style-input').value.trim().toLowerCase();
        const colors = styleInput.split(',').map(c => c.trim());
        
        if (colors.length >= 3) {
            const [primary, background, text] = colors;
            document.documentElement.style.setProperty('--primary-color', primary);
            document.documentElement.style.setProperty('--background-color', background);
            // Simple check for text color contrast
            const isBgDark = isColorDark(background);
            document.documentElement.style.setProperty('--text-color', text);
            document.documentElement.style.setProperty('--secondary-color', isBgDark ? '#2a2a2a' : '#ffffff');
            document.documentElement.style.setProperty('--input-border-color', isBgDark ? '#555' : '#ddd');
            document.documentElement.style.setProperty('--button-bg-color', primary);
        } else {
            alert('Please provide three colors separated by commas (e.g., "blue, black, white") for Primary, Background, and Text colors.');
        }
    }

    // Helper function to check if a color is dark.
    function isColorDark(colorStr) {
        // This is a simplified check. A proper implementation is more complex.
        // It helps decide text/secondary colors for basic contrast.
        try {
            const color = colorStr.startsWith('#') ? colorStr : `#${colorStr}`; // a guess
            const r = parseInt(color.substr(1, 2), 16);
            const g = parseInt(color.substr(3, 2), 16);
            const b = parseInt(color.substr(5, 2), 16);
            const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
            return yiq < 128;
        } catch (e) {
            return false; // Default to not dark on error
        }
    }
});
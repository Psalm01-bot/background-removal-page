const imageUpload = document.getElementById('imageUpload');
const fileName = document.getElementById('fileName');
const resultContainer = document.getElementById('resultContainer');
const processedImage = document.getElementById('processedImage');
const downloadBtn = document.getElementById('downloadBtn');
const resultSection = document.querySelector('.result-section');

// Remove.bg API Key
const API_KEY = 'wGH5GrNvKVN3VdWDv1gtTypK';
const API_URL = 'https://api.remove.bg/v1.0/removebg';

imageUpload.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file) {
    fileName.textContent = file.name;
    const formData = new FormData();
    formData.append('image_file', file);

    try {
      // Show loading state
      resultContainer.innerHTML = '<p>Processing image...</p>';

      // Call Remove.bg API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'X-Api-Key': API_KEY,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process image');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      // Display processed image
      processedImage.src = imageUrl;
      downloadBtn.href = imageUrl;
      resultSection.style.display = 'block';
    } catch (error) {
      console.error('Error:', error);
      resultContainer.innerHTML = '<p>Error processing image. Please try again.</p>';
    }
  }
});
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const loadingElement = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');
    const refreshButton = document.getElementById('refresh-btn');
    const template = document.getElementById('cat-card-template');
    
    // Load cats when page loads
    loadCats();
    
    // Load cats when refresh button is clicked
    refreshButton.addEventListener('click', loadCats);
    
    function loadCats() {
        // Show loading spinner
        gallery.innerHTML = '';
        loadingElement.classList.remove('d-none');
        errorMessage.classList.add('d-none');
        
        fetch('/api/cats')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(cats => {
                renderCats(cats);
                loadingElement.classList.add('d-none');
            })
            .catch(error => {
                console.error('Error fetching cats:', error);
                loadingElement.classList.add('d-none');
                errorMessage.classList.remove('d-none');
            });
    }
    
    function renderCats(cats) {
        gallery.innerHTML = '';
        
        cats.forEach((cat, index) => {
            const clone = document.importNode(template.content, true);
            
            const img = clone.querySelector('img');
            img.src = cat.url;
            img.alt = `Cat image ${index + 1}`;
            
            const title = clone.querySelector('.card-title');
            title.textContent = `Adorable Cat #${index + 1}`;
            
            gallery.appendChild(clone);
        });
    }
});

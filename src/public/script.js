document.addEventListener('DOMContentLoaded', () => {
    // Fetch application status
    fetch('/api')
        .then(response => response.json())
        .then(data => {
            const statusBadge = document.querySelector('.status-badge');
            const statusText = document.getElementById('status-text');
            
            if (data.status === 'success') {
                statusBadge.classList.add('status-up');
                statusText.textContent = 'System Online';
            } else {
                statusBadge.classList.add('status-down');
                statusText.textContent = 'System Offline';
            }
        })
        .catch(error => {
            console.error('Error fetching status:', error);
            document.getElementById('status-text').textContent = 'Connection Error';
        });
    
    // Fetch application info
    fetch('/api/info')
        .then(response => response.json())
        .then(data => {
            const appInfo = document.getElementById('app-info');
            appInfo.innerHTML = `
                <p><strong>Application:</strong> ${data.app}</p>
                <p><strong>Technology:</strong> ${data.technology}</p>
                <p><strong>Features:</strong></p>
                <ul>
                    ${data.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            `;
        })
        .catch(error => {
            console.error('Error fetching app info:', error);
            document.getElementById('app-info').textContent = 'Failed to load application information';
        });
    
    // Fetch health info
    fetch('/api/health')
        .then(response => response.json())
        .then(data => {
            const healthInfo = document.getElementById('health-info');
            healthInfo.innerHTML = `
                <p><strong>Status:</strong> <span class="${data.status === 'UP' ? 'status-up' : 'status-down'}">${data.status}</span></p>
                <p><strong>Version:</strong> ${data.version}</p>
                <p><strong>Environment:</strong> ${data.environment}</p>
                <p><strong>Server Time:</strong> ${new Date().toLocaleString()}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching health info:', error);
            document.getElementById('health-info').textContent = 'Failed to load health information';
        });
});
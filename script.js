// Asset Management App - Client Side
class AssetManager {
    constructor() {
        this.currentUser = null;
        this.assets = [];
        this.init();
    }

    init() {
        this.checkAuth();
        this.setupEventListeners();
        this.loadAssets();
    }

    // Authentication Methods
    checkAuth() {
        const user = localStorage.getItem('currentUser');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.showApp();
        } else {
            this.showAuth();
        }
    }

    showAuth() {
        document.getElementById('authSection').style.display = 'flex';
        document.getElementById('appSection').style.display = 'none';
        document.getElementById('userInfo').style.display = 'none';
    }

    showApp() {
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('appSection').style.display = 'block';
        document.getElementById('userInfo').style.display = 'flex';
        document.getElementById('currentUser').textContent = `Welcome, ${this.currentUser.username}!`;
    }

    // User Registration
    register(event) {
        event.preventDefault();
        
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.username === username)) {
            this.showNotification('Username already exists!', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            username,
            email,
            password: this.hashPassword(password), // Simple hash for demo
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        this.showNotification('Registration successful! Please login.', 'success');
        this.showTab('login');
        document.getElementById('registerForm').reset();
    }

    // User Login
    login(event) {
        event.preventDefault();
        
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === this.hashPassword(password));

        if (user) {
            user.lastLogin = new Date().toISOString();
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUser = user;
            this.showApp();
            this.showNotification('Login successful!', 'success');
        } else {
            this.showNotification('Invalid username or password!', 'error');
        }
    }

    // Logout
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.showAuth();
        this.showNotification('Logged out successfully!', 'success');
    }

    // Simple password hashing (for demo purposes)
    hashPassword(password) {
        return btoa(password); // Base64 encoding (not secure, just for demo)
    }

    // Asset Management Methods
    loadAssets() {
        const userAssets = JSON.parse(localStorage.getItem(`assets_${this.currentUser?.id}`) || '[]');
        this.assets = userAssets;
        this.renderAssets();
        this.updateDashboard();
    }

    addAsset(event) {
        event.preventDefault();
        
        // Sanitize inputs to prevent injection attacks
        const name = this.sanitizeInput(document.getElementById('assetName').value);
        const description = this.sanitizeInput(document.getElementById('assetDescription').value);
        const type = document.getElementById('assetType').value;
        const customType = this.sanitizeInput(document.getElementById('customType').value);
        const yearPurchased = parseInt(document.getElementById('yearPurchased').value) || null;
        const purchasePrice = parseFloat(document.getElementById('purchasePrice').value) || 0;
        const yearSold = parseInt(document.getElementById('yearSold').value) || null;
        const soldPrice = parseFloat(document.getElementById('soldPrice').value) || null;
        const quality = document.getElementById('quality').value;

        // Validate required fields
        if (!name.trim()) {
            this.showNotification('Please enter an asset name!', 'error');
            return;
        }

        if (!type) {
            this.showNotification('Please select an asset type!', 'error');
            return;
        }

        if (!quality) {
            this.showNotification('Please select a quality rating!', 'error');
            return;
        }

        if (!yearPurchased) {
            this.showNotification('Please enter the year purchased!', 'error');
            return;
        }

        // Use custom type if "other" is selected and custom type is provided
        const finalType = (type === 'other' && customType.trim()) ? customType.trim() : type;

        if (type === 'other' && !customType.trim()) {
            this.showNotification('Please enter a new type!', 'error');
            return;
        }

        const newAsset = {
            id: Date.now(), // Unique, predefined value as per Asset.java
            name,
            description,
            fileType: finalType,
            yearPurchased,
            purchasePrice,
            yearSold,
            soldPrice,
            quality,
            user: this.currentUser, // Maps to Asset.java user property
            createdAt: new Date().toISOString(), // Set timestamp immediately
            updatedAt: new Date().toISOString(), // Set timestamp immediately
            inputMethod: 'manual'
        };

        this.assets.push(newAsset);
        this.saveAssets();
        this.renderAssets();
        this.updateDashboard();
        this.closeAddAssetModal();
        this.showNotification('Asset added successfully!', 'success');
    }

    deleteAsset(assetId) {
        if (confirm('Are you sure you want to delete this asset?')) {
            this.assets = this.assets.filter(asset => asset.id !== assetId);
            this.saveAssets();
            this.renderAssets();
            this.updateDashboard();
            this.showNotification('Asset deleted successfully!', 'success');
        }
    }

    viewAsset(asset) {
        const modal = document.getElementById('assetDetailsModal');
        const title = document.getElementById('assetDetailsTitle');
        const content = document.getElementById('assetDetailsContent');

        title.textContent = asset.name;
        
        const filePreview = `<div style="background: #f7fafc; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 15px;">
            <i class="fas fa-edit" style="font-size: 3rem; color: #a0aec0;"></i>
            <p style="margin-top: 10px; color: #718096;">Asset Entry</p>
            <p style="font-size: 0.9rem; color: #a0aec0;">Manual Reference</p>
        </div>`;

        const qualityColor = {
            'excellent': '#10b981',
            'good': '#3b82f6', 
            'decent': '#f59e0b',
            'poor': '#ef4444'
        };

        content.innerHTML = `
            <div class="asset-details">
                ${filePreview}
                <h4>Description</h4>
                <p>${asset.description || 'No description provided.'}</p>
                
                <h4>Asset Information</h4>
                <p><strong>Name:</strong> ${asset.name}</p>
                <p><strong>Type:</strong> ${asset.fileType}</p>
                <p><strong>Quality:</strong> <span style="color: ${qualityColor[asset.quality] || '#6b7280'}; font-weight: bold;">${asset.quality ? asset.quality.charAt(0).toUpperCase() + asset.quality.slice(1) : 'Not specified'}</span></p>
                <p><strong>Year Purchased:</strong> ${asset.yearPurchased || 'Not specified'}</p>
                <p><strong>Purchase Price:</strong> $${asset.purchasePrice ? asset.purchasePrice.toFixed(2) : '0.00'}</p>
                <p><strong>Year Sold:</strong> ${asset.yearSold || 'Not sold yet'}</p>
                <p><strong>Sold Price:</strong> ${asset.soldPrice ? '$' + asset.soldPrice.toFixed(2) : 'Not sold yet'}</p>
                <p><strong>Created:</strong> ${asset.createdAt ? new Date(asset.createdAt).toLocaleString() : 'Not available'}</p>
                <p><strong>Last Updated:</strong> ${asset.updatedAt ? new Date(asset.updatedAt).toLocaleString() : 'Not available'}</p>
                
                <div style="margin-top: 20px;">
                    <button onclick="assetManager.deleteAsset(${asset.id}); closeAssetDetailsModal();" class="btn btn-danger">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;

        modal.style.display = 'block';
    }

    saveAssets() {
        localStorage.setItem(`assets_${this.currentUser.id}`, JSON.stringify(this.assets));
    }

    renderAssets() {
        const grid = document.getElementById('assetsGrid');
        
        if (this.assets.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-folder-open"></i>
                    <h3>No assets yet</h3>
                    <p>Start by adding your first asset!</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.assets.map(asset => `
            <div class="asset-card">
                <div class="asset-header">
                    <div>
                        <div class="asset-name">${asset.name}</div>
                        <span class="asset-type">${asset.fileType}</span>
                    </div>
                </div>
                <div class="asset-description">${asset.description || 'No description'}</div>
                <div class="asset-meta">
                    <span class="quality-badge" style="background: ${this.getQualityColor(asset.quality)}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">${asset.quality ? asset.quality.charAt(0).toUpperCase() + asset.quality.slice(1) : 'N/A'}</span>
                    <span>${asset.yearPurchased || 'N/A'}</span>
                    <span>$${asset.purchasePrice ? asset.purchasePrice.toFixed(2) : '0.00'}</span>
                </div>
                <div class="asset-actions">
                    <button onclick="assetManager.viewAsset(${JSON.stringify(asset).replace(/"/g, '&quot;')})" class="btn btn-primary">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button onclick="assetManager.deleteAsset(${asset.id})" class="btn btn-danger">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    filterAssets() {
        const searchTerm = document.getElementById('searchAssets').value.toLowerCase();
        const typeFilter = document.getElementById('typeFilter').value;
        
        const filteredAssets = this.assets.filter(asset => {
            const matchesSearch = asset.name.toLowerCase().includes(searchTerm) || 
                                asset.description.toLowerCase().includes(searchTerm);
            const matchesType = !typeFilter || asset.fileType === typeFilter;
            return matchesSearch && matchesType;
        });

        this.renderFilteredAssets(filteredAssets);
    }

    renderFilteredAssets(filteredAssets) {
        const grid = document.getElementById('assetsGrid');
        
        if (filteredAssets.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>No assets found</h3>
                    <p>Try adjusting your search criteria.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = filteredAssets.map(asset => `
            <div class="asset-card">
                <div class="asset-header">
                    <div>
                        <div class="asset-name">${asset.name}</div>
                        <span class="asset-type">${asset.fileType}</span>
                    </div>
                </div>
                <div class="asset-description">${asset.description || 'No description'}</div>
                <div class="asset-meta">
                    <span class="quality-badge" style="background: ${this.getQualityColor(asset.quality)}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem;">${asset.quality ? asset.quality.charAt(0).toUpperCase() + asset.quality.slice(1) : 'N/A'}</span>
                    <span>${asset.yearPurchased || 'N/A'}</span>
                    <span>$${asset.purchasePrice ? asset.purchasePrice.toFixed(2) : '0.00'}</span>
                </div>
                <div class="asset-actions">
                    <button onclick="assetManager.viewAsset(${JSON.stringify(asset).replace(/"/g, '&quot;')})" class="btn btn-primary">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button onclick="assetManager.deleteAsset(${asset.id})" class="btn btn-danger">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateDashboard() {
        const totalAssets = this.assets.length;
        const totalValue = this.assets.reduce((sum, asset) => sum + (asset.purchasePrice || 0), 0);
        const lastUpdated = this.assets.length > 0 
            ? new Date(Math.max(...this.assets.map(a => new Date(a.updatedAt || a.createdAt || Date.now())))).toLocaleString()
            : '-';

        document.getElementById('totalAssets').textContent = totalAssets;
        document.getElementById('totalSize').textContent = `$${totalValue.toFixed(2)}`;
        document.getElementById('lastUpdated').textContent = lastUpdated;
    }

    getQualityColor(quality) {
        const colors = {
            'excellent': '#10b981',
            'good': '#3b82f6',
            'decent': '#f59e0b',
            'poor': '#ef4444'
        };
        return colors[quality] || '#6b7280';
    }

    // Utility Methods
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Modal Methods
    showAddAssetModal() {
        document.getElementById('addAssetModal').style.display = 'block';
    }

    closeAddAssetModal() {
        document.getElementById('addAssetModal').style.display = 'none';
        document.getElementById('addAssetForm').reset();
        // Hide custom type group when modal is closed
        document.getElementById('customTypeGroup').style.display = 'none';
    }

    closeAssetDetailsModal() {
        document.getElementById('assetDetailsModal').style.display = 'none';
    }

    // Tab Methods
    showTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        
        // Show selected tab
        document.getElementById(tabName + 'Tab').classList.add('active');
        event.target.classList.add('active');
    }

    // Event Listeners
    setupEventListeners() {
        // Close modals when clicking outside
        window.onclick = (event) => {
            const addModal = document.getElementById('addAssetModal');
            const detailsModal = document.getElementById('assetDetailsModal');
            
            if (event.target === addModal) {
                this.closeAddAssetModal();
            }
            if (event.target === detailsModal) {
                this.closeAssetDetailsModal();
            }
        };
    }

    // Security Methods
    sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        
        // Remove potentially dangerous characters and patterns
        return input
            .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
            .replace(/javascript:/gi, '') // Remove javascript: protocol
            .replace(/on\w+=/gi, '') // Remove event handlers
            .replace(/data:/gi, '') // Remove data: protocol
            .replace(/vbscript:/gi, '') // Remove vbscript: protocol
            .replace(/file:/gi, '') // Remove file: protocol
            .replace(/ftp:/gi, '') // Remove ftp: protocol
            .replace(/http:/gi, '') // Remove http: protocol
            .replace(/https:/gi, '') // Remove https: protocol
            .replace(/\\/g, '') // Remove backslashes
            .replace(/\.\./g, '') // Remove directory traversal attempts
            .trim();
    }


}

// Global functions for HTML onclick handlers
function login(event) {
    assetManager.login(event);
}

function register(event) {
    assetManager.register(event);
}

function logout() {
    assetManager.logout();
}

function showTab(tabName) {
    assetManager.showTab(tabName);
}

function addAsset(event) {
    assetManager.addAsset(event);
}

function showAddAssetModal() {
    assetManager.showAddAssetModal();
}

function closeAddAssetModal() {
    assetManager.closeAddAssetModal();
}

function toggleCustomType() {
    const typeSelect = document.getElementById('assetType');
    const customTypeGroup = document.getElementById('customTypeGroup');
    const customTypeInput = document.getElementById('customType');
    
    if (typeSelect.value === 'other') {
        customTypeGroup.style.display = 'block';
        customTypeInput.required = true;
        customTypeInput.focus();
    } else {
        customTypeGroup.style.display = 'none';
        customTypeInput.required = false;
        customTypeInput.value = '';
    }
}

function closeAssetDetailsModal() {
    assetManager.closeAssetDetailsModal();
}

function filterAssets() {
    assetManager.filterAssets();
}

// Initialize the app
let assetManager;
document.addEventListener('DOMContentLoaded', () => {
    assetManager = new AssetManager();
});

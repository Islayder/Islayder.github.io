const elements = {
    themeToggle: document.getElementById('themeToggle'),
    avatar: document.getElementById('avatar'),
    name: document.getElementById('name'),
    bio: document.getElementById('bio'),
    location: document.getElementById('location'),
    followers: document.getElementById('followers'),
    following: document.getElementById('following'),
    repos: document.getElementById('repos'),
    repositories: document.getElementById('repositories'),
    searchInput: document.getElementById('searchInput'),
    languageFilter: document.getElementById('languageFilter'),
    loadMore: document.getElementById('loadMore'),
    languageChart: document.getElementById('languageChart'),
    linkedin: document.getElementById('linkedin'),
    twitter: document.getElementById('twitter'),
    instagram: document.getElementById('instagram'),
    mobileMenuButton: document.getElementById('mobileMenuButton'),
    navLinks: document.getElementById('navLinks'),
    contactForm: document.querySelector('.contact-form')
};

const config = {
    username: 'Islayder',
    perPage: 6,
    currentPage: 1,
    allRepositories: [],
    languageColors: {
        JavaScript: '#f1e05a',
        TypeScript: '#2b7489',
        HTML: '#e34c26',
        CSS: '#563d7c',
        Python: '#3572A5',
        Java: '#b07219',
        'C#': '#178600',
        PHP: '#4F5D95',
        Ruby: '#701516',
        Go: '#00ADD8',
        Swift: '#ffac45',
        Kotlin: '#F18E33',
        Rust: '#dea584',
        SQL: '#ffd700',
        default: '#8e8e8e'
    },
    socialLinks: {
        linkedin: 'https://www.linkedin.com/in/islayderjackson',
        twitter: 'https://twitter.com/islayder',
        instagram: 'https://instagram.com/islayderjackson'
    }
};

const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    updateThemeIcon();
};

const toggleTheme = () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
};

const updateThemeIcon = () => {
    const isDark = document.body.classList.contains('dark-theme');
    elements.themeToggle.innerHTML = isDark
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
};

elements.mobileMenuButton.addEventListener('click', () => {
    elements.navLinks.classList.toggle('active');
});

elements.navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        elements.navLinks.classList.remove('active');
    });
});

const handleContactFormSubmit = async (event) => {
    event.preventDefault(); 

    const form = event.target;
    const submitButton = form.querySelector('.submit-btn');
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData.entries());

    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        });

        if (response.ok) {
            showFormMessage('Mensagem enviada com sucesso!', 'success');
            form.reset();
        } else {
            throw new Error('Houve um problema ao enviar sua mensagem.');
        }
    } catch (error) {
        console.error('Erro no envio do formulário:', error);
        showFormMessage('Erro ao enviar. Tente novamente mais tarde.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar Mensagem';
    }
};

const showFormMessage = (message, type) => {
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`; 
    messageElement.textContent = message;

    elements.contactForm.insertAdjacentElement('afterend', messageElement);

    setTimeout(() => {
        messageElement.remove();
    }, 5000);
};

const fetchUserData = async () => {
    try {
        const response = await fetch(`https://api.github.com/users/${config.username}`);
        if (!response.ok) throw new Error('Usuário não encontrado');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        return null;
    }
};

const fetchRepositories = async () => {
    try {
        const response = await fetch(`https://api.github.com/users/${config.username}/repos?per_page=100&sort=updated`);
        if (!response.ok) throw new Error('Falha ao buscar repositórios');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
        return [];
    }
};

const updateUserProfile = (userData) => {
    if (!userData) return;

    elements.avatar.src = userData.avatar_url;
    elements.avatar.alt = `Avatar de ${userData.login}`;
    elements.name.textContent = userData.name || userData.login;
    elements.bio.textContent = userData.bio || 'Biografia não disponível';
    elements.location.textContent = userData.location || 'Localização não especificada';
    elements.followers.textContent = userData.followers;
    elements.following.textContent = userData.following;
    elements.repos.textContent = userData.public_repos;

    elements.linkedin.href = config.socialLinks.linkedin;
    elements.twitter.href = config.socialLinks.twitter;
    elements.instagram.href = config.socialLinks.instagram;

    document.querySelector('.profile-header.skeleton')?.classList.remove('skeleton');
    elements.avatar.classList.remove('skeleton');
    elements.name.classList.remove('skeleton-text');
    elements.bio.classList.remove('skeleton-text');
};

const createRepositoryCard = (repo) => {
    const card = document.createElement('div');
    card.className = 'repository-card';

    const languageColor = config.languageColors[repo.language] || config.languageColors.default;

    card.innerHTML = `
        <h3>${repo.name} ${repo.fork ? '<span class="org-badge">Fork</span>' : ''}</h3>
        <p>${repo.description || 'Descrição não disponível'}</p>
        <div class="repository-meta">
            <div class="language-tag">
                <span class="language-dot" style="background-color: ${languageColor}"></span>
                ${repo.language || 'N/A'}
            </div>
            <span>Atualizado em: ${new Date(repo.updated_at).toLocaleDateString('pt-BR')}</span>
        </div>
    `;
    card.addEventListener('click', () => window.open(repo.html_url, '_blank'));
    return card;
};

const updateRepositoriesList = (repositories) => {
    elements.repositories.innerHTML = '';
    repositories.forEach(repo => {
        const card = createRepositoryCard(repo);
        elements.repositories.appendChild(card);
    });
};

const updateLanguageFilter = (repositories) => {
    const languages = new Set(repositories.map(repo => repo.language).filter(Boolean));
    elements.languageFilter.innerHTML = '<option value="">Todas as Linguagens</option>';
    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language;
        option.textContent = language;
        elements.languageFilter.appendChild(option);
    });
};

const handleSearch = () => {
    const searchTerm = elements.searchInput.value.toLowerCase();
    const languageFilter = elements.languageFilter.value;

    const filteredRepos = config.allRepositories.filter(repo => {
        const matchesSearch = repo.name.toLowerCase().includes(searchTerm) ||
                            (repo.description && repo.description.toLowerCase().includes(searchTerm));
        const matchesLanguage = !languageFilter || repo.language === languageFilter;
        return matchesSearch && matchesLanguage;
    });

    config.currentPage = 1; 
    const paginatedRepos = filteredRepos.slice(0, config.perPage);
    updateRepositoriesList(paginatedRepos);

    elements.loadMore.style.display = filteredRepos.length > config.perPage ? 'block' : 'none';
    elements.loadMore.dataset.fullRepoList = JSON.stringify(filteredRepos); 
};

const handleLoadMore = () => {
    const fullRepoList = JSON.parse(elements.loadMore.dataset.fullRepoList || '[]');
    const start = config.currentPage * config.perPage;
    const end = start + config.perPage;
    const nextRepos = fullRepoList.slice(start, end);

    nextRepos.forEach(repo => {
        const card = createRepositoryCard(repo);
        elements.repositories.appendChild(card);
    });

    config.currentPage++;
    if (end >= fullRepoList.length) {
        elements.loadMore.style.display = 'none';
    }
};

const initialize = async () => {
    initializeTheme();

    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.searchInput.addEventListener('input', handleSearch);
    elements.languageFilter.addEventListener('change', handleSearch);
    elements.loadMore.addEventListener('click', handleLoadMore);

    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    const userData = await fetchUserData();
    updateUserProfile(userData);

    config.allRepositories = await fetchRepositories();
    updateLanguageFilter(config.allRepositories);
    updateRepositoriesList(config.allRepositories.slice(0, config.perPage));
    elements.loadMore.style.display = config.allRepositories.length > config.perPage ? 'block' : 'none';
    elements.loadMore.dataset.fullRepoList = JSON.stringify(config.allRepositories);
};

initialize();
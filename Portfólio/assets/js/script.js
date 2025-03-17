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
    navLinks: document.getElementById('navLinks')
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
    elements.themeToggle.classList.toggle('active');
});

elements.navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        elements.navLinks.classList.remove('active');
        elements.themeToggle.classList.remove('active');
    });
});

const fetchUserData = async () => {
    try {
        const response = await fetch(`https://api.github.com/users/${config.username}`);
        if (!response.ok) throw new Error('Usuário não encontrado');
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        return null;
    }
};

const fetchRepositories = async () => {
    try {
        const response = await fetch(`https://api.github.com/users/${config.username}/repos?per_page=100&sort=updated`);
        if (!response.ok) throw new Error('Falha ao buscar repositórios');
        const repositories = await response.json();
        return repositories;
    } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
        return [];
    }
};

const fetchRepositoryLanguages = async (repoName) => {
    try {
        const response = await fetch(`https://api.github.com/repos/${config.username}/${repoName}/languages`);
        if (!response.ok) throw new Error('Falha ao buscar linguagens do repositório');
        const languages = await response.json();
        return languages;
    } catch (error) {
        console.error('Erro ao buscar linguagens do repositório:', error);
        return {};
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

    elements.avatar.classList.remove('skeleton');
    elements.name.classList.remove('skeleton-text');
    elements.bio.classList.remove('skeleton-text');
};

const createRepositoryCard = async (repo) => {
    const card = document.createElement('div');
    card.className = 'repository-card';

    const updatedAt = new Date(repo.updated_at).toLocaleDateString('pt-BR');

    const languages = await fetchRepositoryLanguages(repo.name);

    const languagesContainer = document.createElement('div');
    languagesContainer.className = 'repository-languages';

    Object.keys(languages).forEach(language => {
        const languageColor = config.languageColors[language] || config.languageColors.default;
        const languageTag = document.createElement('div');
        languageTag.className = 'language-tag';
        languageTag.innerHTML = `
            <span class="language-dot" style="background-color: ${languageColor}"></span>
            ${language}
        `;
        languagesContainer.appendChild(languageTag);
    });

    if (Object.keys(languages).length === 0) {
        const noLanguageTag = document.createElement('div');
        noLanguageTag.className = 'language-tag';
        noLanguageTag.textContent = 'Nenhuma linguagem detectada';
        languagesContainer.appendChild(noLanguageTag);
    }

    card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || 'Descrição não disponível'}</p>
        <div class="repository-meta">
            <span>Atualizado em: ${updatedAt}</span>
        </div>
    `;

    card.appendChild(languagesContainer);

    card.addEventListener('click', () => window.open(repo.html_url, '_blank'));
    return card;
};

const updateRepositoriesList = async (repositories) => {
    elements.repositories.innerHTML = '';
    for (const repo of repositories) {
        const card = await createRepositoryCard(repo);
        elements.repositories.appendChild(card);
    }
};

const updateLanguageFilter = async (repositories) => {
    const languages = new Set();
    for (const repo of repositories) {
        const repoLanguages = await fetchRepositoryLanguages(repo.name);
        Object.keys(repoLanguages).forEach(language => languages.add(language));
    }
    elements.languageFilter.innerHTML = '<option value="">Todas as Linguagens</option>';
    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language;
        option.textContent = language;
        elements.languageFilter.appendChild(option);
    });
};

const updateLanguageChart = (repositories) => {
    const languageCounts = repositories.reduce((acc, repo) => {
        if (repo.languages) {
            Object.keys(repo.languages).forEach(language => {
                acc[language] = (acc[language] || 0) + 1;
            });
        } else if (repo.language) {
            acc[repo.language] = (acc[repo.language] || 0) + 1;
        }
        return acc;
    }, {});

    const maxCount = Math.max(...Object.values(languageCounts));
    elements.languageChart.innerHTML = '';

    Object.entries(languageCounts).forEach(([language, count]) => {
        const percentage = (count / maxCount) * 100;
        const barContainer = document.createElement('div');
        barContainer.className = 'chart-bar';
        barContainer.innerHTML = `
            <div class="bar" style="height: ${percentage}%; background-color: ${config.languageColors[language] || config.languageColors.default}"></div>
            <span class="bar-label">${language}<br>(${count})</span>
        `;
        elements.languageChart.appendChild(barContainer);
    });
};

const handleSearch = async () => {
    const searchTerm = elements.searchInput.value.toLowerCase();
    const languageFilter = elements.languageFilter.value;

    const filteredRepos = await Promise.all(config.allRepositories.map(async (repo) => {
        const repoLanguages = await fetchRepositoryLanguages(repo.name);
        const matchesSearch = repo.name.toLowerCase().includes(searchTerm) ||
                             (repo.description && repo.description.toLowerCase().includes(searchTerm));
        const matchesLanguage = !languageFilter || Object.keys(repoLanguages).includes(languageFilter);
        return matchesSearch && matchesLanguage ? repo : null;
    })).then(results => results.filter(repo => repo !== null));

    updateRepositoriesList(filteredRepos.slice(0, config.perPage * config.currentPage));
    elements.loadMore.style.display = filteredRepos.length > config.perPage * config.currentPage ? 'block' : 'none';
};

const handleLoadMore = () => {
    config.currentPage++;
    handleSearch();
};

const initialize = async () => {
    initializeTheme();

    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.searchInput.addEventListener('input', handleSearch);
    elements.languageFilter.addEventListener('change', handleSearch);
    elements.loadMore.addEventListener('click', handleLoadMore);

    const userData = await fetchUserData();
    updateUserProfile(userData);

    config.allRepositories = await fetchRepositories();
    await updateLanguageFilter(config.allRepositories);
    updateLanguageChart(config.allRepositories);
    handleSearch();
};

initialize();
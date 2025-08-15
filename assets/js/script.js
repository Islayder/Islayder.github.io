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
    contactForm: document.querySelector('.contact-form'),
    languageToggle: document.getElementById('languageToggle')
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

let cachedUserData = null;

// ========== SISTEMA DE TRADUÇÃO ==========
const translations = {
    'pt-BR': {
        'navProfile': 'Perfil',
        'navAbout': 'Sobre Mim',
        'navExperience': 'Experiências',
        'navSkills': 'Habilidades',
        'navRepositories': 'Repositórios',
        'navContact': 'Contato',
        'followers': 'seguidores',
        'following': 'seguindo',
        'repositories': 'repositórios',
        'loading': 'Carregando...',
        'aboutMeTitle': 'Sobre Mim',
        'aboutMeP1': 'Olá! Meu nome é <strong>Islayder</strong>. Sou um profissional de tecnologia com foco em <strong>Análise de Requisitos</strong> e uma forte capacidade para atuar como <strong>Product Owner (PO)</strong>. Minha paixão é conectar a visão de negócio às soluções técnicas, dialogando diretamente com clientes para entender suas dores e transformar ideias em produtos de sucesso.',
        'aboutMeP2': 'Com experiência em metodologias ágeis, sou responsável por definir a visão do produto, priorizar o backlog e garantir que o desenvolvimento esteja alinhado com as expectativas dos stakeholders. Para embasar minhas decisões, utilizo <strong>Python</strong> para análise de dados, extraindo insights que direcionam a estratégia e validam os requisitos do projeto.',
        'academicFormation': 'Formação Acadêmica',
        'experienceTitle': 'Experiências Profissionais',
        'jobTitle': 'Analista de Requisitos',
        'jobPeriod': 'Julho 2025 - Presente',
        'jobDescription': 'Atuo como a principal ponte entre clientes e a equipe de desenvolvimento. Sou responsável por todo o ciclo de vida dos requisitos: desde o levantamento inicial e a definição da visão do produto em conversas com stakeholders, até a priorização do backlog e a criação de histórias de usuário detalhadas. Utilizo Python para análises que suportam a tomada de decisões estratégicas do produto.',
        'skillReqAnalysis': 'Análise de Requisitos',
        'skillProdOwner': 'Product Ownership',
        'skillPython': 'Python para Análise de Dados',
        'skillAgile': 'Metodologias Ágeis',
        'skillBacklog': 'Gestão de Backlog',
        'featuredProjectsTitle': 'Projetos em Destaque',
        'featuredProjectsDesc': 'Uma seleção dos meus principais projetos, com imagens e tecnologias utilizadas.',
        'skillsTitle': 'Habilidades e Ferramentas',
        'allLanguages': 'Todas as Linguagens',
        'repositoriesTitle': 'Repositórios',
        'loadMore': 'Carregar Mais',
        'contactTitle': 'Entre em Contato',
        'contactDesc': 'Tem alguma pergunta ou oportunidade? Preencha o formulário abaixo que responderei em breve.',
        'formName': 'Nome:',
        'formEmail': 'Seu E-mail:',
        'formMessage': 'Mensagem:',
        'formSubmit': 'Enviar Mensagem',
        'footerDevelopedBy': 'Desenvolvido por Islayder',
        'footerBackToTop': 'Voltar ao Topo'
    },
    'en': {
        'navProfile': 'Profile',
        'navAbout': 'About Me',
        'navExperience': 'Experience',
        'navSkills': 'Skills',
        'navRepositories': 'Repositories',
        'navContact': 'Contact',
        'followers': 'followers',
        'following': 'following',
        'repositories': 'repositories',
        'loading': 'Loading...',
        'aboutMeTitle': 'About Me',
        'aboutMeP1': 'Hello! My name is <strong>Islayder</strong>. I am a technology professional focused on <strong>Requirements Analysis</strong> with strong skills as a <strong>Product Owner (PO)</strong>. My passion is connecting business vision with technical solutions, working directly with clients to understand their pain points and transform ideas into successful products.',
        'aboutMeP2': 'With experience in agile methodologies, I am responsible for defining the product vision, prioritizing the backlog, and ensuring development aligns with stakeholder expectations. To support my decisions, I use <strong>Python</strong> for data analysis, extracting insights that guide strategy and validate project requirements.',
        'academicFormation': 'Academic Background',
        'experienceTitle': 'Professional Experience',
        'jobTitle': 'Requirements Analyst',
        'jobPeriod': 'July 2025 - Present',
        'jobDescription': 'I serve as the main bridge between clients and the development team. I am responsible for the entire requirements lifecycle: from initial gathering and product vision definition in stakeholder conversations, to backlog prioritization and creation of detailed user stories. I use Python for analyses that support strategic product decisions.',
        'skillReqAnalysis': 'Requirements Analysis',
        'skillProdOwner': 'Product Ownership',
        'skillPython': 'Python for Data Analysis',
        'skillAgile': 'Agile Methodologies',
        'skillBacklog': 'Backlog Management',
        'featuredProjectsTitle': 'Featured Projects',
        'featuredProjectsDesc': 'A selection of my main projects, with images and technologies used.',
        'skillsTitle': 'Skills and Tools',
        'allLanguages': 'All Languages',
        'repositoriesTitle': 'Repositories',
        'loadMore': 'Load More',
        'contactTitle': 'Contact Me',
        'contactDesc': 'Have a question or opportunity? Fill out the form below and I will respond soon.',
        'formName': 'Name:',
        'formEmail': 'Your Email:',
        'formMessage': 'Message:',
        'formSubmit': 'Send Message',
        'footerDevelopedBy': 'Developed by Islayder',
        'footerBackToTop': 'Back to Top'
    }
};

const updatePageTexts = (lang) => {
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        if (element.id !== 'name') { 
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                if (['P', 'DIV', 'SPAN'].includes(element.tagName)) {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        }
    });
    
    if (cachedUserData) {
        elements.bio.textContent = cachedUserData.bio || (lang === 'pt-BR' ? 'Biografia não disponível' : 'Bio not available');
        elements.location.textContent = cachedUserData.location || (lang === 'pt-BR' ? 'Localização não especificada' : 'Location not specified');
    }
    
    elements.languageToggle.textContent = lang === 'pt-BR' ? 'EN' : 'PT';
    
    elements.loadMore.textContent = lang === 'pt-BR' ? 'Carregar Mais' : 'Load More';
    
    elements.searchInput.placeholder = lang === 'pt-BR' ? 'Buscar repositórios...' : 'Search repositories...';
    
    if (config.allRepositories.length > 0) {
        updateLanguageFilter(config.allRepositories);
    }
    
    localStorage.setItem('preferredLanguage', lang);
};

const initializeLanguage = () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'pt-BR';
    updatePageTexts(savedLang);
    
    elements.languageToggle.addEventListener('click', () => {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'pt-BR' ? 'en' : 'pt-BR';
        updatePageTexts(newLang);
    });
};

// ========== FIM DO SISTEMA DE TRADUÇÃO ==========

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
    submitButton.textContent = document.documentElement.lang === 'pt-BR' ? 'Enviando...' : 'Sending...';
    
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
            showFormMessage(
                document.documentElement.lang === 'pt-BR' 
                    ? 'Mensagem enviada com sucesso!' 
                    : 'Message sent successfully!', 
                'success'
            );
            form.reset();
        } else {
            throw new Error('Houve um problema ao enviar sua mensagem.');
        }
    } catch (error) {
        console.error('Erro no envio do formulário:', error);
        showFormMessage(
            document.documentElement.lang === 'pt-BR' 
                ? 'Erro ao enviar. Tente novamente mais tarde.' 
                : 'Error sending. Try again later.', 
            'error'
        );
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = document.documentElement.lang === 'pt-BR' 
            ? 'Enviar Mensagem' 
            : 'Send Message';
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
    
    cachedUserData = userData;

    if (!elements.avatar.src || elements.avatar.classList.contains('skeleton')) {
        elements.avatar.src = userData.avatar_url;
        elements.avatar.alt = `Avatar de ${userData.login}`;
    }

    if (!elements.name.textContent || elements.name.classList.contains('skeleton-text')) {
        elements.name.textContent = userData.name || userData.login;
    }

    elements.bio.textContent = userData.bio || (document.documentElement.lang === 'pt-BR' ? 'Biografia não disponível' : 'Bio not available');
    elements.location.textContent = userData.location || (document.documentElement.lang === 'pt-BR' ? 'Localização não especificada' : 'Location not specified');

    elements.followers.textContent = userData.followers;
    elements.following.textContent = userData.following;
    elements.repos.textContent = userData.public_repos;

    if (!elements.linkedin.href) {
        elements.linkedin.href = config.socialLinks.linkedin;
        elements.twitter.href = config.socialLinks.twitter;
        elements.instagram.href = config.socialLinks.instagram;
    }

    const profileHeader = document.querySelector('.profile-header.skeleton');
    if (profileHeader) {
        profileHeader.classList.remove('skeleton');
        elements.avatar.classList.remove('skeleton');
        elements.name.classList.remove('skeleton-text');
        elements.bio.classList.remove('skeleton-text');
    }
};

const createRepositoryCard = (repo) => {
    const card = document.createElement('div');
    card.className = 'repository-card';

    const languageColor = config.languageColors[repo.language] || config.languageColors.default;
    const updatedAt = new Date(repo.updated_at).toLocaleDateString(document.documentElement.lang === 'pt-BR' ? 'pt-BR' : 'en-US');

    card.innerHTML = `
        <h3>${repo.name} ${repo.fork ? '<span class="org-badge">Fork</span>' : ''}</h3>
        <p>${repo.description || (document.documentElement.lang === 'pt-BR' ? 'Descrição não disponível' : 'No description available')}</p>
        <div class="repository-meta">
            <div class="language-tag">
                <span class="language-dot" style="background-color: ${languageColor}"></span>
                ${repo.language || 'N/A'}
            </div>
            <span>${document.documentElement.lang === 'pt-BR' ? 'Atualizado em:' : 'Updated:'} ${updatedAt}</span>
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
    elements.languageFilter.innerHTML = `<option value="">${document.documentElement.lang === 'pt-BR' ? 'Todas as Linguagens' : 'All Languages'}</option>`;
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
    initializeLanguage();

    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.searchInput.addEventListener('input', handleSearch);
    elements.languageFilter.addEventListener('change', handleSearch);
    elements.loadMore.addEventListener('click', handleLoadMore);

    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    if (!cachedUserData) {
        const userData = await fetchUserData();
        updateUserProfile(userData);
    } else {
        updateUserProfile(cachedUserData);
    }

    if (config.allRepositories.length === 0) {
        config.allRepositories = await fetchRepositories();
        updateLanguageFilter(config.allRepositories);
    }
    updateRepositoriesList(config.allRepositories.slice(0, config.perPage));
    elements.loadMore.style.display = config.allRepositories.length > config.perPage ? 'block' : 'none';
    elements.loadMore.dataset.fullRepoList = JSON.stringify(config.allRepositories);
};

initialize();
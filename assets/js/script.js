const elements = {
    themeToggle: document.getElementById('themeToggle'),
    avatar: document.getElementById('avatar'),
    name: document.getElementById('name'),
    bio: document.getElementById('bio'),
    location: document.getElementById('location'),
    followers: document.getElementById('followers'),
    following: document.getElementById('following'),
    repos: document.getElementById('repos'),
    projectsTimeline: document.getElementById('projectsTimeline'),
    searchInput: document.getElementById('searchInput'),
    languageFilter: document.getElementById('languageFilter'),
    typeFilter: document.getElementById('typeFilter'),
    techFilter: document.getElementById('techFilter'),
    techOverview: document.getElementById('techOverview'),
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
        React: '#61dafb',
        Vue: '#42b983',
        Angular: '#dd0031',
        'Node.js': '#68a063',
        Django: '#092e20',
        Flask: '#000000',
        Laravel: '#ff2d20',
        Bootstrap: '#563d7c',
        'Tailwind CSS': '#38b2ac',
        Sass: '#cc6699',
        jQuery: '#0769ad',
        Redux: '#764abc',
        GraphQL: '#e10098',
        MongoDB: '#47A248',
        PostgreSQL: '#336791',
        MySQL: '#4479A1',
        Firebase: '#FFCA28',
        Docker: '#2496ED',
        Kubernetes: '#326CE5',
        default: '#8e8e8e'
    },
    techKeywords: {
        'React': ['react', 'reactjs', 'next.js'],
        'Vue.js': ['vue', 'vuejs', 'nuxt'],
        'Angular': ['angular'],
        'Node.js': ['node', 'nodejs', 'express'],
        'Django': ['django'],
        'Flask': ['flask'],
        'Laravel': ['laravel'],
        'Bootstrap': ['bootstrap'],
        'Tailwind CSS': ['tailwind'],
        'Sass': ['sass', 'scss'],
        'jQuery': ['jquery'],
        'Redux': ['redux'],
        'GraphQL': ['graphql'],
        'MongoDB': ['mongodb'],
        'PostgreSQL': ['postgres', 'postgresql'],
        'MySQL': ['mysql'],
        'Firebase': ['firebase'],
        'Docker': ['docker'],
        'Kubernetes': ['kubernetes', 'k8s']
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
        'navRepositories': 'Projetos',
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
        'skillsTitle': 'Habilidades e Ferramentas',
        'allLanguages': 'Todas as Linguagens',
        'allTypes': 'Todos os Tipos',
        'allTechnologies': 'Todas as Tecnologias',
        'professional': 'Profissional',
        'academic': 'Acadêmico',
        'personal': 'Pessoal',
        'projectsTitle': 'Linha do Tempo de Projetos',
        'searchProjects': 'Buscar projetos...',
        'viewCode': 'Código',
        'viewDemo': 'Demo',
        'techOverviewTitle': 'Tecnologias Utilizadas',
        'filterByTech': 'Filtrar por Tecnologia',
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
        'navRepositories': 'Projects',
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
        'skillsTitle': 'Skills and Tools',
        'allLanguages': 'All Languages',
        'allTypes': 'All Types',
        'allTechnologies': 'All Technologies',
        'professional': 'Professional',
        'academic': 'Academic',
        'personal': 'Personal',
        'projectsTitle': 'Projects Timeline',
        'searchProjects': 'Search projects...',
        'viewCode': 'Code',
        'viewDemo': 'Demo',
        'techOverviewTitle': 'Technologies Used',
        'filterByTech': 'Filter by Technology',
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
    elements.searchInput.placeholder = lang === 'pt-BR' ? 'Buscar projetos...' : 'Search projects...';
    
    if (config.allRepositories.length > 0) {
        updateLanguageFilter(config.allRepositories);
        updateTechFilter(config.allRepositories);
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

const fetchRepoLanguages = async (repoName) => {
    try {
        const response = await fetch(`https://api.github.com/repos/${config.username}/${repoName}/languages`);
        if (!response.ok) throw new Error('Falha ao buscar linguagens');
        return await response.json();
    } catch (error) {
        console.error(`Erro ao buscar linguagens do repositório ${repoName}:`, error);
        return {};
    }
};

const detectTechnologies = (repo) => {
    const detectedTechs = [];
    const textToSearch = `${repo.name} ${repo.description || ''} ${repo.topics?.join(' ') || ''}`.toLowerCase();
    
    for (const [tech, keywords] of Object.entries(config.techKeywords)) {
        if (keywords.some(keyword => textToSearch.includes(keyword.toLowerCase()))) {
            detectedTechs.push(tech);
        }
    }
    
    return detectedTechs;
};

const fetchRepositories = async () => {
    try {
        const response = await fetch(`https://api.github.com/users/${config.username}/repos?per_page=100&sort=updated`);
        if (!response.ok) throw new Error('Falha ao buscar repositórios');
        const repos = await response.json();
        
        const reposWithTech = await Promise.all(repos.map(async repo => {
            const languagesData = await fetchRepoLanguages(repo.name);
            const languages = Object.keys(languagesData);
            const technologies = detectTechnologies(repo);
            
            return {
                ...repo,
                languages,
                languagesData,
                technologies,
                allTechs: [...new Set([...languages, ...technologies])] 
            };
        }));
        
        return reposWithTech;
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

const determineProjectType = (repo) => {
    const name = repo.name.toLowerCase();
    const description = repo.description ? repo.description.toLowerCase() : '';
    
    if (name.includes('work') || name.includes('company') || name.includes('professional') || 
        description.includes('work') || description.includes('company') || description.includes('professional')) {
        return 'professional';
    } else if (name.includes('academic') || name.includes('puc') || name.includes('university') || name.includes('college') || 
               description.includes('academic') || description.includes('puc') || description.includes('university') || description.includes('college')) {
        return 'academic';
    }
    return 'personal';
};

const createProjectCard = (repo) => {
    const projectType = determineProjectType(repo);
    const updatedAt = new Date(repo.updated_at);
    const formattedDate = updatedAt.toLocaleDateString(document.documentElement.lang === 'pt-BR' ? 'pt-BR' : 'en-US', {
        year: 'numeric',
        month: 'short'
    });

    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <span class="project-type type-${projectType}" data-translate="${projectType}">${translations[document.documentElement.lang][projectType]}</span>
        <div class="project-header">
            <h3 class="project-title">${repo.name}</h3>
            <span class="project-date">${formattedDate}</span>
        </div>
        <p class="project-description">${repo.description || (document.documentElement.lang === 'pt-BR' ? 'Descrição não disponível' : 'No description available')}</p>
        <div class="project-tech">
            ${repo.allTechs.map(tech => {
                const color = config.languageColors[tech] || config.languageColors.default;
                return `<span class="tech-badge" style="color: ${color}">${tech}</span>`;
            }).join('')}
        </div>
        <div class="project-links">
            <a href="${repo.html_url}" target="_blank" class="project-link" data-translate="viewCode">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                ${document.documentElement.lang === 'pt-BR' ? 'Código' : 'Code'}
            </a>
            ${repo.homepage ? `
            <a href="${repo.homepage}" target="_blank" class="project-link" data-translate="viewDemo">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                </svg>
                ${document.documentElement.lang === 'pt-BR' ? 'Demo' : 'Demo'}
            </a>` : ''}
        </div>
    `;
    
    return card;
};

const updateProjectsTimeline = (repositories) => {
    elements.projectsTimeline.innerHTML = '';
    repositories.forEach((repo, index) => {
        const card = createProjectCard(repo);
        elements.projectsTimeline.appendChild(card);
    });
};

const createTechOverview = (repositories) => {
    const allTechs = new Set();
    const techCounts = {};
    
    repositories.forEach(repo => {
        repo.allTechs?.forEach(tech => {
            allTechs.add(tech);
            techCounts[tech] = (techCounts[tech] || 0) + 1;
        });
    });
    
    const sortedTechs = Array.from(allTechs).sort((a, b) => techCounts[b] - techCounts[a]);
    
    const techOverview = document.createElement('div');
    techOverview.className = 'tech-overview';
    techOverview.innerHTML = `
        <h3 data-translate="techOverviewTitle">${translations[document.documentElement.lang]['techOverviewTitle']}</h3>
        <div class="tech-cloud">
            ${sortedTechs.map(tech => {
                const color = config.languageColors[tech] || config.languageColors.default;
                return `<span class="tech-tag" style="background-color: ${color}20; border-color: ${color}" 
                    title="${techCounts[tech]} ${document.documentElement.lang === 'pt-BR' ? 'projetos' : 'projects'}">
                    ${tech}
                </span>`;
            }).join('')}
        </div>
    `;
    
    return techOverview;
};

const updateLanguageFilter = (repositories) => {
    const languages = new Set();
    
    repositories.forEach(repo => {
        repo.languages?.forEach(lang => languages.add(lang));
    });
    
    const sortedLanguages = Array.from(languages).sort();
    
    elements.languageFilter.innerHTML = `<option value="">${document.documentElement.lang === 'pt-BR' ? 'Todas as Linguagens' : 'All Languages'}</option>`;
    sortedLanguages.forEach(language => {
        const option = document.createElement('option');
        option.value = language;
        option.textContent = language;
        elements.languageFilter.appendChild(option);
    });
};

const updateTypeFilter = () => {
    elements.typeFilter.innerHTML = `
        <option value="">${document.documentElement.lang === 'pt-BR' ? 'Todos os Tipos' : 'All Types'}</option>
        <option value="professional" data-translate="professional">${translations[document.documentElement.lang]['professional']}</option>
        <option value="academic" data-translate="academic">${translations[document.documentElement.lang]['academic']}</option>
        <option value="personal" data-translate="personal">${translations[document.documentElement.lang]['personal']}</option>
    `;
};

const updateTechFilter = (repositories) => {
    const allTechs = new Set();
    
    repositories.forEach(repo => {
        repo.allTechs?.forEach(tech => allTechs.add(tech));
    });
    
    const sortedTechs = Array.from(allTechs).sort();
    
    if (!elements.techFilter) {
        const filterContainer = document.querySelector('.filter-container');
        elements.techFilter = document.createElement('select');
        elements.techFilter.className = 'language-filter';
        elements.techFilter.id = 'techFilter';
        elements.techFilter.setAttribute('data-translate', 'filterByTech');
        filterContainer.appendChild(elements.techFilter);
        
        elements.techFilter.addEventListener('change', handleSearch);
    }
    
    elements.techFilter.innerHTML = `
        <option value="">${document.documentElement.lang === 'pt-BR' ? 'Todas as Tecnologias' : 'All Technologies'}</option>
        ${sortedTechs.map(tech => `
            <option value="${tech}">${tech}</option>
        `).join('')}
    `;
};

const handleSearch = () => {
    const searchTerm = elements.searchInput.value.toLowerCase();
    const languageFilter = elements.languageFilter.value;
    const typeFilter = elements.typeFilter.value;
    const techFilter = elements.techFilter?.value;

    const filteredRepos = config.allRepositories.filter(repo => {
        const matchesSearch = repo.name.toLowerCase().includes(searchTerm) ||
                            (repo.description && repo.description.toLowerCase().includes(searchTerm));
        
        const matchesLanguage = !languageFilter || 
                              (repo.languages && repo.languages.includes(languageFilter));
        
        const matchesTech = !techFilter || 
                          (repo.allTechs && repo.allTechs.includes(techFilter));
        
        const projectType = determineProjectType(repo);
        const matchesType = !typeFilter || projectType === typeFilter;
        
        return matchesSearch && matchesLanguage && matchesType && matchesTech;
    });

    updateProjectsTimeline(filteredRepos);
};

const initialize = async () => {
    initializeTheme();
    initializeLanguage();

    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.searchInput.addEventListener('input', handleSearch);
    elements.languageFilter.addEventListener('change', handleSearch);
    elements.typeFilter.addEventListener('change', handleSearch);

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
        updateTypeFilter();
        updateTechFilter(config.allRepositories);
        
        const projectsSection = document.getElementById('repositorios');
        const timelineContainer = projectsSection.querySelector('.timeline-container');
        projectsSection.insertBefore(
            createTechOverview(config.allRepositories),
            timelineContainer
        );
    }
    updateProjectsTimeline(config.allRepositories);
};

initialize();
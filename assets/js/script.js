const elements = {
    themeToggle: document.getElementById('themeToggle'),
    avatar: document.getElementById('avatar'),
    name: document.getElementById('profileName'),
    bio: document.getElementById('bio'),
    location: document.getElementById('location'),
    followers: document.getElementById('followers'),
    following: document.getElementById('following'),
    repos: document.getElementById('repos'),
    projectsTimeline: document.getElementById('projectsTimeline'),
    featuredProjectsGrid: document.getElementById('featuredProjectsGrid'),
    featuredProjectsEmpty: document.getElementById('featuredProjectsEmpty'),
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
        linkedin: 'https://www.linkedin.com/in/islayderjackson/',
        twitter: 'https://x.com/jacksonlanzing',
        instagram: 'https://www.instagram.com/islayderjackson/'
    },
    hiddenGithubRepos: ['Islayder.github.io'],
    featuredProjects: [
        {
            titleKey: 'featured1Title',
            descriptionKey: 'featured1Description',
            typeKey: 'featured1Type',
            typeClass: 'type-academic',
            technologies: [
                'Java', 'Spring Boot', 'PostgreSQL', 'MVC',
                { key: 'featured1TechMaps' },
                'RabbitMQ', 'WebSockets', 'SQL'
            ],
            repoUrl: null,
            demoUrl: null
        },
        {
            titleKey: 'featured2Title',
            descriptionKey: 'featured2Description',
            typeKey: 'featured2Type',
            typeClass: 'type-academic-practical',
            technologies: [
                'Java', 'Spring Boot', 'PostgreSQL', 'APIs RESTful',
                'Mercado Pago', 'ViaCEP', 'Postman', 'SQL', 'HTML', 'CSS', 'JavaScript'
            ],
            repoUrl: null,
            demoUrl: null
        },
        {
            titleKey: 'featured3Title',
            descriptionKey: 'featured3Description',
            typeKey: 'featured3Type',
            typeClass: 'type-academic-practical',
            technologies: [
                'Java', 'Spring Boot', 'PostgreSQL', 'APIs RESTful',
                'MVC', 'CRUD', 'Mercado Pago', 'ViaCEP', 'SQL'
            ],
            repoUrl: null,
            demoUrl: null
        }
    ]
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
        'aboutMeP1': 'Olá! Meu nome é Islayder Jackson, sou estudante de Engenharia de Software na PUC Minas e desenvolvedor back-end Java em formação, com foco em Spring Boot, APIs RESTful, SQL e PostgreSQL.',
        'aboutMeP2': 'Tenho experiência profissional em requisitos, QA e validação de regras de negócio, atuando na ponte entre áreas de negócio e times técnicos. Essa vivência me ajuda a desenvolver soluções mais alinhadas às necessidades reais dos usuários, com atenção à consistência dos dados, critérios de aceite e qualidade das entregas.',
        'aboutMeP3': 'Atualmente, venho aprofundando meus conhecimentos em desenvolvimento back-end, modelagem de dados, integração com APIs externas, arquitetura MVC, testes de APIs com Postman e construção de sistemas com Java, Spring Boot e bancos relacionais.',
        'academicFormation': 'Formação Acadêmica',
        'educationUniversity': 'Pontifícia Universidade Católica de Minas Gerais (PUC Minas)',
        'educationDegree': 'Engenharia de Software (2024 - Presente)',
        'educationDescription': 'Durante minha graduação, tenho tido a oportunidade de aprofundar meus conhecimentos em programação, banco de dados, redes de computadores e engenharia de software. Além disso, participei de diversos projetos acadêmicos que me permitiram aplicar na prática os conceitos aprendidos em sala de aula.',
        'experienceTitle': 'Experiências Profissionais',
        'job1Title': 'Product Owner / QA Engineer — Estágio',
        'job1Period': 'Out/2025 – Abr/2026',
        'job1Description': 'Atuação na validação de regras de negócio, testes funcionais e exploratórios, refinamento de demandas e apoio à construção de histórias de usuário e critérios de aceite. Utilização de Postman para validação de APIs RESTful, análise de payloads JSON, cenários de erro e consultas SQL para investigação de inconsistências e apoio à auditoria de dados.',
        'job1SkillQA': 'QA',
        'job1SkillPostman': 'Postman',
        'job1SkillRest': 'APIs RESTful',
        'job1SkillSQL': 'SQL',
        'job1SkillAcceptance': 'Critérios de Aceite',
        'job1SkillScrum': 'Scrum',
        'job1SkillAzure': 'Azure DevOps',
        'job1SkillBusinessRules': 'Regras de Negócio',
        'job2Title': 'Analista de Requisitos — Estágio',
        'job2Period': 'Mai/2025 – Set/2025',
        'job2Description': 'Atuação no levantamento e análise de requisitos para sistemas, mapeamento de fluxos de dados e regras de negócio junto a stakeholders. Apoio em validações sistêmicas, consultas SQL, acompanhamento de demandas no GitLab e comunicação entre áreas de negócio e times técnicos.',
        'job2SkillReqAnalysis': 'Análise de Requisitos',
        'job2SkillSQL': 'SQL',
        'job2SkillGitLab': 'GitLab',
        'job2SkillBusinessRules': 'Regras de Negócio',
        'job2SkillStakeholders': 'Stakeholders',
        'job2SkillScrum': 'Scrum',
        'job2SkillFlowModeling': 'Modelagem de Fluxos',
        'skillsTitle': 'Habilidades e Ferramentas',
        'skillsCatBackend': 'Back-end',
        'skillsCatDatabase': 'Banco de Dados',
        'skillsCatTesting': 'Testes e Validação',
        'skillsCatFrontend': 'Front-end básico',
        'skillsCatTools': 'Ferramentas e Metodologias',
        'skillRestApis': 'APIs RESTful',
        'skillExternalApi': 'Integração com APIs externas',
        'skillDataModeling': 'Modelagem de Dados',
        'skillFunctionalTesting': 'Testes Funcionais',
        'skillExploratoryTesting': 'Testes Exploratórios',
        'skillApiValidation': 'Validação de APIs',
        'skillBusinessRuleValidation': 'Validação de Regras de Negócio',
        'skillSqlInvestigation': 'Investigação com SQL',
        'allLanguages': 'Todas as Linguagens',
        'allTypes': 'Todos os Tipos',
        'allTechnologies': 'Todas as Tecnologias',
        'professional': 'Profissional',
        'academic': 'Acadêmico',
        'personal': 'Pessoal',
        'featuredProjectsTitle': 'Projetos em Destaque',
        'featuredProjectsSubtitle': 'Projetos acadêmicos e práticos que demonstram minha experiência com Java, Spring Boot, APIs RESTful, bancos de dados relacionais e integração com serviços externos.',
        'featuredProjectsEmpty': 'Nenhum projeto em destaque encontrado para esta busca.',
        'featured1Title': 'Sistema de Monitoramento de Segurança em Tempo Real',
        'featured1Description': 'Sistema acadêmico desenvolvido com foco em monitoramento de segurança, validação de trajetos e alertas em tempo real. Atuei no desenvolvimento back-end com Java e Spring Boot, aplicação do padrão MVC, modelagem de banco de dados, implementação de regras de negócio e integração com APIs de mapas. O projeto também explorou conceitos de WebSockets e RabbitMQ para comunicação em tempo real e processamento assíncrono.',
        'featured1Type': 'Acadêmico',
        'featured1TechMaps': 'APIs de Mapas',
        'featured2Title': 'E-commerce de Materiais de Construção',
        'featured2Description': 'Sistema de e-commerce para materiais de construção, com funcionalidades de catálogo, carrinho, pedidos e fluxo de pagamento. Atuei na construção de funcionalidades back-end com Java e Spring Boot, implementação de operações CRUD, regras de negócio, integração com Mercado Pago e ViaCEP, além da modelagem do banco de dados PostgreSQL.',
        'featured2Type': 'Acadêmico / Prático',
        'featured3Title': 'Sistema de Gestão de Ordens de Serviço',
        'featured3Description': 'Sistema para gerenciamento de ordens de serviço, clientes, serviços, status e histórico de atendimento. O projeto teve como objetivo automatizar processos antes realizados manualmente, utilizando Java, Spring Boot, PostgreSQL e integração com APIs externas para apoiar etapas financeiras e de localização.',
        'featured3Type': 'Acadêmico / Prático',
        'githubTimelineTitle': 'Linha do Tempo do GitHub',
        'githubTimelineSubtitle': 'Repositórios públicos carregados automaticamente pela API do GitHub.',
        'searchProjects': 'Buscar projetos...',
        'viewCode': 'Código',
        'viewDemo': 'Demo',
        'noDescription': 'Descrição não disponível',
        'techOverviewTitle': 'Tecnologias Utilizadas',
        'filterByTech': 'Filtrar por Tecnologia',
        'contactTitle': 'Entre em Contato',
        'contactDesc': 'Tem alguma pergunta ou oportunidade? Preencha o formulário abaixo que responderei em breve.',
        'formName': 'Nome:',
        'formEmail': 'Seu E-mail:',
        'formMessage': 'Mensagem:',
        'formSubmit': 'Enviar Mensagem',
        'footerDevelopedBy': 'Desenvolvido por Islayder',
        'footerBackToTop': 'Voltar ao Topo',
        'footerCopyright': '© 2026 - Portfólio GitHub'
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
        'aboutMeP1': 'Hello! My name is Islayder Jackson. I am a Software Engineering student at PUC Minas and a Java back-end developer in training, focused on Spring Boot, RESTful APIs, SQL, and PostgreSQL.',
        'aboutMeP2': 'I have professional experience in requirements, QA, and business rule validation, acting as a bridge between business areas and technical teams. This background helps me develop solutions better aligned with real user needs, with attention to data consistency, acceptance criteria, and delivery quality.',
        'aboutMeP3': 'Currently, I am deepening my knowledge in back-end development, data modeling, integration with external APIs, MVC architecture, API testing with Postman, and building systems with Java, Spring Boot, and relational databases.',
        'academicFormation': 'Academic Background',
        'educationUniversity': 'Pontifícia Universidade Católica de Minas Gerais (PUC Minas)',
        'educationDegree': 'Software Engineering (2024 - Present)',
        'educationDescription': 'During my undergraduate studies, I have deepened my knowledge in programming, databases, computer networks, and software engineering. I have also participated in several academic projects that allowed me to apply classroom concepts in practice.',
        'experienceTitle': 'Professional Experience',
        'job1Title': 'Product Owner / QA Engineer — Internship',
        'job1Period': 'Oct/2025 – Apr/2026',
        'job1Description': 'Worked on business rule validation, functional and exploratory testing, demand refinement, and support in building user stories and acceptance criteria. Used Postman for RESTful API validation, JSON payload analysis, error scenarios, and SQL queries to investigate inconsistencies and support data auditing.',
        'job1SkillQA': 'QA',
        'job1SkillPostman': 'Postman',
        'job1SkillRest': 'RESTful APIs',
        'job1SkillSQL': 'SQL',
        'job1SkillAcceptance': 'Acceptance Criteria',
        'job1SkillScrum': 'Scrum',
        'job1SkillAzure': 'Azure DevOps',
        'job1SkillBusinessRules': 'Business Rules',
        'job2Title': 'Requirements Analyst — Internship',
        'job2Period': 'May/2025 – Sep/2025',
        'job2Description': 'Worked on requirements gathering and analysis for systems, mapping data flows and business rules with stakeholders. Supported system validations, SQL queries, demand tracking in GitLab, and communication between business areas and technical teams.',
        'job2SkillReqAnalysis': 'Requirements Analysis',
        'job2SkillSQL': 'SQL',
        'job2SkillGitLab': 'GitLab',
        'job2SkillBusinessRules': 'Business Rules',
        'job2SkillStakeholders': 'Stakeholders',
        'job2SkillScrum': 'Scrum',
        'job2SkillFlowModeling': 'Flow Modeling',
        'skillsTitle': 'Skills and Tools',
        'skillsCatBackend': 'Back-end',
        'skillsCatDatabase': 'Databases',
        'skillsCatTesting': 'Testing and Validation',
        'skillsCatFrontend': 'Basic Front-end',
        'skillsCatTools': 'Tools and Methodologies',
        'skillRestApis': 'RESTful APIs',
        'skillExternalApi': 'External API Integration',
        'skillDataModeling': 'Data Modeling',
        'skillFunctionalTesting': 'Functional Testing',
        'skillExploratoryTesting': 'Exploratory Testing',
        'skillApiValidation': 'API Validation',
        'skillBusinessRuleValidation': 'Business Rule Validation',
        'skillSqlInvestigation': 'SQL Investigation',
        'allLanguages': 'All Languages',
        'allTypes': 'All Types',
        'allTechnologies': 'All Technologies',
        'professional': 'Professional',
        'academic': 'Academic',
        'personal': 'Personal',
        'featuredProjectsTitle': 'Featured Projects',
        'featuredProjectsSubtitle': 'Academic and practical projects that demonstrate my experience with Java, Spring Boot, RESTful APIs, relational databases and external service integrations.',
        'featuredProjectsEmpty': 'No featured projects found for this search.',
        'featured1Title': 'Real-Time Safety Monitoring System',
        'featured1Description': 'Academic system focused on safety monitoring, route validation and real-time alerts. I worked on the back-end using Java and Spring Boot, applying the MVC pattern, database modeling, business rule implementation and integration with map APIs. The project also explored WebSockets and RabbitMQ concepts for real-time communication and asynchronous processing.',
        'featured1Type': 'Academic',
        'featured1TechMaps': 'Map APIs',
        'featured2Title': 'Construction Materials E-commerce',
        'featured2Description': 'E-commerce system for construction materials, including catalog, shopping cart, orders and payment flow features. I worked on back-end features with Java and Spring Boot, CRUD operations, business rules, Mercado Pago and ViaCEP integrations, and PostgreSQL database modeling.',
        'featured2Type': 'Academic / Practical',
        'featured3Title': 'Service Order Management System',
        'featured3Description': 'System for managing service orders, clients, services, statuses and service history. The project aimed to automate processes previously performed manually, using Java, Spring Boot, PostgreSQL and external API integrations to support financial and location-related steps.',
        'featured3Type': 'Academic / Practical',
        'githubTimelineTitle': 'GitHub Timeline',
        'githubTimelineSubtitle': 'Public repositories loaded automatically from the GitHub API.',
        'searchProjects': 'Search projects...',
        'viewCode': 'Code',
        'viewDemo': 'Demo',
        'noDescription': 'No description available',
        'techOverviewTitle': 'Technologies Used',
        'filterByTech': 'Filter by Technology',
        'contactTitle': 'Contact Me',
        'contactDesc': 'Have a question or opportunity? Fill out the form below and I will respond soon.',
        'formName': 'Name:',
        'formEmail': 'Your Email:',
        'formMessage': 'Message:',
        'formSubmit': 'Send Message',
        'footerDevelopedBy': 'Developed by Islayder',
        'footerBackToTop': 'Back to Top',
        'footerCopyright': '© 2026 - GitHub Portfolio'
    }
};

const updatePageTexts = (lang) => {
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        if (element.id !== 'profileName') {
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

    updateTypeFilter();

    updateFeaturedProjects(elements.searchInput?.value.toLowerCase() || '');

    if (config.allRepositories.length > 0) {
        updateLanguageFilter(config.allRepositories);
        updateTechFilter(config.allRepositories);
        handleSearch();
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

const getTechLabel = (tech, lang) => {
    if (typeof tech === 'string') return tech;
    return translations[lang][tech.key] || tech.key;
};

const createFeaturedProjectCard = (project) => {
    const lang = document.documentElement.lang;
    const title = translations[lang][project.titleKey];
    const description = translations[lang][project.descriptionKey];
    const typeLabel = translations[lang][project.typeKey];
    const techLabels = project.technologies.map(tech => getTechLabel(tech, lang));

    const card = document.createElement('article');
    card.className = 'featured-project-card';

    card.innerHTML = `
        <span class="project-type ${project.typeClass}">${typeLabel}</span>
        <h3 class="project-title">${title}</h3>
        <p class="project-description">${description}</p>
        <div class="project-tech">
            ${techLabels.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
        ${project.repoUrl || project.demoUrl ? `
        <div class="project-links">
            ${project.repoUrl ? `
            <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                ${translations[lang]['viewCode']}
            </a>` : ''}
            ${project.demoUrl ? `
            <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                </svg>
                ${translations[lang]['viewDemo']}
            </a>` : ''}
        </div>` : ''}
    `;

    return card;
};

const updateFeaturedProjects = (searchTerm = '') => {
    if (!elements.featuredProjectsGrid) return;

    const term = searchTerm.toLowerCase();
    elements.featuredProjectsGrid.innerHTML = '';
    let matchCount = 0;

    config.featuredProjects.forEach(project => {
        const lang = document.documentElement.lang;
        const title = translations[lang][project.titleKey];
        const description = translations[lang][project.descriptionKey];
        const techLabels = project.technologies.map(tech => getTechLabel(tech, lang));

        const matchesSearch = !term ||
            title.toLowerCase().includes(term) ||
            description.toLowerCase().includes(term) ||
            techLabels.some(tech => tech.toLowerCase().includes(term));

        if (!matchesSearch) return;

        matchCount++;
        elements.featuredProjectsGrid.appendChild(createFeaturedProjectCard(project));
    });

    if (elements.featuredProjectsEmpty) {
        elements.featuredProjectsEmpty.hidden = !(term && matchCount === 0);
    }
};

const filterGithubRepositories = (repositories) => {
    return repositories.filter(repo => !config.hiddenGithubRepos.includes(repo.name));
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
        <p class="project-description">${repo.description || translations[document.documentElement.lang]['noDescription']}</p>
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
                ${translations[document.documentElement.lang]['viewCode']}
            </a>
            ${repo.homepage ? `
            <a href="${repo.homepage}" target="_blank" class="project-link" data-translate="viewDemo">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                </svg>
                ${translations[document.documentElement.lang]['viewDemo']}
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
    const selectedValue = elements.typeFilter.value;

    elements.typeFilter.innerHTML = `
        <option value="">${document.documentElement.lang === 'pt-BR' ? 'Todos os Tipos' : 'All Types'}</option>
        <option value="professional" data-translate="professional">${translations[document.documentElement.lang]['professional']}</option>
        <option value="academic" data-translate="academic">${translations[document.documentElement.lang]['academic']}</option>
        <option value="personal" data-translate="personal">${translations[document.documentElement.lang]['personal']}</option>
    `;

    if (selectedValue) {
        elements.typeFilter.value = selectedValue;
    }
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

    updateFeaturedProjects(searchTerm);

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
        config.allRepositories = filterGithubRepositories(await fetchRepositories());
        updateLanguageFilter(config.allRepositories);
        updateTypeFilter();
        updateTechFilter(config.allRepositories);

        const projectsSection = document.getElementById('repositorios');
        const timelineContainer = projectsSection.querySelector('.timeline-container');
        if (timelineContainer?.parentNode) {
            timelineContainer.parentNode.insertBefore(
                createTechOverview(config.allRepositories),
                timelineContainer
            );
        }
    }

    updateFeaturedProjects();
    handleSearch();
};

initialize();
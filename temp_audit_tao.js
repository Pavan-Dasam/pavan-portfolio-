
        const document = {
            querySelector: () => ({ addEventListener: () => {}, style: {}, animate: () => {}, classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false } }),
            querySelectorAll: () => [],
            getElementById: () => ({ addEventListener: () => {}, style: {}, classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false } }),
            addEventListener: () => {},
            createElement: () => ({ style: {}, appendChild: () => {} })
        };
        const window = {
            addEventListener: () => {},
            location: { replace: () => {} }
        };
        const IntersectionObserver = function() { return { observe: () => {}, unobserve: () => {} }; };
        
document.addEventListener('DOMContentLoaded', () => {
    // === Animated Custom Cursor ===
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");

    if (cursorDot && cursorOutline) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = posX + "px";
            cursorDot.style.top = posY + "px";
            cursorOutline.animate({
                left: posX + "px",
                top: posY + "px"
            }, { duration: 350, fill: "forwards" });
        });
    }

    // === Dynamic Subtitle Role Typing Effect ===
    const roles = [
        "an Agentic AI Specialist (LangGraph)",
        "a RAG Systems Architect",
        "a Production GenAI Engineer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingTextElement = document.querySelector('.typing-text');

    function handleTyping() {
        if (!typingTextElement) return;
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 40 : 90;

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400;
        }

        setTimeout(handleTyping, typingSpeed);
    }
    handleTyping();

    // === 3D Interactive Tilt on Hero Portrait ===
    const tiltCard = document.getElementById('tiltCard');
    if (tiltCard) {
        tiltCard.addEventListener('mousemove', (e) => {
            const rect = tiltCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            tiltCard.style.transform = "perspective(1000px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) scale3d(1.03, 1.03, 1.03)";
        });

        tiltCard.addEventListener('mouseleave', () => {
            tiltCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
    }

    // === Scroll Reveal Observer ===
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.05,
            rootMargin: "0px 0px -10px 0px"
        });
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('is-visible'));
    }

    // === Active Nav Highlighting & Header Blur on Scroll ===
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (header) header.classList.add('scrolled');
        } else {
            if (header) header.classList.remove('scrolled');
        }

        let currentSection = '';
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 180;
            if (window.pageYOffset >= sectionTop) {
                currentSection = sec.getAttribute('id') || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });

    // === Mobile Navigation Toggle ===
    const mobileBtn = document.querySelector('.mobile-toggle');
    const navMenu = document.getElementById('navbar');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                if (icon) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            } else {
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // === Professional Experience Company Filter (Hidden Initially) ===
    const expFilterBtns = document.querySelectorAll('.exp-filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => item.classList.add('filtered-out'));

    if (expFilterBtns.length > 0 && timelineItems.length > 0) {
        expFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                expFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');

                timelineItems.forEach(item => {
                    const company = item.getAttribute('data-company') || '';
                    if (company === filter) {
                        item.classList.remove('filtered-out');
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(15px)';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.classList.add('filtered-out');
                    }
                });
            });
        });
    }

    // === Floating AI Terminal Widget ===
    const terminalToggle = document.getElementById('terminalToggle');
    const aiTerminal = document.getElementById('aiTerminal');
    const termClose = document.getElementById('termClose');
    const termInput = document.getElementById('termInput');
    const termOutput = document.getElementById('termOutput');

    if (terminalToggle && aiTerminal) {
        terminalToggle.addEventListener('click', () => {
            aiTerminal.classList.toggle('open');
            if (aiTerminal.classList.contains('open') && termInput) {
                setTimeout(() => termInput.focus(), 150);
            }
        });
    }

    if (termClose && aiTerminal) {
        termClose.addEventListener('click', () => {
            aiTerminal.classList.remove('open');
        });
    }

    window.runTermCmd = function(cmd) {
        if (termInput) {
            termInput.value = cmd;
            handleTermSubmit(cmd);
        }
    };

    function handleTermSubmit(cmdText) {
        if (!cmdText || !termOutput) return;
        const cleanCmd = cmdText.trim().toLowerCase();
        
        const userLine = document.createElement('div');
        userLine.style.color = '#00F0FF';
        userLine.style.marginTop = '8px';
        userLine.innerHTML = '&gt; ' + cmdText;
        termOutput.appendChild(userLine);

        const resp = document.createElement('div');
        resp.style.marginTop = '4px';

        switch (cleanCmd) {
            case 'help':
                resp.innerHTML = '<span style="color:#a78bfa;">Available commands:</span><br>• <span style="color:#00F0FF;">skills</span> - Core stack &amp; specializations<br>• <span style="color:#00F0FF;">projects</span> - Featured enterprise AI architectures<br>• <span style="color:#00F0FF;">certs</span> - Official LangChain/Databricks IDs<br>• <span style="color:#00F0FF;">roi</span> - Business impact &amp; transformation<br>• <span style="color:#00F0FF;">hire</span> - Direct email &amp; LinkedIn contact<br>• <span style="color:#00F0FF;">clear</span> - Clear terminal screen';
                break;
            case 'skills':
                resp.innerHTML = '<span style="color:#34d399;">🧠 Core Specializations:</span><br>• <strong>Agentic AI:</strong> LangGraph, Multi-Agent Swarms, Cyclic Graphs, HITL<br>• <strong>RAG &amp; Search:</strong> Azure AI Search, ChromaDB, Qdrant, OCR Chunking<br>• <strong>Backend:</strong> Python (FastAPI), Java 17 (Spring Boot), PostgreSQL, Redis';
                break;
            case 'projects':
                resp.innerHTML = '<span style="color:#00F0FF;">🚀 Top Deliverables:</span><br>1. <strong>Autonomous Claims Agent:</strong> 7-Agent LangGraph system with 94%+ confidence.<br>2. <strong>Claims Intelligence Copilot:</strong> OCR &amp; RAG document synthesis (&lt;3.5s).<br>3. <strong>MemberAssist AI:</strong> Healthcare member service copilot (&lt;800ms P95).';
                break;
            case 'certs':
                resp.innerHTML = '<span style="color:#fbbf24;">🎖️ Verified Credentials:</span><br>• LangChain Academy (LangChain): <strong style="color:#00F0FF;">ctddbhm9sf</strong><br>• LangChain Academy (LangGraph): <strong style="color:#a78bfa;">9ucdiusaz6</strong><br>• Databricks Certified Generative AI Engineer';
                break;
            case 'roi':
                resp.innerHTML = '<span style="color:#34d399;">📈 Enterprise ROI:</span> &gt;70% reduction in adjudication turnaround, &lt;800ms P95 latency, 100% citation grounding.';
                break;
            case 'hire':
            case 'contact':
                resp.innerHTML = '📧 Email: <a href="mailto:pavanwork2113@gmail.com" style="color:#00F0FF;">pavanwork2113@gmail.com</a><br>🔗 LinkedIn: <a href="https://www.linkedin.com/in/pavan-kumar-dasam-2574893b9/" target="_blank" style="color:#00F0FF;">in/pavan-kumar-dasam-2574893b9</a>';
                break;
            case 'clear':
                termOutput.innerHTML = '';
                return;
            default:
                resp.innerHTML = '<span style="color:#f87171;">Command not recognized: \'' + cleanCmd + '\'. Type \'help\' for options.</span>';
        }

        termOutput.appendChild(resp);
        termOutput.scrollTop = termOutput.scrollHeight;
        if (termInput) termInput.value = '';
    }

    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleTermSubmit(termInput.value);
            }
        });
    }
});
    
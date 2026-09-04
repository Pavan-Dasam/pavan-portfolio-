
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

    timelineItems.forEach(item => {
        if (item.getAttribute('data-company') === 'accenture') {
            item.classList.remove('filtered-out');
            item.style.opacity = '1';
        } else {
            item.classList.add('filtered-out');
        }
    });

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

    // === Floating AI Terminal Widget (Preserve Options on Clear) ===
    const terminalToggle = document.getElementById('terminalToggle');
    const aiTerminal = document.getElementById('aiTerminal');
    const termClose = document.getElementById('termClose');
    const termInput = document.getElementById('termInput');
    const termOutput = document.getElementById('termOutput');
    const termDefaultHTML = termOutput ? termOutput.innerHTML : '';

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
        
        if (cleanCmd === 'clear') {
            termOutput.innerHTML = termDefaultHTML;
            if (termInput) termInput.value = '';
            return;
        }

        const userLine = document.createElement('div');
        userLine.style.color = '#ff6b6b';
        userLine.style.marginTop = '8px';
        userLine.innerHTML = '&gt; ' + cmdText;
        termOutput.appendChild(userLine);

        const resp = document.createElement('div');
        resp.style.marginTop = '4px';

        switch (cleanCmd) {
            case 'help':
                resp.innerHTML = '<span style="color:var(--red-light);">Available commands:</span><br>• <span style="color:#fff;">skills</span> - Core stack &amp; specializations<br>• <span style="color:#fff;">experience</span> - Accenture &amp; TAO Digitals roles<br>• <span style="color:#fff;">projects</span> - Featured enterprise AI architectures<br>• <span style="color:#fff;">certs</span> - Official LangChain/Databricks IDs<br>• <span style="color:#fff;">recruiter</span> - 60-second executive candidate pitch<br>• <span style="color:#fff;">why-langgraph</span> - Architecture design rationale<br>• <span style="color:#fff;">contact</span> - Direct WhatsApp &amp; Email<br>• <span style="color:#fff;">clear</span> - Reset screen (preserves quick buttons)';
                break;
            case 'skills':
                resp.innerHTML = '<span style="color:var(--red-light); font-weight:bold;">🧠 Core Specializations:</span><br>• <strong>Agentic AI:</strong> LangGraph, Multi-Agent Swarms, Cyclic Graphs, HITL<br>• <strong>RAG &amp; Retrieval:</strong> Azure AI Search, FAISS, ChromaDB, OCR Chunking<br>• <strong>Backend:</strong> Python (FastAPI), Java 17 (Spring Boot), PostgreSQL, Redis';
                break;
            case 'experience':
            case 'work':
                resp.innerHTML = '<span style="color:var(--red-light); font-weight:bold;">💼 Enterprise Roles:</span><br>1. <strong>Accenture (Client: Voya Financial)</strong> · Agentic AI Engineer (2024–Present)<br>• Built 7-Agent LangGraph claims system with 100% citation grounding.<br>2. <strong>TAO Digitals (Client: Anthem)</strong> · Software Engineer (2023–2024)<br>• Built MemberAssist AI RAG copilot (&lt;800ms P95) &amp; Java 17 backend services.';
                break;
            case 'projects':
                resp.innerHTML = '<span style="color:var(--red-light); font-weight:bold;">🚀 Featured Deliverables:</span><br>1. <strong>Autonomous Claims Agent:</strong> 7-Agent LangGraph system with 94%+ confidence.<br>2. <strong>Claims Intelligence Copilot:</strong> OCR &amp; RAG document synthesis (&lt;3.5s).<br>3. <strong>MemberAssist AI:</strong> Healthcare member service copilot (&lt;800ms P95).';
                break;
            case 'certs':
                resp.innerHTML = '<span style="color:#fbbf24; font-weight:bold;">🎖️ Verified Credentials:</span><br>• LangChain Academy (LangChain): <strong style="color:#fff;">ctddbhm9sf</strong><br>• LangChain Academy (LangGraph): <strong style="color:#fff;">9ucdiusaz6</strong><br>• Databricks Certified Generative AI Engineer';
                break;
            case 'recruiter':
                resp.innerHTML = '<span style="color:#fbbf24; font-weight:bold;">⚡ 60-Second Pitch:</span><br>• <strong>Role:</strong> Agentic AI &amp; Production RAG Engineer (3+ Yrs).<br>• <strong>Deliverables:</strong> 7-Agent LangGraph Swarm (Voya) &amp; MemberAssist AI (Anthem).<br>• <strong>Stack:</strong> Python (FastAPI), LangGraph, Azure OpenAI, Azure AI Search, Java.<br>• <strong>Contact:</strong> WhatsApp (+91 9640559197) or <a href="mailto:pavanwork2113@gmail.com" style="color:var(--red-light);">pavanwork2113@gmail.com</a>';
                break;
            case 'why-langgraph':
                resp.innerHTML = '<span style="color:var(--red-light); font-weight:bold;">🧠 Why LangGraph over Simple Chains:</span><br>1. <strong>Cyclic State Graphs:</strong> Allows agents to re-route, loop, and request missing data.<br>2. <strong>Human-in-the-Loop:</strong> Pauses graph execution at checkpoints for human sign-off.<br>3. <strong>State Persistence:</strong> Checkpointing directly into PostgreSQL for fault recovery.';
                break;
            case 'roi':
                resp.innerHTML = '<span style="color:#34d399; font-weight:bold;">📈 Enterprise ROI:</span> &gt;70% reduction in adjudication turnaround, &lt;800ms P95 latency, 100% citation grounding.';
                break;
            case 'hire':
            case 'contact':
                resp.innerHTML = '💬 WhatsApp: <a href="https://wa.me/919640559197" target="_blank" style="color:var(--red-light);">+91 9640559197</a><br>📧 Email: <a href="mailto:pavanwork2113@gmail.com" style="color:var(--red-light);">pavanwork2113@gmail.com</a><br>🔗 LinkedIn: <a href="https://www.linkedin.com/in/pavan-kumar-dasam-2574893b9/" target="_blank" style="color:var(--red-light);">in/pavan-kumar-dasam-2574893b9</a>';
                break;
            default:
                resp.innerHTML = '<span style="color:#f87171;">Command not recognized: "' + cleanCmd + '". Type "help" for options.</span>';
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

    // === ENHANCEMENT JS: RECRUITER BRIEF & BLUEPRINT MODALS ===
    const recruiterModal = document.getElementById('recruiterModal');
    const openRecruiterBtn = document.getElementById('openRecruiterModal');
    const closeRecruiterBtn = document.getElementById('closeRecruiterModal');

    if (openRecruiterBtn && recruiterModal) {
        openRecruiterBtn.addEventListener('click', () => {
            recruiterModal.classList.add('open');
        });
    }

    if (closeRecruiterBtn && recruiterModal) {
        closeRecruiterBtn.addEventListener('click', () => {
            recruiterModal.classList.remove('open');
        });
    }

    if (recruiterModal) {
        recruiterModal.addEventListener('click', (e) => {
            if (e.target === recruiterModal) recruiterModal.classList.remove('open');
        });
    }

    const blueprintModal = document.getElementById('blueprintModal');
    const closeBlueprintBtn = document.getElementById('closeBlueprintModal');
    if (closeBlueprintBtn && blueprintModal) {
        closeBlueprintBtn.addEventListener('click', () => {
            blueprintModal.classList.remove('open');
        });
    }
    if (blueprintModal) {
        blueprintModal.addEventListener('click', (e) => {
            if (e.target === blueprintModal) blueprintModal.classList.remove('open');
        });
    }

    window.openBlueprint = function(type) {
        if (!blueprintModal) return;
        const bpTitle = document.getElementById('bpTitle');
        const bpSubtitle = document.getElementById('bpSubtitle');
        const bpAscii = document.getElementById('bpAscii');
        const bpNotes = document.getElementById('bpNotes');

        if (type === 'anthem') {
            if (bpTitle) bpTitle.textContent = 'MemberAssist AI | Architecture Blueprint';
            if (bpSubtitle) bpSubtitle.textContent = '// RAG + INTENT ROUTING + FASTAPI + LANGSMITH TRACING';
            if (bpAscii) bpAscii.innerHTML = '[Member / CSR Question] ➔ [FastAPI Gateway] ➔ [Intent Classifier Agent]<br>                                            │<br>                ┌───────────────────────────┴───────────────────────────┐<br>                ▼                                                       ▼<br>   [Benefit Doc RAG (Azure AI Search)]                  [Member Claims &amp; Benefit APIs]<br>   - Plan Document Chunks                               - Real-Time Coverage Verification<br>   - Semantic Reranking                                 - Cost-Share &amp; Deductibles<br>                └───────────────────────────┬───────────────────────────┘<br>                                            ▼<br>                              [Azure OpenAI GPT-4 Model]<br>                              - Plain Language Translation<br>                              - Guardrails &amp; Source Grounding Check (&lt;800ms P95)';
            if (bpNotes) bpNotes.innerHTML = '<div><strong>• Intent Routing:</strong> Directs coverage, deductible, denial reasons, or provider network queries to specialized retrieval tools.</div><div><strong>• Grounding Verification:</strong> Responses must cite specific plan document sections before rendering to CSR agents.</div>';
        } else {
            if (bpTitle) bpTitle.textContent = 'Autonomous Claims Processing Swarm | Architecture Blueprint';
            if (bpSubtitle) bpSubtitle.textContent = '// 7-AGENT LANGGRAPH STATE MACHINE + HITL CHECKPOINT';
            if (bpAscii) bpAscii.innerHTML = '[Incoming Claim PDF/JSON] ➔ [FastAPI Ingestion] ➔ [Azure Service Bus Queue]<br>                                                  │<br>                                                  ▼<br>               ┌────────────────────────────────────────────────────────┐<br>               │          7-Agent LangGraph Cyclic State Swarm          │<br>               │  Intake ➔ DocVerify ➔ PolicyRAG ➔ Eligibility           │<br>               │  Claims Analysis ➔ FraudRisk ➔ Recommendation ➔ HITL   │<br>               └───────────────────────────┬────────────────────────────┘<br>                                           │<br>                     ┌─────────────────────┴─────────────────────┐<br>                     ▼                                           ▼<br>        [Azure AI Search (Hybrid)]                    [Azure OpenAI GPT-4o]<br>        - Certificate RAG                             - Structured Pydantic Action<br>        - OCR Chunk Embeddings                        - 100% Policy Grounded Citations';
            if (bpNotes) bpNotes.innerHTML = '<div><strong>• State Persistence:</strong> LangGraph TypedDict state persisted to PostgreSQL checkpoint tables, ensuring interrupted executions can resume without data loss.</div><div><strong>• Human-in-the-Loop:</strong> High-risk or low-confidence claims automatically halt graph traversal for human sign-off.</div>';
        }
        blueprintModal.classList.add('open');
    };

    // === ENHANCEMENT JS: INTERACTIVE MULTI-AGENT SIMULATOR ===
    let currentSimScenario = 'disability';
    const scenarios = {
        disability: [
            { node: 'node-intake', msg: '[1. Intake Agent] Extracted claim #STD-4091: Short-Term Disability (Voya Group #8821). Claimant: Employee.' },
            { node: 'node-verify', msg: '[2. Doc Verification Agent] Checked 4/5 items. Missing Employer Attestation Statement! Flag added to state.' },
            { node: 'node-policy', msg: '[3. Policy Retrieval Agent] RAG matched Certificate Section 4.2 (Disability Elimination Period: 14 Days).' },
            { node: 'node-eligible', msg: '[4. Eligibility Agent] Coverage active on incident date (08/14). Member eligible under Plan Option B.' },
            { node: 'node-analysis', msg: '[5. Claims Analysis Agent] Medical disability timeline consistent with ICD-10 diagnostic code.' },
            { node: 'node-risk', msg: '[6. Fraud/Risk Agent] Anomaly score: 0.04 (Low Risk). No duplicate filings detected.' },
            { node: 'node-recom', msg: '[7. Recommendation Agent] Confidence: 94%. Action: Request missing Employer Statement before final payout.' },
            { node: 'node-hitl', msg: '[8. HITL Checkpoint] Routed recommendation to Claims Examiner Sarah M. for single-click dispatch. (Done!)' }
        ],
        health: [
            { node: 'node-intake', msg: '[1. Intake Agent] Extracted claim #SUPP-1044: Supplemental Hospital Confinement.' },
            { node: 'node-verify', msg: '[2. Doc Verification Agent] All required admission & discharge records verified (100% complete).' },
            { node: 'node-policy', msg: '[3. Policy Retrieval Agent] Matched Rider H-10: $250/day confinement benefit.' },
            { node: 'node-eligible', msg: '[4. Eligibility Agent] Policy continuously active for 18 months. Pre-existing clause passed.' },
            { node: 'node-analysis', msg: '[5. Claims Analysis Agent] 3 inpatient days verified against facility bill.' },
            { node: 'node-risk', msg: '[6. Fraud/Risk Agent] Normal provider NPI verified. Fraud risk score: 0.01.' },
            { node: 'node-recom', msg: '[7. Recommendation Agent] Recommendation: Approve $750 benefit (Confidence: 99.2%).' },
            { node: 'node-hitl', msg: '[8. HITL Checkpoint] Examiner approved with single click. Automated payment scheduled.' }
        ],
        risk: [
            { node: 'node-intake', msg: '[1. Intake Agent] Extracted claim #ACC-9923: Accidental Injury.' },
            { node: 'node-verify', msg: '[2. Doc Verification Agent] Hospital invoice dates conflicting with incident report.' },
            { node: 'node-policy', msg: '[3. Policy Retrieval Agent] Retrieved exclusion clause Section 9.1 (Non-covered activities).' },
            { node: 'node-eligible', msg: '[4. Eligibility Agent] Active coverage verified.' },
            { node: 'node-analysis', msg: '[5. Claims Analysis Agent] High variance in billing codes vs injury documentation.' },
            { node: 'node-risk', msg: '[6. Fraud/Risk Agent] RISK ALERT: High anomaly pattern flagged! Escalation required.' },
            { node: 'node-recom', msg: '[7. Recommendation Agent] Action: Halt autonomous workflow. Refer to Special Investigation Unit (SIU).' },
            { node: 'node-hitl', msg: '[8. HITL Checkpoint] High-priority examiner intervention triggered. Notification sent to Senior Auditor.' }
        ]
    };

    window.setSimScenario = function(scen, btn) {
        currentSimScenario = scen;
        document.querySelectorAll('.scenario-selector-row .scenario-btn').forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');
        const consoleEl = document.getElementById('simTraceConsole');
        if (consoleEl) {
            consoleEl.innerHTML = '<span style="color: #34d399;">Scenario selected: ' + scen.toUpperCase() + '.</span> Click "Run Agent Simulation" to start trace.';
        }
    };

    window.runAgentSimulation = function() {
        const traceSteps = scenarios[currentSimScenario] || scenarios.disability;
        const consoleEl = document.getElementById('simTraceConsole');
        const runBtn = document.getElementById('runSimBtn');
        const allNodes = document.querySelectorAll('.agent-node');

        if (runBtn) runBtn.disabled = true;
        allNodes.forEach(n => { n.classList.remove('active-node'); n.classList.remove('done-node'); });
        if (consoleEl) consoleEl.innerHTML = '<span style="color: #fbbf24;">[System] Initializing LangGraph 7-Agent Swarm for ' + currentSimScenario.toUpperCase() + '...</span>';

        let stepIndex = 0;

        function playStep() {
            if (stepIndex > 0 && stepIndex - 1 < traceSteps.length) {
                const prevNodeId = traceSteps[stepIndex - 1].node;
                const prevNodeEl = document.getElementById(prevNodeId);
                if (prevNodeEl) {
                    prevNodeEl.classList.remove('active-node');
                    prevNodeEl.classList.add('done-node');
                }
            }

            if (stepIndex < traceSteps.length) {
                const step = traceSteps[stepIndex];
                const nodeEl = document.getElementById(step.node);
                if (nodeEl) nodeEl.classList.add('active-node');

                if (consoleEl) {
                    const line = document.createElement('div');
                    line.style.marginTop = '4px';
                    line.innerHTML = '<span style="color:var(--red-light); font-weight:bold;">▶</span> ' + step.msg;
                    consoleEl.appendChild(line);
                    consoleEl.scrollTop = consoleEl.scrollHeight;
                }

                stepIndex++;
                setTimeout(playStep, 650);
            } else {
                if (runBtn) runBtn.disabled = false;
                if (consoleEl) {
                    const doneLine = document.createElement('div');
                    doneLine.style.marginTop = '6px';
                    doneLine.style.color = '#34d399';
                    doneLine.style.fontWeight = 'bold';
                    doneLine.innerHTML = '✔ Multi-Agent Swarm execution finalized with complete audit trace.';
                    consoleEl.appendChild(doneLine);
                    consoleEl.scrollTop = consoleEl.scrollHeight;
                }
            }
        }

        setTimeout(playStep, 350);
    };

    // === SIMULATOR 2: VOYA CLAIMS RAG COPILOT ===
    let currentCopilotScenario = 'multipage';
    const copilotScenarios = {
        multipage: [
            { node: 'node-rag-ingest', msg: '[1. Ingest] Uploaded 52-page claim package: Medical Records + Form 1099 + Claim Form.' },
            { node: 'node-rag-ocr', msg: '[2. OCR Chunk] Azure Document Intelligence extracted 184 chunk segments with layout preservation.' },
            { node: 'node-rag-embed', msg: '[3. Embeddings] Generated vector embeddings via text-embedding-ada-002 (1536-dim).' },
            { node: 'node-rag-search', msg: '[4. Hybrid Search] Azure AI Search matched Certificate Sec 8.1 & ICD-10 medical notes.' },
            { node: 'node-rag-rerank', msg: '[5. Reranking] Semantic cross-encoder reranked top-8 chunks (Top score: 0.962).' },
            { node: 'node-rag-llm', msg: '[6. Synthesis] GPT-4 synthesized 1-page structured brief for examiner (Latency: 2.8s, 100% cited).' }
        ],
        exclusion: [
            { node: 'node-rag-ingest', msg: '[1. Ingest] Ingested accident report & attending doctor assessment.' },
            { node: 'node-rag-ocr', msg: '[2. OCR Chunk] Cleanly extracted medical diagnosis and date of manifestation.' },
            { node: 'node-rag-embed', msg: '[3. Embeddings] Vectorized chunks across policy certificate index.' },
            { node: 'node-rag-search', msg: '[4. Hybrid Search] Retrieved exclusion rider clause #EX-14 (Hazardous Activity).' },
            { node: 'node-rag-rerank', msg: '[5. Reranking] Isolated exact conflicting clause with 98.4% relevance.' },
            { node: 'node-rag-llm', msg: '[6. Synthesis] Generated Examiner Alert: Flagged Exclusion Clause 14.2 for senior review.' }
        ],
        rapid: [
            { node: 'node-rag-ingest', msg: '[1. Ingest] Rapid ingestion of Supplemental Hospital Confinement bill.' },
            { node: 'node-rag-ocr', msg: '[2. OCR Chunk] OCR parsed itemized hospital stay dates and billing codes.' },
            { node: 'node-rag-embed', msg: '[3. Embeddings] Cached embeddings matched in vector store.' },
            { node: 'node-rag-search', msg: '[4. Hybrid Search] Direct match to Rider H-10 ($250/day benefit).' },
            { node: 'node-rag-rerank', msg: '[5. Reranking] Verified 3 confinement days without exclusions.' },
            { node: 'node-rag-llm', msg: '[6. Synthesis] Summary ready: Approved $750 payout with full source citations in 1.4s.' }
        ]
    };

    window.setCopilotScenario = function(scen, btn) {
        currentCopilotScenario = scen;
        const parent = btn.closest('.agent-simulator-card');
        if (parent) parent.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');
        const consoleEl = document.getElementById('copilotTraceConsole');
        if (consoleEl) consoleEl.innerHTML = '<span style="color:#34d399;">Scenario selected: ' + scen.toUpperCase() + '.</span> Click "Run RAG Simulation".';
    };

    window.runCopilotSimulation = function() {
        const traceSteps = copilotScenarios[currentCopilotScenario] || copilotScenarios.multipage;
        const consoleEl = document.getElementById('copilotTraceConsole');
        const runBtn = document.getElementById('runCopilotSimBtn');
        const allNodes = document.querySelectorAll('#node-rag-ingest, #node-rag-ocr, #node-rag-embed, #node-rag-search, #node-rag-rerank, #node-rag-llm');

        if (runBtn) runBtn.disabled = true;
        allNodes.forEach(n => { n.classList.remove('active-node'); n.classList.remove('done-node'); });
        if (consoleEl) consoleEl.innerHTML = '<span style="color:#fbbf24;">[RAG Engine] Initializing Document Pipeline for ' + currentCopilotScenario.toUpperCase() + '...</span>';

        let stepIndex = 0;
        function playStep() {
            if (stepIndex > 0 && stepIndex - 1 < traceSteps.length) {
                const prevNodeEl = document.getElementById(traceSteps[stepIndex - 1].node);
                if (prevNodeEl) { prevNodeEl.classList.remove('active-node'); prevNodeEl.classList.add('done-node'); }
            }
            if (stepIndex < traceSteps.length) {
                const step = traceSteps[stepIndex];
                const nodeEl = document.getElementById(step.node);
                if (nodeEl) nodeEl.classList.add('active-node');
                if (consoleEl) {
                    const line = document.createElement('div');
                    line.style.marginTop = '4px';
                    line.innerHTML = '<span style="color:var(--red-light); font-weight:bold;">▶</span> ' + step.msg;
                    consoleEl.appendChild(line);
                    consoleEl.scrollTop = consoleEl.scrollHeight;
                }
                stepIndex++;
                setTimeout(playStep, 600);
            } else {
                if (runBtn) runBtn.disabled = false;
                if (consoleEl) {
                    const doneLine = document.createElement('div');
                    doneLine.style.marginTop = '6px';
                    doneLine.style.color = '#34d399';
                    doneLine.style.fontWeight = 'bold';
                    doneLine.innerHTML = '✔ RAG Synthesis complete: Structured brief generated with 100% policy grounding.';
                    consoleEl.appendChild(doneLine);
                    consoleEl.scrollTop = consoleEl.scrollHeight;
                }
            }
        }
        setTimeout(playStep, 300);
    };

    // === SIMULATOR 3: MEMBERASSIST AI (ANTHEM) ===
    let currentMemberScenario = 'denial';
    const memberScenarios = {
        denial: [
            { node: 'node-ma-input', msg: '[1. Inquiry] Member asked: "Why was my claim for physical therapy denied?"' },
            { node: 'node-ma-intent', msg: '[2. Intent Route] Intent classified: CLAIM_DENIAL_EXPLANATION (Confidence: 99.4%).' },
            { node: 'node-ma-api', msg: '[3. Member API] Looked up claim #CLM-8021: Status=DENIED, ReasonCode=DEN_PR_AUTH.' },
            { node: 'node-ma-rag', msg: '[4. Benefit RAG] Retrieved plan handbook section 4.8: "Physical therapy requires prior auth after 6 visits."' },
            { node: 'node-ma-llm', msg: '[5. GPT-4 Synth] Formatted empathetic, plain-English response + appeal steps.' },
            { node: 'node-ma-guard', msg: '[6. Guardrail] PII masked, grounding verified. Returned in 680ms (P95 <800ms)!' }
        ],
        deductible: [
            { node: 'node-ma-input', msg: '[1. Inquiry] Member asked: "What is my remaining in-network deductible?"' },
            { node: 'node-ma-intent', msg: '[2. Intent Route] Intent classified: DEDUCTIBLE_BALANCE_CHECK (Confidence: 99.8%).' },
            { node: 'node-ma-api', msg: '[3. Member API] Real-time accumulator lookup: Individual=$1,500, Met=$1,120, Remaining=$380.' },
            { node: 'node-ma-rag', msg: '[4. Benefit RAG] Verified benefit year period: Jan 1 - Dec 31 (Plan Anthem Silver PPO).' },
            { node: 'node-ma-llm', msg: '[5. GPT-4 Synth] Generated concise balance breakdown for member.' },
            { node: 'node-ma-guard', msg: '[6. Guardrail] Real-time verified. Delivered in 420ms (Zero hallucination).' }
        ],
        priorauth: [
            { node: 'node-ma-input', msg: '[1. Inquiry] Member asked: "Do I need prior authorization for a knee MRI?"' },
            { node: 'node-ma-intent', msg: '[2. Intent Route] Intent classified: PRIOR_AUTHORIZATION_QUERY (Confidence: 98.9%).' },
            { node: 'node-ma-api', msg: '[3. Member API] Validated active member plan: Anthem Blue Cross HMO Tier 1.' },
            { node: 'node-ma-rag', msg: '[4. Benefit RAG] Queried Advanced Imaging guidelines: Outpatient MRI requires pre-certification.' },
            { node: 'node-ma-llm', msg: '[5. GPT-4 Synth] Formatted physician checklist & turnaround timeline for pre-cert.' },
            { node: 'node-ma-guard', msg: '[6. Guardrail] 100% cited against Plan Policy Doc Page 42. Latency: 590ms.' }
        ]
    };

    window.setMemberScenario = function(scen, btn) {
        currentMemberScenario = scen;
        const parent = btn.closest('.agent-simulator-card');
        if (parent) parent.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');
        const consoleEl = document.getElementById('memberAssistTraceConsole');
        if (consoleEl) consoleEl.innerHTML = '<span style="color:#34d399;">Scenario selected: ' + scen.toUpperCase() + '.</span> Click "Run Member AI Simulation".';
    };

    window.runMemberAssistSimulation = function() {
        const traceSteps = memberScenarios[currentMemberScenario] || memberScenarios.denial;
        const consoleEl = document.getElementById('memberAssistTraceConsole');
        const runBtn = document.getElementById('runMemberAssistSimBtn');
        const allNodes = document.querySelectorAll('#node-ma-input, #node-ma-intent, #node-ma-api, #node-ma-rag, #node-ma-llm, #node-ma-guard');

        if (runBtn) runBtn.disabled = true;
        allNodes.forEach(n => { n.classList.remove('active-node'); n.classList.remove('done-node'); });
        if (consoleEl) consoleEl.innerHTML = '<span style="color:#fbbf24;">[MemberAssist] Processing query for ' + currentMemberScenario.toUpperCase() + '...</span>';

        let stepIndex = 0;
        function playStep() {
            if (stepIndex > 0 && stepIndex - 1 < traceSteps.length) {
                const prevNodeEl = document.getElementById(traceSteps[stepIndex - 1].node);
                if (prevNodeEl) { prevNodeEl.classList.remove('active-node'); prevNodeEl.classList.add('done-node'); }
            }
            if (stepIndex < traceSteps.length) {
                const step = traceSteps[stepIndex];
                const nodeEl = document.getElementById(step.node);
                if (nodeEl) nodeEl.classList.add('active-node');
                if (consoleEl) {
                    const line = document.createElement('div');
                    line.style.marginTop = '4px';
                    line.innerHTML = '<span style="color:var(--red-light); font-weight:bold;">▶</span> ' + step.msg;
                    consoleEl.appendChild(line);
                    consoleEl.scrollTop = consoleEl.scrollHeight;
                }
                stepIndex++;
                setTimeout(playStep, 550);
            } else {
                if (runBtn) runBtn.disabled = false;
                if (consoleEl) {
                    const doneLine = document.createElement('div');
                    doneLine.style.marginTop = '6px';
                    doneLine.style.color = '#34d399';
                    doneLine.style.fontWeight = 'bold';
                    doneLine.innerHTML = '✔ Query resolved in &lt;800ms with verified plan grounding.';
                    consoleEl.appendChild(doneLine);
                    consoleEl.scrollTop = consoleEl.scrollHeight;
                }
            }
        }
        setTimeout(playStep, 300);
    };

    // === SIMULATOR 4: JAVA SPRING BOOT MICROSERVICES (ANTHEM) ===
    let currentBackendScenario = 'claim_tx';
    const backendScenarios = {
        claim_tx: [
            { node: 'node-be-rest', msg: '[1. REST Ingest] POST /api/v1/claims received JSON payload (Header: Bearer JWT).' },
            { node: 'node-be-dto', msg: '[2. DTO Validation] Hibernate Validator checked claim DTO fields (0 validation errors).' },
            { node: 'node-be-cache', msg: '[3. Redis Cache] Checked duplicate idempotency key in Redis (New transaction verified).' },
            { node: 'node-be-sql', msg: '[4. PostgreSQL] Executed Spring Data JPA repository transaction (Saved claim row in 14ms).' },
            { node: 'node-be-event', msg: '[5. Event Queue] Dispatched ClaimSubmittedEvent to Azure Service Bus topic (HTTP 201 Created).' }
        ],
        cache_hit: [
            { node: 'node-be-rest', msg: '[1. REST Ingest] GET /api/v1/members/88921/eligibility received.' },
            { node: 'node-be-dto', msg: '[2. DTO Validation] Request params validated.' },
            { node: 'node-be-cache', msg: '[3. Redis Cache] CACHE HIT! Redis returned cached eligibility profile in 8ms (Bypassed DB!).' },
            { node: 'node-be-sql', msg: '[4. PostgreSQL] (Skipped database query to preserve connection pool capacity).' },
            { node: 'node-be-event', msg: '[5. Event Queue] HTTP 200 OK returned to client in 11ms total.' }
        ],
        fault_dlq: [
            { node: 'node-be-rest', msg: '[1. REST Ingest] Processing async batch claim item from message broker.' },
            { node: 'node-be-dto', msg: '[2. DTO Validation] Corrupted provider tax ID detected.' },
            { node: 'node-be-cache', msg: '[3. Redis Cache] Evicted invalid session token.' },
            { node: 'node-be-sql', msg: '[4. PostgreSQL] Transaction rolled back safely (@Transactional ACID protection).' },
            { node: 'node-be-event', msg: '[5. Event Queue] Routed bad message to Dead Letter Queue (DLQ) with alert log.' }
        ]
    };

    window.setBackendScenario = function(scen, btn) {
        currentBackendScenario = scen;
        const parent = btn.closest('.agent-simulator-card');
        if (parent) parent.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');
        const consoleEl = document.getElementById('backendTraceConsole');
        if (consoleEl) consoleEl.innerHTML = '<span style="color:#34d399;">Scenario selected: ' + scen.toUpperCase() + '.</span> Click "Run Backend Flow".';
    };

    window.runBackendSimulation = function() {
        const traceSteps = backendScenarios[currentBackendScenario] || backendScenarios.claim_tx;
        const consoleEl = document.getElementById('backendTraceConsole');
        const runBtn = document.getElementById('runBackendSimBtn');
        const allNodes = document.querySelectorAll('#node-be-rest, #node-be-dto, #node-be-cache, #node-be-sql, #node-be-event');

        if (runBtn) runBtn.disabled = true;
        allNodes.forEach(n => { n.classList.remove('active-node'); n.classList.remove('done-node'); });
        if (consoleEl) consoleEl.innerHTML = '<span style="color:#fbbf24;">[Spring Boot] Executing transaction flow for ' + currentBackendScenario.toUpperCase() + '...</span>';

        let stepIndex = 0;
        function playStep() {
            if (stepIndex > 0 && stepIndex - 1 < traceSteps.length) {
                const prevNodeEl = document.getElementById(traceSteps[stepIndex - 1].node);
                if (prevNodeEl) { prevNodeEl.classList.remove('active-node'); prevNodeEl.classList.add('done-node'); }
            }
            if (stepIndex < traceSteps.length) {
                const step = traceSteps[stepIndex];
                const nodeEl = document.getElementById(step.node);
                if (nodeEl) nodeEl.classList.add('active-node');
                if (consoleEl) {
                    const line = document.createElement('div');
                    line.style.marginTop = '4px';
                    line.innerHTML = '<span style="color:var(--red-light); font-weight:bold;">▶</span> ' + step.msg;
                    consoleEl.appendChild(line);
                    consoleEl.scrollTop = consoleEl.scrollHeight;
                }
                stepIndex++;
                setTimeout(playStep, 550);
            } else {
                if (runBtn) runBtn.disabled = false;
                if (consoleEl) {
                    const doneLine = document.createElement('div');
                    doneLine.style.marginTop = '6px';
                    doneLine.style.color = '#34d399';
                    doneLine.style.fontWeight = 'bold';
                    doneLine.innerHTML = '✔ Enterprise microservice execution finalized with 0 data loss.';
                    consoleEl.appendChild(doneLine);
                    consoleEl.scrollTop = consoleEl.scrollHeight;
                }
            }
        }
        setTimeout(playStep, 300);
    };

});
    
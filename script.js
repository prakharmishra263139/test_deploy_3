document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Calculator functionality
    const employeesInput = document.getElementById('employees');
    const employeesValue = document.getElementById('employees-value');
    const processHoursInput = document.getElementById('process-hours');
    const processHoursValue = document.getElementById('process-hours-value');
    const hourlyRateInput = document.getElementById('hourly-rate');
    const hourlyRateValue = document.getElementById('hourly-rate-value');
    if (employeesInput && employeesValue && processHoursInput && processHoursValue && hourlyRateInput && hourlyRateValue) {
        function formatNumber(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        employeesInput.addEventListener('input', function() {
            employeesValue.textContent = formatNumber(this.value);
            updateCalculator();
        });
        processHoursInput.addEventListener('input', function() {
            processHoursValue.textContent = formatNumber(this.value);
            updateCalculator();
        });
        hourlyRateInput.addEventListener('input', function() {
            hourlyRateValue.textContent = this.value;
            updateCalculator();
        });

        const ctx = document.getElementById('savings-chart').getContext('2d');
        let savingsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
                datasets: [
                    { label: 'Manual Cost', backgroundColor: '#e74c3c', data: [] },
                    { label: 'RPA Cost', backgroundColor: '#2ecc71', data: [] },
                    { label: 'Savings', backgroundColor: '#3498db', data: [] }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Cost ($)' } }
                },
                plugins: {
                    title: { display: true, text: '5-Year Cost Comparison' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': $' + formatNumber(context.raw);
                            }
                        }
                    }
                }
            }
        });

        function calculateSavings(employees, processHours, hourlyRate) {
            const years = 5;
            const manualCostPerYear = processHours * hourlyRate * 12;
            const rpaSetupCost = 10000;
            const rpaMaintenancePerEmployee = 500;
            const results = [];
            let cumulativeSavings = 0;
            for (let year = 1; year <= years; year++) {
                const manualCost = manualCostPerYear;
                let rpaCost = rpaMaintenancePerEmployee * employees;
                if (year === 1) rpaCost += rpaSetupCost;
                const savings = manualCost - rpaCost;
                cumulativeSavings += savings;
                results.push({ year, manualCost, rpaCost, savings, cumulativeSavings });
            }
            return results;
        }

        function updateCalculator() {
            const employees = parseInt(employeesInput.value);
            const processHours = parseInt(processHoursInput.value);
            const hourlyRate = parseInt(hourlyRateInput.value);
            const results = calculateSavings(employees, processHours, hourlyRate);
            savingsChart.data.datasets[0].data = results.map(r => r.manualCost);
            savingsChart.data.datasets[1].data = results.map(r => r.rpaCost);
            savingsChart.data.datasets[2].data = results.map(r => r.savings);
            savingsChart.update();
            const tableBody = document.getElementById('savings-data');
            tableBody.innerHTML = '';
            results.forEach(result => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${result.year}</td>
                    <td>$${formatNumber(result.manualCost.toFixed(0))}</td>
                    <td>$${formatNumber(result.rpaCost.toFixed(0))}</td>
                    <td>$${formatNumber(result.savings.toFixed(0))}</td>
                    <td>$${formatNumber(result.cumulativeSavings.toFixed(0))}</td>
                `;
                tableBody.appendChild(row);
            });
        }
        updateCalculator();
    }

    // Form submission
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        const formStatus = document.getElementById('form-status');
        const submitBtn = document.getElementById('submit-btn');
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                employeesRange: document.getElementById('employees-range').value,
                message: document.getElementById('message').value
            };
            setTimeout(() => {
                fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: { 'Content-type': 'application/json; charset=UTF-8' },
                })
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    formStatus.textContent = 'Thank you! Your information has been submitted successfully. We will contact you shortly.';
                    formStatus.className = 'success';
                    formStatus.style.display = 'block';
                    leadForm.reset();
                })
                .catch(error => {
                    formStatus.textContent = 'There was an error submitting your form. Please try again later.';
                    formStatus.className = 'error';
                    formStatus.style.display = 'block';
                    console.error('Error:', error);
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Request Consultation';
                });
            }, 1500);
        });
    }

    // Chatbot toggle functionality
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'bot.html';
        });
    }

    // Set active nav link based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if ((currentPage === 'index.html' || currentPage === '') && linkPage === 'index.html#') {
                link.classList.add('active');
            } else if (currentPage === linkPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    setActiveNavLink();
});

// Fallback chatbot functionality (for bot.html)
function initFallbackChatbot() {
    const chatbotMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    if (chatbotMessages && userInput && sendButton) {
        const knowledgeBase = {
            "services": {
                answer: "We provide three core RPA services:<br><br>1. <strong>Process Automation</strong>: Automate repetitive tasks like data entry, report generation, and system updates.<br>2. <strong>Data Integration</strong>: Connect disparate systems without API dependencies for seamless data flow.<br>3. <strong>AI-Enhanced RPA</strong>: Combine RPA with AI/ML for intelligent document processing and decision-making.<br><br>Would you like details about any specific service?"
            },
            "savings": {
                answer: "Typical savings with our RPA solutions:<br><br>• <strong>Time Reduction</strong>: 50-90% faster than manual processes<br>• <strong>Cost Savings</strong>: $15-$30 per hour per bot (vs. human labor)<br>• <strong>ROI</strong>: Most clients see full payback in 3-12 months<br><br>Try our <a href='index.html#calculator' style='color: var(--secondary-color);'>ROI Calculator</a> for a customized estimate."
            },
            "industries": {
                answer: "We serve all industries with common automation needs:<br><br>• <strong>Banking</strong>: Loan processing, fraud detection<br>• <strong>Healthcare</strong>: Claims processing, patient records<br>• <strong>Retail</strong>: Inventory management, order processing<br>• <strong>Manufacturing</strong>: Supply chain tracking, quality checks<br><br>What's your industry? I can provide specific examples."
            },
            "implementation": {
                answer: "Our 4-step implementation process:<br><br>1. <strong>Discovery</strong>: We analyze your processes (2-3 days)<br>2. <strong>Development</strong>: Build and test bots (2-4 weeks)<br>3. <strong>Deployment</strong>: Pilot in one department first<br>4. <strong>Support</strong>: 24/7 monitoring and maintenance<br><br>We handle everything from setup to employee training."
            },
            "default": {
                answer: "I'm still learning about that topic. For detailed questions, please:<br>1. Visit our <a href='index.html#services' style='color: var(--secondary-color);'>Services page</a><br>2. Contact our experts via the <a href='index.html#contact' style='color: var(--secondary-color);'>Contact form</a><br><br>How else can I help you today?"
            }
        };

        function addMessage(sender, message, isHTML = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = sender + '-message';
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            if (isHTML) contentDiv.innerHTML = message;
            else contentDiv.textContent = message;
            messageDiv.appendChild(contentDiv);
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        function processUserInput() {
            const inputText = userInput.value.trim();
            if (inputText === '') return;
            addMessage('user', inputText);
            userInput.value = '';
            setTimeout(() => {
                const typingIndicator = document.createElement('div');
                typingIndicator.className = 'bot-message';
                typingIndicator.innerHTML = '<div class="message-content"><p>AutomatePro is typing...</p></div>';
                chatbotMessages.appendChild(typingIndicator);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                setTimeout(() => {
                    chatbotMessages.removeChild(typingIndicator);
                    generateResponse(inputText);
                }, 1000);
            }, 500);
        }

        function generateResponse(input) {
            input = input.toLowerCase();
            let response = knowledgeBase.default.answer;
            if (input.includes('service') || input.includes('offer')) response = knowledgeBase.services.answer;
            else if (input.includes('save') || input.includes('cost') || input.includes('roi')) response = knowledgeBase.savings.answer;
            else if (input.includes('industry') || input.includes('sector')) response = knowledgeBase.industries.answer;
            else if (input.includes('implement') || input.includes('setup') || input.includes('start')) response = knowledgeBase.implementation.answer;
            addMessage('bot', response, true);
        }

        sendButton.addEventListener('click', processUserInput);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') processUserInput();
        });

        document.querySelectorAll('.quick-question').forEach(button => {
            button.addEventListener('click', (e) => {
                const question = e.target.textContent;
                addMessage('user', question);
                setTimeout(() => {
                    let key = 'default';
                    if (question.includes('services')) key = 'services';
                    else if (question.includes('save')) key = 'savings';
                    else if (question.includes('industries')) key = 'industries';
                    else if (question.includes('implementation')) key = 'implementation';
                    addMessage('bot', knowledgeBase[key].answer, true);
                }, 800);
            });
        });
    }
}

if (window.location.pathname.includes('bot.html')) {
    document.addEventListener('DOMContentLoaded', initFallbackChatbot);
}

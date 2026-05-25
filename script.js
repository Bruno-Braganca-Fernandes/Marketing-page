document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    const leadForm = document.querySelector('.form-container form');

    if (leadForm) {

        leadForm.addEventListener('submit', async function (event) {

            event.preventDefault();

            const leadData = {
                nome: document.getElementById('name').value,
                telefone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                aceitou_privacidade: document.getElementById('privacy').checked
            };

            window.dataLayer = window.dataLayer || [];

            window.dataLayer.push({
                'event': 'geracao_lead',
                'origem': 'landing_page_marketing'
            });

            console.log("Sucesso: Evento disparado para o GTM!");

            try {
                const submitButton = leadForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerText;
                submitButton.innerText = "Enviando...";
                submitButton.disabled = true;

                const SUPABASE_URL = 'https://csdapbhfspxbpudrtbtp.supabase.co/rest/v1/leads';
                const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzZGFwYmhmc3B4YnB1ZHJ0YnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3Mjk4OTgsImV4cCI6MjA5NTMwNTg5OH0.dGIO5JLlP7T178r9MmEyuEZrHHF1Vi7TqRQ8JeoJJFE';

                const response = await fetch(SUPABASE_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                    },
                    body: JSON.stringify({
                        nome: leadData.nome,
                        telefone: leadData.telefone,
                        email: leadData.email,
                        origem: 'organico'
                    })
                });

                if (response.ok) {
                    alert('Preview garantido! Entraremos em contato.');
                    leadForm.reset();
                } else {
                    alert('Houve um erro ao enviar seus dados. Tente novamente.');
                }

                submitButton.innerText = originalText;
                submitButton.disabled = false;

            } catch (error) {
                console.error("Erro na comunicação com a API:", error);
                alert('Erro de conexão. Verifique sua internet.');
            }
        });
    }
});

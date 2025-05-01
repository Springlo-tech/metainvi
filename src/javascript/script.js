
$(document).ready(function() {
    $('#mobile_btn').on('click',function(){
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find("i").toggleClass('fa-x');
    });
const sections=$('section');
const novItems=$('.nav-item');



$(window).on('scroll', function(){
    const header=$('header');
   
    const scrollPosition=$(window).scrollTop()-header.outerHeight();
    let actionSectionIndex = 0;

    if(scrollPosition <=0 ){
        header.css('box-shadow','none');
    }else{
        header.css('box-shadow','5px 1px 5px rgba(0,0,0,0.1');

    }
    sections.each(function(i){
      const section= $(this)
      const sectionTop = section.offset().top-96;
      const sectionBottom= sectionTop+ section.outerHeight();
      
      if(scrollPosition >= sectionTop && scrollPosition <sectionBottom){
        activeSectionIndex =i;
        return false;

      }

    })
    navItems.removeClass('active');
    $(navItems[activeSectionIndex]).addClass('active');
   })  ; 

ScrollReveal().reveal('#cta',{
    origin: 'left',
    duration: 2000,
    distance:'20%'

    });
ScrollReveal().reveal('.dicas',{
        origin: 'left',
        duration: 2000,
        distance:'20%'
    
    });
ScrollReveal().reveal('#sobre-livro-chef',{
        origin: 'left',
        duration: 1000,
        distance:'20%'
        
    });
    ScrollReveal().reveal('.feedback',{
        origin: 'right',
        duration: 1000,
        distance:'20%'
        
    });
    document.getElementById('botaoBaixar').addEventListener('click', function () {
        const imagem = document.getElementById('minhaImagem');
    
        // Detectar se o dispositivo é mobile
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
        // Forçar o navegador a carregar a imagem novamente, adicionando um parâmetro único
        const imagemSrcComTimestamp = imagem.src + '?t=' + new Date().getTime();
    
        if (isMobile) {
            // Para dispositivos móveis, abrir a imagem diretamente em uma nova aba
            const novaJanela = window.open('', '_blank');
            novaJanela.document.write(`
                <html>
                <head><title>Visualizar Imagem</title></head>
                <body style="margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
                    <img src="${imagemSrcComTimestamp}" style="max-width: 100%; height: auto;">
                </body>
                </html>
            `);
            novaJanela.document.close();
        } else {
            // Para computadores, recriar a janela de impressão
            imagem.style.display = 'block'; // Tornar a imagem visível
            const janelaImpressao = window.open('', '_blank');
    
            janelaImpressao.document.open(); // Abre a escrita do documento
            janelaImpressao.document.write(`
                <html>
                <head>
                    <title>Imprimir</title>
                    <style>
                        /* Definir o estilo para ajustar a imagem no tamanho desejado */
                        body {
                            margin: 0; 
                            padding: 0; 
                            display: flex; 
                            justify-content: center; 
                            align-items: center; 
                            height: 100vh;
                        }
                        img {
                            width: 148mm; /* Largura de metade de uma folha A4 (210mm / 2) */
                            height: auto; /* Mantém a proporção da imagem */
                        }
                    </style>
                </head>
                <body>
                    <img src="${imagemSrcComTimestamp}">
                </body>
                </html>
            `);
            janelaImpressao.document.close(); // Fecha a escrita
    
            // Ocultar a imagem novamente na tela principal
            imagem.style.display = 'none';
    
            // Adicionando um atraso para garantir que o conteúdo da janela esteja carregado antes da impressão
            setTimeout(function () {
                janelaImpressao.focus(); // Focar a nova janela
                janelaImpressao.print(); // Iniciar a impressão
                janelaImpressao.close(); // Fechar a janela após a impressão
            }, 500); // Esperar 500ms
        }
    });
    
    class FormSubmit {
        constructor(settings) {
            this.form = document.querySelector(settings.form);
            this.formButton = document.querySelector(settings.button);
            this.settings = settings;
            this.emailSent = false; // Rastrea se o email já foi enviado
            if (this.form) {
                this.url = this.form.getAttribute("action");
            }
            this.sendForm = this.sendForm.bind(this);
            this.resetMessage = this.resetMessage.bind(this);
        }
    
        displayMessage(message, type) {
            let messageElement = this.form.querySelector(".form-message");
            if (!messageElement) {
                messageElement = document.createElement("div");
                messageElement.className = "form-message";
                this.form.prepend(messageElement);
            }
            messageElement.innerHTML = message;
            messageElement.className = `form-message ${type}`;
        }
    
        clearFormFields() {
            const fields = this.form.querySelectorAll("[name]");
            fields.forEach((field) => {
                field.value = "";
            });
        }
    
        resetButton(button) {
            button.disabled = false;
            button.innerText = "Enviar";
        }
    
        resetMessage() {
            const messageElement = this.form.querySelector(".form-message");
            if (messageElement) {
                messageElement.remove(); // Remove a mensagem ao interagir com o formulário
            }
        }
    
        async sendForm(event) {
            event.preventDefault();
            if (this.emailSent) {
                const confirmation = confirm(
                    "Seu email já foi enviado. Deseja enviar outro email?"
                );
                if (!confirmation) {
                    this.resetButton(this.formButton);
                    return;
                }
            }
            try {
                this.formButton.disabled = true;
                this.formButton.innerText = "Enviando...";
                const formData = new URLSearchParams(this.getFormObject());
    
                const response = await fetch(this.url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Accept: "application/json",
                    },
                    body: formData.toString(),
                });
    
                if (response.ok) {
                    this.displayMessage(this.settings.success, "success");
                    this.clearFormFields();
                    this.emailSent = true; // Marca como enviado
                } else {
                    this.displayMessage(this.settings.error, "error");
                }
            } catch (error) {
                this.displayMessage(this.settings.error, "error");
                console.error("Erro ao enviar o formulário:", error);
            } finally {
                this.resetButton(this.formButton);
            }
        }
    
        getFormObject() {
            const formObject = {};
            const fields = this.form.querySelectorAll("[name]");
            fields.forEach((field) => {
                formObject[field.getAttribute("name")] = field.value;
            });
            return formObject;
        }
    
        addFieldListeners() {
            const fields = this.form.querySelectorAll("[name]");
            fields.forEach((field) => {
                field.addEventListener("input", this.resetMessage); // Remove mensagem ao digitar
            });
        }
    
        init() {
            if (this.form) {
                this.formButton.addEventListener("click", this.sendForm);
                this.addFieldListeners(); // Adiciona ouvintes aos campos do formulário
            }
            return this;
        }
    }
    
    const formSubmit = new FormSubmit({
        form: "[data-form]",
        button: "[data-button]",
        success: "Mensagem enviada com sucesso!",
        error: "Não foi possível enviar sua mensagem.",
    });
    
    formSubmit.init();
    
    
      
});


 
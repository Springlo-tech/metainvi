
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
               // Tornar a imagem visível
        imagem.style.display = 'block';
    
        // Recriar a janela de impressão toda vez que clicar
        const janelaImpressao = window.open('', '_blank');
    
        // Forçar o navegador a carregar a imagem novamente, adicionando um parâmetro único
        const imagemSrcComTimestamp = imagem.src + '?t=' + new Date().getTime();
    
        janelaImpressao.document.open(); // Abre a escrita do documento
        janelaImpressao.document.write(`
            <html>
            <head>
                <title>Imprimir</title>
            </head>
            <body style="margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
                <img src="${imagemSrcComTimestamp}" style="max-width:100%; height:auto;">
            </body>
            </html>
        `);
        janelaImpressao.document.close(); // Fecha a escrita
          // Ocultar a imagem novamente na tela principal
        imagem.style.display = 'none';
        // Adicionando um atraso para garantir que o conteúdo da janela esteja carregado antes da impressão
        setTimeout(function() {
            janelaImpressao.focus(); // Focar a nova janela
            janelaImpressao.print(); // Iniciar a impressão
            janelaImpressao.close(); // Fechar a janela após a impressão
        }, 500); // Esperar 500ms (meio segundo)
    });
    
    
      
});


 
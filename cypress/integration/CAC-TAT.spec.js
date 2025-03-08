describe('Central de Atendimento ao Cliente TAT', function() {
        beforeEach(function() {
            cy.visit('./src/index.html')  
        })
            it('verifica o título da aplicação', function() {
                cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
            })
            //Exercicio Extra 1
            //adicionar uma variavel com um texto longo, e adicionar
            //o delay após a variavel {delay: 0}

            it('preenche os campos obrigatórios e envia o formulário', function(){
                cy.clock()

                const longText = 'Teste, teste, teste, Teste, teste, teste, Teste, teste, teste, Teste, teste, teste, Teste, teste, teste'
                cy.get('#firstName').type('Beatriz')
                cy.get('#lastName').type('França')
                cy.get('#email').type('bia@exemplo.com')
                cy.get('#open-text-area').type(longText, {delay: 0})
                cy.get('button[type="submit"]').click()
                
                cy.get('.success').should('be.visible')

                cy.tick(3000)

                cy.get('.success').should('not.be.visible')
            })

            //Exercicio Extra 2 
            //Caso alternativo de erro email invalido chamando a classe error

            it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
                cy.clock()
                
                cy.get('#firstName').type('Beatriz')
                cy.get('#lastName').type('França')
                cy.get('#email').type('bia@exemplo,com')
                cy.get('#open-text-area').type('Teste')
                cy.get('button[type="submit"]').click()
                
                cy.get('.error').should('be.visible')

                cy.tick(3000)

                cy.get('.success').should('not.be.visible')
            })
            //Exercicio Extra 3
            //se um valor não-numérico 
            //for digitado, seu valor continuará vazio.
            //get em cadeia

            it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
                cy.get('#phone')
                    .type('abcdefg')
                    .should('have.value', '')
                

            })

            //Exercicio Extra 4
            //Setando o checkbox 
            //

            it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
               cy.clock()
               
                cy.get('#firstName').type('Beatriz')
                cy.get('#lastName').type('França')
                cy.get('#email').type('bia@exemplo.com')
                cy.get('#phone-checkbox').check()
                cy.get('#open-text-area').type('Teste')
                cy.get('button[type="submit"]').click()
                
                cy.get('.error').should('be.visible')

                cy.tick(3000)

                cy.get('.success').should('not.be.visible')
            
            })

            //Exercicio Extra 5
            //teste deve verificar o valor (value) após a digitação (.type(...).should('have.value', 'valor-aqui')), 
            //e após a limpeza do campo (.clear().should('have.value', ''))
            
            it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
                cy.get('#firstName')
                    .type('Beatriz')
                    .should('have.value', 'Beatriz')
                    .clear()
                    .should('have.value', '')
                    
                cy.get('#lastName')
                    .type('França')
                    .should('have.value', 'França')
                    .clear()
                    .should('have.value', '')
                    
                cy.get('#email')
                    .type('bia@exemplo.com')
                    .should('have.value', 'bia@exemplo.com')
                    .clear()
                    .should('have.value', '')
                   
                cy.get('#phone')
                    .type('1234567890')
                    .should('have.value', '1234567890')
                    .clear()
                    .should('have.value', '')
                
                cy.get('#open-text-area')
                    .type('teste')
                    .should('have.value', 'teste')
                    .clear()
                    .should('have.value', '')
               
            })

            //Exercicio Extra 6
            //O teste deve simplesmente acessar a aplicação e clicar no botão Enviar
            //deve verificar que uma mensagem é exibida em um elemento com a classe error
        
            it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
                cy.clock()
                
                cy.get('button[type="submit"]').click()
                
                cy.get('.error').should('be.visible')

                cy.tick(3000)

                cy.get('.success').should('not.be.visible')
            })

            //Exercicio Extra 7
            //cria novo comando no arquivo commands.js
            //e chama o comando direto otimizando em linha de código

            it('envia o formuário com sucesso usando um comando customizado', () => {              
                cy.clock()
                cy.fillMandatoryFieldsAndSubmit()    

                cy.get('.success').should('be.visible')
                
                cy.tick(3000)

                cy.get('.success').should('not.be.visible')
            
            })
            
            //Exercicio Extra 8
            //Outra forma de identificar elementos (para, por exemplo, clicar neles após sua 
            //definição) é o uso da funcionalidade cy.contains().

            it('envia o formuário com sucesso usando um comando customizado', function(){
                cy.get('#firstName').type('Beatriz')
                cy.get('#lastName').type('França')
                cy.get('#email').type('bia@exemplo.com')
                cy.get('#open-text-area').type('Teste')
                cy.contains('button[type="submit"]','Enviar').click()
                
                cy.get('.success').should('be.visible')
            
            })

            //Aula 3 - Seleção de Groupbox 
            it('seleciona um produto (YouTube) por seu texto', function(){
                cy.get('#product')
                    .select('YouTube')
                    .should('have.value', 'youtube')
      
            })

            it('seleciona um produto (Mentoria) por seu valor (value)', function(){
                cy.get('#product')
                    .select('mentoria')
                    .should('have.value', 'mentoria')
      
            })
            it('seleciona um produto (Blog) por seu índice', function(){
                cy.get('#product')
                    .select(1)
                    .should('have.value', 'blog')
      
            })

            //Aula 4 - Radio Button
            it('marca o tipo de atendimento "Feedback"', function(){
            cy.get('input[type="radio"][value="feedback"]')
                    .check()
                    .should('have.value', 'feedback')
      
            })

            it('marca cada tipo de atendimento', function(){
                cy.get('input[type="radio"][value="ajuda"]')
                    .check()
                    .should('be.checked')

                cy.get('input[type="radio"][value="elogio"]')
                    .check()
                    .should('be.checked')

                cy.get('input[type="radio"][value="feedback"]')
                    .check()
                    .should('be.checked')

                //verifica e checa cada um dos elementos
                //como um loop de repeticao
                cy.get('input[type="radio"]')
                    .should('have.length', 3)
                    .each(function ($radio){
                        cy.wrap($radio).check()
                        cy.wrap($radio).should('be.checked')
                    })
                    
            })
            //Aula 5 - Checkbox

            it('marca ambos checkboxes, depois desmarca o último',function(){
                cy.get('input[type="checkbox"]')
                    .check()
                    .should('be.checked')
                    .last()
                    .uncheck()
                    .should('not.be.checked')
            })

            //Aula 6 - Upload de arquivos

            it('seleciona um arquivo da pasta fixtures',function(){
                cy.get('#file-upload')
                    .should('not.have.value')
                    .selectFile('./cypress/fixtures/example.json')
                    .should(function($input){
                        expect($input[0].files[0].name).to.equal('example.json')
                    })
            })

            it('seleciona um arquivo simulando um drag-and-drop', function(){
                cy.get('#file-upload')
                .should('not.have.value')
                .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
                .should(function($input){
                    expect($input[0].files[0].name).to.equal('example.json')
                })

            })

            it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
                cy.fixture('example.json').as('arquivo')
                cy.get('#file-upload')
                .selectFile('@arquivo')
                .should(function($input){
                    expect($input[0].files[0].name).to.equal('example.json')


            })
            
    })
            it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
                cy.get('#privacy a').should('have.attr', 'target', '_blank')

            })


            it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
                cy.get('#privacy a')
                .invoke('removeAttr', 'target')
                .click()

                cy.contains('Talking About Testing').should('be.visible')

            })

            it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
                cy.get('.success')
                  .should('not.be.visible')
                  .invoke('show')
                  .should('be.visible')
                  .and('contain', 'Mensagem enviada com sucesso.')
                  .invoke('hide')
                  .should('not.be.visible')
                cy.get('.error')
                  .should('not.be.visible')
                  .invoke('show')
                  .should('be.visible')
                  .and('contain', 'Valide os campos obrigatórios!')
                  .invoke('hide')
                  .should('not.be.visible')
              })

              
            it('preenche o campo da área de texto usando o comando invoke', () => {
                cy.get('#open-text-area').invoke('val', 'um texto qualquer')
                .should('have.value', 'um texto qualquer')
            })

            it('faz uma requisição HTTP', () => {
              cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
              .as('getRequest')  
              .its('status')  
              .should('be.equal', 200)
              cy.get('@getRequest')
              .its('statusText')
              .should('be.equal', 'OK')
              cy.get('@getRequest')
              .its('body')
              .should('include', 'CAC TAT')
            })

            it('encontre o gato escondido', () => {
                cy.get('#cat')
                  .invoke('show')
                  .should('be.visible')
                cy.get('#title')
                  .invoke('text', 'CAT TAT')
                cy.get('#subtitle')
                  .invoke('text', 'Eu <3 Gatos!!')
            })
})

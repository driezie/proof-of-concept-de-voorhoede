# Pleasurable Interface

Ontwerp en maak voor een opdrachtgever een interface waar gebruikers blij van worden

## Context

Deze leertaak hoort bij sprint 11 "Pleasurable UI". Dit is een leertaak die je in een team uitvoert voor een opdrachtgever.

In het college S11W1-01-Sprintplanning en S11W1-02-Feature-branches-pull-requests wordt de opdracht en de werkwijze uitgelegd.


## Doel van deze opdracht
Je leert hoe je met een team een interactieve website kan ontwerpen en maken.

## Werkwijze
Je werkt in een team aan de website voor een opdrachtgever. 
Zorg dat je duidelijk afspraken maakt en elkaar dagelijks op de hoogte houdt van vorderingen. Samen met jouw team ben je verantwoordelijk voor de planning, het samenwerkingsproces én het eindresultaat.

Deze opdracht gaat over alle fases van de DLC [analyseren](#analyseren), [ontwerpen](#ontwerpen), [bouwen](#bouwen), [integreren](#integreren) en [testen](#testen).

## Analyseren
In de analysefase inventariseer je wat er moet gebeuren om de leertaak uit te voeren. 
Bekijk en bespreek al het gemaakte werk, maak afspraken met je team en een [planning](#samenwerken--planning). 

### Sprintplanning
1. Lees de instructies van deze leertaak met je team zorgvuldig door
2. Bekijk de verschillende fases van de DLC en wat je per fase gaat doen
3. Bekijk de [planning van sprint 11](https://programma.fdnd.nl/data-driven-web/pleasurable-ui) en wat je per week gaat doen
4. Bespreek met het projectteam wat je aan werk verwacht en maak aantekeningen. (wat komt je bekend voor, wat heb je al vaker gedaan of wat lijkt je lastig)
5. Bekijk het gemaakte werk van de teamleden zodat jullie een duidelijk beeld krijgen van wat er al gemaakt is

### Samenwerken & planning
In de analysefase bespreek je als team welke werkzaamheden er zijn, wie wat gaat doen en maak je een planning. 
Er is veel werk aan de winkel deze sprint, maak afspraken om elke dag aan het project te werken en hoe jullie elkaar op de hoogte houden van de vorderingen.

1. Één teamlid forkt de leertaak en voegt teamleden toe als 'collaborators'
2. De andere teamleden clonen de geforkte-repo, zo kun je makkelijk wijzigingen doorvoeren en ophalen
3. Maak een _project board_ aan en koppel het aan de gezamenlijke _repository_ om bij te kunnen houden wie wat doet
4. Plan voor de aankomende weken de reviews en noteer de planning in jullie _project board_.
5. Doe dagelijks een standup, bespreek met je team welke werkzaamheden er zijn en wie wat heeft gedaan.
6. Gebruik het project board om grip te houden op de planning, sleep taken naar _done_ als ze klaar zijn, schrijf nieuwe taken als dat nodig is. 

### Materiaal voor samenwerken

- [About Github Projects, quickstart en best practices](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)
- [De Daily standup meeting: uitleg en tips](https://scrumguide.nl/daily-standup-meeting/)
<!-- - [Making a pull-request](https://www.atlassian.com/git/tutorials/making-a-pull-request) (nb. wij gebruiken de feature-branch workflow) -->
<!-- - [How to Collaborate on GitHub](https://code.tutsplus.com/tutorials/how-to-collaborate-on-github--net-34267) -->
<!-- - [download het Team Canvas](https://github.com/fdnd-task/performance-matters-fast-website/blob/main/docs/Teamcanvas.pdf) -->
<!-- - [Lees instructies over het gebruik van het Teamcanvas in de deeltaak uit sprint 1](https://github.com/fdnd-task/your-tribe-team-canvas) -->

## Ontwerpen
In de ontwerpfase bepaal je met je team wat je gaat maken. 
Bepaal de [sitemap & UML diagram](#sitemap--uml-diagram) van jullie website en per pagina de url/routes. 
Schets daarna een [wireframe & breakdown](#wireframe-wireflow--breakdown) per onderdeel van de website. 
Maak tot slot [code-afspraken](#code-afspraken). 

### Sitemap & UML Diagram
Bepaal welke pagina's jullie gaan ontwerpen en bouwen, welke url's daarbij horen en de data die erbij hoort. Doe dit met het hele team zodat iedereen op de hoogte is en jullie ideeën kunnen uitwisselen:

1. Teken een sitemap met alle pagina's voor de opdracht voor de opdrachtgever (overzicht-, detail-, formulierpagina, etc ...)
2. Schrijf per pagina de url en de parameters die moet worden meegestuurd
3. Werk alle routes uit: Schets de functies en methodes die worden uitgevoerd en de bijbehorende EJS
4. Noteer welke data wordt opgehaald en gepost met de Directus-API en of het een GET of POST is
5. Schrijf ook op welke data wordt doorgegeven aan een volgende functie, methode of view

### Wireframe, Wireflow & Breakdown
Schets per pagina en onderdelen gezamenlijk een wireframe en/of wireflow en maak een breakdown van de HTML, CSS en Client-side JS. Het is belangrijk om dit gezamenlijk te doen, nu maak je met het team afspraken over code, semantiek en naamgeving. 

Maak voor elke pagina, of onderdeel, een ontwerp op basis van de huisstijl. (Bijvoorbeeld in Figma) Dit wordt het ontwerp dat jullie gaan realiseren. Het ontwerp zal tijdens de werkzaamheden veranderen. Dat is prima. Soms zal je de veranderingen bijhouden in het Figma file, soms is dat niet nodig. 

### Code afspraken
Maak code afspraken met je team over de Node-code, (semantische) HTML, gestructureerde CSS en conventies.
Denk na over de HTML structuur, en het voorkomen van layout shifts, toepassen van perceived performance en loading hints aan de browser en het toepassen van responsive images. Maak afspraken over de volgorde van de CSS, van generiek-naar-specifiek. Bedenk een goede volgorde in de Node en de routing. Maak afspraken over het schrijven van comments. Etc ..

## Bouwen
In de bouwfase realiseer je de beslissingen uit de ontwerpfase. 
Met het team werk je op 1 code base. 
Zet je code [Mobile First](#mobile-first) op en werk met [Progressive Enhancement](#progressive-enhancement). 
In je team werken jullie met de [feature branches](#feature-branches).

### Feature branches
Met je team ga je allemaal aan features werken, jullie maken verschillende variaties van dezelfde features, of je verdeelt de werkzaamheden en werkt aan verschillende features. 

Als je aan een feature gaat werken maak je eerst op GitHub een nieuwe _branch_ aan vanaf de main branch, vervolgens _pull_ je deze naar je lokale systeem. Je maakt regelmatig commits en implementeert de 'feature'. Als je klaar bent push je alles naar github en doe je vanaf de feature-branch een pull-request naar main. In het pull-request wordt jouw code bekeken, getest en goedgekeurd door jouw teamleden. 

Pas de code afspraken toe en en doe een code-review met je team voordat je de code merged (integreert) met de main branch.

### Materiaal Feature branches

- [Using branches](https://www.atlassian.com/git/tutorials/using-branches)
- [Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)

### Mobile first
Zorg dat je met je team Mobile First bouwt. Zet eerst de (semantische) HTML van de pagina's en/of onderdelen op. Pas daarna CSS toe om de huisstijl goed toe te passen. Voeg daarna media-queries of andere responsive CSS technieken toe voor M, L en of XL schermen. 

### Progressive Enhancement
Bouw de website volgens het principe van Progressive Enhancement. Zorg dat eerst de _functional_ en _reliable_ laag het goed doet, daarna de _usable_ laag, voordat je gaat experimenteren met de _pleasurable UI_. 

## Integreren
In de integratiefase voer je de aanpassingen door zodat iedereen ze kan zien en er op verder kan bouwen. 

1. Integreer jouw code naar de gezamenlijke repo
2. Maak een *pull-request* voor de feature waar je aan hebt gewerkt
3. Handel het *pull-request* af, zorg voor een helder gedocumenteerd *pull-request* door bij de afhandeling relevante berichten te typen. 
4. Zorg dat je teamgenoten de nieuwe code integreren

### Materiaal Integreren

- [Creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
- [Feature Branch: A Quick Walk Through Git Workflow](https://blog.mergify.com/feature-branch-a-quick-walk-through-git-workflow/)

## Testen
In de testfase controleer je of jouw aanpassingen werken zoals bedoeld. 

## Criteria
*Definitions of done*

Deze opdracht is done als:

- [ ]  Je hebt je website samen ontworpen en gemaakt en de website is online gepubliceerd
- [ ]  Je hebt je proces bijgehouden van het iteratief (samen)werken in de Wiki
- [ ]  Je toont aan dat je in de bouw-, integratie- en testfase verschillende methoden en technieken hebt ingezet om samen te werken met code
- [ ]  Je hebt client-side scripting technieken gebruikt om een interface te ontwerpen en maken waar gebruikers blij van worden



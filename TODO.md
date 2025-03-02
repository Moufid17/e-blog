- [x] PostEditor Space between desc formatter and desc input 
- [x] Handle unexisting page
- [x] Category seed
- [ ] Home page : 
    - [x] Grid mobile first
    - [x] Article Card : Catgeory flag
    - [6] filter by category : create hook useSearchPagination()
- [ ] Author public page (/about-me)
- [ ] Delete post with confirmation
- [*] Account page : This page will split into [PROFILE](https://berrydashboard.io/apps/blog/general-settings) and [dashboard](https://berrydashboard.io/dashboard/blog) templates.
    - [x] Post list (draft, published, others)
    - [0] account details (linkedin, social media links, location)
        - [x] Display
        - [ ] Accordion for more element
    - [x] overview stats (likes per months)
    - [2] 
        - [x] Draft edit Icon (link)
        - [x] fix: like re-render && article (drafted or published) re-render
        - [x?] My Article card "More vertical menu (edit, archive, delete) : Faut il supprimer les likes reçu par un post si il est mit en draft ?
    - [x] Edit account details : Modal Card (pseudo and social links)
    - [x] create the favorite list card
    - [x] Global state (test on allLikesReceived from home page to account : synchro without refresh page)
    - [ ] create the archive list card
    - [7] Stat : view
- [ ] Post add/edit :
    - [x] Mobile first UI
    - [x] Category and isPublished Components
    - [x] Handle invalid title, category and description with error message.
    - [x] fix : Description reset when (category and may be title) changed
    - [x] fix : Disable category for acticle displaying when i am not the author.
    - [x] Category : display for post owner or not.
    - [5] archive, unarchive and share link
- [4bis*] Wysiwig Editor: create one (mui/joy: Toggle Button Group) | [btw Wysiwig](https://github.com/btw-so/btw)
    - [x] Menu updated
    - [x] Cancel modification, save and generate by ia (PostItemExperimental and PostEditorExperimental : `have to merge to edit`)
    - [*] [Update Editor container](https://tiptap.dev/docs/editor/extensions/custom-extensions/create-new)
        - [Node view examples](https://tiptap.dev/docs/editor/extensions/custom-extensions/node-views/examples)
    - [ ] [Insert highlighting](https://tiptap.dev/docs/examples/advanced/syntax-highlighting)
    - [ ] [Insert link](https://tiptap.dev/docs/editor/extensions/marks/link)
    - [ ] [Insert image](https://tiptap.dev/docs/editor/extensions/nodes/image)
    - [ ] [Insert code block](https://tiptap.dev/docs/editor/extensions/nodes/code-block-lowlight)
    - [ ] [Insert mention pseudo](https://tiptap.dev/docs/examples/advanced/mentions)

    - https://tiptap.dev/docs/examples/advanced/interactive-react-and-vue-views
    - https://tiptap.dev/docs/comments/getting-started/overview
    

- [6] About-me Page (public page)
- [ ] [zod + infer](https://www.julienrollin.com/posts/typescript-zod-validation/#zod--ts--la-combinaison-id%C3%A9ale-) : implementation zod typage through the app.





<!-- Il faut modifier les userId -->
"""
INSERT INTO "Post" ("id", "title", "description", "userId", "created_at", "updated_at") VALUES
('cm71nl3bw0006ywcxnl8gw17c',	'Comment faire de bons formulaires en React ?',	'
    <p>Les formulaires sont un élément essentiel de toute application web, et savoir comment les concevoir de manière efficace en utilisant React peut considérablement améliorer l''expérience utilisateur. Pour créer des formulaires efficaces en React, il est important de prendre en compte divers aspects tels que la gestion de l''état, la validation des données et l''interaction avec l''utilisateur.</p>
    
    <p>Une approche courante pour créer des formulaires en React consiste à utiliser des composants contrôlés, où les valeurs des champs du formulaire sont stockées dans l''état de composant et modifiées à l''aide de fonctions de rappel. Cela permet de garder une synchronisation entre l''interface utilisateur et l''état interne de l''application, facilitant ainsi la manipulation des données du formulaire.</p>
    
    <p>Il est également crucial de mettre en place une logique de validation des données afin de garantir que les utilisateurs saisissent des informations correctes dans le formulaire. Cela peut se faire en utilisant des bibliothèques de validation telles que Formik ou en mettant en œuvre ses propres règles de validation à l''aide de JavaScript.</p>
    
    <p>Par ailleurs, pour rendre l''expérience utilisateur plus fluide, il est recommandé d''inclure des fonctionnalités telles que la gestion des erreurs de saisie, les indications visuelles sur les champs obligatoires et les retours d''information en temps réel lors de la saisie des données.</p>
    
    <p>Enfin, il est important de considérer l''accessibilité lors de la conception des formulaires en React. En veillant à ce que les formulaires soient compatibles avec les technologies d''assistance, comme les lecteurs d''écran, vous vous assurez que votre application est accessible à tous les utilisateurs.</p>
    
    <p>En suivant ces bonnes pratiques et en prenant en compte ces différents aspects, vous serez en mesure de créer des formulaires performants et conviviaux en React, améliorant ainsi l''expérience globale de vos utilisateurs.</p>
',	'cm7hz16tg0000vjd24k40trbn',	'2025-02-12 08:32:47.9',	'2025-02-12 08:32:47.9'),
('cm71nmad20007ywcx3c6trftz',	'React Query vs SWR',	'
    <p>Si vous travaillez avec React et que vous cherchez la meilleure solution pour la gestion des données et des requêtes HTTP dans vos applications, vous avez probablement entendu parler de React Query et SWR. Ces deux bibliothèques sont conçues pour simplifier la gestion de l''état et le fetching des données, mais elles ont des approches différentes.</p>
    
    <p>React Query se concentre sur la gestion des requêtes et de la mise en cache des données de manière robuste et sophistiquée. Elle offre des fonctionnalités avancées telles que la gestion des mutations, la pagination, la mise en cache automatique et la gestion des erreurs. Grâce à React Query, vous pouvez optimiser les performances de vos applications en évitant les requêtes superflues et en gérant efficacement les mises à jour des données.</p>
    
    <p>D''un autre côté, SWR (stale-while-revalidate) se concentre sur la facilité d''utilisation et la simplicité. Elle propose une approche plus légère et intuitive pour la gestion de l''état et des requêtes, en mettant l''accent sur la récupération des données en cache tout en lançant une requête asynchrone pour les données mises à jour en arrière-plan. SWR est idéal pour les projets plus petits ou pour ceux qui recherchent une solution simple et rapide à mettre en œuvre.</p>
    
    <p>En comparant ces deux bibliothèques, il est important de prendre en compte vos besoins spécifiques et les exigences de votre projet. React Query offre plus de fonctionnalités avancées et de contrôle sur la gestion des données, ce qui en fait un choix solide pour les applications complexes nécessitant une optimisation poussée. En revanche, SWR est plus adapté aux projets plus simples ou à ceux qui recherchent une solution rapide et efficace sans compromettre la qualité.</p>
    
    <p>En fin de compte, que vous choisissiez React Query ou SWR, ces deux bibliothèques offrent des avantages significatifs en termes de gestion des données et des requêtes dans vos applications React. Prenez le temps d''évaluer vos besoins et de tester chaque solution pour trouver celle qui correspond le mieux à votre projet et à votre équipe de développement.</p>
',	'cm7hz16tg0000vjd24k40trbn',	'2025-02-12 08:33:43.669',	'2025-02-12 08:33:43.669'),
('cm71ofm3q000dywcx2sdn37q8',	'Sommet de l’IA',	'
    <p>Le sommet de l''intelligence artificielle qui s''est tenu à Paris a été l''occasion pour les experts et les passionnés du domaine de se réunir et de discuter des enjeux cruciaux liés à ce secteur en pleine expansion. Une des thématiques phares de cette édition a été l''intelligence artificielle écologique, un sujet essentiel dans le contexte actuel de crise climatique.</p>
    
    <p>Les participants de ce sommet n''étaient ni naïfs ni pessimistes, mais bel et bien déterminés à explorer les possibilités offertes par l''IA pour contribuer à la transition écologique. En effet, de plus en plus de voix se lèvent pour souligner le potentiel de l''IA dans la lutte contre le changement climatique et la préservation de l''environnement.</p>
    
    <p>Les différentes tables rondes et conférences ont ainsi permis d''aborder des sujets variés tels que la gestion intelligente de l''énergie, la réduction des émissions de carbone, ou encore la protection de la biodiversité grâce à des applications innovantes de l''intelligence artificielle.</p>
    
    <p>Les intervenants ont partagé leurs visions et leurs projets, mettant en lumière les avancées technologiques récentes qui permettent d''optimiser les processus industriels, agricoles et urbains tout en limitant leur impact sur l''environnement.</p>
    
    <p>En fin de compte, ce sommet de l''IA à Paris a permis de réaffirmer l''engagement de la communauté des experts en intelligence artificielle en faveur d''une approche durable et respectueuse de l''environnement. Une prise de conscience collective qui met en avant le rôle crucial que peut jouer l''IA dans la construction d''un avenir plus vert et plus responsable.</p>
',	'cm7hzeac80005vjd2hva0vmcm',	'2025-02-12 08:56:31.91',	'2025-02-16 17:28:15.116'),
('cm71nk6kc0005ywcxzmk3fd53',	'Check out Prisma with Next.js',	'<h1>Are you looking to take your web development skills to the next level? Look no further than Prisma with Next.js!</h1><p>This powerful combination of tools offers a seamless and efficient way to build web applications with a focus on performance and scalability.</p><p><strong>Prisma</strong> is a modern database toolkit that simplifies database access for developers. With Prisma, you can easily work with databases using a type-safe and auto-generated query builder that is simple to use and understand. This allows developers to focus on building features rather than dealing with manual database queries.</p><p>Next.js, on the other hand, is a popular React framework for building server-side rendered and static websites. It offers features like automatic code splitting, hot module replacement, and server-side rendering, making it an excellent choice for building fast and dynamic web applications.</p><p>By combining Prisma with Next.js, developers can create powerful web applications with ease. Prisma simplifies database management, while Next.js provides a robust framework for building high-performance web applications. This combination is perfect for projects of any size, from small personal websites to large enterprise applications.</p><p>Whether you are a beginner looking to learn more about web development or an experienced developer seeking to streamline your workflow, exploring Prisma with Next.js is a worthwhile endeavor. Stay ahead of the curve in web development by incorporating these cutting-edge tools into your projects.</p><p>Ready to dive into the world of Prisma and Next.js? Check out tutorials, documentation, and community resources to get started. Enhance your web development skills and build impressive applications that stand out in today''s competitive digital landscape.</p>',	'cm7hz16tg0000vjd24k40trbn',	'2025-02-12 08:32:05.436',	'2025-02-16 21:09:35.301');
""/p><p><strong>Prisma</strong> is a modern database toolkit that simplifies database access for developers. With Prisma, you can easily work with databases using a type-safe and auto-generated query builder that is simple to use and understand. This allows developers to focus on building features rather than dealing with manual database queries.</p><p>Next.js, on the other hand, is a popular React framework for building server-side rendered and static websites. It offers features like automatic code splitting, hot module replacement, and server-side rendering, making it an excellent choice for building fast and dynamic web applications.</p><p>By combining Prisma with Next.js, developers can create powerful web applications with ease. Prisma simplifies database management, while Next.js provides a robust framework for building high-performance web applications. This combination is perfect for projects of any size, from small personal websites to large enterprise applications.</p><p>Whether you are a beginner looking to learn more about web development or an experienced developer seeking to streamline your workflow, exploring Prisma with Next.js is a worthwhile endeavor. Stay ahead of the curve in web development by incorporating these cutting-edge tools into your projects.</p><p>Ready to dive into the world of Prisma and Next.js? Check out tutorials, documentation, and community resources to get started. Enhance your web development skills and build impressive applications that stand out in today''s competitive digital landscape.</p>',	'cm7hz16tg0000vjd24k40trbn',	'2025-02-12 08:32:05.436',	'2025-02-16 21:09:35.301');
""
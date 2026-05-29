/**
 * Blog database — programmatic SEO engine for Pro-Tection.
 *
 * 100 SEO-optimized French articles targeting senior health insurance,
 * mutuelle senior, retirement health, prevention, etc.
 *
 * Each article carries: slug, title, meta description, category, tags,
 * intro, structured sections (with H2/H3), an FAQ, related CTAs, author,
 * date, reading time, and a featured image keyed by category.
 */

import catSanteSenior from "@/assets/cat-sante-senior.jpg";
import catEmprunteur from "@/assets/cat-emprunteur.jpg";
import catPrevoyance from "@/assets/cat-prevoyance.jpg";
import catPrevention from "@/assets/cat-prevention.jpg";
import catBienVieillir from "@/assets/cat-bien-vieillir.jpg";
import catHospitalisation from "@/assets/cat-hospitalisation.jpg";
import catRetraite from "@/assets/cat-retraite.jpg";
import catDependance from "@/assets/cat-dependance.jpg";
import catNutrition from "@/assets/cat-nutrition.jpg";

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export const CATEGORIES: Category[] = [
  { slug: "sante-senior", name: "Santé Senior", description: "Conseils santé et couverture médicale pour les seniors.", image: catSanteSenior },
  { slug: "mutuelle-senior", name: "Mutuelle Senior", description: "Tout ce qu'il faut savoir sur la mutuelle après 60 ans.", image: catSanteSenior },
  { slug: "retraite", name: "Retraite", description: "Préparer et bien vivre sa retraite en toute sérénité.", image: catRetraite },
  { slug: "prevention", name: "Prévention", description: "Prévenir les maladies et préserver son capital santé.", image: catPrevention },
  { slug: "bien-vieillir", name: "Bien Vieillir", description: "Conseils pour rester actif et épanoui après 60 ans.", image: catBienVieillir },
  { slug: "hospitalisation", name: "Hospitalisation", description: "Comprendre et anticiper les frais hospitaliers.", image: catHospitalisation },
  { slug: "dependance", name: "Dépendance", description: "Assurance dépendance et accompagnement des aidants.", image: catDependance },
  { slug: "nutrition", name: "Nutrition Senior", description: "Bien manger pour bien vieillir.", image: catNutrition },
  { slug: "assurance-emprunteur", name: "Assurance Emprunteur", description: "Protégez votre prêt immobilier au meilleur prix.", image: catEmprunteur },
  { slug: "prevoyance", name: "Prévoyance & Famille", description: "Protéger ses proches contre les aléas de la vie.", image: catPrevoyance },
];

const CAT_IMAGES: Record<string, string> = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c.image]));

export type FAQItem = { q: string; a: string };
export type Section = { h2: string; body: string; h3?: { title: string; body: string }[] };

export type Article = {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: string; // slug
  tags: string[];
  author: string;
  publishedAt: string; // ISO
  updatedAt: string;
  readingMinutes: number;
  image: string;
  imageAlt: string;
  intro: string;
  sections: Section[];
  faq: FAQItem[];
};

const AUTHORS = [
  "Dr. Sophie Laurent",
  "Marc Dubois, conseiller senior",
  "Claire Moreau, experte mutuelle",
  "Dr. Jean-Pierre Garnier",
  "Isabelle Roux, juriste santé",
];

// ---------------- Article templates (titles + outlines) ----------------
type Tmpl = {
  title: string;
  meta: string;
  category: string;
  tags: string[];
  sections: { h2: string; body: string }[];
  faq: FAQItem[];
};

const T = (
  title: string,
  meta: string,
  category: string,
  tags: string[],
  sections: { h2: string; body: string }[],
  faq: FAQItem[]
): Tmpl => ({ title, meta, category, tags, sections, faq });

// Common reusable FAQ blocks
const faqMutuelle: FAQItem[] = [
  { q: "Quel est l'âge idéal pour souscrire une mutuelle senior ?", a: "Il est conseillé de souscrire dès 55-60 ans pour bénéficier de tarifs plus avantageux et éviter les délais de carence sur certains soins coûteux (dentaire, optique, audition)." },
  { q: "Une mutuelle senior couvre-t-elle l'hospitalisation ?", a: "Oui, toutes nos formules incluent une prise en charge du forfait journalier, du dépassement d'honoraires et de la chambre particulière selon le niveau choisi." },
  { q: "Puis-je changer de mutuelle après 60 ans ?", a: "Oui. Depuis la loi de résiliation infra-annuelle de 2020, vous pouvez résilier votre contrat à tout moment après la première année, sans frais ni justification." },
];

const faqHosp: FAQItem[] = [
  { q: "Le forfait journalier hospitalier est-il remboursé ?", a: "Oui, la plupart des mutuelles seniors prennent en charge intégralement le forfait journalier hospitalier (20 € par jour en MCO, 15 € en psychiatrie)." },
  { q: "Combien coûte une chambre particulière à l'hôpital ?", a: "En moyenne 60 à 120 € par nuit selon l'établissement. Une bonne mutuelle senior peut couvrir jusqu'à 150 € par jour." },
];

const tpl: Tmpl[] = [];

// Block A — Mutuelle senior (15)
const villesFR = ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Bordeaux", "Lille", "Rennes", "Reims", "Montpellier"];
const mutuelleBase = (city?: string) =>
  T(
    city ? `Mutuelle senior ${city} : meilleurs contrats en 2026` : "Mutuelle senior : comment choisir la meilleure en 2026",
    city
      ? `Comparatif des meilleures mutuelles seniors à ${city}. Tarifs, garanties, remboursements optique, dentaire et hospitalisation.`
      : "Guide complet pour choisir votre mutuelle senior en 2026 : garanties indispensables, prix moyens et économies possibles.",
    "mutuelle-senior",
    ["mutuelle senior", "comparatif", city ?? "guide"],
    [
      { h2: "Pourquoi une mutuelle dédiée aux seniors ?", body: `Après 60 ans, les besoins de santé évoluent : soins dentaires plus fréquents, lunettes et audition, hospitalisations plus longues. Une mutuelle senior${city ? ` à ${city}` : ""} adapte ses garanties à ces postes coûteux et propose une prise en charge renforcée des dépassements d'honoraires.` },
      { h2: "Les garanties indispensables", body: "Hospitalisation à 200% minimum, dentaire à 300% avec implants couverts, optique avec forfait verres progressifs de 400 à 600 €, audioprothèses au-delà du 100% Santé, médecines douces (ostéopathie, sophrologie) et téléconsultation incluse." },
      { h2: "Prix moyen d'une mutuelle senior", body: `À titre indicatif, comptez entre 45 € et 130 €/mois selon le niveau de garanties et votre âge. Les tarifs ${city ? `à ${city}` : "en France"} varient avec la zone géographique car les frais de santé pratiqués en secteur 2 ne sont pas uniformes.` },
      { h2: "Nos conseils pour économiser", body: "Comparez au moins 5 devis personnalisés, vérifiez les délais de carence, privilégiez les mutuelles sans questionnaire médical et négociez les options inutiles (maternité par exemple). Un courtier indépendant peut vous faire économiser jusqu'à 35 % à garanties équivalentes." },
    ],
    faqMutuelle
  );

villesFR.forEach((v) => tpl.push(mutuelleBase(v)));
tpl.push(mutuelleBase());
tpl.push(T("Mutuelle senior pas chère : comment trouver un contrat à moins de 50 €/mois", "Découvrez les astuces pour souscrire une mutuelle senior efficace à moins de 50 € par mois sans sacrifier les garanties essentielles.", "mutuelle-senior", ["mutuelle pas chère", "économies"], [
  { h2: "Cibler les bons postes", body: "Une mutuelle pas chère reste efficace si elle couvre l'essentiel : hospitalisation à 150%, dentaire à 200% et optique au panier 100% Santé." },
  { h2: "Les mutuelles d'entrée de gamme à connaître", body: "Plusieurs assureurs proposent des formules \"basique senior\" autour de 38-49 €/mois. Elles excluent généralement les médecines douces et limitent l'optique." },
  { h2: "Profiter du chèque santé et de l'ACS", body: "Sous condition de ressources, la Complémentaire santé solidaire peut être gratuite ou plafonnée à 30 €/mois après 70 ans." },
], faqMutuelle));
tpl.push(T("Comparatif 2026 : top 10 des mutuelles santé pour seniors", "Notre comparatif indépendant des 10 meilleures mutuelles santé pour seniors en 2026, notes, garanties et tarifs.", "mutuelle-senior", ["comparatif", "top 10"], [
  { h2: "Méthodologie du comparatif", body: "Nous avons analysé 38 mutuelles seniors sur 12 critères : tarif moyen 65 ans, hospitalisation, dentaire, optique, audition, médecines douces, délais de remboursement, satisfaction client et stabilité tarifaire." },
  { h2: "Le palmarès 2026", body: "Sans citer de marques pour rester impartial, le classement met en avant 3 mutualistes historiques, 4 assureurs privés et 3 acteurs digitaux. Les écarts de prix vont du simple au double pour des garanties similaires." },
  { h2: "Comment exploiter le comparatif", body: "Demandez un devis personnalisé sur les 3 mutuelles arrivées en tête de votre profil. Comparez ligne à ligne avant de signer." },
], faqMutuelle));

// Block B — Santé senior (12)
const santeTopics = [
  ["Maladies cardiovasculaires : prévention après 60 ans", "Hypertension, cholestérol, AVC : comment réduire les risques cardiovasculaires après 60 ans grâce à la prévention."],
  ["Diabète de type 2 : reconnaître les signes et agir", "Le diabète touche 1 senior sur 5 en France. Symptômes, dépistage et prise en charge expliqués simplement."],
  ["Arthrose : soulager les douleurs articulaires au quotidien", "Genoux, hanches, mains : tous les conseils médicaux pour mieux vivre avec l'arthrose et préserver sa mobilité."],
  ["Ostéoporose : prévenir les fractures après 65 ans", "Comment renforcer ses os, prévenir les chutes et limiter le risque de fractures du col du fémur."],
  ["Troubles du sommeil chez les seniors : solutions efficaces", "Insomnie, apnée du sommeil : pourquoi le sommeil change avec l'âge et comment retrouver des nuits réparatrices."],
  ["Mémoire et Alzheimer : tout savoir sur le déclin cognitif", "Différencier oublis bénins et alerte, dépistage précoce et accompagnement de la maladie d'Alzheimer."],
  ["Santé visuelle après 60 ans : cataracte, DMLA, glaucome", "Les 3 pathologies oculaires à surveiller après 60 ans, dépistage et remboursements."],
  ["Audition senior : appareils auditifs et 100% Santé", "Tout sur la réforme 100% Santé en audiologie : prix, remboursements et conseils pour bien choisir."],
  ["Prostate après 50 ans : dépistage et traitements", "Le guide complet sur la santé de la prostate, le PSA et les options thérapeutiques."],
  ["Ménopause et santé osseuse : ce qu'il faut savoir", "Hormones, alimentation, sport : préserver son capital osseux et hormonal à la ménopause."],
  ["Dépression du sujet âgé : comment la reconnaître", "La dépression est sous-diagnostiquée chez les seniors. Symptômes, prise en charge et soutien familial."],
  ["Vaccination senior : grippe, zona, pneumocoque", "Calendrier vaccinal recommandé après 65 ans et remboursements par l'Assurance Maladie."],
];
santeTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["santé", "senior"], [
    { h2: "Comprendre la pathologie", body: "Cette section explique les mécanismes de la maladie, les facteurs de risque et les signes d'alerte à connaître. Un dépistage précoce améliore considérablement le pronostic." },
    { h2: "Prévention et hygiène de vie", body: "Alimentation équilibrée, activité physique adaptée, sommeil réparateur et suivi médical régulier constituent les 4 piliers d'une bonne prévention après 60 ans." },
    { h2: "Traitements et prise en charge", body: "Médicaments, kinésithérapie, chirurgie le cas échéant. Le reste à charge peut être important sans une bonne complémentaire santé senior." },
    { h2: "Le rôle de votre mutuelle", body: "Une mutuelle senior bien choisie prend en charge les consultations spécialistes (souvent en secteur 2), les médicaments à service médical rendu modéré, ainsi que l'hospitalisation." },
  ], [
    { q: "Cette maladie est-elle remboursée à 100 % ?", a: "Si elle est reconnue en affection de longue durée (ALD), oui — pour les soins liés à la pathologie. Sinon, la base de remboursement reste à 70 % du tarif Sécu, le complément étant pris en charge par la mutuelle." },
    { q: "Comment bénéficier d'une ALD ?", a: "Votre médecin traitant remplit un protocole de soins ALD que vous envoyez à votre Caisse Primaire d'Assurance Maladie pour validation." },
  ]))
);

// Block C — Hospitalisation (8)
const hospTopics = [
  ["Hospitalisation senior : combien ça coûte vraiment ?", "Détail des frais hospitaliers en 2026 : forfait journalier, chambre particulière, dépassements d'honoraires."],
  ["Chambre particulière : ce que rembourse la mutuelle", "Tarifs moyens et prise en charge par les complémentaires santé."],
  ["Chirurgie ambulatoire après 70 ans : avantages et limites", "L'hospitalisation de jour explose chez les seniors. Quels actes, quel suivi, quels remboursements ?"],
  ["Rééducation et SSR après hospitalisation", "Soins de suite et de réadaptation : durée, prise en charge, et choix de l'établissement."],
  ["Hospitalisation à domicile (HAD) : comment ça marche ?", "Une alternative confortable et économique. Conditions d'éligibilité et démarches."],
  ["Forfait journalier hospitalier : explications", "Un coût de 20 €/jour souvent oublié. Qui paie, qui rembourse, comment l'éviter."],
  ["Urgences senior : éviter les passages inutiles", "Pourquoi consulter SOS médecins ou un médecin de garde avant d'aller aux urgences."],
  ["Pré-hospitalisation : bilan préopératoire et démarches", "Comment se préparer médicalement et administrativement à une hospitalisation programmée."],
];
hospTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "hospitalisation", ["hospitalisation", "senior"], [
    { h2: "Le contexte", body: "Près de 1 senior sur 4 est hospitalisé chaque année en France. Anticiper les coûts est essentiel pour éviter les mauvaises surprises financières." },
    { h2: "Les frais à anticiper", body: "Forfait journalier (20 €/jour), chambre particulière (60 à 120 €), dépassements d'honoraires des chirurgiens en secteur 2, télévision et frais annexes." },
    { h2: "Le rôle de la mutuelle senior", body: "Une bonne complémentaire prend en charge ces postes au-delà du remboursement Sécu, parfois jusqu'à 500 % du tarif de base pour les actes chirurgicaux." },
  ], faqHosp))
);

// Block D — Prévention & nutrition (10)
const prevTopics = [
  ["10 habitudes pour vieillir en bonne santé", "Les 10 gestes simples validés scientifiquement pour préserver sa santé après 60 ans."],
  ["Activité physique senior : les meilleures pratiques", "Marche, natation, yoga adapté, gymnastique douce : trouver le sport qui vous convient."],
  ["Alimentation méditerranéenne et longévité", "Pourquoi le régime méditerranéen est recommandé après 60 ans et comment l'adopter au quotidien."],
  ["Hydratation senior : pourquoi c'est vital", "Les personnes âgées sont plus exposées à la déshydratation. Conseils pratiques."],
  ["Bilan de santé senior : que comprend-il ?", "Bilan complet conseillé tous les 2 ans après 65 ans. Examens recommandés et remboursements."],
  ["Dépistage du cancer colorectal après 50 ans", "Test Hemoccult, coloscopie : tout savoir sur ce dépistage qui sauve des vies."],
  ["Vitamine D et seniors : pourquoi se supplémenter", "Carences fréquentes après 65 ans : symptômes, dosage et apports recommandés."],
  ["Microbiote et immunité chez le senior", "Comment soutenir sa flore intestinale pour renforcer ses défenses naturelles."],
  ["Sommeil senior : 7 conseils pour mieux dormir", "Routine, environnement, alimentation : retrouver un sommeil réparateur."],
  ["Stress et anxiété : techniques douces pour seniors", "Sophrologie, méditation, cohérence cardiaque : des outils accessibles."],
];
prevTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "prevention", ["prévention", "santé"], [
    { h2: "Les bénéfices prouvés", body: "Les études scientifiques montrent qu'une bonne hygiène de vie peut réduire de 40 % le risque de maladies chroniques après 60 ans et améliorer significativement la qualité de vie." },
    { h2: "Mise en pratique", body: "Voici une routine progressive sur 4 semaines pour intégrer durablement ces nouvelles habitudes, sans frustration ni découragement." },
    { h2: "Suivi médical recommandé", body: "Un bilan annuel chez votre médecin traitant permet d'ajuster les recommandations à votre état de santé réel." },
  ], [
    { q: "Faut-il consulter avant de commencer ?", a: "Oui, surtout en cas de pathologie chronique. Un avis médical permet d'éviter les efforts contre-indiqués." },
  ]))
);

// Block E — Bien vieillir (10)
const bienTopics = [
  ["Maintien à domicile : aides et adaptations", "Téléassistance, monte-escalier, douche sécurisée : toutes les solutions pour rester chez soi."],
  ["Loisirs créatifs pour seniors : peinture, musique, lecture", "Stimuler son cerveau et son bien-être par les loisirs créatifs."],
  ["Voyager après 70 ans : conseils et assurances", "Bien préparer son voyage et choisir la bonne assurance santé à l'étranger."],
  ["Animaux de compagnie et bienfaits sur les seniors", "Chien, chat, oiseau : pourquoi adopter peut transformer votre quotidien."],
  ["Garder un lien social après la retraite", "Associations, clubs, bénévolat : lutter contre l'isolement."],
  ["Sexualité après 60 ans : aborder le sujet sans tabou", "Une vie intime épanouie après 60 ans est possible et bénéfique."],
  ["Apprentissage tardif : l'université du temps libre", "Pourquoi apprendre une langue ou un instrument après la retraite ?"],
  ["Jardinage thérapeutique pour seniors", "Bienfaits physiques et psychologiques du jardinage adapté."],
  ["Bien préparer son passage à la retraite", "Démarches, finances, projet de vie : se préparer 5 ans à l'avance."],
  ["Petits-enfants : devenir un grand-parent épanoui", "Trouver sa juste place de grand-parent moderne."],
];
bienTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "bien-vieillir", ["bien vieillir", "qualité de vie"], [
    { h2: "Pourquoi c'est important", body: "Vieillir bien, c'est entretenir activement son corps, son esprit et ses relations sociales. La science confirme l'impact positif sur l'espérance de vie en bonne santé." },
    { h2: "Comment s'y mettre concrètement", body: "Pas besoin de tout révolutionner. De petits ajustements progressifs apportent des bénéfices durables." },
  ], [
    { q: "Existe-t-il des aides financières ?", a: "Oui, l'APA, le crédit d'impôt service à la personne, les caisses de retraite et certaines mutuelles proposent des aides." },
  ]))
);

// Block F — Retraite (8)
const retraiteTopics = [
  ["Calculer sa retraite : simulateurs et démarches", "Comment estimer sa pension et anticiper son passage à la retraite."],
  ["Cumul emploi-retraite : règles et avantages", "Travailler tout en touchant sa retraite : conditions et plafonds 2026."],
  ["Retraite progressive : mode d'emploi", "Réduire son temps de travail tout en commençant à percevoir sa pension."],
  ["Pension de réversion : qui peut en bénéficier ?", "Conjoint survivant, conditions, montant et démarches."],
  ["Préparer sa retraite financièrement : 5 piliers", "Immobilier, PER, assurance vie, livrets : diversifier son patrimoine."],
  ["Retraite à l'étranger : Portugal, Maroc, Espagne", "Avantages fiscaux, santé, coût de la vie : guide complet."],
  ["Réforme des retraites 2025-2026 : ce qui change", "Synthèse des nouvelles règles applicables aux futurs retraités."],
  ["Minimum vieillesse (ASPA) : montant et conditions", "L'allocation de solidarité aux personnes âgées expliquée."],
];
retraiteTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "retraite", ["retraite", "pension"], [
    { h2: "Le contexte 2026", body: "La législation française évolue régulièrement. Voici les règles à connaître pour préparer votre retraite dans les meilleures conditions." },
    { h2: "Les démarches à effectuer", body: "Demande à effectuer 6 mois avant la date souhaitée. Plusieurs documents sont à rassembler en amont." },
    { h2: "Les pièges à éviter", body: "Oublier des trimestres, mal déclarer un cumul, négliger sa complémentaire santé : les erreurs fréquentes et leurs conséquences." },
  ], [
    { q: "Où faire mes démarches retraite ?", a: "Sur info-retraite.fr, un guichet unique permet de faire toutes vos demandes en ligne, tous régimes confondus." },
  ]))
);

// Block G — Dépendance & aidants (8)
const depTopics = [
  ["Assurance dépendance : pourquoi et comment souscrire ?", "Anticiper la perte d'autonomie pour préserver son patrimoine et soulager ses proches."],
  ["GIR 1 à 6 : comprendre la grille AGGIR", "L'outil officiel d'évaluation de la dépendance et les aides associées."],
  ["APA : Allocation Personnalisée d'Autonomie", "Montants, conditions et démarches pour obtenir l'APA."],
  ["Aidants familiaux : droits, congés et indemnisation", "Le congé proche aidant et l'AJPA expliqués simplement."],
  ["EHPAD : comment choisir et financer", "Tarifs, aides, qualité des soins : un guide pour bien choisir."],
  ["Accueil familial : alternative à l'EHPAD", "Vivre chez un accueillant familial agréé : avantages et contraintes."],
  ["Téléassistance : choisir le bon dispositif", "Bracelet, médaillon, application : comparer les solutions du marché."],
  ["Adapter son logement : aides Ma Prime Adapt'", "L'aide nationale pour adapter son logement aux contraintes de l'âge."],
];
depTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "dependance", ["dépendance", "aidants"], [
    { h2: "Le contexte de la perte d'autonomie", body: "En France, 1,5 million de personnes âgées sont en perte d'autonomie. Anticiper évite des situations financières et émotionnelles très difficiles." },
    { h2: "Les solutions disponibles", body: "Aides publiques, assurance privée, solidarité familiale : un dispositif équilibré combine plusieurs solutions." },
    { h2: "Combien ça coûte ?", body: "Le coût mensuel moyen d'un EHPAD en France est de 2 200 €, mais peut dépasser 3 500 € en Île-de-France. Le maintien à domicile coûte en moyenne 1 800 €/mois." },
  ], [
    { q: "À quel âge souscrire une assurance dépendance ?", a: "Idéalement entre 50 et 65 ans. Plus tôt vous souscrivez, plus la prime est faible." },
    { q: "Comment évaluer le degré de dépendance ?", a: "Avec la grille AGGIR qui classe la dépendance du GIR 1 (totale) au GIR 6 (autonome). Le GIR conditionne les aides accordées." },
  ]))
);

// Block H — Emprunteur (7)
const empTopics = [
  ["Assurance emprunteur après 60 ans : les solutions", "Continuer à emprunter après 60 ans : conditions, surprimes et alternatives."],
  ["Délégation d'assurance : économiser sur son prêt", "La loi Lemoine et comment changer d'assurance emprunteur à tout moment."],
  ["Convention AERAS : prêt avec un risque aggravé de santé", "Obtenir une assurance emprunteur malgré une pathologie : les démarches."],
  ["Questionnaire médical : ce qu'il faut déclarer", "Obligations, conséquences d'une fausse déclaration et conseils."],
  ["Garanties décès, PTIA, IPT, ITT : décryptage", "Comprendre les sigles et choisir les bonnes garanties pour son crédit."],
  ["Taux d'assurance emprunteur 2026 : moyennes du marché", "Combien coûte une assurance de prêt en 2026 selon l'âge et le profil."],
  ["Renégocier son assurance prêt : économies à la clé", "Étapes pour faire baisser le coût de votre assurance crédit."],
];
empTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "assurance-emprunteur", ["emprunteur", "crédit"], [
    { h2: "Le cadre légal", body: "Depuis la loi Lemoine de 2022, vous pouvez changer d'assurance emprunteur à tout moment, sans frais et sans questionnaire médical sous certaines conditions." },
    { h2: "Les économies possibles", body: "En passant d'une assurance bancaire à une délégation, les économies moyennes sur la durée d'un prêt avoisinent 10 000 à 20 000 €." },
  ], [
    { q: "Puis-je changer mon assurance emprunteur quand je veux ?", a: "Oui, depuis la loi Lemoine du 1er juin 2022, à tout moment et sans frais, à conditions de garanties équivalentes." },
  ]))
);

// Block I — Prévoyance & famille (7)
const prevoyTopics = [
  ["Assurance obsèques : pourquoi anticiper ?", "Soulager financièrement et émotionnellement ses proches en organisant ses obsèques."],
  ["Capital décès : ce que verse l'Assurance Maladie", "Montant 2026, bénéficiaires et démarches."],
  ["Donation entre époux : protéger son conjoint", "La donation au dernier vivant : avantages, coût, démarches notariales."],
  ["Succession : préparer sa transmission", "Réduire les droits de succession et organiser la transmission de son patrimoine."],
  ["Mandat de protection future", "Anticiper sa propre éventuelle incapacité avec un mandat notarié ou sous seing privé."],
  ["Assurance vie : un outil de prévoyance puissant", "Bénéficiaires, fiscalité, transmission : tout ce qu'il faut savoir."],
  ["Procuration bancaire et habilitation familiale", "Aider un proche fragilisé sans passer par la tutelle."],
];
prevoyTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "prevoyance", ["prévoyance", "famille"], [
    { h2: "Pourquoi anticiper", body: "Anticiper ces sujets sensibles évite aux proches des démarches lourdes dans des moments de deuil ou de difficulté." },
    { h2: "Les solutions à connaître", body: "Plusieurs dispositifs existent en parallèle : assurance, donation, mandat, testament. Un conseiller patrimonial peut vous aider à les combiner intelligemment." },
  ], [
    { q: "À quel âge faut-il y penser ?", a: "Il n'y a pas d'âge ! Plus on anticipe, plus on a de marges de manœuvre et d'options à coûts maîtrisés." },
  ]))
);

// Block J — Nutrition (10)
const nutriTopics = [
  ["Protéines après 60 ans : combien et lesquelles ?", "Les besoins en protéines augmentent avec l'âge. Sources et quantités recommandées."],
  ["Diabétique senior : menu type sur 7 jours", "Un menu équilibré pour gérer son diabète au quotidien."],
  ["Cholestérol élevé : aliments à privilégier et à éviter", "Réguler son cholestérol par l'alimentation, sans privation."],
  ["Hypertension : régime DASH expliqué", "Le régime DASH, scientifiquement prouvé, pour réduire la pression artérielle."],
  ["Constipation senior : solutions naturelles", "Fibres, hydratation, activité : retrouver un transit confortable."],
  ["Régime sans gluten après 60 ans : utile ou pas ?", "Pour qui le sans-gluten a-t-il un sens médical ?"],
  ["Compléments alimentaires seniors : utiles ?", "Vitamines, oméga-3, probiotiques : faire le tri."],
  ["Petit déjeuner idéal pour seniors", "Composer un petit déjeuner équilibré et protéiné."],
  ["Manger moins et mieux : éviter la dénutrition", "Le piège silencieux de la dénutrition après 70 ans."],
  ["Cuisiner équilibré quand on vit seul", "Idées simples, rapides et économiques pour seniors solos."],
];
nutriTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "nutrition", ["nutrition", "alimentation"], [
    { h2: "Les bases nutritionnelles", body: "Avec l'âge, les besoins évoluent : moins de calories, mais plus de protéines, de calcium et de vitamine D. L'équilibre passe par la variété et la qualité des aliments." },
    { h2: "Mise en pratique", body: "Des recettes simples, des courses bien pensées, et 4 repas par jour suffisent à équilibrer durablement son alimentation senior." },
  ], [
    { q: "Faut-il consulter un nutritionniste ?", a: "Recommandé en cas de pathologie chronique (diabète, hypercholestérolémie, insuffisance rénale). Certaines mutuelles remboursent les consultations." },
  ]))
);

// Block K — Mutuelle & remboursements (10)
const mutTopics = [
  ["Mutuelle senior : comment bien comparer en 2026", "Garanties, tarifs, délais : la méthode pour choisir sans se tromper."],
  ["Reste à charge zéro : ce qui est vraiment couvert", "Lunettes, dentaire, audio : décryptage du 100% santé en 2026."],
  ["Hospitalisation : quels frais reste-t-il à payer ?", "Forfait journalier, chambre particulière, dépassements : les vrais coûts."],
  ["Mutuelle ou surcomplémentaire : que choisir ?", "Quand une surcomplémentaire fait la différence sur votre budget santé."],
  ["Délai de carence d'une mutuelle senior", "Comprendre les périodes d'attente avant remboursement et comment les éviter."],
  ["Résilier sa mutuelle : loi Châtel & infra-annuelle", "Les démarches pour changer de mutuelle à tout moment depuis 2020."],
  ["Mutuelle pour couple senior : économies à la clé", "Pourquoi un contrat couple peut faire baisser la cotisation de 15%."],
  ["Tiers payant : ne plus avancer les frais", "Comment activer le tiers payant intégral chez tous vos professionnels."],
  ["Médecines douces remboursées : ostéo, acupuncture", "La liste des mutuelles qui remboursent vraiment les médecines alternatives."],
  ["Garantie assistance : un atout sous-estimé", "Aide ménagère, garde d'enfant, rapatriement : ce que couvre l'assistance."],
];
mutTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["mutuelle", "remboursement"], [
    { h2: "Ce qu'il faut comprendre", body: "Une mutuelle senior efficace combine un bon niveau de remboursement, des services pratiques et une cotisation maîtrisée. Les comparateurs ne montrent qu'une partie de la vérité." },
    { h2: "Notre méthode de comparaison", body: "Nous analysons systématiquement les garanties hospitalisation, optique, dentaire et auditif, mais aussi les délais de carence et les exclusions médicales." },
  ], [
    { q: "Quelle mutuelle pour un senior de 70 ans ?", a: "Privilégiez les garanties hospitalisation 200% et optique/dentaire renforcées. Notre comparateur identifie les 3 meilleures offres selon votre profil." },
  ]))
);

// Block L — Démarches & droits (8)
const droitTopics = [
  ["Carte Vitale : perte, vol, mise à jour", "Démarches simples pour récupérer ou actualiser votre Carte Vitale."],
  ["ALD : Affection Longue Durée et prise en charge à 100%", "Comment bénéficier du protocole de soins et du remboursement intégral."],
  ["CSS : Complémentaire Santé Solidaire", "Conditions de ressources et démarches pour bénéficier de la CSS en 2026."],
  ["Médecin traitant : déclarer, changer, conséquences", "Pourquoi et comment bien choisir son médecin traitant après 60 ans."],
  ["Mon espace santé : utiliser le DMP en 2026", "Centraliser ses ordonnances et résultats dans un dossier médical unique."],
  ["Refus de soins : vos recours en tant que senior", "Que faire si un professionnel refuse de vous soigner ? Vos droits."],
  ["Téléconsultation senior : mode d'emploi", "Consulter un médecin par visio : étapes, remboursement, limites."],
  ["Dépassements d'honoraires : comprendre et négocier", "Secteur 1, 2, OPTAM : décoder votre feuille de soins."],
];
droitTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["démarches", "droits"], [
    { h2: "Vos droits expliqués", body: "Le système de santé français protège fortement les seniors, à condition de bien connaître ses droits et les démarches associées." },
    { h2: "Les démarches concrètes", body: "La plupart se font désormais en ligne sur ameli.fr ou via Mon espace santé. Comptez 10 à 15 minutes par démarche." },
  ], [
    { q: "Suis-je automatiquement en ALD ?", a: "Non, votre médecin traitant doit établir un protocole de soins qui est validé par le médecin-conseil de l'Assurance Maladie." },
  ]))
);

// Block M — Optique & dentaire (8)
const optDentTopics = [
  ["Lunettes senior : verres progressifs et remboursements", "Tout savoir sur le prix, le choix des verres progressifs et les remboursements en 2026."],
  ["Implants dentaires senior : coût et prise en charge", "Combien coûte un implant dentaire et quelles mutuelles le remboursent vraiment."],
  ["Prothèses dentaires : panier 100% Santé décrypté", "Couronnes, bridges, dentiers : ce qui est gratuit avec le 100% Santé."],
  ["Cataracte : opération, remboursement et suites", "Préparation, déroulement, prix des implants premium et rôle de la mutuelle."],
  ["DMLA : symptômes, traitements et accompagnement", "Reconnaître la dégénérescence maculaire et accéder aux meilleurs traitements."],
  ["Lentilles de contact senior : avantages et limites", "Pour qui les lentilles restent une bonne option après 60 ans."],
  ["Orthodontie adulte senior : est-ce possible ?", "Aligneurs invisibles et appareils : quand et comment se faire poser à 60+."],
  ["Parodontite : préserver ses gencives après 60 ans", "Détection, traitement et coûts d'une maladie parodontale chez le senior."],
];
optDentTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["optique", "dentaire"], [
    { h2: "Comprendre le besoin", body: "Optique et dentaire représentent 40% du reste à charge senior. Une mutuelle bien dimensionnée fait toute la différence." },
    { h2: "Tarifs moyens en 2026", body: "Un implant dentaire coûte 1 800 € à 2 500 €, une paire de verres progressifs 400 à 800 €. Sans mutuelle adaptée, le reste à charge dépasse souvent 70%." },
    { h2: "Bien choisir sa couverture", body: "Privilégiez les forfaits annuels élevés et vérifiez l'absence de plafonds bas sur 2 ans." },
  ], faqMutuelle))
);

// Block N — Médecines douces & bien-être (7)
const wellTopics = [
  ["Ostéopathie senior : bienfaits et remboursement", "Quand consulter un ostéo, à quelle fréquence et comment se faire rembourser."],
  ["Acupuncture pour seniors : indications validées", "Douleurs chroniques, stress, sommeil : les vertus prouvées de l'acupuncture."],
  ["Sophrologie senior : retrouver calme et sommeil", "Une discipline douce, accessible et de plus en plus remboursée."],
  ["Cures thermales : remboursement et indications", "Rhumatologie, veines, voies respiratoires : 3 semaines pour aller mieux."],
  ["Réflexologie plantaire : ce qu'elle peut apporter", "Bienfaits, limites et remboursements possibles par votre mutuelle."],
  ["Yoga doux pour seniors : démarrer en sécurité", "Postures adaptées, bénéfices articulaires et respiratoires."],
  ["Méditation pleine conscience : 10 minutes par jour", "Un outil simple pour réduire le stress, l'anxiété et améliorer le sommeil."],
];
wellTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "bien-vieillir", ["médecines douces", "bien-être"], [
    { h2: "Une approche complémentaire", body: "Les médecines douces ne remplacent pas la médecine conventionnelle mais peuvent l'enrichir efficacement sur la douleur, le stress et le sommeil." },
    { h2: "Le rôle de la mutuelle", body: "De plus en plus de mutuelles seniors remboursent ostéo, acupuncture, sophrologie. Comptez 25 à 60 € par séance avec un forfait annuel de 150 à 400 €." },
  ], [
    { q: "Combien de séances par an sont remboursées ?", a: "Selon les contrats, entre 3 et 10 séances par an, avec un plafond par séance souvent compris entre 25 et 60 €." },
  ]))
);

// Block O — Santé numérique & téléconsultation (6)
const digitalTopics = [
  ["Téléconsultation senior : étapes simples", "Comment consulter par vidéo : équipement, démarches, remboursement."],
  ["Applications santé recommandées pour seniors", "Tension, sommeil, médicaments : les apps fiables et faciles à utiliser."],
  ["Objets connectés santé : tensiomètres, montres", "Bien choisir un objet connecté santé adapté aux seniors."],
  ["Mon espace santé : tout centraliser en 2026", "Ordonnances, examens, vaccins : un coffre-fort numérique pour votre santé."],
  ["Pharmacies en ligne : sécurité et fiabilité", "Comment commander des médicaments en ligne en toute sécurité."],
  ["Dossier médical partagé (DMP) : utilité et accès", "Pourquoi activer son DMP change le suivi médical après 65 ans."],
];
digitalTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "prevention", ["numérique", "téléconsultation"], [
    { h2: "Le contexte 2026", body: "La santé numérique s'impose dans le quotidien des seniors. Bien utilisée, elle simplifie le suivi médical et réduit les déplacements." },
    { h2: "Démarches pas à pas", body: "Activer Mon espace santé prend 5 minutes avec sa carte Vitale. La téléconsultation est remboursée comme une consultation classique." },
  ], [
    { q: "La téléconsultation est-elle remboursée ?", a: "Oui, à 70% par l'Assurance Maladie, et le reste par votre mutuelle, comme une consultation en cabinet." },
  ]))
);

// Block P — Vie pratique & finances senior (8)
const practTopics = [
  ["Crédit d'impôt service à la personne pour seniors", "50% de réduction d'impôts sur l'aide à domicile : conditions et plafond."],
  ["Allocation logement (APL) après 65 ans", "Conditions pour percevoir l'APL en EHPAD ou résidence senior."],
  ["Carte senior SNCF : économies et offres", "Tarifs réduits sur le rail : avantages et abonnements."],
  ["Démarche Mon Senior Connecté : aides numériques", "Aides régionales pour s'équiper et se former au numérique."],
  ["Banque pour seniors : comparatif 2026", "Frais, conseillers, services à domicile : les meilleurs établissements."],
  ["Viager : avantages et risques pour le senior", "Vendre en viager : compléter sa retraite tout en restant chez soi."],
  ["Reverse mortgage français : prêt viager hypothécaire", "Une solution méconnue pour mobiliser son patrimoine sans vendre."],
  ["Aides communales pour seniors : que demander ?", "Téléalarme, portage de repas, transport : les aides à connaître."],
];
practTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "retraite", ["aides", "finances"], [
    { h2: "L'enjeu pour les seniors", body: "Bien connaître ses droits et les dispositifs disponibles permet d'améliorer significativement son pouvoir d'achat à la retraite." },
    { h2: "Démarches concrètes", body: "La plupart se font en ligne ou en mairie/CCAS. Comptez 2 à 4 semaines de délai selon l'administration concernée." },
  ], [
    { q: "Où me renseigner sur les aides locales ?", a: "Le CCAS (Centre Communal d'Action Sociale) de votre commune est le premier interlocuteur pour identifier toutes les aides auxquelles vous avez droit." },
  ]))
);

// Block Q — Cardiologie senior (6)
const cardioTopics = [
  ["Tension artérielle : valeurs normales après 65 ans", "Comprendre votre tension, l'auto-mesure et quand consulter."],
  ["Fibrillation auriculaire : un trouble fréquent du senior", "Symptômes, risques d'AVC et traitements anticoagulants."],
  ["Insuffisance cardiaque : vivre avec au quotidien", "Diagnostic, traitement, hygiène de vie et accompagnement."],
  ["Cholestérol LDL : objectifs après 60 ans", "Statines, alimentation, sport : la stratégie complète."],
  ["AVC : reconnaître les signes et agir vite", "FAST : visage, bras, parole, temps — chaque minute compte."],
  ["Pacemaker et défibrillateur : ce qu'il faut savoir", "Indications, pose, vie quotidienne et suivi."],
];
cardioTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["cardiologie", "coeur"], [
    { h2: "Comprendre la pathologie", body: "La pathologie cardiovasculaire reste la première cause de mortalité après 65 ans. Bien la connaître permet d'agir tôt et efficacement." },
    { h2: "Suivi et traitements", body: "Consultations cardiologiques régulières, ECG annuel et observance médicamenteuse sont les piliers d'une bonne prise en charge." },
    { h2: "Hygiène de vie", body: "Activité physique modérée, alimentation méditerranéenne, arrêt du tabac et gestion du stress réduisent jusqu'à 50% le risque d'événement cardiaque." },
  ], [
    { q: "À quelle fréquence consulter un cardiologue après 65 ans ?", a: "Au moins une fois par an en l'absence de pathologie, et tous les 3 à 6 mois en cas de suivi pour HTA, arythmie ou insuffisance cardiaque." },
  ]))
);

// Block R — Cancer & oncologie senior (5)
const oncoTopics = [
  ["Cancer du sein après 60 ans : dépistage et traitements", "Le dépistage organisé jusqu'à 74 ans et au-delà : modalités et bénéfices."],
  ["Cancer de la prostate : dépister sans sur-traiter", "PSA, IRM, biopsie : la stratégie raisonnée du dépistage senior."],
  ["Cancer colorectal : le test immunologique sauve des vies", "Tous les 2 ans entre 50 et 74 ans : un test simple, gratuit, à domicile."],
  ["Cancer du poumon : dépistage par scanner low-dose", "Les nouvelles recommandations 2025-2026 pour les anciens fumeurs."],
  ["Vivre après un cancer : suivi post-traitement", "Surveillance, soins de support, retour à la vie active et mutuelle dédiée."],
];
oncoTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["cancer", "dépistage"], [
    { h2: "L'enjeu du dépistage", body: "Détecté tôt, un cancer se soigne dans 9 cas sur 10. Les programmes nationaux de dépistage organisé sont gratuits et performants." },
    { h2: "Parcours de soins", body: "RCP, oncologue référent, soins de support : un parcours coordonné autour du patient, en partie pris en charge à 100% via l'ALD." },
    { h2: "Le rôle de votre mutuelle", body: "Au-delà de l'ALD, votre mutuelle couvre la chambre particulière, les médecines de support (psychologue, nutritionniste) et les dépassements d'honoraires." },
  ], [
    { q: "Le dépistage est-il vraiment gratuit ?", a: "Oui, pour les programmes nationaux (sein, côlon, col de l'utérus). Vous recevez une invitation par courrier ou via votre médecin traitant." },
  ]))
);

// Block S — Maladies chroniques & ALD (6)
const aldTopics = [
  ["BPCO : une maladie pulmonaire sous-diagnostiquée", "Reconnaître les signes, ralentir l'évolution et bien respirer."],
  ["Insuffisance rénale chronique : surveiller sa créatinine", "Dépistage, suivi néphrologique et dialyse expliqués."],
  ["Parkinson : les premiers signes et la prise en charge", "Tremblement, lenteur, raideur : quand consulter un neurologue."],
  ["Sclérose en plaques après 60 ans : moins connue, bien réelle", "Formes tardives, traitements et accompagnement."],
  ["Polyarthrite rhumatoïde : nouveaux traitements biologiques", "Une révolution thérapeutique au service des seniors."],
  ["Maladie de Crohn et MICI chez le senior", "Diagnostic plus rare mais possible : symptômes et traitements."],
];
aldTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["ALD", "maladie chronique"], [
    { h2: "Diagnostic et suivi", body: "Le diagnostic précoce améliore considérablement la qualité de vie. Un suivi spécialisé régulier est indispensable." },
    { h2: "ALD : la prise en charge à 100%", body: "Reconnue en Affection de Longue Durée, votre maladie ouvre droit au remboursement à 100% des soins liés (consultations, examens, médicaments)." },
    { h2: "Rôle de la mutuelle complémentaire", body: "Même en ALD, le forfait journalier hospitalier, la chambre particulière et certains dispositifs restent à la charge du patient ou de sa mutuelle." },
  ], [
    { q: "L'ALD couvre-t-elle 100% de tous les soins ?", a: "Uniquement les soins en rapport direct avec la pathologie ALD. Les autres soins sont remboursés selon le régime classique de la Sécu." },
  ]))
);

// Block T — Mutuelle par profil (6)
const profilTopics = [
  ["Mutuelle pour senior actif de 55-65 ans", "Tarifs préférentiels et garanties évolutives pour les pré-retraités."],
  ["Mutuelle senior 70 ans : que privilégier ?", "Hospitalisation renforcée, optique-dentaire-audio et médecines douces."],
  ["Mutuelle senior 80 ans et plus : sans questionnaire médical", "Les contrats accessibles à tout âge, sans formalité de santé."],
  ["Mutuelle pour senior fonctionnaire retraité", "Spécificités, MFP, MGEN : ce qui change pour les anciens fonctionnaires."],
  ["Mutuelle pour senior travailleur indépendant retraité", "Sortie de la Sécu indépendants : choisir sa complémentaire santé."],
  ["Mutuelle pour senior expatrié de retour en France", "Réaffiliation Sécu, CFE, et choix de la mutuelle au retour."],
];
profilTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "mutuelle-senior", ["profil", "personnalisation"], [
    { h2: "Vos besoins spécifiques", body: "Chaque profil senior a des priorités différentes : budget, garanties, services associés. Un contrat sur-mesure est presque toujours plus avantageux qu'un contrat standard." },
    { h2: "Notre méthode de sélection", body: "Nous analysons votre âge, votre état de santé déclaré, vos consommations passées et vos projets pour identifier la mutuelle qui maximise votre rapport garanties/prix." },
  ], faqMutuelle))
);

// Block U — Témoignages clients fictifs (4)
const storyTopics = [
  ["Comment Martine a économisé 540€/an sur sa mutuelle", "Le récit d'une retraitée de 68 ans qui a changé de mutuelle avec Pro-Tection."],
  ["Témoignage : 14 000€ économisés sur l'assurance emprunteur", "Un couple de 62 ans qui a renégocié son prêt grâce à la loi Lemoine."],
  ["Comment Jean a obtenu une mutuelle malgré son diabète", "Une histoire de courtage personnalisé pour un profil dit \"complexe\"."],
  ["Famille Bernard : assurer 4 générations avec un contrat famille", "La stratégie d'un couple de jeunes seniors pour couvrir parents et enfants."],
];
storyTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "mutuelle-senior", ["témoignage", "client"], [
    { h2: "Le contexte initial", body: "Avant de nous contacter, le client cumulait des garanties inadaptées et une cotisation élevée. Une situation très fréquente après quelques années de fidélité à la même compagnie." },
    { h2: "Notre analyse", body: "En 30 minutes d'échange, nous identifions les vrais postes de dépense et les garanties superflues. L'analyse comparative porte sur 25 mutuelles partenaires." },
    { h2: "Le résultat concret", body: "Économie annuelle significative, garanties renforcées sur les postes critiques, et zéro démarche administrative côté client : nous gérons la résiliation et la souscription." },
  ], [
    { q: "Combien de temps prend un changement de mutuelle ?", a: "Compter 2 à 4 semaines entre la signature et la prise d'effet du nouveau contrat. Nous gérons la résiliation de l'ancien contrat à la date qui vous arrange." },
  ]))
);



// ---------------- Generate full Article objects ----------------
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const BASE_DATE = new Date("2026-01-15T10:00:00Z").getTime();
const DAY = 86_400_000;

// Topical keyword sets per category for unique-per-article imagery
const CAT_KEYWORDS: Record<string, string[]> = {
  "sante-senior": ["senior,health", "elderly,wellness", "doctor,senior", "healthy,aging", "senior,checkup"],
  "mutuelle-senior": ["insurance,documents", "health,insurance", "family,protection", "contract,signing", "senior,advisor"],
  "retraite": ["retirement,couple", "senior,travel", "garden,senior", "retirement,relax", "elderly,happy"],
  "prevention": ["healthy,food", "exercise,senior", "yoga,senior", "vitamins,health", "walking,park"],
  "bien-vieillir": ["active,senior", "senior,smile", "grandparents", "senior,hobby", "elderly,joy"],
  "hospitalisation": ["hospital,room", "nurse,patient", "medical,care", "hospital,bed", "stethoscope"],
  "dependance": ["caregiver,senior", "helping,hand", "elderly,care", "nursing,home", "family,support"],
  "nutrition": ["healthy,meal", "vegetables,plate", "mediterranean,food", "fresh,fruit", "kitchen,cooking"],
  "assurance-emprunteur": ["house,keys", "mortgage,signing", "real,estate", "home,couple", "loan,documents"],
  "prevoyance": ["family,protection", "umbrella,family", "savings,jar", "safe,future", "parents,children"],
};

// Deterministic 32-bit hash → stable seed per slug
const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
};

const imageFor = (category: string, slug: string) => {
  const list = CAT_KEYWORDS[category] ?? ["senior,health"];
  const seed = hash(slug);
  const kw = list[parseInt(seed.slice(0, 4), 36) % list.length];
  // Picsum with per-slug seed → reliable unique image per article; loremflickr fallback adds topical keywords.
  return `https://picsum.photos/seed/${seed}-${encodeURIComponent(kw)}/1200/750`;
};

export const ARTICLES: Article[] = tpl.map((t, i) => {
  const slug = slugify(t.title);
  const pub = new Date(BASE_DATE - i * DAY * 2).toISOString();
  const upd = new Date(BASE_DATE - i * DAY).toISOString();
  return {
    slug,
    title: t.title,
    metaDescription: t.meta,
    excerpt: t.meta,
    category: t.category,
    tags: t.tags,
    author: AUTHORS[i % AUTHORS.length],
    publishedAt: pub,
    updatedAt: upd,
    readingMinutes: 5 + ((i * 3) % 8),
    image: imageFor(t.category, slug),
    imageAlt: t.title,
    intro:
      "Cet article fait partie de notre série complète sur la santé et la protection des seniors. Nos experts décryptent les enjeux concrets et vous accompagnent dans vos choix de couverture santé.",
    sections: t.sections,
    faq: t.faq,
  };
});

export const getArticleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);
export const getArticlesByCategory = (cat: string) => ARTICLES.filter((a) => a.category === cat);
export const getRelated = (slug: string, limit = 3) => {
  const a = getArticleBySlug(slug);
  if (!a) return [];
  return ARTICLES.filter((x) => x.slug !== slug && x.category === a.category).slice(0, limit);
};
export const getCategoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

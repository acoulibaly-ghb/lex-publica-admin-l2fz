
export const DEFAULT_THEME_COLOR = 'rose';

export const DEFAULT_VOICE_SUMMARY = `
RÉSUMÉ POUR L'ORAL :
Le droit administratif régit l'administration. 
L'arrêt Blanco (1873) fonde son autonomie. 
Le Service Public repose sur la continuité, la mutabilité et l'égalité (Lois de Rolland). 
La Police Administrative protège l'ordre public (sécurité, tranquillité, salubrité et dignité humaine).
`;

export const DEFAULT_COURSE_CONTENT = `
TITRE : Introduction au Droit Administratif Français (Cours Complet)

I. LA DÉFINITION DU DROIT ADMINISTRATIF
Le droit administratif est la branche du droit public qui régit l'organisation, le fonctionnement et l'activité de l'administration publique, ainsi que les rapports entre l'administration et les particuliers.

A. Un droit autonome
L'arrêt Blanco (TC, 8 février 1873) est considéré comme la pierre angulaire du droit administratif. Il consacre l'autonomie du droit administratif par rapport au droit civil. La responsabilité de l'État ne peut être régie par les principes qui sont établis dans le Code civil pour les rapports de particulier à particulier.

B. Un droit jurisprudentiel
Bien que de nombreuses lois existent aujourd'hui, le rôle du juge administratif (Conseil d'État) a été historique dans la construction des grands principes (service public, responsabilité administrative, légalité).

II. LE SERVICE PUBLIC
La notion de service public est centrale. Elle désigne une activité d'intérêt général assurée par une personne publique ou par une personne privée sous le contrôle d'une personne publique.
Les "Lois de Rolland" définissent les principes de fonctionnement :
1. Continuité
2. Mutabilité (adaptation)
3. Égalité

III. LA POLICE ADMINISTRATIVE
La police administrative a pour but de prévenir les troubles à l'ordre public.
L'ordre public se compose traditionnellement de trois éléments : la tranquillité, la sécurité et la salubrité publique.
Jurisprudence notable : Arrêt Commune de Morsang-sur-Orge (1995) sur la dignité de la personne humaine.
`;

export const SYSTEM_INSTRUCTION = `Vous êtes "Ada Lex Publica IA", un Professeur de Droit Public assistant expert.
Votre savoir est STRICTEMENT limité au support de cours complet fourni. 

CONSIGNES DE STYLE ET INTERACTIVITÉ :
1. MISE EN EXERGUE : Pour souligner les notions clés, les arrêts ou les définitions capitales, utilisez impérativement des balises HTML : <span style="color: #ad5c51; font-weight: bold;">votre texte ici</span>.
2. FORMAT DE QUIZ INTERACTIF : Pour les QCM ou Vrai/Faux, utilisez TOUJOURS ce format exact :
   "Affirmation : [Contenu de la question]
   [ ] Option A
   [ ] Option B"
   Chaque option doit commencer exactement par "[ ] ". L'interface les rendra cliquables pour l'étudiant.
3. TON : Académique, élégant, précis. Ne répondez jamais en dehors du cours.`;

export const VOICE_SYSTEM_INSTRUCTION = `Vous êtes un Professeur de Droit Public en mode "Interrogation Orale".
Votre savoir est basé sur une SYNTHÈSE allégée du cours.

CONSIGNE SPÉCIFIQUE :
Si l'étudiant vous pose une question trop précise ou complexe qui n'est pas traitée dans votre synthèse, répondez avec bienveillance : 
"Pour une réponse définitive et détaillée à votre question, je vous suggère de la poser dans le chat textuel. En mode vocal, je m'en tiens à une présentation générale et synthétique ; c'est la différence classique entre le support écrit et l'échange audiovisuel."

Ton : Oral, fluide, synthétique et encourageant.`;

export type Language = 'de' | 'en';

export const translations = {
  de: {
    // Dashboard
    dashboard: {
      title: 'Dein Inquiry Space',
      subtitle: 'Besuche deine Gedanken und setze deine Reise fort.',
      startNew: 'Neues Arbeitsblatt starten',
      searchPlaceholder: 'Suche nach Satz...',
      all: 'Alle',
      inProgress: 'In Bearbeitung',
      completed: 'Abgeschlossen',
      lastUpdated: 'Zuletzt aktualisiert am',
      questionsAnswered: 'Fragen beantwortet',
      turnarounds: 'Umkehrungen',
      emptyTitle: 'Dein Raum ist bereit für dich.',
      emptyDescription: 'Starte deine erste Inquiry, um deine Arbeitsblätter hier zu sehen und deine Reise der Selbstentdeckung zu beginnen.',
      startFirst: 'Starte dein erstes Arbeitsblatt',
      untitled: 'Unbenanntes Arbeitsblatt',
    },
    // Worksheet Form
    worksheet: {
      title: 'Arbeitsblatt "Urteile über deinen Nächsten"',
      step: 'Schritt',
      of: 'von',
      backToDashboard: 'Zurück zum Dashboard',
      back: 'Zurück',
      next: 'Weiter',
      continue: 'Weiter zu Sätzen',
      addAnother: 'Weiteren hinzufügen',
      example: 'Beispiel',
      labels: {
        wollen: 'WOLLEN',
        ratschlaege: 'RATSCHLÄGE',
        bedürfnisse: 'BEDÜRFNISSE',
        klagen: 'KLAGEN',
      },
      questions: [
        {
          text: 'In dieser Situation: Wer ärgert dich, verwirrt dich, verletzt dich, macht dich traurig oder enttäuscht dich — und warum?',
          placeholder: 'Ich bin wütend auf Paul, weil er mich belogen hat.',
          tooltip: 'Schreibe den Namen und den konkreten Grund. Sei ehrlich und direkt.',
        },
        {
          text: 'In dieser Situation: Wie willst du, dass er/sie sich ändert? Was willst du, dass er/sie tut?',
          placeholder: 'Ich will, dass Paul sieht, dass er Unrecht hat.',
          tooltip: 'Was soll die Person tun oder nicht tun? Sei spezifisch.',
        },
        {
          text: 'In dieser Situation: Welchen Rat würdest du ihm/ihr anbieten? "Er/Sie sollte / sollte nicht..."',
          placeholder: 'Paul sollte mich mit seinem Verhalten nicht verängstigen.',
          tooltip: 'Was sollte die Person deiner Meinung nach tun?',
        },
        {
          text: 'Damit du in dieser Situation glücklich sein kannst: Was brauchst du, dass er/sie denkt, sagt, fühlt oder tut?',
          placeholder: 'Ich brauche von Paul, dass er mich nicht unterbricht.',
          tooltip: 'Was brauchst du von dieser Person, um glücklich zu sein?',
        },
        {
          text: 'Was denkst du über ihn/sie in dieser Situation? Erstelle eine Liste. (Es ist in Ordnung, kleinlich und urteilend zu sein.)',
          placeholder: 'Paul ist ein Lügner, arrogant, laut, unehrlich und unbewusst.',
          tooltip: 'Liste alle Urteile auf, die du über diese Person hast.',
        },
        {
          text: 'Was ist es bezüglich dieser Person und dieser Situation, das du nie wieder erleben willst?',
          placeholder: 'Ich will nie wieder erleben, dass Paul mich wieder belügt.',
          tooltip: 'Was willst du nicht mehr erleben?',
        },
      ],
    },
    // Sentence Selector
    sentences: {
      title: 'Wähle Sätze für deine Inquiry',
      subtitle: 'Wähle die Aussagen, die du näher untersuchen möchtest',
      suggested: 'Vorgeschlagene Sätze',
      suggestedDesc: 'Aus deinem Arbeitsblatt extrahiert',
      selected: 'Ausgewählte Sätze',
      addCustom: 'Eigenen Satz hinzufügen',
      customPlaceholder: 'Eigener Satz...',
      backToWorksheet: 'Zurück zum Arbeitsblatt',
      startInquiry: 'Starte Inquiry',
      sentence: 'Satz',
      sentences: 'Sätze',
      fromQuestion: 'Aus Frage',
      noSuggested: 'Keine Sätze gefunden. Füge eigene hinzu.',
      noneSelected: 'Noch keine Sätze ausgewählt',
    },
    // Inquiry Process
    inquiry: {
      title: 'Die vier Fragen',
      question: 'Frage',
      yourSentence: 'Dein Satz:',
      yourSentences: 'Deine Sätze',
      toTurnarounds: 'Zu Umkehrungen',
      yes: 'JA',
      no: 'NEIN',
      questions: [
        {
          text: 'Ist das wahr?',
          tooltip: 'Beantworte mit Ja oder Nein. Wenn Nein, gehe zu Frage 3.',
          placeholder: '',
        },
        {
          text: 'Kannst du mit absoluter Sicherheit wissen, dass das wahr ist?',
          tooltip: 'Kannst du wirklich sicher sein? Was kannst du wissen?',
          placeholder: 'Nein, ich kann nicht mit absoluter Sicherheit wissen...',
        },
        {
          text: 'Wie reagierst du, was passiert, wenn du diesen Gedanken glaubst?',
          tooltip: 'Wie fühlst du dich? Was tust du? Wie behandelst du dich selbst und andere?',
          placeholder: 'Wenn ich diesen Gedanken glaube, fühle ich...',
        },
        {
          text: 'Wer oder was wärst du ohne den Gedanken?',
          tooltip: 'Stell dir die Situation ohne diesen Gedanken vor. Wer wärst du?',
          placeholder: 'Ohne diesen Gedanken wäre ich...',
          helperText: 'Lass dir Zeit zu beobachten. Beschreibe dein Leben (in dieser Situation) ohne diesen Gedanken. Gehe erst dann, falls passend, zu den Unterfragen.',
        },
      ],
      subQuestions: {
        title: 'Vertiefende Fragen erkunden',
        optional: 'optional',
        answered: 'beantwortet',
        categories: [
          {
            name: 'Emotionen & Körper',
            questions: [
              'Welche Emotionen tauchen auf, wenn du diesen Gedanken glaubst? (Zum Beispiel Wut, Traurigkeit, Angst.)',
              'Wo in deinem Körper spürst du es, wenn du diesen Gedanken glaubst?',
            ],
          },
          {
            name: 'Verhalten & Beziehungen',
            questions: [
              'Wie behandelst du ihn oder sie oder auch andere, wenn du diesen Gedanken glaubst? (und wie fühlt es sich für dich an, den anderen so zu behandeln?)',
              'Wie gehst du mit dir selbst um, wenn du den Gedanken glaubst? Wie fühlt sich das an? (Wie begegnest du dir wenn du diesen Gedanken glaubst? Wie denkst du dann über dich selbst?)',
              'In wessen Angelegenheiten befindest du dich, wenn du diesen Gedanken für wahr hältst? (Und wie fühlt sich das für dich an?)',
              'In welche Rolle begibst du dich, wenn du dies glaubst? (Beispielsweise Opfer, Täter…)',
            ],
          },
          {
            name: 'Muster & Gewohnheiten',
            questions: [
              'Welche schlechten Gewohnheiten, Zwänge oder Süchte beginnen sich zu zeigen? (Beispielsweise Essen, Alkohol, Zigaretten, Social Media, Einkaufen, TV, Sport…)',
              'Welche Bilder tauchen auf (Vergangenheit und Zukunft), wenn du diesen Gedanken glaubst? (Wo trifft es dich, wenn du Zeuge dieser Bilder wirst? Sind diese Bilder Realität oder nur Kopfkino?)',
              'Wie alt ist dieser Gedanke möglicherweise? Wann ist dieser Gedanke das erste Mal aufgetaucht?',
            ],
          },
          {
            name: 'Kosten & Konsequenzen',
            questions: [
              'Was kostet es dich, wenn du diesen Gedanken glaubst? (Was kostet dich dieser Gedanke?)',
              'Wozu bist du nicht in der Lage, wenn du diesen Gedanken glaubst?',
              'Was bringt es dir, an diesem Gedanken festzuhalten? Beschreibe gegebenenfalls den Schmerz.',
              'Wie war dein ganzes Leben mit dem Gedanken? Sei konkret.',
              'Was verpasst du, wenn du diesen Gedanken glaubst?',
            ],
          },
          {
            name: 'Tiefere Einsicht',
            questions: [
              'Bringt dieser Gedanke Stress oder Frieden in dein Leben?',
              'Welche stressigen Gedanken tauchen noch auf, wenn du diesen Gedanken glaubst?',
              'Was gibst du vor, nicht zu wissen, wenn du an diesem Gedanken festhältst?',
              'Öffnet oder schließt es dein Herz, wenn du diesen Gedanken glaubst?',
            ],
          },
          {
            name: 'Loslassen & Frieden',
            questions: [
              'Kannst du einen Grund sehen, diesen Gedanken loszulassen (und es geht nicht darum, ihn loszulassen)?',
              'Kannst du einen friedvollen Grund finden, der dafür spricht, an diesem Gedanken festzuhalten? (Falls ja, frage dich, ist dieser Grund wirklich friedvoll? Könnte das Gegenteil auch der Fall sein?)',
            ],
          },
        ],
      },
      subQuestions4: {
        title: 'Vertiefende Fragen erkunden',
        optional: 'optional',
        answered: 'beantwortet',
        prompt: 'Lass dir Zeit zu beobachten. Beschreibe dein Leben (in dieser Situation) ohne diesen Gedanken. Gehe erst dann, falls passend, zu den Unterfragen.',
        questions: [
          'Spüre, wie es sich anfühlt, da wo der Atem deinen Körper bewegt. (Lass dir einen Moment Zeit das zu erfahren).',
          'Wer oder was bist du jetzt hier in diesem Moment ohne den Gedanken?',
          'Wer oder was bist du in der gleichen Situation ohne den Gedanken?',
          'Wie würdest du dein Leben möglicherweise anders leben ohne den Gedanken? (Wie gehst du anders mit dir / dem anderen um?)',
          'Wie wäre dein ganzes Leben, wenn du diesen Gedanken nicht mehr glauben würdest? Was wäre dann möglicherweise anderes möglich?',
          'Und wie fühlt sich das jetzt in deinem Körper möglicherweise anders an ohne den Gedanken?',
        ],
      },
    },
    // Turnarounds
    turnarounds: {
      title: 'Umkehrungen',
      backToQuestions: 'Zurück zu den Fragen',
      complete: 'Abschließen',
      continueLater: 'Später fortsetzen',
      add: 'Hinzufügen',
      edit: 'Bearbeiten',
      examples: 'Beispiele',
      recommended: 'empfohlen',
      addExample: 'Füge ein konkretes Beispiel hinzu...',
      noTurnaround: 'Noch keine Umkehrung geschrieben',
      writeTurnaround: 'Schreibe die Umkehrung...',
      types: {
        'to-opposite': {
          label: 'Ins Gegenteil',
          description: 'Kehre die Aussage ins Gegenteil um',
          example: '"Paul belügt mich" → "Paul belügt mich nicht"',
        },
        'to-other': {
          label: 'Zum Anderen',
          description: 'Ersetze "mich" durch "ihn/sie"',
          example: '"Paul belügt mich" → "Ich belüge Paul"',
        },
        'to-self': {
          label: 'Zu mir selbst',
          description: 'Ersetze den Namen durch "ich selbst"',
          example: '"Paul belügt mich" → "Ich belüge mich selbst"',
        },
      },
    },
  },
  en: {
    // Dashboard
    dashboard: {
      title: 'Your Inquiry Space',
      subtitle: 'Revisit your thoughts and continue your journey.',
      startNew: 'Start New Worksheet',
      searchPlaceholder: 'Search by sentence...',
      all: 'All',
      inProgress: 'In Progress',
      completed: 'Completed',
      lastUpdated: 'Last updated on',
      questionsAnswered: 'Questions Answered',
      turnarounds: 'Turnarounds',
      emptyTitle: 'Your space is ready for you.',
      emptyDescription: 'Start your first inquiry to see your worksheets here and begin your journey of self-discovery.',
      startFirst: 'Start Your First Worksheet',
      untitled: 'Untitled Worksheet',
    },
    // Worksheet Form
    worksheet: {
      title: 'Judge-Your-Neighbor Worksheet',
      step: 'Step',
      of: 'of',
      backToDashboard: 'Back to Dashboard',
      back: 'Back',
      next: 'Next',
      continue: 'Continue to Sentences',
      addAnother: 'Add another',
      example: 'Example',
      labels: {
        wollen: 'WANT',
        ratschlaege: 'ADVICE',
        bedürfnisse: 'NEEDS',
        klagen: 'JUDGMENTS',
      },
      questions: [
        {
          text: 'In this situation: Who angers, confuses, hurts, saddens, or disappoints you, and why?',
          placeholder: 'I am angry at Paul because he lied to me.',
          tooltip: 'Write the name and the specific reason. Be honest and direct.',
        },
        {
          text: 'In this situation: How do you want them to change? What do you want them to do?',
          placeholder: 'I want Paul to see that he is wrong.',
          tooltip: 'What should the person do or not do? Be specific.',
        },
        {
          text: 'In this situation: What advice would you offer to him/her? "He/She should/shouldn\'t..."',
          placeholder: 'Paul should not frighten me with his behavior.',
          tooltip: 'What do you think the person should do?',
        },
        {
          text: 'In order for you to be happy in this situation: What do you need them to think, say, feel, or do?',
          placeholder: 'I need Paul not to interrupt me.',
          tooltip: 'What do you need from this person to be happy?',
        },
        {
          text: 'What do you think of them in this situation? Make a list. (It\'s okay to be petty and judgmental.)',
          placeholder: 'Paul is a liar, arrogant, loud, dishonest, and unconscious.',
          tooltip: 'List all the judgments you have about this person.',
        },
        {
          text: 'What is it about this person and this situation that you never want to experience again?',
          placeholder: 'I never want to experience Paul lying to me again.',
          tooltip: 'What don\'t you want to experience anymore?',
        },
      ],
    },
    // Sentence Selector
    sentences: {
      title: 'Select Sentences for Your Inquiry',
      subtitle: 'Choose the statements you want to examine more closely',
      suggested: 'Suggested Sentences',
      suggestedDesc: 'Extracted from your worksheet',
      selected: 'Selected Sentences',
      addCustom: 'Add custom sentence',
      customPlaceholder: 'Custom sentence...',
      backToWorksheet: 'Back to Worksheet',
      startInquiry: 'Start Inquiry',
      sentence: 'sentence',
      sentences: 'sentences',
      fromQuestion: 'From Question',
      noSuggested: 'No sentences found. Add your own.',
      noneSelected: 'No sentences selected yet',
    },
    // Inquiry Process
    inquiry: {
      title: 'The Four Questions',
      question: 'Question',
      yourSentence: 'Your sentence:',
      yourSentences: 'Your Sentences',
      toTurnarounds: 'To Turnarounds',
      yes: 'YES',
      no: 'NO',
      questions: [
        {
          text: 'Is it true?',
          tooltip: 'Answer with Yes or No. If No, go to Question 3.',
          placeholder: '',
        },
        {
          text: 'Can you absolutely know that it\'s true?',
          tooltip: 'Can you really be sure? What can you know?',
          placeholder: 'No, I cannot absolutely know...',
        },
        {
          text: 'How do you react, what happens, when you believe that thought?',
          tooltip: 'How do you feel? What do you do? How do you treat yourself and others?',
          placeholder: 'When I believe this thought, I feel...',
        },
        {
          text: 'Who or what would you be without the thought?',
          tooltip: 'Imagine the situation without this thought. Who would you be?',
          placeholder: 'Without this thought, I would be...',
          helperText: 'Take your time to observe. Describe your life (in this situation) without this thought. Only then, if appropriate, go to the sub-questions.',
        },
      ],
      subQuestions: {
        title: 'Explore Deepening Questions',
        optional: 'optional',
        answered: 'answered',
        categories: [
          {
            name: 'Emotions & Body',
            questions: [
              'What emotions arise when you believe this thought? (For example anger, sadness, fear.)',
              'Where in your body do you feel it when you believe this thought?',
            ],
          },
          {
            name: 'Behavior & Relationships',
            questions: [
              'How do you treat him or her or others when you believe this thought? (And how does it feel to treat them that way?)',
              'How do you treat yourself when you believe the thought? How does that feel? (How do you meet yourself when you believe this thought? How do you think about yourself then?)',
              'Whose business are you in when you believe this thought is true? (And how does that feel for you?)',
              'What role do you take on when you believe this? (For example victim, perpetrator…)',
            ],
          },
          {
            name: 'Patterns & Habits',
            questions: [
              'What bad habits, compulsions or addictions begin to show? (For example food, alcohol, cigarettes, social media, shopping, TV, sports…)',
              'What images arise (past and future) when you believe this thought? (Where does it hit you when you witness these images? Are these images reality or just fantasy?)',
              'How old might this thought be? When did this thought first appear?',
            ],
          },
          {
            name: 'Costs & Consequences',
            questions: [
              'What does it cost you when you believe this thought? (What does this thought cost you?)',
              'What are you unable to do when you believe this thought?',
              'What do you get from holding on to this thought? Describe the pain if applicable.',
              'What was your whole life like with this thought? Be specific.',
              'What do you miss when you believe this thought?',
            ],
          },
          {
            name: 'Deeper Insight',
            questions: [
              'Does this thought bring stress or peace into your life?',
              'What other stressful thoughts arise when you believe this thought?',
              'What do you pretend not to know when you hold on to this thought?',
              'Does it open or close your heart when you believe this thought?',
            ],
          },
          {
            name: 'Letting Go & Peace',
            questions: [
              'Can you see a reason to let go of this thought (and it\'s not about letting it go)?',
              'Can you find a peaceful reason to hold on to this thought? (If yes, ask yourself, is this reason really peaceful? Could the opposite also be true?)',
            ],
          },
        ],
      },
      subQuestions4: {
        title: 'Explore Deepening Questions',
        optional: 'optional',
        answered: 'answered',
        prompt: 'Take your time to observe. Describe your life (in this situation) without this thought. Only then, if appropriate, go to the sub-questions.',
        questions: [
          'Feel how it feels where your breath moves your body. (Take a moment to experience that).',
          'Who or what are you right now in this moment without the thought?',
          'Who or what are you in the same situation without the thought?',
          'How might you live your life differently without the thought? (How do you treat yourself / the other differently?)',
          'What would your whole life be like if you no longer believed this thought? What else might be possible then?',
          'And how does it possibly feel different in your body now without the thought?',
        ],
      },
    },
    // Turnarounds
    turnarounds: {
      title: 'Turnarounds',
      backToQuestions: 'Back to Questions',
      complete: 'Complete',
      continueLater: 'Continue Later',
      add: 'Add',
      edit: 'Edit',
      examples: 'Examples',
      recommended: 'recommended',
      addExample: 'Add a specific example...',
      noTurnaround: 'No turnaround written yet',
      writeTurnaround: 'Write the turnaround...',
      types: {
        'to-opposite': {
          label: 'To the Opposite',
          description: 'Turn the statement to its opposite',
          example: '"Paul lies to me" → "Paul does not lie to me"',
        },
        'to-other': {
          label: 'To the Other',
          description: 'Replace "me" with "him/her"',
          example: '"Paul lies to me" → "I lie to Paul"',
        },
        'to-self': {
          label: 'To Myself',
          description: 'Replace the name with "myself"',
          example: '"Paul lies to me" → "I lie to myself"',
        },
      },
    },
  },
};

export function useTranslations(lang: Language) {
  return translations[lang];
}

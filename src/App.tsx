import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import originalQuestions from './otazky.json';

// Farby pre okruhy
const categoryStyles = {
  biomedZaklad: '#007BFF',      // Modrá
  bioinformatika: '#28a745',    // Zelená
  zpracovaniSignalu: '#ff9800', // Oranžová
  biomedTechnika: '#9c27b0'     // Fialová
};

function Home({ addFeedback }) {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [categoryKey, setCategoryKey] = useState('');
  const [remaining, setRemaining] = useState({
    biomedZaklad: [...originalQuestions.biomedZaklad],
    bioinformatika: [...originalQuestions.bioinformatika],
    zpracovaniSignalu: [...originalQuestions.zpracovaniSignalu],
    biomedTechnika: [...originalQuestions.biomedTechnika]
  });
  const [note, setNote] = useState('');

  const getRandomQuestion = (key, name) => {
    let pool = [...remaining[key]];
    if (pool.length === 0) pool = [...originalQuestions[key]];

    const randomIndex = Math.floor(Math.random() * pool.length);
    const selected = pool[randomIndex];
    pool.splice(randomIndex, 1);

    setQuestion(selected);
    setCategory(name);
    setCategoryKey(key);
    setRemaining(prev => ({ ...prev, [key]: pool }));
    setNote('');
  };

  const handleFeedback = (rating) => {
    if (!question) return;
    addFeedback({
      question,
      category,
      categoryKey,
      rating, // "ok", "needsWork", "noClue"
      note
    });
    // Po hodnotení vyčisti otázku (alebo nechaj podľa potreby)
    setQuestion('');
    setCategory('');
    setCategoryKey('');
    setNote('');
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f0f2f5'
    }}>
      <header style={{
        backgroundColor: '#282c34',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        🎓 Generátor štátnicových otázok
      </header>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '40px', marginBottom: '10px', color: 'black' }}>
          Ahoj, Hanči! 👋
        </p>
        <p style={{ fontSize: '20px', marginBottom: '10px', color: 'black' }}>
          Vyber si tematický okruh a nechaj sa prekvapiť!
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
          <button onClick={() => getRandomQuestion('biomedZaklad', 'Biomedicínský základ')}
            style={{ backgroundColor: categoryStyles.biomedZaklad, color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer' }}>
            Biomedicínský základ
          </button>
          <button onClick={() => getRandomQuestion('bioinformatika', 'Bioinformatika')}
            style={{ backgroundColor: categoryStyles.bioinformatika, color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer' }}>
            Bioinformatika
          </button>
          <button onClick={() => getRandomQuestion('zpracovaniSignalu', 'Zpracování signálů a dat')}
            style={{ backgroundColor: categoryStyles.zpracovaniSignalu, color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer' }}>
            Zpracování signálů a dat
          </button>
          <button onClick={() => getRandomQuestion('biomedTechnika', 'Biomedicínská technika')}
            style={{ backgroundColor: categoryStyles.biomedTechnika, color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer' }}>
            Biomedicínská technika
          </button>
        </div>

        {question && (
          <div style={{
            marginTop: '60px',
            maxWidth: '1300px',
            border: `4px solid ${categoryStyles[categoryKey]}`,
            borderRadius: '12px',
            padding: '30px',
            backgroundColor: 'white',
            boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '18px', color: '#666', marginBottom: '10px' }}>
              Okruh: <strong>{category}</strong>
            </div>
            <div style={{
              fontSize: '48px',
              fontWeight: 'bold',
              lineHeight: '1.5',
              color: '#333'
            }}>
              {question}
            </div>

            <textarea
              placeholder="Poznámka (čo treba doučiť, prípadne detaily)..."
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                marginTop: 20,
                padding: 10,
                borderRadius: 8,
                border: '1px solid #ccc',
                fontSize: 16,
                fontFamily: 'Arial, sans-serif',
                resize: 'vertical',
                backgroundColor: '#f9f9f9',
                color: '#333'
              }}
            />

            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <button
                onClick={() => handleFeedback('ok')}
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Vedela OK
              </button>

              <button
                onClick={() => handleFeedback('needsWork')}
                style={{
                  backgroundColor: 'orange',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Ešte treba doučiť detaily
              </button>

              <button
                onClick={() => handleFeedback('noClue')}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Vôbec nevedela
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: 40 }}>
          <Link to="/stats" style={{ color: '#282c34', fontWeight: 'bold', fontSize: 18 }}>
            📊 Zobraziť štatistiku
          </Link>
        </div>
      </div>
    </div>
  );
}

function Stats({ feedbacks }) {
  const ratingColors = {
    ok: '#007BFF',
    needsWork: '#ff9800',
    noClue: '#9c27b0'
  };

  // Jemné pastelové pozadia podľa hodnotenia
  const ratingBackgrounds = {
    ok: '#d4edda',        // svetlozelená
    needsWork: '#fff3cd', // svetlooranžová
    noClue: '#f8d7da'     // svetloružovo-červená
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f0f2f5',
      padding: '0px 20px',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }}>
      <header style={{
        backgroundColor: '#282c34',
        color: 'white',
        padding: '20px',
        width: '100%',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: 30
      }}>
        📊 Štatistika hodnotení
      </header>

      <Link to="/" style={{ marginBottom: 30, fontWeight: 'bold', fontSize: 18, color: '#282c34' }}>
        ← Späť na generátor
      </Link>

      {feedbacks.length === 0 && (
        <p style={{ fontSize: 18, color: '#666' }}>Žiadne hodnotenia zatiaľ neboli pridané.</p>
      )}

      <div style={{
        width: '100%',
        maxWidth: 1500,
        display: 'flex',
        flexDirection: 'column',
        gap: 20
      }}>
        {feedbacks.map(({ question, rating, note, category }, i) => (
          <div key={i} style={{
            border: `4px solid ${ratingColors[rating]}`,
            borderRadius: '12px',
            padding: '15px',
            backgroundColor: ratingBackgrounds[rating],
            boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
            textAlign: 'left'
          }}>
            <div style={{ fontSize: '18px', color: '#666', marginBottom: 10 }}>
              Okruh: <strong>{category}</strong>
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: ratingColors[rating]
            }}>
              {question}
            </div>
            <div style={{ marginTop: 10, fontWeight: 'bold', color: ratingColors[rating], fontSize: '20px' }}>
              {rating === 'ok' && 'Vedela OK ✅'}
              {rating === 'needsWork' && 'Ešte sa treba doučiť detaily ⚠️'}
              {rating === 'noClue' && 'Vôbec nevedela ❌'}
            </div>
            {note && (
              <p style={{ marginTop: 15, fontSize: 16, fontStyle: 'italic', color: '#444' }}>
                Poznámka: {note}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  const addFeedback = (fb) => {
    setFeedbacks(prev => [...prev, fb]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home addFeedback={addFeedback} />} />
        <Route path="/stats" element={<Stats feedbacks={feedbacks} />} />
      </Routes>
    </Router>
  );
}

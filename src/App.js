import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1 class="titleHeader">Messagerie Kwick</h1>
        <nav class="navMenu">
          <ul class="navLinks">
            <li id="accueil"><a href="#">Accueil</a></li>
            <li><a href="index.html#sectionKlee" title="Accéder à la section Paul Klee">Paul Klee</a></li>
            <li><a href="index.html#sectionVanGogh" title="Accéder à la section Vincent Van Goghe">Vincent Van
                    Gogh</a></li>
            <li><a href="index.html#sectionJoanMiro" title="Accéder à la section Joan Miró">Joan Miró</a></li>
            <li><a href="index.html#sectionSalvador" title="Accéder à la section Salvador Dalí">Salvador Dalí</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <aside>
          <section>
            <h4>Personnes connectées</h4>
            <ul class="connectesList">
              <li>
                <a href="#">
                  <p class="textPuce">Bertrand Bonello, Résonance - Musée d'art Contemporain (Marseille)</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <p class="textPuce">ArtWork - Manufacture 111 (Paris)</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <p class="textPuce">Loupot, peintres d'affiches - Musée de l'Imprimerie (Lyon)</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <p class="textPuce">Charles Gleyre - Musée d'Orsay (Paris)</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <p class="textPuce">Henry Vasnier - Musée des Beaux-Arts (Reims)</p>
                </a>
              </li>
            </ul>
          </section>
        </aside>
        <section class="sectionMessages">
          <div class="messagesContainer">Hello</div>
          <div class="typingBar">
            <div class="input-icons">
              <i class="fas fa-search"></i>
              <input type="text" class="inputMessage" id="message" name="message" placeholder="Votre message..." />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;

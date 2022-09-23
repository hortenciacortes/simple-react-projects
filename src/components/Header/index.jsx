import './styles.scss';

export function Header() {
  function scrollToForm(hash) {
    console.log(document.querySelector(hash).offsetTop)
    const formHubspot = document.querySelector(hash).offsetTop;
    window.scroll({
      top: formHubspot - 90,
      behavior: "smooth"
    })
  }
  window.addEventListener('scroll', () => {
    const hash = window.location.hash
    const header = document.querySelector('section.grid-pattern');
    if(hash !== '#task' && hash !== '#stopwatch') {
      header.classList.toggle('sticky', window.scrollY > 0);
    }
  })

  return(
    <section className='grid-pattern'>
      <div className='header'>
        <div className='logo'>
          <img src='https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg' alt='Icone do React' />
          <p>Projetos React</p>
        </div>

        <div className='projects'>
          <a href='#task' onClick={() => scrollToForm('#lista-de-tarefas')}>Lista de Tarefas</a>
          <a href='#stopwatch' onClick={() => scrollToForm('#cronometro')}>Cronômetro</a>
        </div>
      </div>
    </section>
  )
}
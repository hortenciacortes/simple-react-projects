import './styles.scss';

export function Header() {
  return(
    <section className='header'>
      <div className='logo'>
        <img src='https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg' alt='Icone do React' />
        <p>Projetos React</p>
      </div>

      <div className='projects'>
        <a href='#'>Lista de Tarefas</a>
      </div>
    </section>
  )
}